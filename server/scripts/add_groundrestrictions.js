use("plan-verifier");

db.groundrestrictions.deleteMany({});

db.groundrestrictions.insertMany([
  {
    airportCode: "KSEA",
    equipmentCodes: ["B738", "C172"],
    groups: [5, 6],
  },
]);
