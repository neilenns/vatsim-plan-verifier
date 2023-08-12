import { FlightPlan, FlightPlanModel } from "../../src/models/FlightPlan.mjs";

export async function addFlightPlans(testData: Partial<FlightPlan>[]) {
  await Promise.all(
    testData.map(async (data) => {
      const record = new FlightPlanModel(data);
      try {
        await record.save();
      } catch (err) {
        console.log(err);
      }
    })
  );
}

export async function removeFlightPlans(testData: Partial<FlightPlan>[]) {
  try {
    await FlightPlanModel.deleteMany({});
  } catch (err) {
    console.log(err);
  }
}
