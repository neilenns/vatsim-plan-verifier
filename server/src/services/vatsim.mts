import axios, { AxiosResponse } from "axios";
import IVatsimEndpoints from "../interfaces/IVatsimEndpoints.mjs";
import { IVatsimData, IVatsimPilot, IVatsimPrefile } from "../interfaces/IVatsimData.mjs";
import VatsimFlightPlanModel from "../models/VatsimFlightPlan.mjs";
import debug from "debug";
import testData from "./vatsimdata.json" assert { type: "json" };
import { Server as SocketIOServer } from "socket.io";

const logger = debug("plan-verifier:vatsimService");
let vatsimEndpoints: IVatsimEndpoints | undefined;
let io: SocketIOServer;
let updateTimer: NodeJS.Timeout | undefined;

function parseStringToNumber(value: string) {
  const convertedValue = Number(value);
  if (isNaN(convertedValue)) return 0;
  return convertedValue;
}

async function processVatsimPilots(pilots: IVatsimPilot[]) {
  return Promise.all([
    pilots.map(async (pilot) => {
      if (!pilot?.callsign) return;
      if (pilot.groundspeed ?? 0 > 10) return;

      const flightPlan = new VatsimFlightPlanModel({
        callsign: pilot?.callsign ?? "",
        groundspeed: pilot?.groundspeed ?? "",
        rawAircraftType: pilot?.flight_plan?.aircraft_faa ?? "",
        departure: pilot?.flight_plan?.departure ?? "",
        arrival: pilot?.flight_plan?.arrival ?? "",
        cruiseAltitude: parseStringToNumber(pilot?.flight_plan?.altitude) / 1000,
        route: pilot?.flight_plan?.route ?? "",
        squawk: pilot?.flight_plan?.assigned_transponder ?? "",
      });

      await flightPlan.save();
    }),
  ]);
}

async function processVatsimPrefiles(prefiles: IVatsimPrefile[]) {
  return Promise.all([
    prefiles.map(async (prefile) => {
      if (!prefile?.callsign) return;

      const flightPlan = new VatsimFlightPlanModel({
        callsign: prefile?.callsign ?? "",
        groundspeed: 0,
        rawAircraftType: prefile?.flight_plan?.aircraft_faa ?? "",
        departure: prefile?.flight_plan?.departure ?? "",
        arrival: prefile?.flight_plan?.arrival ?? "",
        cruiseAltitude: parseStringToNumber(prefile?.flight_plan?.altitude) / 1000,
        route: prefile?.flight_plan?.route ?? "",
        squawk: prefile?.flight_plan?.assigned_transponder ?? "",
      });

      await flightPlan.save();
    }),
  ]);
}

async function processVatsimData(flightPlans: IVatsimData) {
  await VatsimFlightPlanModel.deleteMany({});

  return Promise.all([
    processVatsimPilots(flightPlans.pilots),
    processVatsimPrefiles(flightPlans.prefiles),
  ]);
}

export async function getVatsimEndpoints() {
  try {
    const endpointUrl = "https://status.vatsim.net/status.json";

    const response: AxiosResponse<IVatsimEndpoints> = await axios.get(endpointUrl);

    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        errorType: "UnknownError",
        error: `Unknown error: ${response.status} ${response.statusText}`,
      };
    }
  } catch (error) {
    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching VATSIM endpoints: ${error}`,
    };
  }
}

async function publishUpdates() {
  if (!io) {
    return;
  }

  // Loop through the rooms and send filtered data to clients in each room
  io.sockets.adapter.rooms.forEach(async (_, airportCode) => {
    // Every client gets put in their own auto-generated room. Skip those since there won't be any matching
    // database values. The assumption is all airport codes will be 3 or 4 characters long.
    if (airportCode.length > 4) return;

    const flightPlans = await VatsimFlightPlanModel.find({ departure: airportCode });

    logger(`Emitting data for ${airportCode}`);
    io.to(airportCode).emit("vatsimFlightPlansUpdate", flightPlans);
  });
}

// Loads data from vatsim then processes the filed and prefiled flight plans in to the database
export async function getVatsimFlightPlans() {
  logger("Fetching VATSIM flight plans...");

  await processVatsimData(testData as IVatsimData);
  await publishUpdates();

  return;

  // if (!vatsimEndpoints)
  // {
  // 	const endpointsResult = await getVatsimEndpoints();
  // 	if (!endpointsResult.success)
  // 	{
  // 		logger("Unable to retrieve VATSIM endpoints");
  // 		return {
  // 			success: false,
  // 			errorType: "VatsimFailure",
  // 			error: "Unable to retrieve VATSIM endpoints",
  // 		}
  // 	}
  // 	else
  // 	{
  // 		vatsimEndpoints = endpointsResult.data;
  // 	}
  // }

  // const dataEndpoint = vatsimEndpoints?.data.v3[0];

  // if (!dataEndpoint)
  // {
  // 	logger("Unable to retrieve VATSIM data endpoint");
  // 	return {
  // 		success: false,
  // 		errorType: "VatsimFailure",
  // 		error: "Unable to retrieve VATSIM data endpoint",
  // 	}
  // }

  // try
  // {
  // 	const response = await axios.get(dataEndpoint);

  // 	if (response.status === 200) {
  // 		return {
  // 			success: true,
  // 			data: response.data,
  // 		};
  // 	}
  // 	else {
  // 		return {
  // 			success: false,
  // 			errorType: "UnknownError",
  // 			error: `Unknown error: ${response.status} ${response.statusText}`,
  // 		};
  // 	}
  // } catch (error) {
  // 	return {
  // 		success: false,
  // 		errorType: "UnknownError",
  // 		error: `Error fetching VATSIM flight plans: ${error}`,
  // 	};
  // }
}

export function startVatsimAutoUpdate(updateInterval: number, ioInstance: SocketIOServer) {
  logger("Starting vatsim auto-update");
  io = ioInstance;
  updateTimer = setInterval(getVatsimFlightPlans, updateInterval);
}

export function stopVatsimAutoUpdate() {
  logger("Stopping vatsim auto-update");
  if (updateTimer) clearInterval(updateTimer);
}
