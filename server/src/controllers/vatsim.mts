import axios, { AxiosResponse } from "axios";
import Result from "../types/result.mjs";
import IVatsimEndpoints from "../interfaces/IVatsimEndpoints.mjs";
import debug from "debug";

const logger = debug("server:vatsimEndpoints");
let vatsimEndpoints: IVatsimEndpoints | undefined;
type VatsimEndpointsResult = Result<IVatsimEndpoints, "VatsimFailure" | "UnknownError">;

export async function getVatsimFlightPlans(): Promise<VatsimEndpointsResult> {
	if (!vatsimEndpoints)
	{
		const endpointsResult = await getVatsimEndpoints();
		if (!endpointsResult.success)
		{
			logger("Unable to retrieve VATSIM endpoints");
			return {
				success: false,
				errorType: "VatsimFailure",
				error: "Unable to retrieve VATSIM endpoints",
			}
		}
		else
		{
			vatsimEndpoints = endpointsResult.data;
		}
	}

	const dataEndpoint = vatsimEndpoints?.data.v3[0];

	if (!dataEndpoint)
	{
		logger("Unable to retrieve VATSIM data endpoint");
		return {
			success: false,
			errorType: "VatsimFailure",
			error: "Unable to retrieve VATSIM data endpoint",
		}
	}

	try
	{
		const response = await axios.get(dataEndpoint);

		if (response.status === 200) {
			return {
				success: true,
				data: response.data,
			};
		}
		else {
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
			error: `Error fetching VATSIM flight plans: ${error}`,
		};
	}
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
		}
		else {
			return {
				success: false,
				errorType: "UnknownError",
				error: `Unknown error: ${response.status} ${response.statusText}`,
			};
		}
	}
	catch (error) {
		return {
			success: false,
			errorType: "UnknownError",
			error: `Error fetching VATSIM endpoints: ${error}`,
		};
	}
}