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
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b4c",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: "210",
    rawAircraftType: "C172",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b4d",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: "210",
    rawAircraftType: "B737/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b4e",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: "210",
    rawAircraftType: "B738/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b4f",
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: "210",
    rawAircraftType: "C172/L",
    route: "SEA8 SEA BUWZO KRATR2",
    squawk: "1234",
  },
];

export default async function setup() {
  flightPlans.map(async (flightPlan) => {
    var record = new FlightPlan(flightPlan);
    try {
      await record.save();
    } catch (err) {
      console.log(err);
    }
  });
}
