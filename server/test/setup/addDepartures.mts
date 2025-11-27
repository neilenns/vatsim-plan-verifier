import { DepartureModel } from "../../src/models/Departure.mjs";

const departures = [
  {
    _id: "5f9f7b9b9b3b3c1b3c1b3c11",
    AirportCode: "KPDX",
    SID: "PTLD2",
    Telephony: "PORTLAND TWO",
    Fixes: [
      "BTG",
      "YKM",
      "LTJ",
      "PDT",
      "IMB",
      "LKV",
      "LMT",
      "DSD",
      "EUG",
      "OED",
      "OTH",
      "ONP",
      "UBG",
      "AST",
      "TOU",
      "OLM",
      "SEA",
      "LAVAA",
      "WHAMY",
      "CHISM",
      "HRMNS",
      "MINNE",
      "COUGA",
    ],
    IsRNAV: false,
    ExpectRequired: false,
    ExpectInMinutes: 5,
    InitialAltitudes: [
      {
        Altitude: 60,
        AircraftClass: "J",
      },
      {
        Altitude: 60,
        AircraftClass: "L",
      },
      {
        Altitude: 30,
        AircraftClass: "S",
      },
    ],
  },
  {
    _id: "5f9f7b9b9b3b3c1b3c1b3c12",
    AirportCode: "KSEA",
    SID: "HAROB6",
    Telephony: "HAROB SIX",
    Fixes: ["HAROB", "HQM", "ERAVE", "HISKU"],
    ClimbViaSid: true,
    ExpectRequired: false,
    ExpectInMinutes: 10,
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: "*",
      },
    ],
    IsRNAV: true,
  },
  {
    _id: "5f9f7b9b9b3b3c1b3c1b3c13",
    AirportCode: "KSEA",
    SID: "SEA1",
    Telephony: "SEATTLE ONE",
    IsRNAV: false,
    Fixes: [
      "TOU",
      "YYJ",
      "YVR",
      "HUH",
      "YDC",
      "PAE",
      "EPH",
      "ELN",
      "YKM",
      "OLM",
      "BTG",
      "UBG",
      "EUG",
      "AST",
      "HQM",
    ],
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: "*",
      },
    ],
  },
  {
    _id: "5f9f7b9b9b3b3c1b3c1b3c14",
    AirportCode: "KMFR",
    SID: "EAGLE6",
    Telephony: "EAGLE SIX",
    Fixes: [],
    ClimbViaSid: false,
    InitialAltitudes: [
      {
        Altitude: 110,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: false,
    ExpectRequired: false,
    ExpectInMinutes: 5,
  },
];

export default async function setup() {
  const models = departures.map((departure) => new DepartureModel(departure));
  try {
    await DepartureModel.bulkSave(models);
  } catch (err) {
    console.log(err);
  }
}
