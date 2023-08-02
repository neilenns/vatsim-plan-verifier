// The current database to use.
use("plan-verifier");

db.departures.deleteMany({});

db.departures.insertMany([
  {
    SID: "POTOR2",
    Telephony: "POTOR TWO",
    Fixes: ["POTOR"],
    ClimbViaSid: false,
    InitialAltitudes: [
      {
        Altitude: 60,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: false,
  },
  {
    SID: "EAGLE6",
    Telephony: "EAGLE SIX",
    Fixes: [],
    ClimbViaSid: false,
    InitialAltitudes: [
      {
        Altitude: 110,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: false,
  },
  {
    SID: "JKSN1",
    Telephony: "JACKSON ONE",
    Fixes: ["OED"],
    ClimbViaSid: true,
    InitialAltitudes: [
      {
        Altitude: 110,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: false,
  },
  {
    SID: "MFR1",
    Telephony: "KLAMATH FALLS ONE",
    Fixes: ["LMT"],
    ClimbViaSid: false,
    InitialAltitudes: [
      {
        Altitude: 110,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: true,
  },
  {
    SID: "SMKKY1",
    Telephony: "SMOKY ONE",
    Fixes: ["SMKKY"],
    ClimbViaSid: false,
    InitialAltitudes: [
      {
        Altitude: 110,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: false,
  },
  {
    SID: "CVV5",
    Telephony: "PENN COVE FIVE",
    Fixes: ["CVV", "DIGGN", "PAE"],
    ClimbViaSid: true,
    InitialAltitudes: [
      {
        Altitude: 20,
        AircraftClass: ".*",
      },
    ],
    isRNAV: false,
  },
  {
    SID: "NASWI2",
    Telephony: "NASWI TWO",
    Fixes: ["NUW", "HUH", "STILY", "PAE", "CVV", "DIGGN", "YETII", "MCCUL", "DISCO", "TOU", "UQQ"],
    ClimbViaSid: false,
    InitialAltitudes: [
      {
        Altitude: 20,
        AircraftClass: ".*",
      },
    ],
    isRNAV: false,
  },
  {
    SID: "YELM5",
    Telephony: "YELM FIVE",
    Fixes: ["OLM", "HQM", "TOU", "PAE", "SEA", "YKM", "BTG", "UBG"],
    ClimbViaSid: false,
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
      },
    ],
    isRNAV: false,
  },
  {
    SID: "OTH7",
    Telephony: "NORTH BEND SEVEN",
    Fixes: ["OTH", "GAMMA", "RARES", "SCOTY", "DEROY", "LEDGE"],
    ClimbViaSid: true,
    isRNAV: false,
    ExpectRequired: true,
    ExpectInMinutes: 5,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "PSC7",
    Telephony: "TRI-CITIES SEVEN",
    Fixes: ["PSC", "GEG", "PUW", "MQG", "ALW", "PDT", "LTJ", "YKM", "ELN", "EAT", "EPH", "MWH"],
    ClimbViaSid: false,
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 100,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "RDM3",
    Telephony: "REDMOND THREE",
    Fixes: ["DSD", "IMB", "ILR", "LKV", "LMT", "OED", "EUG", "CVO", "UBG", "BTG", "LTJ", "PDT"],
    ClimbViaSid: false,
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 140,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "BELVU4",
    Telephony: "BELLEVUE FOUR",
    Fixes: [],
    ClimbViaSid: false,
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "RENTN3",
    Telephony: "RENTON THREE",
    Fixes: [],
    ClimbViaSid: false,
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "FELTS4",
    Telephony: "FELTS FOUR",
    Fixes: ["GEG", "COE", "MLP", "PUW", "MQG", "ALW", "PDT", "PSC", "YKM", "MWH", "EPH", "HUH"],
    ClimbViaSid: false,
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 120,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "HAYDE4",
    Telephony: "HAYDEN FOUR",
    Fixes: [],
    ClimbViaSid: false,
    isRNAV: false,
    ExpectRequired: true,
    ExpectInMinutes: 5,
    InitialAltitudes: [
      {
        Altitude: 120,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "MNITO1",
    Telephony: "MANITO ONE",
    Fixes: ["GEG"],
    ClimbViaSid: false,
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 120,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "SLE4",
    Telephony: "SALEM FOUR",
    Fixes: ["UBG", "BTG", "SL", "CVO", "DSD", "EUG", "ONP"],
    ClimbViaSid: false,
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 90,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "ALDER2",
    Telephony: "ALDER TWO",
    Fixes: ["ALDER"],
    ClimbViaSid: true,
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "MOCAA4",
    Telephony: "MOCHA FOUR",
    Fixes: ["MOCHA", "BKE", "IMB", "JINMO"],
    ClimbViaSid: true,
    isRNAV: true,
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "OLY4",
    Telephony: "OLYMPIC FOUR",
    Fixes: [],
    ClimbViaSid: true,
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "PUGET6",
    Telephony: "PUGET SIX",
    Fixes: [],
    ClimbViaSid: true,
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "TIW1",
    Telephony: "NARROWS ONE",
    Fixes: [],
    ClimbViaSid: true,
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 20,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "TDD3",
    Telephony: "BLUE LAKE THREE",
    Fixes: [],
    ClimbViaSid: true,
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "GLARA2",
    Telephony: "GLARA TWO",
    Fixes: ["GLARA"],
    ClimbViaSid: true,
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "GNNET2",
    Telephony: "NET TWO",
    Fixes: ["GNNET"],
    ClimbViaSid: true,
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "UBG2",
    Telephony: "NEWBERG TWO",
    Fixes: ["UBG"],
    ClimbViaSid: true,
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "GROMO4",
    Telephony: "GROMO FOUR",
    Fixes: ["TAMPO", "SIMCO", "HITCH", "GUBSE", "SUNED", "PAPPS"],
    ClimbViaSid: false,
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 100,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "NACHE4",
    Telephony: "NACHES FOUR",
    Fixes: ["YKM", "ELN", "EAT", "EPH", "MWH", "GEG", "PSC", "ALW", "PDT", "LTJ", "BTG", "SEA"],
    ClimbViaSid: false,
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 100,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "WENAS7",
    Telephony: "WENAS SEVEN",
    Fixes: ["TITON", "PERTT", "ELN", "RUBEL", "PAPPS", "SUNED"],
    ClimbViaSid: false,
    isRNAV: false,
    ExpectRequired: true,
    ExpectInMinutes: 5,
    InitialAltitudes: [
      {
        Altitude: 100,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "YKM7",
    Telephony: "YAKIMA SEVEN",
    Fixes: ["TITON"],
    ClimbViaSid: false,
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 100,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "ZILLA3",
    Telephony: "ZILLA THREE",
    Fixes: [],
    ClimbViaSid: false,
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 100,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "ALW2",
    Telephony: "WALLA WALLA TWO",
    Fixes: ["ALW", "YKM", "MWH", "GEG", "PUW", "MQG", "PSC", "PTD"],
    ClimbViaSid: false,
    InitialAltitudes: [
      {
        Altitude: 80,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: false,
  },
  {
    SID: "EUG1",
    Telephony: "EUGENE ONE",
    Fixes: ["EUG", "CVO", "DSD", "LMT", "OED", "RBG", "OTH", "ONP", "UBG", "BTG"],
    ClimbViaSid: false,
    InitialAltitudes: [
      {
        Altitude: 90,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: false,
  },
  {
    SID: "GEG7",
    Telephony: "SPOKANE 7",
    Fixes: ["GEG", "MLP", "PUW", "MQG", "ALW", "PDT", "PSC", "YKM", "MWH", "EPH", "HUH", "COE"],
    ClimbViaSid: false,
    InitialAltitudes: [
      {
        Altitude: 60,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: false,
  },
  {
    SID: "BERNI3",
    Telephony: "BERNI THREE",
    Fixes: ["BERNI", "EASON", "EUG", "FAMUK", "HARPR"],
    ClimbViaSid: false,
    IsRNAV: true,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "CANBY2",
    Telephony: "CANBY TWO",
    Fixes: ["CANBY"],
    ClimbViaSid: false,
    IsRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "CHISM4",
    Telephony: "CHISM FOUR",
    Fixes: ["CHISM", "PAWLI", "SMIGE", "JOGEN", "DSD", "RIELY", "IMB"],
    ClimbViaSid: false,
    IsRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "FARM7",
    Telephony: "FARMINGTON SEVEN",
    Fixes: ["UBG"],
    ClimbViaSid: false,
    IsRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "SCAPO7",
    Telephony: "SCAPO SEVEN",
    Fixes: ["SCAPO"],
    ClimbViaSid: false,
    IsRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "CBAIN1",
    Telephony: "COBAIN ONE",
    ClimbViaSid: true,
    Fixes: [
      "ARRIE",
      "PAE",
      "LOFAL",
      "BANGR",
      "ZADON",
      "NORMY",
      "VAMPS",
      "BUWZO",
      "ALDER",
      "SUMMA",
      "OLM",
      "HAROB",
      "ELMAA",
    ],
    InitialAltitudes: [
      {
        Altitude: 21,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: true,
  },
  {
    SID: "KENT8",
    Telephony: "KENT EIGHT",
    ClimbViaSid: false,
    Fixes: ["YVR", "HUH", "YYJ", "PAE", "SEA", "OLM", "HQM", "BTG", "ELN", "YKM", "MWH", "EAT"],
    IsRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 20,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "NEEDL1",
    Telephony: "NEEDLE ONE",
    ClimbViaSid: false,
    Fixes: ["YVR", "HUH", "YYJ", "PAE", "SEA", "OLM", "HQM", "BTG", "ELN", "YKM", "MWH", "EAT"],
    IsRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 21,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "NRVNA1",
    Telephony: "NIRVANA ONE",
    ClimbViaSid: false,
    InitialAltitudes: [
      {
        Altitude: 21,
        AircraftClass: ".*",
      },
    ],
    Fixes: [
      "ARRIE",
      "PAE",
      "LOFAL",
      "BANGR",
      "ZADON",
      "NORMY",
      "VAMPS",
      "BUWZO",
      "ALDER",
      "SUMMA",
      "OLM",
      "HAROB",
      "ELMAA",
    ],
    IsRNAV: true,
  },
  {
    SID: "WHAMY4",
    Telephony: "WHAMY FOUR",
    Fixes: ["WHAMY", "IMB", "RIELY", "KOATA"],
    ClimbViaSid: false,
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: true,
  },
  {
    SID: "CASCD2",
    Telephony: "CASCADE TWO",
    Fixes: ["CHISM", "DSD", "JOGEN", "SMIGE", "PAWLI"],
    ClimbViaSid: false,
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: true,
  },
  {
    SID: "HRMNS5",
    Telephony: "HERMANS FIVE",
    Fixes: ["HRMNS"],
    ClimbViaSid: false,
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: true,
  },
  {
    SID: "LAVAA6",
    Telephony: "LAVA SIX",
    Fixes: ["LAVAA", "YKM", "PDT"],
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: true,
  },
  {
    SID: "MINNE5",
    Telephony: "MINNE FIVE",
    Fixes: ["MINNE", "EASON", "FAMUK", "HISKU"],
    ClimbViaSid: false,
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: true,
  },
  {
    SID: "PTLD2",
    Telephony: "PORTLAND TWO",
    Fixes: [
      "BTG",
      "YKM",
      "LTJ",
      "PDT",
      "IMB",
      "LKV",
      "LMT",
      "DSD",
      "EUG",
      "OED",
      "OTH",
      "ONP",
      "UBG",
      "AST",
      "TOU",
      "OLM",
      "SEA",
      "LAVAA",
      "WHAMY",
      "CHISM",
      "HRMNS",
      "MINNE",
      "COUGA",
    ],
    IsRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 60,
        AircraftClass: "J",
      },
      {
        Altitude: 60,
        AircraftClass: "L",
      },
      {
        Altitude: 30,
        AircraftClass: "S",
      },
    ],
  },
  {
    SID: "ELMAA4",
    Telephony: "ELMA FOUR",
    Fixes: ["ELMAA", "HQM", "CVO"],
    ClimbViaSid: true,
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: true,
  },
  {
    SID: "HAROB6",
    Telephony: "HAROB SIX",
    Fixes: ["HAROB", "HQM", "ERAVE", "HISKU"],
    ClimbViaSid: true,
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: true,
  },
  {
    SID: "JEFPO1",
    Telephony: "JEFPO ONE",
    Fixes: ["ALPSE", "BANDR", "NORMY", "PAE", "ZADON"],
    ClimbViaSid: true,
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: true,
  },
  {
    SID: "SUMMA2",
    Telephony: "SUMMA TWO",
    Fixes: ["SUMMA", "BKE", "LKV"],
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "MONTN2",
    Telephony: "MOUNTAIN TWO",
    ClimbViaSid: true,
    Fixes: [
      "PAE",
      "VAMPS",
      "ZADON",
      "NORMY",
      "ZELAK",
      "MODDA",
      "BANDR",
      "SEA",
      "YDC",
      "GEG",
      "MLP",
      "EPH",
      "MWH",
      "ELN",
      "ALPSE",
    ],
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: true,
  },
  {
    SID: "BANGR9",
    Telephony: "BANGOR NINE",
    IsRNAV: true,
    Fixes: ["BANGR", "PANGL", "ARRIE"],
    ClimbViaSid: true,
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "SEA8",
    Telephony: "SEATTLE EIGHT",
    IsRNAV: false,
    Fixes: [
      "SEA",
      "TOU",
      "YYJ",
      "YVR",
      "HUH",
      "YDC",
      "PAE",
      "EPH",
      "ELN",
      "YKM",
      "OLM",
      "BTG",
      "UBG",
      "EUG",
      "AST",
      "HQM",
    ],
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "PAINE6",
    Telephony: "PAINE SIX",
    IsRNAV: false,
    Fixes: ["PAE", "SEA", "EAT", "ELN", "OLM", "HQM", "NUW"],
    InitialAltitudes: [
      {
        Altitude: 20,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "KIENO6",
    Telephony: "KIENO SIX",
    IsRNAV: false,
    Fixes: ["KIENO", "YVR", "YYJ", "CVV"],
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
      },
    ],
  },
  {
    SID: "LMT6",
    Telephony: "KINGSLEY SIX",
    Fixes: ["LMT", "LKV", "RBL", "FMG", "FJS", "OED", "RBG", "DSD", "EUG"],
    ClimbViaSid: false,
    InitialAltitudes: [
      {
        Altitude: 100,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: false,
  },
]);
