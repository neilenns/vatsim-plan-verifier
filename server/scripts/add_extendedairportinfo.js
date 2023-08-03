use("plan-verifier");

db.extendedairportinfo.deleteMany({});

db.extendedairportinfo.insertMany([
  {
    airportCode: "KPDT",
    defaultInitialAltitudeText: "Maintain 7,000",
    defaultInitialMinutesText: "5 minutes",
  },
]);
