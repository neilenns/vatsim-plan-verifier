use("plan-verifier");

db.artccpositions.deleteMany({});
db.artccpositions.dropIndex("artcc_1");
db.artccpositions.dropIndex("callsign_1");

db.artccpositions.createIndex({ artcc: 1 });
db.artccpositions.createIndex({ callsign: 1 });
db.artccpositions.insertMany([
  {
    name: "ZSE",
    positionCodes: ["SEA", "EDDC"],
  },
]);
