use("plan-verifier");

db.extendedairportinfo.deleteMany({});
db.extendedairportinfo.dropIndex("airportCode_1");

db.extendedairportinfo.createIndex({ airportCode: 1 });
db.extendedairportinfo.insertMany([
  {
    airportCode: "KPDT",
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectRequired: true,
        ExpectInMinutes: 5,
      },
    ],
    hasSIDs: false,
  },
  {
    airportCode: "KMWH",
    InitialAltitudes: [
      {
        Altitude: 100,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectRequired: true,
        ExpectInMinutes: 5,
      },
    ],
    hasSIDs: false,
  },
  {
    airportCode: "KFHR",
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectRequired: true,
        ExpectInMinutes: 5,
      },
    ],
    hasSIDs: false,
  },
  {
    airportCode: "KPUW",
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectRequired: true,
        ExpectInMinutes: 5,
      },
    ],
    hasSIDs: false,
  },
  {
    airportCode: "KPWT",
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectRequired: true,
        ExpectInMinutes: 5,
      },
    ],
    hasSIDs: false,
  },
  {
    airportCode: "KSZT",
    InitialAltitudes: [
      {
        Altitude: 90,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectRequired: true,
        ExpectInMinutes: 5,
      },
    ],
    hasSIDs: false,
  },
]);
