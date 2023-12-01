// The current database to use.
use("plan-verifier");

db.departures.deleteMany({});

db.departures.insertMany([
  {
    AirportCode: "KAST",
    SID: "AST3",
    Telephony: "ASTORIA THREE",
    Fixes: [],
    InitialPhrasing: "Maintain",
    InitialAltitudes: [
      {
        Altitude: 50,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: true,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00024ASTORIA.PDF",
    },
  },
  {
    AirportCode: "KBDN",
    SID: "BDN1",
    Telephony: "BEND ONE",
    Fixes: [],
    InitialPhrasing: "Maintain",
    InitialAltitudes: [
      {
        Altitude: 140,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: true,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/05579BEND.PDF",
    },
  },
  {
    AirportCode: "KLWS",
    SID: "POTOR2",
    Telephony: "POTOR TWO",
    Fixes: ["POTOR"],
    InitialPhrasing: "ClimbViaSidExceptMaintain",
    InitialAltitudes: [
      {
        Altitude: 60,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: false,
    ExpectRequired: true,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00515POTOR.PDF",
    },
  },
  {
    AirportCode: "KMFR",
    SID: "EAGLE6",
    Telephony: "EAGLE SIX",
    Fixes: [],
    InitialPhrasing: "ClimbViaSidExceptMaintain",
    InitialAltitudes: [
      {
        Altitude: 110,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: false,
    ExpectRequired: false,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00251EAGLE.PDF",
    },
  },
  {
    AirportCode: "KMFR",
    SID: "JKSN1",
    Telephony: "JACKSON ONE",
    Fixes: ["OED"],
    InitialPhrasing: "ClimbViaSidExceptMaintain",
    InitialAltitudes: [
      {
        Altitude: 110,
        AircraftClass: ".*",
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
    InitialPhrasing: "Maintain",
    InitialAltitudes: [
      {
        Altitude: 110,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: true,
    ExpectRequired: false,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00251KLAMATHFALLS.PDF",
    },
  },
  {
    AirportCode: "KMFR",
    SID: "SMKKY1",
    Telephony: "SMOKY ONE",
    Fixes: ["SMKKY"],
    InitialPhrasing: "Maintain",
    InitialAltitudes: [
      {
        Altitude: 110,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: false,
    ExpectRequired: false,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00251SMKKY.PDF",
    },
  },
  {
    AirportCode: "KNUW",
    SID: "CVV5",
    Telephony: "PENN COVE FIVE",
    Fixes: ["CVV", "DIGGN", "PAE"],
    InitialPhrasing: "ClimbViaSidExceptMaintain",
    InitialAltitudes: [
      {
        Altitude: 20,
        AircraftClass: ".*",
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
    InitialPhrasing: "ClimbViaDepartureExceptMaintain",
    InitialAltitudes: [
      {
        Altitude: 20,
        AircraftClass: ".*",
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
    InitialPhrasing: "ClimbViaSid",
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
      },
    ],
    isRNAV: false,
    ExpectRequired: true,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00645YELM.PDF",
    },
  },
  {
    AirportCode: "KOTH",
    SID: "OTH7",
    Telephony: "NORTH BEND SEVEN",
    Fixes: ["OTH", "GAMMA", "RARES", "SCOTY", "DEROY", "LEDGE"],
    InitialPhrasing: "Maintain",
    isRNAV: false,
    ExpectRequired: true,
    ExpectInMinutes: 5,
    InitialAltitudes: [
      {
        Altitude: 50,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: true,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00929NORTHBEND.PDF",
    },
  },
  {
    AirportCode: "KPSC",
    SID: "PSC7",
    Telephony: "TRI-CITIES SEVEN",
    Fixes: ["PSC", "GEG", "PUW", "MQG", "ALW", "PDT", "LTJ", "YKM", "ELN", "EAT", "EPH", "MWH"],
    InitialPhrasing: "ClimbViaSid",
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 100,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: false,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00474TRI-CITIES.PDF",
    },
  },
  {
    AirportCode: "KRDM",
    SID: "RDM3",
    Telephony: "REDMOND THREE",
    Fixes: ["DSD", "IMB", "ILR", "LKV", "LMT", "OED", "EUG", "CVO", "UBG", "BTG", "LTJ", "PDT"],
    InitialPhrasing: "Maintain",
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 140,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: false,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00345REDMOND.PDF",
    },
  },
  {
    AirportCode: "KRNT",
    SID: "BELVU4",
    Telephony: "BELLEVUE FOUR",
    Fixes: [],
    InitialPhrasing: "ClimbViaSid",
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: false,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/05396BELLEVUE.PDF",
    },
  },
  {
    AirportCode: "KRNT",
    SID: "RENTN3",
    Telephony: "RENTON THREE",
    Fixes: [],
    InitialPhrasing: "ClimbViaSid",
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: false,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/thumb/05396RENTN.jpg",
    },
  },
  {
    AirportCode: "KSFF",
    SID: "FELTS4",
    Telephony: "FELTS FOUR",
    Fixes: ["GEG", "COE", "MLP", "PUW", "MQG", "ALW", "PDT", "PSC", "YKM", "MWH", "EPH", "HUH"],
    InitialPhrasing: "ClimbViaSid",
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 120,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: false,
    ExpectInMinutes: 10,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00402FELTS.PDF",
    },
  },
  {
    AirportCode: "KSFF",
    SID: "HAYDE4",
    Telephony: "HAYDEN FOUR",
    Fixes: [],
    InitialPhrasing: "ClimbViaSid",
    isRNAV: false,
    ExpectRequired: true,
    ExpectInMinutes: 5,
    InitialAltitudes: [
      {
        Altitude: 120,
        AircraftClass: ".*",
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
    InitialPhrasing: "Maintain",
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 120,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: true,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00402MANITO.PDF",
    },
  },
  {
    AirportCode: "KSLE",
    SID: "SLE4",
    Telephony: "SALEM FOUR",
    Fixes: ["UBG", "BTG", "SL", "CVO", "DSD", "EUG", "ONP"],
    InitialPhrasing: "Maintain",
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 90,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: false,
    ExpectInMinutes: 10,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00361SALEM.PDF",
    },
  },
  {
    AirportCode: "KTCM",
    SID: "ALDER2",
    Telephony: "ALDER TWO",
    Fixes: ["ALDER"],
    InitialPhrasing: "ClimbViaSidExceptMaintain",
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: true,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00414ALDER.PDF",
    },
  },
  {
    AirportCode: "KTCM",
    SID: "MOCAA4",
    Telephony: "MOCHA FOUR",
    Fixes: ["MOCHA", "BKE", "IMB", "JINMO"],
    InitialPhrasing: "ClimbViaSid",
    isRNAV: true,
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: false,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00414MOCAA.PDF",
    },
  },
  {
    AirportCode: "KTCM",
    SID: "OLY4",
    Telephony: "OLYMPIC FOUR",
    Fixes: [],
    InitialPhrasing: "ClimbViaSidExceptMaintain",
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: true,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00414OLYMPIC.PDF",
    },
  },
  {
    AirportCode: "KTCM",
    SID: "PUGET6",
    Telephony: "PUGET SIX",
    Fixes: [],
    InitialPhrasing: "ClimbViaSidExceptMaintain",
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: true,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00414PUGET.PDF",
    },
  },
  {
    AirportCode: "KTIW",
    SID: "TIW1",
    Telephony: "NARROWS ONE",
    Fixes: [],
    InitialPhrasing: "ClimbViaSidExceptMaintain",
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 20,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: false,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/05186NARROWS.PDF",
    },
  },
  {
    AirportCode: "KTTD",
    SID: "TDD3",
    Telephony: "BLUE LAKE THREE",
    Fixes: [],
    InitialPhrasing: "Maintain",
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: true,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00649BLUELAKE.PDF",
    },
  },
  {
    AirportCode: "KUAO",
    SID: "GLARA2",
    Telephony: "GLARA TWO",
    Fixes: ["GLARA"],
    InitialPhrasing: "ClimbViaSidExceptMaintain",
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: true,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/05722GLARA.PDF",
    },
  },
  {
    AirportCode: "KUAO",
    SID: "GNNET2",
    Telephony: "NET TWO",
    Fixes: ["GNNET"],
    InitialPhrasing: "ClimbViaSidExceptMaintain",
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: true,
    ExpectInMinutes: 5,
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
    InitialPhrasing: "Maintain",
    InitialAltitudes: [
      {
        Altitude: 50,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: false,
    ExpectInMinutes: 5,
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
    InitialPhrasing: "Maintain",
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: true,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/10384FEGBA.PDF",
    },
  },
  {
    AirportCode: "KUAO",
    SID: "UBG2",
    Telephony: "NEWBERG TWO",
    Fixes: ["UBG"],
    InitialPhrasing: "ClimbViaSidExceptMaintain",
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: true,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/05722NEWBERG.PDF",
    },
  },
  {
    AirportCode: "KYKM",
    SID: "GROMO4",
    Telephony: "GROMO FOUR",
    Fixes: ["TAMPO", "SIMCO", "HITCH", "GUBSE", "SUNED", "PAPPS"],
    InitialPhrasing: "ClimbViaSidExceptMaintain",
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 100,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: true,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00465GROMO.PDF",
    },
  },
  {
    AirportCode: "KYKM",
    SID: "NACHE4",
    Telephony: "NACHES FOUR",
    Fixes: ["YKM", "ELN", "EAT", "EPH", "MWH", "GEG", "PSC", "ALW", "PDT", "LTJ", "BTG", "SEA"],
    InitialPhrasing: "ClimbViaSidExceptMaintain",
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 100,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: false,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00465NACHES.PDF",
    },
  },
  {
    AirportCode: "KYKM",
    SID: "WENAS7",
    Telephony: "WENAS SEVEN",
    Fixes: ["TITON", "PERTT", "ELN", "RUBEL", "PAPPS", "SUNED"],
    InitialPhrasing: "ClimbViaSidExceptMaintain",
    isRNAV: false,
    ExpectRequired: true,
    ExpectInMinutes: 5,
    InitialAltitudes: [
      {
        Altitude: 100,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: true,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00465WENAS.PDF",
    },
  },
  {
    AirportCode: "KYKM",
    SID: "YKM7",
    Telephony: "YAKIMA SEVEN",
    Fixes: ["TITON"],
    InitialPhrasing: "Maintain",
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 100,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: true,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00465YAKIMA.PDF",
    },
  },
  {
    AirportCode: "KZSE",
    SID: "ZILLA3",
    Telephony: "ZILLA THREE",
    Fixes: [],
    InitialPhrasing: "Unknown",
    isRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 100,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: true,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00465ZILLA.PDF",
    },
  },
  {
    AirportCode: "KALW",
    SID: "ALW2",
    Telephony: "WALLA WALLA TWO",
    Fixes: ["ALW", "YKM", "MWH", "GEG", "PUW", "MQG", "PSC", "PTD"],
    InitialPhrasing: "Maintain",
    InitialAltitudes: [
      {
        Altitude: 80,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: true,
    ExpectInMinutes: 10,
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
    InitialPhrasing: "Maintain",
    InitialAltitudes: [
      {
        Altitude: 90,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: false,
    ExpectRequired: false,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00140EUGENE.PDF",
    },
  },
  {
    AirportCode: "KGEG",
    SID: "GEG7",
    Telephony: "SPOKANE 7",
    Fixes: ["GEG", "MLP", "PUW", "MQG", "ALW", "PDT", "PSC", "YKM", "MWH", "EPH", "HUH", "COE"],
    InitialPhrasing: "Maintain",
    InitialAltitudes: [
      {
        Altitude: 60,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: false,
    ExpectRequired: false,
    ExpectInMinutes: 10,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00403SPOKANE.PDF",
    },
  },
  {
    AirportCode: "KHIO",
    SID: "BERNI3",
    Telephony: "BERNI THREE",
    Fixes: ["BERNI", "EASON", "EUG", "FAMUK", "HARPR"],
    InitialPhrasing: "ClimbViaSidExceptMaintain",
    IsRNAV: true,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: false,
    ExpectInMinutes: 10,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/05063BERNI.PDF",
    },
  },
  {
    AirportCode: "KHIO",
    SID: "CANBY2",
    Telephony: "CANBY TWO",
    Fixes: ["CANBY"],
    InitialPhrasing: "Maintain",
    IsRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: true,
    ExpectInMinutes: 10,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/05063CANBY.PDF",
    },
  },
  {
    AirportCode: "KHIO",
    SID: "CHISM4",
    Telephony: "CHISM FOUR",
    Fixes: ["CHISM", "PAWLI", "SMIGE", "JOGEN", "DSD", "RIELY", "IMB"],
    InitialPhrasing: "ClimbViaSidExceptMaintain",
    IsRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: false,
    ExpectInMinutes: 10,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/05063CHISM.PDF",
    },
  },
  {
    AirportCode: "KHIO",
    SID: "FARM7",
    Telephony: "FARMINGTON SEVEN",
    Fixes: ["UBG"],
    InitialPhrasing: "Maintain",
    IsRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: true,
    ExpectInMinutes: 10,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/05063FARMINGTON.PDF",
    },
  },
  {
    AirportCode: "KHIO",
    SID: "SCAPO7",
    Telephony: "SCAPO SEVEN",
    Fixes: ["SCAPO"],
    InitialPhrasing: "Maintain",
    IsRNAV: false,
    InitialAltitudes: [
      {
        Altitude: 40,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: true,
    ExpectInMinutes: 10,
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
    InitialPhrasing: "ClimbViaSid",
    InitialAltitudes: [
      {
        Altitude: 21,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: false,
    ExpectInMiles: "15nm SEA",
    IsRNAV: true,
    ExpectRequired: false,
    ExpectInMinutes: 3,
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
    InitialPhrasing: "ClimbViaSid",
    InitialAltitudes: [
      {
        Altitude: 20,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: false,
    ExpectInMinutes: 3,
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
    InitialPhrasing: "Maintain",
    InitialAltitudes: [
      {
        Altitude: 21,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: false,
    ExpectInMinutes: 3,
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
    InitialPhrasing: "ClimbViaSid",
    InitialAltitudes: [
      {
        Altitude: 21,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: true,
    ExpectRequired: false,
    ExpectInMinutes: 3,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00384NRVNA.PDF",
    },
  },
  {
    AirportCode: "KPDX",
    SID: "WHAMY4",
    Telephony: "WHAMY FOUR",
    Fixes: ["WHAMY", "IMB", "RIELY", "KOATA"],
    InitialPhrasing: "Maintain",
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: true,
    ExpectInMinutes: 10,
    ExpectRequired: false,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00330WHAMY.PDF",
    },
  },
  {
    AirportCode: "KPDX",
    SID: "CASCD2",
    Telephony: "CASCADE TWO",
    Fixes: ["CHISM", "DSD", "JOGEN", "SMIGE", "PAWLI"],
    InitialPhrasing: "Maintain",
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: true,
    ExpectInMinutes: 10,
    ExpectRequired: false,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00330CASCADE.PDF",
    },
  },
  {
    AirportCode: "KPDX",
    SID: "HRMNS5",
    Telephony: "HERMANS FIVE",
    Fixes: ["HRMNS"],
    InitialPhrasing: "Maintain",
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: true,
    ExpectInMinutes: 10,
    ExpectRequired: false,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00330HRMNS.PDF",
    },
  },
  {
    AirportCode: "KPDX",
    SID: "LAVAA6",
    Telephony: "LAVA SIX",
    Fixes: ["LAVAA", "YKM", "PDT"],
    InitialPhrasing: "Maintain",
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: true,
    ExpectInMinutes: 10,
    ExpectRequired: false,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00330LAVAA.PDF",
    },
  },
  {
    AirportCode: "KPDX",
    SID: "MINNE5",
    Telephony: "MINNE FIVE",
    Fixes: ["MINNE", "EASON", "FAMUK", "HISKU"],
    InitialPhrasing: "Maintain",
    ExpectInMinutes: 10,
    ExpectRequired: false,
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
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
    InitialPhrasing: "Maintain",
    ExpectInMinutes: 5,
    ExpectRequired: false,
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
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00330PORTLAND.PDF",
    },
  },
  {
    AirportCode: "KSEA",
    SID: "ELMAA4",
    Telephony: "ELMA FOUR",
    Fixes: ["ELMAA", "HQM", "CVO"],
    InitialPhrasing: "ClimbViaSidExceptMaintain",
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
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
    InitialPhrasing: "ClimbViaSidExceptMaintain",
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: false,
    ExpectInMiles: "15nm SEA",
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
    InitialPhrasing: "ClimbViaSid",
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: true,
    ExpectRequired: false,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00582ISBRG.PDF",
    },
  },
  {
    AirportCode: "KSEA",
    SID: "OZWLD1",
    Telephony: "OSWALD ONE",
    Fixes: ["OZWLD"],
    InitialPhrasing: "ClimbViaSid",
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: true,
    ExpectRequired: false,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00582OZWLD.PDF",
    },
  },
  {
    AirportCode: "KSEA",
    SID: "JEFPO1",
    Telephony: "JEFPO ONE",
    Fixes: ["ALPSE", "BANDR", "JEFPO", "NORMY", "PAE", "ZADON"],
    InitialPhrasing: "ClimbViaSid",
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: true,
    ExpectRequired: false,
    ExpectInMinutes: 5,
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
    InitialPhrasing: "SeeNote",
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
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
    InitialPhrasing: "ClimbViaSidExceptMaintain",
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
    ExpectRequired: false,
    ExpectInMiles: "15nm SEA",
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
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
    InitialPhrasing: "ClimbViaSidExceptMaintain",
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: false,
    ExpectInMiles: "15nm SEA",
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
    InitialPhrasing: "Maintain",
    InitialAltitudes: [
      {
        Altitude: 70,
        AircraftClass: ".*",
      },
    ],
    ExpectInMiles: "15nm SEA",
    ExpectRequired: true,
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
    InitialPhrasing: "Maintain",
    InitialAltitudes: [
      {
        Altitude: 20,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: false,
    ExpectInMinutes: 5,
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
    InitialPhrasing: "ClimbViaSidExceptMaintain",
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: false,
    ExpectInMinutes: 10,
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
    InitialPhrasing: "ClimbViaSidExceptMaintain",
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: false,
    ExpectInMinutes: 5,
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
    InitialPhrasing: "Maintain",
    InitialAltitudes: [
      {
        Altitude: 54,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: true,
    ExpectInMinutes: 10,
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
    InitialPhrasing: "Maintain",
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
      },
    ],
    ExpectRequired: true,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00782SHEDD.PDF",
    },
  },
  {
    AirportCode: "KLMT",
    SID: "LMT6",
    Telephony: "KINGSLEY SIX",
    Fixes: ["LMT", "LKV", "RBL", "FMG", "FJS", "OED", "RBG", "DSD", "EUG"],
    InitialPhrasing: "Maintain",
    InitialAltitudes: [
      {
        Altitude: 100,
        AircraftClass: ".*",
      },
    ],
    IsRNAV: false,
    ExpectRequired: false,
    ExpectInMinutes: 5,
    Charts: {
      skyvector: "https://skyvector.com/files/tpp/2307/pdf/00473KINGSLEY.PDF",
    },
  },
]);
