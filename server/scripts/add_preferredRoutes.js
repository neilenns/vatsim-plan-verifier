// The current database to use.
use("plan-verifier");

db.preferredroutes.deleteMany({});
db.preferredroutes.dropIndex("departure_1");
db.preferredroutes.dropIndex("arrival_1");

db.preferredroutes.createIndex({ departure: 1 });
db.preferredroutes.createIndex({ arrival: 1 });
db.preferredroutes.insertMany([
  {
    departure: "KSEA",
    arrival: "KPDX",
    route: "SEA9 SEA V23 BTG",
    minimumRequiredAltitude: 70,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AGP]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KSEA",
    arrival: "KBFI",
    route: "SEA9",
    minimumRequiredAltitude: 50,
    minimumRequiredSpeed: 0,
    engineTypes: "[J]",
    equipmentSuffixes: "[A-Z]",
    remarks: "Mandatory LOA route, altitude 5,000'",
    flow: "ANY",
  },
  {
    departure: "KSEA",
    arrival: "KBFI",
    route: "SEA9 heading 230",
    minimumRequiredAltitude: 30,
    minimumRequiredSpeed: 0,
    engineTypes: "[PT]",
    equipmentSuffixes: "[A-Z]",
    remarks: "Mandatory LOA route, altitude 3,000'",
    flow: "SOUTH",
  },
  {
    departure: "KSEA",
    arrival: "KBFI",
    route: "SEA9 heading 020",
    minimumRequiredAltitude: 30,
    minimumRequiredSpeed: 0,
    engineTypes: "[PT]",
    equipmentSuffixes: "[A-Z]",
    remarks: "Mandatory LOA, altitude 5,000'",
    flow: "NORTH",
  },
  {
    departure: "KSEA",
    arrival: "KPAE",
    route: "MONTN2",
    minimumRequiredAltitude: 50,
    minimumRequiredSpeed: 0,
    engineTypes: "[J]",
    equipmentSuffixes: "[A-Z]",
    remarks: "Mandatory LOA route, altitude 5,000'",
    flow: "SOUTH",
  },
  {
    departure: "KSEA",
    arrival: "KPAE",
    route: "MONTN2 heading 140",
    minimumRequiredAltitude: 30,
    minimumRequiredSpeed: 0,
    engineTypes: "[PT]",
    equipmentSuffixes: "[A-Z]",
    remarks: "Mandatory LOA route, altitude 3,000' expect 4,000' 15nm from SEA VORTAC.",
    flow: "SOUTH",
  },
  {
    departure: "KSEA",
    arrival: "KPAE",
    route: "SEA9",
    minimumRequiredAltitude: 50,
    minimumRequiredSpeed: 0,
    engineTypes: "[J]",
    equipmentSuffixes: "[A-Z]",
    remarks: "Mandatory LOA route, altitude 5,000'",
    flow: "NORTH",
  },
  {
    departure: "KSEA",
    arrival: "KPAE",
    route: "SEA9 heading 020",
    minimumRequiredAltitude: 30,
    minimumRequiredSpeed: 0,
    engineTypes: "[PT]",
    equipmentSuffixes: "[A-Z]",
    remarks: "Mandatory LOA route, altitude 3,000'",
    flow: "NORTH",
  },
  {
    departure: "KPDX",
    arrival: "KPSC",
    route: "PTLD2 PIQRI V182 LTJ V502 VIRTU",
    minimumRequiredSpeed: 0,
    minimumRequiredAltitude: 70,
    equipmentSuffixes: "[A-Z]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KSEA",
    route: "PTLD2 COUGA KRIEG HAWKZ7",
    minimumRequiredAltitude: 120,
    minimumRequiredSpeed: 270,
    equipmentSuffixes: "[GLZ]",
    engineTypes: "[TJ]",
  },
  {
    departure: "KVUO",
    arrival: "KSEA",
    route: "BTG OLM OLM2",
    minimumRequiredAltitude: 120,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[GLZ]",
    engineTypes: "[TP]",
  },
  {
    departure: "KPDX",
    arrival: "KSEA",
    route: "PTLD2 BTG OLM OLM2",
    minimumRequiredAltitude: 120,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[GLZ]",
    engineTypes: "[TP]",
  },
  {
    departure: "KPDX",
    arrival: "KSEA",
    route: "PTLD2 BTG OLM OLM2",
    minimumRequiredAltitude: 130,
    minimumRequiredSpeed: 250,
    equipmentSuffixes: "[GLZ]",
    engineTypes: "J",
  },
  {
    departure: "KVUO",
    arrival: "KSEA",
    route: "BTG V23 SEA",
    minimumRequiredAltitude: 60,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AGP]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KSEA",
    route: "PTLD2 BTG V23 SEA",
    minimumRequiredAltitude: 60,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AGP]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KSEA",
    route: "PTLD2 BTG V23 SEA",
    minimumRequiredAltitude: 60,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[W]",
    engineTypes: "[JT]",
  },
  {
    departure: "KPDX",
    arrival: "CYVR",
    route: "PTLD2 BTG V23 YVR",
    minimumRequiredAltitude: 60,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AGP]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "CYVR",
    route: "PTLD2 BTG V287 OLM V165 HUH V23 YVR",
    minimumRequiredAltitude: 60,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AGP]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "CYVR",
    route: "PTLD2 BTG J1 SEA PAE GRIZZ7",
    minimumRequiredAltitude: 100,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[GLZ]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "CYYJ",
    route: "PTLD2 BTG V23 SEA V495 CDGPN",
    minimumRequiredAltitude: 60,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AP]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "CYYJ",
    route: "PTLD2 BTG V287 OLM V165 HUH V495 YYJ",
    minimumRequiredAltitude: 60,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AP]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KAST",
    route: "PTLD2 BTG V112 AST",
    minimumRequiredAltitude: 60,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[A-Z]",
    engineTypes: "[PTJ]",
  },
  {
    arrival: "KBOI",
    route: "PTLD2 UBG V500 BOI",
    minimumRequiredAltitude: 150,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AP]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KBOI",
    route: "PTLD2 BTG V112 LTJ V182 BKE V4 BOI",
    minimumRequiredAltitude: 90,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AP]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KBFI",
    route: "PTLD2 BTG V23 SEA",
    minimumRequiredAltitude: 60,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AP]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KBDN",
    route: "PTLD2 UBG V165 DSD",
    minimumRequiredAltitude: 125,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AP]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KBDN",
    route: "PTLD2 FOMBO",
    minimumRequiredAltitude: 135,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[GLZ]",
    engineTypes: "[TJ]",
    remarks: "Requires P80 approval.",
  },
  {
    departure: "KPDX",
    arrival: "KCVO",
    route: "PTLD2 UBG V495 CVO",
    minimumRequiredAltitude: 40,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[A-Z]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KCVO",
    route: "PTLD2 UBG T263 CVO",
    minimumRequiredAltitude: 40,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[GL]",
    engineTypes: "[TJ]",
  },
  {
    departure: "KPDX",
    arrival: "KGEG",
    route: "PTLD2 BTG V112 GEG",
    minimumRequiredAltitude: 70,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AP]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KGEG",
    route: "PTLD2 BTG V112 LTJ V520 PSC V204 GEG",
    minimumRequiredAltitude: 70,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AP]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KGEG",
    route: "PTLD2 BTG V448 GEG",
    minimumRequiredAltitude: 145,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AP]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KGEG",
    route: "LAVAA7 LAVAA PAPPS ZOOMR ZOOMR2",
    minimumRequiredAltitude: 50,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[GI]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KGEG",
    route: "PTLD2 BTG LTJ ZOOMR ZOOMR2",
    minimumRequiredAltitude: 50,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[GI]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KGEG",
    route: "LAVAA7 LAVAA PAPPS ZOOMR ZOOMR2",
    minimumRequiredAltitude: 50,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[LZ]",
    engineTypes: "J",
  },
  {
    departure: "KPDX",
    arrival: "KPLU",
    route: "PTLD2 BTG V23 OLM",
    minimumRequiredAltitude: 60,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[A-Z]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KHIO",
    route: "{RADAR VECTORS} DAFFI",
    minimumRequiredAltitude: 40,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AGLPZ]",
    engineTypes: "[PTJ]",
    remarks: "Requires P80 approval. Runway 13R arrival.",
  },
  {
    departure: "KPDX",
    arrival: "KHIO",
    route: "{RADAR VECTORS} MULES",
    minimumRequiredAltitude: 40,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[GL]",
    engineTypes: "[PTJ]",
    remarks: "Requires P80 approval. Runway 31L arrival only has GPS RNAV available.",
  },
  {
    departure: "KPDX",
    arrival: "KHIO",
    route: "{RADAR VECTORS} DIRECT",
    minimumRequiredAltitude: 40,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AP]",
    engineTypes: "[PTJ]",
    remarks: "Requires P80 approval, not preferred.",
  },
  {
    departure: "KPDX",
    arrival: "KMMV",
    route: "PTLD2 UBG",
    minimumRequiredAltitude: 40,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AP]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KMWH",
    route: "PTLD2 BTG V448 MWH",
    minimumRequiredAltitude: 145,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AP]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KMWH",
    route: "PTLD2 BTG V112 LTJ V497 MWH",
    minimumRequiredAltitude: 70,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AP]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KMWH",
    route: "PTLD2 BTG PAPPS",
    minimumRequiredAltitude: 170,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[GLZ]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KOTH",
    route: "PTLD2 UBG V287 OTH",
    minimumRequiredAltitude: 60,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[A-Z]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KOTH",
    route: "PTLD2 UBG",
    minimumRequiredAltitude: 60,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[GLZ]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KRDM",
    route: "PTLD2 UBG V165 DSD",
    minimumRequiredAltitude: 125,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AP]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KRDM",
    route: "PTLD2 LTJ V25 DSD",
    minimumRequiredAltitude: 70,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AP]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KRDM",
    route: "PTLD2 CUKIS T302 JJETT T355 HERBS",
    minimumRequiredAltitude: 77,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[GL]",
    engineTypes: "[PTJ]",
    remarks: "Requires P80 approval.",
  },
  {
    departure: "KPDX",
    arrival: "KRDM",
    route: "PTLD2 CUKIS CUPRI",
    minimumRequiredAltitude: 127,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "Z",
    engineTypes: "[JT]",
    remarks: "Requires P80 approval.",
  },
  {
    departure: "KPDX",
    arrival: "KRNT",
    route: "PTLD2 BTG V23 SEA",
    minimumRequiredAltitude: 60,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AP]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KRNT",
    route: "PTLD2 BTG OLM OLM2",
    minimumRequiredAltitude: 100,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[GZL]",
    engineTypes: "[TJ]",
  },
  {
    departure: "KPDX",
    arrival: "KSLE",
    minimumRequiredAltitude: 50,
    minimumRequiredSpeed: 0,
    route: "PTLD2 UBG",
    equipmentSuffixes: "[A-Z]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KUAO",
    route: "PTLD2 UBG",
    minimumRequiredAltitude: 40,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[A-Z]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KUAO",
    route: "PTLD2 {RADAR VECTORS} DIRECT",
    minimumRequiredAltitude: 40,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[A-Z]",
    engineTypes: "[PTJ]",
    remarks: "Requires P80 approval.",
  },
  {
    departure: "KPDX",
    arrival: "KMMV",
    route: "PTLD2 UBG",
    minimumRequiredAltitude: 40,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[A-Z]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KMMV",
    route: "PTLD2 {RADAR VECTORS} DIRECT",
    minimumRequiredAltitude: 40,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[A-Z]",
    engineTypes: "[PTJ]",
    remarks: "Requires P80 approval.",
  },
  {
    departure: "KPDX",
    arrival: "KTTD",
    route: "{RADAR VECTORS} SSHAM",
    minimumRequiredAltitude: 29,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[GL]",
    engineTypes: "[PTJ]",
    remarks: "GPS only. Requires P80 approval.",
  },
  {
    departure: "KPDX",
    arrival: "KSFO",
    route: "PTLD2 UBG V182 OTH V27 ENI PYE3",
    minimumRequiredAltitude: 67,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AGP]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KSFO",
    route: "MINNE5 EASON Q1 ETCHY MLBEC BDEGA3",
    minimumRequiredAltitude: 290,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[LZ]",
    engineTypes: "[TJ]",
  },
  {
    departure: "KPDX",
    arrival: "KSFO",
    route: "MINNE5 FAMUK Q3 FOWND MLBEC BDEGA3",
    minimumRequiredAltitude: 290,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[LZ]",
    engineTypes: "[TJ]",
  },
  {
    departure: "KPDX",
    arrival: "KONP",
    route: "PTLD2 UBG V182 ONP",
    minimumRequiredAltitude: 60,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[A-Z]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KEUG",
    route: "PTLD2 BTG V23 EUG",
    minimumRequiredAltitude: 60,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[A-Z]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KPAE",
    route: "PTLD2 BTG OLM OLM2",
    minimumRequiredAltitude: 130,
    minimumRequiredSpeed: 250,
    equipmentSuffixes: "[GLZI]",
    engineTypes: "[TJ]",
  },
  {
    departure: "KPDX",
    arrival: "KPAE",
    route: "PTLD2 BTG OLM OLM2",
    minimumRequiredAltitude: 120,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[GI]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KPAE",
    route: "PTLD2 BTG V23 PAE",
    minimumRequiredAltitude: 60,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AP]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KBFI",
    route: "PTLD2 BTG OLM OLM2",
    minimumRequiredAltitude: 130,
    minimumRequiredSpeed: 250,
    equipmentSuffixes: "[GLZI]",
    engineTypes: "[TJ]",
  },
  {
    departure: "KPDX",
    arrival: "KBFI",
    route: "PTLD2 BTG OLM OLM2",
    minimumRequiredAltitude: 120,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[GI]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KBFI",
    route: "PTLD2 BTG V23 PAE",
    minimumRequiredAltitude: 60,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[AP]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KYKM",
    route: "PTLD2 BTG V448 YKM",
    minimumRequiredAltitude: 145,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[A-Z]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KYKM",
    route: "PTLD2 BTG V112 LTJ V25 YKM",
    minimumRequiredAltitude: 78,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[A-Z]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KMFR",
    route: "PTLD2 EUG OED",
    minimumRequiredAltitude: 90,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[GLZI]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KMFR",
    route: "PTLD2 BTG V23 OED",
    minimumRequiredAltitude: 90,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[A-Z]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KSLC",
    route: "WHAMY5 IMB J15 BOI BYI SKEES5",
    minimumRequiredAltitude: 240,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[LZGIW]",
    engineTypes: "J",
  },
  {
    departure: "KPDX",
    arrival: "KLAS",
    route: "CASCD3 CHISM PUHTS PAWLI Q13 LOMIA TQILA COKTL4",
    minimumRequiredAltitude: 240,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[LZGIW]",
    engineTypes: "J",
  },
  {
    departure: "KPDX",
    arrival: "KRNO",
    route: "CASCD3 CHISM PUHTS PAWLI HARTT KLUBS1",
    minimumRequiredAltitude: 130,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[GL]",
    engineTypes: "[PTJ]",
  },
  {
    departure: "KPDX",
    arrival: "KDEN",
    route: "WHAMY5 IMB J15 BOI OCS MJANE FLATI3",
    minimumRequiredAltitude: 270,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[LZGIW]",
    engineTypes: "J",
  },
  {
    departure: "KPDX",
    arrival: "KLAX",
    route: "CASCD3 CHISM JUDAH JUNEJ Q7 JAGWA BURGL IRNMN2",
    minimumRequiredAltitude: 260,
    minimumRequiredSpeed: 0,
    equipmentSuffixes: "[LZGIW]",
    engineTypes: "J",
  },
]);
