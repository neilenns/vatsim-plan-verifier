// tests/calculator.spec.tx
import { expect } from "chai";
import { describe, it } from "mocha";
import { pilotToVatsimModel } from "../src/services/vatsimFlightPlans.mjs";
import { IVatsimPilot } from "../src/interfaces/IVatsimData.mjs";

const testData = [
  // Legacy IFR ("FL260" for the altitude)
  {
    cid: 1215692,
    name: "Barry Peacock KHYI",
    callsign: "CTX1",
    server: "CANADA",
    pilot_rating: 0,
    military_rating: 0,
    latitude: 33.66787,
    longitude: -117.87126,
    altitude: 61,
    groundspeed: 0,
    transponder: "1200",
    heading: 39,
    qnh_i_hg: 30.0,
    qnh_mb: 1016,
    flight_plan: {
      flight_rules: "I",
      aircraft: "C421/L-VGD/C",
      aircraft_faa: "C421/G",
      aircraft_short: "C421",
      departure: "KLIT",
      arrival: "KSNA",
      alternate: "",
      cruise_tas: "212",
      altitude: "FL260",
      deptime: "0035",
      enroute_time: "0605",
      fuel_time: "0650",
      remarks: 'CALLSIGN IS "CENTEX 1".  FSE CENTEX FLYERS AVIATION FLIGHT. /V/',
      route: "GQE",
      revision_id: 1,
      assigned_transponder: "5644",
    },
    logon_time: "2023-08-07T00:25:04.3713773Z",
    last_updated: "2023-08-07T23:29:29.028219Z",
  },
  // Legacy VFR
  {
    cid: 1215692,
    name: "Barry Peacock KHYI",
    callsign: "CTX1",
    server: "CANADA",
    pilot_rating: 0,
    military_rating: 0,
    latitude: 33.66787,
    longitude: -117.87126,
    altitude: 61,
    groundspeed: 0,
    transponder: "1200",
    heading: 39,
    qnh_i_hg: 30.0,
    qnh_mb: 1016,
    flight_plan: {
      flight_rules: "V",
      aircraft: "C421/L-VGD/C",
      aircraft_faa: "C421/G",
      aircraft_short: "C421",
      departure: "KLIT",
      arrival: "KSNA",
      alternate: "",
      cruise_tas: "212",
      altitude: "FL260",
      deptime: "0035",
      enroute_time: "0605",
      fuel_time: "0650",
      remarks: 'CALLSIGN IS "CENTEX 1".  FSE CENTEX FLYERS AVIATION FLIGHT. /V/',
      route: "GQE",
      revision_id: 1,
      assigned_transponder: "5644",
    },
    logon_time: "2023-08-07T00:25:04.3713773Z",
    last_updated: "2023-08-07T23:29:29.028219Z",
  },
  // vNAS VFR, no altitude
  {
    cid: 1215692,
    name: "Barry Peacock KHYI",
    callsign: "CTX1",
    server: "CANADA",
    pilot_rating: 0,
    military_rating: 0,
    latitude: 33.66787,
    longitude: -117.87126,
    altitude: 61,
    groundspeed: 0,
    transponder: "1200",
    heading: 39,
    qnh_i_hg: 30.0,
    qnh_mb: 1016,
    flight_plan: {
      aircraft: "C421/L-VGD/C",
      aircraft_faa: "C421/G",
      aircraft_short: "C421",
      departure: "KLIT",
      arrival: "KSNA",
      alternate: "",
      cruise_tas: "212",
      altitude: "VFR",
      deptime: "0035",
      enroute_time: "0605",
      fuel_time: "0650",
      remarks: 'CALLSIGN IS "CENTEX 1".  FSE CENTEX FLYERS AVIATION FLIGHT. /V/',
      route: "GQE",
      revision_id: 1,
      assigned_transponder: "5644",
    },
    logon_time: "2023-08-07T00:25:04.3713773Z",
    last_updated: "2023-08-07T23:29:29.028219Z",
  },
  // vNAS VFR, altitude
  {
    cid: 1215692,
    name: "Barry Peacock KHYI",
    callsign: "CTX1",
    server: "CANADA",
    pilot_rating: 0,
    military_rating: 0,
    latitude: 33.66787,
    longitude: -117.87126,
    altitude: 61,
    groundspeed: 0,
    transponder: "1200",
    heading: 39,
    qnh_i_hg: 30.0,
    qnh_mb: 1016,
    flight_plan: {
      aircraft: "C421/L-VGD/C",
      aircraft_faa: "C421/G",
      aircraft_short: "C421",
      departure: "KLIT",
      arrival: "KSNA",
      alternate: "",
      cruise_tas: "212",
      altitude: "VFR045",
      deptime: "0035",
      enroute_time: "0605",
      fuel_time: "0650",
      remarks: 'CALLSIGN IS "CENTEX 1".  FSE CENTEX FLYERS AVIATION FLIGHT. /V/',
      route: "GQE",
      revision_id: 1,
      assigned_transponder: "5644",
    },
    logon_time: "2023-08-07T00:25:04.3713773Z",
    last_updated: "2023-08-07T23:29:29.028219Z",
  },
  // Updated IFR ("26000" for the altitude)
  {
    cid: 1215692,
    name: "Barry Peacock KHYI",
    callsign: "CTX1",
    server: "CANADA",
    pilot_rating: 0,
    military_rating: 0,
    latitude: 33.66787,
    longitude: -117.87126,
    altitude: 61,
    groundspeed: 0,
    transponder: "1200",
    heading: 39,
    qnh_i_hg: 30.0,
    qnh_mb: 1016,
    flight_plan: {
      flight_rules: "I",
      aircraft: "C421/L-VGD/C",
      aircraft_faa: "C421/G",
      aircraft_short: "C421",
      departure: "KLIT",
      arrival: "KSNA",
      alternate: "",
      cruise_tas: "212",
      altitude: "FL260",
      deptime: "0035",
      enroute_time: "0605",
      fuel_time: "0650",
      remarks: 'CALLSIGN IS "CENTEX 1".  FSE CENTEX FLYERS AVIATION FLIGHT. /V/',
      route: "GQE",
      revision_id: 1,
      assigned_transponder: "5644",
    },
    logon_time: "2023-08-07T00:25:04.3713773Z",
    last_updated: "2023-08-07T23:29:29.028219Z",
  },
] as IVatsimPilot[];

describe("Vatsim flight plan tests", () => {
  it("should import legacy IFR", async function () {
    const result = pilotToVatsimModel(testData[0]);

    expect(result.cruiseAltitude).to.equal(260);
    expect(result.flightRules).to.equal("I");
  });

  it("should import legacy VFR", async function () {
    const result = pilotToVatsimModel(testData[1]);

    expect(result.cruiseAltitude).to.equal(260);
    expect(result.flightRules).to.equal("V");
  });

  it("should import vNAS VFR, no altitude", async function () {
    const result = pilotToVatsimModel(testData[2]);

    expect(result.cruiseAltitude).to.equal(0);
    expect(result.flightRules).to.equal("V");
  });

  it("should import vNAS VFR, altitude", async function () {
    const result = pilotToVatsimModel(testData[3]);

    expect(result.cruiseAltitude).to.equal(45);
    expect(result.flightRules).to.equal("V");
  });

  it("should import updated IFR", async function () {
    const result = pilotToVatsimModel(testData[4]);

    expect(result.cruiseAltitude).to.equal(260);
    expect(result.flightRules).to.equal("I");
  });
});
