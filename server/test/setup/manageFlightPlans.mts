import { PromisePool } from "@supercharge/promise-pool";
import { FlightPlan, FlightPlanModel } from "../../src/models/FlightPlan.mjs";
import { AirportFlow } from "../../src/models/InitialAltitude.mjs";
import { parseStringToNumber } from "../../src/utils.mjs";

export interface ITestDataEntry {
  rawFlightPlan: string;
  flow: AirportFlow;
  _id?: string;
}

export async function addTestData(testData: ITestDataEntry[]) {
  await PromisePool.for(testData)
    .handleError(async (err, data) => {
      const error = err as Error;

      console.log(`Unable to process "${data.rawFlightPlan}": ${error.message}`);
    })
    .process(async (data) => {
      const [
        callsign,
        rawAircraftType,
        assignedSquawk,
        departure,
        arrival,
        cruiseAltitude,
        ...route
      ] = data.rawFlightPlan
        .replace(/-/g, "") // Remove the dash between the departure and arrival airports
        .replace(/\s+/g, " ") // Remove the extra spaces inserted by VRC between each field
        .split(" ");

      const result = await addFlightPlan({
        callsign,
        rawAircraftType,
        squawk: assignedSquawk,
        departure,
        arrival,
        cruiseAltitude: parseStringToNumber(cruiseAltitude),
        route: route.join(" "),
        flow: data.flow,
      });

      data._id = result?._id.toString();
    });
}

export async function addFlightPlan(data: Partial<FlightPlan>) {
  const record = new FlightPlanModel(data);
  try {
    return await record.save();
  } catch (err) {
    console.log(err);
  }
}

export async function addFlightPlans(testData: Partial<FlightPlan>[]) {
  await PromisePool.for(testData).process(async (data) => {
    addFlightPlan(data);
  });
}

export async function removeFlightPlans() {
  try {
    await FlightPlanModel.deleteMany({});
  } catch (err) {
    console.log(err);
  }
}
