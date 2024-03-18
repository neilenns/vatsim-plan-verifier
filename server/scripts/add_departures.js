// The current database to use.
use("plan-verifier");

db.departures.deleteMany({});
db.departures.dropIndex("SID_1");

db.departures.createIndex({ SID: 1 });
db.departures.insertMany([
  {
    AirportCode: "KMFR",
    SID: "EAGLE6",
    Telephony: "EAGLE SIX",
    Fixes: ["OED"],
    InitialAltitudes: [
      {
        Altitude: 110,
        AircraftClass: ".*",
        ExpectRequired: false,
        ExpectInMinutes: 5,
        InitialPhrasing: "ClimbViaSid",
        Flow: "NORTH",
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2402/pdf/00251EAGLE.PDF",
    },
  },
  {
    AirportCode: "KMFR",
    SID: "JKSN1",
    Telephony: "JACKSON ONE",
    Fixes: ["OED"],
    InitialAltitudes: [
      {
        Altitude: 110,
        AircraftClass: ".*",
        ExpectRequired: true,
        ExpectInMinutes: 5,
        InitialPhrasing: "Maintain",
        Flow: "ANY",
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2402/pdf/00251JACKSON.PDF",
    },
  },
  {
    AirportCode: "KMFR",
    SID: "MFR1",
    Telephony: "KLAMATH FALLS ONE",
    Fixes: ["LMT"],
    InitialAltitudes: [
      {
        Altitude: 110,
        AircraftClass: ".*",
        ExpectRequired: false,
        ExpectInMinutes: 5,
        InitialPhrasing: "Maintain",
        Flow: "SOUTH",
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2402/pdf/00251KLAMATHFALLS.PDF",
    },
  },
  {
    AirportCode: "KMFR",
    SID: "SMKKY1",
    Telephony: "SMOKEY ONE",
    Fixes: ["SMKKY"],
    InitialAltitudes: [
      {
        Altitude: 110,
        AircraftClass: ".*",
        ExpectRequired: true,
        ExpectInMinutes: 5,
        InitialPhrasing: "Maintain",
        Flow: "SOUTH",
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2402/pdf/00251KLAMATHFALLS.PDF",
    },
  },
  {
    AirportCode: "KPAE",
    SID: "PAE6",
    Telephony: "PAINE THREE",
    Fixes: ["PAE", "NUW", "SEA", "OLM", "HQM", "ELN", "EAT", "YKM"],
    InitialAltitudes: [
      {
        Altitude: 20,
        AircraftClass: ".*",
        ExpectRequired: false,
        ExpectInMinutes: 5,
        InitialPhrasing: "Maintain",
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2402/pdf/00142PAINE.PDF",
    },
  },
  {
    AirportCode: "KAST",
    SID: "AST3",
    Telephony: "ASTORIA THREE",
    Fixes: [],
    InitialAltitudes: [
      {
        Altitude: 50,
        AircraftClass: ".*",
        ExpectRequired: true,
        ExpectInMinutes: 5,
        InitialPhrasing: "Maintain",
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00024ASTORIA.PDF",
    },
  },
  {
    AirportCode: "KBDN",
    SID: "BDN1",
    Telephony: "BEND ONE",
    Fixes: [],
    InitialAltitudes: [
      {
        Altitude: 140,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectRequired: true,
        ExpectInMinutes: 5,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/05579BEND.PDF",
    },
  },
  {
    AirportCode: "KLWS",
    SID: "POTOR2",
    Telephony: "POTOR TWO",
    Fixes: ["POTOR"],
    InitialAltitudes: [
      {
        Altitude: 60,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSidExceptMaintain",
        ExpectRequired: true,
        ExpectInMinutes: 5,
      },
    ],
    IsRNAV: false,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00515POTOR.PDF",
    },
  },
  {
    AirportCode: "KMFR",
    SID: "EAGLE6",
    Telephony: "EAGLE SIX",
    Fixes: [],
    InitialAltitudes: [
      {
        Altitude: 110,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSidExceptMaintain",
        ExpectRequired: false,
        ExpectInMinutes: 5,
      },
    ],
    IsRNAV: false,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00251EAGLE.PDF",
    },
  },
  {
    AirportCode: "KMFR",
    SID: "JKSN1",
    Telephony: "JACKSON ONE",
    Fixes: ["OED"],
    InitialAltitudes: [
      {
        Altitude: 110,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSidExceptMaintain",
      },
    ],
    IsRNAV: false,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00251JACKSON.PDF",
    },
  },
  {
    AirportCode: "KMFR",
    SID: "MFR1",
    Telephony: "KLAMATH FALLS ONE",
    Fixes: ["LMT"],
    InitialAltitudes: [
      {
        Altitude: 110,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectRequired: false,
        ExpectInMinutes: 5,
      },
    ],
    IsRNAV: true,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00251KLAMATHFALLS.PDF",
    },
  },
  {
    AirportCode: "KMFR",
    SID: "SMKKY1",
    Telephony: "SMOKY ONE",
    Fixes: ["SMKKY"],
    InitialAltitudes: [
      {
        Altitude: 110,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectRequired: false,
        ExpectInMinutes: 5,
      },
    ],
    IsRNAV: false,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00251SMKKY.PDF",
    },
  },
  {
    AirportCode: "KNUW",
    SID: "CVV5",
    Telephony: "PENN COVE FIVE",
    Fixes: ["CVV", "DIGGN", "PAE"],
    InitialAltitudes: [
      {
        Altitude: 20,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSidExceptMaintain",
      },
    ],
    isRNAV: false,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00451PENNCOVE.PDF",
    },
  },
  {
    AirportCode: "KNUW",
    SID: "NASWI2",
    Telephony: "NASWI TWO",
    Fixes: ["NUW", "HUH", "STILY", "PAE", "CVV", "DIGGN", "YETII", "MCCUL", "DISCO", "TOU", "UQQ"],
    InitialAltitudes: [
      {
        Altitude: 20,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaDepartureExceptMaintain",
      },
    ],
    isRNAV: false,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00451NASWI.PDF",
    },
  },
  {
    AirportCode: "KOLM",
    SID: "YELM5",
    Telephony: "YELM FIVE",
    Fixes: ["OLM", "HQM", "TOU", "PAE", "SEA", "YKM", "BTG", "UBG"],
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSid",
        ExpectRequired: true,
        ExpectInMinutes: 5,
      },
    ],
    isRNAV: false,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00645YELM.PDF",
    },
  },
  {
    AirportCode: "KOTH",
    SID: "OTH7",
    Telephony: "NORTH BEND SEVEN",
    Fixes: ["OTH", "GAMMA", "RARES", "SCOTY", "DEROY", "LEDGE"],
    isRNAV: false,
    ExpectRequired: true,
    ExpectInMinutes: 5,
    InitialAltitudes: [
      {
        Altitude: 50,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectRequired: true,
        ExpectInMinutes: 5,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00929NORTHBEND.PDF",
    },
  },
  {
    AirportCode: "KPSC",
    SID: "PSC7",
    Telephony: "TRI-CITIES SEVEN",
    Fixes: ["PSC", "GEG", "PUW", "MQG", "ALW", "PDT", "LTJ", "YKM", "ELN", "EAT", "EPH", "MWH"],
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 100,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSid",
        ExpectRequired: false,
        ExpectInMinutes: 5,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00474TRI-CITIES.PDF",
    },
  },
  {
    AirportCode: "KRDM",
    SID: "RDM3",
    Telephony: "REDMOND THREE",
    Fixes: ["DSD", "IMB", "ILR", "LKV", "LMT", "OED", "EUG", "CVO", "UBG", "BTG", "LTJ", "PDT"],
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 140,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectRequired: false,
        ExpectInMinutes: 5,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00345REDMOND.PDF",
    },
  },
  {
    AirportCode: "KRNT",
    SID: "BELVU4",
    Telephony: "BELLEVUE FOUR",
    Fixes: [],
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSid",
        ExpectRequired: false,
        ExpectInMinutes: 5,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/05396BELLEVUE.PDF",
    },
  },
  {
    AirportCode: "KRNT",
    SID: "RENTN3",
    Telephony: "RENTON THREE",
    Fixes: [],
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSid",
        ExpectRequired: false,
        ExpectInMinutes: 5,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/thumb/05396RENTN.jpg",
    },
  },
  {
    AirportCode: "KSFF",
    SID: "FELTS4",
    Telephony: "FELTS FOUR",
    Fixes: ["GEG", "COE", "MLP", "PUW", "MQG", "ALW", "PDT", "PSC", "YKM", "MWH", "EPH", "HUH"],
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 120,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSid",
        ExpectRequired: false,
        ExpectInMinutes: 10,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00402FELTS.PDF",
    },
  },
  {
    AirportCode: "KSFF",
    SID: "HAYDE4",
    Telephony: "HAYDEN FOUR",
    Fixes: [],
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 120,
        AircraftClass: ".*",
        ExpectRequired: true,
        ExpectInMinutes: 5,
        InitialPhrasing: "ClimbViaSid",
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00402HAYDEN.PDF",
    },
  },
  {
    AirportCode: "KSFF",
    SID: "MNITO1",
    Telephony: "MANITO ONE",
    Fixes: ["GEG"],
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 120,
        AircraftClass: ".*",
        ExpectRequired: true,
        ExpectInMinutes: 5,
        InitialPhrasing: "Maintain",
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00402MANITO.PDF",
    },
  },
  {
    AirportCode: "KSLE",
    SID: "SLE4",
    Telephony: "SALEM FOUR",
    Fixes: ["UBG", "BTG", "SL", "CVO", "DSD", "EUG", "ONP"],
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 90,
        AircraftClass: ".*",
        ExpectRequired: false,
        ExpectInMinutes: 10,
        InitialPhrasing: "Maintain",
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00361SALEM.PDF",
    },
  },
  {
    AirportCode: "KTCM",
    SID: "ALDER2",
    Telephony: "ALDER TWO",
    Fixes: ["ALDER"],
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
        ExpectRequired: true,
        ExpectInMinutes: 5,
        InitialPhrasing: "ClimbViaSidExceptMaintain",
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00414ALDER.PDF",
    },
  },
  {
    AirportCode: "KTCM",
    SID: "MOCAA4",
    Telephony: "MOCHA FOUR",
    Fixes: ["MOCHA", "BKE", "IMB", "JINMO"],
    isRNAV: true,
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSid",
        ExpectRequired: false,
        ExpectInMinutes: 5,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00414MOCAA.PDF",
    },
  },
  {
    AirportCode: "KTCM",
    SID: "OLY4",
    Telephony: "OLYMPIC FOUR",
    Fixes: [],
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSidExceptMaintain",
        ExpectRequired: true,
        ExpectInMinutes: 5,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00414OLYMPIC.PDF",
    },
  },
  {
    AirportCode: "KTCM",
    SID: "PUGET6",
    Telephony: "PUGET SIX",
    Fixes: [],
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSidExceptMaintain",
        ExpectRequired: true,
        ExpectInMinutes: 5,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00414PUGET.PDF",
    },
  },
  {
    AirportCode: "KTIW",
    SID: "TIW1",
    Telephony: "NARROWS ONE",
    Fixes: [],
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 20,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSidExceptMaintain",
        ExpectRequired: false,
        ExpectInMinutes: 5,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/05186NARROWS.PDF",
    },
  },
  {
    AirportCode: "KTTD",
    SID: "TDD3",
    Telephony: "BLUE LAKE THREE",
    Fixes: [],
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectRequired: true,
        ExpectInMinutes: 5,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00649BLUELAKE.PDF",
    },
  },
  {
    AirportCode: "KUAO",
    SID: "GLARA2",
    Telephony: "GLARA TWO",
    Fixes: ["GLARA"],
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSidExceptMaintain",
        ExpectRequired: true,
        ExpectInMinutes: 5,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/05722GLARA.PDF",
    },
  },
  {
    AirportCode: "KUAO",
    SID: "GNNET2",
    Telephony: "NET TWO",
    Fixes: ["GNNET"],
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSidExceptMaintain",
        ExpectRequired: true,
        ExpectInMinutes: 5,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/05722GNNET.PDF",
    },
  },
  {
    AirportCode: "KONP",
    SID: "ONP1",
    Telephony: "NEWPORT ONE",
    Fixes: ["ONP"],
    IsRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 50,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectRequired: false,
        ExpectInMinutes: 5,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00735NEWPORT.PDF",
    },
  },
  {
    AirportCode: "KORS",
    SID: "FEGBA2",
    Telephony: "FEGBA 2",
    Fixes: ["FEGBA"],
    IsRNAV: true,
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectRequired: true,
        ExpectInMinutes: 5,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/10384FEGBA.PDF",
    },
  },
  {
    AirportCode: "KUAO",
    SID: "UBG2",
    Telephony: "NEWBERG TWO",
    Fixes: ["UBG"],
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSidExceptMaintain",
        ExpectRequired: true,
        ExpectInMinutes: 5,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/05722NEWBERG.PDF",
    },
  },
  {
    AirportCode: "KYKM",
    SID: "GROMO4",
    Telephony: "GROMO FOUR",
    Fixes: ["TAMPO", "SIMCO", "HITCH", "GUBSE", "SUNED", "PAPPS"],
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 100,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSidExceptMaintain",
        ExpectRequired: true,
        ExpectInMinutes: 5,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00465GROMO.PDF",
    },
  },
  {
    AirportCode: "KYKM",
    SID: "NACHE4",
    Telephony: "NACHES FOUR",
    Fixes: ["YKM", "ELN", "EAT", "EPH", "MWH", "GEG", "PSC", "ALW", "PDT", "LTJ", "BTG", "SEA"],
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 100,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSidExceptMaintain",
        ExpectRequired: false,
        ExpectInMinutes: 5,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00465NACHES.PDF",
    },
  },
  {
    AirportCode: "KYKM",
    SID: "WENAS7",
    Telephony: "WENAS SEVEN",
    Fixes: ["TITON", "PERTT", "ELN", "RUBEL", "PAPPS", "SUNED"],
    isRNAV: false,
    ExpectRequired: true,
    ExpectInMinutes: 5,
    InitialAltitudes: [
      {
        Altitude: 100,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSidExceptMaintain",
        ExpectRequired: true,
        ExpectInMinutes: 5,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00465WENAS.PDF",
    },
  },
  {
    AirportCode: "KYKM",
    SID: "YKM7",
    Telephony: "YAKIMA SEVEN",
    Fixes: ["TITON"],
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 100,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectRequired: true,
        ExpectInMinutes: 5,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00465YAKIMA.PDF",
    },
  },
  {
    AirportCode: "KZSE",
    SID: "ZILLA3",
    Telephony: "ZILLA THREE",
    Fixes: [],
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 100,
        AircraftClass: ".*",
        InitialPhrasing: "Unknown",
        ExpectRequired: true,
        ExpectInMinutes: 5,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00465ZILLA.PDF",
    },
  },
  {
    AirportCode: "KALW",
    SID: "ALW2",
    Telephony: "WALLA WALLA TWO",
    Fixes: ["ALW", "YKM", "MWH", "GEG", "PUW", "MQG", "PSC", "PTD"],
    InitialAltitudes: [
      {
        Altitude: 80,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectRequired: true,
        ExpectInMinutes: 10,
      },
    ],
    IsRNAV: false,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00440WALLAWALLA.PDF",
    },
  },
  {
    AirportCode: "KEUG",
    SID: "EUG1",
    Telephony: "EUGENE ONE",
    Fixes: ["EUG", "CVO", "DSD", "LMT", "OED", "RBG", "OTH", "ONP", "UBG", "BTG"],
    InitialAltitudes: [
      {
        Altitude: 90,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectRequired: false,
        ExpectInMinutes: 5,
      },
    ],
    IsRNAV: false,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00140EUGENE.PDF",
    },
  },
  {
    AirportCode: "KGEG",
    SID: "GEG7",
    Telephony: "SPOKANE 7",
    Fixes: ["GEG", "MLP", "PUW", "MQG", "ALW", "PDT", "PSC", "YKM", "MWH", "EPH", "HUH", "COE"],
    InitialAltitudes: [
      {
        Altitude: 60,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectRequired: false,
        ExpectInMinutes: 10,
      },
    ],
    IsRNAV: false,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00403SPOKANE.PDF",
    },
  },
  {
    AirportCode: "KHIO",
    SID: "BERNI3",
    Telephony: "BERNI THREE",
    Fixes: ["BERNI", "EASON", "EUG", "FAMUK", "HARPR"],
    IsRNAV: true,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSidExceptMaintain",
        ExpectRequired: false,
        ExpectInMinutes: 10,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/05063BERNI.PDF",
    },
  },
  {
    AirportCode: "KHIO",
    SID: "CANBY2",
    Telephony: "CANBY TWO",
    Fixes: ["CANBY"],
    IsRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectRequired: true,
        ExpectInMinutes: 10,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/05063CANBY.PDF",
    },
  },
  {
    AirportCode: "KHIO",
    SID: "CHISM4",
    Telephony: "CHISM FOUR",
    Fixes: ["CHISM", "PAWLI", "SMIGE", "JOGEN", "DSD", "RIELY", "IMB"],
    IsRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSidExceptMaintain",
        ExpectRequired: false,
        ExpectInMinutes: 10,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/05063CHISM.PDF",
    },
  },
  {
    AirportCode: "KHIO",
    SID: "FARM7",
    Telephony: "FARMINGTON SEVEN",
    Fixes: ["UBG"],
    IsRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectRequired: true,
        ExpectInMinutes: 10,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/05063FARMINGTON.PDF",
    },
  },
  {
    AirportCode: "KHIO",
    SID: "SCAPO7",
    Telephony: "SCAPO SEVEN",
    Fixes: ["SCAPO"],
    IsRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectRequired: true,
        ExpectInMinutes: 10,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/05063SCAPO.PDF",
    },
  },
  {
    AirportCode: "KBFI",
    SID: "CBAIN1",
    Telephony: "COBAIN ONE",
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
        InitialPhrasing: "ClimbViaSid",
        ExpectRequired: false,
        ExpectInMinutes: 3,
      },
    ],
    IsRNAV: true,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00384CBAIN.PDF",
    },
  },
  {
    AirportCode: "KBFI",
    SID: "KENT8",
    Telephony: "KENT EIGHT",
    Fixes: ["YVR", "HUH", "YYJ", "PAE", "SEA", "OLM", "HQM", "BTG", "ELN", "YKM", "MWH", "EAT"],
    IsRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 20,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSid",
        ExpectRequired: false,
        ExpectInMinutes: 3,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00384KENT.PDF",
    },
  },
  {
    AirportCode: "KBFI",
    SID: "NEEDL1",
    Telephony: "NEEDLE ONE",
    Fixes: ["YVR", "HUH", "YYJ", "PAE", "SEA", "OLM", "HQM", "BTG", "ELN", "YKM", "MWH", "EAT"],
    IsRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 21,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectRequired: false,
        ExpectInMinutes: 3,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00384NEEDLE.PDF",
    },
  },
  {
    AirportCode: "KBFI",
    SID: "NRVNA1",
    Telephony: "NIRVANA ONE",
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
        InitialPhrasing: "ClimbViaSid",
        ExpectRequired: false,
        ExpectInMinutes: 3,
      },
    ],
    IsRNAV: true,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00384NRVNA.PDF",
    },
  },
  {
    AirportCode: "KPDX",
    SID: "WHAMY4",
    Telephony: "WHAMY FOUR",
    Fixes: ["WHAMY", "IMB", "RIELY", "KOATA"],
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectInMinutes: 10,
        ExpectRequired: false,
      },
    ],
    IsRNAV: true,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00330WHAMY.PDF",
    },
  },
  {
    AirportCode: "KPDX",
    SID: "CASCD2",
    Telephony: "CASCADE TWO",
    Fixes: ["CHISM", "DSD", "JOGEN", "SMIGE", "PAWLI"],
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectInMinutes: 10,
        ExpectRequired: false,
      },
    ],
    IsRNAV: true,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00330CASCADE.PDF",
    },
  },
  {
    AirportCode: "KPDX",
    SID: "HRMNS5",
    Telephony: "HERMANS FIVE",
    Fixes: ["HRMNS"],
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectInMinutes: 10,
        ExpectRequired: false,
      },
    ],
    IsRNAV: true,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00330HRMNS.PDF",
    },
  },
  {
    AirportCode: "KPDX",
    SID: "LAVAA6",
    Telephony: "LAVA SIX",
    Fixes: ["LAVAA", "YKM", "PDT"],
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
        InitialPhrasing: "Maintain",
        ExpectInMinutes: 10,
        ExpectRequired: false,
      },
    ],
    IsRNAV: true,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00330LAVAA.PDF",
    },
  },
  {
    AirportCode: "KPDX",
    SID: "MINNE5",
    Telephony: "MINNE FIVE",
    Fixes: ["MINNE", "EASON", "FAMUK", "HISKU"],
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
        ExpectInMinutes: 10,
        ExpectRequired: false,
        InitialPhrasing: "Maintain",
      },
    ],
    IsRNAV: true,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00330MINNE.PDF",
    },
  },
  {
    AirportCode: "KPDX",
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
        ExpectInMinutes: 5,
        ExpectRequired: false,
        InitialPhrasing: "Maintain",
      },
      {
        Altitude: 60,
        AircraftClass: "L",
        ExpectInMinutes: 5,
        ExpectRequired: false,
        InitialPhrasing: "Maintain",
      },
      {
        Altitude: 30,
        AircraftClass: "S",
        ExpectInMinutes: 5,
        ExpectRequired: false,
        InitialPhrasing: "Maintain",
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00330PORTLAND.PDF",
    },
  },
  {
    AirportCode: "KSEA",
    SID: "ELMAA4",
    Telephony: "ELMA FOUR",
    Fixes: ["ELMAA", "HQM", "CVO"],
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSidExceptMaintain",
        Flow: "SOUTH",
      },
      {
        Altitude: 90,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSidExceptMaintain",
        Flow: "NORTH",
      },
    ],
    IsRNAV: true,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00582ELMAA.PDF",
    },
  },
  {
    AirportCode: "KSEA",
    SID: "HAROB6",
    Telephony: "HAROB SIX",
    Fixes: ["HAROB", "HQM", "FEPOT", "ERAVE", "HISKU"],
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSidExceptMaintain",
        ExpectRequired: false,
        ExpectInMiles: "15nm SEA",
        Flow: "SOUTH",
      },
      {
        Altitude: 90,
        AircraftClass: ".*",
        InitialPhrasing: "ClimbViaSidExceptMaintain",
        ExpectRequired: false,
        ExpectInMiles: "15nm SEA",
        Flow: "NORTH",
      },
    ],
    IsRNAV: true,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00582HAROB.PDF",
    },
  },
  {
    AirportCode: "KSEA",
    SID: "ISBRG1",
    Telephony: "ICEBERG ONE",
    Fixes: ["ISBRG"],
    InitialAltitudes: [
      {
        Altitude: 90,
        AircraftClass: ".*",
        ExpectRequired: false,
        ExpectInMinutes: 5,
        InitialPhrasing: "ClimbViaSid",
      },
    ],
    Flow: "NORTH",
    IsRNAV: true,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00582ISBRG.PDF",
    },
    DepartureValidity: {
      StartTime: 2200,
      EndTime: 600,
      Alternates: ["BANGR9", "HAROB6"],
    },
  },
  {
    AirportCode: "KSEA",
    SID: "OZWLD1",
    Telephony: "OSWALD ONE",
    Fixes: ["OZWLD"],
    InitialAltitudes: [
      {
        Altitude: 90,
        AircraftClass: ".*",
        ExpectRequired: false,
        ExpectInMinutes: 5,
        InitialPhrasing: "ClimbViaSid",
      },
    ],
    Flow: "NORTH",
    IsRNAV: true,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00582OZWLD.PDF",
    },
    DepartureValidity: {
      StartTime: 2200,
      EndTime: 600,
      Alternates: ["BANGR9", "HAROB6", "SUMMA2"],
    },
  },
  {
    AirportCode: "KSEA",
    SID: "JEFPO1",
    Telephony: "JEFPO ONE",
    Fixes: ["ALPSE", "BANDR", "JEFPO", "NORMY", "PAE", "ZADON"],
    InitialAltitudes: [
      {
        Altitude: 90,
        AircraftClass: ".*",
        ExpectRequired: false,
        ExpectInMinutes: 5,
        InitialPhrasing: "ClimbViaSid",
      },
    ],
    Flow: "NORTH",
    IsRNAV: true,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00582JEFPO.PDF",
    },
    DepartureValidity: {
      StartTime: 2200,
      EndTime: 600,
      Alternates: ["MONTN2"],
    },
  },
  {
    AirportCode: "KSEA",
    SID: "SUMMA2",
    Telephony: "SUMMA TWO",
    Fixes: ["SUMMA", "BKE", "LKV"],
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
        Flow: "SOUTH",
        InitialPhrasing: "Maintain",
        ExpectInMiles: "15nm SEA",
        ExpectRequired: true,
      },
      {
        Altitude: 90,
        AircraftClass: ".*",
        Flow: "NORTH",
        InitialPhrasing: "ClimbViaSidExceptMaintain",
        ExpectInMiles: "15nm SEA",
        ExpectRequired: true,
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00582SUMMA.PDF",
    },
  },
  {
    AirportCode: "KSEA",
    SID: "MONTN2",
    Telephony: "MOUNTAIN TWO",
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
        InitialPhrasing: "ClimbViaSidExceptMaintain",
        Altitude: 90,
        Flow: "NORTH",
        AircraftClass: ".*",
        ExpectRequired: false,
        ExpectInMiles: "15nm SEA",
      },
      {
        InitialPhrasing: "ClimbViaSidExceptMaintain",
        Altitude: 70,
        Flow: "SOUTH",
        AircraftClass: ".*",
        ExpectRequired: false,
        ExpectInMiles: "15nm SEA",
      },
    ],
    IsRNAV: true,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00582MOUNTAIN.PDF",
    },
  },
  {
    AirportCode: "KSEA",
    SID: "BANGR9",
    Telephony: "BANGOR NINE",
    IsRNAV: true,
    Fixes: ["BANGR", "PANGL", "ARRIE"],
    InitialAltitudes: [
      {
        InitialPhrasing: "ClimbViaSidExceptMaintain",
        Altitude: 90,
        ExpectRequired: false,
        ExpectInMiles: "15nm SEA",
        Flow: "NORTH",
        AircraftClass: ".*",
      },
      {
        InitialPhrasing: "ClimbViaSidExceptMaintain",
        Altitude: 70,
        ExpectRequired: false,
        ExpectInMiles: "15nm SEA",
        Flow: "SOUTH",
        AircraftClass: ".*",
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00582BANGR.PDF",
    },
  },
  {
    AirportCode: "KSEA",
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
        Altitude: 90,
        AircraftClass: ".*",
        ExpectInMiles: "15nm SEA",
        ExpectRequired: true,
        Flow: "NORTH",
        InitialPhrasing: "Maintain",
      },
      {
        Altitude: 70,
        AircraftClass: ".*",
        ExpectInMiles: "15nm SEA",
        ExpectRequired: true,
        Flow: "SOUTH",
        InitialPhrasing: "Maintain",
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00582SEATTLE.PDF",
    },
  },
  {
    AirportCode: "KPAE",
    SID: "PAINE6",
    Telephony: "PAINE SIX",
    IsRNAV: false,
    Fixes: ["PAE", "SEA", "EAT", "ELN", "OLM", "HQM", "NUW"],
    InitialAltitudes: [
      {
        Altitude: 20,
        AircraftClass: ".*",
        ExpectRequired: false,
        ExpectInMinutes: 5,
        InitialPhrasing: "Maintain",
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00142PAINE.PDF",
    },
  },
  {
    AirportCode: "KBLI",
    SID: "KIENO6",
    Telephony: "KIENO SIX",
    IsRNAV: false,
    Fixes: ["KIENO", "YVR", "YYJ", "CVV"],
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
        ExpectRequired: false,
        ExpectInMinutes: 10,
        InitialPhrasing: "ClimbViaSidExceptMaintain",
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00045KIENO.PDF",
    },
  },
  {
    AirportCode: "KBLI",
    SID: "KLSHN1",
    Telephony: "KULSHAN ONE",
    Fixes: ["KLSHN", "CVV"],
    IsRNAV: true,
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
        ExpectRequired: false,
        ExpectInMinutes: 5,
        InitialPhrasing: "ClimbViaSidExceptMaintain",
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00045KLSHN.PDF",
    },
  },
  {
    AirportCode: "KCLM",
    SID: "WATTR7",
    Telephony: "WATER SEVEN",
    Fixes: ["WATTR"],
    IsRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 54,
        AircraftClass: ".*",
        ExpectRequired: true,
        ExpectInMinutes: 10,
        InitialPhrasing: "Maintain",
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00886WATTR.PDF",
    },
  },
  {
    AirportCode: "KCVO",
    SID: "SHEDD4",
    Telephony: "SHED FOUR",
    Fixes: ["SHEDD"],
    IsRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
        ExpectRequired: true,
        ExpectInMinutes: 5,
        InitialPhrasing: "Maintain",
      },
    ],
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00782SHEDD.PDF",
    },
  },
  {
    AirportCode: "KLMT",
    SID: "LMT6",
    Telephony: "KINGSLEY SIX",
    Fixes: ["LMT", "LKV", "RBL", "FMG", "FJS", "OED", "RBG", "DSD", "EUG"],
    InitialAltitudes: [
      {
        Altitude: 100,
        AircraftClass: ".*",
        ExpectRequired: false,
        ExpectInMinutes: 5,
        InitialPhrasing: "Maintain",
      },
    ],
    IsRNAV: false,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00473KINGSLEY.PDF",
    },
  },
]);
