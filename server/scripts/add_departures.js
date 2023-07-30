// The current database to use.
use("plan-verifier");

db.departures.deleteMany({});

db.departures.insertMany([
  {
    SID: "WW2",
    Fixes: ["PSC", "YKM", "MWH", "GEG", "PUW", "MQG"],
    ClimbViaSid: false,
    InitialAltitudes: [
      {
        Altitude: 80,
        AircraftClass: ".*",
      },
    ],
    ExpectTopAltitudeInMinutes: "10",
    IsRNAV: false,
  },
  {
    SID: "CBAIN1",
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
    SID: "BANGR9",
    Fixes: ["BANGR", "PANGL", "ARRIE"],
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
    SID: "ELMAA4",
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
    Fixes: ["SUMMA", "BKE", "LKV"],
  },
  {
    SID: "MONTN2",
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
    SID: "BANGR9",
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
    IsRNAV: false,
    Fixes: ["KIENO", "YVR", "YYJ", "CVV"],
    InitialAltitudes: [
      {
        Altitude: 30,
        AircraftClass: ".*",
      },
    ],
  },
]);
