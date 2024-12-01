use("plan-verifier");

db.eventreroutes.deleteMany({});
db.eventreroutes.dropIndex("departure_1");

db.eventreroutes.createIndex({ departure: 1 });
db.eventreroutes.insertMany([
  {
    departure: "KPDX",
    flow: "EAST",
    fix: "BTG",
    departureFrequency: "North: 118.100",
    isActive: true,
  },
  {
    departure: "KPDX",
    flow: "EAST",
    fix: "COUGA",
    departureFrequency: "North: 118.100",
    isActive: true,
  },
  {
    departure: "KPDX",
    flow: "EAST",
    fix: "LAVAA7",
    departureFrequency: "118.100 (NORTH)",
    isActive: true,
  },
  {
    departure: "KPDX",
    flow: "EAST",
    fix: "WHAMY5",
    departureFrequency: "124.350 (HOOD)",
    isActive: true,
  },
  {
    departure: "KPDX",
    flow: "EAST",
    fix: "CASCD3",
    departureFrequency: "124.350 (HOOD)",
    isActive: true,
  },
  {
    departure: "KPDX",
    flow: "EAST",
    fix: "HRMNS6",
    departureFrequency: "124.350 (HOOD)",
    isActive: true,
  },
  {
    departure: "KPDX",
    flow: "EAST",
    fix: "MINNE5",
    departureFrequency: "124.350 (HOOD)",
    isActive: true,
  },
]);
