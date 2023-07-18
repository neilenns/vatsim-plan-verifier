import FlightPlan from "../../src/models/FlightPlan.mjs";

const flightPlans = [
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b4b",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: "210",
    rawAircraftType: "H/A388/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
];

export default async function setup() {
  flightPlans.map(async (flightPlan) => {
    var record = new FlightPlan(flightPlan);
    try {
      await record.save();
      console.log(`Flight plan ${flightPlan._id} added`);
    } catch (err) {
      console.log(err);
    }
  });
}
