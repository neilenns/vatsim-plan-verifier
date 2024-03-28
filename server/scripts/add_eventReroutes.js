use("plan-verifier");

db.eventreroutes.deleteMany({});
db.eventreroutes.dropIndex("departure_1");

db.eventreroutes.createIndex({ departure: 1 });
db.eventreroutes.insertMany([
  {
    departure: "KSEA",
    flow: "ANY",
    fix: "JINMO",
    route: "JINMO -> ... POWEL JUNEJ JINMO ...",
    replacement: "POWEL JUNEJ JINMO +",
    isActive: true,
  },
]);
