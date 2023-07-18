import FlightPlan, { IFlightPlan } from "../../src/models/FlightPlan.mjs";

export async function addFlightPlans(testData: Partial<IFlightPlan>[]) {
  await Promise.all(
    testData.map(async (data) => {
      var record = new FlightPlan(data);
      try {
        await record.save();
      } catch (err) {
        console.log(err);
      }
    })
  );
}

export async function removeFlightPlans(testData: Partial<IFlightPlan>[]) {
  try {
    await FlightPlan.deleteMany({});
  } catch (err) {
    console.log(err);
  }
}
