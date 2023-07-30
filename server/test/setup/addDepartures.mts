import DepartureModel from "../../src/models/Departure.mjs";

const departures = [
  {
    _id: "5f9f7b9b9b3b3c1b3c1b3c11",
    SID: "PTLD2",
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
    SID: "HAROB6",
    Fixes: ["HAROB", "HQM", "ERAVE", "HISKU"],
    ClimbViaSid: true,
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
    SID: "SEA8",
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
];

export default async function setup() {
  await Promise.all(
    departures.map(async (departure) => {
      const record = new DepartureModel(departure);
      try {
        await record.save();
      } catch (err) {
        console.log(err);
      }
    })
  );
}
