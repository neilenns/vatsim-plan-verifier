use("plan-verifier");

db.groundrestrictions.deleteMany({});
db.groundrestrictions.dropIndex("airportCode_1");

db.groundrestrictions.createIndex({ airportCode: 1 }, { unique: true });
db.groundrestrictions.insertMany([
  {
    airportCode: "KPDX",
    wingspanGreaterThan: 118,
    message:
      "{{equipmentCode}} aircraft have taxiway restrictions at KPDX. Check the taxi diagram before taxiing this aircraft.",
  },
]);
