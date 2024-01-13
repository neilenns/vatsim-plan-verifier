use("plan-verifier");

db.groundrestrictions.deleteMany({});

db.groundrestrictions.insertMany([
  {
    airportCode: "KPDX",
    wingspanGreaterThan: 118,
    message:
      "{{equipmentCode}} aircraft have taxiway restrictions at KPDX. Check the taxi diagram before taxiing this aircraft.",
  },
]);
