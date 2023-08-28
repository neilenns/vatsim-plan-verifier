// The current database to use.
use("plan-verifier");

db.airlines.deleteMany({});

db.airlines.insertMany([
  {
    airlineCode: "CLA",
    telephony: "COMLUX",
  },
  {
    airlineCode: "COA",
    telephony: "CONTINENTAL",
  },
  {
    airlineCode: "OEO",
    telephony: "WINDMILL",
  },
  {
    airlineCode: "PAY",
    telephony: "PACIFIC",
  },
  {
    airlineCode: "WWW",
    telephony: "JANET",
  },
  {
    airlineCode: "EGF",
    telephony: "EAGLEFLIGHT",
  },
  {
    airlineCode: "AWE",
    telephony: "CACTUS",
  },
  {
    airlineCode: "HUA",
    telephony: "HUKOBU",
  },
  {
    airlineCode: "VCP",
    telephony: "ALPACA",
  },
  {
    airlineCode: "UWU",
    telephony: "OOWOO",
  },
  {
    airlineCode: "TPC",
    telephony: "PILOTCLUB",
  },
  {
    airlineCode: "SPK",
    telephony: "EMBER",
  },
  {
    airlineCode: "SPC",
    telephony: "SPARK CARGO",
  },
  {
    airlineCode: "SPS",
    telephony: "SPARK SPECIAL",
  },
  {
    airlineCode: "WAT",
    telephony: "WALKER",
  },
  {
    airlineCode: "CPC",
    telephony: "EMPRESS",
  },
  {
    airlineCode: "MET",
    telephony: "METRO AIR",
  },
  {
    airlineCode: "CXA",
    telephony: "CANADIAN EXPRESS",
  },
  {
    airlineCode: "ABS",
    telephony: "AERO BRAZIL",
  },
  {
    airlineCode: "CFS",
    telephony: "EMPIRE",
  },
  {
    airlineCode: "AAA",
    telephony: "ANSETT",
  },
  {
    airlineCode: "PNW",
    telephony: "PACIFIC NORTHWEST",
  },
  {
    airlineCode: "FSS",
    telephony: "ABACO",
  },
  {
    airlineCode: "ABJ",
    telephony: "ABAETE",
  },
  {
    airlineCode: "NKP",
    telephony: "ABAKAN AIR",
  },
  {
    airlineCode: "ABE",
    telephony: "ABAN",
  },
  {
    airlineCode: "MRP",
    telephony: "ABAS",
  },
  {
    airlineCode: "IAX",
    telephony: "ABBOTSFORD AIR",
  },
  {
    airlineCode: "AIJ",
    telephony: "ABC AEROLINEAS",
  },
  {
    airlineCode: "AHU",
    telephony: "ABC HUNGARY",
  },
  {
    airlineCode: "BDV",
    telephony: "ABERDAV",
  },
  {
    airlineCode: "ABX",
    telephony: "ABEX",
  },
  {
    airlineCode: "AAB",
    telephony: "ABG",
  },
  {
    airlineCode: "DFA",
    telephony: "ABLE",
  },
  {
    airlineCode: "ACD",
    telephony: "ACADEMY",
  },
  {
    airlineCode: "AYA",
    telephony: "ACADEMY AIR",
  },
  {
    airlineCode: "AER",
    telephony: "ACE AIR",
  },
  {
    airlineCode: "ACQ",
    telephony: "ACE CARGO",
  },
  {
    airlineCode: "ATZ",
    telephony: "ACE TAXI",
  },
  {
    airlineCode: "ALF",
    telephony: "ACEFORCE",
  },
  {
    airlineCode: "ARO",
    telephony: "ACERO",
  },
  {
    airlineCode: "ASQ",
    telephony: "ACEY",
  },
  {
    airlineCode: "ACK",
    telephony: "ACK AIR",
  },
  {
    airlineCode: "QCL",
    telephony: "ACLA",
  },
  {
    airlineCode: "ALC",
    telephony: "ACOM",
  },
  {
    airlineCode: "ACW",
    telephony: "ACRO JETS",
  },
  {
    airlineCode: "CRV",
    telephony: "ACROPOLIS",
  },
  {
    airlineCode: "AXQ",
    telephony: "ACTION AIR",
  },
  {
    airlineCode: "ADC",
    telephony: "AD ASTRA",
  },
  {
    airlineCode: "ADK",
    telephony: "ADCO",
  },
  {
    airlineCode: "FAD",
    telephony: "ADEAL",
  },
  {
    airlineCode: "PBB",
    telephony: "ADEBAR",
  },
  {
    airlineCode: "ACL",
    telephony: "ADMIRE",
  },
  {
    airlineCode: "ADR",
    telephony: "ADRIA",
  },
  {
    airlineCode: "DRO",
    telephony: "ADRO SERVICIOS",
  },
  {
    airlineCode: "AAX",
    telephony: "ADVANCE AVIATION",
  },
  {
    airlineCode: "ADV",
    telephony: "ADVANCED",
  },
  {
    airlineCode: "DVN",
    telephony: "ADVENTIA",
  },
  {
    airlineCode: "AEE",
    telephony: "AEGEAN",
  },
  {
    airlineCode: "AAZ",
    telephony: "AEOLUS",
  },
  {
    airlineCode: "TPN",
    telephony: "AEREA DELNORTE",
  },
  {
    airlineCode: "ADG",
    telephony: "AEREA TRAINING",
  },
  {
    airlineCode: "EAX",
    telephony: "AEREAS",
  },
  {
    airlineCode: "TCB",
    telephony: "AEREO COLOMBIA",
  },
  {
    airlineCode: "DRD",
    telephony: "AEREO DORADO",
  },
  {
    airlineCode: "PZA",
    telephony: "AEREO PARAZA",
  },
  {
    airlineCode: "APL",
    telephony: "AEREO PRINCIPAL",
  },
  {
    airlineCode: "PMI",
    telephony: "AEREOPRIM",
  },
  {
    airlineCode: "TXI",
    telephony: "AEREOTAXIS",
  },
  {
    airlineCode: "TUY",
    telephony: "AEREOTUY",
  },
  {
    airlineCode: "RIS",
    telephony: "AERIS",
  },
  {
    airlineCode: "AEO",
    telephony: "AERO",
  },
  {
    airlineCode: "FES",
    telephony: "AERO ALFE",
  },
  {
    airlineCode: "RSO",
    telephony: "AERO ASIA",
  },
  {
    airlineCode: "TLN",
    telephony: "AERO ATLA",
  },
  {
    airlineCode: "BGG",
    telephony: "AERO BG",
  },
  {
    airlineCode: "BLK",
    telephony: "AERO BLACK",
  },
  {
    airlineCode: "ECL",
    telephony: "AERO CASTELLANA",
  },
  {
    airlineCode: "ECM",
    telephony: "AERO COMERCIALES",
  },
  {
    airlineCode: "TAA",
    telephony: "AERO COSTA",
  },
  {
    airlineCode: "AOD",
    telephony: "AERO CZECH",
  },
  {
    airlineCode: "DVI",
    telephony: "AERO DAVINCI",
  },
  {
    airlineCode: "SDO",
    telephony: "AERO DOMINGO",
  },
  {
    airlineCode: "SAG",
    telephony: "AERO EAGLE",
  },
  {
    airlineCode: "MGM",
    telephony: "AERO EMM-GEE-EMM",
  },
  {
    airlineCode: "AON",
    telephony: "AERO ENTREPRISE",
  },
  {
    airlineCode: "GEX",
    telephony: "AERO GEORGIA",
  },
  {
    airlineCode: "GSF",
    telephony: "AERO GESEF",
  },
  {
    airlineCode: "GUE",
    telephony: "AERO GUERRERO",
  },
  {
    airlineCode: "JLA",
    telephony: "AERO JOE",
  },
  {
    airlineCode: "MHC",
    telephony: "AERO JOMACHA",
  },
  {
    airlineCode: "MNG",
    telephony: "AERO MONGOLIA",
  },
  {
    airlineCode: "OWN",
    telephony: "AERO OWEN",
  },
  {
    airlineCode: "PNU",
    telephony: "AERO PLATINUM",
  },
  {
    airlineCode: "RZB",
    telephony: "AERO REGIONAL",
  },
  {
    airlineCode: "ROO",
    telephony: "AERO ROA",
  },
  {
    airlineCode: "SQD",
    telephony: "AERO SQUAD",
  },
  {
    airlineCode: "MTG",
    telephony: "AERO TETE",
  },
  {
    airlineCode: "IYC",
    telephony: "AERO THEBE",
  },
  {
    airlineCode: "TZA",
    telephony: "AERO TOMZA",
  },
  {
    airlineCode: "RRE",
    telephony: "AERO TORREON",
  },
  {
    airlineCode: "RTM",
    telephony: "AERO TRANSAM",
  },
  {
    airlineCode: "TPB",
    telephony: "AERO TROPICAL",
  },
  {
    airlineCode: "VIJ",
    telephony: "AERO VIGO",
  },
  {
    airlineCode: "RVG",
    telephony: "AERO VINA",
  },
  {
    airlineCode: "XAB",
    telephony: "AERO XABRE",
  },
  {
    airlineCode: "MYS",
    telephony: "AERO YAQUI",
  },
  {
    airlineCode: "SZT",
    telephony: "AERO ZEE",
  },
  {
    airlineCode: "ETZ",
    telephony: "AERO ZODIAC",
  },
  {
    airlineCode: "PTE",
    telephony: "AERO-COP",
  },
  {
    airlineCode: "EAD",
    telephony: "AERO-ESCOLA",
  },
  {
    airlineCode: "RXT",
    telephony: "AERO-EXTRA",
  },
  {
    airlineCode: "EAP",
    telephony: "AERO-PYRENEES",
  },
  {
    airlineCode: "SOM",
    telephony: "AERO-SAL",
  },
  {
    airlineCode: "ANS",
    telephony: "AEROANDES",
  },
  {
    airlineCode: "TED",
    telephony: "AEROAZTECA",
  },
  {
    airlineCode: "MBO",
    telephony: "AEROBEL",
  },
  {
    airlineCode: "ABA",
    telephony: "AEROBETA",
  },
  {
    airlineCode: "IVA",
    telephony: "AEROBOLIVAR",
  },
  {
    airlineCode: "BOC",
    telephony: "AEROBONA",
  },
  {
    airlineCode: "BRP",
    telephony: "AEROBRA",
  },
  {
    airlineCode: "BGE",
    telephony: "AEROBRIDGE",
  },
  {
    airlineCode: "SYK",
    telephony: "AEROCAB",
  },
  {
    airlineCode: "CDA",
    telephony: "AEROCARDAL",
  },
  {
    airlineCode: "GCF",
    telephony: "AEROCARTO",
  },
  {
    airlineCode: "CLL",
    telephony: "AEROCASTILLO",
  },
  {
    airlineCode: "ACR",
    telephony: "AEROCENTER",
  },
  {
    airlineCode: "ACN",
    telephony: "AEROCENTRO",
  },
  {
    airlineCode: "AHI",
    telephony: "AEROCHISA",
  },
  {
    airlineCode: "TLA",
    telephony: "AEROCLA",
  },
  {
    airlineCode: "RCD",
    telephony: "AEROCLUB",
  },
  {
    airlineCode: "RCO",
    telephony: "AEROCOAHUILA",
  },
  {
    airlineCode: "AEK",
    telephony: "AEROCON",
  },
  {
    airlineCode: "CTD",
    telephony: "AEROCORPORATIVOS",
  },
  {
    airlineCode: "ROD",
    telephony: "AERODAN",
  },
  {
    airlineCode: "DTO",
    telephony: "AERODESIERTO",
  },
  {
    airlineCode: "ADN",
    telephony: "AERODIENST",
  },
  {
    airlineCode: "DMI",
    telephony: "AERODINAMICO",
  },
  {
    airlineCode: "ADP",
    telephony: "AERODIPLOMATIC",
  },
  {
    airlineCode: "DIS",
    telephony: "AERODIS",
  },
  {
    airlineCode: "DYN",
    telephony: "AERODYNAMICS",
  },
  {
    airlineCode: "ERO",
    telephony: "AEROECOM",
  },
  {
    airlineCode: "AJS",
    telephony: "AEROEJECUTIVOS",
  },
  {
    airlineCode: "VIV",
    telephony: "AEROENLACES",
  },
  {
    airlineCode: "SVE",
    telephony: "AEROESPECIAL",
  },
  {
    airlineCode: "ABO",
    telephony: "AEROEXPRESO",
  },
  {
    airlineCode: "CFF",
    telephony: "AEROFAN",
  },
  {
    airlineCode: "RFY",
    telephony: "AEROFIL",
  },
  {
    airlineCode: "TVD",
    telephony: "AEROFLIGHT",
  },
  {
    airlineCode: "AFL",
    telephony: "AEROFLOT",
  },
  {
    airlineCode: "FCO",
    telephony: "AEROFRISCO",
  },
  {
    airlineCode: "GAU",
    telephony: "AEROGAUCHO",
  },
  {
    airlineCode: "GCA",
    telephony: "AEROGECA",
  },
  {
    airlineCode: "GNX",
    telephony: "AEROGENEX",
  },
  {
    airlineCode: "EOK",
    telephony: "AEROHANGUK",
  },
  {
    airlineCode: "HEI",
    telephony: "AEROHEIN",
  },
  {
    airlineCode: "ARH",
    telephony: "AEROHELCA",
  },
  {
    airlineCode: "HUT",
    telephony: "AEROHUITZILIN",
  },
  {
    airlineCode: "IPM",
    telephony: "AEROITA",
  },
  {
    airlineCode: "DCO",
    telephony: "AEROJAZ",
  },
  {
    airlineCode: "AEJ",
    telephony: "AEROJET",
  },
  {
    airlineCode: "KLZ",
    telephony: "AEROKALUZ",
  },
  {
    airlineCode: "ERL",
    telephony: "AEROLAB",
  },
  {
    airlineCode: "LGN",
    telephony: "AEROLAGUNA",
  },
  {
    airlineCode: "LNE",
    telephony: "AEROLANE",
  },
  {
    airlineCode: "LZA",
    telephony: "AEROLANZA",
  },
  {
    airlineCode: "LDR",
    telephony: "AEROLIDER",
  },
  {
    airlineCode: "LMA",
    telephony: "AEROLIMA",
  },
  {
    airlineCode: "LIN",
    telephony: "AEROLIMOUSINE",
  },
  {
    airlineCode: "NIG",
    telephony: "AEROLINE",
  },
  {
    airlineCode: "ALT",
    telephony: "AEROLINEAS CENTRALES",
  },
  {
    airlineCode: "BLZ",
    telephony: "AEROLOZ",
  },
  {
    airlineCode: "AEM",
    telephony: "AEROMADRID",
  },
  {
    airlineCode: "AGE",
    telephony: "AEROMANAGE",
  },
  {
    airlineCode: "MAF",
    telephony: "AEROMAS",
  },
  {
    airlineCode: "MSM",
    telephony: "AEROMAS EXPRESS",
  },
  {
    airlineCode: "AXP",
    telephony: "AEROMAX SPAIN",
  },
  {
    airlineCode: "LFI",
    telephony: "AEROMED",
  },
  {
    airlineCode: "DIC",
    telephony: "AEROMEDICA",
  },
  {
    airlineCode: "MTB",
    telephony: "AEROMETROPOLIS",
  },
  {
    airlineCode: "AMX",
    telephony: "AEROMEXICO",
  },
  {
    airlineCode: "MIR",
    telephony: "AEROMIR",
  },
  {
    airlineCode: "NKY",
    telephony: "AEROMON",
  },
  {
    airlineCode: "MOR",
    telephony: "AEROMORELIA",
  },
  {
    airlineCode: "MUN",
    telephony: "AEROMUNDO",
  },
  {
    airlineCode: "CFD",
    telephony: "AERONAUT",
  },
  {
    airlineCode: "PRZ",
    telephony: "AERONAUTIC",
  },
  {
    airlineCode: "VTM",
    telephony: "AERONAVES TSM",
  },
  {
    airlineCode: "ARN",
    telephony: "AERONEX",
  },
  {
    airlineCode: "ENW",
    telephony: "AERONOR",
  },
  {
    airlineCode: "OVA",
    telephony: "AERONOVA",
  },
  {
    airlineCode: "RPC",
    telephony: "AEROPACSA",
  },
  {
    airlineCode: "APS",
    telephony: "AEROPARADISE",
  },
  {
    airlineCode: "PSO",
    telephony: "AEROPEGASO",
  },
  {
    airlineCode: "PNL",
    telephony: "AEROPERSONAL",
  },
  {
    airlineCode: "PET",
    telephony: "AEROPETRO",
  },
  {
    airlineCode: "MDR",
    telephony: "AEROPLANOS",
  },
  {
    airlineCode: "ALV",
    telephony: "AEROPOSTAL",
  },
  {
    airlineCode: "MIE",
    telephony: "AEROPREMIER",
  },
  {
    airlineCode: "RPR",
    telephony: "AEROPROFESIONAL",
  },
  {
    airlineCode: "PYC",
    telephony: "AEROPYCSA",
  },
  {
    airlineCode: "RPB",
    telephony: "AEROREPUBLICA",
  },
  {
    airlineCode: "CDT",
    telephony: "AEROREUS",
  },
  {
    airlineCode: "REY",
    telephony: "AEROREY",
  },
  {
    airlineCode: "RRC",
    telephony: "AEROROCA",
  },
  {
    airlineCode: "AFC",
    telephony: "AERORUTAS",
  },
  {
    airlineCode: "AOS",
    telephony: "AEROS",
  },
  {
    airlineCode: "SBH",
    telephony: "AEROSAAB",
  },
  {
    airlineCode: "FIC",
    telephony: "AEROSAFIN",
  },
  {
    airlineCode: "OSN",
    telephony: "AEROSAN",
  },
  {
    airlineCode: "ERK",
    telephony: "AEROSEC",
  },
  {
    airlineCode: "BAS",
    telephony: "AEROSERV",
  },
  {
    airlineCode: "SIZ",
    telephony: "AEROSILZA",
  },
  {
    airlineCode: "SKU",
    telephony: "AEROSKY",
  },
  {
    airlineCode: "OFY",
    telephony: "AEROSOF",
  },
  {
    airlineCode: "EAS",
    telephony: "AEROSPACE",
  },
  {
    airlineCode: "UAR",
    telephony: "AEROSTAR",
  },
  {
    airlineCode: "KRE",
    telephony: "AEROSUCRE",
  },
  {
    airlineCode: "ASI",
    telephony: "AEROSUN",
  },
  {
    airlineCode: "RSU",
    telephony: "AEROSUR",
  },
  {
    airlineCode: "ATK",
    telephony: "AEROTACA",
  },
  {
    airlineCode: "ITE",
    telephony: "AEROTAXI",
  },
  {
    airlineCode: "DVZ",
    telephony: "AEROTAXI DVZ",
  },
  {
    airlineCode: "AEP",
    telephony: "AEROTEC",
  },
  {
    airlineCode: "ATF",
    telephony: "AEROTECNICAS",
  },
  {
    airlineCode: "AET",
    telephony: "AEROTHAI",
  },
  {
    airlineCode: "TLU",
    telephony: "AEROTOLUCA",
  },
  {
    airlineCode: "CLV",
    telephony: "AEROTRAINING",
  },
  {
    airlineCode: "CRP",
    telephony: "AEROTRANSCORP",
  },
  {
    airlineCode: "TRN",
    telephony: "AEROTRON",
  },
  {
    airlineCode: "RTU",
    telephony: "AEROTUCAN",
  },
  {
    airlineCode: "RTZ",
    telephony: "AEROTUZLA",
  },
  {
    airlineCode: "TNO",
    telephony: "AEROUNION",
  },
  {
    airlineCode: "TLE",
    telephony: "AEROUTIL",
  },
  {
    airlineCode: "AVY",
    telephony: "AEROVARADERO",
  },
  {
    airlineCode: "VNS",
    telephony: "AEROVENA",
  },
  {
    airlineCode: "AEV",
    telephony: "AEROVENTAS",
  },
  {
    airlineCode: "ARI",
    telephony: "AEROVICS",
  },
  {
    airlineCode: "VVG",
    telephony: "AEROVILLA",
  },
  {
    airlineCode: "AOV",
    telephony: "AEROVISION",
  },
  {
    airlineCode: "VRO",
    telephony: "AEROVITRO",
  },
  {
    airlineCode: "VIZ",
    telephony: "AEROVIZ",
  },
  {
    airlineCode: "VUO",
    telephony: "AEROVUELOX",
  },
  {
    airlineCode: "AWH",
    telephony: "AEROWEST",
  },
  {
    airlineCode: "OWI",
    telephony: "AEROWIN",
  },
  {
    airlineCode: "AEX",
    telephony: "AEROX",
  },
  {
    airlineCode: "AJA",
    telephony: "AFGHAN JET",
  },
  {
    airlineCode: "FBE",
    telephony: "AFRIBEE",
  },
  {
    airlineCode: "JAY",
    telephony: "AFRICA ALLIANCE",
  },
  {
    airlineCode: "AFY",
    telephony: "AFRICA CHARTERED",
  },
  {
    airlineCode: "AIK",
    telephony: "AFRICAN AIRLINES",
  },
  {
    airlineCode: "EGU",
    telephony: "AFRICAN EAGLE",
  },
  {
    airlineCode: "FSK",
    telephony: "AFRICAN SKY",
  },
  {
    airlineCode: "TCG",
    telephony: "AFRICARGO",
  },
  {
    airlineCode: "AFI",
    telephony: "AFRICAWORLD",
  },
  {
    airlineCode: "FRK",
    telephony: "AFRIFAST",
  },
  {
    airlineCode: "FRJ",
    telephony: "AFRIJET",
  },
  {
    airlineCode: "AAW",
    telephony: "AFRIQIYAH",
  },
  {
    airlineCode: "ACU",
    telephony: "AFRISPIRIT",
  },
  {
    airlineCode: "GRR",
    telephony: "AGROAR",
  },
  {
    airlineCode: "HAA",
    telephony: "AGROFORESTAL",
  },
  {
    airlineCode: "NEG",
    telephony: "AGUAS NEGRAS",
  },
  {
    airlineCode: "RXF",
    telephony: "AIDEN",
  },
  {
    airlineCode: "AAF",
    telephony: "AIGLE AZUR",
  },
  {
    airlineCode: "AAM",
    telephony: "AIM AIR",
  },
  {
    airlineCode: "RTY",
    telephony: "AIMS COLLEGE",
  },
  {
    airlineCode: "RDM",
    telephony: "AIR ADA",
  },
  {
    airlineCode: "AFH",
    telephony: "AIR AFGHANISTAN",
  },
  {
    airlineCode: "RAD",
    telephony: "AIR ALADA",
  },
  {
    airlineCode: "ABN",
    telephony: "AIR ALBANIA",
  },
  {
    airlineCode: "DAH",
    telephony: "AIR ALGERIE",
  },
  {
    airlineCode: "ANJ",
    telephony: "AIR ALLEGIANCE",
  },
  {
    airlineCode: "APN",
    telephony: "AIR ALPES",
  },
  {
    airlineCode: "AHA",
    telephony: "AIR ALPHA",
  },
  {
    airlineCode: "AMR",
    telephony: "AIR AM",
  },
  {
    airlineCode: "RMD",
    telephony: "AIR AMDER",
  },
  {
    airlineCode: "NGO",
    telephony: "AIR ANGOL",
  },
  {
    airlineCode: "CIR",
    telephony: "AIR ARCTIC",
  },
  {
    airlineCode: "ARR",
    telephony: "AIR ARMENIA",
  },
  {
    airlineCode: "SZA",
    telephony: "AIR ASTRO",
  },
  {
    airlineCode: "ATS",
    telephony: "AIR ATLAS",
  },
  {
    airlineCode: "ITF",
    telephony: "AIR AVITA",
  },
  {
    airlineCode: "RZO",
    telephony: "AIR AZORES",
  },
  {
    airlineCode: "BFF",
    telephony: "AIR BAFFIN",
  },
  {
    airlineCode: "JAB",
    telephony: "AIR BAGAN",
  },
  {
    airlineCode: "BMP",
    telephony: "AIR BAMA",
  },
  {
    airlineCode: "BNX",
    telephony: "AIR BARINAS",
  },
  {
    airlineCode: "ABB",
    telephony: "AIR BELGIUM",
  },
  {
    airlineCode: "SGD",
    telephony: "AIR BLUE",
  },
  {
    airlineCode: "BRF",
    telephony: "AIR BRAVO",
  },
  {
    airlineCode: "ATL",
    telephony: "AIR BREMEN",
  },
  {
    airlineCode: "BKE",
    telephony: "AIR BROCK",
  },
  {
    airlineCode: "BUR",
    telephony: "AIR BUCHAREST",
  },
  {
    airlineCode: "ABL",
    telephony: "AIR BUSAN",
  },
  {
    airlineCode: "CAM",
    telephony: "AIR CAMAI",
  },
  {
    airlineCode: "ACA",
    telephony: "AIR CANADA",
  },
  {
    airlineCode: "LHA",
    telephony: "AIR CANTON",
  },
  {
    airlineCode: "RCI",
    telephony: "AIR CASSAI",
  },
  {
    airlineCode: "AIO",
    telephony: "AIR CHIEF",
  },
  {
    airlineCode: "CCA",
    telephony: "AIR CHINA",
  },
  {
    airlineCode: "OCO",
    telephony: "AIR COLLEGE",
  },
  {
    airlineCode: "CBS",
    telephony: "AIR COLUMBUS",
  },
  {
    airlineCode: "CNU",
    telephony: "AIR CONSUL",
  },
  {
    airlineCode: "CRD",
    telephony: "AIR CORRIDOR",
  },
  {
    airlineCode: "CJX",
    telephony: "AIR CRANE",
  },
  {
    airlineCode: "SEH",
    telephony: "AIR CRETE",
  },
  {
    airlineCode: "CRJ",
    telephony: "AIR CRUZAL",
  },
  {
    airlineCode: "DKN",
    telephony: "AIR DECCAN",
  },
  {
    airlineCode: "ADO",
    telephony: "AIR DO",
  },
  {
    airlineCode: "ONS",
    telephony: "AIR DREAMS",
  },
  {
    airlineCode: "EGA",
    telephony: "AIR EAGLE",
  },
  {
    airlineCode: "ECX",
    telephony: "AIR ECOMEX",
  },
  {
    airlineCode: "ERE",
    telephony: "AIR ERIE",
  },
  {
    airlineCode: "GET",
    telephony: "AIR FLOW",
  },
  {
    airlineCode: "GRP",
    telephony: "AIR FOX",
  },
  {
    airlineCode: "GHN",
    telephony: "AIR GHANA",
  },
  {
    airlineCode: "AGV",
    telephony: "AIR GLACIERS",
  },
  {
    airlineCode: "NGX",
    telephony: "AIR GLOBAL",
  },
  {
    airlineCode: "AHO",
    telephony: "AIR HAMBURG",
  },
  {
    airlineCode: "AHK",
    telephony: "AIR HONG KONG",
  },
  {
    airlineCode: "HOP",
    telephony: "AIR HOP",
  },
  {
    airlineCode: "AIH",
    telephony: "AIR INCHEON",
  },
  {
    airlineCode: "ISS",
    telephony: "AIR ITALY",
  },
  {
    airlineCode: "AJX",
    telephony: "AIR JAPAN",
  },
  {
    airlineCode: "BJN",
    telephony: "AIR JINGHUA",
  },
  {
    airlineCode: "JHN",
    telephony: "AIR JOHNSON",
  },
  {
    airlineCode: "DKH",
    telephony: "AIR JUNEYAO",
  },
  {
    airlineCode: "AKL",
    telephony: "AIR KIRIBATI",
  },
  {
    airlineCode: "KHA",
    telephony: "AIR KITTYHAWK",
  },
  {
    airlineCode: "KLD",
    telephony: "AIR KLAIPEDA",
  },
  {
    airlineCode: "KOR",
    telephony: "AIR KORYO",
  },
  {
    airlineCode: "KUD",
    telephony: "AIR KUDOS",
  },
  {
    airlineCode: "MKR",
    telephony: "AIR LANME",
  },
  {
    airlineCode: "LHG",
    telephony: "AIR LEADER",
  },
  {
    airlineCode: "ALD",
    telephony: "AIR LEISURE",
  },
  {
    airlineCode: "TLR",
    telephony: "AIR LIBYA",
  },
  {
    airlineCode: "LLK",
    telephony: "AIR LIFE",
  },
  {
    airlineCode: "VBB",
    telephony: "AIR LUBO",
  },
  {
    airlineCode: "AMU",
    telephony: "AIR MACAU",
  },
  {
    airlineCode: "MDG",
    telephony: "AIR MADAGASCAR",
  },
  {
    airlineCode: "MJP",
    telephony: "AIR MAJORO",
  },
  {
    airlineCode: "AMC",
    telephony: "AIR MALTA",
  },
  {
    airlineCode: "MBB",
    telephony: "AIR MANAS",
  },
  {
    airlineCode: "MJC",
    telephony: "AIR MANDA",
  },
  {
    airlineCode: "AMY",
    telephony: "AIR MANDALAY",
  },
  {
    airlineCode: "MRY",
    telephony: "AIR MARINE",
  },
  {
    airlineCode: "MHF",
    telephony: "AIR MARITIME",
  },
  {
    airlineCode: "CWM",
    telephony: "AIR MARSHALLS",
  },
  {
    airlineCode: "MCD",
    telephony: "AIR MED",
  },
  {
    airlineCode: "MHS",
    telephony: "AIR MEMPHIS",
  },
  {
    airlineCode: "CMI",
    telephony: "AIR MIKE",
  },
  {
    airlineCode: "AMG",
    telephony: "AIR MINAS",
  },
  {
    airlineCode: "MLD",
    telephony: "AIR MOLDOVA",
  },
  {
    airlineCode: "MUC",
    telephony: "AIR MUNICH",
  },
  {
    airlineCode: "ANL",
    telephony: "AIR NACOIA",
  },
  {
    airlineCode: "NPR",
    telephony: "AIR NAPIER",
  },
  {
    airlineCode: "RON",
    telephony: "AIR NAURU",
  },
  {
    airlineCode: "ANB",
    telephony: "AIR NAV",
  },
  {
    airlineCode: "NPL",
    telephony: "AIR NEPAL",
  },
  {
    airlineCode: "AWN",
    telephony: "AIR NIAMEY",
  },
  {
    airlineCode: "NKV",
    telephony: "AIR NIKOLAEV",
  },
  {
    airlineCode: "ANT",
    telephony: "AIR NORTH",
  },
  {
    airlineCode: "OLD",
    telephony: "AIR ORENDA",
  },
  {
    airlineCode: "PCS",
    telephony: "AIR PALACE",
  },
  {
    airlineCode: "APE",
    telephony: "AIR PARCEL",
  },
  {
    airlineCode: "APJ",
    telephony: "AIR PEACH",
  },
  {
    airlineCode: "PNK",
    telephony: "AIR PINK",
  },
  {
    airlineCode: "KAB",
    telephony: "AIR POHANG",
  },
  {
    airlineCode: "TAP",
    telephony: "AIR PORTUGAL",
  },
  {
    airlineCode: "PRG",
    telephony: "AIR PRAGUE",
  },
  {
    airlineCode: "APZ",
    telephony: "AIR PREMIA",
  },
  {
    airlineCode: "OZB",
    telephony: "AIR PRIMUS",
  },
  {
    airlineCode: "PAD",
    telephony: "AIR PROFESSIONAL",
  },
  {
    airlineCode: "PPA",
    telephony: "AIR PROP",
  },
  {
    airlineCode: "RQT",
    telephony: "AIR QUEST",
  },
  {
    airlineCode: "RWZ",
    telephony: "AIR RED",
  },
  {
    airlineCode: "LNM",
    telephony: "AIR RING",
  },
  {
    airlineCode: "RAX",
    telephony: "AIR ROYAL",
  },
  {
    airlineCode: "SFM",
    telephony: "AIR SAFAR",
  },
  {
    airlineCode: "RKA",
    telephony: "AIR SAKHA",
  },
  {
    airlineCode: "MVS",
    telephony: "AIR SENOK",
  },
  {
    airlineCode: "ASV",
    telephony: "AIR SEOUL",
  },
  {
    airlineCode: "ASL",
    telephony: "AIR SERBIA",
  },
  {
    airlineCode: "ASH",
    telephony: "AIR SHUTTLE",
  },
  {
    airlineCode: "SIF",
    telephony: "AIR SIAL",
  },
  {
    airlineCode: "SUA",
    telephony: "AIR SILESIA",
  },
  {
    airlineCode: "ASD",
    telephony: "AIR SINAI",
  },
  {
    airlineCode: "SOE",
    telephony: "AIR SOLEIL",
  },
  {
    airlineCode: "ASB",
    telephony: "AIR SPRAY",
  },
  {
    airlineCode: "CQH",
    telephony: "AIR SPRING",
  },
  {
    airlineCode: "CPT",
    telephony: "AIR SPUR",
  },
  {
    airlineCode: "NSR",
    telephony: "AIR STAR",
  },
  {
    airlineCode: "AXD",
    telephony: "AIR SUDEX",
  },
  {
    airlineCode: "RSI",
    telephony: "AIR SUNSHINE",
  },
  {
    airlineCode: "SWN",
    telephony: "AIR SWEDEN",
  },
  {
    airlineCode: "VTA",
    telephony: "AIR TAHITI",
  },
  {
    airlineCode: "AGP",
    telephony: "AIR TARA",
  },
  {
    airlineCode: "AIT",
    telephony: "AIR TAURUS",
  },
  {
    airlineCode: "FAT",
    telephony: "AIR TAXI",
  },
  {
    airlineCode: "THU",
    telephony: "AIR THUNDER",
  },
  {
    airlineCode: "LSP",
    telephony: "AIR TONY",
  },
  {
    airlineCode: "TOP",
    telephony: "AIR TOP",
  },
  {
    airlineCode: "AOU",
    telephony: "AIR TRACTOR",
  },
  {
    airlineCode: "TSN",
    telephony: "AIR TRANS",
  },
  {
    airlineCode: "TSC",
    telephony: "AIR TRANSAT",
  },
  {
    airlineCode: "ATN",
    telephony: "AIR TRANSPORT",
  },
  {
    airlineCode: "OTC",
    telephony: "AIR TRAVEL",
  },
  {
    airlineCode: "AUE",
    telephony: "AIR UNIVERSE",
  },
  {
    airlineCode: "VHA",
    telephony: "AIR V-H",
  },
  {
    airlineCode: "AVZ",
    telephony: "AIR VALENCIA",
  },
  {
    airlineCode: "AVN",
    telephony: "AIR VAN",
  },
  {
    airlineCode: "VGA",
    telephony: "AIR VICTORY",
  },
  {
    airlineCode: "FVA",
    telephony: "AIR VIRGINIA",
  },
  {
    airlineCode: "SYL",
    telephony: "AIR YAKUTIA",
  },
  {
    airlineCode: "AYE",
    telephony: "AIR YING AN",
  },
  {
    airlineCode: "AZB",
    telephony: "AIR ZAMBIA",
  },
  {
    airlineCode: "AZF",
    telephony: "AIR ZERMATT",
  },
  {
    airlineCode: "AZW",
    telephony: "AIR ZIMBABWE",
  },
  {
    airlineCode: "PBU",
    telephony: "AIR-BURUNDI",
  },
  {
    airlineCode: "VAE",
    telephony: "AIR-EVANS",
  },
  {
    airlineCode: "RMU",
    telephony: "AIR-MAUR",
  },
  {
    airlineCode: "ABI",
    telephony: "AIRALBACETE",
  },
  {
    airlineCode: "RWK",
    telephony: "AIRAWAK",
  },
  {
    airlineCode: "ARB",
    telephony: "AIRBAHN",
  },
  {
    airlineCode: "BTI",
    telephony: "AIRBALTIC",
  },
  {
    airlineCode: "BSL",
    telephony: "AIRBRASIL",
  },
  {
    airlineCode: "ABW",
    telephony: "AIRBRIDGE CARGO",
  },
  {
    airlineCode: "ABK",
    telephony: "AIRBUS CANUCK",
  },
  {
    airlineCode: "AIB",
    telephony: "AIRBUS INDUSTRIE",
  },
  {
    airlineCode: "CPI",
    telephony: "AIRCAI",
  },
  {
    airlineCode: "TPC",
    telephony: "AIRCAL",
  },
  {
    airlineCode: "ACI",
    telephony: "AIRCALIN",
  },
  {
    airlineCode: "ATY",
    telephony: "AIRCARE",
  },
  {
    airlineCode: "CAT",
    telephony: "AIRCAT",
  },
  {
    airlineCode: "CAO",
    telephony: "AIRCHINA FREIGHT",
  },
  {
    airlineCode: "ACB",
    telephony: "AIRCONTI",
  },
  {
    airlineCode: "XFX",
    telephony: "AIRCORP",
  },
  {
    airlineCode: "CPV",
    telephony: "AIRCORPORATE",
  },
  {
    airlineCode: "ACS",
    telephony: "AIRCRAFT SALES",
  },
  {
    airlineCode: "RDO",
    telephony: "AIRDOM",
  },
  {
    airlineCode: "AEG",
    telephony: "AIREST CARGO",
  },
  {
    airlineCode: "ARX",
    telephony: "AIREX",
  },
  {
    airlineCode: "AFE",
    telephony: "AIRFAST",
  },
  {
    airlineCode: "APH",
    telephony: "AIRFLIGHT",
  },
  {
    airlineCode: "AFR",
    telephony: "AIRFRANS",
  },
  {
    airlineCode: "HJA",
    telephony: "AIRHAITI",
  },
  {
    airlineCode: "AHD",
    telephony: "AIRHANDLING",
  },
  {
    airlineCode: "AHH",
    telephony: "AIRHOLD",
  },
  {
    airlineCode: "GJM",
    telephony: "AIRHUB",
  },
  {
    airlineCode: "AIC",
    telephony: "AIRINDIA",
  },
  {
    airlineCode: "VUN",
    telephony: "AIRIVOIRE",
  },
  {
    airlineCode: "AJU",
    telephony: "AIRJETSUL",
  },
  {
    airlineCode: "JBW",
    telephony: "AIRJUB",
  },
  {
    airlineCode: "ARL",
    telephony: "AIRLEC",
  },
  {
    airlineCode: "AIR",
    telephony: "AIRLIFT",
  },
  {
    airlineCode: "LKS",
    telephony: "AIRLIN",
  },
  {
    airlineCode: "BSD",
    telephony: "AIRLINES STAR",
  },
  {
    airlineCode: "JAR",
    telephony: "AIRLINK",
  },
  {
    airlineCode: "DLB",
    telephony: "AIRLINK BAHAMAS",
  },
  {
    airlineCode: "AYM",
    telephony: "AIRMAN",
  },
  {
    airlineCode: "MAU",
    telephony: "AIRMAURITIUS",
  },
  {
    airlineCode: "AMI",
    telephony: "AIRMEK",
  },
  {
    airlineCode: "MTK",
    telephony: "AIRMETACK",
  },
  {
    airlineCode: "AME",
    telephony: "AIRMIL",
  },
  {
    airlineCode: "POW",
    telephony: "AIRNET",
  },
  {
    airlineCode: "NRA",
    telephony: "AIRNOAR",
  },
  {
    airlineCode: "APC",
    telephony: "AIRPAC",
  },
  {
    airlineCode: "PCK",
    telephony: "AIRPACK EXPRESS",
  },
  {
    airlineCode: "PLL",
    telephony: "AIRPAL",
  },
  {
    airlineCode: "PEL",
    telephony: "AIRPEN",
  },
  {
    airlineCode: "GAP",
    telephony: "AIRPHIL",
  },
  {
    airlineCode: "POF",
    telephony: "AIRPOL",
  },
  {
    airlineCode: "AHE",
    telephony: "AIRPORT HELICOPTER",
  },
  {
    airlineCode: "UTS",
    telephony: "AIRRUH",
  },
  {
    airlineCode: "SRI",
    telephony: "AIRSAFARI",
  },
  {
    airlineCode: "ASN",
    telephony: "AIRSENSING",
  },
  {
    airlineCode: "XSR",
    telephony: "AIRSHARE",
  },
  {
    airlineCode: "ASX",
    telephony: "AIRSPEC",
  },
  {
    airlineCode: "ASP",
    telephony: "AIRSPRINT",
  },
  {
    airlineCode: "AXC",
    telephony: "AIRSPUP",
  },
  {
    airlineCode: "AQS",
    telephony: "AIRSTREAM",
  },
  {
    airlineCode: "ATX",
    telephony: "AIRSWIFT",
  },
  {
    airlineCode: "ATM",
    telephony: "AIRTAS",
  },
  {
    airlineCode: "DCT",
    telephony: "AIRTASK",
  },
  {
    airlineCode: "AVC",
    telephony: "AIRTEAM VARNA",
  },
  {
    airlineCode: "IRB",
    telephony: "AIRTOUR",
  },
  {
    airlineCode: "TSQ",
    telephony: "AIRTRA",
  },
  {
    airlineCode: "TSA",
    telephony: "AIRTRAF",
  },
  {
    airlineCode: "RVE",
    telephony: "AIRVENTURE",
  },
  {
    airlineCode: "UAP",
    telephony: "AIRWING",
  },
  {
    airlineCode: "AWK",
    telephony: "AIRWORK",
  },
  {
    airlineCode: "AJY",
    telephony: "AJWAA AIRLINES",
  },
  {
    airlineCode: "AKS",
    telephony: "AKEL",
  },
  {
    airlineCode: "AKK",
    telephony: "AKER",
  },
  {
    airlineCode: "AKH",
    telephony: "AKHAL",
  },
  {
    airlineCode: "USW",
    telephony: "AKSAR",
  },
  {
    airlineCode: "LJB",
    telephony: "AL JABER",
  },
  {
    airlineCode: "LRW",
    telephony: "AL RIDA",
  },
  {
    airlineCode: "EFC",
    telephony: "AL WASEL",
  },
  {
    airlineCode: "AAS",
    telephony: "AL-AAS",
  },
  {
    airlineCode: "NBK",
    telephony: "AL-AIR",
  },
  {
    airlineCode: "LIE",
    telephony: "AL-DAWOOD AIR",
  },
  {
    airlineCode: "MHK",
    telephony: "AL-NASER",
  },
  {
    airlineCode: "TJB",
    telephony: "ALADIN",
  },
  {
    airlineCode: "AVD",
    telephony: "ALAMO",
  },
  {
    airlineCode: "ALQ",
    telephony: "ALANNA",
  },
  {
    airlineCode: "ALY",
    telephony: "ALAS URUGUAY",
  },
  {
    airlineCode: "ALS",
    telephony: "ALASDELSUR",
  },
  {
    airlineCode: "ASA",
    telephony: "ALASKA",
  },
  {
    airlineCode: "AAK",
    telephony: "ALASKA ISLAND",
  },
  {
    airlineCode: "AFQ",
    telephony: "ALBA",
  },
  {
    airlineCode: "WBA",
    telephony: "ALBAJET",
  },
  {
    airlineCode: "LAV",
    telephony: "ALBASTAR",
  },
  {
    airlineCode: "ALB",
    telephony: "ALBATROS",
  },
  {
    airlineCode: "ABM",
    telephony: "ALBATROS ESPANA",
  },
  {
    airlineCode: "AWT",
    telephony: "ALBAWINGS",
  },
  {
    airlineCode: "ULC",
    telephony: "ALBI",
  },
  {
    airlineCode: "LUC",
    telephony: "ALBINATI",
  },
  {
    airlineCode: "HTH",
    telephony: "ALBORAN",
  },
  {
    airlineCode: "LDN",
    telephony: "ALDONAS AIR",
  },
  {
    airlineCode: "AAJ",
    telephony: "ALFA SUDAN",
  },
  {
    airlineCode: "AKX",
    telephony: "ALFA WING",
  },
  {
    airlineCode: "TXF",
    telephony: "ALFE",
  },
  {
    airlineCode: "PMF",
    telephony: "ALFESTIVAL",
  },
  {
    airlineCode: "KJD",
    telephony: "ALGERIAN AIRFORCE",
  },
  {
    airlineCode: "AHB",
    telephony: "ALHAMBRA",
  },
  {
    airlineCode: "HYA",
    telephony: "ALHAYA",
  },
  {
    airlineCode: "LID",
    telephony: "ALIDA",
  },
  {
    airlineCode: "PAJ",
    telephony: "ALIPARMA",
  },
  {
    airlineCode: "AZA",
    telephony: "ALITALIA",
  },
  {
    airlineCode: "RLZ",
    telephony: "ALIZE",
  },
  {
    airlineCode: "AJH",
    telephony: "ALJARAFE",
  },
  {
    airlineCode: "AKN",
    telephony: "ALKAN AIR",
  },
  {
    airlineCode: "ALN",
    telephony: "ALKAN AVIATION",
  },
  {
    airlineCode: "KVT",
    telephony: "ALL AFRICA",
  },
  {
    airlineCode: "ANA",
    telephony: "ALL NIPPON",
  },
  {
    airlineCode: "ALO",
    telephony: "ALLEGHENY",
  },
  {
    airlineCode: "AAY",
    telephony: "ALLEGIANT",
  },
  {
    airlineCode: "LLN",
    telephony: "ALLEN",
  },
  {
    airlineCode: "XAM",
    telephony: "ALLIANCE",
  },
  {
    airlineCode: "ALE",
    telephony: "ALLIANCE MALTA",
  },
  {
    airlineCode: "LBO",
    telephony: "ALLIBO FREIGHT",
  },
  {
    airlineCode: "LLR",
    telephony: "ALLIED",
  },
  {
    airlineCode: "ALP",
    telephony: "ALLPOINTS",
  },
  {
    airlineCode: "MVP",
    telephony: "ALLSTAR",
  },
  {
    airlineCode: "AWX",
    telephony: "ALLWEATHER",
  },
  {
    airlineCode: "LMU",
    telephony: "ALMASRIA",
  },
  {
    airlineCode: "HPO",
    telephony: "ALMIRON",
  },
  {
    airlineCode: "AAH",
    telephony: "ALOHA",
  },
  {
    airlineCode: "LOK",
    telephony: "ALOK AIR",
  },
  {
    airlineCode: "AJW",
    telephony: "ALPHAJET",
  },
  {
    airlineCode: "EJU",
    telephony: "ALPINE",
  },
  {
    airlineCode: "AIP",
    telephony: "ALPINE AIR",
  },
  {
    airlineCode: "AYL",
    telephony: "ALPINE NEPAL",
  },
  {
    airlineCode: "BHZ",
    telephony: "ALPINE STAR",
  },
  {
    airlineCode: "SOD",
    telephony: "ALSOL",
  },
  {
    airlineCode: "AGH",
    telephony: "ALTAGNA",
  },
  {
    airlineCode: "STY",
    telephony: "ALTAIR",
  },
  {
    airlineCode: "BWK",
    telephony: "ALTERAERO",
  },
  {
    airlineCode: "ATP",
    telephony: "ALTIPLANO",
  },
  {
    airlineCode: "MAP",
    telephony: "ALTJETS",
  },
  {
    airlineCode: "LYN",
    telephony: "ALTYN AVIA",
  },
  {
    airlineCode: "AGT",
    telephony: "AMADEUS",
  },
  {
    airlineCode: "OBK",
    telephony: "AMAKO AIR",
  },
  {
    airlineCode: "AHX",
    telephony: "AMAKUSA AIR",
  },
  {
    airlineCode: "FAJ",
    telephony: "AMANJET",
  },
  {
    airlineCode: "APF",
    telephony: "AMAPOLA",
  },
  {
    airlineCode: "MZN",
    telephony: "AMAZON",
  },
  {
    airlineCode: "AZN",
    telephony: "AMAZONAS",
  },
  {
    airlineCode: "TCI",
    telephony: "AMBER",
  },
  {
    airlineCode: "JEE",
    telephony: "AMBJEK AIR",
  },
  {
    airlineCode: "AIA",
    telephony: "AMELIA",
  },
  {
    airlineCode: "VAM",
    telephony: "AMERAVIA",
  },
  {
    airlineCode: "AAL",
    telephony: "AMERICAN",
  },
  {
    airlineCode: "ACT",
    telephony: "AMERICAN CHECK",
  },
  {
    airlineCode: "AJT",
    telephony: "AMERIJET",
  },
  {
    airlineCode: "AJI",
    telephony: "AMERISTAR",
  },
  {
    airlineCode: "AMQ",
    telephony: "AMEX",
  },
  {
    airlineCode: "AMF",
    telephony: "AMFLIGHT",
  },
  {
    airlineCode: "AXA",
    telephony: "AMIRA",
  },
  {
    airlineCode: "QAF",
    telephony: "AMIRI",
  },
  {
    airlineCode: "AMZ",
    telephony: "PRIME AIR",
  },
  {
    airlineCode: "AJB",
    telephony: "AMJET",
  },
  {
    airlineCode: "AMJ",
    telephony: "AMJET EXEC",
  },
  {
    airlineCode: "MPO",
    telephony: "AMPARO",
  },
  {
    airlineCode: "AJP",
    telephony: "ANAPJETS",
  },
  {
    airlineCode: "NCL",
    telephony: "ANCARGO AIR",
  },
  {
    airlineCode: "ANU",
    telephony: "ANDALUS",
  },
  {
    airlineCode: "AYH",
    telephony: "ANDES",
  },
  {
    airlineCode: "IAA",
    telephony: "ANFIBIOS",
  },
  {
    airlineCode: "NGF",
    telephony: "ANGEL FLIGHT",
  },
  {
    airlineCode: "AGM",
    telephony: "ANGEL MED",
  },
  {
    airlineCode: "ANW",
    telephony: "ANGEL WINGS",
  },
  {
    airlineCode: "JLC",
    telephony: "ANGELIC",
  },
  {
    airlineCode: "RMF",
    telephony: "ANGKASA",
  },
  {
    airlineCode: "CCL",
    telephony: "ANGKOR WAT",
  },
  {
    airlineCode: "AKW",
    telephony: "ANGKORWAYS",
  },
  {
    airlineCode: "VYT",
    telephony: "ANGLESEY",
  },
  {
    airlineCode: "AJZ",
    telephony: "ANGLO JET",
  },
  {
    airlineCode: "NGV",
    telephony: "ANGOAVIA",
  },
  {
    airlineCode: "AGO",
    telephony: "ANGOLA CHARTER",
  },
  {
    airlineCode: "NGC",
    telephony: "ANGOSERVICE",
  },
  {
    airlineCode: "AXL",
    telephony: "ANGUILLA",
  },
  {
    airlineCode: "AWG",
    telephony: "ANIMA WINGS",
  },
  {
    airlineCode: "ARF",
    telephony: "ANIMAL FLIGHTS",
  },
  {
    airlineCode: "NKA",
    telephony: "ANKA CARGO",
  },
  {
    airlineCode: "TIR",
    telephony: "ANTAIR",
  },
  {
    airlineCode: "DJA",
    telephony: "ANTINEA",
  },
  {
    airlineCode: "ANQ",
    telephony: "ANTIOQUIA",
  },
  {
    airlineCode: "ADB",
    telephony: "ANTONOV BUREAU",
  },
  {
    airlineCode: "APX",
    telephony: "APEX",
  },
  {
    airlineCode: "GEO",
    telephony: "APOLAX",
  },
  {
    airlineCode: "FCB",
    telephony: "APOLLO",
  },
  {
    airlineCode: "POY",
    telephony: "APOYO AEREO",
  },
  {
    airlineCode: "APA",
    telephony: "APOYO LOG",
  },
  {
    airlineCode: "ZAZ",
    telephony: "APPROACH",
  },
  {
    airlineCode: "AQQ",
    telephony: "APSARA",
  },
  {
    airlineCode: "APU",
    telephony: "APUKA",
  },
  {
    airlineCode: "AWS",
    telephony: "ARAB WINGS",
  },
  {
    airlineCode: "AAP",
    telephony: "ARABASCO",
  },
  {
    airlineCode: "ABY",
    telephony: "ARABIA",
  },
  {
    airlineCode: "ALL",
    telephony: "ARABIA AVIA",
  },
  {
    airlineCode: "RBG",
    telephony: "ARABIA EGYPT",
  },
  {
    airlineCode: "MAC",
    telephony: "ARABIA MAROC",
  },
  {
    airlineCode: "UTT",
    telephony: "ARABIAN TRANSPORT",
  },
  {
    airlineCode: "IRW",
    telephony: "ARAM",
  },
  {
    airlineCode: "AOC",
    telephony: "ARAMIS",
  },
  {
    airlineCode: "ARV",
    telephony: "ARAVCO",
  },
  {
    airlineCode: "AUL",
    telephony: "ARCHANGELSK AIR",
  },
  {
    airlineCode: "RHL",
    telephony: "ARCHIPELS",
  },
  {
    airlineCode: "AKT",
    telephony: "ARCTIC",
  },
  {
    airlineCode: "FEI",
    telephony: "ARCTIC EAGLE",
  },
  {
    airlineCode: "AZE",
    telephony: "ARCUS AIR",
  },
  {
    airlineCode: "REN",
    telephony: "ARENA",
  },
  {
    airlineCode: "ARG",
    telephony: "ARGENTINA",
  },
  {
    airlineCode: "AUU",
    telephony: "ARGO",
  },
  {
    airlineCode: "IRX",
    telephony: "ARIA",
  },
  {
    airlineCode: "AFG",
    telephony: "ARIANA",
  },
  {
    airlineCode: "RIE",
    telephony: "ARIEL",
  },
  {
    airlineCode: "ARA",
    telephony: "ARIK AIR",
  },
  {
    airlineCode: "AIZ",
    telephony: "ARKIA",
  },
  {
    airlineCode: "RMO",
    telephony: "ARM-AERO",
  },
  {
    airlineCode: "KAV",
    telephony: "ARMHELI",
  },
  {
    airlineCode: "AAC",
    telephony: "ARMYAIR",
  },
  {
    airlineCode: "OCA",
    telephony: "AROSCA",
  },
  {
    airlineCode: "ADT",
    telephony: "ARRENDA-TRANS",
  },
  {
    airlineCode: "END",
    telephony: "ARRENDADORA",
  },
  {
    airlineCode: "HEZ",
    telephony: "ARROW",
  },
  {
    airlineCode: "RSF",
    telephony: "ARSAF",
  },
  {
    airlineCode: "OES",
    telephony: "ART AUSTRIA",
  },
  {
    airlineCode: "ATI",
    telephony: "ART AVIA",
  },
  {
    airlineCode: "MIS",
    telephony: "ARTEMIS",
  },
  {
    airlineCode: "UIT",
    telephony: "ARTIC",
  },
  {
    airlineCode: "ARU",
    telephony: "ARUBA",
  },
  {
    airlineCode: "IRD",
    telephony: "ARVAND",
  },
  {
    airlineCode: "API",
    telephony: "ASA PESADA",
  },
  {
    airlineCode: "ASZ",
    telephony: "ASCENSION",
  },
  {
    airlineCode: "RRR",
    telephony: "ASCOT",
  },
  {
    airlineCode: "IRC",
    telephony: "ASEMAN",
  },
  {
    airlineCode: "ERI",
    telephony: "ASERGIO",
  },
  {
    airlineCode: "RJS",
    telephony: "ASERJET",
  },
  {
    airlineCode: "ASE",
    telephony: "ASERTEC",
  },
  {
    airlineCode: "AAQ",
    telephony: "ASIA ATLANTIC",
  },
  {
    airlineCode: "CXM",
    telephony: "ASIA CARGO",
  },
  {
    airlineCode: "ICU",
    telephony: "ASIA MEDICAL",
  },
  {
    airlineCode: "AKC",
    telephony: "ASIALINK CARGO",
  },
  {
    airlineCode: "DEX",
    telephony: "ASIAN AIR",
  },
  {
    airlineCode: "AWM",
    telephony: "ASIAN STAR",
  },
  {
    airlineCode: "AAR",
    telephony: "ASIANA",
  },
  {
    airlineCode: "LIC",
    telephony: "ASIASLINE",
  },
  {
    airlineCode: "ASW",
    telephony: "ASIAWAYS",
  },
  {
    airlineCode: "AKP",
    telephony: "ASKARI AIR",
  },
  {
    airlineCode: "SKK",
    telephony: "ASKY AIRLINE",
  },
  {
    airlineCode: "AHF",
    telephony: "ASPEN",
  },
  {
    airlineCode: "SCD",
    telephony: "ASSOCIATED",
  },
  {
    airlineCode: "SUL",
    telephony: "ASTAIR",
  },
  {
    airlineCode: "KZR",
    telephony: "ASTANALINE",
  },
  {
    airlineCode: "AOJ",
    telephony: "ASTERIX",
  },
  {
    airlineCode: "ASJ",
    telephony: "ASTONJET",
  },
  {
    airlineCode: "ACP",
    telephony: "ASTRAL CARGO",
  },
  {
    airlineCode: "AAV",
    telephony: "ASTRO-PHIL",
  },
  {
    airlineCode: "ASU",
    telephony: "ASUR",
  },
  {
    airlineCode: "VTG",
    telephony: "ATACARGO",
  },
  {
    airlineCode: "AOF",
    telephony: "ATAIR",
  },
  {
    airlineCode: "TBZ",
    telephony: "ATALAR AIR",
  },
  {
    airlineCode: "AQA",
    telephony: "ATCO",
  },
  {
    airlineCode: "TEK",
    telephony: "ATECH",
  },
  {
    airlineCode: "IGL",
    telephony: "ATISA",
  },
  {
    airlineCode: "AUM",
    telephony: "ATLAMUR",
  },
  {
    airlineCode: "ABD",
    telephony: "ATLANTA",
  },
  {
    airlineCode: "GBN",
    telephony: "ATLANTIC GABON",
  },
  {
    airlineCode: "JLM",
    telephony: "ATLANTIC GAMBIA",
  },
  {
    airlineCode: "HHA",
    telephony: "ATLANTIC HONDURAS",
  },
  {
    airlineCode: "AYN",
    telephony: "ATLANTIC NICARAGUA",
  },
  {
    airlineCode: "AEU",
    telephony: "ATLANTIS",
  },
  {
    airlineCode: "KRS",
    telephony: "ATLAS",
  },
  {
    airlineCode: "IRH",
    telephony: "ATLAS AVIA",
  },
  {
    airlineCode: "LSX",
    telephony: "ATLAS EXEC",
  },
  {
    airlineCode: "UJX",
    telephony: "ATLAS UKRAINE",
  },
  {
    airlineCode: "KKK",
    telephony: "ATLASJET",
  },
  {
    airlineCode: "AVJ",
    telephony: "ATOMIC",
  },
  {
    airlineCode: "ATR",
    telephony: "ATRAK AIR",
  },
  {
    airlineCode: "VAS",
    telephony: "ATRAN",
  },
  {
    airlineCode: "AMP",
    telephony: "ATSA",
  },
  {
    airlineCode: "DUG",
    telephony: "ATSAVEN",
  },
  {
    airlineCode: "UND",
    telephony: "ATUNEROS UNIDOS",
  },
  {
    airlineCode: "ADI",
    telephony: "AUDELI",
  },
  {
    airlineCode: "XAE",
    telephony: "AURA",
  },
  {
    airlineCode: "AUK",
    telephony: "AURIC SERVICES",
  },
  {
    airlineCode: "SHU",
    telephony: "AURORA",
  },
  {
    airlineCode: "AUY",
    telephony: "AUSA",
  },
  {
    airlineCode: "ADA",
    telephony: "AUSCAL",
  },
  {
    airlineCode: "ASY",
    telephony: "AUSSIE",
  },
  {
    airlineCode: "AUT",
    telephony: "AUSTRAL",
  },
  {
    airlineCode: "AUA",
    telephony: "AUSTRIAN",
  },
  {
    airlineCode: "ASF",
    telephony: "AUSTRIAN AIRFORCE",
  },
  {
    airlineCode: "FOO",
    telephony: "AUSTROJET",
  },
  {
    airlineCode: "XMR",
    telephony: "AUTHORITY",
  },
  {
    airlineCode: "MBA",
    telephony: "AVAG AIR",
  },
  {
    airlineCode: "VLC",
    telephony: "AVALANCHE",
  },
  {
    airlineCode: "MEI",
    telephony: "AVALON",
  },
  {
    airlineCode: "VDO",
    telephony: "AVANDARO",
  },
  {
    airlineCode: "BAO",
    telephony: "AVANGARD",
  },
  {
    airlineCode: "VNR",
    telephony: "AVANTAIR",
  },
  {
    airlineCode: "GLV",
    telephony: "AVANTI",
  },
  {
    airlineCode: "ATV",
    telephony: "AVANTI AIR",
  },
  {
    airlineCode: "SMJ",
    telephony: "AVAVIA",
  },
  {
    airlineCode: "VCN",
    telephony: "AVCON",
  },
  {
    airlineCode: "VZA",
    telephony: "AVEAIR",
  },
  {
    airlineCode: "VXP",
    telephony: "AVELO",
  },
  {
    airlineCode: "AVM",
    telephony: "AVEMEX",
  },
  {
    airlineCode: "AVF",
    telephony: "AVES FLIGHT",
  },
  {
    airlineCode: "AVE",
    telephony: "AVEX AIR",
  },
  {
    airlineCode: "LLD",
    telephony: "AVIA LLOYD",
  },
  {
    airlineCode: "AVP",
    telephony: "AVIA PUEBLA",
  },
  {
    airlineCode: "BRE",
    telephony: "AVIABREEZE",
  },
  {
    airlineCode: "GAK",
    telephony: "AVIAGROUP",
  },
  {
    airlineCode: "AVS",
    telephony: "AVIALSA",
  },
  {
    airlineCode: "VME",
    telephony: "AVIAMERICA",
  },
  {
    airlineCode: "MMM",
    telephony: "AVIAMERIDIAN",
  },
  {
    airlineCode: "ANC",
    telephony: "AVIAN",
  },
  {
    airlineCode: "AVA",
    telephony: "AVIANCA",
  },
  {
    airlineCode: "XAV",
    telephony: "AVIAPROM",
  },
  {
    airlineCode: "BIV",
    telephony: "AVIASERVICE",
  },
  {
    airlineCode: "VIT",
    telephony: "AVIASTAR",
  },
  {
    airlineCode: "AJO",
    telephony: "AVIATE JET",
  },
  {
    airlineCode: "AVK",
    telephony: "AVIATE-COPTER",
  },
  {
    airlineCode: "GUG",
    telephony: "AVIATECA",
  },
  {
    airlineCode: "KAG",
    telephony: "AVIATION COLLEGE",
  },
  {
    airlineCode: "TQQ",
    telephony: "AVIATION TARCO",
  },
  {
    airlineCode: "AVO",
    telephony: "AVIATION WORK",
  },
  {
    airlineCode: "TIS",
    telephony: "AVIATIS",
  },
  {
    airlineCode: "SCA",
    telephony: "AVIATOR",
  },
  {
    airlineCode: "AVQ",
    telephony: "AVIC",
  },
  {
    airlineCode: "CCO",
    telephony: "AVIC CARGO",
  },
  {
    airlineCode: "FOT",
    telephony: "AVIFOTO",
  },
  {
    airlineCode: "LAG",
    telephony: "AVILEG",
  },
  {
    airlineCode: "VND",
    telephony: "AVINORD",
  },
  {
    airlineCode: "SLU",
    telephony: "AVIO SLUZBA",
  },
  {
    airlineCode: "ROI",
    telephony: "AVIOR",
  },
  {
    airlineCode: "RGR",
    telephony: "AVIOR REGIONAL",
  },
  {
    airlineCode: "VSR",
    telephony: "AVIOSTART",
  },
  {
    airlineCode: "VXG",
    telephony: "AVIREX-GABON",
  },
  {
    airlineCode: "AVW",
    telephony: "AVIRO",
  },
  {
    airlineCode: "SLV",
    telephony: "AVISTELLA",
  },
  {
    airlineCode: "AJJ",
    telephony: "AVJET",
  },
  {
    airlineCode: "VLX",
    telephony: "AVOLAR",
  },
  {
    airlineCode: "WFD",
    telephony: "AVRO",
  },
  {
    airlineCode: "AHJ",
    telephony: "AVYCOP",
  },
  {
    airlineCode: "AWW",
    telephony: "AWA",
  },
  {
    airlineCode: "ASM",
    telephony: "AWESOME",
  },
  {
    airlineCode: "AXT",
    telephony: "AXTRANSPORTER",
  },
  {
    airlineCode: "AYT",
    telephony: "AYIT",
  },
  {
    airlineCode: "AUR",
    telephony: "AYLINE",
  },
  {
    airlineCode: "AHY",
    telephony: "AZAL",
  },
  {
    airlineCode: "AZX",
    telephony: "AZIMA",
  },
  {
    airlineCode: "AZT",
    telephony: "AZIMUT",
  },
  {
    airlineCode: "AZO",
    telephony: "AZIMUTH-DON",
  },
  {
    airlineCode: "AZM",
    telephony: "AZMAN AIR",
  },
  {
    airlineCode: "AZY",
    telephony: "AZTEC WORLD",
  },
  {
    airlineCode: "AZU",
    telephony: "AZUL",
  },
  {
    airlineCode: "KTK",
    telephony: "AZUR AIR",
  },
  {
    airlineCode: "ALZ",
    telephony: "AZURE",
  },
  {
    airlineCode: "AZZ",
    telephony: "AZZA TRANSPORT",
  },
  {
    airlineCode: "BBK",
    telephony: "BABAK",
  },
  {
    airlineCode: "BBO",
    telephony: "BABCOCK",
  },
  {
    airlineCode: "BBE",
    telephony: "BABEL AIR",
  },
  {
    airlineCode: "FBJ",
    telephony: "BABY JET",
  },
  {
    airlineCode: "BCF",
    telephony: "BACH",
  },
  {
    airlineCode: "BOB",
    telephony: "BACKBONE",
  },
  {
    airlineCode: "BCR",
    telephony: "BACKER",
  },
  {
    airlineCode: "BAD",
    telephony: "BADLANDS",
  },
  {
    airlineCode: "BDR",
    telephony: "BADR AIR",
  },
  {
    airlineCode: "BHS",
    telephony: "BAHAMAS",
  },
  {
    airlineCode: "BHC",
    telephony: "BAHIA",
  },
  {
    airlineCode: "BAH",
    telephony: "BAHRAIN",
  },
  {
    airlineCode: "BAB",
    telephony: "BAHRAIN AIR",
  },
  {
    airlineCode: "BTP",
    telephony: "BAHRIA TOWN",
  },
  {
    airlineCode: "FBY",
    telephony: "BAI FLY",
  },
  {
    airlineCode: "ABP",
    telephony: "BAIR",
  },
  {
    airlineCode: "BJA",
    telephony: "BAJA AIR",
  },
  {
    airlineCode: "XAL",
    telephony: "BAJANSTAR",
  },
  {
    airlineCode: "AJN",
    telephony: "BAJANTE",
  },
  {
    airlineCode: "BAJ",
    telephony: "BAKER AVIATION",
  },
  {
    airlineCode: "BKF",
    telephony: "BAKERFLIGHT",
  },
  {
    airlineCode: "BFO",
    telephony: "BAKHTAR",
  },
  {
    airlineCode: "OGJ",
    telephony: "BAKO AIR",
  },
  {
    airlineCode: "KPT",
    telephony: "BALADO",
  },
  {
    airlineCode: "BEF",
    telephony: "BALEAR EXPRESS",
  },
  {
    airlineCode: "RCB",
    telephony: "BALEARES",
  },
  {
    airlineCode: "BIC",
    telephony: "BALESIN",
  },
  {
    airlineCode: "BAA",
    telephony: "BALKAN AGRO",
  },
  {
    airlineCode: "BGH",
    telephony: "BALKAN HOLIDAYS",
  },
  {
    airlineCode: "SBB",
    telephony: "BALKAN JET",
  },
  {
    airlineCode: "BAL",
    telephony: "BALMORAL",
  },
  {
    airlineCode: "BTL",
    telephony: "BALTIA",
  },
  {
    airlineCode: "BLL",
    telephony: "BALTIC AIRLINES",
  },
  {
    airlineCode: "BJC",
    telephony: "BALTIC JET",
  },
  {
    airlineCode: "BTH",
    telephony: "BALTIJAS HELICOPTERS",
  },
  {
    airlineCode: "TOK",
    telephony: "BALUS",
  },
  {
    airlineCode: "AJK",
    telephony: "BAMBI",
  },
  {
    airlineCode: "BAV",
    telephony: "BAMBOO",
  },
  {
    airlineCode: "BNS",
    telephony: "BANCSTAR",
  },
  {
    airlineCode: "BKP",
    telephony: "BANGKOK AIR",
  },
  {
    airlineCode: "BHD",
    telephony: "BANGKOK DUSIT",
  },
  {
    airlineCode: "BBC",
    telephony: "BANGLADESH",
  },
  {
    airlineCode: "UBG",
    telephony: "BANGLASTAR",
  },
  {
    airlineCode: "BKA",
    telephony: "BANKAIR",
  },
  {
    airlineCode: "BCK",
    telephony: "BANKCHECK",
  },
  {
    airlineCode: "BMX",
    telephony: "BANXICO",
  },
  {
    airlineCode: "BNH",
    telephony: "BAONENG JET",
  },
  {
    airlineCode: "HSJ",
    telephony: "BAOSHENG",
  },
  {
    airlineCode: "AJC",
    telephony: "BAR HARBOR",
  },
  {
    airlineCode: "BKL",
    telephony: "BARCOL",
  },
  {
    airlineCode: "BKJ",
    telephony: "BARKEN JET",
  },
  {
    airlineCode: "BKH",
    telephony: "BARKSTON",
  },
  {
    airlineCode: "BNC",
    telephony: "BARNACLE AIR",
  },
  {
    airlineCode: "BRI",
    telephony: "BARRICK",
  },
  {
    airlineCode: "BRK",
    telephony: "BARTOK",
  },
  {
    airlineCode: "BNI",
    telephony: "BARTOLINI",
  },
  {
    airlineCode: "BPS",
    telephony: "BASE",
  },
  {
    airlineCode: "BFC",
    telephony: "BASLER",
  },
  {
    airlineCode: "BWS",
    telephony: "BASS EXEC",
  },
  {
    airlineCode: "BSX",
    telephony: "BASSAKA",
  },
  {
    airlineCode: "NDJ",
    telephony: "BASSAMAT",
  },
  {
    airlineCode: "BEU",
    telephony: "BATELEUR",
  },
  {
    airlineCode: "BTK",
    telephony: "BATIK",
  },
  {
    airlineCode: "CRK",
    telephony: "BAUHINIA",
  },
  {
    airlineCode: "BVR",
    telephony: "BAVARIAN",
  },
  {
    airlineCode: "BJF",
    telephony: "BAXA",
  },
  {
    airlineCode: "BYF",
    telephony: "BAY FLIGHT",
  },
  {
    airlineCode: "BJT",
    telephony: "BAY JET",
  },
  {
    airlineCode: "BYC",
    telephony: "BAYON AIR",
  },
  {
    airlineCode: "BCH",
    telephony: "BEACHBALL",
  },
  {
    airlineCode: "BLS",
    telephony: "BEARSKIN",
  },
  {
    airlineCode: "LDA",
    telephony: "BEAUFORT",
  },
  {
    airlineCode: "AVB",
    telephony: "BEAUPAIR",
  },
  {
    airlineCode: "JAF",
    telephony: "BEAUTY",
  },
  {
    airlineCode: "BBW",
    telephony: "BEEBEE AIRWAYS",
  },
  {
    airlineCode: "MXP",
    telephony: "BEECHNUT",
  },
  {
    airlineCode: "BEL",
    telephony: "BEELINE",
  },
  {
    airlineCode: "BTX",
    telephony: "BEETLE",
  },
  {
    airlineCode: "BVG",
    telephony: "BEEVEEGEE VIAJES",
  },
  {
    airlineCode: "BJV",
    telephony: "BEIJING VISTA",
  },
  {
    airlineCode: "BEK",
    telephony: "BEKAIR",
  },
  {
    airlineCode: "BYS",
    telephony: "BEL SKY",
  },
  {
    airlineCode: "BRU",
    telephony: "BELARUS AVIA",
  },
  {
    airlineCode: "BLG",
    telephony: "BELGAVIA",
  },
  {
    airlineCode: "BAF",
    telephony: "BELGIAN AIRFORCE",
  },
  {
    airlineCode: "BCG",
    telephony: "BELGIAN COASTGUARD",
  },
  {
    airlineCode: "GDB",
    telephony: "BELGIAN GENDARMERIE",
  },
  {
    airlineCode: "NYB",
    telephony: "BELGIAN NAVY",
  },
  {
    airlineCode: "BWJ",
    telephony: "BELLAWING",
  },
  {
    airlineCode: "BLC",
    telephony: "BELLESAVIA",
  },
  {
    airlineCode: "BLV",
    telephony: "BELLVIEW AIRLINES",
  },
  {
    airlineCode: "BLO",
    telephony: "BELOGORIE",
  },
  {
    airlineCode: "BGA",
    telephony: "BELOUGA",
  },
  {
    airlineCode: "BRA",
    telephony: "BELRESCUE",
  },
  {
    airlineCode: "BLN",
    telephony: "BELTON",
  },
  {
    airlineCode: "BMJ",
    telephony: "BEMIDJI",
  },
  {
    airlineCode: "BNV",
    telephony: "BENANE",
  },
  {
    airlineCode: "BNT",
    telephony: "BENTIU AIR",
  },
  {
    airlineCode: "ABT",
    telephony: "BENWAYS",
  },
  {
    airlineCode: "GBM",
    telephony: "BERIEV COMPANY",
  },
  {
    airlineCode: "BRG",
    telephony: "BERING AIR",
  },
  {
    airlineCode: "BVT",
    telephony: "BERJAYA",
  },
  {
    airlineCode: "BKS",
    telephony: "BERKS",
  },
  {
    airlineCode: "KGS",
    telephony: "BERKUT",
  },
  {
    airlineCode: "ATU",
    telephony: "BERLIN SKY",
  },
  {
    airlineCode: "BYA",
    telephony: "BERRY",
  },
  {
    airlineCode: "BEY",
    telephony: "BESTFLY",
  },
  {
    airlineCode: "BET",
    telephony: "BETA CARGO",
  },
  {
    airlineCode: "BEV",
    telephony: "BEV AIR",
  },
  {
    airlineCode: "BXA",
    telephony: "BEXAIR",
  },
  {
    airlineCode: "BON",
    telephony: "BH AIRLINES",
  },
  {
    airlineCode: "BHO",
    telephony: "BHOJA",
  },
  {
    airlineCode: "BTN",
    telephony: "BHUTAN AIR",
  },
  {
    airlineCode: "BAP",
    telephony: "BIG APPLE",
  },
  {
    airlineCode: "BGB",
    telephony: "BIG BEND",
  },
  {
    airlineCode: "NCT",
    telephony: "BIG BIRD",
  },
  {
    airlineCode: "BIG",
    telephony: "BIG ISLE",
  },
  {
    airlineCode: "BSC",
    telephony: "BIG SHOT",
  },
  {
    airlineCode: "BSY",
    telephony: "BIG SKY",
  },
  {
    airlineCode: "SXJ",
    telephony: "BIG WING",
  },
  {
    airlineCode: "GTX",
    telephony: "BIG-DEE",
  },
  {
    airlineCode: "CBF",
    telephony: "BIGFOOT",
  },
  {
    airlineCode: "BHR",
    telephony: "BIGHORN AIR",
  },
  {
    airlineCode: "JSX",
    telephony: "BIGSTRIPE",
  },
  {
    airlineCode: "BIL",
    telephony: "BILAIR",
  },
  {
    airlineCode: "BKN",
    telephony: "BILLIKEN",
  },
  {
    airlineCode: "QBA",
    telephony: "BILQIS",
  },
  {
    airlineCode: "BZS",
    telephony: "BINIZA",
  },
  {
    airlineCode: "BIO",
    telephony: "BIOFLIGHT",
  },
  {
    airlineCode: "BIR",
    telephony: "BIRD AIR",
  },
  {
    airlineCode: "BOG",
    telephony: "BIRD DOG",
  },
  {
    airlineCode: "BDI",
    telephony: "BIRDIE",
  },
  {
    airlineCode: "ILM",
    telephony: "BIRDMAN",
  },
  {
    airlineCode: "EDR",
    telephony: "BIRDVIEW",
  },
  {
    airlineCode: "BSK",
    telephony: "BISCAYNE",
  },
  {
    airlineCode: "BML",
    telephony: "BISMILLAH",
  },
  {
    airlineCode: "BIN",
    telephony: "BISON-AIR",
  },
  {
    airlineCode: "BSA",
    telephony: "BISSAU INTERNATIONAL",
  },
  {
    airlineCode: "HJL",
    telephony: "BIZJET",
  },
  {
    airlineCode: "BIZ",
    telephony: "BIZMEX",
  },
  {
    airlineCode: "BKB",
    telephony: "BLACK BEAR",
  },
  {
    airlineCode: "SBU",
    telephony: "BLACK FIN",
  },
  {
    airlineCode: "BPH",
    telephony: "BLACK PHOENIX",
  },
  {
    airlineCode: "MNB",
    telephony: "BLACK SEA",
  },
  {
    airlineCode: "BLD",
    telephony: "BLACKADDER",
  },
  {
    airlineCode: "BBB",
    telephony: "BLACKBIRD",
  },
  {
    airlineCode: "RRS",
    telephony: "BLACKBOX",
  },
  {
    airlineCode: "KOM",
    telephony: "BLACKEAGLE",
  },
  {
    airlineCode: "BAK",
    telephony: "BLACKHAWK",
  },
  {
    airlineCode: "BJK",
    telephony: "BLACKJACK",
  },
  {
    airlineCode: "AFW",
    telephony: "BLACKSTAR",
  },
  {
    airlineCode: "BKT",
    telephony: "BLACKTAIL",
  },
  {
    airlineCode: "BKK",
    telephony: "BLINKAIR",
  },
  {
    airlineCode: "KEW",
    telephony: "BLIZZARD",
  },
  {
    airlineCode: "BLY",
    telephony: "BLUE AERO",
  },
  {
    airlineCode: "BLA",
    telephony: "BLUE AIR",
  },
  {
    airlineCode: "BKY",
    telephony: "BLUE AIRWAYS",
  },
  {
    airlineCode: "AFA",
    telephony: "BLUE ALFA",
  },
  {
    airlineCode: "BCJ",
    telephony: "BLUE BOY",
  },
  {
    airlineCode: "BBD",
    telephony: "BLUE CARGO",
  },
  {
    airlineCode: "FBC",
    telephony: "BLUE CRANE",
  },
  {
    airlineCode: "JFL",
    telephony: "BLUE DANUBE",
  },
  {
    airlineCode: "BDA",
    telephony: "BLUE DART",
  },
  {
    airlineCode: "EKC",
    telephony: "BLUE GOOSE",
  },
  {
    airlineCode: "RKT",
    telephony: "BLUE GREEN",
  },
  {
    airlineCode: "BLH",
    telephony: "BLUE HORIZON",
  },
  {
    airlineCode: "BCI",
    telephony: "BLUE ISLAND",
  },
  {
    airlineCode: "SRQ",
    telephony: "BLUE JAY",
  },
  {
    airlineCode: "BBJ",
    telephony: "BLUE KOREA",
  },
  {
    airlineCode: "RUK",
    telephony: "BLUE MAX",
  },
  {
    airlineCode: "MAY",
    telephony: "BLUE MED",
  },
  {
    airlineCode: "SDN",
    telephony: "BLUE NILE",
  },
  {
    airlineCode: "BCN",
    telephony: "BLUE OCEAN",
  },
  {
    airlineCode: "BPA",
    telephony: "BLUE PANORAMA",
  },
  {
    airlineCode: "MTU",
    telephony: "BLUE RAIDER",
  },
  {
    airlineCode: "EMI",
    telephony: "BLUE SHUTTLE",
  },
  {
    airlineCode: "DIA",
    telephony: "BLUE SKY",
  },
  {
    airlineCode: "BCA",
    telephony: "BLUE SKY MONGOLIA",
  },
  {
    airlineCode: "JIA",
    telephony: "BLUE STREAK",
  },
  {
    airlineCode: "FAH",
    telephony: "BLUE STRIP",
  },
  {
    airlineCode: "BWI",
    telephony: "BLUE TAIL",
  },
  {
    airlineCode: "BTM",
    telephony: "BLUE TEAM",
  },
  {
    airlineCode: "BLT",
    telephony: "BLUE TIE",
  },
  {
    airlineCode: "WFL",
    telephony: "BLUE WORLD",
  },
  {
    airlineCode: "DPS",
    telephony: "BLUE-GRAY",
  },
  {
    airlineCode: "BBX",
    telephony: "BLUEBEL",
  },
  {
    airlineCode: "PBN",
    telephony: "BLUEBIRD",
  },
  {
    airlineCode: "BLB",
    telephony: "BLUEBIRD SUDAN",
  },
  {
    airlineCode: "FGG",
    telephony: "BLUEFINCH",
  },
  {
    airlineCode: "BLU",
    telephony: "BLUEGRASS",
  },
  {
    airlineCode: "BLJ",
    telephony: "BLUEJET",
  },
  {
    airlineCode: "ALI",
    telephony: "BLUELIFT",
  },
  {
    airlineCode: "BLI",
    telephony: "BLUELINE",
  },
  {
    airlineCode: "RAW",
    telephony: "BLUERAY",
  },
  {
    airlineCode: "BLR",
    telephony: "BLUERIDGE",
  },
  {
    airlineCode: "BLX",
    telephony: "BLUESCAN",
  },
  {
    airlineCode: "BLW",
    telephony: "BLUESTAR",
  },
  {
    airlineCode: "JRH",
    telephony: "BLUETIP",
  },
  {
    airlineCode: "BLE",
    telephony: "BLUEWATER",
  },
  {
    airlineCode: "BWD",
    telephony: "BLUEWEST",
  },
  {
    airlineCode: "BHK",
    telephony: "BLUHALKIN",
  },
  {
    airlineCode: "BMW",
    telephony: "BMW-FLIGHT",
  },
  {
    airlineCode: "GCR",
    telephony: "BO HAI",
  },
  {
    airlineCode: "BOE",
    telephony: "BOEING",
  },
  {
    airlineCode: "BOH",
    telephony: "BOHEMIA",
  },
  {
    airlineCode: "BIA",
    telephony: "BOHLKE",
  },
  {
    airlineCode: "BOL",
    telephony: "BOL",
  },
  {
    airlineCode: "BOL",
    telephony: "BOL",
  },
  {
    airlineCode: "BOR",
    telephony: "BOLIDORSA",
  },
  {
    airlineCode: "BOV",
    telephony: "BOLIVIANA",
  },
  {
    airlineCode: "BBA",
    telephony: "BOMBARDIER",
  },
  {
    airlineCode: "BZA",
    telephony: "BONAN AIR",
  },
  {
    airlineCode: "BND",
    telephony: "BOND",
  },
  {
    airlineCode: "FBZ",
    telephony: "BONDI",
  },
  {
    airlineCode: "BAI",
    telephony: "BONITO AIR",
  },
  {
    airlineCode: "BPT",
    telephony: "BONUS",
  },
  {
    airlineCode: "IRJ",
    telephony: "BONYAD AIR",
  },
  {
    airlineCode: "BOO",
    telephony: "BOOKAJET",
  },
  {
    airlineCode: "BMG",
    telephony: "BOOMERANG",
  },
  {
    airlineCode: "BFT",
    telephony: "BORDER",
  },
  {
    airlineCode: "BDF",
    telephony: "BORDER FORCE",
  },
  {
    airlineCode: "AAI",
    telephony: "BOREALIS",
  },
  {
    airlineCode: "KBA",
    telephony: "BOREK AIR",
  },
  {
    airlineCode: "BOF",
    telephony: "BORNFLIGHT",
  },
  {
    airlineCode: "ZBA",
    telephony: "BOSKY",
  },
  {
    airlineCode: "FBS",
    telephony: "BOSNIA AIR",
  },
  {
    airlineCode: "OAR",
    telephony: "BOSS AIR",
  },
  {
    airlineCode: "BOT",
    telephony: "BOTSWANA",
  },
  {
    airlineCode: "BNY",
    telephony: "BOUNTY",
  },
  {
    airlineCode: "BTQ",
    telephony: "BOUTIQUE",
  },
  {
    airlineCode: "BKR",
    telephony: "BOX KAR",
  },
  {
    airlineCode: "BXR",
    telephony: "BOXER",
  },
  {
    airlineCode: "BRB",
    telephony: "BRA-TRANSPAEREOS",
  },
  {
    airlineCode: "BRX",
    telephony: "BRAATHENS",
  },
  {
    airlineCode: "BBN",
    telephony: "BRABAZON",
  },
  {
    airlineCode: "BRN",
    telephony: "BRANSON",
  },
  {
    airlineCode: "OWT",
    telephony: "BRASIL CARGO",
  },
  {
    airlineCode: "WTJ",
    telephony: "BRASILJETS",
  },
  {
    airlineCode: "BRL",
    telephony: "BRASS LINE",
  },
  {
    airlineCode: "SCO",
    telephony: "BRAVEHEART",
  },
  {
    airlineCode: "BRC",
    telephony: "BRAVI",
  },
  {
    airlineCode: "BRS",
    telephony: "BRAZILIAN AIR FORCE",
  },
  {
    airlineCode: "EXB",
    telephony: "BRAZILIAN ARMY",
  },
  {
    airlineCode: "MBR",
    telephony: "BRAZILIAN NAVY",
  },
  {
    airlineCode: "BZY",
    telephony: "BREEZY",
  },
  {
    airlineCode: "RPA",
    telephony: "BRICKYARD",
  },
  {
    airlineCode: "BGR",
    telephony: "BRIDGER",
  },
  {
    airlineCode: "BME",
    telephony: "BRIGGS",
  },
  {
    airlineCode: "BFG",
    telephony: "BRIGHT FLIGHT",
  },
  {
    airlineCode: "XTH",
    telephony: "BRIGHT PEARL",
  },
  {
    airlineCode: "BRH",
    telephony: "BRIGHTSTAR",
  },
  {
    airlineCode: "BKO",
    telephony: "BRIKO",
  },
  {
    airlineCode: "PAV",
    telephony: "BRILLIANT",
  },
  {
    airlineCode: "BIH",
    telephony: "BRINTEL",
  },
  {
    airlineCode: "BHL",
    telephony: "BRISTOW",
  },
  {
    airlineCode: "BTZ",
    telephony: "BRISTOW GROUP",
  },
  {
    airlineCode: "BHN",
    telephony: "BRISTOW HELICOPTERS",
  },
  {
    airlineCode: "BRT",
    telephony: "BRITISH",
  },
  {
    airlineCode: "BGI",
    telephony: "BRITISH GULF",
  },
  {
    airlineCode: "BMD",
    telephony: "BRITISH MEDICAL",
  },
  {
    airlineCode: "BXJ",
    telephony: "BRIXTEL JET",
  },
  {
    airlineCode: "BRO",
    telephony: "BROADSWORD",
  },
  {
    airlineCode: "BWY",
    telephony: "BROADWAY",
  },
  {
    airlineCode: "RBA",
    telephony: "BRUNEI",
  },
  {
    airlineCode: "BNF",
    telephony: "BRUNEL",
  },
  {
    airlineCode: "LFA",
    telephony: "BUCKY",
  },
  {
    airlineCode: "BHA",
    telephony: "BUDDHA AIR",
  },
  {
    airlineCode: "BFL",
    telephony: "BUFFALO",
  },
  {
    airlineCode: "BVA",
    telephony: "BUFFALO AIR",
  },
  {
    airlineCode: "BKV",
    telephony: "BUKOVYNA",
  },
  {
    airlineCode: "AFB",
    telephony: "BULAF",
  },
  {
    airlineCode: "BGF",
    telephony: "BULGARIAN",
  },
  {
    airlineCode: "BUC",
    telephony: "BULGARIAN CHARTER",
  },
  {
    airlineCode: "BEG",
    telephony: "BULGARIAN EAGLE",
  },
  {
    airlineCode: "EGT",
    telephony: "BULGARIAN JET",
  },
  {
    airlineCode: "BVL",
    telephony: "BULGARY",
  },
  {
    airlineCode: "BDG",
    telephony: "BULLDOG",
  },
  {
    airlineCode: "NUM",
    telephony: "BULLY",
  },
  {
    airlineCode: "BNA",
    telephony: "BUN AIR",
  },
  {
    airlineCode: "BRY",
    telephony: "BURAIR",
  },
  {
    airlineCode: "BRQ",
    telephony: "BURAQAIR",
  },
  {
    airlineCode: "VBW",
    telephony: "BURKINA",
  },
  {
    airlineCode: "BFR",
    telephony: "BURKLINES",
  },
  {
    airlineCode: "WAI",
    telephony: "BUSHWOOD",
  },
  {
    airlineCode: "LCB",
    telephony: "BUSRE",
  },
  {
    airlineCode: "PBW",
    telephony: "BUSSARD",
  },
  {
    airlineCode: "BUT",
    telephony: "BUTLERS",
  },
  {
    airlineCode: "BZZ",
    telephony: "BUZZARD",
  },
  {
    airlineCode: "BYG",
    telephony: "BYGONE",
  },
  {
    airlineCode: "SMY",
    telephony: "CABO CACTI",
  },
  {
    airlineCode: "LCV",
    telephony: "CABO CAT",
  },
  {
    airlineCode: "CBV",
    telephony: "CABOAEREO",
  },
  {
    airlineCode: "TCV",
    telephony: "CABOVERDE",
  },
  {
    airlineCode: "CAK",
    telephony: "CACTUS",
  },
  {
    airlineCode: "CDY",
    telephony: "CADDY",
  },
  {
    airlineCode: "ITA",
    telephony: "CAFEX",
  },
  {
    airlineCode: "RBW",
    telephony: "CAI HONG",
  },
  {
    airlineCode: "CXE",
    telephony: "CAICOS",
  },
  {
    airlineCode: "KAP",
    telephony: "CAIR",
  },
  {
    airlineCode: "ICL",
    telephony: "CAL (see also .idDYNASTY)",
  },
  {
    airlineCode: "CGC",
    telephony: "CAL-GULF",
  },
  {
    airlineCode: "CFV",
    telephony: "CALAFIA",
  },
  {
    airlineCode: "CSF",
    telephony: "CALEDONIAN",
  },
  {
    airlineCode: "CFR",
    telephony: "CALFIRE",
  },
  {
    airlineCode: "GAB",
    telephony: "CALI",
  },
  {
    airlineCode: "CJZ",
    telephony: "CALIBER JET",
  },
  {
    airlineCode: "CBA",
    telephony: "CALIBRA",
  },
  {
    airlineCode: "CFL",
    telephony: "CALIBRATION",
  },
  {
    airlineCode: "CLB",
    telephony: "CALIBRATOR",
  },
  {
    airlineCode: "CSL",
    telephony: "CALIFORNIA SHUTTLE",
  },
  {
    airlineCode: "CMV",
    telephony: "CALIMA",
  },
  {
    airlineCode: "CIA",
    telephony: "CALIMERA",
  },
  {
    airlineCode: "CAV",
    telephony: "CALM AIR",
  },
  {
    airlineCode: "CMD",
    telephony: "CALSTAR MED",
  },
  {
    airlineCode: "KCH",
    telephony: "CAM AIR",
  },
  {
    airlineCode: "CRC",
    telephony: "CAMAIRCO",
  },
  {
    airlineCode: "CMB",
    telephony: "CAMBER",
  },
  {
    airlineCode: "JCC",
    telephony: "CAMBO",
  },
  {
    airlineCode: "KHV",
    telephony: "CAMBODIA AIR",
  },
  {
    airlineCode: "CBM",
    telephony: "CAMBRIAN",
  },
  {
    airlineCode: "VAN",
    telephony: "CAMEL",
  },
  {
    airlineCode: "CMO",
    telephony: "CAMELOT",
  },
  {
    airlineCode: "CMR",
    telephony: "CAMEO",
  },
  {
    airlineCode: "TFS",
    telephony: "CAMPUS",
  },
  {
    airlineCode: "CWA",
    telephony: "CAN WEST",
  },
  {
    airlineCode: "SNA",
    telephony: "CANA",
  },
  {
    airlineCode: "CDR",
    telephony: "CANADAIR",
  },
  {
    airlineCode: "CDN",
    telephony: "CANADIAN",
  },
  {
    airlineCode: "CTG",
    telephony: "CANADIAN COAST GUARD",
  },
  {
    airlineCode: "EXA",
    telephony: "CANADIANEXECAIRE",
  },
  {
    airlineCode: "CIC",
    telephony: "CANAIMA",
  },
  {
    airlineCode: "TWC",
    telephony: "CANAIR",
  },
  {
    airlineCode: "CAU",
    telephony: "CANARIAS LINK",
  },
  {
    airlineCode: "CNF",
    telephony: "CANARY",
  },
  {
    airlineCode: "CNA",
    telephony: "CANAVIA",
  },
  {
    airlineCode: "BBG",
    telephony: "CANDIA BIRD",
  },
  {
    airlineCode: "LCN",
    telephony: "CANEDO",
  },
  {
    airlineCode: "CFC",
    telephony: "CANFORCE",
  },
  {
    airlineCode: "RCM",
    telephony: "CANNES AZUR",
  },
  {
    airlineCode: "CVU",
    telephony: "CANYON VIEW",
  },
  {
    airlineCode: "CAP",
    telephony: "CAP",
  },
  {
    airlineCode: "CAP",
    telephony: "CAP",
  },
  {
    airlineCode: "CCQ",
    telephony: "CAP CITY",
  },
  {
    airlineCode: "CPF",
    telephony: "CAP-FLIGHT",
  },
  {
    airlineCode: "CPX",
    telephony: "CAPAIR",
  },
  {
    airlineCode: "CGP",
    telephony: "CAPGROUP",
  },
  {
    airlineCode: "CPD",
    telephony: "CAPITAL DELTA",
  },
  {
    airlineCode: "CBJ",
    telephony: "CAPITAL JET",
  },
  {
    airlineCode: "BSH",
    telephony: "CAPITAL ROTOR",
  },
  {
    airlineCode: "NCP",
    telephony: "CAPITAL SHUTTLE",
  },
  {
    airlineCode: "ORO",
    telephony: "CAPRI",
  },
  {
    airlineCode: "CWZ",
    telephony: "CAPWINGS",
  },
  {
    airlineCode: "CAJ",
    telephony: "CAR LINE",
  },
  {
    airlineCode: "CBN",
    telephony: "CARBONDALE",
  },
  {
    airlineCode: "CAD",
    telephony: "CARDIG AIR",
  },
  {
    airlineCode: "BKM",
    telephony: "CARDINAL",
  },
  {
    airlineCode: "CXF",
    telephony: "CARDS FLIGHT",
  },
  {
    airlineCode: "CFH",
    telephony: "CARE FLIGHT",
  },
  {
    airlineCode: "SFR",
    telephony: "CARGO",
  },
  {
    airlineCode: "CKK",
    telephony: "CARGO KING",
  },
  {
    airlineCode: "EDA",
    telephony: "CARGO LIFT",
  },
  {
    airlineCode: "CVK",
    telephony: "CARGO LINE",
  },
  {
    airlineCode: "CLM",
    telephony: "CARGO LINK",
  },
  {
    airlineCode: "CSB",
    telephony: "CARGO SOUTH",
  },
  {
    airlineCode: "RUN",
    telephony: "CARGO TURK",
  },
  {
    airlineCode: "TTF",
    telephony: "CARGO UNIT",
  },
  {
    airlineCode: "CBB",
    telephony: "CARGO-BEE",
  },
  {
    airlineCode: "ABV",
    telephony: "CARGOBLUE",
  },
  {
    airlineCode: "CJT",
    telephony: "CARGOJET",
  },
  {
    airlineCode: "GOL",
    telephony: "CARGOLAAR",
  },
  {
    airlineCode: "CLX",
    telephony: "CARGOLUX",
  },
  {
    airlineCode: "ICV",
    telephony: "CARGOLUX ITALIA",
  },
  {
    airlineCode: "SEV",
    telephony: "CARGOPRESS",
  },
  {
    airlineCode: "AYV",
    telephony: "CARGWAY",
  },
  {
    airlineCode: "TLC",
    telephony: "CARIB-X",
  },
  {
    airlineCode: "BWA",
    telephony: "CARIBBEAN AIRLINES",
  },
  {
    airlineCode: "CRB",
    telephony: "CARIBBEAN COMMUTER",
  },
  {
    airlineCode: "CVZ",
    telephony: "CARIBE",
  },
  {
    airlineCode: "AOB",
    telephony: "CARIBE CORO",
  },
  {
    airlineCode: "CPR",
    telephony: "CARIBE-PERU",
  },
  {
    airlineCode: "CRT",
    telephony: "CARIBINTAIR",
  },
  {
    airlineCode: "IQQ",
    telephony: "CARIBJET",
  },
  {
    airlineCode: "DCC",
    telephony: "CARICARGO",
  },
  {
    airlineCode: "VCM",
    telephony: "CARMEN",
  },
  {
    airlineCode: "MCS",
    telephony: "CARMEX",
  },
  {
    airlineCode: "ACV",
    telephony: "CARNAIR",
  },
  {
    airlineCode: "CDL",
    telephony: "CAROLINA",
  },
  {
    airlineCode: "KRP",
    telephony: "CARPATAIR",
  },
  {
    airlineCode: "CRN",
    telephony: "CARSON",
  },
  {
    airlineCode: "TBO",
    telephony: "CARTILLION",
  },
  {
    airlineCode: "ICC",
    telephony: "CARTO",
  },
  {
    airlineCode: "CSO",
    telephony: "CASAIR",
  },
  {
    airlineCode: "CSK",
    telephony: "CASCADE",
  },
  {
    airlineCode: "CMT",
    telephony: "CASEMENT",
  },
  {
    airlineCode: "CSP",
    telephony: "CASPER AIR",
  },
  {
    airlineCode: "CFT",
    telephony: "CASPER FREIGHT",
  },
  {
    airlineCode: "CPN",
    telephony: "CASPIAN",
  },
  {
    airlineCode: "CSJ",
    telephony: "CASTLE",
  },
  {
    airlineCode: "CIS",
    telephony: "CAT ISLAND",
  },
  {
    airlineCode: "CBT",
    telephony: "CATALINA AIR",
  },
  {
    airlineCode: "KVA",
    telephony: "CATATUMBO",
  },
  {
    airlineCode: "CBD",
    telephony: "CATBIRD",
  },
  {
    airlineCode: "ESX",
    telephony: "CATFISH",
  },
  {
    airlineCode: "CPA",
    telephony: "CATHAY",
  },
  {
    airlineCode: "IBL",
    telephony: "CATOVAIR",
  },
  {
    airlineCode: "CTT",
    telephony: "CATT",
  },
  {
    airlineCode: "CWY",
    telephony: "CAUSEWAY",
  },
  {
    airlineCode: "CJR",
    telephony: "CAVERTON AIR",
  },
  {
    airlineCode: "CAY",
    telephony: "CAYMAN",
  },
  {
    airlineCode: "CEB",
    telephony: "CEBU AIR",
  },
  {
    airlineCode: "CPK",
    telephony: "CEDAR",
  },
  {
    airlineCode: "MEA",
    telephony: "CEDAR JET",
  },
  {
    airlineCode: "CDX",
    telephony: "CEDAREX",
  },
  {
    airlineCode: "LSC",
    telephony: "CEDROS",
  },
  {
    airlineCode: "CMZ",
    telephony: "CEE-EM STAIRS",
  },
  {
    airlineCode: "CFX",
    telephony: "CEEFA CHARTER",
  },
  {
    airlineCode: "CEG",
    telephony: "CEGA",
  },
  {
    airlineCode: "CEL",
    telephony: "CEIBA LINE",
  },
  {
    airlineCode: "CLJ",
    telephony: "CELLOJET",
  },
  {
    airlineCode: "KEM",
    telephony: "CEMAIR",
  },
  {
    airlineCode: "CNC",
    telephony: "CENCOR",
  },
  {
    airlineCode: "CTR",
    telephony: "CENTAURO",
  },
  {
    airlineCode: "CVO",
    telephony: "CENTERVOL",
  },
  {
    airlineCode: "CEV",
    telephony: "CENTEV",
  },
  {
    airlineCode: "CEE",
    telephony: "CENTRA AEREOS",
  },
  {
    airlineCode: "CET",
    telephony: "CENTRAFRICAIN",
  },
  {
    airlineCode: "CRW",
    telephony: "CENTRAL AMERICAN",
  },
  {
    airlineCode: "CTL",
    telephony: "CENTRAL COMMUTER",
  },
  {
    airlineCode: "CLW",
    telephony: "CENTRALWINGS",
  },
  {
    airlineCode: "CTY",
    telephony: "CENTURY",
  },
  {
    airlineCode: "CEY",
    telephony: "CENTURYFLIGHT",
  },
  {
    airlineCode: "CRY",
    telephony: "CERNEY",
  },
  {
    airlineCode: "JLH",
    telephony: "CESA",
  },
  {
    airlineCode: "CEZ",
    telephony: "CESSZANI",
  },
  {
    airlineCode: "IRU",
    telephony: "CHABAHAR",
  },
  {
    airlineCode: "CHR",
    telephony: "CHAIRMAN",
  },
  {
    airlineCode: "MBG",
    telephony: "CHALGROVE",
  },
  {
    airlineCode: "CHK",
    telephony: "CHALKS",
  },
  {
    airlineCode: "CLG",
    telephony: "CHALLAIR",
  },
  {
    airlineCode: "CHG",
    telephony: "CHALLENGE",
  },
  {
    airlineCode: "CWC",
    telephony: "CHALLENGE CARGO",
  },
  {
    airlineCode: "CCP",
    telephony: "CHAMPION AIR",
  },
  {
    airlineCode: "NCH",
    telephony: "CHANCHANGI",
  },
  {
    airlineCode: "CGN",
    telephony: "CHANG AN",
  },
  {
    airlineCode: "CHN",
    telephony: "CHANNEL",
  },
  {
    airlineCode: "EXS",
    telephony: "CHANNEX",
  },
  {
    airlineCode: "CHF",
    telephony: "CHAO FEI",
  },
  {
    airlineCode: "CPL",
    telephony: "CHAPARRAL",
  },
  {
    airlineCode: "TGU",
    telephony: "CHAPIN",
  },
  {
    airlineCode: "CTA",
    telephony: "CHAR-TRAN",
  },
  {
    airlineCode: "CGG",
    telephony: "CHARGE",
  },
  {
    airlineCode: "CHV",
    telephony: "CHARTAIR",
  },
  {
    airlineCode: "FRQ",
    telephony: "CHARTER AFRIQUE",
  },
  {
    airlineCode: "CHA",
    telephony: "CHARTER CENTRAL",
  },
  {
    airlineCode: "LTC",
    telephony: "CHARTER JETS",
  },
  {
    airlineCode: "HRT",
    telephony: "CHARTRIGHT",
  },
  {
    airlineCode: "CSQ",
    telephony: "CHASQUI",
  },
  {
    airlineCode: "CVA",
    telephony: "CHATHAM",
  },
  {
    airlineCode: "CHQ",
    telephony: "CHAUTAUQUA",
  },
  {
    airlineCode: "CHE",
    telephony: "CHECK AIR",
  },
  {
    airlineCode: "CJM",
    telephony: "CHECKMARK",
  },
  {
    airlineCode: "CKE",
    telephony: "CHECKMATE",
  },
  {
    airlineCode: "WHG",
    telephony: "CHEER",
  },
  {
    airlineCode: "CCY",
    telephony: "CHERRY",
  },
  {
    airlineCode: "CAB",
    telephony: "CHESAPEAKE AIR",
  },
  {
    airlineCode: "CVR",
    telephony: "CHEVRON",
  },
  {
    airlineCode: "CYA",
    telephony: "CHEYENNE AIR",
  },
  {
    airlineCode: "QAI",
    telephony: "CHICKPEA",
  },
  {
    airlineCode: "CCH",
    telephony: "CHILCHOTA",
  },
  {
    airlineCode: "ETN",
    telephony: "CHIMNIR",
  },
  {
    airlineCode: "CES",
    telephony: "CHINA EASTERN",
  },
  {
    airlineCode: "HXA",
    telephony: "CHINA EXPRESS",
  },
  {
    airlineCode: "CHC",
    telephony: "CHINA HELICOPTER",
  },
  {
    airlineCode: "CFI",
    telephony: "CHINA JET",
  },
  {
    airlineCode: "CYZ",
    telephony: "CHINA POST",
  },
  {
    airlineCode: "CSN",
    telephony: "CHINA SOUTHERN",
  },
  {
    airlineCode: "CGU",
    telephony: "CHINGUETTI",
  },
  {
    airlineCode: "CNK",
    telephony: "CHINOOK",
  },
  {
    airlineCode: "CEP",
    telephony: "CHIPOLA",
  },
  {
    airlineCode: "CHD",
    telephony: "CHKALOVSK-AVIA",
  },
  {
    airlineCode: "CDQ",
    telephony: "CHODANG FLIGHT",
  },
  {
    airlineCode: "CSX",
    telephony: "CHOICE AIR",
  },
  {
    airlineCode: "CQN",
    telephony: "CHONG QING",
  },
  {
    airlineCode: "ICP",
    telephony: "CHOPER",
  },
  {
    airlineCode: "CAS",
    telephony: "CHRISTMAN",
  },
  {
    airlineCode: "CHX",
    telephony: "CHRISTOPH",
  },
  {
    airlineCode: "CHO",
    telephony: "CHROME AIR",
  },
  {
    airlineCode: "CNS",
    telephony: "CHRONOS",
  },
  {
    airlineCode: "JMA",
    telephony: "CHUI",
  },
  {
    airlineCode: "CUK",
    telephony: "CHUKKA",
  },
  {
    airlineCode: "CFN",
    telephony: "CHURCH FENTON",
  },
  {
    airlineCode: "CHU",
    telephony: "CHURCHAIR",
  },
  {
    airlineCode: "VCI",
    telephony: "CI-TOURS",
  },
  {
    airlineCode: "CIL",
    telephony: "CIAF LEASING",
  },
  {
    airlineCode: "CRA",
    telephony: "CIMAS",
  },
  {
    airlineCode: "CIM",
    telephony: "CIMBER",
  },
  {
    airlineCode: "CMN",
    telephony: "CIMMARON AIRE",
  },
  {
    airlineCode: "CIN",
    telephony: "CINNAMON",
  },
  {
    airlineCode: "CIO",
    telephony: "CIOCCO",
  },
  {
    airlineCode: "TRS",
    telephony: "CITRUS",
  },
  {
    airlineCode: "KLC",
    telephony: "CITY",
  },
  {
    airlineCode: "GTA",
    telephony: "CITY AIRWAYS",
  },
  {
    airlineCode: "KTA",
    telephony: "CITY LINK",
  },
  {
    airlineCode: "CWR",
    telephony: "CITY WORLD",
  },
  {
    airlineCode: "BCY",
    telephony: "CITY-IRELAND",
  },
  {
    airlineCode: "CNB",
    telephony: "CITYHUN",
  },
  {
    airlineCode: "CYL",
    telephony: "CITYLINER",
  },
  {
    airlineCode: "CIV",
    telephony: "CIVAIR",
  },
  {
    airlineCode: "AMB",
    telephony: "CIVIL AIR AMBULANCE",
  },
  {
    airlineCode: "CLK",
    telephony: "CLARKAIR",
  },
  {
    airlineCode: "KLJ",
    telephony: "CLASS LINE",
  },
  {
    airlineCode: "HKB",
    telephony: "CLASSIC",
  },
  {
    airlineCode: "LLT",
    telephony: "CLASSIC JET",
  },
  {
    airlineCode: "CLY",
    telephony: "CLAY-LACY",
  },
  {
    airlineCode: "CWG",
    telephony: "CLEAR WING",
  },
  {
    airlineCode: "CLN",
    telephony: "CLEOPATRA",
  },
  {
    airlineCode: "CGF",
    telephony: "CLEVER",
  },
  {
    airlineCode: "CLI",
    telephony: "CLICKJET",
  },
  {
    airlineCode: "CLF",
    telephony: "CLIFTON",
  },
  {
    airlineCode: "CLR",
    telephony: "CLINTON AIRWAYS",
  },
  {
    airlineCode: "PAA",
    telephony: "CLIPPER",
  },
  {
    airlineCode: "CXS",
    telephony: "CLIPPER CONNECTION",
  },
  {
    airlineCode: "TWF",
    telephony: "CLOUD RUNNER",
  },
  {
    airlineCode: "CLZ",
    telephony: "CLOUDLINE",
  },
  {
    airlineCode: "CVF",
    telephony: "CLOVERLEAF",
  },
  {
    airlineCode: "CLD",
    telephony: "CLOWES",
  },
  {
    airlineCode: "CBH",
    telephony: "CLUB HOUSE",
  },
  {
    airlineCode: "CLP",
    telephony: "CLUB PORTUGAL",
  },
  {
    airlineCode: "CGV",
    telephony: "CLUBE ALGARVE",
  },
  {
    airlineCode: "CXT",
    telephony: "COASTAL",
  },
  {
    airlineCode: "MCA",
    telephony: "COASTAL CLIPPER",
  },
  {
    airlineCode: "CSV",
    telephony: "COASTAL TRAVEL",
  },
  {
    airlineCode: "CGX",
    telephony: "COASTGUARD AUXAIR",
  },
  {
    airlineCode: "COI",
    telephony: "COAVIATION",
  },
  {
    airlineCode: "RPM",
    telephony: "COBALT",
  },
  {
    airlineCode: "BBZ",
    telephony: "COBRA",
  },
  {
    airlineCode: "COB",
    telephony: "COBRA JET",
  },
  {
    airlineCode: "CBX",
    telephony: "COBREX",
  },
  {
    airlineCode: "PDI",
    telephony: "COKI",
  },
  {
    airlineCode: "OLR",
    telephony: "COLAEREOS",
  },
  {
    airlineCode: "CLE",
    telephony: "COLEMILL",
  },
  {
    airlineCode: "CJC",
    telephony: "COLGAN",
  },
  {
    airlineCode: "ATQ",
    telephony: "COLIBRI",
  },
  {
    airlineCode: "CGE",
    telephony: "COLLEGE",
  },
  {
    airlineCode: "CBL",
    telephony: "COLOMBE LINE",
  },
  {
    airlineCode: "FAC",
    telephony: "COLOMBIAN AIR FORCE",
  },
  {
    airlineCode: "COL",
    telephony: "COLONY",
  },
  {
    airlineCode: "CYN",
    telephony: "COLOR JET",
  },
  {
    airlineCode: "PRU",
    telephony: "COLORBIRD",
  },
  {
    airlineCode: "CGZ",
    telephony: "COLORFUL",
  },
  {
    airlineCode: "XCA",
    telephony: "COLT",
  },
  {
    airlineCode: "WCO",
    telephony: "COLUMBIA HELI",
  },
  {
    airlineCode: "RJC",
    telephony: "COLUMBIA JET",
  },
  {
    airlineCode: "CCS",
    telephony: "COMAC EXPRESS",
  },
  {
    airlineCode: "COM",
    telephony: "COMAIR",
  },
  {
    airlineCode: "CVV",
    telephony: "COMERAVIA",
  },
  {
    airlineCode: "CRS",
    telephony: "COMERCIAL AEREA",
  },
  {
    airlineCode: "CVJ",
    telephony: "COMEREJECUTIVA",
  },
  {
    airlineCode: "CDE",
    telephony: "COMEX",
  },
  {
    airlineCode: "FRS",
    telephony: "COMFORT SERVICIOS",
  },
  {
    airlineCode: "CGB",
    telephony: "COMGLOB",
  },
  {
    airlineCode: "SMC",
    telephony: "COMLUX",
  },
  {
    airlineCode: "WPC",
    telephony: "COMMAND AIR",
  },
  {
    airlineCode: "CRM",
    telephony: "COMMANDERMEX",
  },
  {
    airlineCode: "CME",
    telephony: "COMMERCE BANK",
  },
  {
    airlineCode: "CAW",
    telephony: "COMMERCIAL",
  },
  {
    airlineCode: "CMH",
    telephony: "COMMODORE",
  },
  {
    airlineCode: "AUN",
    telephony: "COMMON SKY",
  },
  {
    airlineCode: "CJS",
    telephony: "COMMONWEALTH",
  },
  {
    airlineCode: "UCA",
    telephony: "COMMUTAIR",
  },
  {
    airlineCode: "JAC",
    telephony: "COMMUTER",
  },
  {
    airlineCode: "KMZ",
    telephony: "COMORES AVIATION",
  },
  {
    airlineCode: "CMF",
    telephony: "COMPASSION",
  },
  {
    airlineCode: "CGR",
    telephony: "COMPRIP",
  },
  {
    airlineCode: "CNR",
    telephony: "CONAERO",
  },
  {
    airlineCode: "JCO",
    telephony: "CONCIERGE",
  },
  {
    airlineCode: "CFG",
    telephony: "CONDOR",
  },
  {
    airlineCode: "LCT",
    telephony: "CONEXION LINK",
  },
  {
    airlineCode: "HCO",
    telephony: "CONGO LIFT",
  },
  {
    airlineCode: "JSC",
    telephony: "CONGO RIVER",
  },
  {
    airlineCode: "RSR",
    telephony: "CONGOSERV",
  },
  {
    airlineCode: "CGA",
    telephony: "CONGRESSIONAL",
  },
  {
    airlineCode: "CCT",
    telephony: "CONNECT",
  },
  {
    airlineCode: "CNT",
    telephony: "CONNECT CARGO",
  },
  {
    airlineCode: "CIX",
    telephony: "CONNEXION",
  },
  {
    airlineCode: "CKS",
    telephony: "CONNIE",
  },
  {
    airlineCode: "CON",
    telephony: "CONOCO",
  },
  {
    airlineCode: "CAC",
    telephony: "CONQUEST AIR",
  },
  {
    airlineCode: "CAX",
    telephony: "CONSORCIO",
  },
  {
    airlineCode: "VCH",
    telephony: "CONSORCIO HELITEC",
  },
  {
    airlineCode: "UZA",
    telephony: "CONSTANTA",
  },
  {
    airlineCode: "ICT",
    telephony: "CONTAVIA",
  },
  {
    airlineCode: "ABR",
    telephony: "CONTRACT",
  },
  {
    airlineCode: "ZRZ",
    telephony: "CONTROLE",
  },
  {
    airlineCode: "LLE",
    telephony: "CONVALLES",
  },
  {
    airlineCode: "CVS",
    telephony: "CONVERS",
  },
  {
    airlineCode: "VCV",
    telephony: "CONVIASA",
  },
  {
    airlineCode: "CNV",
    telephony: "CONVOY",
  },
  {
    airlineCode: "CKA",
    telephony: "COOK-AIR",
  },
  {
    airlineCode: "EIS",
    telephony: "COOL",
  },
  {
    airlineCode: "CBZ",
    telephony: "COOL BREEZE",
  },
  {
    airlineCode: "APG",
    telephony: "COOL RED",
  },
  {
    airlineCode: "LJM",
    telephony: "COOL RUNNINGS",
  },
  {
    airlineCode: "FCA",
    telephony: "COOPAIR",
  },
  {
    airlineCode: "CMP",
    telephony: "COPA",
  },
  {
    airlineCode: "COP",
    telephony: "COPPER STATE",
  },
  {
    airlineCode: "CPP",
    telephony: "COPTERPLUS",
  },
  {
    airlineCode: "CCW",
    telephony: "COPTRADE AIR",
  },
  {
    airlineCode: "ARD",
    telephony: "CORDILLERAS",
  },
  {
    airlineCode: "CAI",
    telephony: "CORENDON",
  },
  {
    airlineCode: "HHH",
    telephony: "CORINIUM",
  },
  {
    airlineCode: "CTE",
    telephony: "CORNERSTONE",
  },
  {
    airlineCode: "JYP",
    telephony: "CORP-FLIGHT",
  },
  {
    airlineCode: "CEA",
    telephony: "CORP-X",
  },
  {
    airlineCode: "CPG",
    telephony: "CORPORANG",
  },
  {
    airlineCode: "SPL",
    telephony: "CORPORATIVOS LAGUNA",
  },
  {
    airlineCode: "CRL",
    telephony: "CORSAIR",
  },
  {
    airlineCode: "CCM",
    telephony: "CORSICA",
  },
  {
    airlineCode: "RBU",
    telephony: "CORVETTE",
  },
  {
    airlineCode: "CER",
    telephony: "COSMER",
  },
  {
    airlineCode: "COZ",
    telephony: "COSMIC AIR",
  },
  {
    airlineCode: "OBT",
    telephony: "COSMIC GIRL",
  },
  {
    airlineCode: "SCG",
    telephony: "COSTA CALIDA",
  },
  {
    airlineCode: "NOT",
    telephony: "COSTA NORTE",
  },
  {
    airlineCode: "VOC",
    telephony: "COSTA RICAN",
  },
  {
    airlineCode: "SLI",
    telephony: "COSTERA",
  },
  {
    airlineCode: "CTK",
    telephony: "COSTOCK",
  },
  {
    airlineCode: "CTM",
    telephony: "COTAM",
  },
  {
    airlineCode: "VRE",
    telephony: "COTE D IVOIRE",
  },
  {
    airlineCode: "ADL",
    telephony: "COTSWOLD",
  },
  {
    airlineCode: "CHI",
    telephony: "COUGAR",
  },
  {
    airlineCode: "CUL",
    telephony: "COULSON",
  },
  {
    airlineCode: "WVU",
    telephony: "COUNTRY ROADS",
  },
  {
    airlineCode: "CUT",
    telephony: "COURT AIR",
  },
  {
    airlineCode: "COO",
    telephony: "COVE",
  },
  {
    airlineCode: "TXX",
    telephony: "COWBOY",
  },
  {
    airlineCode: "COW",
    telephony: "COWI",
  },
  {
    airlineCode: "COX",
    telephony: "COX AVIACION",
  },
  {
    airlineCode: "COY",
    telephony: "COYNE AIR",
  },
  {
    airlineCode: "CYO",
    telephony: "COYOTE",
  },
  {
    airlineCode: "XRO",
    telephony: "CRAMER",
  },
  {
    airlineCode: "UGX",
    telephony: "CRANE",
  },
  {
    airlineCode: "CWL",
    telephony: "CRANWELL",
  },
  {
    airlineCode: "CRE",
    telephony: "CREAM CITY",
  },
  {
    airlineCode: "CRQ",
    telephony: "CREE",
  },
  {
    airlineCode: "HCV",
    telephony: "CREOLE",
  },
  {
    airlineCode: "FNX",
    telephony: "CRESCENT",
  },
  {
    airlineCode: "UGD",
    telephony: "CRESTED",
  },
  {
    airlineCode: "CWS",
    telephony: "CRETAN",
  },
  {
    airlineCode: "OUA",
    telephony: "CRIMSON",
  },
  {
    airlineCode: "CTN",
    telephony: "CROATIA",
  },
  {
    airlineCode: "HRZ",
    telephony: "CROATIAN AIRFORCE",
  },
  {
    airlineCode: "CRF",
    telephony: "CROIX ROUGE",
  },
  {
    airlineCode: "CRX",
    telephony: "CROSSAIR",
  },
  {
    airlineCode: "CWX",
    telephony: "CROW EXPRESS",
  },
  {
    airlineCode: "CKR",
    telephony: "CROWN AIR",
  },
  {
    airlineCode: "CRO",
    telephony: "CROWN AIRWAYS",
  },
  {
    airlineCode: "BDJ",
    telephony: "CROWN JET",
  },
  {
    airlineCode: "WNE",
    telephony: "CRUSH",
  },
  {
    airlineCode: "CYT",
    telephony: "CRYSTAL AIR",
  },
  {
    airlineCode: "CSA",
    telephony: "CSA-LINES",
  },
  {
    airlineCode: "CSM",
    telephony: "CSM SERVICIOS",
  },
  {
    airlineCode: "CUO",
    telephony: "CUAHONTE",
  },
  {
    airlineCode: "LWL",
    telephony: "CUB DRIVER",
  },
  {
    airlineCode: "CUB",
    telephony: "CUBANA",
  },
  {
    airlineCode: "MND",
    telephony: "CUGAT",
  },
  {
    airlineCode: "CUS",
    telephony: "CUSTOM",
  },
  {
    airlineCode: "CJE",
    telephony: "CUSTOM JET",
  },
  {
    airlineCode: "CTF",
    telephony: "CUTTER FLIGHT",
  },
  {
    airlineCode: "AYR",
    telephony: "CYGNET",
  },
  {
    airlineCode: "RGN",
    telephony: "CYGNUS AIR",
  },
  {
    airlineCode: "CYP",
    telephony: "CYPRUS",
  },
  {
    airlineCode: "CEF",
    telephony: "CZECH AIR FORCE",
  },
  {
    airlineCode: "CIE",
    telephony: "CZECHIA",
  },
  {
    airlineCode: "DIG",
    telephony: "DAC AIR",
  },
  {
    airlineCode: "QAJ",
    telephony: "DAGOBERT",
  },
  {
    airlineCode: "DHL",
    telephony: "DAHL",
  },
  {
    airlineCode: "DLY",
    telephony: "DAILY",
  },
  {
    airlineCode: "DSR",
    telephony: "DAIRAIR",
  },
  {
    airlineCode: "DKT",
    telephony: "DAKOTA",
  },
  {
    airlineCode: "DLR",
    telephony: "DALA AIR",
  },
  {
    airlineCode: "DMQ",
    telephony: "DALO",
  },
  {
    airlineCode: "FDK",
    telephony: "DAMAVIA",
  },
  {
    airlineCode: "DMJ",
    telephony: "DAMOJH",
  },
  {
    airlineCode: "DAV",
    telephony: "DANA AIR",
  },
  {
    airlineCode: "DAN",
    telephony: "DANACO",
  },
  {
    airlineCode: "DSA",
    telephony: "DANBURY AIRWAYS",
  },
  {
    airlineCode: "SUV",
    telephony: "DANCEAIR",
  },
  {
    airlineCode: "DDY",
    telephony: "DANDY",
  },
  {
    airlineCode: "DTR",
    telephony: "DANISH",
  },
  {
    airlineCode: "DAF",
    telephony: "DANISH AIRFORCE",
  },
  {
    airlineCode: "DAR",
    telephony: "DANISH ARMY",
  },
  {
    airlineCode: "DNY",
    telephony: "DANISH NAVY",
  },
  {
    airlineCode: "DNU",
    telephony: "DANU",
  },
  {
    airlineCode: "DAP",
    telephony: "DAP",
  },
  {
    airlineCode: "DAP",
    telephony: "DAP",
  },
  {
    airlineCode: "DFC",
    telephony: "DARK BLUE",
  },
  {
    airlineCode: "DHR",
    telephony: "DARK HORSE",
  },
  {
    airlineCode: "ECA",
    telephony: "DARK KNIGHT",
  },
  {
    airlineCode: "DWG",
    telephony: "DARK WING",
  },
  {
    airlineCode: "KDR",
    telephony: "DARLINES",
  },
  {
    airlineCode: "DRM",
    telephony: "DARTMOOR",
  },
  {
    airlineCode: "DSQ",
    telephony: "DASAB AIR",
  },
  {
    airlineCode: "DGX",
    telephony: "DASNA",
  },
  {
    airlineCode: "DSO",
    telephony: "DASSAULT",
  },
  {
    airlineCode: "DTN",
    telephony: "DATA AIR",
  },
  {
    airlineCode: "HKR",
    telephony: "DATA BIRD",
  },
  {
    airlineCode: "DAT",
    telephony: "DAUNTLESS",
  },
  {
    airlineCode: "DAY",
    telephony: "DAYA",
  },
  {
    airlineCode: "WEA",
    telephony: "DAYSTAR",
  },
  {
    airlineCode: "BNB",
    telephony: "DAZZLE",
  },
  {
    airlineCode: "DEC",
    telephony: "DECCAN CARGO",
  },
  {
    airlineCode: "DAA",
    telephony: "DECUR",
  },
  {
    airlineCode: "DER",
    telephony: "DEER JET",
  },
  {
    airlineCode: "DHC",
    telephony: "DEHAVILLAND",
  },
  {
    airlineCode: "DEK",
    telephony: "DEK AERO",
  },
  {
    airlineCode: "DLK",
    telephony: "DEKKANLANKA",
  },
  {
    airlineCode: "DWR",
    telephony: "DELAWARE",
  },
  {
    airlineCode: "DCA",
    telephony: "DELCARIBE",
  },
  {
    airlineCode: "DLG",
    telephony: "DELGOLFO",
  },
  {
    airlineCode: "CSD",
    telephony: "DELIVERY",
  },
  {
    airlineCode: "DAL",
    telephony: "DELTA",
  },
  {
    airlineCode: "DSU",
    telephony: "DELTA STATE",
  },
  {
    airlineCode: "MLI",
    telephony: "DEMAIS",
  },
  {
    airlineCode: "DAI",
    telephony: "DENA",
  },
  {
    airlineCode: "DRY",
    telephony: "DERAYA",
  },
  {
    airlineCode: "DRZ",
    telephony: "DERAZONA",
  },
  {
    airlineCode: "DJR",
    telephony: "DESERT FLIGHT",
  },
  {
    airlineCode: "DCF",
    telephony: "DESERT STAR",
  },
  {
    airlineCode: "DEM",
    telephony: "DESTILA MIELES",
  },
  {
    airlineCode: "DES",
    telephony: "DESTINIA",
  },
  {
    airlineCode: "ATW",
    telephony: "DEVIL",
  },
  {
    airlineCode: "DAD",
    telephony: "DEWAN EXPRESS",
  },
  {
    airlineCode: "DXT",
    telephony: "DEXTER",
  },
  {
    airlineCode: "DGO",
    telephony: "DGO JET",
  },
  {
    airlineCode: "DMS",
    telephony: "DIAMOND",
  },
  {
    airlineCode: "DMN",
    telephony: "DIAMOND ACADEMY",
  },
  {
    airlineCode: "DBC",
    telephony: "DIAMOND BACK",
  },
  {
    airlineCode: "DMD",
    telephony: "DIAMONDJET",
  },
  {
    airlineCode: "EVR",
    telephony: "DIANA",
  },
  {
    airlineCode: "DRB",
    telephony: "DIDIER",
  },
  {
    airlineCode: "DGT",
    telephony: "DIGITAL",
  },
  {
    airlineCode: "DHX",
    telephony: "DILMUN",
  },
  {
    airlineCode: "DKR",
    telephony: "DIMA",
  },
  {
    airlineCode: "DMC",
    telephony: "DINAMICAMONT",
  },
  {
    airlineCode: "HDI",
    telephony: "DINAMICOS",
  },
  {
    airlineCode: "DND",
    telephony: "DINDER",
  },
  {
    airlineCode: "DLJ",
    telephony: "DING AIR",
  },
  {
    airlineCode: "HAJ",
    telephony: "DINGCHANG",
  },
  {
    airlineCode: "DCN",
    telephony: "DIPLOMATIC CLEARANCE",
  },
  {
    airlineCode: "DIR",
    telephony: "DIREKT WINGS",
  },
  {
    airlineCode: "MCC",
    telephony: "DISCOVERY",
  },
  {
    airlineCode: "DCV",
    telephony: "DISCOVERYJET",
  },
  {
    airlineCode: "PDQ",
    telephony: "DISPATCH",
  },
  {
    airlineCode: "DVR",
    telephony: "DIVI AIR",
  },
  {
    airlineCode: "IGN",
    telephony: "DIVINE AIR",
  },
  {
    airlineCode: "DOK",
    telephony: "DOCTOR",
  },
  {
    airlineCode: "DOL",
    telephony: "DOLLAR SIGN",
  },
  {
    airlineCode: "DLA",
    telephony: "DOLOMITI",
  },
  {
    airlineCode: "CCB",
    telephony: "DOLPHIN",
  },
  {
    airlineCode: "DOM",
    telephony: "DOME AIR",
  },
  {
    airlineCode: "DWI",
    telephony: "DOMINICAN",
  },
  {
    airlineCode: "DAC",
    telephony: "DOMINION AIR",
  },
  {
    airlineCode: "DCL",
    telephony: "DON CARLOS",
  },
  {
    airlineCode: "DON",
    telephony: "DONAIR",
  },
  {
    airlineCode: "EPB",
    telephony: "DONG JET",
  },
  {
    airlineCode: "EPA",
    telephony: "DONGHAI AIR",
  },
  {
    airlineCode: "ESY",
    telephony: "DONOSTI",
  },
  {
    airlineCode: "WAL",
    telephony: "DORAL",
  },
  {
    airlineCode: "DOR",
    telephony: "DORNIER",
  },
  {
    airlineCode: "DOS",
    telephony: "DOSAIR",
  },
  {
    airlineCode: "DCM",
    telephony: "DOT COM",
  },
  {
    airlineCode: "RYL",
    telephony: "DOUBLE GOLD",
  },
  {
    airlineCode: "DBA",
    telephony: "DOUBLE-A",
  },
  {
    airlineCode: "DOV",
    telephony: "DOVAIR",
  },
  {
    airlineCode: "DOW",
    telephony: "DOWNTOWN",
  },
  {
    airlineCode: "DZR",
    telephony: "DOZER",
  },
  {
    airlineCode: "SFD",
    telephony: "DRACO",
  },
  {
    airlineCode: "HDA",
    telephony: "DRAGON",
  },
  {
    airlineCode: "KII",
    telephony: "DRAGSTER",
  },
  {
    airlineCode: "BVI",
    telephony: "DRAKE",
  },
  {
    airlineCode: "VIS",
    telephony: "DREAM BIRD",
  },
  {
    airlineCode: "ADM",
    telephony: "DREAM COLLEGE",
  },
  {
    airlineCode: "GAC",
    telephony: "DREAM TEAM",
  },
  {
    airlineCode: "OEW",
    telephony: "DREAMER",
  },
  {
    airlineCode: "DJT",
    telephony: "DREAMJET",
  },
  {
    airlineCode: "DLX",
    telephony: "DREAMLINE",
  },
  {
    airlineCode: "DRS",
    telephony: "DREAMSHORE",
  },
  {
    airlineCode: "DRL",
    telephony: "DRILLER",
  },
  {
    airlineCode: "SIX",
    telephony: "DRIVE ORANGE",
  },
  {
    airlineCode: "DTA",
    telephony: "DTA",
  },
  {
    airlineCode: "DTA",
    telephony: "DTA",
  },
  {
    airlineCode: "DUB",
    telephony: "DUBAI",
  },
  {
    airlineCode: "DCD",
    telephony: "DUCARD",
  },
  {
    airlineCode: "DBJ",
    telephony: "DUCHESS",
  },
  {
    airlineCode: "DCY",
    telephony: "DUCOY",
  },
  {
    airlineCode: "DKE",
    telephony: "DUKE",
  },
  {
    airlineCode: "HSA",
    telephony: "DUMA",
  },
  {
    airlineCode: "DUN",
    telephony: "DUNAIR",
  },
  {
    airlineCode: "DUA",
    telephony: "DUSHANBE AIR",
  },
  {
    airlineCode: "DDA",
    telephony: "DUSTY",
  },
  {
    airlineCode: "CND",
    telephony: "DUTCH CORENDON",
  },
  {
    airlineCode: "OAO",
    telephony: "DVINA",
  },
  {
    airlineCode: "DFS",
    telephony: "DWYAIR",
  },
  {
    airlineCode: "DYM",
    telephony: "DYNAMIC SKY",
  },
  {
    airlineCode: "CAL",
    telephony: "DYNASTY",
  },
  {
    airlineCode: "NMR",
    telephony: "E-MED",
  },
  {
    airlineCode: "EWZ",
    telephony: "E-WING",
  },
  {
    airlineCode: "HCF",
    telephony: "EAGLE",
  },
  {
    airlineCode: "FML",
    telephony: "EAGLE BIRD",
  },
  {
    airlineCode: "EGC",
    telephony: "EAGLE CREEK",
  },
  {
    airlineCode: "UCB",
    telephony: "EAGLE EYE",
  },
  {
    airlineCode: "EES",
    telephony: "EAGLE STAR",
  },
  {
    airlineCode: "EMD",
    telephony: "EAGLEMED",
  },
  {
    airlineCode: "EZX",
    telephony: "EAGLEXPRESS AIR",
  },
  {
    airlineCode: "EAK",
    telephony: "EAKAZ",
  },
  {
    airlineCode: "ERX",
    telephony: "EARTH AIR",
  },
  {
    airlineCode: "EHN",
    telephony: "EAST HORIZON",
  },
  {
    airlineCode: "SEK",
    telephony: "EAST RIDER",
  },
  {
    airlineCode: "DXH",
    telephony: "EAST STAR",
  },
  {
    airlineCode: "ETJ",
    telephony: "EAST TAJIK",
  },
  {
    airlineCode: "EWS",
    telephony: "EAST WEST",
  },
  {
    airlineCode: "MFC",
    telephony: "EAST WIND",
  },
  {
    airlineCode: "ESR",
    telephony: "EASTARJET",
  },
  {
    airlineCode: "ECJ",
    telephony: "EASTCOAST JET",
  },
  {
    airlineCode: "EAL",
    telephony: "EASTERN",
  },
  {
    airlineCode: "ECI",
    telephony: "EASTERN CAROLINA",
  },
  {
    airlineCode: "EZE",
    telephony: "EASTFLIGHT",
  },
  {
    airlineCode: "ESD",
    telephony: "EASTINDO",
  },
  {
    airlineCode: "ECT",
    telephony: "EASTWAY",
  },
  {
    airlineCode: "EZY",
    telephony: "EASY",
  },
  {
    airlineCode: "LOL",
    telephony: "EASY CHARTER",
  },
  {
    airlineCode: "EFX",
    telephony: "EASY EXPRESS",
  },
  {
    airlineCode: "IKM",
    telephony: "EASY SHUTTLE",
  },
  {
    airlineCode: "EZR",
    telephony: "EASYWAY",
  },
  {
    airlineCode: "VNA",
    telephony: "EBBA",
  },
  {
    airlineCode: "EXC",
    telephony: "ECAIR",
  },
  {
    airlineCode: "ECC",
    telephony: "ECLAIR",
  },
  {
    airlineCode: "EJT",
    telephony: "ECLIPSE JET",
  },
  {
    airlineCode: "ECO",
    telephony: "ECOJET",
  },
  {
    airlineCode: "ECD",
    telephony: "ECOTOUR",
  },
  {
    airlineCode: "ECW",
    telephony: "ECOTRAVEL",
  },
  {
    airlineCode: "FAE",
    telephony: "ECUADORIAN AIRFORCE",
  },
  {
    airlineCode: "GGE",
    telephony: "ECUATO GUINEA",
  },
  {
    airlineCode: "EDO",
    telephony: "EDACOM",
  },
  {
    airlineCode: "EDW",
    telephony: "EDELWEISS",
  },
  {
    airlineCode: "LDG",
    telephony: "EDGE",
  },
  {
    airlineCode: "EJS",
    telephony: "EEJAY SERVICE",
  },
  {
    airlineCode: "EFS",
    telephony: "EFAOS",
  },
  {
    airlineCode: "EFE",
    telephony: "EFREIGHT SUDAN",
  },
  {
    airlineCode: "EGM",
    telephony: "EGAMS",
  },
  {
    airlineCode: "EGW",
    telephony: "EGOL",
  },
  {
    airlineCode: "FMF",
    telephony: "EGYPT ACADEMY",
  },
  {
    airlineCode: "MSR",
    telephony: "EGYPTAIR",
  },
  {
    airlineCode: "MSX",
    telephony: "EGYPTAIR CARGO",
  },
  {
    airlineCode: "MSE",
    telephony: "EGYPTAIR EXPRESS",
  },
  {
    airlineCode: "AGY",
    telephony: "EGYPTIAN BIRD",
  },
  {
    airlineCode: "ELU",
    telephony: "EGYPTIAN LEISURE",
  },
  {
    airlineCode: "IFL",
    telephony: "EIFEL",
  },
  {
    airlineCode: "GSW",
    telephony: "EIGER",
  },
  {
    airlineCode: "EEM",
    telephony: "EJEAERMEX",
  },
  {
    airlineCode: "EJP",
    telephony: "EJECORPORATIVOS",
  },
  {
    airlineCode: "EJV",
    telephony: "EJECUTIVA",
  },
  {
    airlineCode: "EAR",
    telephony: "EJECUTIVO-AEREO",
  },
  {
    airlineCode: "CMX",
    telephony: "EL CAMINANTE",
  },
  {
    airlineCode: "ELY",
    telephony: "ELAL",
  },
  {
    airlineCode: "ELX",
    telephony: "ELAN",
  },
  {
    airlineCode: "ELG",
    telephony: "ELANGENI",
  },
  {
    airlineCode: "EAF",
    telephony: "ELECTRA",
  },
  {
    airlineCode: "OUF",
    telephony: "ELEMENT",
  },
  {
    airlineCode: "LVT",
    telephony: "ELEVATE",
  },
  {
    airlineCode: "EFG",
    telephony: "ELIFRIULIA",
  },
  {
    airlineCode: "EOS",
    telephony: "ELIOSSOLA",
  },
  {
    airlineCode: "EPU",
    telephony: "ELITACAPULCO",
  },
  {
    airlineCode: "EAV",
    telephony: "ELITAVIA",
  },
  {
    airlineCode: "EAU",
    telephony: "ELITE",
  },
  {
    airlineCode: "SHZ",
    telephony: "ELITE SHARES",
  },
  {
    airlineCode: "FGS",
    telephony: "ELITELLINA",
  },
  {
    airlineCode: "LJY",
    telephony: "ELJAY",
  },
  {
    airlineCode: "LGI",
    telephony: "ELL-GEE AIR",
  },
  {
    airlineCode: "ELF",
    telephony: "ELLASJET",
  },
  {
    airlineCode: "ELB",
    telephony: "ELLINAIR HELLAS",
  },
  {
    airlineCode: "ELT",
    telephony: "ELLIOTT",
  },
  {
    airlineCode: "MGG",
    telephony: "ELMAGAL",
  },
  {
    airlineCode: "LNA",
    telephony: "ELNAIR",
  },
  {
    airlineCode: "ETS",
    telephony: "ELTSOVKA",
  },
  {
    airlineCode: "ELV",
    telephony: "ELVETIA",
  },
  {
    airlineCode: "MJF",
    telephony: "EM-EXPRESS",
  },
  {
    airlineCode: "EME",
    telephony: "EMAIR",
  },
  {
    airlineCode: "EML",
    telephony: "EMALUSA",
  },
  {
    airlineCode: "EAM",
    telephony: "EMBASSY AIR",
  },
  {
    airlineCode: "EMB",
    telephony: "EMBRAER",
  },
  {
    airlineCode: "EFF",
    telephony: "EMERALD",
  },
  {
    airlineCode: "EFB",
    telephony: "EMERALD JETS",
  },
  {
    airlineCode: "EMT",
    telephony: "EMETEBE",
  },
  {
    airlineCode: "UAE",
    telephony: "EMIRATES",
  },
  {
    airlineCode: "MJE",
    telephony: "EMJET",
  },
  {
    airlineCode: "EMZ",
    telephony: "EMOZ",
  },
  {
    airlineCode: "MEF",
    telephony: "EMPENNAGE",
  },
  {
    airlineCode: "EPR",
    telephony: "EMPEROR",
  },
  {
    airlineCode: "EMP",
    telephony: "EMPIRE",
  },
  {
    airlineCode: "CFS",
    telephony: "EMPIRE AIR",
  },
  {
    airlineCode: "EPL",
    telephony: "EMPRESARIALES",
  },
  {
    airlineCode: "MPE",
    telephony: "EMPRESS",
  },
  {
    airlineCode: "ENA",
    telephony: "ENA",
  },
  {
    airlineCode: "ENA",
    telephony: "ENA",
  },
  {
    airlineCode: "NAK",
    telephony: "ENACSCHOOL",
  },
  {
    airlineCode: "ENF",
    telephony: "ENAV CHECK",
  },
  {
    airlineCode: "WEN",
    telephony: "ENCORE",
  },
  {
    airlineCode: "EDV",
    telephony: "ENDEAVOR",
  },
  {
    airlineCode: "ENC",
    telephony: "ENDECOTS",
  },
  {
    airlineCode: "REV",
    telephony: "ENDURANCE",
  },
  {
    airlineCode: "ECR",
    telephony: "ENERGIA",
  },
  {
    airlineCode: "NUS",
    telephony: "ENJET",
  },
  {
    airlineCode: "ESE",
    telephony: "ENSENADA ESPECIAL",
  },
  {
    airlineCode: "ETL",
    telephony: "ENTEL",
  },
  {
    airlineCode: "ENT",
    telephony: "ENTERAIR",
  },
  {
    airlineCode: "ENS",
    telephony: "ENTERGY SHUTTLE",
  },
  {
    airlineCode: "UKN",
    telephony: "ENTERPRISE UKRAINE",
  },
  {
    airlineCode: "EZZ",
    telephony: "ENTERPRIZE",
  },
  {
    airlineCode: "ENY",
    telephony: "ENVOY",
  },
  {
    airlineCode: "NVO",
    telephony: "ENVUELO",
  },
  {
    airlineCode: "ENZ",
    telephony: "ENZO",
  },
  {
    airlineCode: "EOL",
    telephony: "EOLE",
  },
  {
    airlineCode: "EOP",
    telephony: "EOLO PLUS",
  },
  {
    airlineCode: "ERM",
    telephony: "EOMAAN",
  },
  {
    airlineCode: "IAG",
    telephony: "EPAG",
  },
  {
    airlineCode: "AFM",
    telephony: "EPIC AIR",
  },
  {
    airlineCode: "EPI",
    telephony: "EPIC RED",
  },
  {
    airlineCode: "EPS",
    telephony: "EPPS AIR",
  },
  {
    airlineCode: "GRV",
    telephony: "EPSILON",
  },
  {
    airlineCode: "EKA",
    telephony: "EQUAFLIGHT",
  },
  {
    airlineCode: "EKJ",
    telephony: "EQUAJET",
  },
  {
    airlineCode: "EQL",
    telephony: "EQUATORIAL",
  },
  {
    airlineCode: "EQT",
    telephony: "EQUITY",
  },
  {
    airlineCode: "ERH",
    telephony: "ERA",
  },
  {
    airlineCode: "IRY",
    telephony: "ERAM AIR",
  },
  {
    airlineCode: "HRA",
    telephony: "ERICA",
  },
  {
    airlineCode: "ERY",
    telephony: "ERIE SHORE",
  },
  {
    airlineCode: "ERT",
    telephony: "ERITREAN",
  },
  {
    airlineCode: "ERN",
    telephony: "ERNEST",
  },
  {
    airlineCode: "GAL",
    telephony: "ERRANTE",
  },
  {
    airlineCode: "EPJ",
    telephony: "ESPEJO",
  },
  {
    airlineCode: "RSA",
    telephony: "ESRA",
  },
  {
    airlineCode: "ESF",
    telephony: "ESTAFETA",
  },
  {
    airlineCode: "ROE",
    telephony: "ESTE-BOLIVIA",
  },
  {
    airlineCode: "ETR",
    telephony: "ESTEL",
  },
  {
    airlineCode: "CMC",
    telephony: "ESTERLINE",
  },
  {
    airlineCode: "EEF",
    telephony: "ESTONIAN AIRFORCE",
  },
  {
    airlineCode: "ETH",
    telephony: "ETHIOPIAN",
  },
  {
    airlineCode: "ETD",
    telephony: "ETIHAD",
  },
  {
    airlineCode: "ETM",
    telephony: "ETRAM",
  },
  {
    airlineCode: "ECN",
    telephony: "EURO CONTINENTAL",
  },
  {
    airlineCode: "EUU",
    telephony: "EUROAMERICAN",
  },
  {
    airlineCode: "MMZ",
    telephony: "EUROATLANTIC",
  },
  {
    airlineCode: "FHM",
    telephony: "EUROBIRD",
  },
  {
    airlineCode: "CAZ",
    telephony: "EUROCAT",
  },
  {
    airlineCode: "ECF",
    telephony: "EUROCOPTER",
  },
  {
    airlineCode: "EEU",
    telephony: "EUROFLY",
  },
  {
    airlineCode: "ELE",
    telephony: "EUROLINE",
  },
  {
    airlineCode: "EUL",
    telephony: "EUROLINK",
  },
  {
    airlineCode: "ELO",
    telephony: "EUROLOT",
  },
  {
    airlineCode: "ESQ",
    telephony: "EUROP STAR",
  },
  {
    airlineCode: "AEA",
    telephony: "EUROPA",
  },
  {
    airlineCode: "FYS",
    telephony: "EUROPEAN FLYERS",
  },
  {
    airlineCode: "EPC",
    telephony: "EUROPILOT",
  },
  {
    airlineCode: "BCS",
    telephony: "EUROTRANS",
  },
  {
    airlineCode: "VAA",
    telephony: "EUROVAN",
  },
  {
    airlineCode: "AAE",
    telephony: "EUROVIKING",
  },
  {
    airlineCode: "EUW",
    telephony: "EUROWEST",
  },
  {
    airlineCode: "EWG",
    telephony: "EUROWINGS",
  },
  {
    airlineCode: "EUS",
    telephony: "EURUS",
  },
  {
    airlineCode: "EVA",
    telephony: "EVA",
  },
  {
    airlineCode: "EVA",
    telephony: "EVA",
  },
  {
    airlineCode: "EVE",
    telephony: "EVELOP",
  },
  {
    airlineCode: "EFD",
    telephony: "EVER FLIGHT",
  },
  {
    airlineCode: "EVK",
    telephony: "EVERETT",
  },
  {
    airlineCode: "EVQ",
    telephony: "EVERETT AIR",
  },
  {
    airlineCode: "EGS",
    telephony: "EVERGLADES",
  },
  {
    airlineCode: "EIA",
    telephony: "EVERGREEN",
  },
  {
    airlineCode: "EVJ",
    telephony: "EVERJETS",
  },
  {
    airlineCode: "VTS",
    telephony: "EVERTS",
  },
  {
    airlineCode: "NHX",
    telephony: "EVO",
  },
  {
    airlineCode: "EVL",
    telephony: "EVOLEM",
  },
  {
    airlineCode: "EWA",
    telephony: "EWEST",
  },
  {
    airlineCode: "XFL",
    telephony: "EX-FLIGHT",
  },
  {
    airlineCode: "EXM",
    telephony: "EXAM",
  },
  {
    airlineCode: "EIC",
    telephony: "EXCARGO",
  },
  {
    airlineCode: "XLS",
    telephony: "EXCELAIRE",
  },
  {
    airlineCode: "XCH",
    telephony: "EXCHANGE",
  },
  {
    airlineCode: "XJC",
    telephony: "EXCLUSIVE JET",
  },
  {
    airlineCode: "EXE",
    telephony: "EXEC",
  },
  {
    airlineCode: "ESM",
    telephony: "EXEC AIRCRAFT",
  },
  {
    airlineCode: "EXH",
    telephony: "EXEC HELI",
  },
  {
    airlineCode: "EAC",
    telephony: "EXECAIR",
  },
  {
    airlineCode: "EJA",
    telephony: "EXECJET",
  },
  {
    airlineCode: "SNQ",
    telephony: "EXECU-QUEST",
  },
  {
    airlineCode: "CTS",
    telephony: "EXECUTIVE",
  },
  {
    airlineCode: "EXF",
    telephony: "EXIMFLIGHT",
  },
  {
    airlineCode: "EXN",
    telephony: "EXIN",
  },
  {
    airlineCode: "XOJ",
    telephony: "EXOJET",
  },
  {
    airlineCode: "EXV",
    telephony: "EXPOAVIA",
  },
  {
    airlineCode: "TXZ",
    telephony: "EXPRESS AIR",
  },
  {
    airlineCode: "CAE",
    telephony: "EXPRESS CENTRAF",
  },
  {
    airlineCode: "EFA",
    telephony: "EXPRESS FREIGHT",
  },
  {
    airlineCode: "AXB",
    telephony: "EXPRESS INDIA",
  },
  {
    airlineCode: "AXK",
    telephony: "EXPRESS JET",
  },
  {
    airlineCode: "RXP",
    telephony: "EXPRESS MAROC",
  },
  {
    airlineCode: "XTO",
    telephony: "EXPRESS TOURS",
  },
  {
    airlineCode: "TAX",
    telephony: "EXPRESS WING",
  },
  {
    airlineCode: "EXY",
    telephony: "EXPRESSWAYS",
  },
  {
    airlineCode: "EZA",
    telephony: "EZNIS",
  },
  {
    airlineCode: "FMA",
    telephony: "FAASA",
  },
  {
    airlineCode: "FAK",
    telephony: "FACTS",
  },
  {
    airlineCode: "FAP",
    telephony: "FAIR SCHOOL",
  },
  {
    airlineCode: "FWD",
    telephony: "FAIR WIND",
  },
  {
    airlineCode: "FAV",
    telephony: "FAIRAVIA",
  },
  {
    airlineCode: "FAX",
    telephony: "FAIRFAX",
  },
  {
    airlineCode: "FRF",
    telephony: "FAIRFLEET",
  },
  {
    airlineCode: "FFC",
    telephony: "FAIROAKS",
  },
  {
    airlineCode: "FSE",
    telephony: "FALCO",
  },
  {
    airlineCode: "FAU",
    telephony: "FALCON AIRLINE",
  },
  {
    airlineCode: "FVS",
    telephony: "FALCON AVIATION",
  },
  {
    airlineCode: "FAW",
    telephony: "FALWELL",
  },
  {
    airlineCode: "FAM",
    telephony: "FAMEX",
  },
  {
    airlineCode: "LHB",
    telephony: "FAMILY",
  },
  {
    airlineCode: "BFM",
    telephony: "FAN MAY",
  },
  {
    airlineCode: "FAN",
    telephony: "FANBIRD",
  },
  {
    airlineCode: "FJE",
    telephony: "FANJET",
  },
  {
    airlineCode: "HYN",
    telephony: "FANTASIA",
  },
  {
    airlineCode: "FTC",
    telephony: "FANTASTIC",
  },
  {
    airlineCode: "FEA",
    telephony: "FAR EASTERN",
  },
  {
    airlineCode: "FEE",
    telephony: "FARES",
  },
  {
    airlineCode: "FDL",
    telephony: "FARMINGDALE STATE",
  },
  {
    airlineCode: "RAF",
    telephony: "FARNAS",
  },
  {
    airlineCode: "FLI",
    telephony: "FAROELINE",
  },
  {
    airlineCode: "QFZ",
    telephony: "FARS QESHM",
  },
  {
    airlineCode: "FRW",
    telephony: "FARWEST",
  },
  {
    airlineCode: "FSW",
    telephony: "FASO",
  },
  {
    airlineCode: "FJB",
    telephony: "FASTBIRD",
  },
  {
    airlineCode: "FYJ",
    telephony: "FASTJET",
  },
  {
    airlineCode: "LNQ",
    telephony: "FASTLINK",
  },
  {
    airlineCode: "FMX",
    telephony: "FASTMEX",
  },
  {
    airlineCode: "WUE",
    telephony: "FASTY",
  },
  {
    airlineCode: "FXI",
    telephony: "FAXI",
  },
  {
    airlineCode: "FAY",
    telephony: "FAYBAN AIR",
  },
  {
    airlineCode: "FPK",
    telephony: "FEATHER",
  },
  {
    airlineCode: "FDR",
    telephony: "FEDAIR",
  },
  {
    airlineCode: "FLL",
    telephony: "FEDERAL AIRLINES",
  },
  {
    airlineCode: "FDX",
    telephony: "FEDEX",
  },
  {
    airlineCode: "FPL",
    telephony: "FEDPOL",
  },
  {
    airlineCode: "UFS",
    telephony: "FEEDER FLIGHT",
  },
  {
    airlineCode: "CFA",
    telephony: "FEILONG",
  },
  {
    airlineCode: "BAE",
    telephony: "FELIX",
  },
  {
    airlineCode: "FEN",
    telephony: "FENESTRON",
  },
  {
    airlineCode: "FEO",
    telephony: "FERINCO",
  },
  {
    airlineCode: "FFU",
    telephony: "FERRANTI",
  },
  {
    airlineCode: "SXA",
    telephony: "FERRY",
  },
  {
    airlineCode: "FIA",
    telephony: "FIA AIRLINES",
  },
  {
    airlineCode: "FJI",
    telephony: "FIJI",
  },
  {
    airlineCode: "FNC",
    telephony: "FINALAIR CONGO",
  },
  {
    airlineCode: "HBN",
    telephony: "FINCH",
  },
  {
    airlineCode: "KXA",
    telephony: "FINDER AIR",
  },
  {
    airlineCode: "FNS",
    telephony: "FINESSE",
  },
  {
    airlineCode: "FTR",
    telephony: "FINISTAIR",
  },
  {
    airlineCode: "FNL",
    telephony: "FINN FLIGHT",
  },
  {
    airlineCode: "FIN",
    telephony: "FINNAIR",
  },
  {
    airlineCode: "FCM",
    telephony: "FINNCOMM",
  },
  {
    airlineCode: "FNF",
    telephony: "FINNFORCE",
  },
  {
    airlineCode: "FNG",
    telephony: "FINNGUARD",
  },
  {
    airlineCode: "FIH",
    telephony: "FINNHEMS",
  },
  {
    airlineCode: "XCN",
    telephony: "FIRE SCAN",
  },
  {
    airlineCode: "CLU",
    telephony: "FIREBIRD",
  },
  {
    airlineCode: "FFM",
    telephony: "FIREFLY",
  },
  {
    airlineCode: "FGD",
    telephony: "FIREGUARD",
  },
  {
    airlineCode: "HWK",
    telephony: "FIREHAWK",
  },
  {
    airlineCode: "FTK",
    telephony: "FIRETAC",
  },
  {
    airlineCode: "WOF",
    telephony: "FIREWISE",
  },
  {
    airlineCode: "FOE",
    telephony: "FIRST EAGLE",
  },
  {
    airlineCode: "FRN",
    telephony: "FIRST NATION",
  },
  {
    airlineCode: "FIV",
    telephony: "FIVE STAR",
  },
  {
    airlineCode: "FSX",
    telephony: "FLAG",
  },
  {
    airlineCode: "FLE",
    telephony: "FLAIR",
  },
  {
    airlineCode: "WAF",
    telephony: "FLAMENCO",
  },
  {
    airlineCode: "FMR",
    telephony: "FLAMINGO AIR",
  },
  {
    airlineCode: "PGV",
    telephony: "FLANA",
  },
  {
    airlineCode: "FYN",
    telephony: "FLANDY",
  },
  {
    airlineCode: "HED",
    telephony: "FLAPJACK",
  },
  {
    airlineCode: "FBG",
    telephony: "FLEET BIG",
  },
  {
    airlineCode: "FLR",
    telephony: "FLEETAIR",
  },
  {
    airlineCode: "GRA",
    telephony: "FLEX",
  },
  {
    airlineCode: "FFX",
    telephony: "FLEX BRASIL",
  },
  {
    airlineCode: "FLJ",
    telephony: "FLEXAIR",
  },
  {
    airlineCode: "LXJ",
    telephony: "FLEXJET",
  },
  {
    airlineCode: "FXW",
    telephony: "FLEXWING",
  },
  {
    airlineCode: "UFA",
    telephony: "FLIGHT ACADEMY",
  },
  {
    airlineCode: "VOR",
    telephony: "FLIGHT CAL",
  },
  {
    airlineCode: "FLC",
    telephony: "FLIGHT CHECK",
  },
  {
    airlineCode: "FLX",
    telephony: "FLIGHT EXPRESS",
  },
  {
    airlineCode: "OLS",
    telephony: "FLIGHT SOL",
  },
  {
    airlineCode: "FTU",
    telephony: "FLIGHT UNIVERSITY",
  },
  {
    airlineCode: "FTL",
    telephony: "FLIGHT-AVIA",
  },
  {
    airlineCode: "FWR",
    telephony: "FLIGHTAWARE",
  },
  {
    airlineCode: "FCP",
    telephony: "FLIGHTCORP",
  },
  {
    airlineCode: "KFA",
    telephony: "FLIGHTCRAFT",
  },
  {
    airlineCode: "FEX",
    telephony: "FLIGHTEXEC",
  },
  {
    airlineCode: "FLZ",
    telephony: "FLIGHTLINK",
  },
  {
    airlineCode: "FST",
    telephony: "FLIGHTRON",
  },
  {
    airlineCode: "FSR",
    telephony: "FLIGHTSTAR",
  },
  {
    airlineCode: "VUE",
    telephony: "FLIGHTVUE",
  },
  {
    airlineCode: "FWK",
    telephony: "FLIGHTWORKS",
  },
  {
    airlineCode: "FAZ",
    telephony: "FLINT AIR",
  },
  {
    airlineCode: "HWD",
    telephony: "FLITEWISE",
  },
  {
    airlineCode: "FWL",
    telephony: "FLO WEST",
  },
  {
    airlineCode: "FFD",
    telephony: "FLORIAN",
  },
  {
    airlineCode: "FAS",
    telephony: "FLORIDA CARGO",
  },
  {
    airlineCode: "FCL",
    telephony: "FLORIDA COASTAL",
  },
  {
    airlineCode: "FBN",
    telephony: "FLORIDA TRANSPORT",
  },
  {
    airlineCode: "FJS",
    telephony: "FLORIDAJET",
  },
  {
    airlineCode: "FLD",
    telephony: "FLORIDIAN",
  },
  {
    airlineCode: "AIN",
    telephony: "FLY CARGO",
  },
  {
    airlineCode: "FTY",
    telephony: "FLY TYROL",
  },
  {
    airlineCode: "FYA",
    telephony: "FLYANT",
  },
  {
    airlineCode: "FLO",
    telephony: "FLYCOM",
  },
  {
    airlineCode: "FDS",
    telephony: "FLYDOC",
  },
  {
    airlineCode: "CFE",
    telephony: "FLYER",
  },
  {
    airlineCode: "FFY",
    telephony: "FLYERS AIR",
  },
  {
    airlineCode: "LZB",
    telephony: "FLYING BULGARIA",
  },
  {
    airlineCode: "FGP",
    telephony: "FLYING CENTER",
  },
  {
    airlineCode: "FDN",
    telephony: "FLYING DOLPHIN",
  },
  {
    airlineCode: "FYG",
    telephony: "FLYING GROUP",
  },
  {
    airlineCode: "FYL",
    telephony: "FLYINGLUX",
  },
  {
    airlineCode: "DNC",
    telephony: "FLYINGOLIVE",
  },
  {
    airlineCode: "FON",
    telephony: "FLYINGTON",
  },
  {
    airlineCode: "FIL",
    telephony: "FLYLINE",
  },
  {
    airlineCode: "FLK",
    telephony: "FLYLINK",
  },
  {
    airlineCode: "FYE",
    telephony: "FLYME",
  },
  {
    airlineCode: "FTM",
    telephony: "FLYTEAM",
  },
  {
    airlineCode: "FOC",
    telephony: "FOCA",
  },
  {
    airlineCode: "FKS",
    telephony: "FOCUS",
  },
  {
    airlineCode: "FOF",
    telephony: "FOFA",
  },
  {
    airlineCode: "MGF",
    telephony: "FOGLIA",
  },
  {
    airlineCode: "FOP",
    telephony: "FOKKER SERVICES",
  },
  {
    airlineCode: "NOF",
    telephony: "FONNA",
  },
  {
    airlineCode: "FTH",
    telephony: "FOOTHILLS",
  },
  {
    airlineCode: "FTP",
    telephony: "FOOTPRINT",
  },
  {
    airlineCode: "ACF",
    telephony: "FORCAN",
  },
  {
    airlineCode: "FRD",
    telephony: "FORD",
  },
  {
    airlineCode: "CFB",
    telephony: "FOREBASE",
  },
  {
    airlineCode: "FFL",
    telephony: "FOREFLIGHT",
  },
  {
    airlineCode: "FGC",
    telephony: "FORESTALES",
  },
  {
    airlineCode: "FFS",
    telephony: "FORESTRY",
  },
  {
    airlineCode: "FOR",
    telephony: "FORMULA",
  },
  {
    airlineCode: "FRX",
    telephony: "FORT AERO",
  },
  {
    airlineCode: "FTD",
    telephony: "FORTITUDE",
  },
  {
    airlineCode: "AXG",
    telephony: "FORTUNE",
  },
  {
    airlineCode: "FOA",
    telephony: "FORTUNE AIR",
  },
  {
    airlineCode: "FSA",
    telephony: "FOSTER-AIR",
  },
  {
    airlineCode: "FSC",
    telephony: "FOUR STAR",
  },
  {
    airlineCode: "FCJ",
    telephony: "FRACJET",
  },
  {
    airlineCode: "NJE",
    telephony: "FRACTION",
  },
  {
    airlineCode: "FGN",
    telephony: "FRANCE GENDARME",
  },
  {
    airlineCode: "TVF",
    telephony: "FRANCE SOLEIL",
  },
  {
    airlineCode: "BEN",
    telephony: "FRANKLIN",
  },
  {
    airlineCode: "FSJ",
    telephony: "FREE SKY",
  },
  {
    airlineCode: "FHY",
    telephony: "FREEBIRD AIR",
  },
  {
    airlineCode: "FRE",
    telephony: "FREEDOM",
  },
  {
    airlineCode: "FDT",
    telephony: "FREEDOM EAGLE",
  },
  {
    airlineCode: "FDJ",
    telephony: "FREEDOM JET",
  },
  {
    airlineCode: "FRI",
    telephony: "FREEFLIGHT",
  },
  {
    airlineCode: "MFD",
    telephony: "FREIGHT DOG",
  },
  {
    airlineCode: "FET",
    telephony: "FREIGHT LINE",
  },
  {
    airlineCode: "FRG",
    telephony: "FREIGHT RUNNERS",
  },
  {
    airlineCode: "SBR",
    telephony: "FREIGHTER",
  },
  {
    airlineCode: "FAF",
    telephony: "FRENCH AIR FORCE",
  },
  {
    airlineCode: "FMY",
    telephony: "FRENCH ARMY",
  },
  {
    airlineCode: "FBU",
    telephony: "FRENCH BEE",
  },
  {
    airlineCode: "FDO",
    telephony: "FRENCH CUSTOM",
  },
  {
    airlineCode: "FNY",
    telephony: "FRENCH NAVY",
  },
  {
    airlineCode: "FPO",
    telephony: "FRENCH POST",
  },
  {
    airlineCode: "FRU",
    telephony: "FRENCH RESCUE",
  },
  {
    airlineCode: "FWI",
    telephony: "FRENCH WEST",
  },
  {
    airlineCode: "FRR",
    telephony: "FRESH AIR",
  },
  {
    airlineCode: "FZW",
    telephony: "FRESH EXPRESS",
  },
  {
    airlineCode: "FLF",
    telephony: "FRIEND AIR",
  },
  {
    airlineCode: "FDY",
    telephony: "FRIENDLY",
  },
  {
    airlineCode: "FAL",
    telephony: "FRIENDSHIP",
  },
  {
    airlineCode: "FGR",
    telephony: "FRIGATE",
  },
  {
    airlineCode: "FFT",
    telephony: "FRONTIER FLIGHT",
  },
  {
    airlineCode: "FTA",
    telephony: "FRONTIER-AIR",
  },
  {
    airlineCode: "FSY",
    telephony: "FROSTY",
  },
  {
    airlineCode: "FAG",
    telephony: "FUAER",
  },
  {
    airlineCode: "FUJ",
    telephony: "FUJAIRAH",
  },
  {
    airlineCode: "FDA",
    telephony: "FUJI DREAM",
  },
  {
    airlineCode: "FUC",
    telephony: "FUMICAR",
  },
  {
    airlineCode: "FUP",
    telephony: "FUMIPALMA",
  },
  {
    airlineCode: "FUS",
    telephony: "FUMISOL",
  },
  {
    airlineCode: "LTE",
    telephony: "FUN JET",
  },
  {
    airlineCode: "FNK",
    telephony: "FUNKY",
  },
  {
    airlineCode: "FUM",
    telephony: "FUNLINE",
  },
  {
    airlineCode: "HLL",
    telephony: "FUSION",
  },
  {
    airlineCode: "FJT",
    telephony: "FUTURE AIR",
  },
  {
    airlineCode: "GWA",
    telephony: "G-W AIR",
  },
  {
    airlineCode: "GBE",
    telephony: "GABEX",
  },
  {
    airlineCode: "GBK",
    telephony: "GABON AIRLINES",
  },
  {
    airlineCode: "GBC",
    telephony: "GABON CARGO",
  },
  {
    airlineCode: "GDR",
    telephony: "GADAIR LINES",
  },
  {
    airlineCode: "GFC",
    telephony: "GAIL FORCE",
  },
  {
    airlineCode: "GNJ",
    telephony: "GAIN JET",
  },
  {
    airlineCode: "GJI",
    telephony: "GAINSTAR",
  },
  {
    airlineCode: "MTA",
    telephony: "GAK AVIATION",
  },
  {
    airlineCode: "VGX",
    telephony: "GALACTIC",
  },
  {
    airlineCode: "SWF",
    telephony: "GALAIR",
  },
  {
    airlineCode: "GLG",
    telephony: "GALAPAGOS",
  },
  {
    airlineCode: "GLY",
    telephony: "GALAXY AVIATION",
  },
  {
    airlineCode: "GAS",
    telephony: "GALENA AIR SERVICE",
  },
  {
    airlineCode: "UCK",
    telephony: "GALETA",
  },
  {
    airlineCode: "AXE",
    telephony: "GALILEO",
  },
  {
    airlineCode: "GTR",
    telephony: "GALISTAIR",
  },
  {
    airlineCode: "FUH",
    telephony: "GALLANT",
  },
  {
    airlineCode: "GMA",
    telephony: "GAMA",
  },
  {
    airlineCode: "GAJ",
    telephony: "GAMA JET",
  },
  {
    airlineCode: "GSH",
    telephony: "GAMAMENA",
  },
  {
    airlineCode: "GBQ",
    telephony: "GAMBIA BIRD",
  },
  {
    airlineCode: "GNR",
    telephony: "GAMBIA INTERNATIONAL",
  },
  {
    airlineCode: "GAH",
    telephony: "GAMHELICO",
  },
  {
    airlineCode: "GMJ",
    telephony: "GAMISA",
  },
  {
    airlineCode: "FGW",
    telephony: "GANGWON",
  },
  {
    airlineCode: "QTM",
    telephony: "GANSUM",
  },
  {
    airlineCode: "RGP",
    telephony: "GARDEN CITY",
  },
  {
    airlineCode: "GSA",
    telephony: "GARDEN STATE",
  },
  {
    airlineCode: "GMN",
    telephony: "GARMIN",
  },
  {
    airlineCode: "WAY",
    telephony: "GARONNE",
  },
  {
    airlineCode: "GLT",
    telephony: "GASLIGHT",
  },
  {
    airlineCode: "GTW",
    telephony: "GATEWAY",
  },
  {
    airlineCode: "GTF",
    telephony: "GATOR FLIGHT",
  },
  {
    airlineCode: "BDN",
    telephony: "GAUNTLET",
  },
  {
    airlineCode: "EGO",
    telephony: "GAUTENG",
  },
  {
    airlineCode: "GVN",
    telephony: "GAVINA",
  },
  {
    airlineCode: "GTV",
    telephony: "GAVIOTA",
  },
  {
    airlineCode: "GZP",
    telephony: "GAZPROM",
  },
  {
    airlineCode: "GCC",
    telephony: "GECAS",
  },
  {
    airlineCode: "FMI",
    telephony: "GECKO",
  },
  {
    airlineCode: "GMG",
    telephony: "GEE-EM HELICOPTERS",
  },
  {
    airlineCode: "GML",
    telephony: "GEEANDEL",
  },
  {
    airlineCode: "GBX",
    telephony: "GEEBEE LINK",
  },
  {
    airlineCode: "GAG",
    telephony: "GEEBIRD",
  },
  {
    airlineCode: "GEE",
    telephony: "GEMEX",
  },
  {
    airlineCode: "AES",
    telephony: "GEMINA",
  },
  {
    airlineCode: "GXA",
    telephony: "GEMINI",
  },
  {
    airlineCode: "GWS",
    telephony: "GENAIR",
  },
  {
    airlineCode: "GMC",
    telephony: "GENERAL MOTORS",
  },
  {
    airlineCode: "GGG",
    telephony: "GENESIS",
  },
  {
    airlineCode: "AUD",
    telephony: "GENIE",
  },
  {
    airlineCode: "GEN",
    telephony: "GENSA-BRASIL",
  },
  {
    airlineCode: "AUG",
    telephony: "GEO UNIVERSITY",
  },
  {
    airlineCode: "JJM",
    telephony: "GEODATA",
  },
  {
    airlineCode: "FGA",
    telephony: "GEORGIA FED",
  },
  {
    airlineCode: "RVU",
    telephony: "GEORGIAN BALLOON",
  },
  {
    airlineCode: "GAF",
    telephony: "GERMAN AIR FORCE",
  },
  {
    airlineCode: "GAM",
    telephony: "GERMAN ARMY",
  },
  {
    airlineCode: "BOX",
    telephony: "GERMAN CARGO",
  },
  {
    airlineCode: "GER",
    telephony: "GERMAN EAGLE",
  },
  {
    airlineCode: "GNY",
    telephony: "GERMAN NAVY",
  },
  {
    airlineCode: "GWI",
    telephony: "GERMAN WINGS",
  },
  {
    airlineCode: "LTU",
    telephony: "GERMANAIR",
  },
  {
    airlineCode: "GRM",
    telephony: "GERONIMO",
  },
  {
    airlineCode: "GPL",
    telephony: "GESPLANE",
  },
  {
    airlineCode: "GES",
    telephony: "GESTAIR",
  },
  {
    airlineCode: "GWY",
    telephony: "GETAWAY",
  },
  {
    airlineCode: "GJT",
    telephony: "GETJET",
  },
  {
    airlineCode: "GZR",
    telephony: "GEZIRA",
  },
  {
    airlineCode: "GHF",
    telephony: "GHANA AIRFORCE",
  },
  {
    airlineCode: "BAT",
    telephony: "GHERKIN",
  },
  {
    airlineCode: "GTI",
    telephony: "GIANT",
  },
  {
    airlineCode: "KME",
    telephony: "GIANT IBIS",
  },
  {
    airlineCode: "GIO",
    telephony: "GIO-AVIA",
  },
  {
    airlineCode: "GGL",
    telephony: "GIRA GLOBO",
  },
  {
    airlineCode: "GLR",
    telephony: "GLACIER",
  },
  {
    airlineCode: "GDA",
    telephony: "GLADIATOR",
  },
  {
    airlineCode: "EGV",
    telephony: "GLEISNER",
  },
  {
    airlineCode: "GLB",
    telephony: "GLOBAL",
  },
  {
    airlineCode: "GAA",
    telephony: "GLOBAL AFRICA",
  },
  {
    airlineCode: "GLJ",
    telephony: "GLOBAL AUSTRIA",
  },
  {
    airlineCode: "CCC",
    telephony: "GLOBAL CARGO",
  },
  {
    airlineCode: "GJE",
    telephony: "GLOBAL JETS",
  },
  {
    airlineCode: "JGJ",
    telephony: "GLOBAL JINGGONG",
  },
  {
    airlineCode: "GSP",
    telephony: "GLOBAL SCHOOL",
  },
  {
    airlineCode: "GBS",
    telephony: "GLOBAL SERVE",
  },
  {
    airlineCode: "GSK",
    telephony: "GLOBAL SKY",
  },
  {
    airlineCode: "GBJ",
    telephony: "GLOBAL THAI",
  },
  {
    airlineCode: "GCW",
    telephony: "GLOBALCREW",
  },
  {
    airlineCode: "GBB",
    telephony: "GLOBE",
  },
  {
    airlineCode: "GME",
    telephony: "GLOBE MERIDIAN",
  },
  {
    airlineCode: "GCM",
    telephony: "GLOBECOM",
  },
  {
    airlineCode: "ATH",
    telephony: "GLOBESTAR",
  },
  {
    airlineCode: "GLP",
    telephony: "GLOBUS",
  },
  {
    airlineCode: "GCK",
    telephony: "GLOCK",
  },
  {
    airlineCode: "GAR",
    telephony: "GLORY AIR",
  },
  {
    airlineCode: "GOW",
    telephony: "GOAIR",
  },
  {
    airlineCode: "CAN",
    telephony: "GOBER AIR",
  },
  {
    airlineCode: "GOF",
    telephony: "GOF-AIR",
  },
  {
    airlineCode: "GOJ",
    telephony: "GOJET",
  },
  {
    airlineCode: "GLO",
    telephony: "GOL TRANSPORTE",
  },
  {
    airlineCode: "NHZ",
    telephony: "GOLD",
  },
  {
    airlineCode: "GPA",
    telephony: "GOLD PAC",
  },
  {
    airlineCode: "GDK",
    telephony: "GOLDECK FLUG",
  },
  {
    airlineCode: "SQM",
    telephony: "GOLDEN FIN",
  },
  {
    airlineCode: "GDG",
    telephony: "GOLDEN GATE",
  },
  {
    airlineCode: "GHK",
    telephony: "GOLDEN HAWK",
  },
  {
    airlineCode: "GKA",
    telephony: "GOLDEN KNIGHTS",
  },
  {
    airlineCode: "GMR",
    telephony: "GOLDEN MYANMAR",
  },
  {
    airlineCode: "GLD",
    telephony: "GOLDEN STAR",
  },
  {
    airlineCode: "GDS",
    telephony: "GOLDSTRIKE",
  },
  {
    airlineCode: "AGN",
    telephony: "GOLF NOVEMBER",
  },
  {
    airlineCode: "GLE",
    telephony: "GOLIAF AIR",
  },
  {
    airlineCode: "GOM",
    telephony: "GOMEL",
  },
  {
    airlineCode: "GNZ",
    telephony: "GONZO",
  },
  {
    airlineCode: "GPD",
    telephony: "GOODSPEED",
  },
  {
    airlineCode: "ION",
    telephony: "GORRION",
  },
  {
    airlineCode: "HJE",
    telephony: "GOSA",
  },
  {
    airlineCode: "GOP",
    telephony: "GOSPA AIR",
  },
  {
    airlineCode: "GTH",
    telephony: "GOTHAM",
  },
  {
    airlineCode: "GPR",
    telephony: "GPM AEROSERVICIO",
  },
  {
    airlineCode: "GRC",
    telephony: "GRACE FLIGHT",
  },
  {
    airlineCode: "RGK",
    telephony: "GRANCA",
  },
  {
    airlineCode: "GAX",
    telephony: "GRAND AIRE",
  },
  {
    airlineCode: "GDC",
    telephony: "GRAND CHINA",
  },
  {
    airlineCode: "WGP",
    telephony: "GRAND PRIX",
  },
  {
    airlineCode: "GND",
    telephony: "GRAND VEGAS",
  },
  {
    airlineCode: "GRN",
    telephony: "GRANDE",
  },
  {
    airlineCode: "GSC",
    telephony: "GRANDSTAR CARGO",
  },
  {
    airlineCode: "GHP",
    telephony: "GRASSHOPPER EX",
  },
  {
    airlineCode: "PHA",
    telephony: "GRAY BIRD",
  },
  {
    airlineCode: "GRY",
    telephony: "GRAY RIDER",
  },
  {
    airlineCode: "GSY",
    telephony: "GRAY SKY",
  },
  {
    airlineCode: "GDE",
    telephony: "GREAT DANE",
  },
  {
    airlineCode: "NFL",
    telephony: "GREAT LAKES",
  },
  {
    airlineCode: "MGW",
    telephony: "GREAT MONGOLIAN",
  },
  {
    airlineCode: "GGN",
    telephony: "GREAT NORTH",
  },
  {
    airlineCode: "GWL",
    telephony: "GREAT WALL",
  },
  {
    airlineCode: "HGB",
    telephony: "GREATER BAY",
  },
  {
    airlineCode: "AZI",
    telephony: "GREEK STAR",
  },
  {
    airlineCode: "GUY",
    telephony: "GREEN BIRD",
  },
  {
    airlineCode: "CBG",
    telephony: "GREEN CITY",
  },
  {
    airlineCode: "GNF",
    telephony: "GREEN FLAG",
  },
  {
    airlineCode: "RCT",
    telephony: "GREEN SKY",
  },
  {
    airlineCode: "EVX",
    telephony: "GREEN SPIRIT",
  },
  {
    airlineCode: "GBR",
    telephony: "GREENBRIER AIR",
  },
  {
    airlineCode: "FJM",
    telephony: "GREENHEART",
  },
  {
    airlineCode: "GRL",
    telephony: "GREENLAND",
  },
  {
    airlineCode: "FOX",
    telephony: "GREENSTAR",
  },
  {
    airlineCode: "MKB",
    telephony: "GREENTAIL",
  },
  {
    airlineCode: "BRZ",
    telephony: "GREMAIR",
  },
  {
    airlineCode: "SVD",
    telephony: "GRENADINES",
  },
  {
    airlineCode: "FTZ",
    telephony: "GREY BIRD",
  },
  {
    airlineCode: "GJA",
    telephony: "GREY JAY",
  },
  {
    airlineCode: "GRD",
    telephony: "GRID",
  },
  {
    airlineCode: "GFN",
    telephony: "GRIFFON",
  },
  {
    airlineCode: "AKG",
    telephony: "GRIFTER",
  },
  {
    airlineCode: "GRX",
    telephony: "GRODNO",
  },
  {
    airlineCode: "GSJ",
    telephony: "GROSSJET",
  },
  {
    airlineCode: "GOZ",
    telephony: "GROZNYY AVIA",
  },
  {
    airlineCode: "UWA",
    telephony: "GRUMPY",
  },
  {
    airlineCode: "GFV",
    telephony: "GRUPO- AFA",
  },
  {
    airlineCode: "GPM",
    telephony: "GRUPOMED",
  },
  {
    airlineCode: "GMT",
    telephony: "GRUPOMONTERREY",
  },
  {
    airlineCode: "GTP",
    telephony: "GRUPOTAMPICO",
  },
  {
    airlineCode: "GVA",
    telephony: "GRUPOVA",
  },
  {
    airlineCode: "AZP",
    telephony: "GUARANI",
  },
  {
    airlineCode: "GDY",
    telephony: "GUARDIAN",
  },
  {
    airlineCode: "GHL",
    telephony: "GUILIN ROTOR",
  },
  {
    airlineCode: "GNC",
    telephony: "GUINEA CARGO",
  },
  {
    airlineCode: "GUJ",
    telephony: "GUJARATAIR",
  },
  {
    airlineCode: "GFA",
    telephony: "GULF AIR",
  },
  {
    airlineCode: "GAE",
    telephony: "GULF AVIATION",
  },
  {
    airlineCode: "GBA",
    telephony: "GULF BAHRAIN",
  },
  {
    airlineCode: "GCN",
    telephony: "GULF CENTRAL",
  },
  {
    airlineCode: "GCT",
    telephony: "GULF COAST",
  },
  {
    airlineCode: "GMD",
    telephony: "GULF MED",
  },
  {
    airlineCode: "GAT",
    telephony: "GULF TRANS",
  },
  {
    airlineCode: "GWC",
    telephony: "GULF WINGS",
  },
  {
    airlineCode: "GLH",
    telephony: "GULFHAWK",
  },
  {
    airlineCode: "GFS",
    telephony: "GULFSTAR",
  },
  {
    airlineCode: "GLF",
    telephony: "GULFSTREAM TEST",
  },
  {
    airlineCode: "GUL",
    telephony: "GULL-AIR",
  },
  {
    airlineCode: "ERF",
    telephony: "GULLIVER",
  },
  {
    airlineCode: "GUM",
    telephony: "GUM AIR",
  },
  {
    airlineCode: "EZJ",
    telephony: "GUYANA JET",
  },
  {
    airlineCode: "GYP",
    telephony: "GYPSY",
  },
  {
    airlineCode: "GYR",
    telephony: "GYROFER",
  },
  {
    airlineCode: "HBT",
    telephony: "HABICHT",
  },
  {
    airlineCode: "FMS",
    telephony: "HADI",
  },
  {
    airlineCode: "HAG",
    telephony: "HAGELAND",
  },
  {
    airlineCode: "CHH",
    telephony: "HAINAN",
  },
  {
    airlineCode: "HRB",
    telephony: "HAITI AIRLINE",
  },
  {
    airlineCode: "HAD",
    telephony: "HAITI AVIA",
  },
  {
    airlineCode: "HTI",
    telephony: "HAITI INTERNATIONAL",
  },
  {
    airlineCode: "HTC",
    telephony: "HAITI TRANSAIR",
  },
  {
    airlineCode: "HKL",
    telephony: "HAK AIRLINE",
  },
  {
    airlineCode: "HLH",
    telephony: "HALA AIR",
  },
  {
    airlineCode: "HTP",
    telephony: "HALA EXPRESS",
  },
  {
    airlineCode: "HBC",
    telephony: "HALISA",
  },
  {
    airlineCode: "HSK",
    telephony: "HALLA SKY",
  },
  {
    airlineCode: "HMD",
    telephony: "HAMMOND",
  },
  {
    airlineCode: "HML",
    telephony: "HAMSAL",
  },
  {
    airlineCode: "HSF",
    telephony: "HAN-SEO FLIGHT",
  },
  {
    airlineCode: "HNR",
    telephony: "HANAIR",
  },
  {
    airlineCode: "UHC",
    telephony: "HANDLING COMPANY",
  },
  {
    airlineCode: "HHG",
    telephony: "HANERGY JET",
  },
  {
    airlineCode: "HGR",
    telephony: "HANG",
  },
  {
    airlineCode: "HGD",
    telephony: "HANGDAE",
  },
  {
    airlineCode: "HKN",
    telephony: "HANKINS",
  },
  {
    airlineCode: "HAH",
    telephony: "HANMA",
  },
  {
    airlineCode: "CLH",
    telephony: "HANSALINE",
  },
  {
    airlineCode: "HPY",
    telephony: "HAPPY TRAVEL",
  },
  {
    airlineCode: "HAR",
    telephony: "HARBOR",
  },
  {
    airlineCode: "HBA",
    telephony: "HARBOR AIR",
  },
  {
    airlineCode: "HRC",
    telephony: "HARCO",
  },
  {
    airlineCode: "SJF",
    telephony: "HARMATTAN",
  },
  {
    airlineCode: "HMJ",
    telephony: "HARMONY JETS",
  },
  {
    airlineCode: "HPN",
    telephony: "HARPOON",
  },
  {
    airlineCode: "HRE",
    telephony: "HART AIR",
  },
  {
    airlineCode: "HAO",
    telephony: "HARTY",
  },
  {
    airlineCode: "MHL",
    telephony: "HASSIMAIR",
  },
  {
    airlineCode: "HCA",
    telephony: "HAVASU",
  },
  {
    airlineCode: "HAV",
    telephony: "HAVILAH",
  },
  {
    airlineCode: "HAL",
    telephony: "HAWAIIAN",
  },
  {
    airlineCode: "HKI",
    telephony: "HAWKEYE",
  },
  {
    airlineCode: "HKH",
    telephony: "HAWKHUNGARY",
  },
  {
    airlineCode: "HAY",
    telephony: "HAYA",
  },
  {
    airlineCode: "HBH",
    telephony: "HEBEI AIR",
  },
  {
    airlineCode: "HBR",
    telephony: "HEBRIDEAN",
  },
  {
    airlineCode: "AFN",
    telephony: "HEKLA",
  },
  {
    airlineCode: "HCB",
    telephony: "HELEN",
  },
  {
    airlineCode: "HHP",
    telephony: "HELENIA",
  },
  {
    airlineCode: "NHG",
    telephony: "HELGA",
  },
  {
    airlineCode: "MCM",
    telephony: "HELI AIR",
  },
  {
    airlineCode: "HIL",
    telephony: "HELI ALPES",
  },
  {
    airlineCode: "AHM",
    telephony: "HELI ATLANTIS",
  },
  {
    airlineCode: "HLR",
    telephony: "HELI BULGARIA",
  },
  {
    airlineCode: "HCP",
    telephony: "HELI CZECH",
  },
  {
    airlineCode: "XEL",
    telephony: "HELI EXCEL",
  },
  {
    airlineCode: "HHE",
    telephony: "HELI HOLLAND",
  },
  {
    airlineCode: "HAC",
    telephony: "HELI MOUNT",
  },
  {
    airlineCode: "BLM",
    telephony: "HELI PER",
  },
  {
    airlineCode: "HLI",
    telephony: "HELI SAINT-TROPEZ",
  },
  {
    airlineCode: "HTA",
    telephony: "HELI TRANSAIR",
  },
  {
    airlineCode: "HLU",
    telephony: "HELI UNION",
  },
  {
    airlineCode: "HCK",
    telephony: "HELI-CHARTER",
  },
  {
    airlineCode: "HMO",
    telephony: "HELI-CORP",
  },
  {
    airlineCode: "HMC",
    telephony: "HELIAMERICA",
  },
  {
    airlineCode: "HCC",
    telephony: "HELIANCO",
  },
  {
    airlineCode: "AHT",
    telephony: "HELIAPRA",
  },
  {
    airlineCode: "HEA",
    telephony: "HELIAVIA",
  },
  {
    airlineCode: "AZH",
    telephony: "HELIAZE",
  },
  {
    airlineCode: "HSW",
    telephony: "HELIBERICA",
  },
  {
    airlineCode: "HEB",
    telephony: "HELIBERNINA",
  },
  {
    airlineCode: "GCY",
    telephony: "HELIBIRD",
  },
  {
    airlineCode: "HIB",
    telephony: "HELIBRAVO",
  },
  {
    airlineCode: "HKS",
    telephony: "HELIBUS",
  },
  {
    airlineCode: "HCH",
    telephony: "HELICA",
  },
  {
    airlineCode: "HLC",
    telephony: "HELICAP",
  },
  {
    airlineCode: "MHQ",
    telephony: "HELICARE",
  },
  {
    airlineCode: "HDC",
    telephony: "HELICATALUNA",
  },
  {
    airlineCode: "COV",
    telephony: "HELICENTRE",
  },
  {
    airlineCode: "HEL",
    telephony: "HELICOL",
  },
  {
    airlineCode: "PHC",
    telephony: "HELICOPTERS",
  },
  {
    airlineCode: "HTE",
    telephony: "HELICOPTERSMEXICO",
  },
  {
    airlineCode: "DHE",
    telephony: "HELIDAP",
  },
  {
    airlineCode: "DOC",
    telephony: "HELIDOC",
  },
  {
    airlineCode: "HEE",
    telephony: "HELIEJECUTIVO",
  },
  {
    airlineCode: "HAK",
    telephony: "HELIFALCON",
  },
  {
    airlineCode: "LYH",
    telephony: "HELIGUYANE",
  },
  {
    airlineCode: "HEV",
    telephony: "HELIJECUTIVO",
  },
  {
    airlineCode: "JBA",
    telephony: "HELIJET",
  },
  {
    airlineCode: "HSM",
    telephony: "HELIMALT",
  },
  {
    airlineCode: "HLE",
    telephony: "HELIMED",
  },
  {
    airlineCode: "HEN",
    telephony: "HELINAC",
  },
  {
    airlineCode: "OCE",
    telephony: "HELIOCEAN",
  },
  {
    airlineCode: "HAP",
    telephony: "HELIPERSONAL",
  },
  {
    airlineCode: "HLP",
    telephony: "HELIPISTAS",
  },
  {
    airlineCode: "HEP",
    telephony: "HELIPOLICE",
  },
  {
    airlineCode: "HPL",
    telephony: "HELIPORTUGAL",
  },
  {
    airlineCode: "HPR",
    telephony: "HELIPRO",
  },
  {
    airlineCode: "IHC",
    telephony: "HELIRAN",
  },
  {
    airlineCode: "HTS",
    telephony: "HELISAS",
  },
  {
    airlineCode: "HSE",
    telephony: "HELISCAN",
  },
  {
    airlineCode: "HSO",
    telephony: "HELISERVICE",
  },
  {
    airlineCode: "HSY",
    telephony: "HELISKY",
  },
  {
    airlineCode: "HSR",
    telephony: "HELISTAR",
  },
  {
    airlineCode: "HSI",
    telephony: "HELISWISS",
  },
  {
    airlineCode: "HET",
    telephony: "HELITAF",
  },
  {
    airlineCode: "HLT",
    telephony: "HELITAFE",
  },
  {
    airlineCode: "HDR",
    telephony: "HELITRANS",
  },
  {
    airlineCode: "HTM",
    telephony: "HELITRAVEL",
  },
  {
    airlineCode: "HTY",
    telephony: "HELITY",
  },
  {
    airlineCode: "HCS",
    telephony: "HELIWALES",
  },
  {
    airlineCode: "HEW",
    telephony: "HELIWATER",
  },
  {
    airlineCode: "HLW",
    telephony: "HELIWORKS",
  },
  {
    airlineCode: "HWH",
    telephony: "HELIWORLD",
  },
  {
    airlineCode: "GRE",
    telephony: "HELIX",
  },
  {
    airlineCode: "HTB",
    telephony: "HELIX-CRAFT",
  },
  {
    airlineCode: "IFI",
    telephony: "HELLAS LIFT",
  },
  {
    airlineCode: "MAR",
    telephony: "HELLASMED",
  },
  {
    airlineCode: "HAF",
    telephony: "HELLENIC AIR FORCE",
  },
  {
    airlineCode: "HLA",
    telephony: "HELLENIC ARMY",
  },
  {
    airlineCode: "HNA",
    telephony: "HELLENIC NAVY",
  },
  {
    airlineCode: "HJT",
    telephony: "HELTAIR",
  },
  {
    airlineCode: "OAW",
    telephony: "HELVETIC",
  },
  {
    airlineCode: "HDL",
    telephony: "HENDELL",
  },
  {
    airlineCode: "HER",
    telephony: "HERA",
  },
  {
    airlineCode: "HRF",
    telephony: "HERO-FLIGHT",
  },
  {
    airlineCode: "HRN",
    telephony: "HERONAIR",
  },
  {
    airlineCode: "HST",
    telephony: "HESTON",
  },
  {
    airlineCode: "HUS",
    telephony: "HEUSSLER",
  },
  {
    airlineCode: "BUG",
    telephony: "HEXBUG",
  },
  {
    airlineCode: "HGG",
    telephony: "HI AIR",
  },
  {
    airlineCode: "SDG",
    telephony: "HI STAR",
  },
  {
    airlineCode: "AHL",
    telephony: "HIDALGO",
  },
  {
    airlineCode: "HIF",
    telephony: "HIFSA",
  },
  {
    airlineCode: "AHS",
    telephony: "HIGH SKY",
  },
  {
    airlineCode: "JLJ",
    telephony: "HIGHBORN",
  },
  {
    airlineCode: "HFD",
    telephony: "HIGHFIELD",
  },
  {
    airlineCode: "HYR",
    telephony: "HIGHFLYER",
  },
  {
    airlineCode: "LYB",
    telephony: "HIGHLANDS",
  },
  {
    airlineCode: "HGT",
    telephony: "HIGHTECH",
  },
  {
    airlineCode: "HHS",
    telephony: "HIJET",
  },
  {
    airlineCode: "HWA",
    telephony: "HILLWOOD",
  },
  {
    airlineCode: "HIM",
    telephony: "HIMALAYA",
  },
  {
    airlineCode: "HND",
    telephony: "HINTERLAND",
  },
  {
    airlineCode: "HSH",
    telephony: "HISPANICA",
  },
  {
    airlineCode: "HGE",
    telephony: "HOAGIE",
  },
  {
    airlineCode: "HOB",
    telephony: "HOBBY JET",
  },
  {
    airlineCode: "HOD",
    telephony: "HODHOD",
  },
  {
    airlineCode: "HDM",
    telephony: "HOG",
  },
  {
    airlineCode: "HOG",
    telephony: "HOGAN AIR",
  },
  {
    airlineCode: "HOA",
    telephony: "HOLA",
  },
  {
    airlineCode: "HIN",
    telephony: "HOLDING GROUP",
  },
  {
    airlineCode: "HOL",
    telephony: "HOLIDAY",
  },
  {
    airlineCode: "HES",
    telephony: "HOLIDAY EUROPE",
  },
  {
    airlineCode: "HAE",
    telephony: "HOLLAND AIR",
  },
  {
    airlineCode: "HTR",
    telephony: "HOLSTEN",
  },
  {
    airlineCode: "HLF",
    telephony: "HOMELAND",
  },
  {
    airlineCode: "TOR",
    telephony: "HOMERUN",
  },
  {
    airlineCode: "HON",
    telephony: "HONDA TEST",
  },
  {
    airlineCode: "HAS",
    telephony: "HONDURAS AIR",
  },
  {
    airlineCode: "MPR",
    telephony: "HONEY BEE",
  },
  {
    airlineCode: "HNW",
    telephony: "HONEYWELL",
  },
  {
    airlineCode: "VGB",
    telephony: "HONG XIANG",
  },
  {
    airlineCode: "HKG",
    telephony: "HONGKONG GOVERNMENT",
  },
  {
    airlineCode: "HKE",
    telephony: "HONGKONG SHUTTLE",
  },
  {
    airlineCode: "HEX",
    telephony: "HONIARA CARGO",
  },
  {
    airlineCode: "GUN",
    telephony: "HOOT",
  },
  {
    airlineCode: "HPJ",
    telephony: "HOPA-JET",
  },
  {
    airlineCode: "HPE",
    telephony: "HOPE AIR",
  },
  {
    airlineCode: "HPK",
    telephony: "HOPSCOTCH AIR",
  },
  {
    airlineCode: "QXE",
    telephony: "HORIZON AIR",
  },
  {
    airlineCode: "HZS",
    telephony: "HORIZON SKY",
  },
  {
    airlineCode: "HRS",
    telephony: "HORSEMEN",
  },
  {
    airlineCode: "WHB",
    telephony: "HOSHAM AIR",
  },
  {
    airlineCode: "FTJ",
    telephony: "HU TAI",
  },
  {
    airlineCode: "HUB",
    telephony: "HUB",
  },
  {
    airlineCode: "HUB",
    telephony: "HUB",
  },
  {
    airlineCode: "HKV",
    telephony: "HUCAVEN",
  },
  {
    airlineCode: "GMH",
    telephony: "HUGHES",
  },
  {
    airlineCode: "NRW",
    telephony: "HUMMEL",
  },
  {
    airlineCode: "HMB",
    telephony: "HUMMINGBIRD",
  },
  {
    airlineCode: "HUN",
    telephony: "HUNGARIAN",
  },
  {
    airlineCode: "HUF",
    telephony: "HUNGARIAN AIRFORCE",
  },
  {
    airlineCode: "THK",
    telephony: "HUR KUS",
  },
  {
    airlineCode: "JVE",
    telephony: "HURON",
  },
  {
    airlineCode: "HUR",
    telephony: "HURRICANE CHARTER",
  },
  {
    airlineCode: "FMG",
    telephony: "HUSKY",
  },
  {
    airlineCode: "HZR",
    telephony: "HUZAR",
  },
  {
    airlineCode: "HZM",
    telephony: "HUZIMA",
  },
  {
    airlineCode: "HYD",
    telephony: "HYDRO",
  },
  {
    airlineCode: "HYC",
    telephony: "HYDRO CARGO",
  },
  {
    airlineCode: "HYP",
    telephony: "HYPERION",
  },
  {
    airlineCode: "IJA",
    telephony: "I-JET",
  },
  {
    airlineCode: "IBS",
    telephony: "IBEREXPRES",
  },
  {
    airlineCode: "IBE",
    telephony: "IBERIA",
  },
  {
    airlineCode: "IBJ",
    telephony: "IBERTAXI",
  },
  {
    airlineCode: "IBR",
    telephony: "IBERTOUR",
  },
  {
    airlineCode: "IWD",
    telephony: "IBERWORLD",
  },
  {
    airlineCode: "IBX",
    telephony: "IBEX",
  },
  {
    airlineCode: "IBC",
    telephony: "IBEX CHARTER",
  },
  {
    airlineCode: "PHH",
    telephony: "IBIS",
  },
  {
    airlineCode: "IAN",
    telephony: "IBOM",
  },
  {
    airlineCode: "ICD",
    telephony: "ICARO",
  },
  {
    airlineCode: "ICR",
    telephony: "ICARUS FLIGHTS",
  },
  {
    airlineCode: "IBG",
    telephony: "ICE BRIDGE",
  },
  {
    airlineCode: "ICE",
    telephony: "ICEAIR",
  },
  {
    airlineCode: "ICG",
    telephony: "ICELAND COAST",
  },
  {
    airlineCode: "ICN",
    telephony: "ICONAIR",
  },
  {
    airlineCode: "IFM",
    telephony: "ICOPTER",
  },
  {
    airlineCode: "IDD",
    telephony: "IDA",
  },
  {
    airlineCode: "IDT",
    telephony: "IDOT",
  },
  {
    airlineCode: "IFJ",
    telephony: "IFAJET",
  },
  {
    airlineCode: "IGO",
    telephony: "IFLY",
  },
  {
    airlineCode: "IFX",
    telephony: "IFTA",
  },
  {
    airlineCode: "MUT",
    telephony: "IGAVIA",
  },
  {
    airlineCode: "IGA",
    telephony: "IGUANA",
  },
  {
    airlineCode: "KAR",
    telephony: "IKAR",
  },
  {
    airlineCode: "IKR",
    telephony: "IKAROS",
  },
  {
    airlineCode: "IKK",
    telephony: "IKIAIR",
  },
  {
    airlineCode: "ILA",
    telephony: "ILAN ARAD",
  },
  {
    airlineCode: "ILK",
    telephony: "ILEK",
  },
  {
    airlineCode: "IAR",
    telephony: "ILIAMNA AIR",
  },
  {
    airlineCode: "ILU",
    telephony: "ILLINI",
  },
  {
    airlineCode: "IMS",
    telephony: "IMAGES",
  },
  {
    airlineCode: "IMG",
    telephony: "IMAGINE",
  },
  {
    airlineCode: "IAL",
    telephony: "IMATONG",
  },
  {
    airlineCode: "IMI",
    telephony: "IMPERIALAEREO",
  },
  {
    airlineCode: "IMT",
    telephony: "IMTREC",
  },
  {
    airlineCode: "IEK",
    telephony: "INAER EUSKADI",
  },
  {
    airlineCode: "ING",
    telephony: "INAER GALICIA",
  },
  {
    airlineCode: "INR",
    telephony: "INAER HELICOPTEROS",
  },
  {
    airlineCode: "IOF",
    telephony: "INAER OFFSHORE",
  },
  {
    airlineCode: "TNI",
    telephony: "INCA",
  },
  {
    airlineCode: "ICF",
    telephony: "INCHARTER",
  },
  {
    airlineCode: "IIL",
    telephony: "INDIA INTER",
  },
  {
    airlineCode: "IFC",
    telephony: "INDIAN AIRFORCE",
  },
  {
    airlineCode: "IDG",
    telephony: "INDIGO",
  },
  {
    airlineCode: "MYU",
    telephony: "INDO",
  },
  {
    airlineCode: "IDO",
    telephony: "INDOKHMER",
  },
  {
    airlineCode: "GIA",
    telephony: "INDONESIA",
  },
  {
    airlineCode: "INM",
    telephony: "INDUCA",
  },
  {
    airlineCode: "FFI",
    telephony: "INFINIT",
  },
  {
    airlineCode: "IFG",
    telephony: "INFINITY",
  },
  {
    airlineCode: "ZIZ",
    telephony: "INFORMACION",
  },
  {
    airlineCode: "XLT",
    telephony: "INFRAERO",
  },
  {
    airlineCode: "INI",
    telephony: "INITIUM",
  },
  {
    airlineCode: "ILN",
    telephony: "INLINE",
  },
  {
    airlineCode: "INC",
    telephony: "INSELAIR",
  },
  {
    airlineCode: "CAA",
    telephony: "INSPECTOR",
  },
  {
    airlineCode: "INU",
    telephony: "INSTRUCTOR",
  },
  {
    airlineCode: "ITI",
    telephony: "INTAIRLINE",
  },
  {
    airlineCode: "INT",
    telephony: "INTEGRA",
  },
  {
    airlineCode: "NTG",
    telephony: "INTEGRALES",
  },
  {
    airlineCode: "IIC",
    telephony: "INTER AIR",
  },
  {
    airlineCode: "FFF",
    telephony: "INTER FREEDOM",
  },
  {
    airlineCode: "IIA",
    telephony: "INTER ILES",
  },
  {
    airlineCode: "AOR",
    telephony: "INTER-AFRO",
  },
  {
    airlineCode: "ICM",
    telephony: "INTER-CAMEROUN",
  },
  {
    airlineCode: "IMA",
    telephony: "INTER-MOUNTAIN",
  },
  {
    airlineCode: "ITS",
    telephony: "INTER-STATE",
  },
  {
    airlineCode: "INB",
    telephony: "INTERBUILD",
  },
  {
    airlineCode: "ICY",
    telephony: "INTERCITY",
  },
  {
    airlineCode: "ICH",
    telephony: "INTERCONTINENTAL",
  },
  {
    airlineCode: "TTD",
    telephony: "INTERESTATALES",
  },
  {
    airlineCode: "IFF",
    telephony: "INTERFREIGHTER",
  },
  {
    airlineCode: "DOI",
    telephony: "INTERIOR",
  },
  {
    airlineCode: "MTF",
    telephony: "INTERJET",
  },
  {
    airlineCode: "ITK",
    telephony: "INTERLINK",
  },
  {
    airlineCode: "RIF",
    telephony: "INTERMIN AVIA",
  },
  {
    airlineCode: "TPL",
    telephony: "INTERPILOT",
  },
  {
    airlineCode: "IPT",
    telephony: "INTERPORT",
  },
  {
    airlineCode: "NSK",
    telephony: "INTERSALONIKA",
  },
  {
    airlineCode: "IDA",
    telephony: "INTRA",
  },
  {
    airlineCode: "ITH",
    telephony: "INTRANS NIGERIA",
  },
  {
    airlineCode: "AIE",
    telephony: "INUIT",
  },
  {
    airlineCode: "IMO",
    telephony: "INVERMOCA",
  },
  {
    airlineCode: "IPL",
    telephony: "IPULL",
  },
  {
    airlineCode: "IQP",
    telephony: "IQRA PAKISTAN",
  },
  {
    airlineCode: "IAE",
    telephony: "IRAERO",
  },
  {
    airlineCode: "IRA",
    telephony: "IRANAIR",
  },
  {
    airlineCode: "FBA",
    telephony: "IRAQ EXPRESS",
  },
  {
    airlineCode: "IAW",
    telephony: "IRAQI",
  },
  {
    airlineCode: "IPF",
    telephony: "IRAQI PRESIDENTIAL FLIGHT",
  },
  {
    airlineCode: "IRL",
    telephony: "IRISH",
  },
  {
    airlineCode: "IRO",
    telephony: "IRON AIR",
  },
  {
    airlineCode: "IGS",
    telephony: "ISLA GRANDE",
  },
  {
    airlineCode: "ISA",
    telephony: "ISLAND",
  },
  {
    airlineCode: "IDC",
    telephony: "ISLAND DEV",
  },
  {
    airlineCode: "EXP",
    telephony: "ISLAND EXPRESS",
  },
  {
    airlineCode: "ILF",
    telephony: "ISLAND FLIGHT",
  },
  {
    airlineCode: "IAV",
    telephony: "ISLAND FLYER",
  },
  {
    airlineCode: "ABZ",
    telephony: "ISLAND LIFEFLIGHT",
  },
  {
    airlineCode: "IOE",
    telephony: "ISLAND OIL",
  },
  {
    airlineCode: "ITM",
    telephony: "ISLAND TYME",
  },
  {
    airlineCode: "ISI",
    telephony: "ISLANDMEX",
  },
  {
    airlineCode: "IWY",
    telephony: "ISLANDWAYS",
  },
  {
    airlineCode: "IOM",
    telephony: "ISLE AVIA",
  },
  {
    airlineCode: "ISR",
    telephony: "ISRAIR",
  },
  {
    airlineCode: "ITL",
    telephony: "ITALFLY",
  },
  {
    airlineCode: "IAM",
    telephony: "ITALIAN AIRFORCE",
  },
  {
    airlineCode: "IEI",
    telephony: "ITALIAN ARMY",
  },
  {
    airlineCode: "GCI",
    telephony: "ITALIAN COAST GUARD",
  },
  {
    airlineCode: "MMI",
    telephony: "ITALIAN NAVY",
  },
  {
    airlineCode: "GPX",
    telephony: "IVORY",
  },
  {
    airlineCode: "ARP",
    telephony: "IVORYCORP",
  },
  {
    airlineCode: "IZA",
    telephony: "IZHAVIA",
  },
  {
    airlineCode: "IZM",
    telephony: "IZMIR",
  },
  {
    airlineCode: "JPA",
    telephony: "J-PAT",
  },
  {
    airlineCode: "JKA",
    telephony: "JACKET",
  },
  {
    airlineCode: "VVM",
    telephony: "JACKPOT",
  },
  {
    airlineCode: "KBZ",
    telephony: "JADE AIR",
  },
  {
    airlineCode: "JAE",
    telephony: "JADE CARGO",
  },
  {
    airlineCode: "PHN",
    telephony: "JADESTAR",
  },
  {
    airlineCode: "HSN",
    telephony: "JAGUAR",
  },
  {
    airlineCode: "JTA",
    telephony: "JAI OCEAN",
  },
  {
    airlineCode: "AJM",
    telephony: "JAMAICA",
  },
  {
    airlineCode: "JFE",
    telephony: "JAMAICA CARGO",
  },
  {
    airlineCode: "JMX",
    telephony: "JAMAICA EXPRESS",
  },
  {
    airlineCode: "ARW",
    telephony: "JAMAICA SHUTTLE",
  },
  {
    airlineCode: "AFJ",
    telephony: "JAMBO",
  },
  {
    airlineCode: "JAX",
    telephony: "JANAIR",
  },
  {
    airlineCode: "JAN",
    telephony: "JANES",
  },
  {
    airlineCode: "JAL",
    telephony: "JAPANAIR",
  },
  {
    airlineCode: "JAW",
    telephony: "JASMINE",
  },
  {
    airlineCode: "LEE",
    telephony: "JAVELIN",
  },
  {
    airlineCode: "GGA",
    telephony: "JAWJA",
  },
  {
    airlineCode: "PFS",
    telephony: "JAY BIRD",
  },
  {
    airlineCode: "JDA",
    telephony: "JAY DEE",
  },
  {
    airlineCode: "JMC",
    telephony: "JAYEMMSEE",
  },
  {
    airlineCode: "JCB",
    telephony: "JAYSEEBEE",
  },
  {
    airlineCode: "JZR",
    telephony: "JAZEERA",
  },
  {
    airlineCode: "JZA",
    telephony: "JAZZ",
  },
  {
    airlineCode: "JDI",
    telephony: "JEDI",
  },
  {
    airlineCode: "JJA",
    telephony: "JEJU AIR",
  },
  {
    airlineCode: "EYT",
    telephony: "JERNAS",
  },
  {
    airlineCode: "BEE",
    telephony: "JERSEY",
  },
  {
    airlineCode: "JTR",
    telephony: "JESTER",
  },
  {
    airlineCode: "JAI",
    telephony: "JET AIRWAYS",
  },
  {
    airlineCode: "JAA",
    telephony: "JET ASIA",
  },
  {
    airlineCode: "BNJ",
    telephony: "JET BELGIUM",
  },
  {
    airlineCode: "DPJ",
    telephony: "JET CARD",
  },
  {
    airlineCode: "JCT",
    telephony: "JET CHARTER",
  },
  {
    airlineCode: "JCY",
    telephony: "JET CITY",
  },
  {
    airlineCode: "JTM",
    telephony: "JET COAST",
  },
  {
    airlineCode: "JED",
    telephony: "JET EAST",
  },
  {
    airlineCode: "EDG",
    telephony: "JET EDGE",
  },
  {
    airlineCode: "JEI",
    telephony: "JET EXECUTIVE",
  },
  {
    airlineCode: "AJE",
    telephony: "JET EXPRES",
  },
  {
    airlineCode: "BJU",
    telephony: "JET EXPRESS",
  },
  {
    airlineCode: "JIT",
    telephony: "JET IT",
  },
  {
    airlineCode: "KBD",
    telephony: "JET KEY",
  },
  {
    airlineCode: "JTL",
    telephony: "JET LINX",
  },
  {
    airlineCode: "JMK",
    telephony: "JET MAGIC",
  },
  {
    airlineCode: "IJM",
    telephony: "JET MANAGEMENT",
  },
  {
    airlineCode: "AJR",
    telephony: "JET MONGOLIA",
  },
  {
    airlineCode: "JEP",
    telephony: "JET PERSONALES",
  },
  {
    airlineCode: "SJS",
    telephony: "JET PORT",
  },
  {
    airlineCode: "JRY",
    telephony: "JET READY",
  },
  {
    airlineCode: "MJS",
    telephony: "JET SAVER",
  },
  {
    airlineCode: "JAS",
    telephony: "JET SETTER",
  },
  {
    airlineCode: "VYE",
    telephony: "JET SOLUTIONS",
  },
  {
    airlineCode: "EJM",
    telephony: "JET SPEED",
  },
  {
    airlineCode: "JTN",
    telephony: "JET TEST",
  },
  {
    airlineCode: "TVP",
    telephony: "JET TRAVEL",
  },
  {
    airlineCode: "JUS",
    telephony: "JET USA",
  },
  {
    airlineCode: "IJW",
    telephony: "JET WEST",
  },
  {
    airlineCode: "ENE",
    telephony: "JET-ENER",
  },
  {
    airlineCode: "JOE",
    telephony: "JET-EUROPE",
  },
  {
    airlineCode: "JEA",
    telephony: "JETA",
  },
  {
    airlineCode: "ODM",
    telephony: "JETAFRICA",
  },
  {
    airlineCode: "JRC",
    telephony: "JETAIR",
  },
  {
    airlineCode: "PJS",
    telephony: "JETAVIATION",
  },
  {
    airlineCode: "JBC",
    telephony: "JETBEE",
  },
  {
    airlineCode: "PRW",
    telephony: "JETBIRD",
  },
  {
    airlineCode: "JBU",
    telephony: "JETBLUE",
  },
  {
    airlineCode: "IMD",
    telephony: "JETBULL",
  },
  {
    airlineCode: "CJL",
    telephony: "JETBUS",
  },
  {
    airlineCode: "JCL",
    telephony: "JETCALL",
  },
  {
    airlineCode: "JTI",
    telephony: "JETCLIPPER",
  },
  {
    airlineCode: "UEJ",
    telephony: "JETCORP",
  },
  {
    airlineCode: "JTE",
    telephony: "JETEX",
  },
  {
    airlineCode: "JEF",
    telephony: "JETFLITE",
  },
  {
    airlineCode: "JGB",
    telephony: "JETGLOBAL",
  },
  {
    airlineCode: "JGO",
    telephony: "JETGO",
  },
  {
    airlineCode: "ETI",
    telephony: "JETHAWK",
  },
  {
    airlineCode: "JKH",
    telephony: "JETKONTOR",
  },
  {
    airlineCode: "JLN",
    telephony: "JETLINE",
  },
  {
    airlineCode: "JLF",
    telephony: "JETLYFT",
  },
  {
    airlineCode: "JME",
    telephony: "JETMAN",
  },
  {
    airlineCode: "JNL",
    telephony: "JETNETHERLANDS",
  },
  {
    airlineCode: "JNV",
    telephony: "JETNOVA",
  },
  {
    airlineCode: "JPN",
    telephony: "JETPLAN",
  },
  {
    airlineCode: "JPS",
    telephony: "JETPLUS",
  },
  {
    airlineCode: "JPO",
    telephony: "JETPRO",
  },
  {
    airlineCode: "JRT",
    telephony: "JETRIGHT",
  },
  {
    airlineCode: "VOS",
    telephony: "JETSAL",
  },
  {
    airlineCode: "JTS",
    telephony: "JETSERVICE",
  },
  {
    airlineCode: "JST",
    telephony: "JETSTAR",
  },
  {
    airlineCode: "JSA",
    telephony: "JETSTAR ASIA",
  },
  {
    airlineCode: "JSN",
    telephony: "JETSUN",
  },
  {
    airlineCode: "JWX",
    telephony: "JETWAYS",
  },
  {
    airlineCode: "SJO",
    telephony: "JEY SPRING",
  },
  {
    airlineCode: "JLB",
    telephony: "JHONLIN",
  },
  {
    airlineCode: "JSW",
    telephony: "JIGSAW",
  },
  {
    airlineCode: "JNA",
    telephony: "JIN AIR",
  },
  {
    airlineCode: "QJT",
    telephony: "JIU TIAN",
  },
  {
    airlineCode: "JIV",
    telephony: "JIV AIR",
  },
  {
    airlineCode: "JOB",
    telephony: "JOBENI",
  },
  {
    airlineCode: "JKY",
    telephony: "JOCKEY",
  },
  {
    airlineCode: "JDC",
    telephony: "JOHN DEERE",
  },
  {
    airlineCode: "JMM",
    telephony: "JOICOMAIR",
  },
  {
    airlineCode: "JKR",
    telephony: "JOKER",
  },
  {
    airlineCode: "JNH",
    telephony: "JONAH",
  },
  {
    airlineCode: "JNK",
    telephony: "JONIKA",
  },
  {
    airlineCode: "JON",
    telephony: "JOON",
  },
  {
    airlineCode: "RJZ",
    telephony: "JORDAN AIR FORCE",
  },
  {
    airlineCode: "JAV",
    telephony: "JORDAN AVIATION",
  },
  {
    airlineCode: "RJA",
    telephony: "JORDANIAN",
  },
  {
    airlineCode: "JOY",
    telephony: "JOY AIR",
  },
  {
    airlineCode: "JSJ",
    telephony: "JS CHARTER",
  },
  {
    airlineCode: "JUC",
    telephony: "JUBA CARGO",
  },
  {
    airlineCode: "JUB",
    telephony: "JUBBA",
  },
  {
    airlineCode: "JUP",
    telephony: "JUMP AIR",
  },
  {
    airlineCode: "JMP",
    telephony: "JUMP RUN",
  },
  {
    airlineCode: "JPR",
    telephony: "JUMPER",
  },
  {
    airlineCode: "JSY",
    telephony: "JUNG SKY",
  },
  {
    airlineCode: "JKN",
    telephony: "JUNKANOO AIR",
  },
  {
    airlineCode: "JIS",
    telephony: "JUPAIR",
  },
  {
    airlineCode: "JUA",
    telephony: "JUPITER GAMBIA",
  },
  {
    airlineCode: "JPJ",
    telephony: "JUPITERJET",
  },
  {
    airlineCode: "DOJ",
    telephony: "JUSTICE",
  },
  {
    airlineCode: "JUT",
    telephony: "JUTLAND",
  },
  {
    airlineCode: "KSU",
    telephony: "K-STATE",
  },
  {
    airlineCode: "CVE",
    telephony: "KABEX",
  },
  {
    airlineCode: "KBN",
    telephony: "KABIN",
  },
  {
    airlineCode: "QNK",
    telephony: "KABO",
  },
  {
    airlineCode: "KBL",
    telephony: "KABUL AIR",
  },
  {
    airlineCode: "KCE",
    telephony: "KACEY",
  },
  {
    airlineCode: "KAI",
    telephony: "KAISER",
  },
  {
    airlineCode: "JKT",
    telephony: "KAITAK",
  },
  {
    airlineCode: "KDS",
    telephony: "KALEO",
  },
  {
    airlineCode: "KFS",
    telephony: "KALITTA",
  },
  {
    airlineCode: "KMK",
    telephony: "KAMAKA",
  },
  {
    airlineCode: "KMF",
    telephony: "KAMGAR",
  },
  {
    airlineCode: "KYY",
    telephony: "KAMOZ",
  },
  {
    airlineCode: "TTA",
    telephony: "KANIMANBO",
  },
  {
    airlineCode: "KND",
    telephony: "KANNITHI AIR",
  },
  {
    airlineCode: "KAN",
    telephony: "KANSAS",
  },
  {
    airlineCode: "KJE",
    telephony: "KAPAJET",
  },
  {
    airlineCode: "KLG",
    telephony: "KARLOG",
  },
  {
    airlineCode: "KAJ",
    telephony: "KARTHAGO",
  },
  {
    airlineCode: "KRU",
    telephony: "KARUN",
  },
  {
    airlineCode: "KTV",
    telephony: "KATAVIA",
  },
  {
    airlineCode: "KWX",
    telephony: "KAY DUB",
  },
  {
    airlineCode: "KUR",
    telephony: "KAY-AVIATION",
  },
  {
    airlineCode: "KLR",
    telephony: "KAY-LER",
  },
  {
    airlineCode: "KMI",
    telephony: "KAY-MILE AIR",
  },
  {
    airlineCode: "KAY",
    telephony: "KAYAK",
  },
  {
    airlineCode: "KEJ",
    telephony: "KAZAIRJET",
  },
  {
    airlineCode: "KZN",
    telephony: "KAZANAIR",
  },
  {
    airlineCode: "KAZ",
    telephony: "KAZLUX",
  },
  {
    airlineCode: "KLX",
    telephony: "KELIX",
  },
  {
    airlineCode: "JLX",
    telephony: "KEN JET",
  },
  {
    airlineCode: "KNY",
    telephony: "KENLEY",
  },
  {
    airlineCode: "KEN",
    telephony: "KENMORE",
  },
  {
    airlineCode: "KSF",
    telephony: "KENT",
  },
  {
    airlineCode: "AVH",
    telephony: "KENT HELI",
  },
  {
    airlineCode: "KQA",
    telephony: "KENYA",
  },
  {
    airlineCode: "KER",
    telephony: "KERMAS",
  },
  {
    airlineCode: "KEY",
    telephony: "KEY AIR",
  },
  {
    airlineCode: "LYM",
    telephony: "KEY LIME",
  },
  {
    airlineCode: "KHF",
    telephony: "KHABAROVSK",
  },
  {
    airlineCode: "KZW",
    telephony: "KHALIFA AIR",
  },
  {
    airlineCode: "KHT",
    telephony: "KHATLON",
  },
  {
    airlineCode: "KHR",
    telephony: "KHAZAR",
  },
  {
    airlineCode: "KRV",
    telephony: "KHORIV-AVIA",
  },
  {
    airlineCode: "KHY",
    telephony: "KHYBER",
  },
  {
    airlineCode: "KNT",
    telephony: "KINETIC",
  },
  {
    airlineCode: "HAN",
    telephony: "KING BEE",
  },
  {
    airlineCode: "KIC",
    telephony: "KING COBRA",
  },
  {
    airlineCode: "KST",
    telephony: "KING STAR",
  },
  {
    airlineCode: "KNM",
    telephony: "KINGDOM",
  },
  {
    airlineCode: "KFR",
    telephony: "KINGFISHER",
  },
  {
    airlineCode: "STJ",
    telephony: "KINGSMAN",
  },
  {
    airlineCode: "KIN",
    telephony: "KINLOSS",
  },
  {
    airlineCode: "KIP",
    telephony: "KINNARPS",
  },
  {
    airlineCode: "KNZ",
    telephony: "KINZE",
  },
  {
    airlineCode: "KRT",
    telephony: "KIRKNEWTON",
  },
  {
    airlineCode: "KIS",
    telephony: "KISH AIR",
  },
  {
    airlineCode: "KSI",
    telephony: "KISSARI",
  },
  {
    airlineCode: "GFD",
    telephony: "KITE",
  },
  {
    airlineCode: "RRF",
    telephony: "KITTY",
  },
  {
    airlineCode: "KRF",
    telephony: "KITTYHAWK",
  },
  {
    airlineCode: "KIW",
    telephony: "KIWI",
  },
  {
    airlineCode: "KRC",
    telephony: "KIWI RESCUE",
  },
  {
    airlineCode: "KLM",
    telephony: "KLM",
  },
  {
    airlineCode: "KLM",
    telephony: "KLM",
  },
  {
    airlineCode: "KGT",
    telephony: "KNIGHT-LINER",
  },
  {
    airlineCode: "KTL",
    telephony: "KNOTTSBERRY",
  },
  {
    airlineCode: "KOA",
    telephony: "KOANDA",
  },
  {
    airlineCode: "KCU",
    telephony: "KOCOGLU",
  },
  {
    airlineCode: "OYE",
    telephony: "KODA AIR",
  },
  {
    airlineCode: "KGL",
    telephony: "KOGALYM",
  },
  {
    airlineCode: "KOK",
    telephony: "KOKO",
  },
  {
    airlineCode: "KCR",
    telephony: "KOLOB",
  },
  {
    airlineCode: "KMA",
    telephony: "KOMI AVIA",
  },
  {
    airlineCode: "KBR",
    telephony: "KORAL BLUE",
  },
  {
    airlineCode: "KVN",
    telephony: "KOREA AVIATION",
  },
  {
    airlineCode: "KEA",
    telephony: "KOREA EXPRESS",
  },
  {
    airlineCode: "KAL",
    telephony: "KOREANAIR",
  },
  {
    airlineCode: "KSV",
    telephony: "KOSFLIGHT",
  },
  {
    airlineCode: "KSM",
    telephony: "KOSMOS",
  },
  {
    airlineCode: "KMW",
    telephony: "KOSTROMA",
  },
  {
    airlineCode: "KTO",
    telephony: "KRATOS",
  },
  {
    airlineCode: "KFC",
    telephony: "KREMENCHUK",
  },
  {
    airlineCode: "KFK",
    telephony: "KRIFKA AIR",
  },
  {
    airlineCode: "FLG",
    telephony: "KRISH",
  },
  {
    airlineCode: "KRO",
    telephony: "KROONK",
  },
  {
    airlineCode: "KPO",
    telephony: "KRYPTO",
  },
  {
    airlineCode: "PNH",
    telephony: "KUBAN LIK",
  },
  {
    airlineCode: "MDO",
    telephony: "KUDA",
  },
  {
    airlineCode: "KUK",
    telephony: "KUDLIK",
  },
  {
    airlineCode: "BOA",
    telephony: "KUMANOVO",
  },
  {
    airlineCode: "FKZ",
    telephony: "KUMBA",
  },
  {
    airlineCode: "KPA",
    telephony: "KUN PENG",
  },
  {
    airlineCode: "CCI",
    telephony: "KUNGFU",
  },
  {
    airlineCode: "KNA",
    telephony: "KUNMING AIR",
  },
  {
    airlineCode: "KUH",
    telephony: "KUSH AVIATION",
  },
  {
    airlineCode: "KUS",
    telephony: "KUSWAG",
  },
  {
    airlineCode: "RGD",
    telephony: "KUWAIT CARGO",
  },
  {
    airlineCode: "KAC",
    telephony: "KUWAITI",
  },
  {
    airlineCode: "KUG",
    telephony: "KUWAITI GOV",
  },
  {
    airlineCode: "KWN",
    telephony: "KWENA",
  },
  {
    airlineCode: "FSQ",
    telephony: "KYRGYZ BIRD",
  },
  {
    airlineCode: "KGK",
    telephony: "KYRGYZ SKY",
  },
  {
    airlineCode: "RTE",
    telephony: "LA MONTANA",
  },
  {
    airlineCode: "LAB",
    telephony: "LAB",
  },
  {
    airlineCode: "LAB",
    telephony: "LAB",
  },
  {
    airlineCode: "LBQ",
    telephony: "LABQUEST",
  },
  {
    airlineCode: "LRC",
    telephony: "LACSA",
  },
  {
    airlineCode: "LAD",
    telephony: "LADCO-AIR",
  },
  {
    airlineCode: "LRB",
    telephony: "LADY RACINE",
  },
  {
    airlineCode: "LGU",
    telephony: "LAGUNA",
  },
  {
    airlineCode: "JMR",
    telephony: "LAHWINGS",
  },
  {
    airlineCode: "LKF",
    telephony: "LAKEFRONT",
  },
  {
    airlineCode: "GLA",
    telephony: "LAKES AIR",
  },
  {
    airlineCode: "GLU",
    telephony: "LAKES CARGO",
  },
  {
    airlineCode: "LMR",
    telephony: "LAMAIR",
  },
  {
    airlineCode: "LMD",
    telephony: "LAMIA",
  },
  {
    airlineCode: "LTZ",
    telephony: "LAMINAR",
  },
  {
    airlineCode: "DSM",
    telephony: "LAN AR",
  },
  {
    airlineCode: "LCO",
    telephony: "LAN CARGO",
  },
  {
    airlineCode: "LAN",
    telephony: "LAN CHILE",
  },
  {
    airlineCode: "ARE",
    telephony: "LAN COLOMBIA",
  },
  {
    airlineCode: "LCC",
    telephony: "LANCAIR",
  },
  {
    airlineCode: "LMK",
    telephony: "LANDMARK",
  },
  {
    airlineCode: "LXP",
    telephony: "LANEX",
  },
  {
    airlineCode: "LFR",
    telephony: "LANFREIGHT",
  },
  {
    airlineCode: "PAH",
    telephony: "LANI",
  },
  {
    airlineCode: "LPE",
    telephony: "LANPERU",
  },
  {
    airlineCode: "LAO",
    telephony: "LAO",
  },
  {
    airlineCode: "LAO",
    telephony: "LAO",
  },
  {
    airlineCode: "LRD",
    telephony: "LAREDO AIR",
  },
  {
    airlineCode: "ELH",
    telephony: "LARIO",
  },
  {
    airlineCode: "NQN",
    telephony: "LASA",
  },
  {
    airlineCode: "LER",
    telephony: "LASER",
  },
  {
    airlineCode: "OTN",
    telephony: "LASTP",
  },
  {
    airlineCode: "LAQ",
    telephony: "LAT",
  },
  {
    airlineCode: "BAQ",
    telephony: "LAT CARGO",
  },
  {
    airlineCode: "LAF",
    telephony: "LATVIAN AIRFORCE",
  },
  {
    airlineCode: "LDM",
    telephony: "LAUDA MOTION",
  },
  {
    airlineCode: "LDX",
    telephony: "LAUDA RUSH",
  },
  {
    airlineCode: "LLL",
    telephony: "LAVIE",
  },
  {
    airlineCode: "LAR",
    telephony: "LAWRENCE",
  },
  {
    airlineCode: "LAY",
    telephony: "LAYANG",
  },
  {
    airlineCode: "LEA",
    telephony: "LEADAIR",
  },
  {
    airlineCode: "GUC",
    telephony: "LEAF AIR",
  },
  {
    airlineCode: "LPA",
    telephony: "LEAP",
  },
  {
    airlineCode: "LPL",
    telephony: "LEASE-A-PLANE",
  },
  {
    airlineCode: "LAT",
    telephony: "LEBANESE AIR",
  },
  {
    airlineCode: "LSY",
    telephony: "LEBANON SKY",
  },
  {
    airlineCode: "LEB",
    telephony: "LEBAP",
  },
  {
    airlineCode: "LEC",
    telephony: "LECA",
  },
  {
    airlineCode: "LCA",
    telephony: "LECONTE",
  },
  {
    airlineCode: "LEP",
    telephony: "LECOSTA",
  },
  {
    airlineCode: "AJV",
    telephony: "LEE JET",
  },
  {
    airlineCode: "LEG",
    telephony: "LEGACY",
  },
  {
    airlineCode: "LGC",
    telephony: "LEGACY AIR",
  },
  {
    airlineCode: "LGF",
    telephony: "LEGACY FREIGHT",
  },
  {
    airlineCode: "AXY",
    telephony: "LEGEND",
  },
  {
    airlineCode: "GWR",
    telephony: "LEMON",
  },
  {
    airlineCode: "LEM",
    telephony: "LEMPIRAS",
  },
  {
    airlineCode: "LEN",
    telephony: "LENTINI",
  },
  {
    airlineCode: "LOR",
    telephony: "LEO CHARTER",
  },
  {
    airlineCode: "LOA",
    telephony: "LEOAIR TRAINER",
  },
  {
    airlineCode: "LEL",
    telephony: "LEONAVIA",
  },
  {
    airlineCode: "LPD",
    telephony: "LEOPARD",
  },
  {
    airlineCode: "LST",
    telephony: "LESORTEC",
  },
  {
    airlineCode: "LTF",
    telephony: "LETS FLY",
  },
  {
    airlineCode: "LLY",
    telephony: "LETSY",
  },
  {
    airlineCode: "LCS",
    telephony: "LEUCHARS",
  },
  {
    airlineCode: "LEX",
    telephony: "LEXAIR",
  },
  {
    airlineCode: "LSJ",
    telephony: "LIAISON",
  },
  {
    airlineCode: "CUA",
    telephony: "LIANHANG",
  },
  {
    airlineCode: "LIA",
    telephony: "LIAT",
  },
  {
    airlineCode: "LAA",
    telephony: "LIBAIR",
  },
  {
    airlineCode: "LIB",
    telephony: "LIBELLE",
  },
  {
    airlineCode: "FDM",
    telephony: "LIBERTY",
  },
  {
    airlineCode: "LRT",
    telephony: "LIBERTY JET",
  },
  {
    airlineCode: "LBF",
    telephony: "LIBYAN AIRFORCE",
  },
  {
    airlineCode: "LBB",
    telephony: "LIBYAN BLUE BIRD",
  },
  {
    airlineCode: "LWA",
    telephony: "LIBYAN WINGS",
  },
  {
    airlineCode: "LXX",
    telephony: "LIBYANEXPRESS",
  },
  {
    airlineCode: "LFE",
    telephony: "LIFE AIR",
  },
  {
    airlineCode: "LFL",
    telephony: "LIFE FLIGHT",
  },
  {
    airlineCode: "LIF",
    telephony: "LIFECARE",
  },
  {
    airlineCode: "SLG",
    telephony: "LIFEGUARD",
  },
  {
    airlineCode: "HMF",
    telephony: "LIFEGUARD SWEDEN",
  },
  {
    airlineCode: "LJT",
    telephony: "LIFEJET",
  },
  {
    airlineCode: "LTA",
    telephony: "LIFT",
  },
  {
    airlineCode: "HVY",
    telephony: "LIFT PERU",
  },
  {
    airlineCode: "EMJ",
    telephony: "LIGHT HOUSE",
  },
  {
    airlineCode: "LNG",
    telephony: "LIGHTNING",
  },
  {
    airlineCode: "LTD",
    telephony: "LIGHTSPEED",
  },
  {
    airlineCode: "LIL",
    telephony: "LILIES",
  },
  {
    airlineCode: "LME",
    telephony: "LIMAIR EXPRESS",
  },
  {
    airlineCode: "GCB",
    telephony: "LINACONGO",
  },
  {
    airlineCode: "GJS",
    telephony: "LINDBERGH",
  },
  {
    airlineCode: "LCM",
    telephony: "LINEAS COMERCIALES",
  },
  {
    airlineCode: "RDC",
    telephony: "LINEAS DELCENTRO",
  },
  {
    airlineCode: "EDD",
    telephony: "LINEAS DURANGO",
  },
  {
    airlineCode: "HUC",
    telephony: "LINEAS TEHUACAN",
  },
  {
    airlineCode: "HTK",
    telephony: "LINGBIRD",
  },
  {
    airlineCode: "LNK",
    telephony: "LINK",
  },
  {
    airlineCode: "FJA",
    telephony: "LINK FIJI",
  },
  {
    airlineCode: "ARK",
    telephony: "LINK SERVICE",
  },
  {
    airlineCode: "LDS",
    telephony: "LINSUR",
  },
  {
    airlineCode: "LOP",
    telephony: "LINTON",
  },
  {
    airlineCode: "LNI",
    telephony: "LION INTER",
  },
  {
    airlineCode: "LIO",
    telephony: "LIONEL",
  },
  {
    airlineCode: "LAS",
    telephony: "LIONS HELICOPTER",
  },
  {
    airlineCode: "LEU",
    telephony: "LIONSAIR",
  },
  {
    airlineCode: "LIP",
    telephony: "LIPIZAN",
  },
  {
    airlineCode: "LIR",
    telephony: "LISLINE",
  },
  {
    airlineCode: "JLL",
    telephony: "LITE JET",
  },
  {
    airlineCode: "LYF",
    telephony: "LITHUANIAN AIRFORCE",
  },
  {
    airlineCode: "LJC",
    telephony: "LITTLE JET",
  },
  {
    airlineCode: "VVD",
    telephony: "LIVERBIRD",
  },
  {
    airlineCode: "PSF",
    telephony: "LIZARD",
  },
  {
    airlineCode: "LLB",
    telephony: "LLOYDAEREO",
  },
  {
    airlineCode: "VVA",
    telephony: "LOAD SHARK",
  },
  {
    airlineCode: "LBA",
    telephony: "LOBAYE",
  },
  {
    airlineCode: "LOC",
    telephony: "LOCAIR",
  },
  {
    airlineCode: "LAC",
    telephony: "LOCKHEED",
  },
  {
    airlineCode: "LGA",
    telephony: "LOGAIR",
  },
  {
    airlineCode: "LOG",
    telephony: "LOGAN",
  },
  {
    airlineCode: "JLG",
    telephony: "LOGISTICS",
  },
  {
    airlineCode: "LOJ",
    telephony: "LOJY AIR",
  },
  {
    airlineCode: "LMS",
    telephony: "LOMAS",
  },
  {
    airlineCode: "EOA",
    telephony: "LOMBARDA",
  },
  {
    airlineCode: "LCY",
    telephony: "LONDON CITY",
  },
  {
    airlineCode: "LHC",
    telephony: "LONDON EYE",
  },
  {
    airlineCode: "LNX",
    telephony: "LONEX",
  },
  {
    airlineCode: "MSB",
    telephony: "LONG",
  },
  {
    airlineCode: "ORA",
    telephony: "LONG ISLAND",
  },
  {
    airlineCode: "GGC",
    telephony: "LONG-HAUL",
  },
  {
    airlineCode: "LHN",
    telephony: "LONGHORN",
  },
  {
    airlineCode: "LGT",
    telephony: "LONGTAIL",
  },
  {
    airlineCode: "LVW",
    telephony: "LONGVIEW",
  },
  {
    airlineCode: "CDC",
    telephony: "LOONG AIR",
  },
  {
    airlineCode: "LRR",
    telephony: "LORRAINE",
  },
  {
    airlineCode: "LOS",
    telephony: "LOSSIE",
  },
  {
    airlineCode: "LOT",
    telephony: "LOT",
  },
  {
    airlineCode: "LOT",
    telephony: "LOT",
  },
  {
    airlineCode: "TAS",
    telephony: "LOTUS FLOWER",
  },
  {
    airlineCode: "CUH",
    telephony: "LOULAN",
  },
  {
    airlineCode: "LOX",
    telephony: "LOX JET",
  },
  {
    airlineCode: "RLY",
    telephony: "LOYAUTE",
  },
  {
    airlineCode: "LKE",
    telephony: "LUCKY AIR",
  },
  {
    airlineCode: "LFO",
    telephony: "LUFO",
  },
  {
    airlineCode: "LTR",
    telephony: "LUFT TRANSPORT",
  },
  {
    airlineCode: "DLH",
    telephony: "LUFTHANSA",
  },
  {
    airlineCode: "GEC",
    telephony: "LUFTHANSA CARGO",
  },
  {
    airlineCode: "LHT",
    telephony: "LUFTHANSA TECHNIK",
  },
  {
    airlineCode: "LUT",
    telephony: "LUGO",
  },
  {
    airlineCode: "LKA",
    telephony: "LUKE AIR",
  },
  {
    airlineCode: "LUK",
    telephony: "LUKOIL",
  },
  {
    airlineCode: "LWI",
    telephony: "LUMI",
  },
  {
    airlineCode: "AYY",
    telephony: "LUPUS",
  },
  {
    airlineCode: "LXM",
    telephony: "LUQA",
  },
  {
    airlineCode: "LXG",
    telephony: "LUX AVIATION",
  },
  {
    airlineCode: "LRQ",
    telephony: "LUX RESCUE",
  },
  {
    airlineCode: "LGL",
    telephony: "LUXAIR",
  },
  {
    airlineCode: "MLM",
    telephony: "LUXMALTA",
  },
  {
    airlineCode: "ALU",
    telephony: "LUXORJET",
  },
  {
    airlineCode: "LXC",
    telephony: "LUXVAN",
  },
  {
    airlineCode: "LWG",
    telephony: "LUXWING",
  },
  {
    airlineCode: "SLZ",
    telephony: "LUZA",
  },
  {
    airlineCode: "LYD",
    telephony: "LYDDAIR",
  },
  {
    airlineCode: "LCH",
    telephony: "LYNCH AIR",
  },
  {
    airlineCode: "LYC",
    telephony: "LYNDEN",
  },
  {
    airlineCode: "LXF",
    telephony: "LYNX FLIGHT",
  },
  {
    airlineCode: "LXS",
    telephony: "LYNX SERVICIOS",
  },
  {
    airlineCode: "MBF",
    telephony: "MABE FLIGHTS",
  },
  {
    airlineCode: "MBC",
    telephony: "MABECO",
  },
  {
    airlineCode: "MAQ",
    telephony: "MAC AVIATION",
  },
  {
    airlineCode: "MMJ",
    telephony: "MACAUJET",
  },
  {
    airlineCode: "MCW",
    telephony: "MACHINE WORKS",
  },
  {
    airlineCode: "MDK",
    telephony: "MADIKWE",
  },
  {
    airlineCode: "MJT",
    telephony: "MADJET",
  },
  {
    airlineCode: "MGA",
    telephony: "MAG AVIACION",
  },
  {
    airlineCode: "MGE",
    telephony: "MAGELLAN",
  },
  {
    airlineCode: "UKI",
    telephony: "MAGENTA",
  },
  {
    airlineCode: "RYS",
    telephony: "MAGIC SUN",
  },
  {
    airlineCode: "MAG",
    telephony: "MAGMA",
  },
  {
    airlineCode: "MSJ",
    telephony: "MAGNUM AIR",
  },
  {
    airlineCode: "MGP",
    telephony: "MAGPIE",
  },
  {
    airlineCode: "MHO",
    telephony: "MAHALO",
  },
  {
    airlineCode: "IRM",
    telephony: "MAHAN AIR",
  },
  {
    airlineCode: "MZS",
    telephony: "MAHFOOZ",
  },
  {
    airlineCode: "HGM",
    telephony: "MAHSURI",
  },
  {
    airlineCode: "AZD",
    telephony: "MAILMAN",
  },
  {
    airlineCode: "MAT",
    telephony: "MAINE-AV",
  },
  {
    airlineCode: "MNU",
    telephony: "MAINER",
  },
  {
    airlineCode: "FYW",
    telephony: "MAISBRASIL",
  },
  {
    airlineCode: "MJN",
    telephony: "MAJAN",
  },
  {
    airlineCode: "MJA",
    telephony: "MAJARA",
  },
  {
    airlineCode: "MME",
    telephony: "MAJESTIC AIR",
  },
  {
    airlineCode: "MJI",
    telephony: "MAJESTIC JET",
  },
  {
    airlineCode: "MJR",
    telephony: "MAJOR",
  },
  {
    airlineCode: "MAK",
    telephony: "MAKLEE",
  },
  {
    airlineCode: "IML",
    telephony: "MAL AIR",
  },
  {
    airlineCode: "ESA",
    telephony: "MALAGAIR",
  },
  {
    airlineCode: "AML",
    telephony: "MALAWI",
  },
  {
    airlineCode: "MLX",
    telephony: "MALAWI EXPRESS",
  },
  {
    airlineCode: "MWI",
    telephony: "MALAWIAN",
  },
  {
    airlineCode: "MAS",
    telephony: "MALAYSIAN",
  },
  {
    airlineCode: "MLT",
    telephony: "MALETH",
  },
  {
    airlineCode: "MAE",
    telephony: "MALI AIREXPRESS",
  },
  {
    airlineCode: "MLU",
    telephony: "MALI LOSINJ",
  },
  {
    airlineCode: "MXD",
    telephony: "MALINDO",
  },
  {
    airlineCode: "MMO",
    telephony: "MALIT",
  },
  {
    airlineCode: "MLS",
    telephony: "MALL-AIRWAYS",
  },
  {
    airlineCode: "MLL",
    telephony: "MALLORCA",
  },
  {
    airlineCode: "MAD",
    telephony: "MALONE",
  },
  {
    airlineCode: "LYX",
    telephony: "MALTA CAT",
  },
  {
    airlineCode: "JML",
    telephony: "MALTA JET",
  },
  {
    airlineCode: "DCW",
    telephony: "MALTA STAR",
  },
  {
    airlineCode: "MWS",
    telephony: "MALTA WINGS",
  },
  {
    airlineCode: "MSU",
    telephony: "MALUTI SKY",
  },
  {
    airlineCode: "OML",
    telephony: "MAMBRA",
  },
  {
    airlineCode: "MLB",
    telephony: "MANAF",
  },
  {
    airlineCode: "BNL",
    telephony: "MANARA",
  },
  {
    airlineCode: "MDA",
    telephony: "MANDARIN",
  },
  {
    airlineCode: "MGO",
    telephony: "MANGO",
  },
  {
    airlineCode: "MHN",
    telephony: "MANHATTAN",
  },
  {
    airlineCode: "MBT",
    telephony: "MANITOBA",
  },
  {
    airlineCode: "MYP",
    telephony: "MANN ROYAL",
  },
  {
    airlineCode: "MAN",
    telephony: "MANNION",
  },
  {
    airlineCode: "MNX",
    telephony: "MANX",
  },
  {
    airlineCode: "PAM",
    telephony: "MAP AIR",
  },
  {
    airlineCode: "SKV",
    telephony: "MAPLE",
  },
  {
    airlineCode: "HNL",
    telephony: "MAPLELEAF",
  },
  {
    airlineCode: "COT",
    telephony: "MARA",
  },
  {
    airlineCode: "MTO",
    telephony: "MARATHON",
  },
  {
    airlineCode: "MCP",
    telephony: "MARCOPOLO",
  },
  {
    airlineCode: "MCO",
    telephony: "MARCOS",
  },
  {
    airlineCode: "MGI",
    telephony: "MARGHI",
  },
  {
    airlineCode: "MRH",
    telephony: "MARHAM",
  },
  {
    airlineCode: "MDB",
    telephony: "MARIANAS",
  },
  {
    airlineCode: "MRN",
    telephony: "MARIANNE",
  },
  {
    airlineCode: "MRR",
    telephony: "MARINER",
  },
  {
    airlineCode: "EAO",
    telephony: "MARINO",
  },
  {
    airlineCode: "MRK",
    telephony: "MARKAIR",
  },
  {
    airlineCode: "WML",
    telephony: "MARLIN",
  },
  {
    airlineCode: "MMY",
    telephony: "MARMOT",
  },
  {
    airlineCode: "MRZ",
    telephony: "MARS",
  },
  {
    airlineCode: "MSH",
    telephony: "MARSHALAIR",
  },
  {
    airlineCode: "MCE",
    telephony: "MARSHALL",
  },
  {
    airlineCode: "MSL",
    telephony: "MARSLANDAIR",
  },
  {
    airlineCode: "MRA",
    telephony: "MARTEX",
  },
  {
    airlineCode: "MBE",
    telephony: "MARTIN",
  },
  {
    airlineCode: "MPH",
    telephony: "MARTINAIR",
  },
  {
    airlineCode: "MRC",
    telephony: "MARTRANS",
  },
  {
    airlineCode: "MAA",
    telephony: "MAS CARGA",
  },
  {
    airlineCode: "HKC",
    telephony: "MASCOT",
  },
  {
    airlineCode: "NAT",
    telephony: "MASS AIR",
  },
  {
    airlineCode: "MSY",
    telephony: "MASSEY",
  },
  {
    airlineCode: "MIH",
    telephony: "MASSYLINE",
  },
  {
    airlineCode: "MST",
    telephony: "MASTER",
  },
  {
    airlineCode: "LMJ",
    telephony: "MASTERJET",
  },
  {
    airlineCode: "MWG",
    telephony: "MASWINGS",
  },
  {
    airlineCode: "MTD",
    telephony: "MATADOR",
  },
  {
    airlineCode: "MBK",
    telephony: "MATBLACK",
  },
  {
    airlineCode: "MIT",
    telephony: "MATCO",
  },
  {
    airlineCode: "WZM",
    telephony: "MATILDA",
  },
  {
    airlineCode: "TIX",
    telephony: "MATRIX",
  },
  {
    airlineCode: "SNF",
    telephony: "MATZADA",
  },
  {
    airlineCode: "MRF",
    telephony: "MAUR-FRET",
  },
  {
    airlineCode: "MDE",
    telephony: "MAURI-TRANS",
  },
  {
    airlineCode: "MIA",
    telephony: "MAURIA",
  },
  {
    airlineCode: "MCX",
    telephony: "MAURICARGO",
  },
  {
    airlineCode: "MTW",
    telephony: "MAURITANIA AIRWAYS",
  },
  {
    airlineCode: "MWY",
    telephony: "MAURITANIENNE",
  },
  {
    airlineCode: "MVR",
    telephony: "MAV-AIR",
  },
  {
    airlineCode: "SBK",
    telephony: "MAWINGU",
  },
  {
    airlineCode: "MAX",
    telephony: "MAX AVIATION",
  },
  {
    airlineCode: "MWN",
    telephony: "MAX NIGER",
  },
  {
    airlineCode: "NGL",
    telephony: "MAXAIR NIGERIA",
  },
  {
    airlineCode: "MXF",
    telephony: "MAXFLIGHT",
  },
  {
    airlineCode: "MXM",
    telephony: "MAXLINES",
  },
  {
    airlineCode: "MYI",
    telephony: "MAYAIR",
  },
  {
    airlineCode: "LLJ",
    telephony: "MAYBOUNE JET",
  },
  {
    airlineCode: "MAO",
    telephony: "MAYO",
  },
  {
    airlineCode: "MYO",
    telephony: "MAYORAL",
  },
  {
    airlineCode: "EWR",
    telephony: "MAYOTTE AIR",
  },
  {
    airlineCode: "OMS",
    telephony: "MAZOON",
  },
  {
    airlineCode: "MBS",
    telephony: "MBACHI AIR",
  },
  {
    airlineCode: "MKL",
    telephony: "MCCALL",
  },
  {
    airlineCode: "MFL",
    telephony: "MCFLY",
  },
  {
    airlineCode: "MAJ",
    telephony: "ME TACK",
  },
  {
    airlineCode: "MRE",
    telephony: "MED RESCUE",
  },
  {
    airlineCode: "MDF",
    telephony: "MED-FREIGHT",
  },
  {
    airlineCode: "MEK",
    telephony: "MED-TRANS",
  },
  {
    airlineCode: "MEV",
    telephony: "MED-VIEW",
  },
  {
    airlineCode: "MDX",
    telephony: "MEDAIR",
  },
  {
    airlineCode: "MDM",
    telephony: "MEDAVIA",
  },
  {
    airlineCode: "BFD",
    telephony: "MEDIA JET",
  },
  {
    airlineCode: "MCL",
    telephony: "MEDIC",
  },
  {
    airlineCode: "DFL",
    telephony: "MEDIFLIGHT",
  },
  {
    airlineCode: "MFY",
    telephony: "MEDIFLY MEX",
  },
  {
    airlineCode: "MEJ",
    telephony: "MEDJET",
  },
  {
    airlineCode: "MDI",
    telephony: "MEDOPS",
  },
  {
    airlineCode: "MTS",
    telephony: "MEDSERVICE",
  },
  {
    airlineCode: "MDW",
    telephony: "MEDWING",
  },
  {
    airlineCode: "MEL",
    telephony: "MEGA AIR",
  },
  {
    airlineCode: "MKG",
    telephony: "MEKONG",
  },
  {
    airlineCode: "RJR",
    telephony: "MELITA",
  },
  {
    airlineCode: "MHU",
    telephony: "MEMPHIS UGANDA",
  },
  {
    airlineCode: "MNJ",
    telephony: "MENAJET",
  },
  {
    airlineCode: "CNM",
    telephony: "MENGYUAN",
  },
  {
    airlineCode: "TLM",
    telephony: "MENTARI",
  },
  {
    airlineCode: "PTC",
    telephony: "MENTOR",
  },
  {
    airlineCode: "MRJ",
    telephony: "MERAJ AIRLINE",
  },
  {
    airlineCode: "MEC",
    telephony: "MERCAIR",
  },
  {
    airlineCode: "MXX",
    telephony: "MERCHANT",
  },
  {
    airlineCode: "MCY",
    telephony: "MERCY",
  },
  {
    airlineCode: "AMD",
    telephony: "MERCY WING",
  },
  {
    airlineCode: "MRD",
    telephony: "MERIDIAN",
  },
  {
    airlineCode: "MEM",
    telephony: "MERIDIAN CHERRY",
  },
  {
    airlineCode: "RRL",
    telephony: "MERLIN",
  },
  {
    airlineCode: "MMD",
    telephony: "MERMAID",
  },
  {
    airlineCode: "MES",
    telephony: "MESABA",
  },
  {
    airlineCode: "MSQ",
    telephony: "META",
  },
  {
    airlineCode: "MTM",
    telephony: "METACHEM",
  },
  {
    airlineCode: "MER",
    telephony: "METHOW",
  },
  {
    airlineCode: "MET",
    telephony: "METMAN",
  },
  {
    airlineCode: "MTR",
    telephony: "METRO",
  },
  {
    airlineCode: "MTJ",
    telephony: "METROJET",
  },
  {
    airlineCode: "ARS",
    telephony: "METSERVICE",
  },
  {
    airlineCode: "MXO",
    telephony: "MEXAERO",
  },
  {
    airlineCode: "LET",
    telephony: "MEXALE",
  },
  {
    airlineCode: "MXQ",
    telephony: "MEXIQUENSES",
  },
  {
    airlineCode: "SDQ",
    telephony: "MEXTECNICO",
  },
  {
    airlineCode: "MGD",
    telephony: "MIAMI AIR",
  },
  {
    airlineCode: "DRE",
    telephony: "MICHIGAN",
  },
  {
    airlineCode: "MFG",
    telephony: "MID AFRICA",
  },
  {
    airlineCode: "MPA",
    telephony: "MID PAC",
  },
  {
    airlineCode: "MDS",
    telephony: "MID-SOUTH",
  },
  {
    airlineCode: "XAP",
    telephony: "MID-TOWN",
  },
  {
    airlineCode: "MID",
    telephony: "MIDCOAST",
  },
  {
    airlineCode: "EJO",
    telephony: "MIDJET",
  },
  {
    airlineCode: "BMR",
    telephony: "MIDLAND",
  },
  {
    airlineCode: "MFR",
    telephony: "MIDLINE FREIGHT",
  },
  {
    airlineCode: "MDT",
    telephony: "MIDNIGHT",
  },
  {
    airlineCode: "MWT",
    telephony: "MIDWEST",
  },
  {
    airlineCode: "MWL",
    telephony: "MIDWEST AIRLINK",
  },
  {
    airlineCode: "MIG",
    telephony: "MIG AVIA",
  },
  {
    airlineCode: "TTP",
    telephony: "MIGHTY WING",
  },
  {
    airlineCode: "MGT",
    telephony: "MIGHTYVAN",
  },
  {
    airlineCode: "ADZ",
    telephony: "MIGRATOR",
  },
  {
    airlineCode: "MRT",
    telephony: "MIKE ROMEO",
  },
  {
    airlineCode: "MIZ",
    telephony: "MILAZ",
  },
  {
    airlineCode: "MSN",
    telephony: "MILCARGO",
  },
  {
    airlineCode: "FLH",
    telephony: "MILE HIGH",
  },
  {
    airlineCode: "MLA",
    telephony: "MILE-AIR",
  },
  {
    airlineCode: "MLO",
    telephony: "MILENIO",
  },
  {
    airlineCode: "RJM",
    telephony: "MILLEN",
  },
  {
    airlineCode: "MLN",
    telephony: "MILLENNIUM",
  },
  {
    airlineCode: "MIM",
    telephony: "MILLESIME",
  },
  {
    airlineCode: "MXS",
    telephony: "MILLON EXPRESS",
  },
  {
    airlineCode: "CFU",
    telephony: "MINAIR",
  },
  {
    airlineCode: "EBE",
    telephony: "MINEBEA",
  },
  {
    airlineCode: "OLL",
    telephony: "MINMEX",
  },
  {
    airlineCode: "MVK",
    telephony: "MINN STATE",
  },
  {
    airlineCode: "MSF",
    telephony: "MINSHENG",
  },
  {
    airlineCode: "MIC",
    telephony: "MINT AIRWAYS",
  },
  {
    airlineCode: "MMN",
    telephony: "MINUTEMAN",
  },
  {
    airlineCode: "MVJ",
    telephony: "MIRA VISTA",
  },
  {
    airlineCode: "DRU",
    telephony: "MIRNY",
  },
  {
    airlineCode: "LON",
    telephony: "MISR",
  },
  {
    airlineCode: "KFB",
    telephony: "MISSION",
  },
  {
    airlineCode: "BOS",
    telephony: "MISTRAL",
  },
  {
    airlineCode: "MSA",
    telephony: "MISTRAL WINGS",
  },
  {
    airlineCode: "MTL",
    telephony: "MITAVIA",
  },
  {
    airlineCode: "AMA",
    telephony: "MOALEM",
  },
  {
    airlineCode: "MWM",
    telephony: "MODERNAIR",
  },
  {
    airlineCode: "MOW",
    telephony: "MOHAWK AIR",
  },
  {
    airlineCode: "CPO",
    telephony: "MOKAN",
  },
  {
    airlineCode: "MKU",
    telephony: "MOKU",
  },
  {
    airlineCode: "MLE",
    telephony: "MOLDAERO",
  },
  {
    airlineCode: "ATG",
    telephony: "MOLDCARGO",
  },
  {
    airlineCode: "TRO",
    telephony: "MOLOKAI",
  },
  {
    airlineCode: "MON",
    telephony: "MONARCH",
  },
  {
    airlineCode: "MNH",
    telephony: "MONARCH AIR",
  },
  {
    airlineCode: "MOD",
    telephony: "MONDEGO",
  },
  {
    airlineCode: "MGL",
    telephony: "MONGOL AIR",
  },
  {
    airlineCode: "MGC",
    telephony: "MONGOLIA CARGO",
  },
  {
    airlineCode: "MGX",
    telephony: "MONTAIR",
  },
  {
    airlineCode: "AMN",
    telephony: "MONTENEGRO",
  },
  {
    airlineCode: "MTI",
    telephony: "MONTERREY AIR",
  },
  {
    airlineCode: "MNT",
    telephony: "MONTSERRAT",
  },
  {
    airlineCode: "MNY",
    telephony: "MOONEY FLIGHT",
  },
  {
    airlineCode: "NOS",
    telephony: "MOONFLOWER",
  },
  {
    airlineCode: "AKQ",
    telephony: "MOONLIGHT",
  },
  {
    airlineCode: "HFM",
    telephony: "MOONRAKER",
  },
  {
    airlineCode: "NTB",
    telephony: "MORABEZA",
  },
  {
    airlineCode: "KFE",
    telephony: "MORITO",
  },
  {
    airlineCode: "MAL",
    telephony: "MORNINGSTAR",
  },
  {
    airlineCode: "MRO",
    telephony: "MORRISON",
  },
  {
    airlineCode: "JTT",
    telephony: "MOSCOW JET",
  },
  {
    airlineCode: "JFA",
    telephony: "MOSQUITO",
  },
  {
    airlineCode: "MOT",
    telephony: "MOTAHIDA",
  },
  {
    airlineCode: "CLC",
    telephony: "MOTHERSHIP",
  },
  {
    airlineCode: "MSI",
    telephony: "MOTOR SICH",
  },
  {
    airlineCode: "FAI",
    telephony: "MOTOR-CITY",
  },
  {
    airlineCode: "MTN",
    telephony: "MOUNTAIN",
  },
  {
    airlineCode: "BRR",
    telephony: "MOUNTAIN AIR",
  },
  {
    airlineCode: "MHA",
    telephony: "MOUNTAIN HIGH",
  },
  {
    airlineCode: "MFB",
    telephony: "MOUNTAINHELI",
  },
  {
    airlineCode: "NZM",
    telephony: "MOUNTCOOK",
  },
  {
    airlineCode: "MOV",
    telephony: "MOV AIR",
  },
  {
    airlineCode: "MXY",
    telephony: "MOXY",
  },
  {
    airlineCode: "LAM",
    telephony: "MOZAMBIQUE",
  },
  {
    airlineCode: "MXE",
    telephony: "MOZAMBIQUE EXPRESS",
  },
  {
    airlineCode: "MOZ",
    telephony: "MOZART",
  },
  {
    airlineCode: "MCV",
    telephony: "MTC AVIACION",
  },
  {
    airlineCode: "UCM",
    telephony: "MULE-FLIGHT",
  },
  {
    airlineCode: "MMF",
    telephony: "MULTI",
  },
  {
    airlineCode: "MLV",
    telephony: "MULTI VALLE",
  },
  {
    airlineCode: "ASK",
    telephony: "MULTISKY",
  },
  {
    airlineCode: "MTX",
    telephony: "MULTITAXI",
  },
  {
    airlineCode: "PMT",
    telephony: "MULTITRADE",
  },
  {
    airlineCode: "MQT",
    telephony: "MUSKETEER",
  },
  {
    airlineCode: "MAW",
    telephony: "MUSTIQUE",
  },
  {
    airlineCode: "BFY",
    telephony: "MWANGO BEST",
  },
  {
    airlineCode: "IMC",
    telephony: "MY CHARTER",
  },
  {
    airlineCode: "MYF",
    telephony: "MY FLIGHT",
  },
  {
    airlineCode: "MYW",
    telephony: "MY SKY",
  },
  {
    airlineCode: "MMA",
    telephony: "MYANMAR",
  },
  {
    airlineCode: "MYA",
    telephony: "MYFLUG",
  },
  {
    airlineCode: "MYD",
    telephony: "MYLAND",
  },
  {
    airlineCode: "MYK",
    telephony: "MYLIN",
  },
  {
    airlineCode: "VLA",
    telephony: "NALAU",
  },
  {
    airlineCode: "NAM",
    telephony: "NAM",
  },
  {
    airlineCode: "NAM",
    telephony: "NAM",
  },
  {
    airlineCode: "LKN",
    telephony: "NAMAIR",
  },
  {
    airlineCode: "NME",
    telephony: "NAMASTE AIR",
  },
  {
    airlineCode: "NMB",
    telephony: "NAMIBIA",
  },
  {
    airlineCode: "NDF",
    telephony: "NAMIBIAN AIRFORCE",
  },
  {
    airlineCode: "NSJ",
    telephony: "NANSHAN",
  },
  {
    airlineCode: "NUK",
    telephony: "NANUCK",
  },
  {
    airlineCode: "KNE",
    telephony: "NAS EXPRESS",
  },
  {
    airlineCode: "NAS",
    telephony: "NASAIRWAYS",
  },
  {
    airlineCode: "NJC",
    telephony: "NASHVILLE JET",
  },
  {
    airlineCode: "NOL",
    telephony: "NAT AIRLINE",
  },
  {
    airlineCode: "GYG",
    telephony: "NATAKHTARI",
  },
  {
    airlineCode: "NCO",
    telephony: "NATALCO",
  },
  {
    airlineCode: "NTK",
    telephony: "NATCA",
  },
  {
    airlineCode: "NTN",
    telephony: "NATCHAIR",
  },
  {
    airlineCode: "NAE",
    telephony: "NATIONAL",
  },
  {
    airlineCode: "NCR",
    telephony: "NATIONAL CARGO",
  },
  {
    airlineCode: "NJS",
    telephony: "NATIONAL JET",
  },
  {
    airlineCode: "NVT",
    telephony: "NATIVE",
  },
  {
    airlineCode: "NAG",
    telephony: "NATO",
  },
  {
    airlineCode: "NRR",
    telephony: "NATUREAIR",
  },
  {
    airlineCode: "NRK",
    telephony: "NATURELINK",
  },
  {
    airlineCode: "NVC",
    telephony: "NAV CAN",
  },
  {
    airlineCode: "FCK",
    telephony: "NAV CHECKER",
  },
  {
    airlineCode: "NAV",
    telephony: "NAV DISPATCH",
  },
  {
    airlineCode: "MNV",
    telephony: "NAVALE",
  },
  {
    airlineCode: "IRI",
    telephony: "NAVID",
  },
  {
    airlineCode: "NVM",
    telephony: "NAVIERA",
  },
  {
    airlineCode: "NVR",
    telephony: "NAVIGATOR",
  },
  {
    airlineCode: "NVY",
    telephony: "NAVY",
  },
  {
    airlineCode: "ADY",
    telephony: "NAWRAS",
  },
  {
    airlineCode: "NAY",
    telephony: "NAYSA",
  },
  {
    airlineCode: "NDT",
    telephony: "ND AEROTAXIS",
  },
  {
    airlineCode: "NEX",
    telephony: "NEATAX",
  },
  {
    airlineCode: "NEC",
    telephony: "NECON AIR",
  },
  {
    airlineCode: "NDL",
    telephony: "NEEDLE",
  },
  {
    airlineCode: "NLE",
    telephony: "NELLIE",
  },
  {
    airlineCode: "NHD",
    telephony: "NEMO",
  },
  {
    airlineCode: "NPT",
    telephony: "NEPTUNE",
  },
  {
    airlineCode: "NSL",
    telephony: "NERICAIR",
  },
  {
    airlineCode: "NMA",
    telephony: "NESMA",
  },
  {
    airlineCode: "NSS",
    telephony: "NESMA CONNECT",
  },
  {
    airlineCode: "NEJ",
    telephony: "NET BUSINESS",
  },
  {
    airlineCode: "NTF",
    telephony: "NETFLIGHT",
  },
  {
    airlineCode: "NAF",
    telephony: "NETHERLANDS AIR FORCE",
  },
  {
    airlineCode: "NCG",
    telephony: "NETHERLANDS COASTGUARD",
  },
  {
    airlineCode: "NRN",
    telephony: "NETHERLANDS NAVY",
  },
  {
    airlineCode: "NJT",
    telephony: "NETJET",
  },
  {
    airlineCode: "NWK",
    telephony: "NETLINK",
  },
  {
    airlineCode: "LPC",
    telephony: "NETSTAR",
  },
  {
    airlineCode: "NET",
    telephony: "NETWORK",
  },
  {
    airlineCode: "PHV",
    telephony: "NEW BIRD",
  },
  {
    airlineCode: "NEA",
    telephony: "NEW ENGLAND",
  },
  {
    airlineCode: "JTD",
    telephony: "NEW JET",
  },
  {
    airlineCode: "NWD",
    telephony: "NEW WORLD",
  },
  {
    airlineCode: "ANZ",
    telephony: "NEW ZEALAND",
  },
  {
    airlineCode: "NHT",
    telephony: "NEWHEIGHTS",
  },
  {
    airlineCode: "NML",
    telephony: "NEWMILL",
  },
  {
    airlineCode: "RCJ",
    telephony: "NEWPIN",
  },
  {
    airlineCode: "SNJ",
    telephony: "NEWSKY",
  },
  {
    airlineCode: "XGN",
    telephony: "NEXGEN",
  },
  {
    airlineCode: "RNX",
    telephony: "NEXTIME",
  },
  {
    airlineCode: "NXT",
    telephony: "NEXTNET",
  },
  {
    airlineCode: "NXU",
    telephony: "NEXUS",
  },
  {
    airlineCode: "NXS",
    telephony: "NEXUS AVIATION",
  },
  {
    airlineCode: "NIS",
    telephony: "NICA",
  },
  {
    airlineCode: "NAR",
    telephony: "NICA AIRWAYS",
  },
  {
    airlineCode: "NCN",
    telephony: "NICON AIRWAYS",
  },
  {
    airlineCode: "ANP",
    telephony: "NICON FLIERS",
  },
  {
    airlineCode: "ANI",
    telephony: "NIGALANTIC",
  },
  {
    airlineCode: "NIN",
    telephony: "NIGER AIRLINES",
  },
  {
    airlineCode: "NAB",
    telephony: "NIGER CARGO",
  },
  {
    airlineCode: "NGA",
    telephony: "NIGERIA",
  },
  {
    airlineCode: "EAN",
    telephony: "NIGERIA EXPRESS",
  },
  {
    airlineCode: "NGR",
    telephony: "NIGERIAN AIRFORCE",
  },
  {
    airlineCode: "MLK",
    telephony: "NIGERJET",
  },
  {
    airlineCode: "SNC",
    telephony: "NIGHT CARGO",
  },
  {
    airlineCode: "NTC",
    telephony: "NIGHT CHASE",
  },
  {
    airlineCode: "OWL",
    telephony: "NIGHT OWL",
  },
  {
    airlineCode: "MMH",
    telephony: "NIGHT RIDER",
  },
  {
    airlineCode: "NHK",
    telephony: "NIGHTHAWK",
  },
  {
    airlineCode: "NIT",
    telephony: "NIGHTTRAIN",
  },
  {
    airlineCode: "NGT",
    telephony: "NIKA",
  },
  {
    airlineCode: "CIJ",
    telephony: "NIKOLAUS",
  },
  {
    airlineCode: "NYL",
    telephony: "NILE",
  },
  {
    airlineCode: "NIA",
    telephony: "NILE BIRD",
  },
  {
    airlineCode: "NSA",
    telephony: "NILE SAFARIS",
  },
  {
    airlineCode: "NLW",
    telephony: "NILE WINGS",
  },
  {
    airlineCode: "DCP",
    telephony: "NILECAT",
  },
  {
    airlineCode: "NIM",
    telephony: "NIMJET",
  },
  {
    airlineCode: "NCA",
    telephony: "NIPPON CARGO",
  },
  {
    airlineCode: "NST",
    telephony: "NISHAT",
  },
  {
    airlineCode: "NTS",
    telephony: "NITE STAR",
  },
  {
    airlineCode: "ANG",
    telephony: "NIUGINI",
  },
  {
    airlineCode: "NOA",
    telephony: "NOAA",
  },
  {
    airlineCode: "NOK",
    telephony: "NOK AIR",
  },
  {
    airlineCode: "NRL",
    telephony: "NOLINOR",
  },
  {
    airlineCode: "NMD",
    telephony: "NOMAD AIR",
  },
  {
    airlineCode: "NAX",
    telephony: "NOR SHUTTLE",
  },
  {
    airlineCode: "ONO",
    telephony: "NORAERO",
  },
  {
    airlineCode: "ANM",
    telephony: "NORAM",
  },
  {
    airlineCode: "NBR",
    telephony: "NORBROOK",
  },
  {
    airlineCode: "NHE",
    telephony: "NORD",
  },
  {
    airlineCode: "NDD",
    telephony: "NORDEND",
  },
  {
    airlineCode: "NEF",
    telephony: "NORDEX",
  },
  {
    airlineCode: "NSW",
    telephony: "NORDIC",
  },
  {
    airlineCode: "NFE",
    telephony: "NORDIC BLUE",
  },
  {
    airlineCode: "NDA",
    telephony: "NORDICA AIR",
  },
  {
    airlineCode: "NWS",
    telephony: "NORDLAND",
  },
  {
    airlineCode: "NVD",
    telephony: "NORDVIND",
  },
  {
    airlineCode: "NRT",
    telephony: "NORESTAIR",
  },
  {
    airlineCode: "BNO",
    telephony: "NORSE",
  },
  {
    airlineCode: "NRX",
    telephony: "NORSE AIR",
  },
  {
    airlineCode: "NOZ",
    telephony: "NORSEMAN",
  },
  {
    airlineCode: "NAN",
    telephony: "NORSHIP",
  },
  {
    airlineCode: "NOR",
    telephony: "NORSKE",
  },
  {
    airlineCode: "NTH",
    telephony: "NORTH AIR",
  },
  {
    airlineCode: "NAO",
    telephony: "NORTH AMERICAN",
  },
  {
    airlineCode: "NCB",
    telephony: "NORTH CARIBOU",
  },
  {
    airlineCode: "NCJ",
    telephony: "NORTH CENTRAL",
  },
  {
    airlineCode: "NKT",
    telephony: "NORTH COUNTRY",
  },
  {
    airlineCode: "NFA",
    telephony: "NORTH FLYING",
  },
  {
    airlineCode: "NLI",
    telephony: "NORTH LINK",
  },
  {
    airlineCode: "NSH",
    telephony: "NORTH-SHORE",
  },
  {
    airlineCode: "NEN",
    telephony: "NORTHEAST SWAN",
  },
  {
    airlineCode: "NEW",
    telephony: "NORTHEASTERN",
  },
  {
    airlineCode: "NHC",
    telephony: "NORTHERN",
  },
  {
    airlineCode: "BFK",
    telephony: "NORTHERN EXPRESS",
  },
  {
    airlineCode: "NLF",
    telephony: "NORTHERN LIFE",
  },
  {
    airlineCode: "NSI",
    telephony: "NORTHERN SKIES",
  },
  {
    airlineCode: "LBR",
    telephony: "NORTHLIGHT",
  },
  {
    airlineCode: "NOH",
    telephony: "NORTHOLT",
  },
  {
    airlineCode: "NHL",
    telephony: "NORTHUMBRIA",
  },
  {
    airlineCode: "NAL",
    telephony: "NORTHWAY",
  },
  {
    airlineCode: "NTW",
    telephony: "NORTHWOODS",
  },
  {
    airlineCode: "NWL",
    telephony: "NORTHWRIGHT",
  },
  {
    airlineCode: "NSF",
    telephony: "NORTON",
  },
  {
    airlineCode: "IBK",
    telephony: "NORTRANS",
  },
  {
    airlineCode: "NAA",
    telephony: "NORUEGA",
  },
  {
    airlineCode: "NOW",
    telephony: "NORWEGIAN",
  },
  {
    airlineCode: "NWG",
    telephony: "NORWING",
  },
  {
    airlineCode: "ANE",
    telephony: "NOSTRU AIR",
  },
  {
    airlineCode: "OSS",
    telephony: "NOTICIOSOS",
  },
  {
    airlineCode: "LBT",
    telephony: "NOUVELAIR",
  },
  {
    airlineCode: "NVS",
    telephony: "NOUVELLE AFFAIRES",
  },
  {
    airlineCode: "NVJ",
    telephony: "NOUVINTER",
  },
  {
    airlineCode: "NAI",
    telephony: "NOVAIR",
  },
  {
    airlineCode: "NOJ",
    telephony: "NOVAJET",
  },
  {
    airlineCode: "NOV",
    telephony: "NOVANILE",
  },
  {
    airlineCode: "VBA",
    telephony: "NOVE",
  },
  {
    airlineCode: "NVQ",
    telephony: "NOVO AIR",
  },
  {
    airlineCode: "NKZ",
    telephony: "NOVOKUZNETSK",
  },
  {
    airlineCode: "SJK",
    telephony: "NUSANTARA",
  },
  {
    airlineCode: "RFH",
    telephony: "NUT",
  },
  {
    airlineCode: "NYS",
    telephony: "NYASA",
  },
  {
    airlineCode: "NYX",
    telephony: "NYX AIR",
  },
  {
    airlineCode: "OGA",
    telephony: "OASIS AIR",
  },
  {
    airlineCode: "VCJ",
    telephony: "OBELIX",
  },
  {
    airlineCode: "OBJ",
    telephony: "OBJETIVO",
  },
  {
    airlineCode: "OCN",
    telephony: "OCEAN",
  },
  {
    airlineCode: "SCH",
    telephony: "OCEAN BIRD",
  },
  {
    airlineCode: "ZOZ",
    telephony: "OCEANA",
  },
  {
    airlineCode: "ONE",
    telephony: "OCEANAIR",
  },
  {
    airlineCode: "OHS",
    telephony: "ODENGENE",
  },
  {
    airlineCode: "OHC",
    telephony: "OHIO-CHARTER",
  },
  {
    airlineCode: "OJO",
    telephony: "OHJOH",
  },
  {
    airlineCode: "OKJ",
    telephony: "OKADA AIR",
  },
  {
    airlineCode: "OKA",
    telephony: "OKAYJET",
  },
  {
    airlineCode: "OKL",
    telephony: "OKLAHOMA",
  },
  {
    airlineCode: "OLV",
    telephony: "OLIVIA",
  },
  {
    airlineCode: "OLY",
    telephony: "OLYAIR",
  },
  {
    airlineCode: "OBC",
    telephony: "OLYCAM",
  },
  {
    airlineCode: "OAL",
    telephony: "OLYMPIC",
  },
  {
    airlineCode: "ORF",
    telephony: "OMAN",
  },
  {
    airlineCode: "OMA",
    telephony: "OMAN AIR",
  },
  {
    airlineCode: "OMG",
    telephony: "OMEGA",
  },
  {
    airlineCode: "OME",
    telephony: "OMEGA TANKER",
  },
  {
    airlineCode: "OAV",
    telephony: "OMNI",
  },
  {
    airlineCode: "OMI",
    telephony: "OMNI AIR",
  },
  {
    airlineCode: "ONI",
    telephony: "OMNI TRAINING",
  },
  {
    airlineCode: "OAE",
    telephony: "OMNI-EXPRESS",
  },
  {
    airlineCode: "OMB",
    telephony: "OMNIBLU",
  },
  {
    airlineCode: "OMF",
    telephony: "OMNIFLYS",
  },
  {
    airlineCode: "OTK",
    telephony: "ON TRACK",
  },
  {
    airlineCode: "ONT",
    telephony: "ONTARIO GOVERNMENT",
  },
  {
    airlineCode: "OHY",
    telephony: "ONUR AIR",
  },
  {
    airlineCode: "OOT",
    telephony: "OOTBAS",
  },
  {
    airlineCode: "OPN",
    telephony: "OPEN AIR",
  },
  {
    airlineCode: "OFL",
    telephony: "OPEN FLIGHT",
  },
  {
    airlineCode: "OSY",
    telephony: "OPEN SKIES",
  },
  {
    airlineCode: "OLE",
    telephony: "OPERADORA",
  },
  {
    airlineCode: "OPV",
    telephony: "OPERADORA DE VUELOS",
  },
  {
    airlineCode: "OPS",
    telephony: "OPS-JET",
  },
  {
    airlineCode: "OPM",
    telephony: "OPTIMA",
  },
  {
    airlineCode: "ENL",
    telephony: "OPTIMOS",
  },
  {
    airlineCode: "OPT",
    telephony: "OPTIONS",
  },
  {
    airlineCode: "TFL",
    telephony: "ORANGE",
  },
  {
    airlineCode: "ORE",
    telephony: "ORANGE AVIATION",
  },
  {
    airlineCode: "FUL",
    telephony: "ORANGE CRANE",
  },
  {
    airlineCode: "ORN",
    telephony: "ORANGE JET",
  },
  {
    airlineCode: "JJP",
    telephony: "ORANGE LINER",
  },
  {
    airlineCode: "OTF",
    telephony: "ORANGESKY",
  },
  {
    airlineCode: "OBS",
    telephony: "ORBEST",
  },
  {
    airlineCode: "ORK",
    telephony: "ORCA",
  },
  {
    airlineCode: "OAS",
    telephony: "ORCHID",
  },
  {
    airlineCode: "ORG",
    telephony: "ORENAVIA",
  },
  {
    airlineCode: "OEA",
    telephony: "ORIENT THAI",
  },
  {
    airlineCode: "OAC",
    telephony: "ORIENTAL AIR",
  },
  {
    airlineCode: "ORC",
    telephony: "ORIENTAL BRIDGE",
  },
  {
    airlineCode: "OTR",
    telephony: "ORIENTROC",
  },
  {
    airlineCode: "SSO",
    telephony: "ORINOCO",
  },
  {
    airlineCode: "FOH",
    telephony: "ORION",
  },
  {
    airlineCode: "OED",
    telephony: "ORION CHARTER",
  },
  {
    airlineCode: "OIX",
    telephony: "ORIONIX",
  },
  {
    airlineCode: "OMR",
    telephony: "ORMINE",
  },
  {
    airlineCode: "OAD",
    telephony: "ORSCOM",
  },
  {
    airlineCode: "ORH",
    telephony: "ORSHA",
  },
  {
    airlineCode: "OJT",
    telephony: "ORYSTAR",
  },
  {
    airlineCode: "OSJ",
    telephony: "OSCARJET",
  },
  {
    airlineCode: "PDG",
    telephony: "OSPREY",
  },
  {
    airlineCode: "OST",
    telephony: "OSTATE",
  },
  {
    airlineCode: "OAN",
    telephony: "OTAN",
  },
  {
    airlineCode: "OTT",
    telephony: "OTT AIRLINES",
  },
  {
    airlineCode: "OTA",
    telephony: "OUTLAW",
  },
  {
    airlineCode: "OLA",
    telephony: "OVERLAND",
  },
  {
    airlineCode: "OCJ",
    telephony: "OVERSTAR",
  },
  {
    airlineCode: "OWE",
    telephony: "OWENAIR",
  },
  {
    airlineCode: "OXF",
    telephony: "OXFORD",
  },
  {
    airlineCode: "OXS",
    telephony: "OXUS AIRWAYS",
  },
  {
    airlineCode: "OYA",
    telephony: "OYAA",
  },
  {
    airlineCode: "OZT",
    telephony: "OZARK TECH",
  },
  {
    airlineCode: "HOZ",
    telephony: "OZCA",
  },
  {
    airlineCode: "PNJ",
    telephony: "PAC JET",
  },
  {
    airlineCode: "PCM",
    telephony: "PAC VALLEY",
  },
  {
    airlineCode: "PCR",
    telephony: "PACAIR",
  },
  {
    airlineCode: "PCE",
    telephony: "PACE",
  },
  {
    airlineCode: "PCF",
    telephony: "PACIFIC",
  },
  {
    airlineCode: "PIC",
    telephony: "PACIFIC AIRLINES",
  },
  {
    airlineCode: "PAK",
    telephony: "PACIFIC ALASKA",
  },
  {
    airlineCode: "PSA",
    telephony: "PACIFIC ISLE",
  },
  {
    airlineCode: "PCJ",
    telephony: "PACIFIC JET",
  },
  {
    airlineCode: "PFR",
    telephony: "PACIFIC WEST",
  },
  {
    airlineCode: "PFL",
    telephony: "PACIFICFLYER",
  },
  {
    airlineCode: "PFI",
    telephony: "PACIFICO CHIHUAHUA",
  },
  {
    airlineCode: "PXT",
    telephony: "PACK COAST",
  },
  {
    airlineCode: "PDX",
    telephony: "PACKAGE EXPRESS",
  },
  {
    airlineCode: "PVD",
    telephony: "PAD AVIATION",
  },
  {
    airlineCode: "PDD",
    telephony: "PADA",
  },
  {
    airlineCode: "PAE",
    telephony: "PAISAJES",
  },
  {
    airlineCode: "TLV",
    telephony: "PAJAROS",
  },
  {
    airlineCode: "ABQ",
    telephony: "PAKBLUE",
  },
  {
    airlineCode: "PIA",
    telephony: "PAKISTAN",
  },
  {
    airlineCode: "PKR",
    telephony: "PAKKER AVIO",
  },
  {
    airlineCode: "PAU",
    telephony: "PALAIRWAYS",
  },
  {
    airlineCode: "PPC",
    telephony: "PALAU ASIAPAC",
  },
  {
    airlineCode: "BXH",
    telephony: "PALLISER",
  },
  {
    airlineCode: "JPB",
    telephony: "PALMBEACH JET",
  },
  {
    airlineCode: "PLT",
    telephony: "PALMETTO",
  },
  {
    airlineCode: "PLZ",
    telephony: "PALS HOPE",
  },
  {
    airlineCode: "PMX",
    telephony: "PAMBELE",
  },
  {
    airlineCode: "PIR",
    telephony: "PAMIR",
  },
  {
    airlineCode: "PMA",
    telephony: "PAN MALAYSIA",
  },
  {
    airlineCode: "AAD",
    telephony: "PANABEAR",
  },
  {
    airlineCode: "AJQ",
    telephony: "PANAJET",
  },
  {
    airlineCode: "RSL",
    telephony: "PANAMA RENTAL",
  },
  {
    airlineCode: "PEI",
    telephony: "PANAMEDIA",
  },
  {
    airlineCode: "PNM",
    telephony: "PANAMERICANO",
  },
  {
    airlineCode: "PHT",
    telephony: "PANANK",
  },
  {
    airlineCode: "HFJ",
    telephony: "PANGU",
  },
  {
    airlineCode: "PHD",
    telephony: "PANHANDLE",
  },
  {
    airlineCode: "PAX",
    telephony: "PANNEX",
  },
  {
    airlineCode: "PHU",
    telephony: "PANNON",
  },
  {
    airlineCode: "PNO",
    telephony: "PANO",
  },
  {
    airlineCode: "PTN",
    telephony: "PANTANAL",
  },
  {
    airlineCode: "FAO",
    telephony: "PANTHER",
  },
  {
    airlineCode: "PPG",
    telephony: "PAPAGO",
  },
  {
    airlineCode: "HMP",
    telephony: "PAPAIR TERMINAL",
  },
  {
    airlineCode: "PPU",
    telephony: "PAPUGA",
  },
  {
    airlineCode: "PRK",
    telephony: "PARACA",
  },
  {
    airlineCode: "PMM",
    telephony: "PARADIGM",
  },
  {
    airlineCode: "SOU",
    telephony: "PARADISE",
  },
  {
    airlineCode: "PGX",
    telephony: "PARAGON EXPRESS",
  },
  {
    airlineCode: "PFT",
    telephony: "PARAGON FLIGHT",
  },
  {
    airlineCode: "LAP",
    telephony: "PARAGUAYA",
  },
  {
    airlineCode: "PAB",
    telephony: "PARAIR",
  },
  {
    airlineCode: "TVV",
    telephony: "PARAMITA",
  },
  {
    airlineCode: "FLP",
    telephony: "PARAPRO",
  },
  {
    airlineCode: "PMW",
    telephony: "PARAWAY",
  },
  {
    airlineCode: "IRE",
    telephony: "PARIZAIR",
  },
  {
    airlineCode: "GFM",
    telephony: "PARROT",
  },
  {
    airlineCode: "PRS",
    telephony: "PARS SKY",
  },
  {
    airlineCode: "PRA",
    telephony: "PARSAVIA",
  },
  {
    airlineCode: "PIS",
    telephony: "PARSIS",
  },
  {
    airlineCode: "PJT",
    telephony: "PARTNERJET",
  },
  {
    airlineCode: "PER",
    telephony: "PAS AIR",
  },
  {
    airlineCode: "PVS",
    telephony: "PASA",
  },
  {
    airlineCode: "PSC",
    telephony: "PASCAN",
  },
  {
    airlineCode: "PCO",
    telephony: "PASCO",
  },
  {
    airlineCode: "PTB",
    telephony: "PASSAREDO",
  },
  {
    airlineCode: "PHS",
    telephony: "PASSAT",
  },
  {
    airlineCode: "PSH",
    telephony: "PASSION",
  },
  {
    airlineCode: "XGO",
    telephony: "PASTIS",
  },
  {
    airlineCode: "PAT",
    telephony: "PAT",
  },
  {
    airlineCode: "PAT",
    telephony: "PAT",
  },
  {
    airlineCode: "PTJ",
    telephony: "PAT-JETS",
  },
  {
    airlineCode: "PAF",
    telephony: "PATHFINDER",
  },
  {
    airlineCode: "FHV",
    telephony: "PATROL",
  },
  {
    airlineCode: "PPV",
    telephony: "PAVLOVSK",
  },
  {
    airlineCode: "PHE",
    telephony: "PAWAN HANS",
  },
  {
    airlineCode: "IRP",
    telephony: "PAYAMAIR",
  },
  {
    airlineCode: "FFH",
    telephony: "PEACE AIR",
  },
  {
    airlineCode: "APK",
    telephony: "PEACE BIRD",
  },
  {
    airlineCode: "PHJ",
    telephony: "PEACHJET",
  },
  {
    airlineCode: "XAU",
    telephony: "PEARL",
  },
  {
    airlineCode: "HPA",
    telephony: "PEARL AIRWAYS",
  },
  {
    airlineCode: "PBY",
    telephony: "PEARL SERVICES",
  },
  {
    airlineCode: "PVU",
    telephony: "PEAU",
  },
  {
    airlineCode: "PXA",
    telephony: "PECOTOX",
  },
  {
    airlineCode: "PJE",
    telephony: "PEE JAY",
  },
  {
    airlineCode: "PPL",
    telephony: "PEGASUS",
  },
  {
    airlineCode: "PEG",
    telephony: "PEGJET",
  },
  {
    airlineCode: "PFY",
    telephony: "PELFLIGHT",
  },
  {
    airlineCode: "PPK",
    telephony: "PELICAN",
  },
  {
    airlineCode: "PAS",
    telephony: "PELITA",
  },
  {
    airlineCode: "PDY",
    telephony: "PENDLEY",
  },
  {
    airlineCode: "BAN",
    telephony: "PENGUIN",
  },
  {
    airlineCode: "NLA",
    telephony: "PENINSULA",
  },
  {
    airlineCode: "PBF",
    telephony: "PENN-FOREST",
  },
  {
    airlineCode: "PHG",
    telephony: "PENNINE",
  },
  {
    airlineCode: "PTS",
    telephony: "PENTRA",
  },
  {
    airlineCode: "PEV",
    telephony: "PEOPLES",
  },
  {
    airlineCode: "PGN",
    telephony: "PEREGRINE",
  },
  {
    airlineCode: "PEF",
    telephony: "PERFECT AVIATION",
  },
  {
    airlineCode: "PFC",
    telephony: "PERFORMANCE AIR",
  },
  {
    airlineCode: "PAG",
    telephony: "PERIMETER",
  },
  {
    airlineCode: "PLV",
    telephony: "PERLA",
  },
  {
    airlineCode: "FPI",
    telephony: "PERSIA",
  },
  {
    airlineCode: "PPQ",
    telephony: "PERSONASPAQ",
  },
  {
    airlineCode: "PVN",
    telephony: "PERUVIAN",
  },
  {
    airlineCode: "PMO",
    telephony: "PETER AIR",
  },
  {
    airlineCode: "PEO",
    telephony: "PETRO AIR",
  },
  {
    airlineCode: "PTK",
    telephony: "PETROKAM",
  },
  {
    airlineCode: "PHM",
    telephony: "PETROLEUM",
  },
  {
    airlineCode: "PTY",
    telephony: "PETTY",
  },
  {
    airlineCode: "XAI",
    telephony: "PEX AIR",
  },
  {
    airlineCode: "PFU",
    telephony: "PFUNWA",
  },
  {
    airlineCode: "APV",
    telephony: "PHILIP AIR",
  },
  {
    airlineCode: "PAL",
    telephony: "PHILIPPINE",
  },
  {
    airlineCode: "PHL",
    telephony: "PHILLIPS",
  },
  {
    airlineCode: "PHB",
    telephony: "PHOEBUS",
  },
  {
    airlineCode: "TCW",
    telephony: "PHOENIX",
  },
  {
    airlineCode: "PXG",
    telephony: "PHOENIX GLOBAL",
  },
  {
    airlineCode: "PXJ",
    telephony: "PHOENIX JET",
  },
  {
    airlineCode: "KHP",
    telephony: "PHOTROS AIR",
  },
  {
    airlineCode: "PDT",
    telephony: "PIEDMONT",
  },
  {
    airlineCode: "PSG",
    telephony: "PIER JET",
  },
  {
    airlineCode: "AIM",
    telephony: "PIJO",
  },
  {
    airlineCode: "PKP",
    telephony: "PIKES PEAK",
  },
  {
    airlineCode: "PLU",
    telephony: "PILATUS MEXICO",
  },
  {
    airlineCode: "PCH",
    telephony: "PILATUS WINGS",
  },
  {
    airlineCode: "PBA",
    telephony: "PILBARA",
  },
  {
    airlineCode: "PLG",
    telephony: "PILGRIM",
  },
  {
    airlineCode: "RPP",
    telephony: "PILIPINAS",
  },
  {
    airlineCode: "PIP",
    telephony: "PILOT",
  },
  {
    airlineCode: "UPL",
    telephony: "PILOT SCHOOL",
  },
  {
    airlineCode: "PXX",
    telephony: "PINE STATE",
  },
  {
    airlineCode: "PNP",
    telephony: "PINEAPPLE AIR",
  },
  {
    airlineCode: "PIM",
    telephony: "PINFRAMAT",
  },
  {
    airlineCode: "PCL",
    telephony: "PINNACLE GROUP",
  },
  {
    airlineCode: "ISW",
    telephony: "PINTADERA",
  },
  {
    airlineCode: "PIO",
    telephony: "PIONEER",
  },
  {
    airlineCode: "PPS",
    telephony: "PIPESTONE",
  },
  {
    airlineCode: "PRN",
    telephony: "PIRINAIR EXPRESS",
  },
  {
    airlineCode: "BPO",
    telephony: "PIROL",
  },
  {
    airlineCode: "PJC",
    telephony: "PITTSBURGH JET",
  },
  {
    airlineCode: "PTD",
    telephony: "PITY",
  },
  {
    airlineCode: "PXR",
    telephony: "PIXAIR",
  },
  {
    airlineCode: "PLN",
    telephony: "PLANAR",
  },
  {
    airlineCode: "PMS",
    telephony: "PLANEMASTER",
  },
  {
    airlineCode: "PLQ",
    telephony: "PLANETCAM",
  },
  {
    airlineCode: "PTL",
    telephony: "PLANTATION",
  },
  {
    airlineCode: "GJW",
    telephony: "PLATA",
  },
  {
    airlineCode: "EHD",
    telephony: "PLATINUM AIR",
  },
  {
    airlineCode: "EXD",
    telephony: "PLATINUM EXEC",
  },
  {
    airlineCode: "PKW",
    telephony: "PLATINUM WEST",
  },
  {
    airlineCode: "FPY",
    telephony: "PLAYER",
  },
  {
    airlineCode: "PYZ",
    telephony: "PLAYERS AIR",
  },
  {
    airlineCode: "PUA",
    telephony: "PLUNA",
  },
  {
    airlineCode: "PSY",
    telephony: "PLYSA",
  },
  {
    airlineCode: "PBD",
    telephony: "POBEDA",
  },
  {
    airlineCode: "POB",
    telephony: "POBLANOS",
  },
  {
    airlineCode: "POC",
    telephony: "POCONO",
  },
  {
    airlineCode: "VET",
    telephony: "POINSETT AIR",
  },
  {
    airlineCode: "RMI",
    telephony: "POINT AIRLINE",
  },
  {
    airlineCode: "PAW",
    telephony: "POINTAIR BURKINA",
  },
  {
    airlineCode: "PAZ",
    telephony: "POINTAIR NIGER",
  },
  {
    airlineCode: "PAC",
    telephony: "POLAR",
  },
  {
    airlineCode: "PBR",
    telephony: "POLAR BEAR",
  },
  {
    airlineCode: "PLR",
    telephony: "POLARIS",
  },
  {
    airlineCode: "PSR",
    telephony: "POLESTAR",
  },
  {
    airlineCode: "UKP",
    telephony: "POLICE",
  },
  {
    airlineCode: "EDL",
    telephony: "POLICE EDELWEISS",
  },
  {
    airlineCode: "PIK",
    telephony: "POLICE IKARUS",
  },
  {
    airlineCode: "PMV",
    telephony: "POLICE MERLIN",
  },
  {
    airlineCode: "PPH",
    telephony: "POLICE PHOENIX",
  },
  {
    airlineCode: "PFP",
    telephony: "POLICIA FEDERAL",
  },
  {
    airlineCode: "PLF",
    telephony: "POLISH AIRFORCE",
  },
  {
    airlineCode: "AEI",
    telephony: "POLISH BIRD",
  },
  {
    airlineCode: "PNY",
    telephony: "POLISH NAVY",
  },
  {
    airlineCode: "PCT",
    telephony: "POLLUTION PATROL",
  },
  {
    airlineCode: "PLA",
    telephony: "POLYAIR",
  },
  {
    airlineCode: "PLB",
    telephony: "POLYBLUE",
  },
  {
    airlineCode: "PAO",
    telephony: "POLYNESIAN",
  },
  {
    airlineCode: "PSI",
    telephony: "PONT",
  },
  {
    airlineCode: "PTA",
    telephony: "PONTAIR",
  },
  {
    airlineCode: "PLX",
    telephony: "POOLEX",
  },
  {
    airlineCode: "PSZ",
    telephony: "POP-AIR",
  },
  {
    airlineCode: "SPC",
    telephony: "PORT",
  },
  {
    airlineCode: "POR",
    telephony: "PORTEADORA",
  },
  {
    airlineCode: "POE",
    telephony: "PORTER AIR",
  },
  {
    airlineCode: "PGA",
    telephony: "PORTUGALIA",
  },
  {
    airlineCode: "AFP",
    telephony: "PORTUGUESE AIR FORCE",
  },
  {
    airlineCode: "POA",
    telephony: "PORTUGUESE ARMY",
  },
  {
    airlineCode: "PON",
    telephony: "PORTUGUESE NAVY",
  },
  {
    airlineCode: "PTM",
    telephony: "POSTMAN",
  },
  {
    airlineCode: "VPT",
    telephony: "POTOK",
  },
  {
    airlineCode: "PSN",
    telephony: "POTOSINA",
  },
  {
    airlineCode: "PYA",
    telephony: "POUYA AIR",
  },
  {
    airlineCode: "PYN",
    telephony: "POYSTON",
  },
  {
    airlineCode: "PRB",
    telephony: "PRAMS AIR",
  },
  {
    airlineCode: "PUN",
    telephony: "PRATISE",
  },
  {
    airlineCode: "PWC",
    telephony: "PRATT",
  },
  {
    airlineCode: "PKZ",
    telephony: "PRAVI",
  },
  {
    airlineCode: "PRE",
    telephony: "PRECISION",
  },
  {
    airlineCode: "PRF",
    telephony: "PRECISION AIR",
  },
  {
    airlineCode: "PDK",
    telephony: "PREDANNACK",
  },
  {
    airlineCode: "VGL",
    telephony: "PREFECT",
  },
  {
    airlineCode: "PPJ",
    telephony: "PREMIER JETS",
  },
  {
    airlineCode: "PGL",
    telephony: "PREMIERE",
  },
  {
    airlineCode: "PSU",
    telephony: "PREMIUM",
  },
  {
    airlineCode: "MXG",
    telephony: "PRESIDENCIA DE MEXICO",
  },
  {
    airlineCode: "PRD",
    telephony: "PRESIDENTIAL",
  },
  {
    airlineCode: "EGL",
    telephony: "PRESTIGE",
  },
  {
    airlineCode: "PWA",
    telephony: "PRIESTER",
  },
  {
    airlineCode: "PIU",
    telephony: "PRIMA",
  },
  {
    airlineCode: "SMP",
    telephony: "PRIMA AVIATION",
  },
  {
    airlineCode: "PMC",
    telephony: "PRIMAC",
  },
  {
    airlineCode: "PRM",
    telephony: "PRIME AIR",
  },
  {
    airlineCode: "PRT",
    telephony: "PRIME ITALIA",
  },
  {
    airlineCode: "PML",
    telephony: "PRIME NIGERIA",
  },
  {
    airlineCode: "PJZ",
    telephony: "PRIMEJET",
  },
  {
    airlineCode: "PRI",
    telephony: "PRIMERA",
  },
  {
    airlineCode: "JPT",
    telephony: "PRIMETIME",
  },
  {
    airlineCode: "APR",
    telephony: "PRIMORDIALES",
  },
  {
    airlineCode: "PNC",
    telephony: "PRINCE AVIATION",
  },
  {
    airlineCode: "PJP",
    telephony: "PRINCELY JETS",
  },
  {
    airlineCode: "PCN",
    telephony: "PRINCETON",
  },
  {
    airlineCode: "PCP",
    telephony: "PRINCIPAL",
  },
  {
    airlineCode: "PRY",
    telephony: "PRIORITY AIR",
  },
  {
    airlineCode: "PJA",
    telephony: "PRIVATE FLIGHT",
  },
  {
    airlineCode: "PVO",
    telephony: "PRIVATE ORANGE",
  },
  {
    airlineCode: "PWF",
    telephony: "PRIVATE WINGS",
  },
  {
    airlineCode: "PVG",
    telephony: "PRIVILEGE",
  },
  {
    airlineCode: "VDC",
    telephony: "PRIVIUM",
  },
  {
    airlineCode: "FPC",
    telephony: "PRO CONNECT",
  },
  {
    airlineCode: "PFZ",
    telephony: "PROFLIGHT-ZAMBIA",
  },
  {
    airlineCode: "PSS",
    telephony: "PROGRESS",
  },
  {
    airlineCode: "PRH",
    telephony: "PROHAWK",
  },
  {
    airlineCode: "PJF",
    telephony: "PROJET",
  },
  {
    airlineCode: "PRJ",
    telephony: "PRONAIR",
  },
  {
    airlineCode: "PRP",
    telephony: "PRONTO",
  },
  {
    airlineCode: "PRO",
    telephony: "PROPAIR",
  },
  {
    airlineCode: "PPR",
    telephony: "PROPSTAR",
  },
  {
    airlineCode: "PSV",
    telephony: "PROSERVICIOS",
  },
  {
    airlineCode: "SJV",
    telephony: "PROSPER",
  },
  {
    airlineCode: "PCI",
    telephony: "PROTEA COIN",
  },
  {
    airlineCode: "PTH",
    telephony: "PROTEUS",
  },
  {
    airlineCode: "PVL",
    telephony: "PROVINCIAL",
  },
  {
    airlineCode: "PSW",
    telephony: "PSKOVAVIA",
  },
  {
    airlineCode: "MOP",
    telephony: "PUBLICITARIA",
  },
  {
    airlineCode: "PSP",
    telephony: "PUBLISERVICIOS",
  },
  {
    airlineCode: "PUV",
    telephony: "PUBLIVOO",
  },
  {
    airlineCode: "PLM",
    telephony: "PULLMAN",
  },
  {
    airlineCode: "PUL",
    telephony: "PULSE",
  },
  {
    airlineCode: "PLY",
    telephony: "PUMA BRASIL",
  },
  {
    airlineCode: "PDU",
    telephony: "PURDUE",
  },
  {
    airlineCode: "QLK",
    telephony: "Q LINK",
  },
  {
    airlineCode: "QFA",
    telephony: "QANTAS",
  },
  {
    airlineCode: "QNZ",
    telephony: "QANTAS JETCONNECT",
  },
  {
    airlineCode: "QTR",
    telephony: "QATARI",
  },
  {
    airlineCode: "QSM",
    telephony: "QESHM AIR",
  },
  {
    airlineCode: "QQE",
    telephony: "QREX",
  },
  {
    airlineCode: "QGA",
    telephony: "QUADRIGA",
  },
  {
    airlineCode: "QHD",
    telephony: "QUAHADI",
  },
  {
    airlineCode: "TAY",
    telephony: "QUALITY",
  },
  {
    airlineCode: "AQU",
    telephony: "QUARIUS",
  },
  {
    airlineCode: "QUE",
    telephony: "QUEBEC",
  },
  {
    airlineCode: "CAR",
    telephony: "QUEBEC ROMEO",
  },
  {
    airlineCode: "QNR",
    telephony: "QUEEN AIR",
  },
  {
    airlineCode: "HYT",
    telephony: "QUICK AIR",
  },
  {
    airlineCode: "QID",
    telephony: "QUID",
  },
  {
    airlineCode: "FQA",
    telephony: "QUIK LIFT",
  },
  {
    airlineCode: "GLQ",
    telephony: "QUILADA",
  },
  {
    airlineCode: "QUI",
    telephony: "QUIMMCO",
  },
  {
    airlineCode: "QAS",
    telephony: "QUISQUEYA",
  },
  {
    airlineCode: "NSY",
    telephony: "QUNYING",
  },
  {
    airlineCode: "QPL",
    telephony: "QUPULA",
  },
  {
    airlineCode: "QAQ",
    telephony: "QURINEA AIR",
  },
  {
    airlineCode: "RJT",
    telephony: "RA JET",
  },
  {
    airlineCode: "RBB",
    telephony: "RABBIT",
  },
  {
    airlineCode: "RTO",
    telephony: "RACCOON",
  },
  {
    airlineCode: "RDA",
    telephony: "RADA",
  },
  {
    airlineCode: "YSY",
    telephony: "RADIO",
  },
  {
    airlineCode: "RFR",
    telephony: "RAFAIR",
  },
  {
    airlineCode: "RFD",
    telephony: "RAFILHER",
  },
  {
    airlineCode: "RAG",
    telephony: "RAGLAN",
  },
  {
    airlineCode: "MEN",
    telephony: "RAHAL",
  },
  {
    airlineCode: "RIH",
    telephony: "RAHILA",
  },
  {
    airlineCode: "CRR",
    telephony: "RAILCAR",
  },
  {
    airlineCode: "TZR",
    telephony: "RAIN-BEE",
  },
  {
    airlineCode: "XYZ",
    telephony: "RAINBIRD",
  },
  {
    airlineCode: "TQF",
    telephony: "RAINBOW",
  },
  {
    airlineCode: "RAT",
    telephony: "RAINDROP",
  },
  {
    airlineCode: "RMN",
    telephony: "RAINMAN",
  },
  {
    airlineCode: "FRB",
    telephony: "RAKWAY",
  },
  {
    airlineCode: "REX",
    telephony: "RAM EXPRESS",
  },
  {
    airlineCode: "RMT",
    telephony: "RAM FLIGHT",
  },
  {
    airlineCode: "RPX",
    telephony: "RAPEX",
  },
  {
    airlineCode: "LIX",
    telephony: "RAPIDLINX",
  },
  {
    airlineCode: "FLS",
    telephony: "RAPIDOS",
  },
  {
    airlineCode: "RAP",
    telephony: "RAPTOR",
  },
  {
    airlineCode: "LPR",
    telephony: "RATOVNIK",
  },
  {
    airlineCode: "RLR",
    telephony: "RATTLER",
  },
  {
    airlineCode: "RVR",
    telephony: "RAVEN",
  },
  {
    airlineCode: "RVA",
    telephony: "RAVEN AIR",
  },
  {
    airlineCode: "RVF",
    telephony: "RAVEN FLIGHT",
  },
  {
    airlineCode: "RVN",
    telephony: "RAVEN U-S",
  },
  {
    airlineCode: "RMY",
    telephony: "RAYA EXPRESS",
  },
  {
    airlineCode: "RTN",
    telephony: "RAYTHEON",
  },
  {
    airlineCode: "RAB",
    telephony: "RAYYAN INTERNATIONAL",
  },
  {
    airlineCode: "RCH",
    telephony: "REACH",
  },
  {
    airlineCode: "REH",
    telephony: "REACHMED",
  },
  {
    airlineCode: "RLJ",
    telephony: "REAL JET",
  },
  {
    airlineCode: "RLT",
    telephony: "REAL TONGA",
  },
  {
    airlineCode: "REB",
    telephony: "REBUS",
  },
  {
    airlineCode: "RZR",
    telephony: "RECOVERY",
  },
  {
    airlineCode: "RIX",
    telephony: "RECTRIX",
  },
  {
    airlineCode: "IFA",
    telephony: "RED ANGEL",
  },
  {
    airlineCode: "SAK",
    telephony: "RED ARROWS",
  },
  {
    airlineCode: "RDN",
    telephony: "RED BARN",
  },
  {
    airlineCode: "RBN",
    telephony: "RED BARON",
  },
  {
    airlineCode: "AXM",
    telephony: "RED CAP",
  },
  {
    airlineCode: "MPD",
    telephony: "RED COMET",
  },
  {
    airlineCode: "RED",
    telephony: "RED CROSS",
  },
  {
    airlineCode: "DEV",
    telephony: "RED DEVILS",
  },
  {
    airlineCode: "REA",
    telephony: "RED DOMINICANA",
  },
  {
    airlineCode: "RDK",
    telephony: "RED DUKE",
  },
  {
    airlineCode: "APM",
    telephony: "RED FINN",
  },
  {
    airlineCode: "RDF",
    telephony: "RED FOX",
  },
  {
    airlineCode: "ORI",
    telephony: "RED GLOBE",
  },
  {
    airlineCode: "RHD",
    telephony: "RED HEAD",
  },
  {
    airlineCode: "RDJ",
    telephony: "RED JET",
  },
  {
    airlineCode: "AWY",
    telephony: "RED KITE",
  },
  {
    airlineCode: "IAD",
    telephony: "RED KNIGHT",
  },
  {
    airlineCode: "RDL",
    telephony: "RED LIFT",
  },
  {
    airlineCode: "LXA",
    telephony: "RED LION",
  },
  {
    airlineCode: "IDX",
    telephony: "RED PHOENIX",
  },
  {
    airlineCode: "ROK",
    telephony: "RED ROCK",
  },
  {
    airlineCode: "RSV",
    telephony: "RED SKY",
  },
  {
    airlineCode: "RDR",
    telephony: "RED STAR",
  },
  {
    airlineCode: "RSP",
    telephony: "RED STRIPE",
  },
  {
    airlineCode: "RWG",
    telephony: "RED WING",
  },
  {
    airlineCode: "DLF",
    telephony: "RED WISENT",
  },
  {
    airlineCode: "RHC",
    telephony: "REDAIR",
  },
  {
    airlineCode: "RBD",
    telephony: "REDBIRD",
  },
  {
    airlineCode: "RHK",
    telephony: "REDHAWK",
  },
  {
    airlineCode: "LAK",
    telephony: "REDLAKE",
  },
  {
    airlineCode: "NRS",
    telephony: "REDNOSE",
  },
  {
    airlineCode: "RSK",
    telephony: "REDSKIN",
  },
  {
    airlineCode: "VRD",
    telephony: "REDWOOD",
  },
  {
    airlineCode: "REF",
    telephony: "REEF AIR",
  },
  {
    airlineCode: "RVV",
    telephony: "REEVE",
  },
  {
    airlineCode: "RFX",
    telephony: "REFLEX",
  },
  {
    airlineCode: "RGA",
    telephony: "REGA",
  },
  {
    airlineCode: "RER",
    telephony: "REGAIR",
  },
  {
    airlineCode: "NGP",
    telephony: "REGAL EAGLE",
  },
  {
    airlineCode: "RGY",
    telephony: "REGENCY",
  },
  {
    airlineCode: "RGE",
    telephony: "REGENT",
  },
  {
    airlineCode: "RGC",
    telephony: "REGIOMONTANO",
  },
  {
    airlineCode: "RGB",
    telephony: "REGIONAL AIR",
  },
  {
    airlineCode: "REJ",
    telephony: "REGIONAL LINK",
  },
  {
    airlineCode: "REG",
    telephony: "REGIONAL SERVICES",
  },
  {
    airlineCode: "ROG",
    telephony: "REGO",
  },
  {
    airlineCode: "RTG",
    telephony: "REITAN",
  },
  {
    airlineCode: "RLX",
    telephony: "RELAX",
  },
  {
    airlineCode: "REL",
    telephony: "RELIANCE AIR",
  },
  {
    airlineCode: "RLI",
    telephony: "RELIANT",
  },
  {
    airlineCode: "RTS",
    telephony: "RELIEF",
  },
  {
    airlineCode: "SQU",
    telephony: "REMUDO",
  },
  {
    airlineCode: "RNG",
    telephony: "RENEGADE",
  },
  {
    airlineCode: "RGS",
    telephony: "RENOWN",
  },
  {
    airlineCode: "RPN",
    telephony: "REPATRIATE",
  },
  {
    airlineCode: "MTH",
    telephony: "RESEARCH",
  },
  {
    airlineCode: "RST",
    telephony: "RESORT AIR",
  },
  {
    airlineCode: "RPS",
    telephony: "RESPONSE",
  },
  {
    airlineCode: "REU",
    telephony: "REUNION",
  },
  {
    airlineCode: "RVQ",
    telephony: "REVA AIR",
  },
  {
    airlineCode: "EST",
    telephony: "REVAL",
  },
  {
    airlineCode: "RLO",
    telephony: "REVILO",
  },
  {
    airlineCode: "RJE",
    telephony: "REYNOLDS JET",
  },
  {
    airlineCode: "RWL",
    telephony: "RHEINTRAINER",
  },
  {
    airlineCode: "RDS",
    telephony: "RHOADES EXPRESS",
  },
  {
    airlineCode: "AEL",
    telephony: "RHOMBUS",
  },
  {
    airlineCode: "FNO",
    telephony: "RIAZOR",
  },
  {
    airlineCode: "WLM",
    telephony: "RIBICA",
  },
  {
    airlineCode: "RIA",
    telephony: "RICHAIR",
  },
  {
    airlineCode: "RIC",
    telephony: "RICHARDSON",
  },
  {
    airlineCode: "RCA",
    telephony: "RICHLAND",
  },
  {
    airlineCode: "RLE",
    telephony: "RICO",
  },
  {
    airlineCode: "ERU",
    telephony: "RIDDLE",
  },
  {
    airlineCode: "RGL",
    telephony: "RIDGELINE",
  },
  {
    airlineCode: "RIM",
    telephony: "RIMROCK",
  },
  {
    airlineCode: "REO",
    telephony: "RIO",
  },
  {
    airlineCode: "RIO",
    telephony: "RIO LINHAS",
  },
  {
    airlineCode: "RBK",
    telephony: "RIOBAKER",
  },
  {
    airlineCode: "SBV",
    telephony: "RIPPLE",
  },
  {
    airlineCode: "RTD",
    telephony: "RIPTIDE",
  },
  {
    airlineCode: "GDH",
    telephony: "RISING SUN",
  },
  {
    airlineCode: "RIN",
    telephony: "RISSINGTON",
  },
  {
    airlineCode: "RZT",
    telephony: "RITZ JET",
  },
  {
    airlineCode: "CKM",
    telephony: "RIVAFLECHA",
  },
  {
    airlineCode: "RVM",
    telephony: "RIVER",
  },
  {
    airlineCode: "RVC",
    telephony: "RIVER CITY",
  },
  {
    airlineCode: "RVJ",
    telephony: "RIVERS JET",
  },
  {
    airlineCode: "RIV",
    telephony: "RIVIERA",
  },
  {
    airlineCode: "PIN",
    telephony: "ROAD RUNNERS",
  },
  {
    airlineCode: "ROX",
    telephony: "ROBLEX",
  },
  {
    airlineCode: "ERA",
    telephony: "ROCAN",
  },
  {
    airlineCode: "JNY",
    telephony: "ROCK BAND",
  },
  {
    airlineCode: "XAA",
    telephony: "ROCKFISH",
  },
  {
    airlineCode: "JAT",
    telephony: "ROCKSMART",
  },
  {
    airlineCode: "RKS",
    telephony: "ROCKSTAR",
  },
  {
    airlineCode: "RKK",
    telephony: "ROCKTOWN",
  },
  {
    airlineCode: "FSF",
    telephony: "ROCKY",
  },
  {
    airlineCode: "RMA",
    telephony: "ROCKY MOUNTAIN",
  },
  {
    airlineCode: "KOW",
    telephony: "RODEO",
  },
  {
    airlineCode: "RDY",
    telephony: "RODNEY",
  },
  {
    airlineCode: "RDZ",
    telephony: "RODZE AIR",
  },
  {
    airlineCode: "RWN",
    telephony: "ROJAS",
  },
  {
    airlineCode: "RLA",
    telephony: "ROLEMA",
  },
  {
    airlineCode: "RAV",
    telephony: "ROLLINS",
  },
  {
    airlineCode: "RRZ",
    telephony: "ROLLRIGHT",
  },
  {
    airlineCode: "BTU",
    telephony: "ROLLS",
  },
  {
    airlineCode: "ROF",
    telephony: "ROMAF",
  },
  {
    airlineCode: "RFT",
    telephony: "ROMANIAN ACADEMY",
  },
  {
    airlineCode: "RCR",
    telephony: "ROMCARGO",
  },
  {
    airlineCode: "ROM",
    telephony: "ROME",
  },
  {
    airlineCode: "PTO",
    telephony: "ROOKIE",
  },
  {
    airlineCode: "HHN",
    telephony: "ROOSTER",
  },
  {
    airlineCode: "ROR",
    telephony: "RORAIMA",
  },
  {
    airlineCode: "URA",
    telephony: "ROSAVIA",
  },
  {
    airlineCode: "REM",
    telephony: "ROSE",
  },
  {
    airlineCode: "RSS",
    telephony: "ROSS CHARTER",
  },
  {
    airlineCode: "FLB",
    telephony: "ROSSIGNOL",
  },
  {
    airlineCode: "SDM",
    telephony: "ROSSIYA",
  },
  {
    airlineCode: "RVT",
    telephony: "ROSTVERTOL",
  },
  {
    airlineCode: "RAL",
    telephony: "ROSWELL",
  },
  {
    airlineCode: "RJD",
    telephony: "ROTANA",
  },
  {
    airlineCode: "VEK",
    telephony: "ROTCEV",
  },
  {
    airlineCode: "EHR",
    telephony: "ROTOR",
  },
  {
    airlineCode: "HCT",
    telephony: "ROTORCAT",
  },
  {
    airlineCode: "RTI",
    telephony: "ROTORITALIA",
  },
  {
    airlineCode: "ROW",
    telephony: "ROTORWING",
  },
  {
    airlineCode: "ROU",
    telephony: "ROUGE",
  },
  {
    airlineCode: "RUF",
    telephony: "ROUGH RIDER",
  },
  {
    airlineCode: "ROV",
    telephony: "ROVERAIR",
  },
  {
    airlineCode: "RLM",
    telephony: "ROYAL AMERICAN",
  },
  {
    airlineCode: "RYB",
    telephony: "ROYAL BAHRAIN",
  },
  {
    airlineCode: "RBL",
    telephony: "ROYAL BELAU",
  },
  {
    airlineCode: "DRK",
    telephony: "ROYAL BHUTAN",
  },
  {
    airlineCode: "RTL",
    telephony: "ROYAL BIRD",
  },
  {
    airlineCode: "RCG",
    telephony: "ROYAL CARGO",
  },
  {
    airlineCode: "ABG",
    telephony: "ROYAL FLIGHT",
  },
  {
    airlineCode: "RNA",
    telephony: "ROYAL NEPAL",
  },
  {
    airlineCode: "RRA",
    telephony: "ROYAL RWANDA",
  },
  {
    airlineCode: "RSW",
    telephony: "ROYAL SKY",
  },
  {
    airlineCode: "SPW",
    telephony: "ROYAL SPIRIT",
  },
  {
    airlineCode: "RSM",
    telephony: "ROYAL STAR",
  },
  {
    airlineCode: "RWE",
    telephony: "ROYAL WEST",
  },
  {
    airlineCode: "RYW",
    telephony: "ROYAL WINGS",
  },
  {
    airlineCode: "QZR",
    telephony: "ROYAL ZAM",
  },
  {
    airlineCode: "RAM",
    telephony: "ROYALAIR MAROC",
  },
  {
    airlineCode: "ROJ",
    telephony: "ROYALJET",
  },
  {
    airlineCode: "VLM",
    telephony: "RUBENS",
  },
  {
    airlineCode: "RBY",
    telephony: "RUBY",
  },
  {
    airlineCode: "RSB",
    telephony: "RUBYSTAR",
  },
  {
    airlineCode: "EMM",
    telephony: "RULER",
  },
  {
    airlineCode: "RMG",
    telephony: "RUMUGU AIR",
  },
  {
    airlineCode: "BIT",
    telephony: "RUN BITTY",
  },
  {
    airlineCode: "RNR",
    telephony: "RUNNER",
  },
  {
    airlineCode: "FRA",
    telephony: "RUSHTON",
  },
  {
    airlineCode: "RSJ",
    telephony: "RUSJET",
  },
  {
    airlineCode: "RLU",
    telephony: "RUSLINE AIR",
  },
  {
    airlineCode: "OVD",
    telephony: "RUSSIA CORP",
  },
  {
    airlineCode: "RFF",
    telephony: "RUSSIAN AIRFORCE",
  },
  {
    airlineCode: "GLX",
    telephony: "RUSSIAN BIRD",
  },
  {
    airlineCode: "RFE",
    telephony: "RUSSIAN EXPRESS",
  },
  {
    airlineCode: "RSY",
    telephony: "RUSSIAN SKY",
  },
  {
    airlineCode: "RUR",
    telephony: "RUSSTAR",
  },
  {
    airlineCode: "MMG",
    telephony: "RUTA MAYA",
  },
  {
    airlineCode: "RUC",
    telephony: "RUTACA",
  },
  {
    airlineCode: "RWD",
    telephony: "RWANDAIR",
  },
  {
    airlineCode: "RYA",
    telephony: "RYAN AIR",
  },
  {
    airlineCode: "RYN",
    telephony: "RYAN INTERNATIONAL",
  },
  {
    airlineCode: "RYR",
    telephony: "RYANAIR",
  },
  {
    airlineCode: "RYJ",
    telephony: "RYJET",
  },
  {
    airlineCode: "RAA",
    telephony: "RYNES AVIATION",
  },
  {
    airlineCode: "SBF",
    telephony: "S-BAR",
  },
  {
    airlineCode: "SCT",
    telephony: "SAAB-CRAFT",
  },
  {
    airlineCode: "SAX",
    telephony: "SABAH AIR",
  },
  {
    airlineCode: "SBC",
    telephony: "SABIAN AIR",
  },
  {
    airlineCode: "EXU",
    telephony: "SACIR",
  },
  {
    airlineCode: "SDT",
    telephony: "SADAT",
  },
  {
    airlineCode: "SDK",
    telephony: "SADELCA",
  },
  {
    airlineCode: "ETE",
    telephony: "SAELITE",
  },
  {
    airlineCode: "KSP",
    telephony: "SAEP",
  },
  {
    airlineCode: "SRO",
    telephony: "SAEREO",
  },
  {
    airlineCode: "SSS",
    telephony: "SAESA",
  },
  {
    airlineCode: "SHP",
    telephony: "SAF",
  },
  {
    airlineCode: "SXY",
    telephony: "SAFARI EXPRESS",
  },
  {
    airlineCode: "XLK",
    telephony: "SAFARILINK",
  },
  {
    airlineCode: "IRV",
    telephony: "SAFAT AIR",
  },
  {
    airlineCode: "SFV",
    telephony: "SAFE SERVICIOS",
  },
  {
    airlineCode: "SFW",
    telephony: "SAFI AIRWAYS",
  },
  {
    airlineCode: "SFN",
    telephony: "SAFIRAN",
  },
  {
    airlineCode: "PQA",
    telephony: "SAGE BRUSH",
  },
  {
    airlineCode: "SGP",
    telephony: "SAGOLAIR",
  },
  {
    airlineCode: "IRZ",
    telephony: "SAHA",
  },
  {
    airlineCode: "IRS",
    telephony: "SAHAND AIR",
  },
  {
    airlineCode: "RSH",
    telephony: "SAHARA",
  },
  {
    airlineCode: "HRV",
    telephony: "SAHARA-SERVICE",
  },
  {
    airlineCode: "AWJ",
    telephony: "SAHEL AIRLINES",
  },
  {
    airlineCode: "STN",
    telephony: "SAINT ATHAN",
  },
  {
    airlineCode: "SAJ",
    telephony: "SAINT JET",
  },
  {
    airlineCode: "SXM",
    telephony: "SAINT MAARTEN",
  },
  {
    airlineCode: "SFU",
    telephony: "SAINTS",
  },
  {
    airlineCode: "LMP",
    telephony: "SAISA",
  },
  {
    airlineCode: "CYE",
    telephony: "SAKIRA",
  },
  {
    airlineCode: "HGK",
    telephony: "SALAAMA",
  },
  {
    airlineCode: "SIR",
    telephony: "SALAIR",
  },
  {
    airlineCode: "KGC",
    telephony: "SALAM AIR",
  },
  {
    airlineCode: "SPS",
    telephony: "SALDUERO",
  },
  {
    airlineCode: "SLW",
    telephony: "SALMA AIR",
  },
  {
    airlineCode: "SLP",
    telephony: "SALPA",
  },
  {
    airlineCode: "SLC",
    telephony: "SALSA",
  },
  {
    airlineCode: "SVV",
    telephony: "SALTAVIATION",
  },
  {
    airlineCode: "EDC",
    telephony: "SALTIRE",
  },
  {
    airlineCode: "SAM",
    telephony: "SAM",
  },
  {
    airlineCode: "SAM",
    telephony: "SAM",
  },
  {
    airlineCode: "NSP",
    telephony: "SAM PURSE",
  },
  {
    airlineCode: "SMQ",
    telephony: "SAMAR AIR",
  },
  {
    airlineCode: "SMI",
    telephony: "SAMI",
  },
  {
    airlineCode: "SAE",
    telephony: "SAMPOERNA",
  },
  {
    airlineCode: "QAZ",
    telephony: "SAMRUK",
  },
  {
    airlineCode: "SHL",
    telephony: "SAMSON",
  },
  {
    airlineCode: "SCI",
    telephony: "SAN CRISTOBAL",
  },
  {
    airlineCode: "SJN",
    telephony: "SAN JUAN",
  },
  {
    airlineCode: "TSR",
    telephony: "SAN MARINO",
  },
  {
    airlineCode: "SRF",
    telephony: "SAN RAFAEL",
  },
  {
    airlineCode: "CSI",
    telephony: "SANDIA",
  },
  {
    airlineCode: "WDE",
    telephony: "SANDSTONE",
  },
  {
    airlineCode: "SDY",
    telephony: "SANDY ISLE",
  },
  {
    airlineCode: "SNE",
    telephony: "SANSA",
  },
  {
    airlineCode: "XMS",
    telephony: "SANTA",
  },
  {
    airlineCode: "BBR",
    telephony: "SANTA BARBARA",
  },
  {
    airlineCode: "XSN",
    telephony: "SANTANA",
  },
  {
    airlineCode: "SMS",
    telephony: "SANTOMENSES",
  },
  {
    airlineCode: "SDU",
    telephony: "SANTOS",
  },
  {
    airlineCode: "STP",
    telephony: "SAOTOME AIRWAYS",
  },
  {
    airlineCode: "SPP",
    telephony: "SAPPHIRE",
  },
  {
    airlineCode: "SPH",
    telephony: "SAPPHIRE-CHARTER",
  },
  {
    airlineCode: "KGB",
    telephony: "SAPSAN",
  },
  {
    airlineCode: "MSG",
    telephony: "SAR-REGIONAL",
  },
  {
    airlineCode: "SSR",
    telephony: "SARDINIAN",
  },
  {
    airlineCode: "SRW",
    telephony: "SARIA",
  },
  {
    airlineCode: "JIM",
    telephony: "SARK",
  },
  {
    airlineCode: "AGU",
    telephony: "SARMA",
  },
  {
    airlineCode: "SSU",
    telephony: "SASCA",
  },
  {
    airlineCode: "SAC",
    telephony: "SASCO",
  },
  {
    airlineCode: "SSM",
    telephony: "SASEMAR",
  },
  {
    airlineCode: "SQH",
    telephony: "SASQUATCH",
  },
  {
    airlineCode: "SAT",
    telephony: "SATA",
  },
  {
    airlineCode: "NSE",
    telephony: "SATENA",
  },
  {
    airlineCode: "STV",
    telephony: "SATURN",
  },
  {
    airlineCode: "SGQ",
    telephony: "SAUDI GOLD",
  },
  {
    airlineCode: "SVA",
    telephony: "SAUDIA",
  },
  {
    airlineCode: "SNI",
    telephony: "SAVANAHLINE",
  },
  {
    airlineCode: "SVN",
    telephony: "SAVANAIR",
  },
  {
    airlineCode: "EUP",
    telephony: "SAVOY",
  },
  {
    airlineCode: "SAO",
    telephony: "SAVSER",
  },
  {
    airlineCode: "SWD",
    telephony: "SAWBLADE",
  },
  {
    airlineCode: "STT",
    telephony: "SAWTOOTH",
  },
  {
    airlineCode: "SJA",
    telephony: "SAWYER",
  },
  {
    airlineCode: "SXN",
    telephony: "SAXONAIR",
  },
  {
    airlineCode: "GCL",
    telephony: "SAXONIAN",
  },
  {
    airlineCode: "SMZ",
    telephony: "SCAMPTON",
  },
  {
    airlineCode: "CBU",
    telephony: "SCANAIR",
  },
  {
    airlineCode: "SAS",
    telephony: "SCANDINAVIAN",
  },
  {
    airlineCode: "CNO",
    telephony: "SCANOR",
  },
  {
    airlineCode: "OSU",
    telephony: "SCARLET",
  },
  {
    airlineCode: "SCQ",
    telephony: "SCAVAC",
  },
  {
    airlineCode: "SCE",
    telephony: "SCENIC",
  },
  {
    airlineCode: "ATO",
    telephony: "SCHOOL FLIGHT",
  },
  {
    airlineCode: "EVM",
    telephony: "SCIENCE",
  },
  {
    airlineCode: "SIQ",
    telephony: "SCIENCE QUEST",
  },
  {
    airlineCode: "IOS",
    telephony: "SCILLONIA",
  },
  {
    airlineCode: "HAX",
    telephony: "SCOOP",
  },
  {
    airlineCode: "TGW",
    telephony: "SCOOTER",
  },
  {
    airlineCode: "SCM",
    telephony: "SCREAMER",
  },
  {
    airlineCode: "SIB",
    telephony: "SEA AIR",
  },
  {
    airlineCode: "BEZ",
    telephony: "SEA BREEZE",
  },
  {
    airlineCode: "CJI",
    telephony: "SEA JET",
  },
  {
    airlineCode: "PAI",
    telephony: "SEA RAY",
  },
  {
    airlineCode: "MAV",
    telephony: "SEA WING",
  },
  {
    airlineCode: "SCC",
    telephony: "SEA-COASTER",
  },
  {
    airlineCode: "FSB",
    telephony: "SEABIRD",
  },
  {
    airlineCode: "SBS",
    telephony: "SEABORNE",
  },
  {
    airlineCode: "QBD",
    telephony: "SEAGULL AIR",
  },
  {
    airlineCode: "MFA",
    telephony: "SEAHORSE",
  },
  {
    airlineCode: "SRC",
    telephony: "SEARCA",
  },
  {
    airlineCode: "OSD",
    telephony: "SECDEF",
  },
  {
    airlineCode: "NWF",
    telephony: "SECOND CITY",
  },
  {
    airlineCode: "ANX",
    telephony: "SECRETARIA DEMARINA",
  },
  {
    airlineCode: "JCM",
    telephony: "SECUREAIR",
  },
  {
    airlineCode: "SEC",
    telephony: "SECUREX",
  },
  {
    airlineCode: "SVX",
    telephony: "SECURITY AIR",
  },
  {
    airlineCode: "GLS",
    telephony: "SEDBURGH",
  },
  {
    airlineCode: "SED",
    telephony: "SEDONA AIR",
  },
  {
    airlineCode: "SEE",
    telephony: "SEEKER",
  },
  {
    airlineCode: "IHO",
    telephony: "SEFEAS",
  },
  {
    airlineCode: "SGV",
    telephony: "SEGOVIA",
  },
  {
    airlineCode: "MSP",
    telephony: "SEGURIDAD",
  },
  {
    airlineCode: "MFJ",
    telephony: "SEGURO",
  },
  {
    airlineCode: "SEO",
    telephony: "SELCON AIR",
  },
  {
    airlineCode: "JSL",
    telephony: "SELECTJET",
  },
  {
    airlineCode: "SDV",
    telephony: "SELVA",
  },
  {
    airlineCode: "SEM",
    telephony: "SEMO",
  },
  {
    airlineCode: "RLH",
    telephony: "SENDI",
  },
  {
    airlineCode: "XMX",
    telephony: "SENEAM",
  },
  {
    airlineCode: "SEN",
    telephony: "SENIOR AIR",
  },
  {
    airlineCode: "SZN",
    telephony: "SENSA",
  },
  {
    airlineCode: "SEL",
    telephony: "SENTEL",
  },
  {
    airlineCode: "UVN",
    telephony: "SENYARI",
  },
  {
    airlineCode: "SPN",
    telephony: "SEPAHAN",
  },
  {
    airlineCode: "JPL",
    telephony: "SEQUOIA",
  },
  {
    airlineCode: "CNI",
    telephony: "SERAER",
  },
  {
    airlineCode: "SRE",
    telephony: "SERAMI",
  },
  {
    airlineCode: "SRB",
    telephony: "SERBIAN AIR FORCE",
  },
  {
    airlineCode: "SEP",
    telephony: "SERENE",
  },
  {
    airlineCode: "SIY",
    telephony: "SERENITY",
  },
  {
    airlineCode: "SIE",
    telephony: "SEREX",
  },
  {
    airlineCode: "SXT",
    telephony: "SERTAXI",
  },
  {
    airlineCode: "AND",
    telephony: "SERVI ANDES",
  },
  {
    airlineCode: "SDI",
    telephony: "SERVI DINAMIC",
  },
  {
    airlineCode: "HLV",
    telephony: "SERVI HELI",
  },
  {
    airlineCode: "LSN",
    telephony: "SERVI NAL",
  },
  {
    airlineCode: "SOC",
    telephony: "SERVIAEREO",
  },
  {
    airlineCode: "SMO",
    telephony: "SERVIAUTOMOTRIZ",
  },
  {
    airlineCode: "RCX",
    telephony: "SERVICE CENTER",
  },
  {
    airlineCode: "CDF",
    telephony: "SERVICIO AEREO",
  },
  {
    airlineCode: "SDX",
    telephony: "SERVICIO TECNICO",
  },
  {
    airlineCode: "ILS",
    telephony: "SERVICIOS ILSA",
  },
  {
    airlineCode: "NUL",
    telephony: "SERVICIOS NUEVOLEON",
  },
  {
    airlineCode: "SRL",
    telephony: "SERVICIOS PERSONAL",
  },
  {
    airlineCode: "SPV",
    telephony: "SERVICIOS PRIVADOS",
  },
  {
    airlineCode: "SPT",
    telephony: "SERVICIOS SUP",
  },
  {
    airlineCode: "SVZ",
    telephony: "SERVICIOS VIZ",
  },
  {
    airlineCode: "SRV",
    telephony: "SERVICORP",
  },
  {
    airlineCode: "SJC",
    telephony: "SERVIEJECUTIVO",
  },
  {
    airlineCode: "EMS",
    telephony: "SERVIEMPRESARIAL",
  },
  {
    airlineCode: "LLS",
    telephony: "SERVIESTRELLA",
  },
  {
    airlineCode: "GNA",
    telephony: "SERVIGANA",
  },
  {
    airlineCode: "JFS",
    telephony: "SERVIJET",
  },
  {
    airlineCode: "SGH",
    telephony: "SERVISAIR",
  },
  {
    airlineCode: "SES",
    telephony: "SERVISAL",
  },
  {
    airlineCode: "TEG",
    telephony: "SERVITLAL",
  },
  {
    airlineCode: "SNM",
    telephony: "SERVIZI AEREI",
  },
  {
    airlineCode: "SMA",
    telephony: "SESAME",
  },
  {
    airlineCode: "KOC",
    telephony: "SETAIR",
  },
  {
    airlineCode: "SLX",
    telephony: "SETE",
  },
  {
    airlineCode: "SSN",
    telephony: "SETOUCHI",
  },
  {
    airlineCode: "RVP",
    telephony: "SEVAIR",
  },
  {
    airlineCode: "SSF",
    telephony: "SEVERSTAL",
  },
  {
    airlineCode: "SEY",
    telephony: "SEYCHELLES",
  },
  {
    airlineCode: "SHW",
    telephony: "SHADOW",
  },
  {
    airlineCode: "SAI",
    telephony: "SHAHEEN AIR",
  },
  {
    airlineCode: "SBP",
    telephony: "SHAHIN BALL",
  },
  {
    airlineCode: "EIN",
    telephony: "SHAMROCK",
  },
  {
    airlineCode: "SAW",
    telephony: "SHAMWING",
  },
  {
    airlineCode: "PHF",
    telephony: "SHAN FENG",
  },
  {
    airlineCode: "CDG",
    telephony: "SHANDONG",
  },
  {
    airlineCode: "CSH",
    telephony: "SHANGHAI AIR",
  },
  {
    airlineCode: "SHQ",
    telephony: "SHANGHAI CARGO",
  },
  {
    airlineCode: "KJT",
    telephony: "SHANGHAI KINGJET",
  },
  {
    airlineCode: "RAS",
    telephony: "SHANHIL",
  },
  {
    airlineCode: "BHI",
    telephony: "SHARIF",
  },
  {
    airlineCode: "UGP",
    telephony: "SHARINK",
  },
  {
    airlineCode: "SHJ",
    telephony: "SHARJAH",
  },
  {
    airlineCode: "SSX",
    telephony: "SHASTA",
  },
  {
    airlineCode: "SHV",
    telephony: "SHAVANO",
  },
  {
    airlineCode: "SYS",
    telephony: "SHAWBURY",
  },
  {
    airlineCode: "SHE",
    telephony: "SHELL",
  },
  {
    airlineCode: "SCL",
    telephony: "SHELL CANADA",
  },
  {
    airlineCode: "SHM",
    telephony: "SHELTAM",
  },
  {
    airlineCode: "JHK",
    telephony: "SHENGLI",
  },
  {
    airlineCode: "CSZ",
    telephony: "SHENZHEN AIR",
  },
  {
    airlineCode: "RFI",
    telephony: "SHERLOCK",
  },
  {
    airlineCode: "FIS",
    telephony: "SHERRY",
  },
  {
    airlineCode: "NJA",
    telephony: "SHIN NIHON",
  },
  {
    airlineCode: "CHJ",
    telephony: "SHINING",
  },
  {
    airlineCode: "SHS",
    telephony: "SHIRAK",
  },
  {
    airlineCode: "SHI",
    telephony: "SHIRAZI",
  },
  {
    airlineCode: "HJI",
    telephony: "SHIV AIR",
  },
  {
    airlineCode: "SWH",
    telephony: "SHOCKWAVE",
  },
  {
    airlineCode: "SHG",
    telephony: "SHOP AIR",
  },
  {
    airlineCode: "SDB",
    telephony: "SHORE AIR",
  },
  {
    airlineCode: "CST",
    telephony: "SHORELINE",
  },
  {
    airlineCode: "BVN",
    telephony: "SHOW-ME",
  },
  {
    airlineCode: "SHA",
    telephony: "SHREE-AIR",
  },
  {
    airlineCode: "CSY",
    telephony: "SHUANGYANG",
  },
  {
    airlineCode: "CEN",
    telephony: "SHUMBA",
  },
  {
    airlineCode: "CSS",
    telephony: "SHUN FENG",
  },
  {
    airlineCode: "SHT",
    telephony: "SHUTTLE",
  },
  {
    airlineCode: "CSC",
    telephony: "SI CHUAN",
  },
  {
    airlineCode: "RBR",
    telephony: "SIAM AIRNET",
  },
  {
    airlineCode: "SVB",
    telephony: "SIAVIA",
  },
  {
    airlineCode: "SBI",
    telephony: "SIBERIAN AIRLINES",
  },
  {
    airlineCode: "SSJ",
    telephony: "SIBERIAN SKY",
  },
  {
    airlineCode: "SBD",
    telephony: "SIBIA",
  },
  {
    airlineCode: "SIC",
    telephony: "SICHART",
  },
  {
    airlineCode: "CNG",
    telephony: "SID-AIR",
  },
  {
    airlineCode: "SID",
    telephony: "SIDERAL",
  },
  {
    airlineCode: "SRH",
    telephony: "SIEMREAP AIR",
  },
  {
    airlineCode: "RRT",
    telephony: "SIERRA ALTA",
  },
  {
    airlineCode: "SRX",
    telephony: "SIERRA EX",
  },
  {
    airlineCode: "SPA",
    telephony: "SIERRA PACIFIC",
  },
  {
    airlineCode: "NJU",
    telephony: "SIGNATURE",
  },
  {
    airlineCode: "LVS",
    telephony: "SIGNIA",
  },
  {
    airlineCode: "SCN",
    telephony: "SILICON",
  },
  {
    airlineCode: "AZQ",
    telephony: "SILK LINE",
  },
  {
    airlineCode: "AZG",
    telephony: "SILK WEST",
  },
  {
    airlineCode: "SLK",
    telephony: "SILKAIR",
  },
  {
    airlineCode: "SAN",
    telephony: "SILVAIR NET",
  },
  {
    airlineCode: "SVW",
    telephony: "SILVER ARROWS",
  },
  {
    airlineCode: "SCR",
    telephony: "SILVER CLOUD",
  },
  {
    airlineCode: "SIL",
    telephony: "SILVER WINGS",
  },
  {
    airlineCode: "VRB",
    telephony: "SILVERBACK",
  },
  {
    airlineCode: "LVB",
    telephony: "SILVERBIRD",
  },
  {
    airlineCode: "SLH",
    telephony: "SILVERHAWK",
  },
  {
    airlineCode: "SLD",
    telephony: "SILVERLINE",
  },
  {
    airlineCode: "SIS",
    telephony: "SILVERSPEED",
  },
  {
    airlineCode: "SLR",
    telephony: "SILVERSTONE",
  },
  {
    airlineCode: "SMN",
    telephony: "SIMAVIA",
  },
  {
    airlineCode: "GRF",
    telephony: "SIMBA",
  },
  {
    airlineCode: "RMK",
    telephony: "SIMRIK AIR",
  },
  {
    airlineCode: "SAQ",
    telephony: "SINBAD",
  },
  {
    airlineCode: "SAF",
    telephony: "SINGA",
  },
  {
    airlineCode: "SIA",
    telephony: "SINGAPORE",
  },
  {
    airlineCode: "JBE",
    telephony: "SINO BEIJING",
  },
  {
    airlineCode: "SJM",
    telephony: "SINO SKY",
  },
  {
    airlineCode: "ACJ",
    telephony: "SINOJET",
  },
  {
    airlineCode: "NDU",
    telephony: "SIOUX",
  },
  {
    airlineCode: "PSE",
    telephony: "SIPSE",
  },
  {
    airlineCode: "SIO",
    telephony: "SIRIO",
  },
  {
    airlineCode: "CIG",
    telephony: "SIRIUS AERO",
  },
  {
    airlineCode: "JSI",
    telephony: "SISTEMA",
  },
  {
    airlineCode: "SWO",
    telephony: "SIVA",
  },
  {
    airlineCode: "SCU",
    telephony: "SKELLY",
  },
  {
    airlineCode: "SBQ",
    telephony: "SKIBBLE",
  },
  {
    airlineCode: "BGY",
    telephony: "SKIMMER",
  },
  {
    airlineCode: "KPR",
    telephony: "SKIPPER",
  },
  {
    airlineCode: "CDV",
    telephony: "SKOL",
  },
  {
    airlineCode: "ACE",
    telephony: "SKY ACE",
  },
  {
    airlineCode: "KYR",
    telephony: "SKY AERONAUTICAL",
  },
  {
    airlineCode: "SWM",
    telephony: "SKY ANGKOR",
  },
  {
    airlineCode: "JMS",
    telephony: "SKY AVIATION",
  },
  {
    airlineCode: "SBL",
    telephony: "SKY BIRD",
  },
  {
    airlineCode: "WLF",
    telephony: "SKY BLUE",
  },
  {
    airlineCode: "KSA",
    telephony: "SKY CAMEL",
  },
  {
    airlineCode: "AHW",
    telephony: "SKY CAPITAL",
  },
  {
    airlineCode: "SYY",
    telephony: "SKY COACH",
  },
  {
    airlineCode: "SOF",
    telephony: "SKY COMFORT",
  },
  {
    airlineCode: "SCP",
    telephony: "SKY COPTER",
  },
  {
    airlineCode: "KYE",
    telephony: "SKY CUBE",
  },
  {
    airlineCode: "SDD",
    telephony: "SKY DANCE",
  },
  {
    airlineCode: "SKD",
    telephony: "SKY DAWG",
  },
  {
    airlineCode: "ROY",
    telephony: "SKY DIVE",
  },
  {
    airlineCode: "FDB",
    telephony: "SKY DUBAI",
  },
  {
    airlineCode: "FEG",
    telephony: "SKY EGYPT",
  },
  {
    airlineCode: "HYS",
    telephony: "SKY EUROPE",
  },
  {
    airlineCode: "SXC",
    telephony: "SKY EXEC",
  },
  {
    airlineCode: "SYF",
    telephony: "SKY FIRST",
  },
  {
    airlineCode: "SFY",
    telephony: "SKY FLITE",
  },
  {
    airlineCode: "HFY",
    telephony: "SKY FLYER",
  },
  {
    airlineCode: "SKG",
    telephony: "SKY GABON",
  },
  {
    airlineCode: "GEL",
    telephony: "SKY GEORGIA",
  },
  {
    airlineCode: "SHC",
    telephony: "SKY HARBOR CHEYENNE",
  },
  {
    airlineCode: "SHH",
    telephony: "SKY HIGH",
  },
  {
    airlineCode: "TNL",
    telephony: "SKY HORSE",
  },
  {
    airlineCode: "QDA",
    telephony: "SKY LEGEND",
  },
  {
    airlineCode: "LXR",
    telephony: "SKY LUXURY",
  },
  {
    airlineCode: "HYM",
    telephony: "SKY MOLDOVA",
  },
  {
    airlineCode: "SAY",
    telephony: "SKY PATH",
  },
  {
    airlineCode: "SKX",
    telephony: "SKY PERU",
  },
  {
    airlineCode: "PHP",
    telephony: "SKY POWER",
  },
  {
    airlineCode: "SPD",
    telephony: "SKY PRIME",
  },
  {
    airlineCode: "SQS",
    telephony: "SKY QUEEN",
  },
  {
    airlineCode: "FLV",
    telephony: "SKY RED",
  },
  {
    airlineCode: "HAT",
    telephony: "SKY RUNNER",
  },
  {
    airlineCode: "SRS",
    telephony: "SKY SOUTH",
  },
  {
    airlineCode: "DQA",
    telephony: "SKY SURFER",
  },
  {
    airlineCode: "GCS",
    telephony: "SKY TEC",
  },
  {
    airlineCode: "MMU",
    telephony: "SKY TOUR",
  },
  {
    airlineCode: "GJB",
    telephony: "SKY TRUCK",
  },
  {
    airlineCode: "UGS",
    telephony: "SKY UGANDA",
  },
  {
    airlineCode: "FCH",
    telephony: "SKY UNION",
  },
  {
    airlineCode: "SYU",
    telephony: "SKY UNLIMITED",
  },
  {
    airlineCode: "AVL",
    telephony: "SKY VENTURES",
  },
  {
    airlineCode: "VRH",
    telephony: "SKY VICTOR",
  },
  {
    airlineCode: "KYD",
    telephony: "SKYAD",
  },
  {
    airlineCode: "KBX",
    telephony: "SKYBEX",
  },
  {
    airlineCode: "KYC",
    telephony: "SKYBIRD CHARTER",
  },
  {
    airlineCode: "SYB",
    telephony: "SKYBIZ",
  },
  {
    airlineCode: "SBN",
    telephony: "SKYBOSNIA",
  },
  {
    airlineCode: "ECQ",
    telephony: "SKYBRIDGE",
  },
  {
    airlineCode: "WMU",
    telephony: "SKYBRONCO",
  },
  {
    airlineCode: "BGN",
    telephony: "SKYBUDDY",
  },
  {
    airlineCode: "SKB",
    telephony: "SKYBUS",
  },
  {
    airlineCode: "BSJ",
    telephony: "SKYBUS JET",
  },
  {
    airlineCode: "SCK",
    telephony: "SKYCAM",
  },
  {
    airlineCode: "SUK",
    telephony: "SKYCARGO",
  },
  {
    airlineCode: "SKT",
    telephony: "SKYCAT",
  },
  {
    airlineCode: "SKL",
    telephony: "SKYCHARTER",
  },
  {
    airlineCode: "SLY",
    telephony: "SKYCO",
  },
  {
    airlineCode: "SKF",
    telephony: "SKYCRAFT",
  },
  {
    airlineCode: "GAW",
    telephony: "SKYCRAWLER",
  },
  {
    airlineCode: "SYD",
    telephony: "SKYDOCTOR",
  },
  {
    airlineCode: "SDL",
    telephony: "SKYDRIFT",
  },
  {
    airlineCode: "SFT",
    telephony: "SKYFREIGHT",
  },
  {
    airlineCode: "HAU",
    telephony: "SKYHAUL",
  },
  {
    airlineCode: "SKE",
    telephony: "SKYISLE",
  },
  {
    airlineCode: "PNR",
    telephony: "SKYJET",
  },
  {
    airlineCode: "SKI",
    telephony: "SKYKING",
  },
  {
    airlineCode: "SKQ",
    telephony: "SKYLAB",
  },
  {
    airlineCode: "SKA",
    telephony: "SKYLAN AIRWAYS",
  },
  {
    airlineCode: "LRK",
    telephony: "SKYLARK",
  },
  {
    airlineCode: "LZF",
    telephony: "SKYLEASE",
  },
  {
    airlineCode: "LSK",
    telephony: "SKYLIGHT",
  },
  {
    airlineCode: "KLA",
    telephony: "SKYLIGHT AIR",
  },
  {
    airlineCode: "SMT",
    telephony: "SKYLIMIT",
  },
  {
    airlineCode: "SML",
    telephony: "SKYLINE",
  },
  {
    airlineCode: "SKN",
    telephony: "SKYLINER",
  },
  {
    airlineCode: "SLQ",
    telephony: "SKYLINK",
  },
  {
    airlineCode: "TSM",
    telephony: "SKYLOUNGE",
  },
  {
    airlineCode: "SKY",
    telephony: "SKYMARK",
  },
  {
    airlineCode: "SKC",
    telephony: "SKYMASTER AIR",
  },
  {
    airlineCode: "RSQ",
    telephony: "SKYMEDIC",
  },
  {
    airlineCode: "SKJ",
    telephony: "SKYNET AIR",
  },
  {
    airlineCode: "SKH",
    telephony: "SKYNEWS",
  },
  {
    airlineCode: "LKH",
    telephony: "SKYPLANET",
  },
  {
    airlineCode: "LLP",
    telephony: "SKYPOL",
  },
  {
    airlineCode: "RRV",
    telephony: "SKYROVER",
  },
  {
    airlineCode: "SKR",
    telephony: "SKYSCAPES",
  },
  {
    airlineCode: "SSK",
    telephony: "SKYSTAR",
  },
  {
    airlineCode: "SKM",
    telephony: "SKYTEM",
  },
  {
    airlineCode: "SYT",
    telephony: "SKYTRACK",
  },
  {
    airlineCode: "SKP",
    telephony: "SKYTRANS",
  },
  {
    airlineCode: "TVS",
    telephony: "SKYTRAVEL",
  },
  {
    airlineCode: "SQP",
    telephony: "SKYUP",
  },
  {
    airlineCode: "ORT",
    telephony: "SKYWALKER",
  },
  {
    airlineCode: "SEW",
    telephony: "SKYWARD EXPRESS",
  },
  {
    airlineCode: "WLK",
    telephony: "SKYWATCH",
  },
  {
    airlineCode: "SKZ",
    telephony: "SKYWAY-INC",
  },
  {
    airlineCode: "SKW",
    telephony: "SKYWEST",
  },
  {
    airlineCode: "ABF",
    telephony: "SKYWINGS",
  },
  {
    airlineCode: "SWZ",
    telephony: "SKYWISE",
  },
  {
    airlineCode: "SKO",
    telephony: "SKYWORK",
  },
  {
    airlineCode: "SLJ",
    telephony: "SLAMAIR",
  },
  {
    airlineCode: "SHX",
    telephony: "SLIM AIR",
  },
  {
    airlineCode: "SLE",
    telephony: "SLIPSTREAM",
  },
  {
    airlineCode: "SLN",
    telephony: "SLOANE",
  },
  {
    airlineCode: "SLB",
    telephony: "SLOK AIR",
  },
  {
    airlineCode: "OKS",
    telephony: "SLOK GAMBIA",
  },
  {
    airlineCode: "STO",
    telephony: "SLOPS",
  },
  {
    airlineCode: "SQA",
    telephony: "SLOVAK AEROCLUB",
  },
  {
    airlineCode: "SQF",
    telephony: "SLOVAK AIRFORCE",
  },
  {
    airlineCode: "SSG",
    telephony: "SLOVAK GOVERNMENT",
  },
  {
    airlineCode: "TVQ",
    telephony: "SLOVAKTRAVEL",
  },
  {
    airlineCode: "GSI",
    telephony: "SLOVENIA",
  },
  {
    airlineCode: "LSV",
    telephony: "SLOVENIAN AIRFORCE",
  },
  {
    airlineCode: "SLO",
    telephony: "SLOW",
  },
  {
    airlineCode: "LLC",
    telephony: "SMALL PLANET",
  },
  {
    airlineCode: "VGS",
    telephony: "SMART",
  },
  {
    airlineCode: "TTW",
    telephony: "SMART CAT",
  },
  {
    airlineCode: "SAH",
    telephony: "SMART JET",
  },
  {
    airlineCode: "ART",
    telephony: "SMART LYNX",
  },
  {
    airlineCode: "FFE",
    telephony: "SMART TRAINER",
  },
  {
    airlineCode: "JES",
    telephony: "SMARTBIRD",
  },
  {
    airlineCode: "SMF",
    telephony: "SMEA",
  },
  {
    airlineCode: "PSX",
    telephony: "SMILEY",
  },
  {
    airlineCode: "SMH",
    telephony: "SMITHAIR",
  },
  {
    airlineCode: "FSP",
    telephony: "SNAPSHOT",
  },
  {
    airlineCode: "SNG",
    telephony: "SNOW EAGLE",
  },
  {
    airlineCode: "SOK",
    telephony: "SNOW SKI",
  },
  {
    airlineCode: "SND",
    telephony: "SNOWBIRD",
  },
  {
    airlineCode: "MHV",
    telephony: "SNOWCAP",
  },
  {
    airlineCode: "SSH",
    telephony: "SNOWSHOE",
  },
  {
    airlineCode: "DLC",
    telephony: "SOARCOPTER",
  },
  {
    airlineCode: "XGE",
    telephony: "SOARING EAGLE",
  },
  {
    airlineCode: "OCL",
    telephony: "SOCA",
  },
  {
    airlineCode: "SXZ",
    telephony: "SOCALAIR",
  },
  {
    airlineCode: "EYE",
    telephony: "SOCKEYE",
  },
  {
    airlineCode: "SCF",
    telephony: "SOCOFER",
  },
  {
    airlineCode: "VAW",
    telephony: "SOFIA JET",
  },
  {
    airlineCode: "OKT",
    telephony: "SOKO AIR",
  },
  {
    airlineCode: "SBA",
    telephony: "SOL BRASIL",
  },
  {
    airlineCode: "SGA",
    telephony: "SOL URUGUAY",
  },
  {
    airlineCode: "EEL",
    telephony: "SOLACE",
  },
  {
    airlineCode: "LRG",
    telephony: "SOLAER LAGUNA",
  },
  {
    airlineCode: "ESC",
    telephony: "SOLAMERICA",
  },
  {
    airlineCode: "VPC",
    telephony: "SOLAR",
  },
  {
    airlineCode: "OLC",
    telephony: "SOLARCARGO",
  },
  {
    airlineCode: "SVG",
    telephony: "SOLAVIA",
  },
  {
    airlineCode: "NWA",
    telephony: "NORTHWEST",
  },
  {
    airlineCode: "SIV",
    telephony: "SOLENT-IVOIRE",
  },
  {
    airlineCode: "SET",
    telephony: "SOLENTA",
  },
  {
    airlineCode: "SOP",
    telephony: "SOLINAIR",
  },
  {
    airlineCode: "FJR",
    telephony: "SOLITAIRE AIR",
  },
  {
    airlineCode: "SOL",
    telephony: "SOLOMON",
  },
  {
    airlineCode: "PAQ",
    telephony: "SOLPAC",
  },
  {
    airlineCode: "SGU",
    telephony: "SOLPARAGUAYO",
  },
  {
    airlineCode: "SPK",
    telephony: "SOLSTAS LAB",
  },
  {
    airlineCode: "BJS",
    telephony: "SOLUTION",
  },
  {
    airlineCode: "EDY",
    telephony: "SOLWAY",
  },
  {
    airlineCode: "SMR",
    telephony: "SOMON AIR",
  },
  {
    airlineCode: "SOR",
    telephony: "SONAIR",
  },
  {
    airlineCode: "SON",
    telephony: "SONAS",
  },
  {
    airlineCode: "SNO",
    telephony: "SONAVI",
  },
  {
    airlineCode: "SGB",
    telephony: "SONGBIRD",
  },
  {
    airlineCode: "SXL",
    telephony: "SONIC",
  },
  {
    airlineCode: "STI",
    telephony: "SONTAIR",
  },
  {
    airlineCode: "SNL",
    telephony: "SOONAIR",
  },
  {
    airlineCode: "SOY",
    telephony: "SORIANO",
  },
  {
    airlineCode: "NSO",
    telephony: "SOSA",
  },
  {
    airlineCode: "OSL",
    telephony: "SOSOLISO",
  },
  {
    airlineCode: "TRM",
    telephony: "SOTRANS",
  },
  {
    airlineCode: "ASR",
    telephony: "SOTRAVIA",
  },
  {
    airlineCode: "LMG",
    telephony: "SOUTH AFRICAN",
  },
  {
    airlineCode: "SOA",
    telephony: "SOUTH AIRCHARTER",
  },
  {
    airlineCode: "BDS",
    telephony: "SOUTH ASIAN",
  },
  {
    airlineCode: "SOT",
    telephony: "SOUTH COURIER",
  },
  {
    airlineCode: "SPI",
    telephony: "SOUTH PACIFIC",
  },
  {
    airlineCode: "MLH",
    telephony: "SOUTH WIND",
  },
  {
    airlineCode: "GAD",
    telephony: "SOUTHCOAST",
  },
  {
    airlineCode: "SEA",
    telephony: "SOUTHEAST AIR",
  },
  {
    airlineCode: "SOO",
    telephony: "SOUTHERN AIR",
  },
  {
    airlineCode: "CSG",
    telephony: "SOUTHERN CARGO",
  },
  {
    airlineCode: "SCS",
    telephony: "SOUTHERN CHARTERS",
  },
  {
    airlineCode: "SXI",
    telephony: "SOUTHERN CROSS",
  },
  {
    airlineCode: "SXF",
    telephony: "SOUTHERN FLIGHT",
  },
  {
    airlineCode: "HNJ",
    telephony: "SOUTHERN JET",
  },
  {
    airlineCode: "SOH",
    telephony: "SOUTHERN OHIO",
  },
  {
    airlineCode: "SSC",
    telephony: "SOUTHERN SKIES",
  },
  {
    airlineCode: "SJB",
    telephony: "SOUTHERN TIGER",
  },
  {
    airlineCode: "SXP",
    telephony: "SOUTHPAC EXPRESS",
  },
  {
    airlineCode: "SWA",
    telephony: "SOUTHWEST",
  },
  {
    airlineCode: "VIP",
    telephony: "SOVEREIGN",
  },
  {
    airlineCode: "SCB",
    telephony: "SP CARGO",
  },
  {
    airlineCode: "SFI",
    telephony: "SPACE STAR",
  },
  {
    airlineCode: "SPF",
    telephony: "SPACE WORLD",
  },
  {
    airlineCode: "JKK",
    telephony: "SPANAIR",
  },
  {
    airlineCode: "PUE",
    telephony: "SPANISH",
  },
  {
    airlineCode: "QSR",
    telephony: "SPARKLE ROLL",
  },
  {
    airlineCode: "SOW",
    telephony: "SPARROW",
  },
  {
    airlineCode: "KRH",
    telephony: "SPARROWHAWK",
  },
  {
    airlineCode: "JCA",
    telephony: "SPARTAN",
  },
  {
    airlineCode: "SGC",
    telephony: "SPEC WINGS",
  },
  {
    airlineCode: "LTS",
    telephony: "SPECAIR",
  },
  {
    airlineCode: "CDS",
    telephony: "SPECDAS",
  },
  {
    airlineCode: "PLC",
    telephony: "SPECIAL",
  },
  {
    airlineCode: "SYV",
    telephony: "SPECIAL SYSTEM",
  },
  {
    airlineCode: "SSZ",
    telephony: "SPECSAVERS",
  },
  {
    airlineCode: "SPJ",
    telephony: "SPECTRUM",
  },
  {
    airlineCode: "RCN",
    telephony: "SPEED CARGO",
  },
  {
    airlineCode: "SPZ",
    telephony: "SPEED SERVICE",
  },
  {
    airlineCode: "SPR",
    telephony: "SPEEDAIR",
  },
  {
    airlineCode: "BAW",
    telephony: "SPEEDBIRD",
  },
  {
    airlineCode: "BUF",
    telephony: "SPEEDHAWK",
  },
  {
    airlineCode: "MRX",
    telephony: "SPEEDMARK",
  },
  {
    airlineCode: "SPG",
    telephony: "SPEEDWING",
  },
  {
    airlineCode: "HKA",
    telephony: "SPEND AIR",
  },
  {
    airlineCode: "SRP",
    telephony: "SPERBER",
  },
  {
    airlineCode: "SEJ",
    telephony: "SPICEJET",
  },
  {
    airlineCode: "SZS",
    telephony: "SPINNAKER",
  },
  {
    airlineCode: "PNX",
    telephony: "SPINNER",
  },
  {
    airlineCode: "TLI",
    telephony: "SPIRIT",
  },
  {
    airlineCode: "SJJ",
    telephony: "SPIRIT JET",
  },
  {
    airlineCode: "NKS",
    telephony: "SPIRIT WINGS",
  },
  {
    airlineCode: "JSP",
    telephony: "SPOOLER",
  },
  {
    airlineCode: "SPO",
    telephony: "SPORAVIA",
  },
  {
    airlineCode: "RAK",
    telephony: "SPORT CLUB",
  },
  {
    airlineCode: "SPE",
    telephony: "SPRAGUE",
  },
  {
    airlineCode: "SPB",
    telephony: "SPRING CLASSIC",
  },
  {
    airlineCode: "SAA",
    telephony: "SPRINGBOK",
  },
  {
    airlineCode: "SMU",
    telephony: "SPRINGER",
  },
  {
    airlineCode: "SRN",
    telephony: "SPRINTAIR",
  },
  {
    airlineCode: "SAR",
    telephony: "SPRINTAIR CARGO",
  },
  {
    airlineCode: "PUR",
    telephony: "SPURWING",
  },
  {
    airlineCode: "SPU",
    telephony: "SPUTTER",
  },
  {
    airlineCode: "ALK",
    telephony: "SRILANKAN",
  },
  {
    airlineCode: "SJY",
    telephony: "SRIWIJAYA",
  },
  {
    airlineCode: "SBO",
    telephony: "STABAIR",
  },
  {
    airlineCode: "SOB",
    telephony: "STABO",
  },
  {
    airlineCode: "STG",
    telephony: "STAGE",
  },
  {
    airlineCode: "SDE",
    telephony: "STAMPEDE",
  },
  {
    airlineCode: "SDS",
    telephony: "STANDARDS",
  },
  {
    airlineCode: "STL",
    telephony: "STAPLEFORD",
  },
  {
    airlineCode: "STA",
    telephony: "STAR",
  },
  {
    airlineCode: "DST",
    telephony: "STAR AVIATION",
  },
  {
    airlineCode: "USC",
    telephony: "STAR CHECK",
  },
  {
    airlineCode: "RHH",
    telephony: "STAR CRESCENT",
  },
  {
    airlineCode: "SFE",
    telephony: "STAR FLIGHT",
  },
  {
    airlineCode: "SVP",
    telephony: "STAR INDIA",
  },
  {
    airlineCode: "SWP",
    telephony: "STAR WORK",
  },
  {
    airlineCode: "SSA",
    telephony: "STAR-JET",
  },
  {
    airlineCode: "SRU",
    telephony: "STAR-UP",
  },
  {
    airlineCode: "URJ",
    telephony: "STARAV",
  },
  {
    airlineCode: "SBE",
    telephony: "STARBASE",
  },
  {
    airlineCode: "VSA",
    telephony: "STARBIRD",
  },
  {
    airlineCode: "LSO",
    telephony: "STARCOM",
  },
  {
    airlineCode: "SFH",
    telephony: "STARFISH",
  },
  {
    airlineCode: "NCC",
    telephony: "STARFLEET",
  },
  {
    airlineCode: "SFJ",
    telephony: "STARFLYER",
  },
  {
    airlineCode: "SGT",
    telephony: "STARGATE",
  },
  {
    airlineCode: "SLT",
    telephony: "STARLIGHT CARGO",
  },
  {
    airlineCode: "TLK",
    telephony: "STARLINK",
  },
  {
    airlineCode: "CXB",
    telephony: "STARLUX",
  },
  {
    airlineCode: "FOZ",
    telephony: "STARS AIRWAYS",
  },
  {
    airlineCode: "HIP",
    telephony: "STARSA",
  },
  {
    airlineCode: "STX",
    telephony: "STARSAWAY",
  },
  {
    airlineCode: "SSP",
    telephony: "STARSPEED",
  },
  {
    airlineCode: "TRL",
    telephony: "STARSTREAM",
  },
  {
    airlineCode: "STQ",
    telephony: "STARTREK",
  },
  {
    airlineCode: "SJX",
    telephony: "STARWALKER",
  },
  {
    airlineCode: "XLF",
    telephony: "STARWAY",
  },
  {
    airlineCode: "RSD",
    telephony: "STATE AERO",
  },
  {
    airlineCode: "STE",
    telephony: "STEAMLINE",
  },
  {
    airlineCode: "JTZ",
    telephony: "STEEL JET",
  },
  {
    airlineCode: "SNB",
    telephony: "STERLING",
  },
  {
    airlineCode: "STR",
    telephony: "STERNA",
  },
  {
    airlineCode: "SST",
    telephony: "STETSON",
  },
  {
    airlineCode: "BZQ",
    telephony: "STING",
  },
  {
    airlineCode: "SRY",
    telephony: "STINGRAY",
  },
  {
    airlineCode: "STK",
    telephony: "STOBART AIR",
  },
  {
    airlineCode: "ISM",
    telephony: "STORK",
  },
  {
    airlineCode: "SZG",
    telephony: "STOTZ AGRO",
  },
  {
    airlineCode: "FZA",
    telephony: "STRAIT AIR",
  },
  {
    airlineCode: "SRZ",
    telephony: "STRATO",
  },
  {
    airlineCode: "JSH",
    telephony: "STREAM AIR",
  },
  {
    airlineCode: "CBR",
    telephony: "STRIKE",
  },
  {
    airlineCode: "WIT",
    telephony: "STRIKER",
  },
  {
    airlineCode: "CXN",
    telephony: "STRONG AIR",
  },
  {
    airlineCode: "BXX",
    telephony: "STRONGBOX",
  },
  {
    airlineCode: "STZ",
    telephony: "STUDIO",
  },
  {
    airlineCode: "JSU",
    telephony: "SU JET",
  },
  {
    airlineCode: "SSB",
    telephony: "SUASA AIR",
  },
  {
    airlineCode: "SUB",
    telephony: "SUB AIR",
  },
  {
    airlineCode: "SDZ",
    telephony: "SUDANA",
  },
  {
    airlineCode: "SUD",
    telephony: "SUDANAIR",
  },
  {
    airlineCode: "SNV",
    telephony: "SUDANESE",
  },
  {
    airlineCode: "SHN",
    telephony: "SUGAR ALFA",
  },
  {
    airlineCode: "AUH",
    telephony: "SULTAN",
  },
  {
    airlineCode: "SUM",
    telephony: "SUMES",
  },
  {
    airlineCode: "BFW",
    telephony: "SUMMAN",
  },
  {
    airlineCode: "SMM",
    telephony: "SUMMIT-AIR",
  },
  {
    airlineCode: "JYA",
    telephony: "SUN BIZ",
  },
  {
    airlineCode: "GWZ",
    telephony: "SUN BURN",
  },
  {
    airlineCode: "SCX",
    telephony: "SUN COUNTRY",
  },
  {
    airlineCode: "SVL",
    telephony: "SUN DEVIL",
  },
  {
    airlineCode: "SNR",
    telephony: "SUN GROUP",
  },
  {
    airlineCode: "SJE",
    telephony: "SUN JOURNEY",
  },
  {
    airlineCode: "SNK",
    telephony: "SUN KING",
  },
  {
    airlineCode: "SNP",
    telephony: "SUN PACIFIC",
  },
  {
    airlineCode: "SUP",
    telephony: "SUN SPEED",
  },
  {
    airlineCode: "SNW",
    telephony: "SUN WEST",
  },
  {
    airlineCode: "LEO",
    telephony: "SUN-OLE",
  },
  {
    airlineCode: "ENK",
    telephony: "SUNBIRD",
  },
  {
    airlineCode: "SNT",
    telephony: "SUNCOAST",
  },
  {
    airlineCode: "SDR",
    telephony: "SUNDAIR",
  },
  {
    airlineCode: "SDC",
    telephony: "SUNDANCE",
  },
  {
    airlineCode: "PVV",
    telephony: "SUNDAY",
  },
  {
    airlineCode: "FXP",
    telephony: "SUNDIAL",
  },
  {
    airlineCode: "XAK",
    telephony: "SUNEXPRESS",
  },
  {
    airlineCode: "SUF",
    telephony: "SUNFLOWER",
  },
  {
    airlineCode: "KAM",
    telephony: "SUNKAR",
  },
  {
    airlineCode: "RLB",
    telephony: "SUNLIGHT",
  },
  {
    airlineCode: "SWS",
    telephony: "SUNNY WEST",
  },
  {
    airlineCode: "CTB",
    telephony: "SUNNYHEART",
  },
  {
    airlineCode: "SXD",
    telephony: "SUNRISE",
  },
  {
    airlineCode: "SUS",
    telephony: "SUNSCAN",
  },
  {
    airlineCode: "NFX",
    telephony: "SUNSET",
  },
  {
    airlineCode: "ARM",
    telephony: "SUNSKY",
  },
  {
    airlineCode: "CMG",
    telephony: "SUNSPY",
  },
  {
    airlineCode: "SUU",
    telephony: "SUNSTAR",
  },
  {
    airlineCode: "SSQ",
    telephony: "SUNSTATE",
  },
  {
    airlineCode: "JAM",
    telephony: "SUNTRACK",
  },
  {
    airlineCode: "PGT",
    telephony: "SUNTURK",
  },
  {
    airlineCode: "SWG",
    telephony: "SUNWING",
  },
  {
    airlineCode: "SWI",
    telephony: "SUNWORLD",
  },
  {
    airlineCode: "SSI",
    telephony: "SUPER JET",
  },
  {
    airlineCode: "HNX",
    telephony: "SUPERB",
  },
  {
    airlineCode: "CTV",
    telephony: "SUPERGREEN",
  },
  {
    airlineCode: "SUQ",
    telephony: "SUPERIOR",
  },
  {
    airlineCode: "GST",
    telephony: "SUPERTANK",
  },
  {
    airlineCode: "CBW",
    telephony: "SUPERWINGS",
  },
  {
    airlineCode: "PSK",
    telephony: "SUPPORT",
  },
  {
    airlineCode: "LAU",
    telephony: "SURAMERICANO",
  },
  {
    airlineCode: "DSP",
    telephony: "SURAVIATION",
  },
  {
    airlineCode: "AIS",
    telephony: "SURESTE",
  },
  {
    airlineCode: "URF",
    telephony: "SURFAIR",
  },
  {
    airlineCode: "SRJ",
    telephony: "SURIJET",
  },
  {
    airlineCode: "SLM",
    telephony: "SURINAM",
  },
  {
    airlineCode: "SRT",
    telephony: "SURTEP",
  },
  {
    airlineCode: "SUY",
    telephony: "SURVEY",
  },
  {
    airlineCode: "GSL",
    telephony: "SURVEY-CANADA",
  },
  {
    airlineCode: "GHA",
    telephony: "SUTTER",
  },
  {
    airlineCode: "SVR",
    telephony: "SVERDLOVSK AIR",
  },
  {
    airlineCode: "SFX",
    telephony: "SWAMP FOX",
  },
  {
    airlineCode: "SMX",
    telephony: "SWANTON",
  },
  {
    airlineCode: "KBV",
    telephony: "SWECOAST",
  },
  {
    airlineCode: "SWC",
    telephony: "SWEDCOPTER",
  },
  {
    airlineCode: "SVF",
    telephony: "SWEDEFORCE",
  },
  {
    airlineCode: "SWV",
    telephony: "SWEDEMED",
  },
  {
    airlineCode: "LED",
    telephony: "SWEEPER",
  },
  {
    airlineCode: "SWT",
    telephony: "SWIFT",
  },
  {
    airlineCode: "CPS",
    telephony: "SWIFT BIRD",
  },
  {
    airlineCode: "FFV",
    telephony: "SWIFT TANGO",
  },
  {
    airlineCode: "WFC",
    telephony: "SWIFTCOPTERS",
  },
  {
    airlineCode: "SWQ",
    telephony: "SWIFTFLIGHT",
  },
  {
    airlineCode: "SFL",
    telephony: "SWIFTLINE",
  },
  {
    airlineCode: "SFF",
    telephony: "SWIFTWING",
  },
  {
    airlineCode: "SWR",
    telephony: "SWISS",
  },
  {
    airlineCode: "SUI",
    telephony: "SWISS AIR FORCE",
  },
  {
    airlineCode: "SAZ",
    telephony: "SWISS AMBULANCE",
  },
  {
    airlineCode: "SJT",
    telephony: "SWISS JET",
  },
  {
    airlineCode: "SWB",
    telephony: "SWISSBOOGIE",
  },
  {
    airlineCode: "WSW",
    telephony: "SWOOP",
  },
  {
    airlineCode: "SYO",
    telephony: "SYERSTON",
  },
  {
    airlineCode: "AWU",
    telephony: "SYLT AIR",
  },
  {
    airlineCode: "BMT",
    telephony: "SYMONETTE",
  },
  {
    airlineCode: "SYN",
    telephony: "SYNCRUDE",
  },
  {
    airlineCode: "SYG",
    telephony: "SYNERGY",
  },
  {
    airlineCode: "SYP",
    telephony: "SYNESIS",
  },
  {
    airlineCode: "SYA",
    telephony: "SYPHAXAIR",
  },
  {
    airlineCode: "SYR",
    telephony: "SYRIANAIR",
  },
  {
    airlineCode: "SYC",
    telephony: "SYSTEC",
  },
  {
    airlineCode: "IRF",
    telephony: "TA-AIR",
  },
  {
    airlineCode: "TBI",
    telephony: "TAB INTERNATIONAL",
  },
  {
    airlineCode: "TBN",
    telephony: "TABAN",
  },
  {
    airlineCode: "TIC",
    telephony: "TAC AIRLINES",
  },
  {
    airlineCode: "TAI",
    telephony: "TACA",
  },
  {
    airlineCode: "DEE",
    telephony: "TACAIR",
  },
  {
    airlineCode: "TKM",
    telephony: "TACOMA",
  },
  {
    airlineCode: "TDC",
    telephony: "TADAIR",
  },
  {
    airlineCode: "JYR",
    telephony: "TAECA",
  },
  {
    airlineCode: "TSD",
    telephony: "TAFI",
  },
  {
    airlineCode: "SBT",
    telephony: "TAFTAN",
  },
  {
    airlineCode: "TGM",
    telephony: "TAG ESPANA",
  },
  {
    airlineCode: "TBJ",
    telephony: "TAG JET",
  },
  {
    airlineCode: "TEU",
    telephony: "TAG MALTA",
  },
  {
    airlineCode: "TAG",
    telephony: "TAGSPIRIT",
  },
  {
    airlineCode: "THT",
    telephony: "TAHITI AIRLINES",
  },
  {
    airlineCode: "TGA",
    telephony: "TAIGA",
  },
  {
    airlineCode: "TWI",
    telephony: "TAILWIND",
  },
  {
    airlineCode: "TME",
    telephony: "TAIMEN",
  },
  {
    airlineCode: "TYA",
    telephony: "TAIMYR",
  },
  {
    airlineCode: "TXJ",
    telephony: "TAIXIANG",
  },
  {
    airlineCode: "TUJ",
    telephony: "TAJA",
  },
  {
    airlineCode: "TXP",
    telephony: "TAJIK EXPRESS",
  },
  {
    airlineCode: "TJK",
    telephony: "TAJIKAIR",
  },
  {
    airlineCode: "TZK",
    telephony: "TAJIKISTAN",
  },
  {
    airlineCode: "TAL",
    telephony: "TALAIR",
  },
  {
    airlineCode: "MYX",
    telephony: "TALLINN CAT",
  },
  {
    airlineCode: "TFF",
    telephony: "TALON FLIGHT",
  },
  {
    airlineCode: "TAM",
    telephony: "TAM",
  },
  {
    airlineCode: "TAM",
    telephony: "TAM",
  },
  {
    airlineCode: "TML",
    telephony: "TAM AIRLINE",
  },
  {
    airlineCode: "TMR",
    telephony: "TAMARA",
  },
  {
    airlineCode: "TGZ",
    telephony: "TAMAZI",
  },
  {
    airlineCode: "LTG",
    telephony: "TAMCARGO",
  },
  {
    airlineCode: "TAE",
    telephony: "TAME",
  },
  {
    airlineCode: "TMI",
    telephony: "TAMIRWAYS",
  },
  {
    airlineCode: "TPA",
    telephony: "TAMPA",
  },
  {
    airlineCode: "TNR",
    telephony: "TAN AIR",
  },
  {
    airlineCode: "CNW",
    telephony: "TANG",
  },
  {
    airlineCode: "WHR",
    telephony: "TANGI",
  },
  {
    airlineCode: "TMA",
    telephony: "TANGO LIMA",
  },
  {
    airlineCode: "TTU",
    telephony: "TANTALUS",
  },
  {
    airlineCode: "ATC",
    telephony: "TANZANIA",
  },
  {
    airlineCode: "TJA",
    telephony: "TAPJETS",
  },
  {
    airlineCode: "TPS",
    telephony: "TAPSA",
  },
  {
    airlineCode: "TQN",
    telephony: "TAQUAN",
  },
  {
    airlineCode: "IRR",
    telephony: "TARAIR",
  },
  {
    airlineCode: "TGT",
    telephony: "TARGET",
  },
  {
    airlineCode: "TKK",
    telephony: "TARKA",
  },
  {
    airlineCode: "SRM",
    telephony: "TARMEX",
  },
  {
    airlineCode: "WTN",
    telephony: "TARNISH",
  },
  {
    airlineCode: "ROT",
    telephony: "TAROM",
  },
  {
    airlineCode: "TSJ",
    telephony: "TARSIER",
  },
  {
    airlineCode: "HSS",
    telephony: "TAS HELICOPTEROS",
  },
  {
    airlineCode: "TGE",
    telephony: "TASA",
  },
  {
    airlineCode: "TMN",
    telephony: "TASMAN",
  },
  {
    airlineCode: "RMS",
    telephony: "TASS AIR",
  },
  {
    airlineCode: "DTH",
    telephony: "TASSILI AIR",
  },
  {
    airlineCode: "UVT",
    telephony: "TAT-JET",
  },
  {
    airlineCode: "TTJ",
    telephony: "TATRA",
  },
  {
    airlineCode: "TAC",
    telephony: "TAURUS",
  },
  {
    airlineCode: "TAV",
    telephony: "TAVISA",
  },
  {
    airlineCode: "TQE",
    telephony: "TAXAIR",
  },
  {
    airlineCode: "CBO",
    telephony: "TAXI CABO",
  },
  {
    airlineCode: "WAM",
    telephony: "TAXI CARGO",
  },
  {
    airlineCode: "TXL",
    telephony: "TAXI COZATL",
  },
  {
    airlineCode: "MOL",
    telephony: "TAXI MOREL",
  },
  {
    airlineCode: "TXD",
    telephony: "TAXI OESTE",
  },
  {
    airlineCode: "TPO",
    telephony: "TAXI-POTOSI",
  },
  {
    airlineCode: "TXM",
    telephony: "TAXIMEX",
  },
  {
    airlineCode: "TNE",
    telephony: "TAXINOROESTE",
  },
  {
    airlineCode: "TVT",
    telephony: "TAXIS TOLUCA",
  },
  {
    airlineCode: "TXV",
    telephony: "TAXIVALLARTA",
  },
  {
    airlineCode: "TFY",
    telephony: "TAYSIDE",
  },
  {
    airlineCode: "CDO",
    telephony: "TCHADIA",
  },
  {
    airlineCode: "TLS",
    telephony: "TEALSY",
  },
  {
    airlineCode: "TIM",
    telephony: "TEAM BRASIL",
  },
  {
    airlineCode: "TEW",
    telephony: "TEAMWORK",
  },
  {
    airlineCode: "TEF",
    telephony: "TECFOTO",
  },
  {
    airlineCode: "TEC",
    telephony: "TECHJET",
  },
  {
    airlineCode: "TCS",
    telephony: "TECHSERVICE",
  },
  {
    airlineCode: "TTS",
    telephony: "TECNICO",
  },
  {
    airlineCode: "TEE",
    telephony: "TEEBIRD",
  },
  {
    airlineCode: "TWB",
    telephony: "TEEWAY",
  },
  {
    airlineCode: "THR",
    telephony: "TEHRAN AIR",
  },
  {
    airlineCode: "TCM",
    telephony: "TELEDYN",
  },
  {
    airlineCode: "MTE",
    telephony: "TELEJET",
  },
  {
    airlineCode: "TLX",
    telephony: "TELESIS",
  },
  {
    airlineCode: "TEL",
    telephony: "TELFORD",
  },
  {
    airlineCode: "TDE",
    telephony: "TELLURIDE",
  },
  {
    airlineCode: "TPJ",
    telephony: "TEMPUS JETS",
  },
  {
    airlineCode: "TMS",
    telephony: "TEMSCO",
  },
  {
    airlineCode: "TEN",
    telephony: "TENNESSEE",
  },
  {
    airlineCode: "THL",
    telephony: "TERNHILL",
  },
  {
    airlineCode: "TVR",
    telephony: "TERRAAVIA",
  },
  {
    airlineCode: "USX",
    telephony: "TERRAKEA",
  },
  {
    airlineCode: "TER",
    telephony: "TERRI-AIRE",
  },
  {
    airlineCode: "TES",
    telephony: "TESABAN",
  },
  {
    airlineCode: "ETP",
    telephony: "TESTER",
  },
  {
    airlineCode: "TTE",
    telephony: "TETON",
  },
  {
    airlineCode: "TXS",
    telephony: "TEXAIR",
  },
  {
    airlineCode: "TXN",
    telephony: "TEXAS NATIONAL",
  },
  {
    airlineCode: "XLR",
    telephony: "TEXEL",
  },
  {
    airlineCode: "XTA",
    telephony: "TEXTRA",
  },
  {
    airlineCode: "TXH",
    telephony: "TEXTRON",
  },
  {
    airlineCode: "TEZ",
    telephony: "TEZJET",
  },
  {
    airlineCode: "THA",
    telephony: "THAI",
  },
  {
    airlineCode: "AIQ",
    telephony: "THAI ASIA",
  },
  {
    airlineCode: "TSL",
    telephony: "THAI AVIATION",
  },
  {
    airlineCode: "TFT",
    telephony: "THAI FLYING",
  },
  {
    airlineCode: "HAW",
    telephony: "THAI HAWK",
  },
  {
    airlineCode: "TRB",
    telephony: "THAI REGIONAL",
  },
  {
    airlineCode: "THD",
    telephony: "THAI SMILE",
  },
  {
    airlineCode: "SPY",
    telephony: "THAI SPACE",
  },
  {
    airlineCode: "ESS",
    telephony: "THAI STAR",
  },
  {
    airlineCode: "AST",
    telephony: "THAI SUMMER",
  },
  {
    airlineCode: "TVJ",
    telephony: "THAIVIET JET",
  },
  {
    airlineCode: "TGC",
    telephony: "THANET",
  },
  {
    airlineCode: "CTW",
    telephony: "THIRD CARGO",
  },
  {
    airlineCode: "TCX",
    telephony: "THOMAS COOK",
  },
  {
    airlineCode: "TIV",
    telephony: "THRIVE",
  },
  {
    airlineCode: "THO",
    telephony: "THRO",
  },
  {
    airlineCode: "TRF",
    telephony: "THRUST",
  },
  {
    airlineCode: "TDB",
    telephony: "THUNDER BAY",
  },
  {
    airlineCode: "VCG",
    telephony: "THUNDER CAT",
  },
  {
    airlineCode: "OKC",
    telephony: "THUNDER WINGS",
  },
  {
    airlineCode: "GGT",
    telephony: "THUNDERBALL",
  },
  {
    airlineCode: "NTA",
    telephony: "THUNDERBIRD",
  },
  {
    airlineCode: "TJJ",
    telephony: "THUNDERBOLT",
  },
  {
    airlineCode: "NSM",
    telephony: "THUNDERCLOUD",
  },
  {
    airlineCode: "TIW",
    telephony: "TIACA",
  },
  {
    airlineCode: "NMG",
    telephony: "TIANJIAO AIR",
  },
  {
    airlineCode: "CTJ",
    telephony: "TIANJIN CARGO",
  },
  {
    airlineCode: "TBA",
    telephony: "TIBET",
  },
  {
    airlineCode: "RTV",
    telephony: "TIC-TAC",
  },
  {
    airlineCode: "RII",
    telephony: "TICA",
  },
  {
    airlineCode: "TCR",
    telephony: "TICOS",
  },
  {
    airlineCode: "NTX",
    telephony: "TIFLIS",
  },
  {
    airlineCode: "TGG",
    telephony: "TIGGOZ",
  },
  {
    airlineCode: "TIG",
    telephony: "TIGRIS",
  },
  {
    airlineCode: "TIL",
    telephony: "TIL",
  },
  {
    airlineCode: "TIL",
    telephony: "TIL",
  },
  {
    airlineCode: "TBS",
    telephony: "TIMBIS",
  },
  {
    airlineCode: "TIE",
    telephony: "TIME AIR",
  },
  {
    airlineCode: "ETA",
    telephony: "TIME MACHINE",
  },
  {
    airlineCode: "TIN",
    telephony: "TINDI",
  },
  {
    airlineCode: "XLL",
    telephony: "TINGA-TINGA",
  },
  {
    airlineCode: "TIH",
    telephony: "TIRIAC AIR",
  },
  {
    airlineCode: "DEF",
    telephony: "TIRPA",
  },
  {
    airlineCode: "ICA",
    telephony: "TIRYKA",
  },
  {
    airlineCode: "LSM",
    telephony: "TITAN",
  },
  {
    airlineCode: "WCY",
    telephony: "TITAN AIR",
  },
  {
    airlineCode: "TTN",
    telephony: "TITANIUM",
  },
  {
    airlineCode: "ITN",
    telephony: "TITANLUX",
  },
  {
    airlineCode: "SAP",
    telephony: "TOBOL",
  },
  {
    airlineCode: "TOJ",
    telephony: "TOJ AIRLINE",
  },
  {
    airlineCode: "TZS",
    telephony: "TOKA",
  },
  {
    airlineCode: "TFX",
    telephony: "TOLL EXPRESS",
  },
  {
    airlineCode: "TFR",
    telephony: "TOLL FREIGHT",
  },
  {
    airlineCode: "TMK",
    telephony: "TOMAHAWK",
  },
  {
    airlineCode: "TOM",
    telephony: "TOMJET",
  },
  {
    airlineCode: "TJE",
    telephony: "TOMZAJET",
  },
  {
    airlineCode: "TON",
    telephony: "TONGA",
  },
  {
    airlineCode: "CTH",
    telephony: "TONGHANG",
  },
  {
    airlineCode: "TNK",
    telephony: "TONKA AIR",
  },
  {
    airlineCode: "TSP",
    telephony: "TONLESAP AIR",
  },
  {
    airlineCode: "TOA",
    telephony: "TOPCAT",
  },
  {
    airlineCode: "TOF",
    telephony: "TOPCLIFFE",
  },
  {
    airlineCode: "ANO",
    telephony: "TOPEND",
  },
  {
    airlineCode: "TLY",
    telephony: "TOPFLY",
  },
  {
    airlineCode: "ELJ",
    telephony: "TOPJET",
  },
  {
    airlineCode: "SFS",
    telephony: "TOPO",
  },
  {
    airlineCode: "EZS",
    telephony: "TOPSWISS",
  },
  {
    airlineCode: "FAR",
    telephony: "TORRO",
  },
  {
    airlineCode: "TTL",
    telephony: "TOTAL",
  },
  {
    airlineCode: "THF",
    telephony: "TOURAINE HELICO",
  },
  {
    airlineCode: "CXI",
    telephony: "TOURISTIC",
  },
  {
    airlineCode: "TKA",
    telephony: "TOURLIZ",
  },
  {
    airlineCode: "TTM",
    telephony: "TOUT-AIR",
  },
  {
    airlineCode: "ZTZ",
    telephony: "TOWER",
  },
  {
    airlineCode: "TOW",
    telephony: "TOWLINE",
  },
  {
    airlineCode: "PTQ",
    telephony: "TOWNSEND",
  },
  {
    airlineCode: "TOY",
    telephony: "TOYO AVIATION",
  },
  {
    airlineCode: "TRC",
    telephony: "TRACKER",
  },
  {
    airlineCode: "TDR",
    telephony: "TRADEAIR",
  },
  {
    airlineCode: "TCA",
    telephony: "TRADECRAFT",
  },
  {
    airlineCode: "JET",
    telephony: "TRADEWIND",
  },
  {
    airlineCode: "TWD",
    telephony: "TRADEWINGS",
  },
  {
    airlineCode: "JCH",
    telephony: "TRADING CARGO",
  },
  {
    airlineCode: "TFG",
    telephony: "TRAFALGAR",
  },
  {
    airlineCode: "TMC",
    telephony: "TRAIL BLAZER",
  },
  {
    airlineCode: "TNX",
    telephony: "TRAINER",
  },
  {
    airlineCode: "TMQ",
    telephony: "TRAM AIR",
  },
  {
    airlineCode: "TMX",
    telephony: "TRAMON",
  },
  {
    airlineCode: "TRR",
    telephony: "TRAMSON",
  },
  {
    airlineCode: "ETC",
    telephony: "TRANATTICO",
  },
  {
    airlineCode: "THC",
    telephony: "TRANAVEN",
  },
  {
    airlineCode: "TMZ",
    telephony: "TRANS AMAZON",
  },
  {
    airlineCode: "TRT",
    telephony: "TRANS ARABIAN",
  },
  {
    airlineCode: "TCK",
    telephony: "TRANS CARAVAN",
  },
  {
    airlineCode: "TCL",
    telephony: "TRANS COASTAL",
  },
  {
    airlineCode: "MCT",
    telephony: "TRANS CORTES",
  },
  {
    airlineCode: "EAT",
    telephony: "TRANS EUROPE",
  },
  {
    airlineCode: "TFA",
    telephony: "TRANS FLORIDA",
  },
  {
    airlineCode: "TCH",
    telephony: "TRANS GULF",
  },
  {
    airlineCode: "TGY",
    telephony: "TRANS GUYANA",
  },
  {
    airlineCode: "TIA",
    telephony: "TRANS INTERNATIONAL",
  },
  {
    airlineCode: "TRD",
    telephony: "TRANS ISLAND",
  },
  {
    airlineCode: "JYH",
    telephony: "TRANS JADE",
  },
  {
    airlineCode: "TMW",
    telephony: "TRANS MALDIVIAN",
  },
  {
    airlineCode: "MML",
    telephony: "TRANS MONGOLIA",
  },
  {
    airlineCode: "PTP",
    telephony: "TRANS PACIFIC",
  },
  {
    airlineCode: "TPU",
    telephony: "TRANS PERU",
  },
  {
    airlineCode: "SBJ",
    telephony: "TRANS SAHARA",
  },
  {
    airlineCode: "TAO",
    telephony: "TRANS-AEROMAR",
  },
  {
    airlineCode: "TSG",
    telephony: "TRANS-AIR-CONGO",
  },
  {
    airlineCode: "TVA",
    telephony: "TRANS-AMERICA",
  },
  {
    airlineCode: "TAB",
    telephony: "TRANS-BAJIO",
  },
  {
    airlineCode: "ATB",
    telephony: "TRANS-BURUNDI",
  },
  {
    airlineCode: "TCE",
    telephony: "TRANS-COLORADO",
  },
  {
    airlineCode: "TCT",
    telephony: "TRANS-CONT",
  },
  {
    airlineCode: "TRZ",
    telephony: "TRANS-MERIDIAN",
  },
  {
    airlineCode: "TNW",
    telephony: "TRANS-NATION",
  },
  {
    airlineCode: "REC",
    telephony: "TRANS-RECO",
  },
  {
    airlineCode: "NSC",
    telephony: "TRANS-SOCIETE",
  },
  {
    airlineCode: "TRX",
    telephony: "TRANS-TERRESTRES",
  },
  {
    airlineCode: "TRW",
    telephony: "TRANS-WEST",
  },
  {
    airlineCode: "LWC",
    telephony: "TRANSACA",
  },
  {
    airlineCode: "TEO",
    telephony: "TRANSAEREO",
  },
  {
    airlineCode: "TAK",
    telephony: "TRANSAFRICAN",
  },
  {
    airlineCode: "MUI",
    telephony: "TRANSAIR",
  },
  {
    airlineCode: "TSU",
    telephony: "TRANSAUTO",
  },
  {
    airlineCode: "VEN",
    telephony: "TRANSAVEN AIRLINE",
  },
  {
    airlineCode: "TRA",
    telephony: "TRANSAVIA",
  },
  {
    airlineCode: "KTB",
    telephony: "TRANSBALTIKA",
  },
  {
    airlineCode: "TCC",
    telephony: "TRANSCAL",
  },
  {
    airlineCode: "TSH",
    telephony: "TRANSCANADA",
  },
  {
    airlineCode: "TRG",
    telephony: "TRANSCARGO",
  },
  {
    airlineCode: "TCO",
    telephony: "TRANSCOLOMBIA",
  },
  {
    airlineCode: "TCP",
    telephony: "TRANSCORP",
  },
  {
    airlineCode: "TXC",
    telephony: "TRANSEXPORT",
  },
  {
    airlineCode: "TNF",
    telephony: "TRANSFAS",
  },
  {
    airlineCode: "TGX",
    telephony: "TRANSGABON",
  },
  {
    airlineCode: "GTS",
    telephony: "TRANSGROUP",
  },
  {
    airlineCode: "TLZ",
    telephony: "TRANSLIZ",
  },
  {
    airlineCode: "TMD",
    telephony: "TRANSMANDU",
  },
  {
    airlineCode: "MXT",
    telephony: "TRANSMEX",
  },
  {
    airlineCode: "TNV",
    telephony: "TRANSNORTHERN",
  },
  {
    airlineCode: "TNU",
    telephony: "TRANSNUSA",
  },
  {
    airlineCode: "TIP",
    telephony: "TRANSPAC",
  },
  {
    airlineCode: "TPM",
    telephony: "TRANSPAIS",
  },
  {
    airlineCode: "TPZ",
    telephony: "TRANSPAZ",
  },
  {
    airlineCode: "TPG",
    telephony: "TRANSPEGASO",
  },
  {
    airlineCode: "TGO",
    telephony: "TRANSPORT",
  },
  {
    airlineCode: "TTO",
    telephony: "TRANSPORT TRANSIT",
  },
  {
    airlineCode: "KTU",
    telephony: "TRANSPORT UNI",
  },
  {
    airlineCode: "SEI",
    telephony: "TRANSPORTE SIERRA",
  },
  {
    airlineCode: "KUA",
    telephony: "TRANSPORTES KAUA",
  },
  {
    airlineCode: "TEP",
    telephony: "TRANSPORTES PIZA",
  },
  {
    airlineCode: "TAU",
    telephony: "TRANSTAURO",
  },
  {
    airlineCode: "TTC",
    telephony: "TRANSTECO",
  },
  {
    airlineCode: "TWT",
    telephony: "TRANSWISATA",
  },
  {
    airlineCode: "XAR",
    telephony: "TRAVEL EXPRESS",
  },
  {
    airlineCode: "TVL",
    telephony: "TRAVEL SERVICE",
  },
  {
    airlineCode: "TEA",
    telephony: "TRAVELMAX",
  },
  {
    airlineCode: "JMG",
    telephony: "TRE TORRE",
  },
  {
    airlineCode: "TDA",
    telephony: "TREND AIR",
  },
  {
    airlineCode: "OTS",
    telephony: "TRESALIA",
  },
  {
    airlineCode: "TRU",
    telephony: "TRI AIR",
  },
  {
    airlineCode: "TSS",
    telephony: "TRI-STATE",
  },
  {
    airlineCode: "TDT",
    telephony: "TRIDENT",
  },
  {
    airlineCode: "TGN",
    telephony: "TRIGANA",
  },
  {
    airlineCode: "TMG",
    telephony: "TRILINES",
  },
  {
    airlineCode: "TYT",
    telephony: "TRINITY",
  },
  {
    airlineCode: "TIB",
    telephony: "TRIP",
  },
  {
    airlineCode: "TSY",
    telephony: "TRIPLE STAR",
  },
  {
    airlineCode: "TRY",
    telephony: "TRISTAR AIR",
  },
  {
    airlineCode: "TRP",
    telephony: "TROOPER",
  },
  {
    airlineCode: "PNA",
    telephony: "TROPIC BIRD",
  },
  {
    airlineCode: "TPD",
    telephony: "TROPICAL",
  },
  {
    airlineCode: "SBM",
    telephony: "TROPICAL SKY",
  },
  {
    airlineCode: "TGP",
    telephony: "TROPICANA",
  },
  {
    airlineCode: "TOS",
    telephony: "TROPISER",
  },
  {
    airlineCode: "VAJ",
    telephony: "TRUBADIX",
  },
  {
    airlineCode: "TUB",
    telephony: "TRUE AVIATION",
  },
  {
    airlineCode: "VKN",
    telephony: "TRUE NORTH",
  },
  {
    airlineCode: "TRJ",
    telephony: "TRUJET",
  },
  {
    airlineCode: "TUS",
    telephony: "TRUSTCO",
  },
  {
    airlineCode: "CEW",
    telephony: "TRYDONAIR",
  },
  {
    airlineCode: "TDS",
    telephony: "TSARADIA",
  },
  {
    airlineCode: "NMI",
    telephony: "TSUNAMI",
  },
  {
    airlineCode: "TUI",
    telephony: "TUI JET",
  },
  {
    airlineCode: "MNO",
    telephony: "TULCA",
  },
  {
    airlineCode: "TAR",
    telephony: "TUNAIR",
  },
  {
    airlineCode: "TUD",
    telephony: "TUNDRA",
  },
  {
    airlineCode: "TUX",
    telephony: "TUNEXPRESS",
  },
  {
    airlineCode: "TAJ",
    telephony: "TUNISAVIA",
  },
  {
    airlineCode: "XRC",
    telephony: "TUNISIA CARGO",
  },
  {
    airlineCode: "TUN",
    telephony: "TUNISIAN AIRFORCE",
  },
  {
    airlineCode: "TUP",
    telephony: "TUPOLEVAIR",
  },
  {
    airlineCode: "TDG",
    telephony: "TURBO DOG",
  },
  {
    airlineCode: "PST",
    telephony: "TURISMO REGIONAL",
  },
  {
    airlineCode: "THY",
    telephony: "TURKISH",
  },
  {
    airlineCode: "HVK",
    telephony: "TURKISH AIRFORCE",
  },
  {
    airlineCode: "TRK",
    telephony: "TURKISH REPUBLIC",
  },
  {
    airlineCode: "TUA",
    telephony: "TURKMENISTAN",
  },
  {
    airlineCode: "TUG",
    telephony: "TURKMENISTAN GOVERNMENT",
  },
  {
    airlineCode: "VTU",
    telephony: "TURPIAL",
  },
  {
    airlineCode: "TLT",
    telephony: "TURTLE",
  },
  {
    airlineCode: "VIL",
    telephony: "TURTLE DOVE",
  },
  {
    airlineCode: "TRH",
    telephony: "TURUKHAN",
  },
  {
    airlineCode: "CYF",
    telephony: "TUS AIR",
  },
  {
    airlineCode: "THS",
    telephony: "TUSAS",
  },
  {
    airlineCode: "USB",
    telephony: "TUSHETI",
  },
  {
    airlineCode: "RAC",
    telephony: "TUZLA AIR",
  },
  {
    airlineCode: "KIE",
    telephony: "TWEETY",
  },
  {
    airlineCode: "EXZ",
    telephony: "TWIGA",
  },
  {
    airlineCode: "TWY",
    telephony: "TWILIGHT",
  },
  {
    airlineCode: "TCY",
    telephony: "TWIN CITY",
  },
  {
    airlineCode: "DCS",
    telephony: "TWIN STAR",
  },
  {
    airlineCode: "TWG",
    telephony: "TWIN-GOOSE",
  },
  {
    airlineCode: "TNY",
    telephony: "TWINCAL",
  },
  {
    airlineCode: "TJT",
    telephony: "TWINJET",
  },
  {
    airlineCode: "GLL",
    telephony: "TWINS",
  },
  {
    airlineCode: "TTX",
    telephony: "TWISTER",
  },
  {
    airlineCode: "DAS",
    telephony: "TYLOS",
  },
  {
    airlineCode: "CBY",
    telephony: "TYPHOON",
  },
  {
    airlineCode: "TYW",
    telephony: "TYROL AMBULANCE",
  },
  {
    airlineCode: "TYJ",
    telephony: "TYROL MALTA",
  },
  {
    airlineCode: "TJS",
    telephony: "TYROLJET",
  },
  {
    airlineCode: "PGJ",
    telephony: "UBER",
  },
  {
    airlineCode: "UCO",
    telephony: "UCOAVIACION",
  },
  {
    airlineCode: "BOD",
    telephony: "UGABOND",
  },
  {
    airlineCode: "UGA",
    telephony: "UGANDA",
  },
  {
    airlineCode: "UCC",
    telephony: "UGANDA CARGO",
  },
  {
    airlineCode: "RAU",
    telephony: "UGANDA ROYAL",
  },
  {
    airlineCode: "TKU",
    telephony: "UGATRANS",
  },
  {
    airlineCode: "UGB",
    telephony: "UGAWINGS",
  },
  {
    airlineCode: "UGL",
    telephony: "UGLY VAN",
  },
  {
    airlineCode: "UKL",
    telephony: "UKRAINE ALLIANCE",
  },
  {
    airlineCode: "FSU",
    telephony: "UKRAINE BIRD",
  },
  {
    airlineCode: "UHL",
    telephony: "UKRAINE COPTERS",
  },
  {
    airlineCode: "AUI",
    telephony: "UKRAINE INTERNATIONAL",
  },
  {
    airlineCode: "UWJ",
    telephony: "UKRAINIAN WINGS",
  },
  {
    airlineCode: "UKT",
    telephony: "UKTUS",
  },
  {
    airlineCode: "UJC",
    telephony: "ULTIMATE",
  },
  {
    airlineCode: "ULH",
    telephony: "ULTIMATE HELI",
  },
  {
    airlineCode: "CHL",
    telephony: "ULTRA",
  },
  {
    airlineCode: "ULT",
    telephony: "ULTRAIR",
  },
  {
    airlineCode: "ULA",
    telephony: "ULTRAJET",
  },
  {
    airlineCode: "KZH",
    telephony: "ULUTAU",
  },
  {
    airlineCode: "OSC",
    telephony: "UNCIELO",
  },
  {
    airlineCode: "UDG",
    telephony: "UNDERDOG",
  },
  {
    airlineCode: "UTP",
    telephony: "UNI-TOP",
  },
  {
    airlineCode: "UNC",
    telephony: "UNICOPTER",
  },
  {
    airlineCode: "UAF",
    telephony: "UNIFORCE",
  },
  {
    airlineCode: "AUO",
    telephony: "UNIFORM OSCAR",
  },
  {
    airlineCode: "UGJ",
    telephony: "UNIJET",
  },
  {
    airlineCode: "UNF",
    telephony: "UNION FLIGHTS",
  },
  {
    airlineCode: "UBA",
    telephony: "UNIONAIR",
  },
  {
    airlineCode: "UNQ",
    telephony: "UNIQUE",
  },
  {
    airlineCode: "UAC",
    telephony: "UNITAIR",
  },
  {
    airlineCode: "UAL",
    telephony: "UNITED",
  },
  {
    airlineCode: "UAB",
    telephony: "UNITED ARABIAN",
  },
  {
    airlineCode: "UNA",
    telephony: "UNITED ASIA",
  },
  {
    airlineCode: "UCS",
    telephony: "UNITED CARRIERS",
  },
  {
    airlineCode: "UEA",
    telephony: "UNITED EAGLE",
  },
  {
    airlineCode: "UNO",
    telephony: "UNITED NATIONS",
  },
  {
    airlineCode: "NUA",
    telephony: "UNITED NIGERIA",
  },
  {
    airlineCode: "UTY",
    telephony: "UNITY",
  },
  {
    airlineCode: "UVA",
    telephony: "UNIVERSAL",
  },
  {
    airlineCode: "KZU",
    telephony: "UNIVERSAL CARGO",
  },
  {
    airlineCode: "UJR",
    telephony: "UNIVERSAL JET",
  },
  {
    airlineCode: "UNT",
    telephony: "UNIVERSITARIO",
  },
  {
    airlineCode: "UNY",
    telephony: "UNIVERSITY",
  },
  {
    airlineCode: "UCG",
    telephony: "UNIWORLD",
  },
  {
    airlineCode: "UPV",
    telephony: "UPAVON",
  },
  {
    airlineCode: "UPS",
    telephony: "UPS",
  },
  {
    airlineCode: "UWD",
    telephony: "UPWARD",
  },
  {
    airlineCode: "UBD",
    telephony: "URAIR",
  },
  {
    airlineCode: "URG",
    telephony: "URGA",
  },
  {
    airlineCode: "UGC",
    telephony: "URGEMER",
  },
  {
    airlineCode: "URI",
    telephony: "URI AIR",
  },
  {
    airlineCode: "TUL",
    telephony: "URSAL",
  },
  {
    airlineCode: "AUZ",
    telephony: "URUGUAYO",
  },
  {
    airlineCode: "USR",
    telephony: "US ARMY",
  },
  {
    airlineCode: "UCH",
    telephony: "US CHARTER",
  },
  {
    airlineCode: "USH",
    telephony: "US-HELI",
  },
  {
    airlineCode: "USJ",
    telephony: "USJET",
  },
  {
    airlineCode: "UTN",
    telephony: "UT-UKRAINE",
  },
  {
    airlineCode: "UTG",
    telephony: "UTAGE",
  },
  {
    airlineCode: "UTA",
    telephony: "UTAIR",
  },
  {
    airlineCode: "UTH",
    telephony: "UTAIR HELICOPTERS",
  },
  {
    airlineCode: "UTR",
    telephony: "UTAIR LIMITED",
  },
  {
    airlineCode: "TUZ",
    telephony: "UTAT",
  },
  {
    airlineCode: "UVM",
    telephony: "UVAVEMEX",
  },
  {
    airlineCode: "UZB",
    telephony: "UZBEK",
  },
  {
    airlineCode: "UAT",
    telephony: "UZTECH",
  },
  {
    airlineCode: "VRS",
    telephony: "VAIRSA",
  },
  {
    airlineCode: "MVA",
    telephony: "VALAIR",
  },
  {
    airlineCode: "VHS",
    telephony: "VALAIRHELI",
  },
  {
    airlineCode: "VVV",
    telephony: "VALAIRJET",
  },
  {
    airlineCode: "VLN",
    telephony: "VALAN",
  },
  {
    airlineCode: "VLJ",
    telephony: "VALJET",
  },
  {
    airlineCode: "VKY",
    telephony: "VALKYRIE",
  },
  {
    airlineCode: "VAD",
    telephony: "VALLES",
  },
  {
    airlineCode: "NUB",
    telephony: "VALLETTA",
  },
  {
    airlineCode: "VAC",
    telephony: "VALORAVIA",
  },
  {
    airlineCode: "FVJ",
    telephony: "VALUEJET",
  },
  {
    airlineCode: "VMP",
    telephony: "VAMPIRE",
  },
  {
    airlineCode: "VNX",
    telephony: "VANCE",
  },
  {
    airlineCode: "VGC",
    telephony: "VANGUARDIA COLIMA",
  },
  {
    airlineCode: "JXT",
    telephony: "VANNIN",
  },
  {
    airlineCode: "VAQ",
    telephony: "VAQUERO",
  },
  {
    airlineCode: "VRG",
    telephony: "VARNA LINES",
  },
  {
    airlineCode: "NVK",
    telephony: "VARTOVSKAVIA",
  },
  {
    airlineCode: "VFC",
    telephony: "VASCO AIR",
  },
  {
    airlineCode: "VEC",
    telephony: "VECAR",
  },
  {
    airlineCode: "BNG",
    telephony: "VECTIS",
  },
  {
    airlineCode: "WIW",
    telephony: "VEE-AVIA",
  },
  {
    airlineCode: "VVB",
    telephony: "VEE-TRANS",
  },
  {
    airlineCode: "AEH",
    telephony: "VEGA",
  },
  {
    airlineCode: "VIG",
    telephony: "VEGA AVIATION",
  },
  {
    airlineCode: "VHT",
    telephony: "VEGAS HEAT",
  },
  {
    airlineCode: "VOZ",
    telephony: "VELOCITY",
  },
  {
    airlineCode: "VLO",
    telephony: "VELOG",
  },
  {
    airlineCode: "VEJ",
    telephony: "VENEJECUTIV",
  },
  {
    airlineCode: "VNE",
    telephony: "VENEZOLANA",
  },
  {
    airlineCode: "VRC",
    telephony: "VERACRUZ",
  },
  {
    airlineCode: "VMA",
    telephony: "VERO MONMOUTH",
  },
  {
    airlineCode: "VLT",
    telephony: "VERTICAL",
  },
  {
    airlineCode: "HSV",
    telephony: "VERTIFLIGHT",
  },
  {
    airlineCode: "VYR",
    telephony: "VEYRON",
  },
  {
    airlineCode: "VDG",
    telephony: "VIAJES DON GOYO",
  },
  {
    airlineCode: "VJM",
    telephony: "VIAJES MEXICANOS",
  },
  {
    airlineCode: "VTT",
    telephony: "VIATRANSPORT",
  },
  {
    airlineCode: "CRU",
    telephony: "VIC-STARLIT",
  },
  {
    airlineCode: "VIH",
    telephony: "VICHI",
  },
  {
    airlineCode: "VSB",
    telephony: "VICKERS",
  },
  {
    airlineCode: "VMS",
    telephony: "VICTOR MIKE",
  },
  {
    airlineCode: "WEV",
    telephony: "VICTORIA",
  },
  {
    airlineCode: "VTY",
    telephony: "VICTORY",
  },
  {
    airlineCode: "VES",
    telephony: "VIEQUES",
  },
  {
    airlineCode: "HVN",
    telephony: "VIET NAM AIRLINES",
  },
  {
    airlineCode: "VJC",
    telephony: "VIETJETAIR",
  },
  {
    airlineCode: "TTG",
    telephony: "VIETNAM CARGO",
  },
  {
    airlineCode: "VAG",
    telephony: "VIETRAVEL AIR",
  },
  {
    airlineCode: "VSM",
    telephony: "VIETSTAR",
  },
  {
    airlineCode: "VFM",
    telephony: "VIFEMED",
  },
  {
    airlineCode: "VKG",
    telephony: "VIKING",
  },
  {
    airlineCode: "VQI",
    telephony: "VILLA AIR",
  },
  {
    airlineCode: "VRI",
    telephony: "VILLARICA",
  },
  {
    airlineCode: "VIN",
    telephony: "VINAIR",
  },
  {
    airlineCode: "VCY",
    telephony: "VINCY",
  },
  {
    airlineCode: "VPP",
    telephony: "VINTAGE",
  },
  {
    airlineCode: "VIE",
    telephony: "VIP EMPRESARIAL",
  },
  {
    airlineCode: "VIC",
    telephony: "VIP-EJECUTIVO",
  },
  {
    airlineCode: "VUR",
    telephony: "VIPEC",
  },
  {
    airlineCode: "ULR",
    telephony: "VIPER",
  },
  {
    airlineCode: "VLS",
    telephony: "VIREL",
  },
  {
    airlineCode: "VIR",
    telephony: "VIRGIN",
  },
  {
    airlineCode: "VEX",
    telephony: "VIRGIN EXPRESS",
  },
  {
    airlineCode: "VGN",
    telephony: "VIRGIN NIGERIA",
  },
  {
    airlineCode: "VGO",
    telephony: "VIRGO",
  },
  {
    airlineCode: "VCT",
    telephony: "VISCOUNT AIR",
  },
  {
    airlineCode: "VFS",
    telephony: "VISION FLIGHT",
  },
  {
    airlineCode: "VJT",
    telephony: "VISTA JET",
  },
  {
    airlineCode: "VTI",
    telephony: "VISTARA",
  },
  {
    airlineCode: "VVC",
    telephony: "VIVA COLOMBIA",
  },
  {
    airlineCode: "VPE",
    telephony: "VIVA PERU",
  },
  {
    airlineCode: "VLV",
    telephony: "VLADLIFT",
  },
  {
    airlineCode: "VSV",
    telephony: "VLASTA",
  },
  {
    airlineCode: "VRL",
    telephony: "VOAR LINHAS",
  },
  {
    airlineCode: "VCR",
    telephony: "VOE CRUISER",
  },
  {
    airlineCode: "EXJ",
    telephony: "VOLANTE",
  },
  {
    airlineCode: "VLZ",
    telephony: "VOLARE",
  },
  {
    airlineCode: "VOI",
    telephony: "VOLARIS",
  },
  {
    airlineCode: "VLR",
    telephony: "VOLAX",
  },
  {
    airlineCode: "VDR",
    telephony: "VOLDIR",
  },
  {
    airlineCode: "VDA",
    telephony: "VOLGA",
  },
  {
    airlineCode: "SYM",
    telephony: "VOLO SKY",
  },
  {
    airlineCode: "VGV",
    telephony: "VOLOGDA AIR",
  },
  {
    airlineCode: "RGV",
    telephony: "VOLON",
  },
  {
    airlineCode: "VOE",
    telephony: "VOLOTEA",
  },
  {
    airlineCode: "VLB",
    telephony: "VOLTA",
  },
  {
    airlineCode: "VTE",
    telephony: "VOLUNTEER",
  },
  {
    airlineCode: "VXS",
    telephony: "VOLUXIS",
  },
  {
    airlineCode: "EJE",
    telephony: "VOODOO",
  },
  {
    airlineCode: "SHF",
    telephony: "VORTEX",
  },
  {
    airlineCode: "VTK",
    telephony: "VOSTOK",
  },
  {
    airlineCode: "VAL",
    telephony: "VOYAGEUR",
  },
  {
    airlineCode: "VLG",
    telephony: "VUELING",
  },
  {
    airlineCode: "VTH",
    telephony: "VUELOS TEHUACAN",
  },
  {
    airlineCode: "VUK",
    telephony: "VUKANI",
  },
  {
    airlineCode: "WAD",
    telephony: "VULCAN",
  },
  {
    airlineCode: "VKA",
    telephony: "VULKAN AIR",
  },
  {
    airlineCode: "VZL",
    telephony: "VZLYET",
  },
  {
    airlineCode: "ESW",
    telephony: "W-BUSINESS",
  },
  {
    airlineCode: "WAB",
    telephony: "WABASH",
  },
  {
    airlineCode: "WVA",
    telephony: "WABASH VALLEY",
  },
  {
    airlineCode: "FTO",
    telephony: "WAGNER",
  },
  {
    airlineCode: "AWQ",
    telephony: "WAGON AIR",
  },
  {
    airlineCode: "EAW",
    telephony: "WALYA",
  },
  {
    airlineCode: "WFH",
    telephony: "WANFENG",
  },
  {
    airlineCode: "WAV",
    telephony: "WARBELOW",
  },
  {
    airlineCode: "WAR",
    telephony: "WARBIRDS",
  },
  {
    airlineCode: "NEP",
    telephony: "WARISAN",
  },
  {
    airlineCode: "CWH",
    telephony: "WARPLANE HERITAGE",
  },
  {
    airlineCode: "WSG",
    telephony: "WASAYA",
  },
  {
    airlineCode: "WPH",
    telephony: "WAT PHNOM",
  },
  {
    airlineCode: "WAN",
    telephony: "WATANIYA",
  },
  {
    airlineCode: "WDG",
    telephony: "WATCHDOG",
  },
  {
    airlineCode: "VSS",
    telephony: "WATERBIRD",
  },
  {
    airlineCode: "WMA",
    telephony: "WATERMAKERS",
  },
  {
    airlineCode: "WMN",
    telephony: "WATERMAN",
  },
  {
    airlineCode: "LOF",
    telephony: "WATERSKI",
  },
  {
    airlineCode: "BCB",
    telephony: "WAVEBIRD",
  },
  {
    airlineCode: "WYF",
    telephony: "WAYFARER",
  },
  {
    airlineCode: "WEY",
    telephony: "WEB ACADEMY",
  },
  {
    airlineCode: "WEB",
    telephony: "WEB-BRASIL",
  },
  {
    airlineCode: "ACO",
    telephony: "WEBER",
  },
  {
    airlineCode: "WHS",
    telephony: "WEEKING",
  },
  {
    airlineCode: "WLC",
    telephony: "WELCOMEAIR",
  },
  {
    airlineCode: "CGH",
    telephony: "WELKIN",
  },
  {
    airlineCode: "TWW",
    telephony: "WELWITCHIA",
  },
  {
    airlineCode: "WED",
    telephony: "WENDA",
  },
  {
    airlineCode: "CHB",
    telephony: "WEST CHINA",
  },
  {
    airlineCode: "WCC",
    telephony: "WEST COAST",
  },
  {
    airlineCode: "WES",
    telephony: "WEST INDIAN",
  },
  {
    airlineCode: "WLN",
    telephony: "WEST LINK",
  },
  {
    airlineCode: "NWC",
    telephony: "WEST WAY",
  },
  {
    airlineCode: "WAC",
    telephony: "WESTAF CARGO",
  },
  {
    airlineCode: "WAA",
    telephony: "WESTAIR WINGS",
  },
  {
    airlineCode: "WTV",
    telephony: "WESTAVIA",
  },
  {
    airlineCode: "WST",
    telephony: "WESTERN AIR",
  },
  {
    airlineCode: "WAE",
    telephony: "WESTERN EXPRESS",
  },
  {
    airlineCode: "WGN",
    telephony: "WESTERN GLOBAL",
  },
  {
    airlineCode: "WJA",
    telephony: "WESTJET",
  },
  {
    airlineCode: "WHE",
    telephony: "WESTLAND",
  },
  {
    airlineCode: "WPA",
    telephony: "WESTPAC",
  },
  {
    airlineCode: "WPR",
    telephony: "WESTPAC RESCUE",
  },
  {
    airlineCode: "WEW",
    telephony: "WESTWIND",
  },
  {
    airlineCode: "HLY",
    telephony: "WHISPER",
  },
  {
    airlineCode: "WCD",
    telephony: "WHITE CLOUD",
  },
  {
    airlineCode: "WKT",
    telephony: "WHITE KNIGHT",
  },
  {
    airlineCode: "WCP",
    telephony: "WHITECAP",
  },
  {
    airlineCode: "WHT",
    telephony: "WHITEJET",
  },
  {
    airlineCode: "YAP",
    telephony: "WHITEKEKO",
  },
  {
    airlineCode: "SRR",
    telephony: "WHITESTAR",
  },
  {
    airlineCode: "WIF",
    telephony: "WIDEROE",
  },
  {
    airlineCode: "WID",
    telephony: "WIDGEON",
  },
  {
    airlineCode: "WIG",
    telephony: "WIGGINS AIRWAYS",
  },
  {
    airlineCode: "JWD",
    telephony: "WIJAYA AIR",
  },
  {
    airlineCode: "WJT",
    telephony: "WIJET",
  },
  {
    airlineCode: "CGO",
    telephony: "WILD ONION",
  },
  {
    airlineCode: "VHC",
    telephony: "WILDCAT",
  },
  {
    airlineCode: "WLD",
    telephony: "WILDERNESS",
  },
  {
    airlineCode: "WWA",
    telephony: "WILKEN AIR",
  },
  {
    airlineCode: "WIL",
    telephony: "WILLAMETTE",
  },
  {
    airlineCode: "WLS",
    telephony: "WILLIAMS AIR",
  },
  {
    airlineCode: "TMM",
    telephony: "WILLOW RUN",
  },
  {
    airlineCode: "WNA",
    telephony: "WINAIR",
  },
  {
    airlineCode: "WDR",
    telephony: "WIND RIDER",
  },
  {
    airlineCode: "WRC",
    telephony: "WIND ROSE",
  },
  {
    airlineCode: "WSI",
    telephony: "WIND SPIRIT",
  },
  {
    airlineCode: "WDS",
    telephony: "WINDS",
  },
  {
    airlineCode: "WJM",
    telephony: "WINDSOR JET",
  },
  {
    airlineCode: "WIA",
    telephony: "WINDWARD",
  },
  {
    airlineCode: "WDY",
    telephony: "WINDY CITY",
  },
  {
    airlineCode: "WAJ",
    telephony: "WING ASIA",
  },
  {
    airlineCode: "AVV",
    telephony: "WING MAN",
  },
  {
    airlineCode: "WAW",
    telephony: "WING SHUTTLE",
  },
  {
    airlineCode: "WOL",
    telephony: "WINGJET",
  },
  {
    airlineCode: "WLT",
    telephony: "WINGLET",
  },
  {
    airlineCode: "WWP",
    telephony: "WINGO PANAMA",
  },
  {
    airlineCode: "WON",
    telephony: "WINGS ABADI",
  },
  {
    airlineCode: "WLB",
    telephony: "WINGS LEBANON",
  },
  {
    airlineCode: "WSN",
    telephony: "WINGSPAN",
  },
  {
    airlineCode: "TTV",
    telephony: "WINSKY",
  },
  {
    airlineCode: "WIS",
    telephony: "WISCAIR",
  },
  {
    airlineCode: "AWI",
    telephony: "WISCONSIN",
  },
  {
    airlineCode: "WSM",
    telephony: "WISMAN",
  },
  {
    airlineCode: "WIZ",
    telephony: "WIZARD",
  },
  {
    airlineCode: "WUK",
    telephony: "WIZZ GO",
  },
  {
    airlineCode: "WAZ",
    telephony: "WIZZ SKY",
  },
  {
    airlineCode: "WZZ",
    telephony: "WIZZAIR",
  },
  {
    airlineCode: "WOK",
    telephony: "WOKAIR",
  },
  {
    airlineCode: "WLV",
    telephony: "WOLVERINE",
  },
  {
    airlineCode: "WNR",
    telephony: "WONDAIR",
  },
  {
    airlineCode: "WDK",
    telephony: "WOODSTOCK",
  },
  {
    airlineCode: "WDW",
    telephony: "WOODWARD",
  },
  {
    airlineCode: "WOA",
    telephony: "WORLD",
  },
  {
    airlineCode: "WYM",
    telephony: "WORLD CLASS",
  },
  {
    airlineCode: "DHK",
    telephony: "WORLD EXPRESS",
  },
  {
    airlineCode: "DHV",
    telephony: "WORLDSTAR",
  },
  {
    airlineCode: "WWI",
    telephony: "WORLDWIDE",
  },
  {
    airlineCode: "WOW",
    telephony: "WOW AIR",
  },
  {
    airlineCode: "WRR",
    telephony: "WRAP AIR",
  },
  {
    airlineCode: "WRF",
    telephony: "WRIGHT FLYER",
  },
  {
    airlineCode: "WRT",
    telephony: "WRIGHT-AIR",
  },
  {
    airlineCode: "WYC",
    telephony: "WYCOMBE",
  },
  {
    airlineCode: "CNL",
    telephony: "WYO-AIR",
  },
  {
    airlineCode: "WYG",
    telephony: "WYOMING",
  },
  {
    airlineCode: "WYT",
    telephony: "WYTON",
  },
  {
    airlineCode: "IXR",
    telephony: "X-BIRD",
  },
  {
    airlineCode: "XAX",
    telephony: "XANADU",
  },
  {
    airlineCode: "XCC",
    telephony: "XCALAK",
  },
  {
    airlineCode: "XLJ",
    telephony: "XCEL JET",
  },
  {
    airlineCode: "XER",
    telephony: "XEROX",
  },
  {
    airlineCode: "CXA",
    telephony: "CANADIAN EXPRESS",
  },
  {
    airlineCode: "CCD",
    telephony: "CASCADIA (VIRTUAL) or XIANGJIAN (REAL)",
  },
  {
    airlineCode: "KXP",
    telephony: "XPRESS KARGO",
  },
  {
    airlineCode: "RUT",
    telephony: "YADID",
  },
  {
    airlineCode: "WUA",
    telephony: "YAJIE AIR",
  },
  {
    airlineCode: "YAK",
    telephony: "YAK AVIA",
  },
  {
    airlineCode: "AKY",
    telephony: "YAK-SERVICE",
  },
  {
    airlineCode: "LLM",
    telephony: "YAMAL",
  },
  {
    airlineCode: "ANR",
    telephony: "YANAIR",
  },
  {
    airlineCode: "BGC",
    telephony: "YANDU",
  },
  {
    airlineCode: "YZR",
    telephony: "YANGTZE RIVER",
  },
  {
    airlineCode: "MHD",
    telephony: "YAS AIR",
  },
  {
    airlineCode: "DAE",
    telephony: "YELLOW",
  },
  {
    airlineCode: "DGA",
    telephony: "YELLOW RIVER",
  },
  {
    airlineCode: "ELW",
    telephony: "YELLOW WINGS",
  },
  {
    airlineCode: "YEL",
    telephony: "YELLOWSTONE",
  },
  {
    airlineCode: "BBY",
    telephony: "YEMEN BLUE",
  },
  {
    airlineCode: "IYE",
    telephony: "YEMENI",
  },
  {
    airlineCode: "JFY",
    telephony: "YEOMAN",
  },
  {
    airlineCode: "ARY",
    telephony: "YERAZ",
  },
  {
    airlineCode: "FBB",
    telephony: "YEREVAN",
  },
  {
    airlineCode: "NYT",
    telephony: "YETI AIRLINES",
  },
  {
    airlineCode: "YOG",
    telephony: "YOGAN AIR",
  },
  {
    airlineCode: "MFT",
    telephony: "YORKAIR",
  },
  {
    airlineCode: "CYH",
    telephony: "YUHAO",
  },
  {
    airlineCode: "NAC",
    telephony: "YUKON",
  },
  {
    airlineCode: "UMK",
    telephony: "YUZMASH",
  },
  {
    airlineCode: "SWK",
    telephony: "ZAGEL",
  },
  {
    airlineCode: "IZG",
    telephony: "ZAGROS",
  },
  {
    airlineCode: "TZT",
    telephony: "ZAMBEZI",
  },
  {
    airlineCode: "ZAK",
    telephony: "ZAMBIA SKIES",
  },
  {
    airlineCode: "TAN",
    telephony: "ZANAIR",
  },
  {
    airlineCode: "CIT",
    telephony: "ZANE",
  },
  {
    airlineCode: "AWC",
    telephony: "ZAP",
  },
  {
    airlineCode: "QSC",
    telephony: "ZEBRA",
  },
  {
    airlineCode: "EMR",
    telephony: "ZEMMOUR",
  },
  {
    airlineCode: "XEN",
    telephony: "ZEN JET",
  },
  {
    airlineCode: "AZR",
    telephony: "ZENAIR",
  },
  {
    airlineCode: "BZE",
    telephony: "ZENSTAR",
  },
  {
    airlineCode: "ZAV",
    telephony: "ZETAVIA",
  },
  {
    airlineCode: "JTU",
    telephony: "ZHETYSU",
  },
  {
    airlineCode: "MZT",
    telephony: "ZHONG TAI",
  },
  {
    airlineCode: "CFZ",
    telephony: "ZHONGFEI",
  },
  {
    airlineCode: "SYZ",
    telephony: "ZIL AIR",
  },
  {
    airlineCode: "FEM",
    telephony: "ZIM AIRLINK",
  },
  {
    airlineCode: "FJW",
    telephony: "ZIMBIRD",
  },
  {
    airlineCode: "IMX",
    telephony: "ZIMEX",
  },
  {
    airlineCode: "EFT",
    telephony: "ZIPLINE",
  },
  {
    airlineCode: "TZP",
    telephony: "ZIPPY",
  },
  {
    airlineCode: "AZS",
    telephony: "ZITOTRANS",
  },
  {
    airlineCode: "ZOM",
    telephony: "ZOOM",
  },
  {
    airlineCode: "ORZ",
    telephony: "ZOREX",
  },
  {
    airlineCode: "UKV",
    telephony: "SKYWAYS",
  },
  {
    airlineCode: "VEA",
    telephony: "VISION EXPRESS",
  },
  {
    airlineCode: "VOY",
    telephony: "VOYAGER",
  },
]);
