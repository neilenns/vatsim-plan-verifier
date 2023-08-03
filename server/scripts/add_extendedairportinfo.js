use("plan-verifier");

db.extendedairportinfo.deleteMany({});

db.extendedairportinfo.insertMany([
  {
    airportCode: "KPDT",
    defaultInitialAltitudeText: "Maintain 7,000",
    defaultExpectInMinutesText: "5 minutes",
  },
]);
