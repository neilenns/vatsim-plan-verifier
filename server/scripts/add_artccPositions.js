use("plan-verifier");

db.artccpositions.deleteMany({});
db.artccpositions.dropIndex("artcc_1");
db.artccpositions.dropIndex("callsign_1");

db.artccpositions.createIndex({ artcc: 1 });
db.artccpositions.createIndex({ callsign: 1 });
db.artccpositions.insertMany([
  {
    name: "ZSE",
    positionCodes: [
      "SEA",
      "PDX",
      "ZSE",
      "GEG",
      "BFI",
      "PAE",
      "NUW",
      "ALW",
      "EUG",
      "OLM",
      "LMT",
      "PSC",
      "HIO",
      "TTD",
      "SKA",
      "RNT",
      "YKM",
      "COE",
      "MWH",
      "MFR",
      "TCM",
      "SLE",
      "BLI",
      "TIW",
      "LWS",
      "SFF",
      "RDM",
      "OTH",
      "PDT",
      "UAO",
    ],
  },
]);
