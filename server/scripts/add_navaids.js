use("plan-verifier");

db.navaid.deleteMany({});

db.navaid.insertMany([
  {
    "ident": "ADK",
    "class": "HW/DME",
    "name": "MOUNT MOFFETT",
    "type": 4,
    "latitude": -176.676024221428,
    "longitude": 51.8718960605627
  },
  {
    "ident": "TED",
    "class": "H-VORW/DME",
    "name": "ANCHORAGE",
    "type": 6,
    "latitude": -149.960164398401,
    "longitude": 61.1678677419497
  },
  {
    "ident": "EDF",
    "class": "H-TACAN",
    "name": "ELMENDORF",
    "type": 9,
    "latitude": -149.769203628859,
    "longitude": 61.2550044344762
  },
  {
    "ident": "ANI",
    "class": "HW",
    "name": "ANIAK",
    "type": 3,
    "latitude": -159.597931140685,
    "longitude": 61.5901686478508
  },
  {
    "ident": "ANN",
    "class": "H-VORW/DME",
    "name": "ANNETTE ISLAND",
    "type": 6,
    "latitude": -131.578418047358,
    "longitude": 55.0604132619288
  },
  {
    "ident": "ICK",
    "class": "HW",
    "name": "NICHOLS",
    "type": 3,
    "latitude": -131.605028054953,
    "longitude": 55.0708849251949
  },
  {
    "ident": "BET",
    "class": "H-VORTACW",
    "name": "BETHEL",
    "type": 8,
    "latitude": -161.824351764205,
    "longitude": 60.7848367052005
  },
  {
    "ident": "OSE",
    "class": "HW",
    "name": "OSCARVILLE",
    "type": 3,
    "latitude": -161.872781763316,
    "longitude": 60.7913083639972
  },
  {
    "ident": "BTT",
    "class": "H-VORW/DME",
    "name": "BETTLES",
    "type": 6,
    "latitude": -151.535910914239,
    "longitude": 66.9050092979351
  },
  {
    "ident": "EAV",
    "class": "HW",
    "name": "EVANSVILLE",
    "type": 3,
    "latitude": -151.563750343716,
    "longitude": 66.8931898498651
  },
  {
    "ident": "BGQ",
    "class": "H-VORTACW",
    "name": "BIG LAKE",
    "type": 8,
    "latitude": -149.967167738612,
    "longitude": 61.5694557706563
  },
  {
    "ident": "LUR",
    "class": "HW/DME",
    "name": "CAPE LISBURNE",
    "type": 4,
    "latitude": -166.076451229916,
    "longitude": 68.8711482348914
  },
  {
    "ident": "EHM",
    "class": "HW/DME",
    "name": "CAPE NEWENHAM",
    "type": 4,
    "latitude": -162.071454904455,
    "longitude": 58.6567838225329
  },
  {
    "ident": "CQR",
    "class": "HW",
    "name": "CHANDALAR LAKE",
    "type": 3,
    "latitude": -148.469423903444,
    "longitude": 67.5023886919251
  },
  {
    "ident": "CGL",
    "class": "HWZ",
    "name": "COGHLAN ISLAND",
    "type": 3,
    "latitude": -134.699471660778,
    "longitude": 58.3593297232425
  },
  {
    "ident": "CDB",
    "class": "H-VORTACW",
    "name": "COLD BAY",
    "type": 8,
    "latitude": -162.774257911038,
    "longitude": 55.2673771169348
  },
  {
    "ident": "ELF",
    "class": "HW",
    "name": "ELFEE",
    "type": 3,
    "latitude": -162.789092643816,
    "longitude": 55.2960715569522
  },
  {
    "ident": "GCR",
    "class": "HW",
    "name": "GLACIER RIVER",
    "type": 3,
    "latitude": -145.474476141749,
    "longitude": 60.4987582312771
  },
  {
    "ident": "SCC",
    "class": "H-VORW/DME",
    "name": "DEADHORSE",
    "type": 6,
    "latitude": -148.416192130719,
    "longitude": 70.1991996295105
  },
  {
    "ident": "PVQ",
    "class": "HW",
    "name": "PUT RIVER",
    "type": 3,
    "latitude": -148.416247724498,
    "longitude": 70.2226565728814
  },
  {
    "ident": "DJN",
    "class": "HW",
    "name": "DELTA JUNCTION",
    "type": 3,
    "latitude": -145.686851914509,
    "longitude": 64.0234585615361
  },
  {
    "ident": "BIG",
    "class": "H-VORTACW",
    "name": "BIG DELTA",
    "type": 8,
    "latitude": -145.717180787215,
    "longitude": 64.0043838354281
  },
  {
    "ident": "DLG",
    "class": "H-VORW/DME",
    "name": "DILLINGHAM",
    "type": 6,
    "latitude": -158.552240683249,
    "longitude": 58.9942343244958
  },
  {
    "ident": "BTS",
    "class": "MHW",
    "name": "WOOD RIVER",
    "type": 3,
    "latitude": -158.548295409642,
    "longitude": 58.9996071026239
  },
  {
    "ident": "MOS",
    "class": "L-VORW/DME",
    "name": "MOSES POINT",
    "type": 6,
    "latitude": -162.071293090337,
    "longitude": 64.6965240594731
  },
  {
    "ident": "ENM",
    "class": "H-VORW/DME",
    "name": "EMMONAK",
    "type": 6,
    "latitude": -164.48755702338,
    "longitude": 62.7845877484555
  },
  {
    "ident": "CUN",
    "class": "HW",
    "name": "CHENA",
    "type": 3,
    "latitude": -147.49510435653,
    "longitude": 64.8385859801448
  },
  {
    "ident": "EIL",
    "class": "H-TACAN",
    "name": "EIELSON",
    "type": 9,
    "latitude": -147.093973067491,
    "longitude": 64.6537991158043
  },
  {
    "ident": "FAI",
    "class": "H-VORTACW",
    "name": "FAIRBANKS",
    "type": 8,
    "latitude": -148.01200182157,
    "longitude": 64.8000722821402
  },
  {
    "ident": "FYU",
    "class": "H-VORTACW",
    "name": "FORT YUKON",
    "type": 8,
    "latitude": -145.276685005295,
    "longitude": 66.5742559862106
  },
  {
    "ident": "GAL",
    "class": "H-VORW/DME",
    "name": "GALENA",
    "type": 6,
    "latitude": -156.777174766155,
    "longitude": 64.7381296687652
  },
  {
    "ident": "GAM",
    "class": "MHW/DME",
    "name": "GAMBELL",
    "type": 4,
    "latitude": -171.736754929105,
    "longitude": 63.7819370532625
  },
  {
    "ident": "GKN",
    "class": "H-VORW/DME",
    "name": "GULKANA",
    "type": 6,
    "latitude": -145.44738870543,
    "longitude": 62.1537553717915
  },
  {
    "ident": "HNS",
    "class": "HW",
    "name": "HAINES",
    "type": 3,
    "latitude": -135.430877498535,
    "longitude": 59.2120945949971
  },
  {
    "ident": "ALJ",
    "class": "HW",
    "name": "ORCA BAY",
    "type": 3,
    "latitude": -146.58745309472,
    "longitude": 60.4798244415359
  },
  {
    "ident": "HOM",
    "class": "H-VORW/DME",
    "name": "HOMER",
    "type": 6,
    "latitude": -151.456620910009,
    "longitude": 59.7094306542062
  },
  {
    "ident": "ACE",
    "class": "HW",
    "name": "KACHEMAK",
    "type": 3,
    "latitude": -151.500295866815,
    "longitude": 59.6413359289221
  },
  {
    "ident": "HPB",
    "class": "H-VORW/DME",
    "name": "HOOPER BAY",
    "type": 6,
    "latitude": -166.134519773844,
    "longitude": 61.5143590151878
  },
  {
    "ident": "HSL",
    "class": "H-VORW/DME",
    "name": "HUSLIA",
    "type": 6,
    "latitude": -156.363113241841,
    "longitude": 65.7078763248189
  },
  {
    "ident": "ILI",
    "class": "HW/DME",
    "name": "ILIAMNA",
    "type": 4,
    "latitude": -154.909661085586,
    "longitude": 59.7480781607292
  },
  {
    "ident": "JOH",
    "class": "H-VORW/DME",
    "name": "JOHNSTONE POINT",
    "type": 6,
    "latitude": -146.599357817636,
    "longitude": 60.4809544395518
  },
  {
    "ident": "AFE",
    "class": "MHW/DME",
    "name": "KAKE",
    "type": 4,
    "latitude": -133.911908627843,
    "longitude": 56.9639209716294
  },
  {
    "ident": "ENA",
    "class": "H-VORW/DME",
    "name": "KENAI",
    "type": 6,
    "latitude": -151.195265387814,
    "longitude": 60.6147036894372
  },
  {
    "ident": "CMJ",
    "class": "HW",
    "name": "CLAM COVE",
    "type": 3,
    "latitude": -131.690784016051,
    "longitude": 55.3421779681536
  },
  {
    "ident": "AUB",
    "class": "HW",
    "name": "CHINOOK",
    "type": 3,
    "latitude": -156.778329270669,
    "longitude": 58.7371682297937
  },
  {
    "ident": "AKN",
    "class": "H-VORTACW",
    "name": "KING SALMON",
    "type": 8,
    "latitude": -156.752367876209,
    "longitude": 58.724713234817
  },
  {
    "ident": "ODK",
    "class": "H-VORW/DME",
    "name": "KODIAK",
    "type": 6,
    "latitude": -152.33986088389,
    "longitude": 57.7750375935886
  },
  {
    "ident": "RWO",
    "class": "HW",
    "name": "WOODY ISLAND",
    "type": 3,
    "latitude": -152.324607551197,
    "longitude": 57.7748175959286
  },
  {
    "ident": "HHM",
    "class": "HW",
    "name": "HOTHAM",
    "type": 3,
    "latitude": -162.564409684948,
    "longitude": 66.9012629268754
  },
  {
    "ident": "OTZ",
    "class": "H-VORW/DME",
    "name": "KOTZEBUE",
    "type": 6,
    "latitude": -162.539964671031,
    "longitude": 66.8856809875897
  },
  {
    "ident": "LVD",
    "class": "H-VORW/DME",
    "name": "LEVEL ISLAND",
    "type": 6,
    "latitude": -133.083133019889,
    "longitude": 56.4677133198233
  },
  {
    "ident": "SQM",
    "class": "HW",
    "name": "SUMNER STRAIT",
    "type": 3,
    "latitude": -133.097394408967,
    "longitude": 56.4645852617669
  },
  {
    "ident": "MDO",
    "class": "H-VORW/DME",
    "name": "MIDDLETON ISLAND",
    "type": 6,
    "latitude": -146.350036862278,
    "longitude": 59.4218067582919
  },
  {
    "ident": "MHM",
    "class": "HW",
    "name": "MINCHUMINA",
    "type": 3,
    "latitude": -152.316207855418,
    "longitude": 63.883887161713
  },
  {
    "ident": "OAY",
    "class": "HW",
    "name": "NORTON BAY",
    "type": 3,
    "latitude": -162.063736978352,
    "longitude": 64.6955229498282
  },
  {
    "ident": "ICW",
    "class": "HW",
    "name": "ICE POOL",
    "type": 3,
    "latitude": -149.076907689518,
    "longitude": 64.5456943367672
  },
  {
    "ident": "ENN",
    "class": "H-VORTACW",
    "name": "NENANA",
    "type": 8,
    "latitude": -149.072896619834,
    "longitude": 64.5900112785514
  },
  {
    "ident": "OQK",
    "class": "MHW/DME",
    "name": "NOATAK",
    "type": 4,
    "latitude": -162.972653448865,
    "longitude": 67.5701108458347
  },
  {
    "ident": "FDV",
    "class": "HW",
    "name": "FORT DAVIS",
    "type": 3,
    "latitude": -165.315121635972,
    "longitude": 64.4947452127558
  },
  {
    "ident": "OME",
    "class": "H-VORW/DME",
    "name": "NOME",
    "type": 6,
    "latitude": -165.253198025731,
    "longitude": 64.4851077238694
  },
  {
    "ident": "AES",
    "class": "HW",
    "name": "NABESNA",
    "type": 3,
    "latitude": -141.888638373481,
    "longitude": 62.9656150921072
  },
  {
    "ident": "ORT",
    "class": "H-VORTACW",
    "name": "NORTHWAY",
    "type": 8,
    "latitude": -141.912632248854,
    "longitude": 62.9472023109151
  },
  {
    "ident": "UQS",
    "class": "HW",
    "name": "NUIQSUT VILLAGE",
    "type": 3,
    "latitude": -151.000864044534,
    "longitude": 70.2121766511849
  },
  {
    "ident": "PHO",
    "class": "HW",
    "name": "POINT HOPE",
    "type": 3,
    "latitude": -166.798252364813,
    "longitude": 68.3446289999816
  },
  {
    "ident": "PIZ",
    "class": "HW",
    "name": "POINT LAY",
    "type": 3,
    "latitude": -162.996324635041,
    "longitude": 69.7364770175777
  },
  {
    "ident": "PDN",
    "class": "HW/DME",
    "name": "PORT HEIDEN",
    "type": 4,
    "latitude": -158.647586812543,
    "longitude": 56.954283935164
  },
  {
    "ident": "HBT",
    "class": "HW/DME",
    "name": "BORLAND",
    "type": 4,
    "latitude": -160.518469244991,
    "longitude": 55.3156674271857
  },
  {
    "ident": "ULL",
    "class": "H-VORW/DME",
    "name": "KUKULIAK",
    "type": 6,
    "latitude": -170.4699259356,
    "longitude": 63.692327815061
  },
  {
    "ident": "WLK",
    "class": "H-VORW/DME",
    "name": "SELAWIK",
    "type": 6,
    "latitude": -159.99085550736,
    "longitude": 66.5994756198827
  },
  {
    "ident": "SYA",
    "class": "HW",
    "name": "SHEMYA",
    "type": 3,
    "latitude": 174.060271859356,
    "longitude": 52.7219949153055
  },
  {
    "ident": "SYA",
    "class": "H-VORTACW",
    "name": "SHEMYA",
    "type": 8,
    "latitude": 174.062057970986,
    "longitude": 52.7182699161514
  },
  {
    "ident": "SHH",
    "class": "HW",
    "name": "SHISHMAREF",
    "type": 3,
    "latitude": -166.052414858758,
    "longitude": 66.2580837928935
  },
  {
    "ident": "EEF",
    "class": "HW",
    "name": "ELEPHANT",
    "type": 3,
    "latitude": -135.257938002285,
    "longitude": 58.1709704744758
  },
  {
    "ident": "SSR",
    "class": "H-VORTACW",
    "name": "SISTERS ISLAND",
    "type": 8,
    "latitude": -135.258883006024,
    "longitude": 58.1776651962134
  },
  {
    "ident": "BKA",
    "class": "H-VORTACW",
    "name": "BIORKA ISLAND",
    "type": 8,
    "latitude": -135.551332071783,
    "longitude": 56.8594135073546
  },
  {
    "ident": "IME",
    "class": "MHW",
    "name": "MOUNT EDGECUMBE",
    "type": 3,
    "latitude": -135.365816314792,
    "longitude": 57.0473518659623
  },
  {
    "ident": "SIT",
    "class": "HW",
    "name": "SITKA",
    "type": 3,
    "latitude": -135.534372901833,
    "longitude": 56.8546237879439
  },
  {
    "ident": "OLT",
    "class": "MHW/DME",
    "name": "SOLDOTNA",
    "type": 4,
    "latitude": -150.878785301587,
    "longitude": 60.4748498608414
  },
  {
    "ident": "CRN",
    "class": "HW",
    "name": "CAIRN MOUNTAIN",
    "type": 3,
    "latitude": -155.568639432778,
    "longitude": 61.1017507262471
  },
  {
    "ident": "SQA",
    "class": "H-VORW/DME",
    "name": "SPARREVOHN",
    "type": 6,
    "latitude": -155.63460220379,
    "longitude": 61.098580437883
  },
  {
    "ident": "SRI",
    "class": "HW/DME",
    "name": "PRIBILOF",
    "type": 4,
    "latitude": -169.647580141235,
    "longitude": 56.5719054672757
  },
  {
    "ident": "SMA",
    "class": "HW",
    "name": "ST MARYS",
    "type": 3,
    "latitude": -163.281917195695,
    "longitude": 62.0593855151344
  },
  {
    "ident": "SPY",
    "class": "HW/DME",
    "name": "ST PAUL ISLAND",
    "type": 4,
    "latitude": -170.233010875756,
    "longitude": 57.1569980924876
  },
  {
    "ident": "TKA",
    "class": "H-VORW/DME",
    "name": "TALKEETNA",
    "type": 6,
    "latitude": -150.105614668223,
    "longitude": 62.2986598658083
  },
  {
    "ident": "TAL",
    "class": "H-VORW/DME",
    "name": "TANANA",
    "type": 6,
    "latitude": -152.177575446156,
    "longitude": 65.1771257014352
  },
  {
    "ident": "TNC",
    "class": "HW/DME",
    "name": "TIN CITY",
    "type": 4,
    "latitude": -167.924826628954,
    "longitude": 65.5617288385441
  },
  {
    "ident": "TOG",
    "class": "HW/DME",
    "name": "TOGIAK",
    "type": 4,
    "latitude": -160.374106128642,
    "longitude": 59.0640843176566
  },
  {
    "ident": "JNR",
    "class": "HW",
    "name": "NORTH RIVER",
    "type": 3,
    "latitude": -160.811932541226,
    "longitude": 63.9077101784705
  },
  {
    "ident": "UNK",
    "class": "H-VORW/DME",
    "name": "UNALAKLEET",
    "type": 6,
    "latitude": -160.68429892954,
    "longitude": 63.8919399230759
  },
  {
    "ident": "DUT",
    "class": "HW",
    "name": "DUTCH HARBOR",
    "type": 4,
    "latitude": -166.547885846224,
    "longitude": 53.9051459220495
  },
  {
    "ident": "UTO",
    "class": "HW/DME",
    "name": "UTOPIA CREEK",
    "type": 4,
    "latitude": -153.693765931654,
    "longitude": 65.995161764958
  },
  {
    "ident": "MNL",
    "class": "MHW",
    "name": "MINERAL CREEK",
    "type": 3,
    "latitude": -146.352244362572,
    "longitude": 61.1242300004799
  },
  {
    "ident": "UKK",
    "class": "HW",
    "name": "WAINWRIGHT VILLAGE",
    "type": 3,
    "latitude": -160.009436477676,
    "longitude": 70.6376071895416
  },
  {
    "ident": "CYT",
    "class": "HW",
    "name": "YAKATAGA",
    "type": 3,
    "latitude": -142.488785214733,
    "longitude": 60.0861823417991
  },
  {
    "ident": "OCC",
    "class": "HW",
    "name": "OCEAN CAPE",
    "type": 3,
    "latitude": -139.728192219339,
    "longitude": 59.5436425242362
  },
  {
    "ident": "YAK",
    "class": "H-VORW/DME",
    "name": "YAKUTAT",
    "type": 6,
    "latitude": -139.648152748932,
    "longitude": 59.5108311489592
  },
  {
    "ident": "JUY",
    "class": "MHW",
    "name": "JUDD",
    "type": 3,
    "latitude": -86.3908993754474,
    "longitude": 31.3050994431826
  },
  {
    "ident": "BH",
    "class": "HW/LOM",
    "name": "MCDEN",
    "type": 3,
    "latitude": -86.8455968364434,
    "longitude": 33.511529624074
  },
  {
    "ident": "VUZ",
    "class": "H-VORTAC",
    "name": "VULCAN",
    "type": 8,
    "latitude": -86.8998421385317,
    "longitude": 33.6701385442754
  },
  {
    "ident": "OKW",
    "class": "L-VORTACW",
    "name": "BROOKWOOD",
    "type": 8,
    "latitude": -87.2500033247216,
    "longitude": 33.239566774331
  },
  {
    "ident": "RRS",
    "class": "L-VORTACW",
    "name": "WIREGRASS",
    "type": 8,
    "latitude": -85.4312141029062,
    "longitude": 31.2845930816735
  },
  {
    "ident": "BVG",
    "class": "MHW",
    "name": "BOLL WEEVIL",
    "type": 3,
    "latitude": -85.9819462065247,
    "longitude": 31.3393975204907
  },
  {
    "ident": "EDN",
    "class": "T-VORW",
    "name": "ENTERPRISE",
    "type": 7,
    "latitude": -85.9027511821627,
    "longitude": 31.2963744576179
  },
  {
    "ident": "EUF",
    "class": "L-VORTACW",
    "name": "EUFAULA",
    "type": 8,
    "latitude": -85.1304837698683,
    "longitude": 31.9502568501576
  },
  {
    "ident": "GAD",
    "class": "L-VOR/DME",
    "name": "GADSDEN",
    "type": 6,
    "latitude": -86.0835616458253,
    "longitude": 33.976409474195
  },
  {
    "ident": "RQZ",
    "class": "L-VORTACW",
    "name": "ROCKET",
    "type": 8,
    "latitude": -86.633851573195,
    "longitude": 34.797245733646
  },
  {
    "ident": "BFM",
    "class": "L-VORTACW",
    "name": "BROOKLEY",
    "type": 8,
    "latitude": -88.0554998097708,
    "longitude": 30.612728124222
  },
  {
    "ident": "SJI",
    "class": "H-VORTACW",
    "name": "SEMMES",
    "type": 8,
    "latitude": -88.3592990659508,
    "longitude": 30.7259856389413
  },
  {
    "ident": "MOB",
    "class": "HW",
    "name": "WISLE",
    "type": 3,
    "latitude": -88.3032248849902,
    "longitude": 30.7606323153919
  },
  {
    "ident": "MVC",
    "class": "L-VORTACW",
    "name": "MONROEVILLE",
    "type": 8,
    "latitude": -87.3525429866052,
    "longitude": 31.4593313891966
  },
  {
    "ident": "MG",
    "class": "MHW",
    "name": "MARRA",
    "type": 3,
    "latitude": -86.5106391791734,
    "longitude": 32.3116213256983
  },
  {
    "ident": "MXF",
    "class": "L-TACAN",
    "name": "MAXWELL",
    "type": 9,
    "latitude": -86.3683602543291,
    "longitude": 32.3793727344315
  },
  {
    "ident": "MGM",
    "class": "H-VORTAC",
    "name": "MONTGOMERY",
    "type": 8,
    "latitude": -86.31973189881,
    "longitude": 32.2222877021684
  },
  {
    "ident": "SE",
    "class": "MHW/LOM",
    "name": "POLLK",
    "type": 3,
    "latitude": -86.9275734616249,
    "longitude": 32.2697843567146
  },
  {
    "ident": "TGE",
    "class": "L-VORW/DME",
    "name": "TUSKEGEE",
    "type": 6,
    "latitude": -85.6693231162452,
    "longitude": 32.4848741712443
  },
  {
    "ident": "RZC",
    "class": "H-VORTACW",
    "name": "RAZORBACK",
    "type": 8,
    "latitude": -94.1214012348284,
    "longitude": 36.2464303958783
  },
  {
    "ident": "FSM",
    "class": "L-VORTACW",
    "name": "FORT SMITH",
    "type": 8,
    "latitude": -94.2715323217719,
    "longitude": 35.3884235637092
  },
  {
    "ident": "GQE",
    "class": "L-VORW/DME",
    "name": "GILMORE",
    "type": 6,
    "latitude": -90.4781649068545,
    "longitude": 35.3470362332318
  },
  {
    "ident": "HRO",
    "class": "L-VORW/DME",
    "name": "HARRISON",
    "type": 6,
    "latitude": -93.2132837749069,
    "longitude": 36.3183162874994
  },
  {
    "ident": "UJM",
    "class": "L-VORW/DME",
    "name": "MARVELL",
    "type": 6,
    "latitude": -90.6744076881381,
    "longitude": 34.5750521840977
  },
  {
    "ident": "HPC",
    "class": "MHW",
    "name": "HOPE",
    "type": 3,
    "latitude": -93.6507987116832,
    "longitude": 33.7181224424055
  },
  {
    "ident": "HOT",
    "class": "L-VOR/DME",
    "name": "HOT SPRINGS",
    "type": 6,
    "latitude": -93.0906175008019,
    "longitude": 34.4786012250714
  },
  {
    "ident": "LRF",
    "class": "T-TACAN",
    "name": "JACKSONVILLE",
    "type": 9,
    "latitude": -92.1576745027617,
    "longitude": 34.9180702409312
  },
  {
    "ident": "JBR",
    "class": "T-VORW/DME",
    "name": "JONESBORO",
    "type": 6,
    "latitude": -90.5885171955328,
    "longitude": 35.8749179973114
  },
  {
    "ident": "LIT",
    "class": "H-VORTACW",
    "name": "LITTLE ROCK",
    "type": 8,
    "latitude": -92.1805347699428,
    "longitude": 34.6776790824763
  },
  {
    "ident": "OLS",
    "class": "L-VORW/DME",
    "name": "NOGALES",
    "type": 6,
    "latitude": -110.848908418355,
    "longitude": 31.4149590540439
  },
  {
    "ident": "PGA",
    "class": "L-VORW/DME",
    "name": "PAGE",
    "type": 6,
    "latitude": -111.447453975597,
    "longitude": 36.9310495013028
  },
  {
    "ident": "PXR",
    "class": "H-VORTACW",
    "name": "PHOENIX",
    "type": 8,
    "latitude": -111.970209886232,
    "longitude": 33.4330256763784
  },
  {
    "ident": "IWA",
    "class": "L-VORTACW",
    "name": "WILLIE",
    "type": 8,
    "latitude": -111.65144814705,
    "longitude": 33.3031790080095
  },
  {
    "ident": "DRK",
    "class": "H-VORTACW",
    "name": "DRAKE",
    "type": 8,
    "latitude": -112.480356752803,
    "longitude": 34.7025599844125
  },
  {
    "ident": "SSO",
    "class": "H-VORTACW",
    "name": "SAN SIMON",
    "type": 8,
    "latitude": -109.263097871462,
    "longitude": 32.2692500868315
  },
  {
    "ident": "SJN",
    "class": "H-VORTAC",
    "name": "ST JOHNS",
    "type": 8,
    "latitude": -109.143541057917,
    "longitude": 34.4240470773421
  },
  {
    "ident": "TBC",
    "class": "H-VORTAC",
    "name": "TUBA CITY",
    "type": 8,
    "latitude": -111.269598861439,
    "longitude": 36.1213174634558
  },
  {
    "ident": "DMA",
    "class": "L-TACAN",
    "name": "DAVIS MONTHAN",
    "type": 9,
    "latitude": -110.880920137289,
    "longitude": 32.1599208277448
  },
  {
    "ident": "RBJ",
    "class": "MHW",
    "name": "ROBLES",
    "type": 3,
    "latitude": -111.360318561059,
    "longitude": 32.0740466268624
  },
  {
    "ident": "RYN",
    "class": "HW",
    "name": "RYAN",
    "type": 3,
    "latitude": -111.161506580835,
    "longitude": 32.1387899785058
  },
  {
    "ident": "TUS",
    "class": "H-VORTACW",
    "name": "TUCSON",
    "type": 8,
    "latitude": -110.914866251884,
    "longitude": 32.0952088727533
  },
  {
    "ident": "INW",
    "class": "H-VORTACW",
    "name": "WINSLOW",
    "type": 8,
    "latitude": -110.795030615227,
    "longitude": 35.0616051288466
  },
  {
    "ident": "BZA",
    "class": "H-VORTAC",
    "name": "BARD",
    "type": 8,
    "latitude": -114.60295783805,
    "longitude": 32.768112396941
  },
  {
    "ident": "NYL",
    "class": "L-TACAN",
    "name": "YUMA",
    "type": 9,
    "latitude": -114.613466442467,
    "longitude": 32.6468054367454
  },
  {
    "ident": "ACV",
    "class": "L-VORW/DME",
    "name": "ARCATA",
    "type": 6,
    "latitude": -124.108330554659,
    "longitude": 40.9814478254821
  },
  {
    "ident": "EHF",
    "class": "H-VORTACW",
    "name": "SHAFTER",
    "type": 8,
    "latitude": -119.097309121388,
    "longitude": 35.4845605137189
  },
  {
    "ident": "BSR",
    "class": "L-VORTACW",
    "name": "BIG SUR",
    "type": 8,
    "latitude": -121.642125147333,
    "longitude": 36.181300416878
  },
  {
    "ident": "BIH",
    "class": "T-VORW/DME",
    "name": "BISHOP",
    "type": 6,
    "latitude": -118.366538913633,
    "longitude": 37.3769551974684
  },
  {
    "ident": "BLH",
    "class": "H-VORTACW",
    "name": "BLYTHE",
    "type": 8,
    "latitude": -114.761284872101,
    "longitude": 33.5960697161388
  },
  {
    "ident": "CMA",
    "class": "L-VORW/DME",
    "name": "CAMARILLO",
    "type": 6,
    "latitude": -119.094367341466,
    "longitude": 34.2125276028772
  },
  {
    "ident": "NID",
    "class": "L-TACAN",
    "name": "CHINA LAKE",
    "type": 9,
    "latitude": -117.690503904451,
    "longitude": 35.6879217343985
  },
  {
    "ident": "CCR",
    "class": "T-VORW/DME",
    "name": "CONCORD",
    "type": 6,
    "latitude": -122.045221523513,
    "longitude": 38.04492555003
  },
  {
    "ident": "CEC",
    "class": "L-VORTACW",
    "name": "CRESCENT CITY",
    "type": 8,
    "latitude": -124.240858752498,
    "longitude": 41.7795825874814
  },
  {
    "ident": "DAG",
    "class": "L-VORTACW",
    "name": "DAGGETT",
    "type": 8,
    "latitude": -116.578178367165,
    "longitude": 34.9624619991122
  },
  {
    "ident": "EDW",
    "class": "T-VORTACW",
    "name": "EDWARDS",
    "type": 8,
    "latitude": -117.732617735989,
    "longitude": 34.9823660991898
  },
  {
    "ident": "NJK",
    "class": "L-TACAN",
    "name": "EL CENTRO",
    "type": 9,
    "latitude": -115.681178316297,
    "longitude": 32.8318381833651
  },
  {
    "ident": "SUU",
    "class": "L-TACAN",
    "name": "TRAVIS",
    "type": 9,
    "latitude": -121.945085421231,
    "longitude": 38.2455633511127
  },
  {
    "ident": "FIM",
    "class": "L-VORTAC",
    "name": "FILLMORE",
    "type": 8,
    "latitude": -118.881303429528,
    "longitude": 34.3566984635676
  },
  {
    "ident": "FJS",
    "class": "H-VORW/DME",
    "name": "FORT JONES",
    "type": 6,
    "latitude": -122.806461268273,
    "longitude": 41.4496743596568
  },
  {
    "ident": "FOT",
    "class": "L-VORTACW",
    "name": "FORTUNA",
    "type": 8,
    "latitude": -124.234552192491,
    "longitude": 40.6712761270558
  },
  {
    "ident": "PBF",
    "class": "L-VORW/DME",
    "name": "PINE BLUFF",
    "type": 6,
    "latitude": -91.9261827294901,
    "longitude": 34.2467648428256
  },
  {
    "ident": "RUE",
    "class": "MHW",
    "name": "RUSSELLVILLE",
    "type": 3,
    "latitude": -93.094617832714,
    "longitude": 35.2570897062393
  },
  {
    "ident": "TXK",
    "class": "H-VORTACW",
    "name": "TEXARKANA",
    "type": 8,
    "latitude": -94.073249088276,
    "longitude": 33.5138871064599
  },
  {
    "ident": "TNZ",
    "class": "MHW",
    "name": "LAWRENCE COUNTY",
    "type": 3,
    "latitude": -90.9231245333076,
    "longitude": 36.2069458230511
  },
  {
    "ident": "ARG",
    "class": "H-VORTAC",
    "name": "WALNUT RIDGE",
    "type": 8,
    "latitude": -90.9536995347238,
    "longitude": 36.1100266361639
  },
  {
    "ident": "BXK",
    "class": "L-VORTAC",
    "name": "BUCKEYE",
    "type": 8,
    "latitude": -112.824602831478,
    "longitude": 33.453461189464
  },
  {
    "ident": "TFD",
    "class": "H-VORTAC",
    "name": "STANFIELD",
    "type": 8,
    "latitude": -111.908745389701,
    "longitude": 32.8858594920508
  },
  {
    "ident": "FRA",
    "class": "L-VORTACW",
    "name": "FRIANT",
    "type": 8,
    "latitude": -119.595458254991,
    "longitude": 37.1044259184311
  },
  {
    "ident": "GVO",
    "class": "L-VORTACW",
    "name": "GAVIOTA",
    "type": 8,
    "latitude": -120.091100862481,
    "longitude": 34.5313250779534
  },
  {
    "ident": "GFS",
    "class": "L-VORTAC",
    "name": "GOFFS",
    "type": 8,
    "latitude": -115.176452019794,
    "longitude": 35.1311504365
  },
  {
    "ident": "GMN",
    "class": "L-VORTAC",
    "name": "GORMAN",
    "type": 8,
    "latitude": -118.861372631758,
    "longitude": 34.8040335122943
  },
  {
    "ident": "HEC",
    "class": "H-VORTAC",
    "name": "HECTOR",
    "type": 8,
    "latitude": -116.462933887411,
    "longitude": 34.797023098968
  },
  {
    "ident": "IPL",
    "class": "H-VORTAC",
    "name": "IMPERIAL",
    "type": 8,
    "latitude": -115.508593556418,
    "longitude": 32.748871515757
  },
  {
    "ident": "NRS",
    "class": "L-TACAN",
    "name": "IMPERIAL BEACH",
    "type": 9,
    "latitude": -117.109758548491,
    "longitude": 32.564176689373
  },
  {
    "ident": "JLI",
    "class": "L-VORTACW",
    "name": "JULIAN",
    "type": 8,
    "latitude": -116.585946554002,
    "longitude": 33.1404634523139
  },
  {
    "ident": "LHS",
    "class": "H-VORTACW",
    "name": "LAKE HUGHES",
    "type": 8,
    "latitude": -118.576950352016,
    "longitude": 34.6829782383396
  },
  {
    "ident": "NLC",
    "class": "H-TACAN",
    "name": "LEMOORE",
    "type": 9,
    "latitude": -119.966344901433,
    "longitude": 36.344122765244
  },
  {
    "ident": "VBG",
    "class": "L-TACAN",
    "name": "VANDENBERG",
    "type": 9,
    "latitude": -120.583070402784,
    "longitude": 34.7325592348166
  },
  {
    "ident": "SLI",
    "class": "L-VORTACW",
    "name": "SEAL BEACH",
    "type": 8,
    "latitude": -118.054767133756,
    "longitude": 33.7833028926617
  },
  {
    "ident": "LAX",
    "class": "H-VORTACW",
    "name": "LOS ANGELES",
    "type": 8,
    "latitude": -118.432018598032,
    "longitude": 33.9331487212539
  },
  {
    "ident": "BAB",
    "class": "L-TACAN",
    "name": "BEALE",
    "type": 9,
    "latitude": -121.440768788324,
    "longitude": 39.1347995739767
  },
  {
    "ident": "MYV",
    "class": "T-VOR/DME",
    "name": "MARYSVILLE",
    "type": 6,
    "latitude": -121.573069915173,
    "longitude": 39.0986481726986
  },
  {
    "ident": "HYP",
    "class": "L-VORW/DME",
    "name": "EL NIDO",
    "type": 6,
    "latitude": -120.400231174078,
    "longitude": 37.2194375401846
  },
  {
    "ident": "MOD",
    "class": "H-VOR/DME",
    "name": "MODESTO",
    "type": 6,
    "latitude": -120.957879641606,
    "longitude": 37.6273792044797
  },
  {
    "ident": "MOG",
    "class": "MHW",
    "name": "MONTAGUE",
    "type": 3,
    "latitude": -122.481699318565,
    "longitude": 41.7272760736971
  },
  {
    "ident": "NUQ",
    "class": "T-TACAN",
    "name": "MOFFETT",
    "type": 9,
    "latitude": -122.057597843734,
    "longitude": 37.4324193857306
  },
  {
    "ident": "SGD",
    "class": "L-VORTACW",
    "name": "SCAGGS ISLAND",
    "type": 8,
    "latitude": -122.373164644933,
    "longitude": 38.179364702711
  },
  {
    "ident": "EED",
    "class": "H-VORTAC",
    "name": "NEEDLES",
    "type": 8,
    "latitude": -114.474115747823,
    "longitude": 34.766009322685
  },
  {
    "ident": "NFG",
    "class": "T-TACAN",
    "name": "CAMP PENDLETON",
    "type": 9,
    "latitude": -117.38639364773,
    "longitude": 33.2745898148783
  },
  {
    "ident": "OCN",
    "class": "H-VORTAC",
    "name": "OCEANSIDE",
    "type": 8,
    "latitude": -117.417732816545,
    "longitude": 33.240638698264
  },
  {
    "ident": "PDZ",
    "class": "H-VORTACW",
    "name": "PARADISE",
    "type": 8,
    "latitude": -117.530009277443,
    "longitude": 33.918341825104
  },
  {
    "ident": "VTU",
    "class": "L-VORW/DME",
    "name": "VENTURA",
    "type": 6,
    "latitude": -119.049503993034,
    "longitude": 34.1150639840413
  },
  {
    "ident": "PSP",
    "class": "L-VORTAC",
    "name": "PALM SPRINGS",
    "type": 8,
    "latitude": -116.429794082592,
    "longitude": 33.8700199366345
  },
  {
    "ident": "TRM",
    "class": "H-VORTACW",
    "name": "THERMAL",
    "type": 8,
    "latitude": -116.160209571969,
    "longitude": 33.6281007555655
  },
  {
    "ident": "PMD",
    "class": "H-VORTACW",
    "name": "PALMDALE",
    "type": 8,
    "latitude": -118.063834705515,
    "longitude": 34.6314032630495
  },
  {
    "ident": "PXN",
    "class": "L-VORTAC",
    "name": "PANOCHE",
    "type": 8,
    "latitude": -120.778696457798,
    "longitude": 36.7154635786214
  },
  {
    "ident": "PKE",
    "class": "H-VORTAC",
    "name": "PARKER",
    "type": 8,
    "latitude": -114.682077953258,
    "longitude": 34.1019778397271
  },
  {
    "ident": "PRB",
    "class": "L-VORTACW",
    "name": "PASO ROBLES",
    "type": 8,
    "latitude": -120.627120218161,
    "longitude": 35.6724676576017
  },
  {
    "ident": "HNW",
    "class": "L-VOR/DME",
    "name": "HANGTOWN",
    "type": 6,
    "latitude": -120.749275850086,
    "longitude": 38.724729870776
  },
  {
    "ident": "POM",
    "class": "L-VORTACW",
    "name": "POMONA",
    "type": 8,
    "latitude": -117.787087945237,
    "longitude": 34.0783934957418
  },
  {
    "ident": "TTE",
    "class": "L-VOR/DME",
    "name": "TULE",
    "type": 6,
    "latitude": -119.02082192666,
    "longitude": 35.9130561173244
  },
  {
    "ident": "RBL",
    "class": "H-VORTACW",
    "name": "RED BLUFF",
    "type": 8,
    "latitude": -122.236363761641,
    "longitude": 40.0989148645268
  },
  {
    "ident": "RDD",
    "class": "T-VOR/DME",
    "name": "REDDING",
    "type": 6,
    "latitude": -122.291714938456,
    "longitude": 40.504568224509
  },
  {
    "ident": "HDF",
    "class": "L-VORW",
    "name": "HOMELAND",
    "type": 7,
    "latitude": -117.185334206899,
    "longitude": 33.7763326619492
  },
  {
    "ident": "RIV",
    "class": "L-TACAN",
    "name": "MARCH",
    "type": 9,
    "latitude": -117.275048121728,
    "longitude": 33.9064715609667
  },
  {
    "ident": "AZC",
    "class": "MHW",
    "name": "COLORADO CITY",
    "type": 3,
    "latitude": -113.00918706432,
    "longitude": 36.9600699582211
  },
  {
    "ident": "DUG",
    "class": "L-VORTACW",
    "name": "DOUGLAS",
    "type": 8,
    "latitude": -109.602064002513,
    "longitude": 31.4726785616982
  },
  {
    "ident": "FLG",
    "class": "H-VOR/DME",
    "name": "FLAGSTAFF",
    "type": 6,
    "latitude": -111.674173854415,
    "longitude": 35.1472031453615
  },
  {
    "ident": "ARH",
    "class": "T-TACAN",
    "name": "FORT HUACHUCA",
    "type": 9,
    "latitude": -110.338994715271,
    "longitude": 31.585586324032
  },
  {
    "ident": "FHU",
    "class": "T-VORW/DME",
    "name": "LIBBY",
    "type": 6,
    "latitude": -110.354953051742,
    "longitude": 31.5896610459268
  },
  {
    "ident": "GBN",
    "class": "H-VORTAC",
    "name": "GILA BEND",
    "type": 8,
    "latitude": -112.674282766325,
    "longitude": 32.9562633522282
  },
  {
    "ident": "LUF",
    "class": "L-TACAN",
    "name": "LUKE",
    "type": 9,
    "latitude": -112.380222195974,
    "longitude": 33.5376884461344
  },
  {
    "ident": "GCN",
    "class": "L-VORW/DME",
    "name": "GRAND CANYON",
    "type": 6,
    "latitude": -112.146057353517,
    "longitude": 35.9603451667311
  },
  {
    "ident": "IGM",
    "class": "L-VOR/DME",
    "name": "KINGMAN",
    "type": 6,
    "latitude": -113.934093189969,
    "longitude": 35.260518304432
  },
  {
    "ident": "RIL",
    "class": "L-VORW/DME",
    "name": "RIFLE",
    "type": 6,
    "latitude": -107.719630142738,
    "longitude": 39.5283284212765
  },
  {
    "ident": "BQZ",
    "class": "L-VORW/DME",
    "name": "ROBERT",
    "type": 6,
    "latitude": -106.872310346711,
    "longitude": 40.4637691594942
  },
  {
    "ident": "ETL",
    "class": "L-VORW/DME",
    "name": "CONES",
    "type": 6,
    "latitude": -108.258585092985,
    "longitude": 38.0402581880243
  },
  {
    "ident": "TXC",
    "class": "L-VORTACW",
    "name": "THURMAN",
    "type": 8,
    "latitude": -103.214948298402,
    "longitude": 39.6983240348102
  },
  {
    "ident": "TBE",
    "class": "L-VORW/DME",
    "name": "TOBE",
    "type": 6,
    "latitude": -103.600065357563,
    "longitude": 37.2586636503265
  },
  {
    "ident": "GRO",
    "class": "HW",
    "name": "ROTA",
    "type": 3,
    "latitude": 145.239800675761,
    "longitude": 14.1716733203801
  },
  {
    "ident": "SN",
    "class": "HW",
    "name": "SAIPAN",
    "type": 3,
    "latitude": 145.710322248154,
    "longitude": 15.1114516209939
  },
  {
    "ident": "BDR",
    "class": "L-VORW/DME",
    "name": "BRIDGEPORT",
    "type": 6,
    "latitude": -73.1244978592192,
    "longitude": 41.1607014303876
  },
  {
    "ident": "GON",
    "class": "T-VORW/DME",
    "name": "GROTON",
    "type": 6,
    "latitude": -72.0519844662849,
    "longitude": 41.3304106652883
  },
  {
    "ident": "HFD",
    "class": "L-VORW/DME",
    "name": "HARTFORD",
    "type": 6,
    "latitude": -72.547419090286,
    "longitude": 41.6411132089638
  },
  {
    "ident": "MAD",
    "class": "L-VORW/DME",
    "name": "MADISON",
    "type": 6,
    "latitude": -72.6921935616998,
    "longitude": 41.3138448078131
  },
  {
    "ident": "ORW",
    "class": "L-VORW/DME",
    "name": "NORWICH",
    "type": 6,
    "latitude": -71.9993541842788,
    "longitude": 41.5564120998475
  },
  {
    "ident": "PUT",
    "class": "H-VORW/DME",
    "name": "PUTNAM",
    "type": 6,
    "latitude": -71.8440955460931,
    "longitude": 41.9554688487534
  },
  {
    "ident": "GTN",
    "class": "MHW",
    "name": "GEORGETOWN",
    "type": 3,
    "latitude": -77.1242181570429,
    "longitude": 38.9299069556611
  },
  {
    "ident": "DCA",
    "class": "L-VORW/DME",
    "name": "WASHINGTON",
    "type": 6,
    "latitude": -77.0364384034096,
    "longitude": 38.8594605557374
  },
  {
    "ident": "DOV",
    "class": "T-TACAN",
    "name": "DOVER",
    "type": 9,
    "latitude": -75.4674073738625,
    "longitude": 39.1324078900247
  },
  {
    "ident": "ENO",
    "class": "L-VORTACW",
    "name": "SMYRNA",
    "type": 8,
    "latitude": -75.5159743389738,
    "longitude": 39.231654297339
  },
  {
    "ident": "ATR",
    "class": "L-VOR/DME",
    "name": "WATERLOO",
    "type": 6,
    "latitude": -75.2113281077453,
    "longitude": 38.8098203335143
  },
  {
    "ident": "DQO",
    "class": "L-VORTAC",
    "name": "DUPONT",
    "type": 8,
    "latitude": -75.6070835614239,
    "longitude": 39.6781479946189
  },
  {
    "ident": "COF",
    "class": "L-TACAN",
    "name": "PATRICK",
    "type": 9,
    "latitude": -80.6117620416299,
    "longitude": 28.2376877893621
  },
  {
    "ident": "CEW",
    "class": "H-VORTACW",
    "name": "CRESTVIEW",
    "type": 8,
    "latitude": -86.6791480460619,
    "longitude": 30.8261796056953
  },
  {
    "ident": "CTY",
    "class": "L-VORTACW",
    "name": "CROSS CITY",
    "type": 8,
    "latitude": -83.048795573713,
    "longitude": 29.5990063815235
  },
  {
    "ident": "FLL",
    "class": "H-VORW/DME",
    "name": "FORT LAUDERDALE",
    "type": 6,
    "latitude": -80.1664443476257,
    "longitude": 26.0739492069465
  },
  {
    "ident": "RSW",
    "class": "L-VORTAC",
    "name": "LEE COUNTY",
    "type": 8,
    "latitude": -81.7757709395203,
    "longitude": 26.5298801192808
  },
  {
    "ident": "GNV",
    "class": "L-VORTACW",
    "name": "GATORS",
    "type": 8,
    "latitude": -82.2729759089288,
    "longitude": 29.6921203145436
  },
  {
    "ident": "GN",
    "class": "MHW/LOM",
    "name": "WYNDS",
    "type": 3,
    "latitude": -82.1721344898606,
    "longitude": 29.6700453122279
  },
  {
    "ident": "GEF",
    "class": "L-VORTAC",
    "name": "GREENVILLE",
    "type": 8,
    "latitude": -83.7831366564887,
    "longitude": 30.5513474139074
  },
  {
    "ident": "HST",
    "class": "T-TACAN",
    "name": "HOMESTEAD",
    "type": 9,
    "latitude": -80.3794166166794,
    "longitude": 25.4899851662836
  },
  {
    "ident": "CRG",
    "class": "H-VORTACW",
    "name": "CRAIG",
    "type": 8,
    "latitude": -81.5099304336552,
    "longitude": 30.338884933051
  },
  {
    "ident": "JA",
    "class": "HW/LOM",
    "name": "DINNS",
    "type": 3,
    "latitude": -81.801654690662,
    "longitude": 30.4650482868614
  },
  {
    "ident": "NIP",
    "class": "L-TACAN",
    "name": "JACKSONVILLE",
    "type": 9,
    "latitude": -81.6750582557797,
    "longitude": 30.2348574039303
  },
  {
    "ident": "FIS",
    "class": "HW",
    "name": "FISH HOOK",
    "type": 3,
    "latitude": -81.7863906138088,
    "longitude": 24.5483460087175
  },
  {
    "ident": "EYW",
    "class": "H-VORTAC",
    "name": "KEY WEST",
    "type": 8,
    "latitude": -81.8004795077532,
    "longitude": 24.5858826840397
  },
  {
    "ident": "NQX",
    "class": "H-TACAN",
    "name": "KEY WEST",
    "type": 9,
    "latitude": -81.6824472514663,
    "longitude": 24.5802471298871
  },
  {
    "ident": "LBV",
    "class": "L-VORTACW",
    "name": "LA BELLE",
    "type": 8,
    "latitude": -81.3914413915932,
    "longitude": 26.8281899241215
  },
  {
    "ident": "LCQ",
    "class": "MHW",
    "name": "LAKE CITY",
    "type": 3,
    "latitude": -82.5785943493507,
    "longitude": 30.1853256988767
  },
  {
    "ident": "LAL",
    "class": "H-VORTAC",
    "name": "LAKELAND",
    "type": 8,
    "latitude": -82.013894663485,
    "longitude": 27.9861865816362
  },
  {
    "ident": "MTH",
    "class": "HW",
    "name": "MARATHON",
    "type": 3,
    "latitude": -81.095317361237,
    "longitude": 24.7118868970329
  },
  {
    "ident": "MAI",
    "class": "L-VORTACW",
    "name": "MARIANNA",
    "type": 8,
    "latitude": -85.1244709388397,
    "longitude": 30.7861993691138
  },
  {
    "ident": "HRT",
    "class": "T-TACAN",
    "name": "HURLBURT",
    "type": 9,
    "latitude": -86.6902935879325,
    "longitude": 30.4280417387079
  },
  {
    "ident": "NRB",
    "class": "L-TACAN",
    "name": "MAYPORT",
    "type": 9,
    "latitude": -81.4230795772355,
    "longitude": 30.3886205022045
  },
  {
    "ident": "MLB",
    "class": "L-VOR/DME",
    "name": "MELBOURNE",
    "type": 6,
    "latitude": -80.6353428772582,
    "longitude": 28.1052874784915
  },
  {
    "ident": "RAL",
    "class": "L-VORW",
    "name": "RIVERSIDE",
    "type": 7,
    "latitude": -117.449839822678,
    "longitude": 33.9551854457798
  },
  {
    "ident": "MCC",
    "class": "T-VORW/DME",
    "name": "MC CLELLAN",
    "type": 6,
    "latitude": -121.404174556629,
    "longitude": 38.6673998160471
  },
  {
    "ident": "SAC",
    "class": "H-VORTACW",
    "name": "SACRAMENTO",
    "type": 8,
    "latitude": -121.551662606957,
    "longitude": 38.4437503421451
  },
  {
    "ident": "SNS",
    "class": "H-VORTACW",
    "name": "SALINAS",
    "type": 8,
    "latitude": -121.603197691089,
    "longitude": 36.6638412957183
  },
  {
    "ident": "NUC",
    "class": "L-TACAN",
    "name": "SAN CLEMENTE",
    "type": 9,
    "latitude": -118.579606885456,
    "longitude": 33.0269336125101
  },
  {
    "ident": "NSD",
    "class": "H-TACAN",
    "name": "BEAVER",
    "type": 9,
    "latitude": -118.440920462625,
    "longitude": 32.8799019361711
  },
  {
    "ident": "NKX",
    "class": "L-TACAN",
    "name": "MIRAMAR",
    "type": 9,
    "latitude": -117.154850800021,
    "longitude": 32.8697186684611
  },
  {
    "ident": "MZB",
    "class": "H-VORTACW",
    "name": "MISSION BAY",
    "type": 8,
    "latitude": -117.225424694872,
    "longitude": 32.7822086544677
  },
  {
    "ident": "NZY",
    "class": "L-TACAN",
    "name": "NORTH ISLAND",
    "type": 9,
    "latitude": -117.216235520605,
    "longitude": 32.7025892004904
  },
  {
    "ident": "PGY",
    "class": "L-VORTACW",
    "name": "POGGI",
    "type": 8,
    "latitude": -116.979091029155,
    "longitude": 32.6103425354823
  },
  {
    "ident": "SFO",
    "class": "L-VORW/DME",
    "name": "SAN FRANCISCO",
    "type": 6,
    "latitude": -122.373906801495,
    "longitude": 37.6194896566663
  },
  {
    "ident": "SJC",
    "class": "L-VORW/DME",
    "name": "SAN JOSE",
    "type": 6,
    "latitude": -121.944680042178,
    "longitude": 37.3747163338784
  },
  {
    "ident": "MQO",
    "class": "L-VORTACW",
    "name": "MORRO BAY",
    "type": 8,
    "latitude": -120.759579088335,
    "longitude": 35.2522598308149
  },
  {
    "ident": "NSI",
    "class": "L-TACAN",
    "name": "SAN NICOLAS",
    "type": 9,
    "latitude": -119.458345655962,
    "longitude": 33.2350046998217
  },
  {
    "ident": "ELB",
    "class": "T-VORW/DME",
    "name": "EL TORO",
    "type": 6,
    "latitude": -117.731095681485,
    "longitude": 33.6760345644136
  },
  {
    "ident": "RZS",
    "class": "H-VORTAC",
    "name": "SAN MARCUS",
    "type": 8,
    "latitude": -119.771004143399,
    "longitude": 34.5095317606041
  },
  {
    "ident": "SXC",
    "class": "L-VORTACW",
    "name": "SANTA CATALINA",
    "type": 8,
    "latitude": -118.419921885108,
    "longitude": 33.3750606040026
  },
  {
    "ident": "GLJ",
    "class": "L-VOR",
    "name": "GUADALUPE",
    "type": 7,
    "latitude": -120.521488745664,
    "longitude": 34.9523662052267
  },
  {
    "ident": "SMO",
    "class": "L-VORW/DME",
    "name": "SANTA MONICA",
    "type": 6,
    "latitude": -118.456727775409,
    "longitude": 34.0102498393356
  },
  {
    "ident": "SWR",
    "class": "L-VORW/DME",
    "name": "SQUAW VALLEY",
    "type": 6,
    "latitude": -120.269625274909,
    "longitude": 39.1803280029742
  },
  {
    "ident": "TNP",
    "class": "L-VORTAC",
    "name": "TWENTYNINE PALMS",
    "type": 8,
    "latitude": -115.769916762775,
    "longitude": 34.1122394462447
  },
  {
    "ident": "ENI",
    "class": "H-VORTACW",
    "name": "MENDOCINO",
    "type": 8,
    "latitude": -123.274340164942,
    "longitude": 39.0532216470673
  },
  {
    "ident": "VNY",
    "class": "L-VORW/DME",
    "name": "VAN NUYS",
    "type": 6,
    "latitude": -118.491683353778,
    "longitude": 34.2234670826576
  },
  {
    "ident": "VCV",
    "class": "T-VORW/DME",
    "name": "VICTORVILLE",
    "type": 6,
    "latitude": -117.390009309465,
    "longitude": 34.5941677434575
  },
  {
    "ident": "ILA",
    "class": "L-VORTACW",
    "name": "WILLIAMS",
    "type": 8,
    "latitude": -122.027257481318,
    "longitude": 39.0711536900558
  },
  {
    "ident": "AKO",
    "class": "H-VORW/DME",
    "name": "AKRON",
    "type": 6,
    "latitude": -103.179721120702,
    "longitude": 40.1555604913055
  },
  {
    "ident": "ALS",
    "class": "H-VORTACW",
    "name": "ALAMOSA",
    "type": 8,
    "latitude": -105.815545318792,
    "longitude": 37.3491651943705
  },
  {
    "ident": "RDY",
    "class": "L-TACAN",
    "name": "SARDY",
    "type": 9,
    "latitude": -106.858149360666,
    "longitude": 39.2132839960705
  },
  {
    "ident": "BKF",
    "class": "L-TACAN",
    "name": "BUCKLEY",
    "type": 9,
    "latitude": -104.75239616082,
    "longitude": 39.7073925420043
  },
  {
    "ident": "ITR",
    "class": "MHW",
    "name": "KIT CARSON",
    "type": 3,
    "latitude": -102.283853303219,
    "longitude": 39.2462459750298
  },
  {
    "ident": "BRK",
    "class": "H-VORW/DME",
    "name": "BLACK FOREST",
    "type": 6,
    "latitude": -104.633478269495,
    "longitude": 38.9445129990798
  },
  {
    "ident": "CO",
    "class": "MHW/LOM",
    "name": "PETEY",
    "type": 3,
    "latitude": -104.716343817559,
    "longitude": 38.6943082349914
  },
  {
    "ident": "CEZ",
    "class": "L-VORW/DME",
    "name": "CORTEZ",
    "type": 6,
    "latitude": -108.561763146519,
    "longitude": 37.389853080732
  },
  {
    "ident": "DEN",
    "class": "H-VORW/DME",
    "name": "DENVER",
    "type": 6,
    "latitude": -104.660750040741,
    "longitude": 39.8125206189019
  },
  {
    "ident": "FQF",
    "class": "H-VORTACW",
    "name": "FALCON",
    "type": 8,
    "latitude": -104.620982239309,
    "longitude": 39.6901453266711
  },
  {
    "ident": "BJC",
    "class": "H-VORW/DME",
    "name": "JEFFCO",
    "type": 6,
    "latitude": -105.138995996292,
    "longitude": 39.9130467104235
  },
  {
    "ident": "DVV",
    "class": "H-VORTACW",
    "name": "MILE HIGH",
    "type": 8,
    "latitude": -104.62434504187,
    "longitude": 39.8946959097945
  },
  {
    "ident": "DVC",
    "class": "H-VORTACW",
    "name": "DOVE CREEK",
    "type": 8,
    "latitude": -108.931284657364,
    "longitude": 37.8087456126346
  },
  {
    "ident": "DRO",
    "class": "L-VORW/DME",
    "name": "DURANGO",
    "type": 6,
    "latitude": -107.74962822629,
    "longitude": 37.1532589341453
  },
  {
    "ident": "DBL",
    "class": "H-VORW/DME",
    "name": "RED TABLE",
    "type": 6,
    "latitude": -106.894690783888,
    "longitude": 39.4393515236898
  },
  {
    "ident": "SXW",
    "class": "T-VORW/DME",
    "name": "SNOW",
    "type": 6,
    "latitude": -106.991180549674,
    "longitude": 39.6294851530821
  },
  {
    "ident": "FCS",
    "class": "T-VORW/DME",
    "name": "BUTTS",
    "type": 6,
    "latitude": -104.756911047456,
    "longitude": 38.6806948973772
  },
  {
    "ident": "IHS",
    "class": "MHW",
    "name": "IRONHORSE",
    "type": 3,
    "latitude": -104.753316602374,
    "longitude": 38.6783360082777
  },
  {
    "ident": "GLL",
    "class": "H-VORW/DME",
    "name": "GILL",
    "type": 6,
    "latitude": -104.553025654145,
    "longitude": 40.5038762763449
  },
  {
    "ident": "JNC",
    "class": "H-VORW/DME",
    "name": "GRAND JUNCTION",
    "type": 6,
    "latitude": -108.792584765633,
    "longitude": 39.0595716190587
  },
  {
    "ident": "HBU",
    "class": "H-VORW/DME",
    "name": "BLUE MESA",
    "type": 6,
    "latitude": -107.039802649259,
    "longitude": 38.4521591589015
  },
  {
    "ident": "CHE",
    "class": "H-VORW/DME",
    "name": "HAYDEN",
    "type": 6,
    "latitude": -107.304912117473,
    "longitude": 40.5200913569406
  },
  {
    "ident": "HGO",
    "class": "H-VORW/DME",
    "name": "HUGO",
    "type": 6,
    "latitude": -103.621398575631,
    "longitude": 38.8175063806122
  },
  {
    "ident": "RLG",
    "class": "H-VORW/DME",
    "name": "KREMMLING",
    "type": 6,
    "latitude": -106.442497971306,
    "longitude": 40.0026480193249
  },
  {
    "ident": "LAA",
    "class": "H-VORW/DME",
    "name": "LAMAR",
    "type": 6,
    "latitude": -102.687541623255,
    "longitude": 38.1970982925336
  },
  {
    "ident": "EKR",
    "class": "H-VORW/DME",
    "name": "MEEKER",
    "type": 6,
    "latitude": -107.924960530892,
    "longitude": 40.0674481978526
  },
  {
    "ident": "MTJ",
    "class": "H-VORW/DME",
    "name": "MONTROSE",
    "type": 6,
    "latitude": -107.899300899561,
    "longitude": 38.5064410523549
  },
  {
    "ident": "PUB",
    "class": "H-VORTACW",
    "name": "PUEBLO",
    "type": 8,
    "latitude": -104.429455931067,
    "longitude": 38.2942609741345
  },
  {
    "ident": "DHP",
    "class": "H-VORTAC",
    "name": "DOLPHIN",
    "type": 8,
    "latitude": -80.349038282769,
    "longitude": 25.7999663566676
  },
  {
    "ident": "NGS",
    "class": "L-TACAN",
    "name": "SANTA ROSA",
    "type": 9,
    "latitude": -86.9373686652478,
    "longitude": 30.6151606614195
  },
  {
    "ident": "NSE",
    "class": "L-TACAN",
    "name": "WHITING",
    "type": 9,
    "latitude": -87.0180911926086,
    "longitude": 30.7240120719287
  },
  {
    "ident": "CYY",
    "class": "T-VORW/DME",
    "name": "CYPRESS",
    "type": 6,
    "latitude": -81.7781048187633,
    "longitude": 26.1534275255045
  },
  {
    "ident": "OCF",
    "class": "L-VORTAC",
    "name": "OCALA",
    "type": 8,
    "latitude": -82.2263372655671,
    "longitude": 29.1774826944295
  },
  {
    "ident": "ORL",
    "class": "H-VORTACW",
    "name": "ORLANDO",
    "type": 8,
    "latitude": -81.335021706697,
    "longitude": 28.5427300666342
  },
  {
    "ident": "OMN",
    "class": "H-VORTAC",
    "name": "ORMOND BEACH",
    "type": 8,
    "latitude": -81.1126991681705,
    "longitude": 29.3032574769235
  },
  {
    "ident": "PAM",
    "class": "H-TACAN",
    "name": "TYNDALL",
    "type": 9,
    "latitude": -85.5724135361957,
    "longitude": 30.0740141940314
  },
  {
    "ident": "NPA",
    "class": "L-TACAN",
    "name": "PENSACOLA",
    "type": 9,
    "latitude": -87.3165062601429,
    "longitude": 30.3579458699971
  },
  {
    "ident": "NUN",
    "class": "L-VOR",
    "name": "SAUFLEY",
    "type": 7,
    "latitude": -87.3359048814627,
    "longitude": 30.4721472837351
  },
  {
    "ident": "PGD",
    "class": "T-VORW",
    "name": "PUNTA GORDA",
    "type": 7,
    "latitude": -81.9913365680349,
    "longitude": 26.9168382649806
  },
  {
    "ident": "SGJ",
    "class": "T-VORW/DME",
    "name": "ST AUGUSTINE",
    "type": 6,
    "latitude": -81.3302231445873,
    "longitude": 29.95673040365
  },
  {
    "ident": "PIE",
    "class": "H-VORTACW",
    "name": "ST PETERSBURG",
    "type": 8,
    "latitude": -82.6843126326226,
    "longitude": 27.9077693236033
  },
  {
    "ident": "SZW",
    "class": "H-VORTAC",
    "name": "SEMINOLE",
    "type": 8,
    "latitude": -84.3739471040504,
    "longitude": 30.5562346187327
  },
  {
    "ident": "MCF",
    "class": "L-TACAN",
    "name": "MACDILL",
    "type": 9,
    "latitude": -82.5135117478699,
    "longitude": 27.8611662606932
  },
  {
    "ident": "TAY",
    "class": "H-VORTACW",
    "name": "TAYLOR",
    "type": 8,
    "latitude": -82.5529068545587,
    "longitude": 30.5046435516183
  },
  {
    "ident": "DWG",
    "class": "T-TACAN",
    "name": "WARRINGTON",
    "type": 9,
    "latitude": -86.5208713205026,
    "longitude": 30.4782417553503
  },
  {
    "ident": "VKZ",
    "class": "H-VORW/DME",
    "name": "VIRGINIA KEY",
    "type": 6,
    "latitude": -80.1544457246461,
    "longitude": 25.7519052376192
  },
  {
    "ident": "PBI",
    "class": "H-VORTAC",
    "name": "PALM BEACH",
    "type": 8,
    "latitude": -80.0865076738614,
    "longitude": 26.6800568612268
  },
  {
    "ident": "AMG",
    "class": "H-VORTACW",
    "name": "ALMA",
    "type": 8,
    "latitude": -82.5080924406329,
    "longitude": 31.5365610112459
  },
  {
    "ident": "LKG",
    "class": "MHW",
    "name": "LINDBERGH",
    "type": 3,
    "latitude": -84.1081609873884,
    "longitude": 32.1744844345312
  },
  {
    "ident": "PDK",
    "class": "L-VORW/DME",
    "name": "PEACHTREE",
    "type": 6,
    "latitude": -84.2988180728146,
    "longitude": 33.8756381317324
  },
  {
    "ident": "FFC",
    "class": "MHW",
    "name": "PECAT",
    "type": 3,
    "latitude": -84.4864153187575,
    "longitude": 33.3006341123512
  },
  {
    "ident": "EMR",
    "class": "HW",
    "name": "EMORY",
    "type": 3,
    "latitude": -81.996854047672,
    "longitude": 33.4628184021536
  },
  {
    "ident": "LYZ",
    "class": "MHW",
    "name": "WILLIS",
    "type": 3,
    "latitude": -84.5260263311632,
    "longitude": 30.9727224862691
  },
  {
    "ident": "BHC",
    "class": "MHW",
    "name": "BAXLEY",
    "type": 3,
    "latitude": -82.3901743579853,
    "longitude": 31.7120299437673
  },
  {
    "ident": "CYR",
    "class": "MHW",
    "name": "CAIDY",
    "type": 3,
    "latitude": -84.1593348335453,
    "longitude": 30.8881749788224
  },
  {
    "ident": "DJD",
    "class": "MHW",
    "name": "CHERO",
    "type": 3,
    "latitude": -84.4876270368979,
    "longitude": 34.2523793157514
  },
  {
    "ident": "GPQ",
    "class": "MHW",
    "name": "CARROLLTON",
    "type": 3,
    "latitude": -85.1308944069418,
    "longitude": 33.5657833115341
  },
  {
    "ident": "AWS",
    "class": "MHW",
    "name": "LAWSON",
    "type": 3,
    "latitude": -85.023268755585,
    "longitude": 32.2932102631956
  },
  {
    "ident": "OHY",
    "class": "MHW",
    "name": "CONEY",
    "type": 3,
    "latitude": -83.8618042421967,
    "longitude": 31.9978374596512
  },
  {
    "ident": "VOF",
    "class": "MHW",
    "name": "ALCOVY",
    "type": 3,
    "latitude": -83.7821273542096,
    "longitude": 33.629844208992
  },
  {
    "ident": "OWC",
    "class": "MHW",
    "name": "COFFEE COUNTY",
    "type": 3,
    "latitude": -82.9237603335716,
    "longitude": 31.4048437461399
  },
  {
    "ident": "DBN",
    "class": "L-VORTAC",
    "name": "DUBLIN",
    "type": 8,
    "latitude": -82.8300484137681,
    "longitude": 32.5634665090865
  },
  {
    "ident": "EZM",
    "class": "MHW",
    "name": "EASTMAN",
    "type": 3,
    "latitude": -83.153946265732,
    "longitude": 32.1316980681233
  },
  {
    "ident": "SUR",
    "class": "MHW",
    "name": "FITZGERALD",
    "type": 3,
    "latitude": -83.2907154489121,
    "longitude": 31.6129721143519
  },
  {
    "ident": "MOQ",
    "class": "MHW",
    "name": "MC INTOSH",
    "type": 3,
    "latitude": -81.5102032731715,
    "longitude": 31.8311588878502
  },
  {
    "ident": "VV",
    "class": "MHW/LOM",
    "name": "JUNNE",
    "type": 3,
    "latitude": -83.0217715788952,
    "longitude": 33.6464175730449
  },
  {
    "ident": "AZE",
    "class": "MHW",
    "name": "HAZLEHURST",
    "type": 3,
    "latitude": -82.6473683292436,
    "longitude": 31.8798330283351
  },
  {
    "ident": "HOE",
    "class": "MHW",
    "name": "HOMERVILLE",
    "type": 3,
    "latitude": -82.7719383296646,
    "longitude": 31.0554636714375
  },
  {
    "ident": "LGC",
    "class": "H-VORTAC",
    "name": "LAGRANGE",
    "type": 8,
    "latitude": -85.2062257905299,
    "longitude": 33.0491251429391
  },
  {
    "ident": "DOB",
    "class": "T-TACAN",
    "name": "DOBBINS",
    "type": 9,
    "latitude": -84.5073153571551,
    "longitude": 33.9146592432694
  },
  {
    "ident": "MQW",
    "class": "MHW",
    "name": "MC RAE",
    "type": 3,
    "latitude": -82.8837578526326,
    "longitude": 32.0946264028003
  },
  {
    "ident": "UMB",
    "class": "MHW",
    "name": "CULVR",
    "type": 3,
    "latitude": -83.1596007601078,
    "longitude": 33.1518163493894
  },
  {
    "ident": "EQQ",
    "class": "MHW",
    "name": "COWETA COUNTY",
    "type": 3,
    "latitude": -84.7132742708027,
    "longitude": 33.2569507606774
  },
  {
    "ident": "RMG",
    "class": "H-VORTACW",
    "name": "ROME",
    "type": 8,
    "latitude": -85.1194016581137,
    "longitude": 34.1625676056037
  },
  {
    "ident": "SVN",
    "class": "T-VORW/DME",
    "name": "HUNTER",
    "type": 6,
    "latitude": -81.1408670616763,
    "longitude": 32.0119492186443
  },
  {
    "ident": "SAV",
    "class": "H-VORTACW",
    "name": "SAVANNAH",
    "type": 8,
    "latitude": -81.1991087517036,
    "longitude": 32.1462736912457
  },
  {
    "ident": "BZ",
    "class": "MHW/LOM",
    "name": "BULLO",
    "type": 3,
    "latitude": -81.6640364002768,
    "longitude": 32.4153798478597
  },
  {
    "ident": "OP",
    "class": "MHW/LOM",
    "name": "YATES",
    "type": 3,
    "latitude": -84.1871429911773,
    "longitude": 32.9193062623786
  },
  {
    "ident": "GTP",
    "class": "MHW",
    "name": "PATON",
    "type": 3,
    "latitude": -83.8266730749858,
    "longitude": 30.957556394064
  },
  {
    "ident": "AA",
    "class": "MHW",
    "name": "CEDAR",
    "type": 3,
    "latitude": -82.6143731201545,
    "longitude": 33.5332897849353
  },
  {
    "ident": "IFM",
    "class": "T-VORW",
    "name": "TIFT MYERS",
    "type": 7,
    "latitude": -83.4888721640296,
    "longitude": 31.4286642884115
  },
  {
    "ident": "VAD",
    "class": "H-TACAN",
    "name": "MOODY",
    "type": 9,
    "latitude": -83.1934537256132,
    "longitude": 30.9600891915242
  },
  {
    "ident": "OTK",
    "class": "H-VOR/DME",
    "name": "VALDOSTA",
    "type": 6,
    "latitude": -83.2797326320153,
    "longitude": 30.7804499818283
  },
  {
    "ident": "UQN",
    "class": "MHW",
    "name": "ONYUN",
    "type": 3,
    "latitude": -82.2974510208305,
    "longitude": 32.2236750620441
  },
  {
    "ident": "VNA",
    "class": "L-VORTAC",
    "name": "VIENNA",
    "type": 8,
    "latitude": -83.4972602579301,
    "longitude": 32.2134489088366
  },
  {
    "ident": "AYS",
    "class": "L-VORTAC",
    "name": "WAYCROSS",
    "type": 8,
    "latitude": -82.5564491102002,
    "longitude": 31.269431226988
  },
  {
    "ident": "BMW",
    "class": "MHW",
    "name": "BARROW COUNTY",
    "type": 3,
    "latitude": -83.5894753702974,
    "longitude": 33.9353701147879
  },
  {
    "ident": "UNZ",
    "class": "H-VORTACW",
    "name": "NIMITZ",
    "type": 8,
    "latitude": 144.733300788043,
    "longitude": 13.4545624536767
  },
  {
    "ident": "AJA",
    "class": "HW",
    "name": "MT MACAJNA",
    "type": 3,
    "latitude": 144.736925230976,
    "longitude": 13.4535130088573
  },
  {
    "ident": "BSF",
    "class": "HW",
    "name": "BRADSHAW",
    "type": 3,
    "latitude": -155.594370054249,
    "longitude": 19.7633590260554
  },
  {
    "ident": "UPP",
    "class": "H-VORTAC",
    "name": "UPOLU POINT",
    "type": 8,
    "latitude": -155.843281150045,
    "longitude": 20.2005445650846
  },
  {
    "ident": "ITO",
    "class": "H-VORTAC",
    "name": "HILO",
    "type": 8,
    "latitude": -155.010968679156,
    "longitude": 19.7213540163818
  },
  {
    "ident": "HN",
    "class": "MHW/LOM",
    "name": "EWABE",
    "type": 3,
    "latitude": -158.04888078412,
    "longitude": 21.3248998136918
  },
  {
    "ident": "HNL",
    "class": "H-VORTAC",
    "name": "HONOLULU",
    "type": 8,
    "latitude": -157.930425232755,
    "longitude": 21.308324535299
  },
  {
    "ident": "OGG",
    "class": "H-VORTAC",
    "name": "MAUI",
    "type": 8,
    "latitude": -156.420978344092,
    "longitude": 20.9064534276979
  },
  {
    "ident": "VYI",
    "class": "MHW",
    "name": "VALLEY ISLAND",
    "type": 3,
    "latitude": -156.442666676869,
    "longitude": 20.8807673183358
  },
  {
    "ident": "KOA",
    "class": "H-VORTACW",
    "name": "KONA",
    "type": 8,
    "latitude": -156.044934765993,
    "longitude": 19.717242370228
  },
  {
    "ident": "MUE",
    "class": "H-VOR/DME",
    "name": "KAMUELA",
    "type": 6,
    "latitude": -155.669875602418,
    "longitude": 19.9980590165845
  },
  {
    "ident": "NGF",
    "class": "L-TACAN",
    "name": "KANEOHE BAY",
    "type": 9,
    "latitude": -157.756775515154,
    "longitude": 21.4561784133631
  },
  {
    "ident": "MKK",
    "class": "H-VORTAC",
    "name": "MOLOKAI",
    "type": 8,
    "latitude": -157.167431095711,
    "longitude": 21.1381145359305
  },
  {
    "ident": "NBS",
    "class": "H-TACAN",
    "name": "BARKING SANDS PMRF",
    "type": 9,
    "latitude": -159.785207924335,
    "longitude": 22.0376397838093
  },
  {
    "ident": "CKH",
    "class": "H-VORTACW",
    "name": "KOKO HEAD",
    "type": 8,
    "latitude": -157.7029957976,
    "longitude": 21.2651156461735
  },
  {
    "ident": "LNY",
    "class": "H-VORTAC",
    "name": "LANAI",
    "type": 8,
    "latitude": -156.968903329862,
    "longitude": 20.7645034430481
  },
  {
    "ident": "LIH",
    "class": "H-VORTAC",
    "name": "LIHUE",
    "type": 8,
    "latitude": -159.338125445567,
    "longitude": 21.9652811740663
  },
  {
    "ident": "POA",
    "class": "HW",
    "name": "PAHOA",
    "type": 3,
    "latitude": -154.972242295028,
    "longitude": 19.5411434672776
  },
  {
    "ident": "SOK",
    "class": "H-VORTAC",
    "name": "SOUTH KAUAI",
    "type": 8,
    "latitude": -159.528887382614,
    "longitude": 21.9003959022986
  },
  {
    "ident": "CID",
    "class": "H-VORW/DME",
    "name": "CEDAR RAPIDS",
    "type": 6,
    "latitude": -91.7857547285357,
    "longitude": 41.8875526128135
  },
  {
    "ident": "IY",
    "class": "MHW",
    "name": "CHUKK",
    "type": 3,
    "latitude": -92.7281987490901,
    "longitude": 43.1339246959178
  },
  {
    "ident": "CVA",
    "class": "L-VORTACW",
    "name": "DAVENPORT",
    "type": 8,
    "latitude": -90.4833201720883,
    "longitude": 41.708555994431
  },
  {
    "ident": "DSM",
    "class": "H-VORTACW",
    "name": "DES MOINES",
    "type": 8,
    "latitude": -93.648565477079,
    "longitude": 41.4376321470813
  },
  {
    "ident": "DBQ",
    "class": "H-VORTACW",
    "name": "DUBUQUE",
    "type": 8,
    "latitude": -90.7090808674234,
    "longitude": 42.4014799841044
  },
  {
    "ident": "TNU",
    "class": "L-VORW/DME",
    "name": "NEWTON",
    "type": 6,
    "latitude": -93.1090395320322,
    "longitude": 41.7838916813887
  },
  {
    "ident": "OTM",
    "class": "L-VORW/DME",
    "name": "OTTUMWA",
    "type": 6,
    "latitude": -92.3259028435488,
    "longitude": 41.029122439062
  },
  {
    "ident": "PEA",
    "class": "MHW",
    "name": "PELLA",
    "type": 3,
    "latitude": -92.9446519446838,
    "longitude": 41.4045371852372
  },
  {
    "ident": "COE",
    "class": "T-VORW/DME",
    "name": "COEUR D'ALENE",
    "type": 6,
    "latitude": -116.82060229889,
    "longitude": 47.7737034425699
  },
  {
    "ident": "DBS",
    "class": "H-VORTACW",
    "name": "DUBOIS",
    "type": 8,
    "latitude": -112.209355643441,
    "longitude": 44.0888596929196
  },
  {
    "ident": "HLE",
    "class": "MHW/DME",
    "name": "HAILEY",
    "type": 4,
    "latitude": -114.243702312407,
    "longitude": 43.329784994437
  },
  {
    "ident": "IDA",
    "class": "H-VORW/DME",
    "name": "IDAHO FALLS",
    "type": 6,
    "latitude": -112.063929684337,
    "longitude": 43.5190113160047
  },
  {
    "ident": "MQG",
    "class": "L-VORW/DME",
    "name": "NEZ PERCE",
    "type": 6,
    "latitude": -116.869525055673,
    "longitude": 46.3815647254836
  },
  {
    "ident": "MLD",
    "class": "H-VORW/DME",
    "name": "MALAD CITY",
    "type": 6,
    "latitude": -112.451247054924,
    "longitude": 42.1999064253921
  },
  {
    "ident": "DNJ",
    "class": "H-VORW/DME",
    "name": "DONNELLY",
    "type": 6,
    "latitude": -116.206290720753,
    "longitude": 44.7671035523028
  },
  {
    "ident": "LIA",
    "class": "L-VORW",
    "name": "LIBERATOR",
    "type": 7,
    "latitude": -115.774264769836,
    "longitude": 42.9826787155141
  },
  {
    "ident": "MUO",
    "class": "L-TACAN",
    "name": "MOUNTAIN HOME",
    "type": 9,
    "latitude": -115.874613965164,
    "longitude": 43.0404967668069
  },
  {
    "ident": "MLP",
    "class": "H-VORW/DME",
    "name": "MULLAN PASS",
    "type": 6,
    "latitude": -115.64605866667,
    "longitude": 47.456909376326
  },
  {
    "ident": "PIH",
    "class": "H-VORW/DME",
    "name": "POCATELLO",
    "type": 6,
    "latitude": -112.652247477366,
    "longitude": 42.87039036639
  },
  {
    "ident": "LKT",
    "class": "H-VORW/DME",
    "name": "SALMON",
    "type": 6,
    "latitude": -114.084249524857,
    "longitude": 45.0213179420605
  },
  {
    "ident": "SZT",
    "class": "MHW",
    "name": "SANDPOE",
    "type": 3,
    "latitude": -116.563226260723,
    "longitude": 48.2906465619636
  },
  {
    "ident": "TWF",
    "class": "L-VORTACW",
    "name": "TWIN FALLS",
    "type": 8,
    "latitude": -114.489466389659,
    "longitude": 42.4798626697776
  },
  {
    "ident": "SKE",
    "class": "T-TACAN",
    "name": "SCOTT",
    "type": 9,
    "latitude": -89.8516524734783,
    "longitude": 38.545369088576
  },
  {
    "ident": "BIB",
    "class": "L-VORTAC",
    "name": "BIBLE GROVE",
    "type": 8,
    "latitude": -88.4818104489448,
    "longitude": 38.9203525613588
  },
  {
    "ident": "BDF",
    "class": "H-VORTACW",
    "name": "BRADFORD",
    "type": 8,
    "latitude": -89.5878793042457,
    "longitude": 41.1597390095996
  },
  {
    "ident": "CIR",
    "class": "MHW",
    "name": "CAIRO",
    "type": 3,
    "latitude": -89.2231841234121,
    "longitude": 37.0611055105216
  },
  {
    "ident": "ENL",
    "class": "H-VORTAC",
    "name": "CENTRALIA",
    "type": 8,
    "latitude": -89.1590036564298,
    "longitude": 38.4200057680157
  },
  {
    "ident": "CMI",
    "class": "L-VORTAC",
    "name": "CHAMPAIGN",
    "type": 8,
    "latitude": -88.2760660421206,
    "longitude": 40.0345361067533
  },
  {
    "ident": "CGT",
    "class": "L-VORTACW",
    "name": "CHICAGO HEIGHTS",
    "type": 8,
    "latitude": -87.5715518074869,
    "longitude": 41.5100144603985
  },
  {
    "ident": "DPA",
    "class": "L-VORW/DME",
    "name": "DUPAGE",
    "type": 6,
    "latitude": -88.350177906564,
    "longitude": 41.8903703153043
  },
  {
    "ident": "DNV",
    "class": "L-VORTACW",
    "name": "DANVILLE",
    "type": 8,
    "latitude": -87.5572658568567,
    "longitude": 40.2937739689983
  },
  {
    "ident": "AXC",
    "class": "H-VORTAC",
    "name": "ADDERS",
    "type": 8,
    "latitude": -88.8564372936021,
    "longitude": 39.7375288009205
  },
  {
    "ident": "FWC",
    "class": "MHW",
    "name": "WAYNE COUNTY",
    "type": 3,
    "latitude": -88.4093545510322,
    "longitude": 38.3801835762654
  },
  {
    "ident": "AAA",
    "class": "MHW",
    "name": "ABRAHAM",
    "type": 3,
    "latitude": -89.3380216368056,
    "longitude": 40.160124128062
  },
  {
    "ident": "OVR",
    "class": "H-VORTAC",
    "name": "OMAHA",
    "type": 8,
    "latitude": -95.736861291831,
    "longitude": 41.1671741941143
  },
  {
    "ident": "SPW",
    "class": "L-VORW/DME",
    "name": "SPENCER",
    "type": 6,
    "latitude": -95.2009991630615,
    "longitude": 43.1621862027142
  },
  {
    "ident": "BOI",
    "class": "H-VORTACW",
    "name": "BOISE",
    "type": 8,
    "latitude": -116.19214466687,
    "longitude": 43.5528159505362
  },
  {
    "ident": "BYI",
    "class": "L-VORW/DME",
    "name": "BURLEY",
    "type": 6,
    "latitude": -113.865869895169,
    "longitude": 42.5802455101732
  },
  {
    "ident": "LEV",
    "class": "H-VORTAC",
    "name": "LEEVILLE",
    "type": 8,
    "latitude": -90.1040247562091,
    "longitude": 29.1752346863099
  },
  {
    "ident": "LFT",
    "class": "L-VORTACW",
    "name": "LAFAYETTE",
    "type": 8,
    "latitude": -91.992588083939,
    "longitude": 30.1938240129583
  },
  {
    "ident": "LCH",
    "class": "H-VORTACW",
    "name": "LAKE CHARLES",
    "type": 8,
    "latitude": -93.1055755993509,
    "longitude": 30.1415189641243
  },
  {
    "ident": "MLU",
    "class": "L-VORTACW",
    "name": "MONROE",
    "type": 8,
    "latitude": -92.0360146004999,
    "longitude": 32.5168889383193
  },
  {
    "ident": "OOC",
    "class": "MHW",
    "name": "NATCHITOCHES",
    "type": 3,
    "latitude": -93.0776142765645,
    "longitude": 31.6574503892265
  },
  {
    "ident": "AUR",
    "class": "MHW",
    "name": "SULPHUR",
    "type": 3,
    "latitude": -93.4206467957253,
    "longitude": 30.1985259102399
  },
  {
    "ident": "TKH",
    "class": "MHW/LOM",
    "name": "TALLULAH",
    "type": 3,
    "latitude": -91.0258323698155,
    "longitude": 32.2453222551557
  },
  {
    "ident": "LLA",
    "class": "L-VORW/DME",
    "name": "WHITE LAKE",
    "type": 6,
    "latitude": -92.3736487179851,
    "longitude": 29.6632305544751
  },
  {
    "ident": "SWB",
    "class": "H-VORW/DME",
    "name": "SAWMILL",
    "type": 6,
    "latitude": -92.6770952980603,
    "longitude": 31.9732001908268
  },
  {
    "ident": "BOS",
    "class": "H-VOR/DME",
    "name": "BOSTON",
    "type": 6,
    "latitude": -70.9895466788082,
    "longitude": 42.3574600640952
  },
  {
    "ident": "LVM",
    "class": "L-VORW/DME",
    "name": "LIVINGSTON",
    "type": 6,
    "latitude": -110.442463894215,
    "longitude": 45.7024883463397
  },
  {
    "ident": "MLS",
    "class": "H-VORW/DME",
    "name": "MILES CITY",
    "type": 6,
    "latitude": -105.953546327889,
    "longitude": 46.3822316035121
  },
  {
    "ident": "MSO",
    "class": "L-VORW/DME",
    "name": "MISSOULA",
    "type": 6,
    "latitude": -114.083665457146,
    "longitude": 46.9079731033225
  },
  {
    "ident": "LO",
    "class": "MHW/LOM",
    "name": "TARGY",
    "type": 3,
    "latitude": -111.19756940564,
    "longitude": 44.5754306659473
  },
  {
    "ident": "XUB",
    "class": "T-VORW",
    "name": "YELLOW BUD",
    "type": 7,
    "latitude": -82.9779469366209,
    "longitude": 39.5268893298054
  },
  {
    "ident": "DJB",
    "class": "H-VOR/DME",
    "name": "DRYER",
    "type": 6,
    "latitude": -82.1619726675226,
    "longitude": 41.3580730428055
  },
  {
    "ident": "BU",
    "class": "MHW/LOM",
    "name": "BOUTN",
    "type": 3,
    "latitude": -83.204636193357,
    "longitude": 39.8192865968368
  },
  {
    "ident": "OS",
    "class": "MHW/LOM",
    "name": "FULER",
    "type": 3,
    "latitude": -83.1980639893505,
    "longitude": 40.0736455340049
  },
  {
    "ident": "UC",
    "class": "MHW/LOM",
    "name": "OBION",
    "type": 3,
    "latitude": -88.9948742820864,
    "longitude": 36.2976087076446
  },
  {
    "ident": "ABI",
    "class": "H-VORTACW",
    "name": "ABILENE",
    "type": 8,
    "latitude": -99.8634663233902,
    "longitude": 32.4813336048831
  },
  {
    "ident": "DYS",
    "class": "L-TACAN",
    "name": "DYESS",
    "type": 9,
    "latitude": -99.8570082620126,
    "longitude": 32.4185160937594
  },
  {
    "ident": "TQA",
    "class": "L-VORW/DME",
    "name": "TUSCOLA",
    "type": 6,
    "latitude": -99.8167910192908,
    "longitude": 32.2357485622161
  },
  {
    "ident": "ALI",
    "class": "L-VORW",
    "name": "ALICE",
    "type": 7,
    "latitude": -98.0213503666732,
    "longitude": 27.7398041441852
  },
  {
    "ident": "PNH",
    "class": "H-VORTACW",
    "name": "PANHANDLE",
    "type": 8,
    "latitude": -101.699041678678,
    "longitude": 35.2350687156051
  },
  {
    "ident": "BRO",
    "class": "H-VORTACW",
    "name": "BROWNSVILLE",
    "type": 8,
    "latitude": -97.3752787590213,
    "longitude": 25.9240785050283
  },
  {
    "ident": "BWD",
    "class": "L-VORW/DME",
    "name": "BROWNWOOD",
    "type": 6,
    "latitude": -98.9574682894588,
    "longitude": 31.8925879791985
  },
  {
    "ident": "CQY",
    "class": "L-VORTACW",
    "name": "CEDAR CREEK",
    "type": 8,
    "latitude": -96.2181101205592,
    "longitude": 32.1857278699385
  },
  {
    "ident": "CZJ",
    "class": "MHW",
    "name": "AMASON",
    "type": 3,
    "latitude": -94.1537906794874,
    "longitude": 31.8328823281781
  },
  {
    "ident": "CDS",
    "class": "L-VORTACW",
    "name": "CHILDRESS",
    "type": 8,
    "latitude": -100.289035996039,
    "longitude": 34.3690708635222
  },
  {
    "ident": "CLL",
    "class": "L-VORTACW",
    "name": "COLLEGE STATION",
    "type": 8,
    "latitude": -96.4206881434815,
    "longitude": 30.6050069973859
  },
  {
    "ident": "CRP",
    "class": "H-VORTACW",
    "name": "CORPUS CHRISTI",
    "type": 8,
    "latitude": -97.4448888407167,
    "longitude": 27.9037705834664
  },
  {
    "ident": "JZY",
    "class": "MHW",
    "name": "MACOMB",
    "type": 3,
    "latitude": -90.56044618475,
    "longitude": 40.518111344503
  },
  {
    "ident": "OBK",
    "class": "H-VORW/DME",
    "name": "NORTHBROOK",
    "type": 6,
    "latitude": -87.9516244903036,
    "longitude": 42.2213842830179
  },
  {
    "ident": "OLY",
    "class": "MHW",
    "name": "OLNEY",
    "type": 3,
    "latitude": -88.1726431217254,
    "longitude": 38.718224483767
  },
  {
    "ident": "PIA",
    "class": "L-VORTACW",
    "name": "PEORIA",
    "type": 8,
    "latitude": -89.7927582039839,
    "longitude": 40.6800805826274
  },
  {
    "ident": "PI",
    "class": "MHW/LOM",
    "name": "TUNGG",
    "type": 3,
    "latitude": -89.5931336957234,
    "longitude": 40.6056847468898
  },
  {
    "ident": "EON",
    "class": "L-VORTACW",
    "name": "PEOTONE",
    "type": 8,
    "latitude": -87.7910593486655,
    "longitude": 41.2696402396488
  },
  {
    "ident": "PLL",
    "class": "L-VORW/DME",
    "name": "POLO",
    "type": 6,
    "latitude": -89.5242265900407,
    "longitude": 41.9656494275872
  },
  {
    "ident": "PNT",
    "class": "L-VORW/DME",
    "name": "PONTIAC",
    "type": 6,
    "latitude": -88.7335151359784,
    "longitude": 40.8212081658979
  },
  {
    "ident": "UI",
    "class": "MHW/LOM",
    "name": "QUINCY",
    "type": 3,
    "latitude": -91.2536815975178,
    "longitude": 39.8868975855492
  },
  {
    "ident": "RBS",
    "class": "L-VORW/DME",
    "name": "ROBERTS",
    "type": 6,
    "latitude": -88.1642735595722,
    "longitude": 40.5817089878797
  },
  {
    "ident": "PLX",
    "class": "MHW",
    "name": "PALESTINE",
    "type": 3,
    "latitude": -87.6416132713086,
    "longitude": 39.0141198430718
  },
  {
    "ident": "SYZ",
    "class": "MHW",
    "name": "SHELBYVILLE",
    "type": 3,
    "latitude": -88.8435605938246,
    "longitude": 39.4065298531264
  },
  {
    "ident": "SP",
    "class": "MHW/LOM",
    "name": "HUSKK",
    "type": 3,
    "latitude": -89.7598725546222,
    "longitude": 39.7731559808918
  },
  {
    "ident": "SPI",
    "class": "H-VORTACW",
    "name": "SPINNER",
    "type": 8,
    "latitude": -89.6777419813288,
    "longitude": 39.839740442111
  },
  {
    "ident": "TOY",
    "class": "L-VORTACW",
    "name": "TROY",
    "type": 8,
    "latitude": -89.9185986196765,
    "longitude": 38.7391568983165
  },
  {
    "ident": "AI",
    "class": "MHW/LOM",
    "name": "VIDEO",
    "type": 3,
    "latitude": -85.5106919022722,
    "longitude": 40.0695348658457
  },
  {
    "ident": "OOM",
    "class": "L-VORTACW",
    "name": "HOOSIER",
    "type": 8,
    "latitude": -86.6130235386188,
    "longitude": 39.1438293622282
  },
  {
    "ident": "BA",
    "class": "MHW/LOM",
    "name": "CLIFS",
    "type": 3,
    "latitude": -85.8186038765498,
    "longitude": 39.3220005463012
  },
  {
    "ident": "CFJ",
    "class": "MHW",
    "name": "CRAWFORDSVILLE",
    "type": 3,
    "latitude": -86.9157317531243,
    "longitude": 39.9809528348722
  },
  {
    "ident": "PXV",
    "class": "H-VORTACW",
    "name": "POCKET CITY",
    "type": 8,
    "latitude": -87.7623843306343,
    "longitude": 37.9283276901679
  },
  {
    "ident": "FWA",
    "class": "H-VORTACW",
    "name": "FORT WAYNE",
    "type": 8,
    "latitude": -85.1880629967126,
    "longitude": 40.9790722694564
  },
  {
    "ident": "GSH",
    "class": "H-VORTACW",
    "name": "GOSHEN",
    "type": 8,
    "latitude": -86.0279585740597,
    "longitude": 41.5251631571529
  },
  {
    "ident": "VHP",
    "class": "H-VORTACW",
    "name": "BRICKYARD",
    "type": 8,
    "latitude": -86.3674721333562,
    "longitude": 39.814735332327
  },
  {
    "ident": "UMP",
    "class": "MHW",
    "name": "METROPOLITAN",
    "type": 3,
    "latitude": -86.0502376064891,
    "longitude": 39.9377164817728
  },
  {
    "ident": "BVT",
    "class": "H-VORTACW",
    "name": "BOILER",
    "type": 8,
    "latitude": -87.0693799038726,
    "longitude": 40.5561793195105
  },
  {
    "ident": "MZZ",
    "class": "L-VORW/DME",
    "name": "MARION",
    "type": 6,
    "latitude": -85.6792550444121,
    "longitude": 40.4933382687784
  },
  {
    "ident": "MIE",
    "class": "L-VORW/DME",
    "name": "MUNCIE",
    "type": 6,
    "latitude": -85.39404160485,
    "longitude": 40.2373001804126
  },
  {
    "ident": "UWL",
    "class": "MHW",
    "name": "NEW CASTLE",
    "type": 3,
    "latitude": -85.3188557186665,
    "longitude": 39.8799731743675
  },
  {
    "ident": "GUS",
    "class": "T-VORTACW",
    "name": "GRISSOM",
    "type": 8,
    "latitude": -86.1517135306214,
    "longitude": 40.6449160490693
  },
  {
    "ident": "TTH",
    "class": "H-VORTACW",
    "name": "TERRE HAUTE",
    "type": 8,
    "latitude": -87.2490184752358,
    "longitude": 39.4889491171772
  },
  {
    "ident": "HU",
    "class": "MHW/LOM",
    "name": "YINNO",
    "type": 3,
    "latitude": -87.3976918428677,
    "longitude": 39.3878510351226
  },
  {
    "ident": "VP",
    "class": "MHW/LOM",
    "name": "SEDLY",
    "type": 3,
    "latitude": -86.8773277082048,
    "longitude": 41.451236431888
  },
  {
    "ident": "OLK",
    "class": "L-VORW",
    "name": "WEBSTER LAKE",
    "type": 7,
    "latitude": -85.4974022791266,
    "longitude": 41.2469153575903
  },
  {
    "ident": "CNU",
    "class": "L-VORW/DME",
    "name": "CHANUTE",
    "type": 6,
    "latitude": -95.5934778473964,
    "longitude": 37.6261658412476
  },
  {
    "ident": "JDM",
    "class": "MHW",
    "name": "WHEATFIELD",
    "type": 3,
    "latitude": -101.047659419665,
    "longitude": 39.5098624840796
  },
  {
    "ident": "DDC",
    "class": "L-VORTACW",
    "name": "DODGE CITY",
    "type": 8,
    "latitude": -100.00564593799,
    "longitude": 37.8505672916612
  },
  {
    "ident": "EMP",
    "class": "L-VORTACW",
    "name": "EMPORIA",
    "type": 8,
    "latitude": -96.1381247158036,
    "longitude": 38.2911498131396
  },
  {
    "ident": "FRI",
    "class": "T-VORW",
    "name": "FORT RILEY",
    "type": 7,
    "latitude": -96.8611802471451,
    "longitude": 38.9701709946975
  },
  {
    "ident": "GCK",
    "class": "H-VORTACW",
    "name": "GARDEN CITY",
    "type": 8,
    "latitude": -100.725017510745,
    "longitude": 37.919010037419
  },
  {
    "ident": "GLD",
    "class": "H-VORTACW",
    "name": "GOODLAND",
    "type": 8,
    "latitude": -101.692305953255,
    "longitude": 39.3878749237554
  },
  {
    "ident": "GL",
    "class": "MHW/LOM",
    "name": "SHUGR",
    "type": 3,
    "latitude": -101.600354253677,
    "longitude": 39.2937888047114
  },
  {
    "ident": "HYS",
    "class": "L-VORTACW",
    "name": "HAYS",
    "type": 8,
    "latitude": -99.2767997425101,
    "longitude": 38.8476633283241
  },
  {
    "ident": "HRU",
    "class": "MHW",
    "name": "HERINGTON",
    "type": 3,
    "latitude": -96.8110424291794,
    "longitude": 38.6926659520245
  },
  {
    "ident": "HLC",
    "class": "H-VORTACW",
    "name": "HILL CITY",
    "type": 8,
    "latitude": -100.225859189409,
    "longitude": 39.258753332868
  },
  {
    "ident": "HUT",
    "class": "L-VORW/DME",
    "name": "HUTCHINSON",
    "type": 6,
    "latitude": -97.9341587648531,
    "longitude": 37.9969268823597
  },
  {
    "ident": "MHK",
    "class": "T-VORW/DME",
    "name": "MANHATTAN",
    "type": 6,
    "latitude": -96.6687310482069,
    "longitude": 39.1454479789142
  },
  {
    "ident": "OEL",
    "class": "MHW",
    "name": "OAKLEY",
    "type": 3,
    "latitude": -100.815310985985,
    "longitude": 39.112531327909
  },
  {
    "ident": "OIN",
    "class": "MHW",
    "name": "OBERLIN",
    "type": 3,
    "latitude": -100.537727383515,
    "longitude": 39.8295450654632
  },
  {
    "ident": "SLN",
    "class": "H-VORTACW",
    "name": "SALINA",
    "type": 8,
    "latitude": -97.621375995623,
    "longitude": 38.9251517747235
  },
  {
    "ident": "SYF",
    "class": "MHW",
    "name": "ST FRANCIS",
    "type": 3,
    "latitude": -101.766839341848,
    "longitude": 39.728156636242
  },
  {
    "ident": "TO",
    "class": "MHW/LOM",
    "name": "BILOY",
    "type": 3,
    "latitude": -95.6870913426227,
    "longitude": 39.120372478162
  },
  {
    "ident": "FOE",
    "class": "T-TACAN",
    "name": "FORBES",
    "type": 9,
    "latitude": -95.6611946520722,
    "longitude": 38.9473793948628
  },
  {
    "ident": "TOP",
    "class": "L-VORTACW",
    "name": "TOPEKA",
    "type": 8,
    "latitude": -95.549176863722,
    "longitude": 39.137084711066
  },
  {
    "ident": "ULS",
    "class": "MHW",
    "name": "ULYSSES",
    "type": 3,
    "latitude": -101.368030414735,
    "longitude": 37.5971182811132
  },
  {
    "ident": "IAB",
    "class": "L-TACAN",
    "name": "MC CONNELL",
    "type": 9,
    "latitude": -97.2681996711267,
    "longitude": 37.6218593580122
  },
  {
    "ident": "IC",
    "class": "HW/LOM",
    "name": "PICHE",
    "type": 3,
    "latitude": -97.4558672153852,
    "longitude": 37.5782001730468
  },
  {
    "ident": "ICT",
    "class": "H-VORTACW",
    "name": "WICHITA",
    "type": 8,
    "latitude": -97.5838386522062,
    "longitude": 37.7452635267638
  },
  {
    "ident": "CVG",
    "class": "L-VORTACW",
    "name": "CINCINNATI",
    "type": 8,
    "latitude": -84.7033504675634,
    "longitude": 39.0159885968885
  },
  {
    "ident": "DVK",
    "class": "MHW",
    "name": "GOODALL",
    "type": 3,
    "latitude": -84.7640378797799,
    "longitude": 37.5764299829349
  },
  {
    "ident": "FLM",
    "class": "H-VORW/DME",
    "name": "FALMOUTH",
    "type": 6,
    "latitude": -84.3106061575708,
    "longitude": 38.6494491009762
  },
  {
    "ident": "FTK",
    "class": "T-VOR/DME",
    "name": "FORT KNOX",
    "type": 6,
    "latitude": -85.9725688124894,
    "longitude": 37.9072249926016
  },
  {
    "ident": "GOI",
    "class": "MHW",
    "name": "GODMAN",
    "type": 3,
    "latitude": -85.9766760394845,
    "longitude": 37.9587463913378
  },
  {
    "ident": "FFT",
    "class": "T-VORW",
    "name": "FRANKFORT",
    "type": 7,
    "latitude": -84.9086276885895,
    "longitude": 38.1824303725864
  },
  {
    "ident": "FK",
    "class": "HW/LOM",
    "name": "AIRBE",
    "type": 3,
    "latitude": -87.413856643573,
    "longitude": 36.7370085884492
  },
  {
    "ident": "LE",
    "class": "MHW/LOM",
    "name": "BLAYD",
    "type": 3,
    "latitude": -84.6604537124588,
    "longitude": 37.9870528458901
  },
  {
    "ident": "IIU",
    "class": "H-VORTACW",
    "name": "LOUISVILLE",
    "type": 8,
    "latitude": -85.5774409337821,
    "longitude": 38.1034714376703
  },
  {
    "ident": "MYS",
    "class": "L-VORW",
    "name": "MYSTIC",
    "type": 7,
    "latitude": -86.2445325015266,
    "longitude": 37.8940733104621
  },
  {
    "ident": "EWO",
    "class": "L-VORW/DME",
    "name": "NEW HOPE",
    "type": 6,
    "latitude": -85.6758823171335,
    "longitude": 37.6318185638525
  },
  {
    "ident": "OWB",
    "class": "T-VOR/DME",
    "name": "OWENSBORO",
    "type": 6,
    "latitude": -87.1659419234902,
    "longitude": 37.7435621274434
  },
  {
    "ident": "CDX",
    "class": "MHW",
    "name": "CUMBERLAND RIVER",
    "type": 3,
    "latitude": -84.6812130937398,
    "longitude": 36.9962640377713
  },
  {
    "ident": "YRK",
    "class": "L-VORTAC",
    "name": "YORK",
    "type": 8,
    "latitude": -82.9783435375272,
    "longitude": 38.6441405488118
  },
  {
    "ident": "BNZ",
    "class": "MHW",
    "name": "ABBEVILLE",
    "type": 3,
    "latitude": -92.1232861688235,
    "longitude": 30.0611517584059
  },
  {
    "ident": "AEX",
    "class": "H-VORTACW",
    "name": "ALEXANDRIA",
    "type": 8,
    "latitude": -92.5009816034224,
    "longitude": 31.2567344955794
  },
  {
    "ident": "BQP",
    "class": "MHW",
    "name": "BASTROP",
    "type": 3,
    "latitude": -91.8834401288162,
    "longitude": 32.754690380553
  },
  {
    "ident": "GVB",
    "class": "MHW",
    "name": "BOGALUSA",
    "type": 3,
    "latitude": -89.8621230968822,
    "longitude": 30.8816192325658
  },
  {
    "ident": "BAD",
    "class": "L-TACAN",
    "name": "BARKSDALE",
    "type": 9,
    "latitude": -93.66777614398,
    "longitude": 32.5033447032171
  },
  {
    "ident": "DXB",
    "class": "MHW",
    "name": "DE RIDDER",
    "type": 3,
    "latitude": -93.3347270770702,
    "longitude": 30.7521410281012
  },
  {
    "ident": "ECY",
    "class": "MHW",
    "name": "DURALDE",
    "type": 3,
    "latitude": -92.4480868337937,
    "longitude": 30.5598304634592
  },
  {
    "ident": "FXU",
    "class": "T-VORW",
    "name": "POLK",
    "type": 7,
    "latitude": -93.2179192858703,
    "longitude": 31.1116366613688
  },
  {
    "ident": "HRV",
    "class": "H-VORTACW",
    "name": "HARVEY",
    "type": 8,
    "latitude": -90.0029897564724,
    "longitude": 29.8502001156338
  },
  {
    "ident": "RQR",
    "class": "L-VORW/DME",
    "name": "RESERVE",
    "type": 6,
    "latitude": -90.58863103641,
    "longitude": 30.0875057040862
  },
  {
    "ident": "ROQ",
    "class": "MHW",
    "name": "RUSTON",
    "type": 3,
    "latitude": -92.5884678091896,
    "longitude": 32.6087411568283
  },
  {
    "ident": "EIC",
    "class": "H-VORTACW",
    "name": "BELCHER",
    "type": 8,
    "latitude": -93.8099359196754,
    "longitude": 32.7713705834733
  },
  {
    "ident": "EMG",
    "class": "L-VORTACW",
    "name": "ELM GROVE",
    "type": 8,
    "latitude": -93.5951538970913,
    "longitude": 32.4004113526623
  },
  {
    "ident": "CQX",
    "class": "MHW",
    "name": "NAUSET",
    "type": 3,
    "latitude": -69.9877693692639,
    "longitude": 41.6919571891298
  },
  {
    "ident": "CTR",
    "class": "L-VORW/DME",
    "name": "CHESTER",
    "type": 6,
    "latitude": -72.949395372015,
    "longitude": 42.2913272082445
  },
  {
    "ident": "GDM",
    "class": "L-VOR/DME",
    "name": "GARDNER",
    "type": 6,
    "latitude": -72.0581892626709,
    "longitude": 42.5459295088036
  },
  {
    "ident": "ACK",
    "class": "H-VOR/DME",
    "name": "NANTUCKET",
    "type": 6,
    "latitude": -70.0267104714347,
    "longitude": 41.2818957189822
  },
  {
    "ident": "LFV",
    "class": "H-VORW/DME",
    "name": "MARCONI",
    "type": 6,
    "latitude": -70.0372327359263,
    "longitude": 42.0171964174905
  },
  {
    "ident": "PVC",
    "class": "MHW",
    "name": "PROVINCETOWN",
    "type": 3,
    "latitude": -70.2234436329109,
    "longitude": 42.0688253107803
  },
  {
    "ident": "MVY",
    "class": "L-VORW/DME",
    "name": "MARTHAS VINEYARD",
    "type": 6,
    "latitude": -70.6127153907586,
    "longitude": 41.3962173906921
  },
  {
    "ident": "BAF",
    "class": "L-VORTACW",
    "name": "BARNES",
    "type": 8,
    "latitude": -72.7162005649373,
    "longitude": 42.1619677478107
  },
  {
    "ident": "BAL",
    "class": "L-VORTACW",
    "name": "BALTIMORE",
    "type": 8,
    "latitude": -76.6612583054294,
    "longitude": 39.1710714654213
  },
  {
    "ident": "FND",
    "class": "MHW",
    "name": "ELLICOTT",
    "type": 3,
    "latitude": -76.7770197377813,
    "longitude": 39.2873595404129
  },
  {
    "ident": "ADW",
    "class": "L-VORTACW",
    "name": "ANDREWS",
    "type": 8,
    "latitude": -76.8662577922503,
    "longitude": 38.8072272175011
  },
  {
    "ident": "FDK",
    "class": "T-VORW",
    "name": "FREDERICK",
    "type": 7,
    "latitude": -77.375136321387,
    "longitude": 39.4122381536645
  },
  {
    "ident": "HGR",
    "class": "L-VORW",
    "name": "HAGERSTOWN",
    "type": 7,
    "latitude": -77.8557206567081,
    "longitude": 39.6977345804884
  },
  {
    "ident": "OTT",
    "class": "L-VORTACW",
    "name": "NOTTINGHAM",
    "type": 8,
    "latitude": -76.7447480253132,
    "longitude": 38.7058785904474
  },
  {
    "ident": "NHK",
    "class": "MHW",
    "name": "PATUXENT",
    "type": 3,
    "latitude": -76.4032509503392,
    "longitude": 38.2859593511342
  },
  {
    "ident": "PXT",
    "class": "L-VORTACW",
    "name": "PATUXENT",
    "type": 8,
    "latitude": -76.400228171508,
    "longitude": 38.2878562956319
  },
  {
    "ident": "SBY",
    "class": "L-VORTACW",
    "name": "SALISBURY",
    "type": 8,
    "latitude": -75.5105851192406,
    "longitude": 38.3450068947965
  },
  {
    "ident": "SWL",
    "class": "L-VORTACW",
    "name": "SNOW HILL",
    "type": 8,
    "latitude": -75.4639028666229,
    "longitude": 38.0566018368086
  },
  {
    "ident": "EMI",
    "class": "H-VORTAC",
    "name": "WESTMINSTER",
    "type": 8,
    "latitude": -76.9785742577922,
    "longitude": 39.4950154072417
  },
  {
    "ident": "AUG",
    "class": "L-VOR/DME",
    "name": "AUGUSTA",
    "type": 6,
    "latitude": -69.7965647313807,
    "longitude": 44.3200293545638
  },
  {
    "ident": "BGR",
    "class": "H-VORTACW",
    "name": "BANGOR",
    "type": 8,
    "latitude": -68.873965285141,
    "longitude": 44.8418041982653
  },
  {
    "ident": "ENE",
    "class": "H-VORW/DME",
    "name": "KENNEBUNK",
    "type": 6,
    "latitude": -70.6135260625339,
    "longitude": 43.4256811093584
  },
  {
    "ident": "MLT",
    "class": "H-VOR/DME",
    "name": "MILLINOCKET",
    "type": 6,
    "latitude": -68.5154629851096,
    "longitude": 45.5867185074362
  },
  {
    "ident": "LNT",
    "class": "H",
    "name": "MILNOT",
    "type": 3,
    "latitude": -68.5503332777167,
    "longitude": 45.6485974062196
  },
  {
    "ident": "BUP",
    "class": "MHW",
    "name": "BURNHAM",
    "type": 3,
    "latitude": -69.3585923845118,
    "longitude": 44.6977274909609
  },
  {
    "ident": "PH",
    "class": "HW",
    "name": "PORTLAND LHB-P",
    "type": 3,
    "latitude": -70.0914345059181,
    "longitude": 43.527039755511
  },
  {
    "ident": "PQI",
    "class": "H-VORW/DME",
    "name": "PRESQUE ISLE",
    "type": 6,
    "latitude": -68.0945470779817,
    "longitude": 46.774195112691
  },
  {
    "ident": "ADG",
    "class": "MHW",
    "name": "ADRIAN",
    "type": 3,
    "latitude": -84.0774852419812,
    "longitude": 41.8699891521975
  },
  {
    "ident": "APN",
    "class": "L-VORTAC",
    "name": "ALPENA",
    "type": 8,
    "latitude": -83.5570084574408,
    "longitude": 45.0827872268137
  },
  {
    "ident": "BT",
    "class": "MHW/LOM",
    "name": "BATOL",
    "type": 3,
    "latitude": -85.1845050674942,
    "longitude": 42.3620202920767
  },
  {
    "ident": "DXO",
    "class": "H-VORW/DME",
    "name": "DETROIT",
    "type": 6,
    "latitude": -83.3666678333996,
    "longitude": 42.2131448049988
  },
  {
    "ident": "RYS",
    "class": "MHW",
    "name": "GROSSE ILE",
    "type": 3,
    "latitude": -83.1529816467968,
    "longitude": 42.1011314618112
  },
  {
    "ident": "ESC",
    "class": "L-VORW/DME",
    "name": "ESCANABA",
    "type": 6,
    "latitude": -87.089604351824,
    "longitude": 45.7226437891668
  },
  {
    "ident": "FNT",
    "class": "H-VORTACW",
    "name": "FLINT",
    "type": 8,
    "latitude": -83.746972187733,
    "longitude": 42.9667804724271
  },
  {
    "ident": "GLR",
    "class": "L-VORW/DME",
    "name": "GAYLORD",
    "type": 6,
    "latitude": -84.7042838082171,
    "longitude": 45.0124943733404
  },
  {
    "ident": "CGG",
    "class": "T-VORW",
    "name": "GRAYLING",
    "type": 7,
    "latitude": -84.7286021118223,
    "longitude": 44.6814265412689
  },
  {
    "ident": "GYG",
    "class": "MHW",
    "name": "GRAYLING",
    "type": 3,
    "latitude": -84.8282257622919,
    "longitude": 44.749965712808
  },
  {
    "ident": "CMX",
    "class": "L-VORW/DME",
    "name": "HOUGHTON",
    "type": 6,
    "latitude": -88.4854008089079,
    "longitude": 47.1702675268471
  },
  {
    "ident": "IMT",
    "class": "L-VORW/DME",
    "name": "IRON MOUNTAIN",
    "type": 6,
    "latitude": -88.1121477321981,
    "longitude": 45.8160515174618
  },
  {
    "ident": "ELX",
    "class": "L-VORW/DME",
    "name": "KEELER",
    "type": 6,
    "latitude": -86.1227111615343,
    "longitude": 42.1444204821121
  },
  {
    "ident": "SAW",
    "class": "H-VORW/DME",
    "name": "SAWYER",
    "type": 6,
    "latitude": -87.3974303624438,
    "longitude": 46.358929977775
  },
  {
    "ident": "MTC",
    "class": "L-TACAN",
    "name": "SELFRIDGE",
    "type": 9,
    "latitude": -82.8317754835384,
    "longitude": 42.6128965684565
  },
  {
    "ident": "MOP",
    "class": "L-VORW/DME",
    "name": "MOUNT PLEASANT",
    "type": 6,
    "latitude": -84.7372703353499,
    "longitude": 43.6228344205208
  },
  {
    "ident": "GIJ",
    "class": "H-VORTACW",
    "name": "GIPPER",
    "type": 8,
    "latitude": -86.3184559066497,
    "longitude": 41.7686198503281
  },
  {
    "ident": "PLN",
    "class": "L-VORTACW",
    "name": "PELLSTON",
    "type": 8,
    "latitude": -84.6641138666925,
    "longitude": 45.6306553084886
  },
  {
    "ident": "PMM",
    "class": "H-VORW/DME",
    "name": "PULLMAN",
    "type": 6,
    "latitude": -86.1048153548784,
    "longitude": 42.4660449824503
  },
  {
    "ident": "MBS",
    "class": "L-VORW/DME",
    "name": "SAGINAW",
    "type": 6,
    "latitude": -84.0773040121366,
    "longitude": 43.5316616627509
  },
  {
    "ident": "SVM",
    "class": "L-VORTACW",
    "name": "SALEM",
    "type": 8,
    "latitude": -83.5939065319621,
    "longitude": 42.4086451049939
  },
  {
    "ident": "CI",
    "class": "MH/LOM",
    "name": "KOLOE",
    "type": 3,
    "latitude": -84.542471412293,
    "longitude": 46.3325301475864
  },
  {
    "ident": "SSM",
    "class": "H-VOR/DME",
    "name": "SAULT STE MARIE",
    "type": 6,
    "latitude": -84.3148769060129,
    "longitude": 46.4121190622137
  },
  {
    "ident": "IRS",
    "class": "MHW",
    "name": "STURGIS",
    "type": 3,
    "latitude": -85.4337903683182,
    "longitude": 41.813151572094
  },
  {
    "ident": "TV",
    "class": "MHW/LOM",
    "name": "GWENN",
    "type": 3,
    "latitude": -85.429050668252,
    "longitude": 44.7345615100919
  },
  {
    "ident": "TVC",
    "class": "H-VORW/DME",
    "name": "TRAVERSE CITY",
    "type": 6,
    "latitude": -85.5500206979826,
    "longitude": 44.6679234363687
  },
  {
    "ident": "AEL",
    "class": "T-VORW/DME",
    "name": "ALBERT LEA",
    "type": 6,
    "latitude": -93.3707626092839,
    "longitude": 43.681742793594
  },
  {
    "ident": "AXN",
    "class": "L-VORW/DME",
    "name": "ALEXANDRIA",
    "type": 6,
    "latitude": -95.2326431738313,
    "longitude": 45.9583963231846
  },
  {
    "ident": "IDJ",
    "class": "T-VORW/DME",
    "name": "LAKE BEMIDJI",
    "type": 6,
    "latitude": -94.9233197239851,
    "longitude": 47.5078498878056
  },
  {
    "ident": "FOZ",
    "class": "MHW",
    "name": "BIGFORK",
    "type": 3,
    "latitude": -93.6532482905407,
    "longitude": 47.7834711323897
  },
  {
    "ident": "DWN",
    "class": "L-VORTACW",
    "name": "DARWIN",
    "type": 8,
    "latitude": -94.4538578257277,
    "longitude": 45.0874704253186
  },
  {
    "ident": "DTL",
    "class": "T-VORW/DME",
    "name": "DETROIT LAKES",
    "type": 6,
    "latitude": -95.887345995897,
    "longitude": 46.8255513898183
  },
  {
    "ident": "DLH",
    "class": "H-VORTACW",
    "name": "DULUTH",
    "type": 8,
    "latitude": -92.2028768746363,
    "longitude": 46.8021722175225
  },
  {
    "ident": "LKI",
    "class": "H-TACAN",
    "name": "LAKESIDE",
    "type": 9,
    "latitude": -92.1859332649929,
    "longitude": 46.8438594465439
  },
  {
    "ident": "DL",
    "class": "MHW/LOM",
    "name": "PYKLA",
    "type": 3,
    "latitude": -92.3549452590696,
    "longitude": 46.8457272126438
  },
  {
    "ident": "FGT",
    "class": "H-VORTAC",
    "name": "FARMINGTON",
    "type": 8,
    "latitude": -93.1820554580768,
    "longitude": 44.6309598922648
  },
  {
    "ident": "FFM",
    "class": "T-VORW/DME",
    "name": "FERGUS FALLS",
    "type": 6,
    "latitude": -96.1568198737345,
    "longitude": 46.2893599090735
  },
  {
    "ident": "CKC",
    "class": "MHW",
    "name": "COOK COUNTY",
    "type": 3,
    "latitude": -90.3855864905377,
    "longitude": 47.8400622130009
  },
  {
    "ident": "GPZ",
    "class": "L-VORW/DME",
    "name": "GRAND RAPIDS",
    "type": 6,
    "latitude": -93.4889406410107,
    "longitude": 47.1634524510469
  },
  {
    "ident": "HIB",
    "class": "L-VORW/DME",
    "name": "HIBBING",
    "type": 6,
    "latitude": -92.7040526549884,
    "longitude": 47.3015372498521
  },
  {
    "ident": "XCR",
    "class": "MHW",
    "name": "RIPLEY",
    "type": 3,
    "latitude": -94.3434743292989,
    "longitude": 46.07920362862
  },
  {
    "ident": "MKT",
    "class": "L-VORW/DME",
    "name": "MANKATO",
    "type": 6,
    "latitude": -93.9123644987598,
    "longitude": 44.2199139483422
  },
  {
    "ident": "MML",
    "class": "T-VORW/DME",
    "name": "MARSHALL",
    "type": 6,
    "latitude": -95.8247703392882,
    "longitude": 44.448419957883
  },
  {
    "ident": "FCM",
    "class": "L-VORW/DME",
    "name": "FLYING CLOUD",
    "type": 6,
    "latitude": -93.4426961137207,
    "longitude": 44.8253582367787
  },
  {
    "ident": "GEP",
    "class": "H-VORTACW",
    "name": "GOPHER",
    "type": 8,
    "latitude": -93.3731886383013,
    "longitude": 45.1456930101934
  },
  {
    "ident": "MSP",
    "class": "L-VORW/DME",
    "name": "MINNEAPOLIS",
    "type": 6,
    "latitude": -93.2365452317388,
    "longitude": 44.8965082614869
  },
  {
    "ident": "MVE",
    "class": "T-VORW/DME",
    "name": "MONTEVIDEO",
    "type": 6,
    "latitude": -95.7122012169132,
    "longitude": 44.9726836511639
  },
  {
    "ident": "MOX",
    "class": "T-VORW/DME",
    "name": "MORRIS",
    "type": 6,
    "latitude": -95.9693455420473,
    "longitude": 45.5654134373825
  },
  {
    "ident": "FOW",
    "class": "T-VORW/DME",
    "name": "HALFWAY",
    "type": 6,
    "latitude": -93.3705121207991,
    "longitude": 44.2044400941391
  },
  {
    "ident": "ODI",
    "class": "H-VORTACW",
    "name": "NODINE",
    "type": 8,
    "latitude": -91.4675251515975,
    "longitude": 43.9123368432601
  },
  {
    "ident": "RWF",
    "class": "H-VORW/DME",
    "name": "REDWOOD FALLS",
    "type": 6,
    "latitude": -95.1282382052828,
    "longitude": 44.4672813993819
  },
  {
    "ident": "RST",
    "class": "L-VORW/DME",
    "name": "ROCHESTER",
    "type": 6,
    "latitude": -92.5969674030014,
    "longitude": 43.7829106384491
  },
  {
    "ident": "ROX",
    "class": "L-VORW/DME",
    "name": "ROSEAU",
    "type": 6,
    "latitude": -95.6949837970217,
    "longitude": 48.8547649968052
  },
  {
    "ident": "STC",
    "class": "T-VORW/DME",
    "name": "ST CLOUD",
    "type": 6,
    "latitude": -94.0586077803595,
    "longitude": 45.5493149632451
  },
  {
    "ident": "TVF",
    "class": "L-VOR/DME",
    "name": "THIEF RIVER FALLS",
    "type": 6,
    "latitude": -96.1864835162392,
    "longitude": 48.0693209707424
  },
  {
    "ident": "BDH",
    "class": "T-VORW/DME",
    "name": "WILLMAR",
    "type": 6,
    "latitude": -95.1270694080366,
    "longitude": 45.1176781591278
  },
  {
    "ident": "BQS",
    "class": "L-VORW/DME",
    "name": "BRAYMER",
    "type": 6,
    "latitude": -93.8752850737449,
    "longitude": 39.6305626698034
  },
  {
    "ident": "BUM",
    "class": "H-VORTAC",
    "name": "BUTLER",
    "type": 8,
    "latitude": -94.4882684447143,
    "longitude": 38.2720862910822
  },
  {
    "ident": "COU",
    "class": "L-VORW/DME",
    "name": "COLUMBIA",
    "type": 6,
    "latitude": -92.2182806553735,
    "longitude": 38.8108303993193
  },
  {
    "ident": "DGD",
    "class": "L-VORTAC",
    "name": "DOGWOOD",
    "type": 8,
    "latitude": -92.8769295731398,
    "longitude": 37.0234758786008
  },
  {
    "ident": "FAM",
    "class": "H-VORTAC",
    "name": "FARMINGTON",
    "type": 8,
    "latitude": -90.2340658426203,
    "longitude": 37.6734683539257
  },
  {
    "ident": "FTZ",
    "class": "L-VORTACW",
    "name": "FORISTELL",
    "type": 8,
    "latitude": -90.9711650217948,
    "longitude": 38.6943346128633
  },
  {
    "ident": "TBN",
    "class": "L-VORW",
    "name": "FORNEY",
    "type": 7,
    "latitude": -92.1390066527595,
    "longitude": 37.7424513241128
  },
  {
    "ident": "HLV",
    "class": "L-VORTAC",
    "name": "HALLSVILLE",
    "type": 8,
    "latitude": -92.1282406578694,
    "longitude": 39.1135479573264
  },
  {
    "ident": "JE",
    "class": "MHW",
    "name": "ALGOA",
    "type": 3,
    "latitude": -92.0720011468966,
    "longitude": 38.548001471855
  },
  {
    "ident": "SHY",
    "class": "L-VORW/DME",
    "name": "SUNSHINE",
    "type": 6,
    "latitude": -92.6024173603864,
    "longitude": 38.0406280201986
  },
  {
    "ident": "MCI",
    "class": "H-VORTACW",
    "name": "KANSAS CITY",
    "type": 8,
    "latitude": -94.7370713836241,
    "longitude": 39.2852903384547
  },
  {
    "ident": "IRK",
    "class": "H-VORTACW",
    "name": "KIRKSVILLE",
    "type": 8,
    "latitude": -92.5917217156867,
    "longitude": 40.1350250516767
  },
  {
    "ident": "SZL",
    "class": "L-TACAN",
    "name": "WHITEMAN",
    "type": 9,
    "latitude": -93.5504349013011,
    "longitude": 38.735706979572
  },
  {
    "ident": "ANX",
    "class": "L-VORTACW",
    "name": "NAPOLEON",
    "type": 8,
    "latitude": -94.1288420349792,
    "longitude": 39.095430897564
  },
  {
    "ident": "VIH",
    "class": "L-VORW/DME",
    "name": "VICHY",
    "type": 6,
    "latitude": -91.7067785124684,
    "longitude": 38.1540789209707
  },
  {
    "ident": "SGF",
    "class": "H-VORTACW",
    "name": "SPRINGFIELD",
    "type": 8,
    "latitude": -93.3340480564016,
    "longitude": 37.3559550810425
  },
  {
    "ident": "AZN",
    "class": "MHW",
    "name": "AMAZON",
    "type": 3,
    "latitude": -94.908159543718,
    "longitude": 39.8838254278762
  },
  {
    "ident": "STJ",
    "class": "H-VORTACW",
    "name": "ST JOSEPH",
    "type": 8,
    "latitude": -94.9252278900875,
    "longitude": 39.9605846064871
  },
  {
    "ident": "STL",
    "class": "H-VORTACW",
    "name": "ST LOUIS",
    "type": 8,
    "latitude": -90.4823743445695,
    "longitude": 38.8606960576181
  },
  {
    "ident": "MDY",
    "class": "HW",
    "name": "MIDWAY",
    "type": 3,
    "latitude": -177.37920713731,
    "longitude": 28.2041414596419
  },
  {
    "ident": "HS",
    "class": "MHW",
    "name": "HANCO",
    "type": 3,
    "latitude": -89.4555204662665,
    "longitude": 30.4513455424762
  },
  {
    "ident": "BIX",
    "class": "T-TACAN",
    "name": "KEESLER",
    "type": 9,
    "latitude": -88.9297164311041,
    "longitude": 30.4070916612763
  },
  {
    "ident": "IGB",
    "class": "L-VORTACW",
    "name": "BIGBEE",
    "type": 8,
    "latitude": -88.5135953590863,
    "longitude": 33.4854934425434
  },
  {
    "ident": "CBM",
    "class": "L-VORTACW",
    "name": "CALEDONIA",
    "type": 8,
    "latitude": -88.4385775690288,
    "longitude": 33.6415395887771
  },
  {
    "ident": "GLH",
    "class": "L-VOR/DME",
    "name": "GREENVILLE",
    "type": 6,
    "latitude": -90.9829435408004,
    "longitude": 33.5235369613329
  },
  {
    "ident": "MTQ",
    "class": "MHW",
    "name": "METCALF",
    "type": 3,
    "latitude": -90.9821099238056,
    "longitude": 33.4253444415905
  },
  {
    "ident": "GPT",
    "class": "L-VORTAC",
    "name": "GULFPORT",
    "type": 8,
    "latitude": -89.0767834164987,
    "longitude": 30.4068388783623
  },
  {
    "ident": "LBY",
    "class": "L-VORTACW",
    "name": "EATON",
    "type": 8,
    "latitude": -89.3376074227815,
    "longitude": 31.4186885329156
  },
  {
    "ident": "HLI",
    "class": "L-VORTACW",
    "name": "HOLLY SPRINGS",
    "type": 8,
    "latitude": -89.4965245980277,
    "longitude": 34.7702519969183
  },
  {
    "ident": "JH",
    "class": "MHW/LOM",
    "name": "BRENZ",
    "type": 3,
    "latitude": -90.2612899490177,
    "longitude": 32.4130378741723
  },
  {
    "ident": "MHZ",
    "class": "H-VORTACW",
    "name": "MAGNOLIA",
    "type": 8,
    "latitude": -90.0997779610374,
    "longitude": 32.4340753847244
  },
  {
    "ident": "MC",
    "class": "MHW/LOM",
    "name": "FERNI",
    "type": 3,
    "latitude": -90.5104385689148,
    "longitude": 31.2545426222402
  },
  {
    "ident": "MCB",
    "class": "H-VORTAC",
    "name": "MC COMB",
    "type": 8,
    "latitude": -90.2582087808224,
    "longitude": 31.3044584758209
  },
  {
    "ident": "MEI",
    "class": "H-VORTAC",
    "name": "MERIDIAN",
    "type": 8,
    "latitude": -88.8042717688547,
    "longitude": 32.3784459780695
  },
  {
    "ident": "NMM",
    "class": "L-TACAN",
    "name": "MERIDIAN",
    "type": 9,
    "latitude": -88.5452353185039,
    "longitude": 32.5783443629155
  },
  {
    "ident": "HEZ",
    "class": "L-VOR/DME",
    "name": "NATCHEZ",
    "type": 6,
    "latitude": -91.2996454662205,
    "longitude": 31.6181990588565
  },
  {
    "ident": "HAH",
    "class": "MHW",
    "name": "NATCHEZ-ADAMS COUNTY",
    "type": 3,
    "latitude": -91.2933124131666,
    "longitude": 31.6902260190768
  },
  {
    "ident": "PCU",
    "class": "L-VORW/DME",
    "name": "PICAYUNE",
    "type": 6,
    "latitude": -89.7304936023153,
    "longitude": 30.5611716680515
  },
  {
    "ident": "SQS",
    "class": "H-VORTAC",
    "name": "SIDON",
    "type": 8,
    "latitude": -90.2773564008524,
    "longitude": 33.4638555892431
  },
  {
    "ident": "OTB",
    "class": "L-VORW/DME",
    "name": "TUPELO",
    "type": 6,
    "latitude": -88.7973388140599,
    "longitude": 34.2238674714781
  },
  {
    "ident": "BIL",
    "class": "H-VORTACW",
    "name": "BILLINGS",
    "type": 8,
    "latitude": -108.624659343393,
    "longitude": 45.8085660242124
  },
  {
    "ident": "BZN",
    "class": "H-VORW/DME",
    "name": "BOZEMAN",
    "type": 6,
    "latitude": -111.155467396822,
    "longitude": 45.7839055096873
  },
  {
    "ident": "CPN",
    "class": "L-VORW/DME",
    "name": "COPPERTOWN",
    "type": 6,
    "latitude": -112.747540559066,
    "longitude": 46.032006492416
  },
  {
    "ident": "DLN",
    "class": "H-VORW/DME",
    "name": "DILLON",
    "type": 6,
    "latitude": -112.547142310586,
    "longitude": 45.2485803289654
  },
  {
    "ident": "GGW",
    "class": "H-VORW/DME",
    "name": "GLASGOW",
    "type": 6,
    "latitude": -106.625431024134,
    "longitude": 48.2153117309366
  },
  {
    "ident": "GTF",
    "class": "H-VORTACW",
    "name": "GREAT FALLS",
    "type": 8,
    "latitude": -111.412177512849,
    "longitude": 47.4499867487724
  },
  {
    "ident": "HVR",
    "class": "L-VORW/DME",
    "name": "HAVRE",
    "type": 6,
    "latitude": -109.769999611274,
    "longitude": 48.5404686761148
  },
  {
    "ident": "HAU",
    "class": "MHW",
    "name": "HAUSER",
    "type": 3,
    "latitude": -111.758073513768,
    "longitude": 46.5689024691839
  },
  {
    "ident": "HLN",
    "class": "H-VORTACW",
    "name": "HELENA",
    "type": 8,
    "latitude": -111.953488008107,
    "longitude": 46.606827453653
  },
  {
    "ident": "FCA",
    "class": "H-VORW/DME",
    "name": "KALISPELL",
    "type": 6,
    "latitude": -114.175904378667,
    "longitude": 48.2141090306772
  },
  {
    "ident": "SAK",
    "class": "MHW",
    "name": "SMITH LAKE",
    "type": 3,
    "latitude": -114.461258023256,
    "longitude": 48.1082942707891
  },
  {
    "ident": "LWT",
    "class": "H-VORW/DME",
    "name": "LEWISTOWN",
    "type": 6,
    "latitude": -109.606180364393,
    "longitude": 47.0529768885154
  },
  {
    "ident": "HIA",
    "class": "H-VORW/DME",
    "name": "WHITEHALL",
    "type": 6,
    "latitude": -112.169621238066,
    "longitude": 45.8617940322305
  },
  {
    "ident": "VU",
    "class": "LOMW",
    "name": "ALLER",
    "type": 3,
    "latitude": -80.0834163618728,
    "longitude": 35.4891705759367
  },
  {
    "ident": "BRA",
    "class": "HW",
    "name": "BROAD RIVER",
    "type": 3,
    "latitude": -82.4710406711312,
    "longitude": 35.2727584972271
  },
  {
    "ident": "SUG",
    "class": "L-VORTACW",
    "name": "SUGARLOAF MOUNTAIN",
    "type": 8,
    "latitude": -82.2686178419772,
    "longitude": 35.4065132551176
  },
  {
    "ident": "HB",
    "class": "MHW/LOM",
    "name": "ALAMM",
    "type": 3,
    "latitude": -79.5848317946226,
    "longitude": 35.978131531073
  },
  {
    "ident": "CLT",
    "class": "L-VORW/DME",
    "name": "CHARLOTTE",
    "type": 6,
    "latitude": -80.9517566052392,
    "longitude": 35.1902954805
  },
  {
    "ident": "NKT",
    "class": "L-TACAN",
    "name": "CHERRY POINT",
    "type": 9,
    "latitude": -76.8747950845057,
    "longitude": 34.9022675036388
  },
  {
    "ident": "RNW",
    "class": "MHW",
    "name": "CHOCOWINITY",
    "type": 3,
    "latitude": -77.1066257398693,
    "longitude": 35.509662072963
  },
  {
    "ident": "CTZ",
    "class": "MHW",
    "name": "CLINTON",
    "type": 3,
    "latitude": -78.3619324835706,
    "longitude": 34.975109414319
  },
  {
    "ident": "HQT",
    "class": "MHW",
    "name": "HARNETT",
    "type": 3,
    "latitude": -78.6747537125256,
    "longitude": 35.4330070029142
  },
  {
    "ident": "CVI",
    "class": "L-VORTACW",
    "name": "COFIELD",
    "type": 8,
    "latitude": -76.8715468229862,
    "longitude": 36.3729211559561
  },
  {
    "ident": "ECG",
    "class": "L-VORW/DME",
    "name": "ELIZABETH CITY",
    "type": 6,
    "latitude": -76.1756032700729,
    "longitude": 36.257581987701
  },
  {
    "ident": "LLW",
    "class": "MHW",
    "name": "WOODVILLE",
    "type": 3,
    "latitude": -76.2980352520362,
    "longitude": 36.2630039297826
  },
  {
    "ident": "FAY",
    "class": "L-VORW/DME",
    "name": "FAYETTEVILLE",
    "type": 6,
    "latitude": -78.875066528041,
    "longitude": 34.9855580100784
  },
  {
    "ident": "POB",
    "class": "H-TACAN",
    "name": "POPE",
    "type": 9,
    "latitude": -79.019574913967,
    "longitude": 35.1684291557536
  },
  {
    "ident": "GHJ",
    "class": "MHW",
    "name": "STONIA",
    "type": 3,
    "latitude": -81.1578588896557,
    "longitude": 35.1914776951889
  },
  {
    "ident": "GSB",
    "class": "L-TACAN",
    "name": "SEYMOUR JOHNSON",
    "type": 9,
    "latitude": -77.9713134943389,
    "longitude": 35.3352042279449
  },
  {
    "ident": "GSO",
    "class": "H-VORTAC",
    "name": "GREENSBORO",
    "type": 8,
    "latitude": -79.9763783053619,
    "longitude": 36.0456990310017
  },
  {
    "ident": "AQE",
    "class": "MHW",
    "name": "ALWOOD",
    "type": 3,
    "latitude": -77.3718897197713,
    "longitude": 35.7069004397972
  },
  {
    "ident": "BZM",
    "class": "H-VOR/DME",
    "name": "BARRETTS MOUNTAIN",
    "type": 6,
    "latitude": -81.2405322851516,
    "longitude": 35.8688608914463
  },
  {
    "ident": "HK",
    "class": "MHW/LOM",
    "name": "TAWBA",
    "type": 3,
    "latitude": -81.3053147997629,
    "longitude": 35.7865300386888
  },
  {
    "ident": "NCA",
    "class": "T-TACAN",
    "name": "NEW RIVER",
    "type": 9,
    "latitude": -77.4403021911918,
    "longitude": 34.7071485532102
  },
  {
    "ident": "ISO",
    "class": "L-VORTAC",
    "name": "KINSTON",
    "type": 8,
    "latitude": -77.5583369816143,
    "longitude": 35.3709631386777
  },
  {
    "ident": "LIB",
    "class": "L-VORTAC",
    "name": "LIBERTY",
    "type": 8,
    "latitude": -79.6125948488537,
    "longitude": 35.8116284397095
  },
  {
    "ident": "JB",
    "class": "MHW/LOM",
    "name": "JIGEL",
    "type": 3,
    "latitude": -79.1385163072494,
    "longitude": 34.5458262380965
  },
  {
    "ident": "MQI",
    "class": "MHW",
    "name": "MANTEO",
    "type": 3,
    "latitude": -75.695066160001,
    "longitude": 35.9153430405322
  },
  {
    "ident": "RBX",
    "class": "T-VORW/DME",
    "name": "WRIGHT BROTHERS",
    "type": 6,
    "latitude": -75.6969386608309,
    "longitude": 35.920508041593
  },
  {
    "ident": "ME",
    "class": "MHW/LOM",
    "name": "MAXTN",
    "type": 3,
    "latitude": -79.4437091863,
    "longitude": 34.7331832135563
  },
  {
    "ident": "FIQ",
    "class": "MHW",
    "name": "FIDDLERS",
    "type": 3,
    "latitude": -81.6713696263366,
    "longitude": 35.7102175087498
  },
  {
    "ident": "EWN",
    "class": "L-VOR/DME",
    "name": "NEW BERN",
    "type": 6,
    "latitude": -77.0450670886199,
    "longitude": 35.0731483686683
  },
  {
    "ident": "HXO",
    "class": "MHW",
    "name": "HUNTSBORO",
    "type": 3,
    "latitude": -78.6185084638032,
    "longitude": 36.3012169124965
  },
  {
    "ident": "RDU",
    "class": "H-VORTACW",
    "name": "RALEIGH/DURHAM",
    "type": 8,
    "latitude": -78.7833448795891,
    "longitude": 35.8725282044327
  },
  {
    "ident": "SIF",
    "class": "MHW",
    "name": "SLAMMER",
    "type": 3,
    "latitude": -79.762784092935,
    "longitude": 36.3817124436498
  },
  {
    "ident": "TYI",
    "class": "L-VORTAC",
    "name": "TAR RIVER",
    "type": 8,
    "latitude": -77.703734001926,
    "longitude": 35.976730764545
  },
  {
    "ident": "HUR",
    "class": "MHW/LOM",
    "name": "PERSON",
    "type": 3,
    "latitude": -79.0659047068294,
    "longitude": 36.2332982709745
  },
  {
    "ident": "SLP",
    "class": "MHW",
    "name": "FIRST RIVER",
    "type": 3,
    "latitude": -81.5988006900141,
    "longitude": 35.2526846368746
  },
  {
    "ident": "JN",
    "class": "MHW/LOM",
    "name": "JURLY",
    "type": 3,
    "latitude": -78.4252958611808,
    "longitude": 35.4750125766356
  },
  {
    "ident": "SDZ",
    "class": "L-VORTACW",
    "name": "SANDHILLS",
    "type": 8,
    "latitude": -79.5879398095044,
    "longitude": 35.2154877569832
  },
  {
    "ident": "CPC",
    "class": "MHW",
    "name": "CAMP",
    "type": 3,
    "latitude": -78.7119794986607,
    "longitude": 34.2732298044848
  },
  {
    "ident": "ILM",
    "class": "H-VORTAC",
    "name": "WILMINGTON",
    "type": 8,
    "latitude": -77.8743811947644,
    "longitude": 34.3516609604329
  },
  {
    "ident": "BIS",
    "class": "L-VORW/DME",
    "name": "BISMARCK",
    "type": 6,
    "latitude": -100.665417288175,
    "longitude": 46.7617687738988
  },
  {
    "ident": "DVL",
    "class": "L-VORW/DME",
    "name": "DEVILS LAKE",
    "type": 6,
    "latitude": -98.9125181762551,
    "longitude": 48.1152257508892
  },
  {
    "ident": "DIK",
    "class": "H-VORTACW",
    "name": "DICKINSON",
    "type": 8,
    "latitude": -102.773511186212,
    "longitude": 46.8599919380963
  },
  {
    "ident": "AA",
    "class": "HW/LOM",
    "name": "KENIE",
    "type": 3,
    "latitude": -96.8151901757297,
    "longitude": 47.0090605080399
  },
  {
    "ident": "GFK",
    "class": "H-VORW/DME",
    "name": "GRAND FORKS",
    "type": 6,
    "latitude": -97.1853796120624,
    "longitude": 47.9548394863882
  },
  {
    "ident": "RDR",
    "class": "H-TACAN",
    "name": "RED RIVER",
    "type": 9,
    "latitude": -97.4060288403104,
    "longitude": 47.9570664125646
  },
  {
    "ident": "JMS",
    "class": "L-VORW/DME",
    "name": "JAMESTOWN",
    "type": 6,
    "latitude": -98.6787792868509,
    "longitude": 46.9328795154934
  },
  {
    "ident": "MIB",
    "class": "H-TACAN",
    "name": "DEERING",
    "type": 9,
    "latitude": -101.366130008292,
    "longitude": 48.4153994611368
  },
  {
    "ident": "ISN",
    "class": "L-VORW/DME",
    "name": "WILLISTON",
    "type": 6,
    "latitude": -103.75084448454,
    "longitude": 48.2533408935665
  },
  {
    "ident": "ANW",
    "class": "L-VORW/DME",
    "name": "AINSWORTH",
    "type": 6,
    "latitude": -99.9896892444187,
    "longitude": 42.5691177246792
  },
  {
    "ident": "AIA",
    "class": "L-VORW/DME",
    "name": "ALLIANCE",
    "type": 6,
    "latitude": -102.804450434943,
    "longitude": 42.0556382807116
  },
  {
    "ident": "CUZ",
    "class": "L-VORW/DME",
    "name": "CUSTER COUNTY",
    "type": 6,
    "latitude": -99.6890687514374,
    "longitude": 41.4839845347054
  },
  {
    "ident": "TST",
    "class": "L-VOR/DME",
    "name": "TOADSTOOL",
    "type": 6,
    "latitude": -103.312156459926,
    "longitude": 42.5587783095675
  },
  {
    "ident": "HIN",
    "class": "MHW",
    "name": "WHITNEY",
    "type": 3,
    "latitude": -103.093753944659,
    "longitude": 42.8288416946342
  },
  {
    "ident": "CNP",
    "class": "MHW",
    "name": "CHAPPELL",
    "type": 3,
    "latitude": -102.45889189092,
    "longitude": 41.0766623383176
  },
  {
    "ident": "OLU",
    "class": "L-VORW/DME",
    "name": "COLUMBUS",
    "type": 6,
    "latitude": -97.3408281393938,
    "longitude": 41.4500388560986
  },
  {
    "ident": "PLT",
    "class": "HW",
    "name": "PLATTE CENTER",
    "type": 3,
    "latitude": -97.3817878776517,
    "longitude": 41.4965699714354
  },
  {
    "ident": "OZB",
    "class": "T-VORW",
    "name": "COZAD",
    "type": 7,
    "latitude": -100.003772091497,
    "longitude": 40.8703530341361
  },
  {
    "ident": "FBY",
    "class": "MHW",
    "name": "FAIRBURY",
    "type": 3,
    "latitude": -97.1658326724027,
    "longitude": 40.1766797811007
  },
  {
    "ident": "FMZ",
    "class": "MHW",
    "name": "BEKLOF",
    "type": 3,
    "latitude": -97.5680592115322,
    "longitude": 40.5899528750991
  },
  {
    "ident": "GRN",
    "class": "MHW",
    "name": "GORDON",
    "type": 3,
    "latitude": -102.17940371601,
    "longitude": 42.8010892604843
  },
  {
    "ident": "GGF",
    "class": "MHW",
    "name": "GRANT",
    "type": 3,
    "latitude": -101.730459465623,
    "longitude": 40.8709473604599
  },
  {
    "ident": "HSI",
    "class": "L-VORW/DME",
    "name": "HASTINGS",
    "type": 6,
    "latitude": -98.4296261034436,
    "longitude": 40.6045442102635
  },
  {
    "ident": "HCT",
    "class": "H-VORTAC",
    "name": "HAYES CENTER",
    "type": 8,
    "latitude": -100.923582549994,
    "longitude": 40.4540676325265
  },
  {
    "ident": "OI",
    "class": "MHW/LOM",
    "name": "TOMMI",
    "type": 3,
    "latitude": -96.4622321950111,
    "longitude": 42.4601143446809
  },
  {
    "ident": "EAR",
    "class": "L-VORW",
    "name": "KEARNEY",
    "type": 7,
    "latitude": -99.0051340429564,
    "longitude": 40.7256108576472
  },
  {
    "ident": "LNK",
    "class": "H-VORTACW",
    "name": "LINCOLN",
    "type": 8,
    "latitude": -96.7420179210527,
    "longitude": 40.9238010363688
  },
  {
    "ident": "LN",
    "class": "MHW/LOM",
    "name": "POTTS",
    "type": 3,
    "latitude": -96.7624373517366,
    "longitude": 40.7471935074765
  },
  {
    "ident": "MCK",
    "class": "H-VORW/DME",
    "name": "MC COOK",
    "type": 6,
    "latitude": -100.59423382843,
    "longitude": 40.2038045626873
  },
  {
    "ident": "AFK",
    "class": "MHW",
    "name": "NEBRASKA CITY",
    "type": 3,
    "latitude": -95.8609629301255,
    "longitude": 40.6053668753108
  },
  {
    "ident": "OFK",
    "class": "L-VORW/DME",
    "name": "NORFOLK",
    "type": 6,
    "latitude": -97.4345873955839,
    "longitude": 41.98793309687
  },
  {
    "ident": "ONL",
    "class": "H-VORTACW",
    "name": "O'NEILL",
    "type": 8,
    "latitude": -98.6869363954204,
    "longitude": 42.4705061368731
  },
  {
    "ident": "SAE",
    "class": "T-VORW/DME",
    "name": "SEARLE",
    "type": 6,
    "latitude": -101.776065340106,
    "longitude": 41.1191098925476
  },
  {
    "ident": "OFF",
    "class": "L-TACAN",
    "name": "OFFUTT",
    "type": 9,
    "latitude": -95.900019107924,
    "longitude": 41.1172405648116
  },
  {
    "ident": "ODX",
    "class": "MHW",
    "name": "ORD",
    "type": 3,
    "latitude": -98.9480146897194,
    "longitude": 41.6237509953149
  },
  {
    "ident": "OKS",
    "class": "MHW",
    "name": "OSHKOSH",
    "type": 3,
    "latitude": -102.350870794226,
    "longitude": 41.4011457242347
  },
  {
    "ident": "PMV",
    "class": "MHW",
    "name": "PLATTSMOUTH",
    "type": 3,
    "latitude": -95.9124774249214,
    "longitude": 40.9437960927147
  },
  {
    "ident": "BFF",
    "class": "H-VORTAC",
    "name": "SCOTTSBLUFF",
    "type": 8,
    "latitude": -103.482041688516,
    "longitude": 41.8941698757642
  },
  {
    "ident": "SCB",
    "class": "T-VORW/DME",
    "name": "SCRIBNER",
    "type": 6,
    "latitude": -96.6288468582428,
    "longitude": 41.6047617039495
  },
  {
    "ident": "TDD",
    "class": "L-VORW/DME",
    "name": "THEDFORD",
    "type": 6,
    "latitude": -100.719043241677,
    "longitude": 41.9816712004964
  },
  {
    "ident": "VTN",
    "class": "MHW",
    "name": "VALENTINE",
    "type": 3,
    "latitude": -100.549655815487,
    "longitude": 42.8616316123915
  },
  {
    "ident": "AHQ",
    "class": "MHW",
    "name": "WAHOO",
    "type": 3,
    "latitude": -96.5983679187678,
    "longitude": 41.2391766496666
  },
  {
    "ident": "JYR",
    "class": "MHW",
    "name": "YORK",
    "type": 3,
    "latitude": -97.6170212038918,
    "longitude": 40.8975543084131
  },
  {
    "ident": "CNH",
    "class": "MHW",
    "name": "CLAREMONT",
    "type": 3,
    "latitude": -72.3711841407305,
    "longitude": 43.3691907624023
  },
  {
    "ident": "CO",
    "class": "MHW/LOM",
    "name": "EPSOM",
    "type": 3,
    "latitude": -71.4524302096755,
    "longitude": 43.1187857472236
  },
  {
    "ident": "LAH",
    "class": "MHW",
    "name": "HANOVER",
    "type": 3,
    "latitude": -72.1774635425564,
    "longitude": 43.702272775154
  },
  {
    "ident": "MHT",
    "class": "L-VORW/DME",
    "name": "MANCHESTER",
    "type": 6,
    "latitude": -71.369535167054,
    "longitude": 42.8685387592575
  },
  {
    "ident": "ESG",
    "class": "MHW",
    "name": "ROLLINS",
    "type": 3,
    "latitude": -70.8283100094487,
    "longitude": 43.2202805094178
  },
  {
    "ident": "GMA",
    "class": "MHW",
    "name": "MAHN",
    "type": 3,
    "latitude": -71.685906478853,
    "longitude": 44.3623526335306
  },
  {
    "ident": "ACY",
    "class": "L-VORTACW",
    "name": "ATLANTIC CITY",
    "type": 8,
    "latitude": -74.5763162776381,
    "longitude": 39.4558827086483
  },
  {
    "ident": "COL",
    "class": "L-VORW/DME",
    "name": "COLTS NECK",
    "type": 6,
    "latitude": -74.1597286955215,
    "longitude": 40.3116406720381
  },
  {
    "ident": "CYN",
    "class": "H-VORTACW",
    "name": "COYLE",
    "type": 8,
    "latitude": -74.4316273638162,
    "longitude": 39.8173461202475
  },
  {
    "ident": "NEL",
    "class": "MHW",
    "name": "LAKEHURST",
    "type": 3,
    "latitude": -74.3354848466636,
    "longitude": 40.0448747799811
  },
  {
    "ident": "NEL",
    "class": "T-TACAN",
    "name": "LAKEHURST",
    "type": 9,
    "latitude": -74.3531423518129,
    "longitude": 40.0369786667931
  },
  {
    "ident": "RNB",
    "class": "HW",
    "name": "RAINBOW",
    "type": 3,
    "latitude": -75.13502284097,
    "longitude": 39.4182021264703
  },
  {
    "ident": "RBV",
    "class": "H-VORTACW",
    "name": "ROBBINSVILLE",
    "type": 8,
    "latitude": -74.4950276848144,
    "longitude": 40.2024103606436
  },
  {
    "ident": "BWZ",
    "class": "L-VORW/DME",
    "name": "BROADWAY",
    "type": 6,
    "latitude": -74.8218342146102,
    "longitude": 40.7984410219983
  },
  {
    "ident": "SIE",
    "class": "H-VORTAC",
    "name": "SEA ISLE",
    "type": 8,
    "latitude": -74.8003454947081,
    "longitude": 39.0955167949667
  },
  {
    "ident": "SBJ",
    "class": "L-VOR/DME",
    "name": "SOLBERG",
    "type": 6,
    "latitude": -74.7417955646314,
    "longitude": 40.5830534828174
  },
  {
    "ident": "SAX",
    "class": "H-VORTACW",
    "name": "SPARTA",
    "type": 8,
    "latitude": -74.5383144189223,
    "longitude": 41.0675519175544
  },
  {
    "ident": "STW",
    "class": "L-VORW/DME",
    "name": "STILLWATER",
    "type": 6,
    "latitude": -74.8690320201851,
    "longitude": 40.995828002625
  },
  {
    "ident": "TEB",
    "class": "T-VORW/DME",
    "name": "TETERBORO",
    "type": 6,
    "latitude": -74.0622442528014,
    "longitude": 40.8487288370081
  },
  {
    "ident": "OOD",
    "class": "L-VORTACW",
    "name": "WOODSTOWN",
    "type": 8,
    "latitude": -75.3030240179373,
    "longitude": 39.6360385531792
  },
  {
    "ident": "GXU",
    "class": "L-VORTACW",
    "name": "MC GUIRE",
    "type": 8,
    "latitude": -74.5965127055341,
    "longitude": 40.0094830967789
  },
  {
    "ident": "HMN",
    "class": "L-TACAN",
    "name": "HOLLOMAN",
    "type": 9,
    "latitude": -106.109131959871,
    "longitude": 32.8621081062538
  },
  {
    "ident": "ABQ",
    "class": "H-VORTACW",
    "name": "ALBUQUERQUE",
    "type": 8,
    "latitude": -106.816321999153,
    "longitude": 35.0438011853731
  },
  {
    "ident": "ACH",
    "class": "H-VORTAC",
    "name": "ANTON CHICO",
    "type": 8,
    "latitude": -105.039938555225,
    "longitude": 35.1117118486455
  },
  {
    "ident": "ATS",
    "class": "MHW",
    "name": "ARTESIA",
    "type": 3,
    "latitude": -104.460521591594,
    "longitude": 32.852708460834
  },
  {
    "ident": "CNM",
    "class": "L-VORTACW",
    "name": "CARLSBAD",
    "type": 8,
    "latitude": -104.226046778292,
    "longitude": 32.2566186490989
  },
  {
    "ident": "CIM",
    "class": "H-VORTAC",
    "name": "CIMARRON",
    "type": 8,
    "latitude": -104.872009468548,
    "longitude": 36.4914029022149
  },
  {
    "ident": "CVS",
    "class": "L-TACAN",
    "name": "CANNON",
    "type": 9,
    "latitude": -103.322489216616,
    "longitude": 34.3807218232555
  },
  {
    "ident": "CUS",
    "class": "L-VORW/DME",
    "name": "COLUMBUS",
    "type": 6,
    "latitude": -107.574493044341,
    "longitude": 31.819100094478
  },
  {
    "ident": "CNX",
    "class": "H-VORTAC",
    "name": "CORONA",
    "type": 8,
    "latitude": -105.678014472511,
    "longitude": 34.3670208655287
  },
  {
    "ident": "DMN",
    "class": "L-VORTACW",
    "name": "DEMING",
    "type": 8,
    "latitude": -107.60551141258,
    "longitude": 32.2755565540034
  },
  {
    "ident": "RSK",
    "class": "H-VORTACW",
    "name": "RATTLESNAKE",
    "type": 8,
    "latitude": -108.098909651278,
    "longitude": 36.7483985780567
  },
  {
    "ident": "GUP",
    "class": "H-VORTAC",
    "name": "GALLUP",
    "type": 8,
    "latitude": -108.872622199598,
    "longitude": 35.4760047423968
  },
  {
    "ident": "HOB",
    "class": "L-VORTACW",
    "name": "HOBBS",
    "type": 8,
    "latitude": -103.269307972595,
    "longitude": 32.6382429240976
  },
  {
    "ident": "FTI",
    "class": "H-VORTACW",
    "name": "FORT UNION",
    "type": 8,
    "latitude": -105.135606122109,
    "longitude": 35.6575552604245
  },
  {
    "ident": "OTO",
    "class": "L-VORW",
    "name": "OTTO",
    "type": 7,
    "latitude": -105.936052641592,
    "longitude": 35.0722487383558
  },
  {
    "ident": "PIO",
    "class": "L-VORW/DME",
    "name": "PINON",
    "type": 6,
    "latitude": -105.305250371108,
    "longitude": 32.5292075341668
  },
  {
    "ident": "CME",
    "class": "H-VORTACW",
    "name": "CHISUM",
    "type": 8,
    "latitude": -104.621254994664,
    "longitude": 33.3374840878033
  },
  {
    "ident": "CEP",
    "class": "MHW",
    "name": "CAPITAN",
    "type": 3,
    "latitude": -105.404347403055,
    "longitude": 33.4898912959648
  },
  {
    "ident": "SAF",
    "class": "L-VORTACW",
    "name": "SANTA FE",
    "type": 8,
    "latitude": -106.064945764179,
    "longitude": 35.5405468570345
  },
  {
    "ident": "ONM",
    "class": "H-VORTAC",
    "name": "SOCORRO",
    "type": 8,
    "latitude": -106.820468332938,
    "longitude": 34.3388935787912
  },
  {
    "ident": "TAS",
    "class": "L-VORTAC",
    "name": "TAOS",
    "type": 8,
    "latitude": -105.906330268607,
    "longitude": 36.6087748030114
  },
  {
    "ident": "TCS",
    "class": "H-VORTACW",
    "name": "TRUTH OR CONSEQUENCES",
    "type": 8,
    "latitude": -107.280556132646,
    "longitude": 33.2825075592372
  },
  {
    "ident": "TCC",
    "class": "H-VORTACW",
    "name": "TUCUMCARI",
    "type": 8,
    "latitude": -103.598590175637,
    "longitude": 35.1822116601903
  },
  {
    "ident": "ZUN",
    "class": "H-VORTACW",
    "name": "ZUNI",
    "type": 8,
    "latitude": -109.154519992276,
    "longitude": 34.9657588200933
  },
  {
    "ident": "BAM",
    "class": "H-VORTACW",
    "name": "BATTLE MOUNTAIN",
    "type": 8,
    "latitude": -116.922269336734,
    "longitude": 40.5690856166168
  },
  {
    "ident": "BTY",
    "class": "H-VORTAC",
    "name": "BEATTY",
    "type": 8,
    "latitude": -116.747653016696,
    "longitude": 36.8006021923355
  },
  {
    "ident": "BLD",
    "class": "H-VORTACW",
    "name": "BOULDER CITY",
    "type": 8,
    "latitude": -114.863590652851,
    "longitude": 35.9957955579775
  },
  {
    "ident": "OAL",
    "class": "H-VORTAC",
    "name": "COALDALE",
    "type": 8,
    "latitude": -117.770458326158,
    "longitude": 38.0032666911617
  },
  {
    "ident": "BQU",
    "class": "L-VORW/DME",
    "name": "BULLION",
    "type": 6,
    "latitude": -115.761380263391,
    "longitude": 40.7596798959901
  },
  {
    "ident": "ELY",
    "class": "H-VORW/DME",
    "name": "ELY",
    "type": 6,
    "latitude": -114.84831767852,
    "longitude": 39.2981303727711
  },
  {
    "ident": "NFL",
    "class": "H-TACAN",
    "name": "FALLON",
    "type": 9,
    "latitude": -118.705093381094,
    "longitude": 39.4169137006503
  },
  {
    "ident": "HZN",
    "class": "L-VORTAC",
    "name": "HAZEN",
    "type": 8,
    "latitude": -118.997701498276,
    "longitude": 39.5164092428783
  },
  {
    "ident": "INS",
    "class": "T-TACAN",
    "name": "INDIAN SPRINGS",
    "type": 9,
    "latitude": -115.670342525107,
    "longitude": 36.5850052959034
  },
  {
    "ident": "LAS",
    "class": "H-VORTACW",
    "name": "LAS VEGAS",
    "type": 8,
    "latitude": -115.159809604343,
    "longitude": 36.0797083270689
  },
  {
    "ident": "LSV",
    "class": "L-TACAN",
    "name": "NELLIS",
    "type": 9,
    "latitude": -115.025092373583,
    "longitude": 36.2446636317875
  },
  {
    "ident": "LLC",
    "class": "L-VORTACW",
    "name": "LOVELOCK",
    "type": 8,
    "latitude": -118.57760845352,
    "longitude": 40.1252679420894
  },
  {
    "ident": "MVA",
    "class": "H-VORTAC",
    "name": "MINA",
    "type": 8,
    "latitude": -118.032865937373,
    "longitude": 38.5653047823273
  },
  {
    "ident": "MMM",
    "class": "L-VORTAC",
    "name": "MORMON MESA",
    "type": 8,
    "latitude": -114.277481730781,
    "longitude": 36.7692842973409
  },
  {
    "ident": "FMG",
    "class": "H-VORTACW",
    "name": "MUSTANG",
    "type": 8,
    "latitude": -119.656084109554,
    "longitude": 39.5312703035248
  },
  {
    "ident": "SDO",
    "class": "L-VORTACW",
    "name": "SOD HOUSE",
    "type": 8,
    "latitude": -118.034735209125,
    "longitude": 41.4070611568239
  },
  {
    "ident": "TPH",
    "class": "L-VORTACW",
    "name": "TONOPAH",
    "type": 8,
    "latitude": -117.033519867968,
    "longitude": 38.0306500798356
  },
  {
    "ident": "ILC",
    "class": "H-VORTAC",
    "name": "WILSON CREEK",
    "type": 8,
    "latitude": -114.394238301199,
    "longitude": 38.250198347716
  },
  {
    "ident": "INA",
    "class": "T-VORW/DME",
    "name": "WINNEMUCCA",
    "type": 6,
    "latitude": -117.81220426283,
    "longitude": 40.899283074266
  },
  {
    "ident": "ALB",
    "class": "L-VORTACW",
    "name": "ALBANY",
    "type": 8,
    "latitude": -73.8031867909957,
    "longitude": 42.7472892082683
  },
  {
    "ident": "CCC",
    "class": "L-VORW/DME",
    "name": "CALVERTON",
    "type": 6,
    "latitude": -72.7988602405686,
    "longitude": 40.9296263963047
  },
  {
    "ident": "CAM",
    "class": "L-VORW/DME",
    "name": "CAMBRIDGE",
    "type": 6,
    "latitude": -73.3440202685886,
    "longitude": 42.9942976037749
  },
  {
    "ident": "CRI",
    "class": "T-VORW/DME",
    "name": "CANARSIE",
    "type": 6,
    "latitude": -73.8944458507478,
    "longitude": 40.6124804626114
  },
  {
    "ident": "CMK",
    "class": "L-VORW/DME",
    "name": "CARMEL",
    "type": 6,
    "latitude": -73.5813302357301,
    "longitude": 41.280101714757
  },
  {
    "ident": "DPK",
    "class": "L-VORW/DME",
    "name": "DEER PARK",
    "type": 6,
    "latitude": -73.3036590059487,
    "longitude": 40.7917580181947
  },
  {
    "ident": "DNY",
    "class": "L-VORW/DME",
    "name": "DELANCEY",
    "type": 6,
    "latitude": -74.9569424045063,
    "longitude": 42.1782890589716
  },
  {
    "ident": "HTO",
    "class": "H-VORTACW",
    "name": "HAMPTON",
    "type": 8,
    "latitude": -72.3167053613819,
    "longitude": 40.9190041872143
  },
  {
    "ident": "ALP",
    "class": "MHW",
    "name": "ALPINE",
    "type": 3,
    "latitude": -76.7640521553013,
    "longitude": 42.2387051103224
  },
  {
    "ident": "ULW",
    "class": "L-VORW/DME",
    "name": "ELMIRA",
    "type": 6,
    "latitude": -77.0248088949356,
    "longitude": 42.0941631278175
  },
  {
    "ident": "GEE",
    "class": "L-VOR/DME",
    "name": "GENESEO",
    "type": 6,
    "latitude": -77.7327536215292,
    "longitude": 42.83440490133
  },
  {
    "ident": "HNK",
    "class": "H-VORW/DME",
    "name": "HANCOCK",
    "type": 6,
    "latitude": -75.31628640036,
    "longitude": 42.063065411638
  },
  {
    "ident": "PFH",
    "class": "MHW",
    "name": "PHILMONT",
    "type": 3,
    "latitude": -73.7234142322987,
    "longitude": 42.2531177296101
  },
  {
    "ident": "HUO",
    "class": "H-VOR/DME",
    "name": "HUGUENOT",
    "type": 6,
    "latitude": -74.5915958468531,
    "longitude": 41.4096950376012
  },
  {
    "ident": "JHW",
    "class": "H-VOR/DME",
    "name": "JAMESTOWN",
    "type": 6,
    "latitude": -79.1213081781832,
    "longitude": 42.1886158341371
  },
  {
    "ident": "JJH",
    "class": "MHW",
    "name": "JOHNSTOWN",
    "type": 3,
    "latitude": -74.3314328134498,
    "longitude": 42.9994295123612
  },
  {
    "ident": "IGN",
    "class": "L-VOR/DME",
    "name": "KINGSTON",
    "type": 6,
    "latitude": -73.8222258924864,
    "longitude": 41.6654581694209
  },
  {
    "ident": "JFK",
    "class": "H-VOR/DME",
    "name": "KENNEDY",
    "type": 6,
    "latitude": -73.7713902575681,
    "longitude": 40.6328971379019
  },
  {
    "ident": "LGA",
    "class": "L-VORW/DME",
    "name": "LA GUARDIA",
    "type": 6,
    "latitude": -73.8686019647857,
    "longitude": 40.7837238311015
  },
  {
    "ident": "SW",
    "class": "MHW/LOM",
    "name": "NEELY",
    "type": 3,
    "latitude": -74.2279174008327,
    "longitude": 41.4858278424325
  },
  {
    "ident": "IAG",
    "class": "T-TACAN",
    "name": "NIAGARA FALLS",
    "type": 9,
    "latitude": -78.9602429247576,
    "longitude": 43.1125537865722
  },
  {
    "ident": "PYA",
    "class": "MHW",
    "name": "PENN YAN",
    "type": 3,
    "latitude": -77.0561839461794,
    "longitude": 42.6439593391
  },
  {
    "ident": "PTD",
    "class": "MHW",
    "name": "POTSDAM",
    "type": 3,
    "latitude": -74.8826975673219,
    "longitude": 44.7233986897005
  },
  {
    "ident": "PWL",
    "class": "L-VORW/DME",
    "name": "PAWLING",
    "type": 6,
    "latitude": -73.6005527724489,
    "longitude": 41.7697798642492
  },
  {
    "ident": "ROC",
    "class": "L-VORW/DME",
    "name": "ROCHESTER",
    "type": 6,
    "latitude": -77.6727975138993,
    "longitude": 43.1179705102271
  },
  {
    "ident": "RKA",
    "class": "L-VORW/DME",
    "name": "ROCKDALE",
    "type": 6,
    "latitude": -75.2393100156323,
    "longitude": 42.4663732680498
  },
  {
    "ident": "HEU",
    "class": "MHW",
    "name": "HUNTER",
    "type": 3,
    "latitude": -73.9334893407111,
    "longitude": 42.8541900563355
  },
  {
    "ident": "SYR",
    "class": "H-VORTACW",
    "name": "SYRACUSE",
    "type": 8,
    "latitude": -76.2045609333662,
    "longitude": 43.1605275244409
  },
  {
    "ident": "ART",
    "class": "L-VORTAC",
    "name": "WATERTOWN",
    "type": 8,
    "latitude": -76.0646237273633,
    "longitude": 43.9521412834907
  },
  {
    "ident": "FOK",
    "class": "T-TACAN",
    "name": "SUFFOLK CO",
    "type": 9,
    "latitude": -72.6318440704088,
    "longitude": 40.8377797168567
  },
  {
    "ident": "ACO",
    "class": "L-VORW/DME",
    "name": "AKRON",
    "type": 6,
    "latitude": -81.2015290186429,
    "longitude": 41.1079113743296
  },
  {
    "ident": "AK",
    "class": "MHW/LOM",
    "name": "AKRON",
    "type": 3,
    "latitude": -81.3873715728564,
    "longitude": 41.0697413587426
  },
  {
    "ident": "APE",
    "class": "H-VORTAC",
    "name": "APPLETON",
    "type": 8,
    "latitude": -82.5883054780507,
    "longitude": 40.1510705768389
  },
  {
    "ident": "UGS",
    "class": "MHW",
    "name": "UNIVERSITY",
    "type": 3,
    "latitude": -82.1259744375442,
    "longitude": 39.2572673712924
  },
  {
    "ident": "PWF",
    "class": "MHW",
    "name": "SPORTYS",
    "type": 3,
    "latitude": -84.2154083834891,
    "longitude": 39.0767055761594
  },
  {
    "ident": "AIR",
    "class": "H-VORW/DME",
    "name": "BELLAIRE",
    "type": 6,
    "latitude": -80.8172324277828,
    "longitude": 40.0170320197785
  },
  {
    "ident": "BSV",
    "class": "L-VORW/DME",
    "name": "BRIGGS",
    "type": 6,
    "latitude": -81.4321210045277,
    "longitude": 40.7407143513879
  },
  {
    "ident": "CXR",
    "class": "H-VORW/DME",
    "name": "CHARDON",
    "type": 6,
    "latitude": -81.1631895948327,
    "longitude": 41.5169361746419
  },
  {
    "ident": "DQN",
    "class": "L-VOR/DME",
    "name": "DAYTON",
    "type": 6,
    "latitude": -84.3969026786246,
    "longitude": 40.0164521324663
  },
  {
    "ident": "FFO",
    "class": "T-TACAN",
    "name": "PATTERSON",
    "type": 9,
    "latitude": -84.0554850606682,
    "longitude": 39.8189854459182
  },
  {
    "ident": "FBC",
    "class": "L-VORTACW",
    "name": "FLAG CITY",
    "type": 8,
    "latitude": -83.7560295081739,
    "longitude": 40.9553406704994
  },
  {
    "ident": "MF",
    "class": "MHW/LOM",
    "name": "MANNS",
    "type": 3,
    "latitude": -82.44515520551,
    "longitude": 40.7663356984328
  },
  {
    "ident": "MFD",
    "class": "L-VORTACW",
    "name": "MANSFIELD",
    "type": 8,
    "latitude": -82.590965536285,
    "longitude": 40.8686201545146
  },
  {
    "ident": "BUD",
    "class": "T-VORW",
    "name": "BUCKEYE",
    "type": 7,
    "latitude": -83.0638306594122,
    "longitude": 40.6166053635311
  },
  {
    "ident": "HKF",
    "class": "MHW",
    "name": "HOOK FIELD",
    "type": 3,
    "latitude": -84.4475218182387,
    "longitude": 39.4987787002241
  },
  {
    "ident": "PCW",
    "class": "MHW",
    "name": "PORT CLINTON",
    "type": 3,
    "latitude": -82.868721508587,
    "longitude": 41.5185866491631
  },
  {
    "ident": "ROD",
    "class": "H-VORTACW",
    "name": "ROSEWOOD",
    "type": 8,
    "latitude": -84.0431009278743,
    "longitude": 40.2878085888444
  },
  {
    "ident": "XSF",
    "class": "T-TACAN",
    "name": "SPRINGFIELD",
    "type": 9,
    "latitude": -83.8406297198683,
    "longitude": 39.8381376816635
  },
  {
    "ident": "TII",
    "class": "MHW",
    "name": "TIFFIN",
    "type": 3,
    "latitude": -83.2149754669935,
    "longitude": 41.0946735002443
  },
  {
    "ident": "TOL",
    "class": "T-TACAN",
    "name": "TOLEDO",
    "type": 9,
    "latitude": -83.7993692987191,
    "longitude": 41.5937127278801
  },
  {
    "ident": "CSS",
    "class": "MHW",
    "name": "COURT HOUSE",
    "type": 3,
    "latitude": -83.3916184556319,
    "longitude": 39.6008690468793
  },
  {
    "ident": "EOP",
    "class": "MHW",
    "name": "WAVERLY",
    "type": 3,
    "latitude": -82.9316171736912,
    "longitude": 39.167237318075
  },
  {
    "ident": "LQL",
    "class": "MHW",
    "name": "LAKELAND",
    "type": 3,
    "latitude": -81.3790080092534,
    "longitude": 41.6824123059341
  },
  {
    "ident": "HW",
    "class": "LOMW",
    "name": "CUBLA",
    "type": 3,
    "latitude": -83.8757919145157,
    "longitude": 39.353461755541
  },
  {
    "ident": "MXQ",
    "class": "T-VORW/DME",
    "name": "MIDWEST",
    "type": 6,
    "latitude": -83.8012438421212,
    "longitude": 39.429702884465
  },
  {
    "ident": "YNG",
    "class": "L-VORTACW",
    "name": "YOUNGSTOWN",
    "type": 8,
    "latitude": -80.6746685955214,
    "longitude": 41.3310333846602
  },
  {
    "ident": "ZZV",
    "class": "H-VORW/DME",
    "name": "ZANESVILLE",
    "type": 6,
    "latitude": -81.8926049725828,
    "longitude": 39.9408689016927
  },
  {
    "ident": "LTS",
    "class": "L-VORTACW",
    "name": "ALTUS",
    "type": 8,
    "latitude": -99.271172157274,
    "longitude": 34.6629337432245
  },
  {
    "ident": "ADM",
    "class": "H-VORTACW",
    "name": "ARDMORE",
    "type": 8,
    "latitude": -97.1682357665183,
    "longitude": 34.211592097602
  },
  {
    "ident": "BVO",
    "class": "L-VORW/DME",
    "name": "BARTLESVILLE",
    "type": 6,
    "latitude": -96.0184387242592,
    "longitude": 36.8343412355057
  },
  {
    "ident": "BFV",
    "class": "L-VORTACW",
    "name": "BURNS FLAT",
    "type": 8,
    "latitude": -99.2061749621015,
    "longitude": 35.2369505122493
  },
  {
    "ident": "BZ",
    "class": "MHW/LOM",
    "name": "FOSSI",
    "type": 3,
    "latitude": -99.2014852544176,
    "longitude": 35.4506669383135
  },
  {
    "ident": "END",
    "class": "H-VORTACW",
    "name": "VANCE",
    "type": 8,
    "latitude": -97.9183636165624,
    "longitude": 36.3449785488876
  },
  {
    "ident": "ODG",
    "class": "T-VORW/DME",
    "name": "WOODRING",
    "type": 6,
    "latitude": -97.788174140937,
    "longitude": 36.3737605058203
  },
  {
    "ident": "MMB",
    "class": "H-VORTACW",
    "name": "MITBEE",
    "type": 8,
    "latitude": -99.8801304943088,
    "longitude": 36.343738719986
  },
  {
    "ident": "GUY",
    "class": "MHW",
    "name": "GUYMON",
    "type": 3,
    "latitude": -101.505104255194,
    "longitude": 36.7053722986287
  },
  {
    "ident": "HET",
    "class": "MHW",
    "name": "HENRYETTA",
    "type": 3,
    "latitude": -96.0138958330949,
    "longitude": 35.4045526483264
  },
  {
    "ident": "HBR",
    "class": "L-VORTACW",
    "name": "HOBART",
    "type": 8,
    "latitude": -99.0633932318992,
    "longitude": 34.8665604551962
  },
  {
    "ident": "LAW",
    "class": "L-VORW/DME",
    "name": "LAWTON",
    "type": 6,
    "latitude": -98.4130919323958,
    "longitude": 34.4961823671374
  },
  {
    "ident": "TIK",
    "class": "T-TACAN",
    "name": "TINKER",
    "type": 9,
    "latitude": -97.3796992413928,
    "longitude": 35.4365142524904
  },
  {
    "ident": "PWA",
    "class": "T-VORW/DME",
    "name": "WILEY POST",
    "type": 6,
    "latitude": -97.6471851495544,
    "longitude": 35.5329492558781
  },
  {
    "ident": "IRW",
    "class": "H-VORTACW",
    "name": "WILL ROGERS",
    "type": 8,
    "latitude": -97.6092345716865,
    "longitude": 35.3586031150685
  },
  {
    "ident": "OKM",
    "class": "H-VORW/DME",
    "name": "OKMULGEE",
    "type": 6,
    "latitude": -95.8659619273957,
    "longitude": 35.6930807627942
  },
  {
    "ident": "PGO",
    "class": "L-VORTACW",
    "name": "RICH MOUNTAIN",
    "type": 8,
    "latitude": -94.6090093048146,
    "longitude": 34.6804709156447
  },
  {
    "ident": "PER",
    "class": "H-VORTACW",
    "name": "PIONEER",
    "type": 8,
    "latitude": -97.1601634567186,
    "longitude": 36.7465364368598
  },
  {
    "ident": "PN",
    "class": "MHW/LOM",
    "name": "PONCA",
    "type": 3,
    "latitude": -97.100547059014,
    "longitude": 36.825039786613
  },
  {
    "ident": "SRE",
    "class": "MHW",
    "name": "SEMINOLE",
    "type": 3,
    "latitude": -96.6748209933056,
    "longitude": 35.271863146549
  },
  {
    "ident": "SWO",
    "class": "T-VORW/DME",
    "name": "STILLWATER",
    "type": 6,
    "latitude": -97.081266170752,
    "longitude": 36.2242544064578
  },
  {
    "ident": "TUL",
    "class": "H-VORTACW",
    "name": "TULSA",
    "type": 8,
    "latitude": -95.7880980579397,
    "longitude": 36.1962600239085
  },
  {
    "ident": "AST",
    "class": "L-VORW/DME",
    "name": "ASTORIA",
    "type": 6,
    "latitude": -123.880391469467,
    "longitude": 46.1617037075956
  },
  {
    "ident": "BKE",
    "class": "H-VORW/DME",
    "name": "BAKER CITY",
    "type": 6,
    "latitude": -117.807884362355,
    "longitude": 44.8406059045052
  },
  {
    "ident": "ILR",
    "class": "L-VORW/DME",
    "name": "WILDHORSE",
    "type": 6,
    "latitude": -118.955063502269,
    "longitude": 43.5931354212603
  },
  {
    "ident": "CVO",
    "class": "H-VORW/DME",
    "name": "CORVALLIS",
    "type": 6,
    "latitude": -123.29368353859,
    "longitude": 44.4995747870976
  },
  {
    "ident": "EUG",
    "class": "H-VORTACW",
    "name": "EUGENE",
    "type": 8,
    "latitude": -123.222843455479,
    "longitude": 44.1209061605767
  },
  {
    "ident": "LMT",
    "class": "H-VORTACW",
    "name": "KLAMATH FALLS",
    "type": 8,
    "latitude": -121.727536770301,
    "longitude": 42.1531517271426
  },
  {
    "ident": "LGD",
    "class": "MHW",
    "name": "LA GRANDE",
    "type": 3,
    "latitude": -117.962754487899,
    "longitude": 45.3425173165063
  },
  {
    "ident": "LKV",
    "class": "H-VORTACW",
    "name": "LAKEVIEW",
    "type": 8,
    "latitude": -120.507118574836,
    "longitude": 42.4928549169413
  },
  {
    "ident": "OED",
    "class": "H-VORTACW",
    "name": "ROGUE VALLEY",
    "type": 8,
    "latitude": -122.912947561047,
    "longitude": 42.4795794201925
  },
  {
    "ident": "UBG",
    "class": "H-VORW/DME",
    "name": "NEWBERG",
    "type": 6,
    "latitude": -122.978171438075,
    "longitude": 45.3532337574085
  },
  {
    "ident": "ONP",
    "class": "H-VORTACW",
    "name": "NEWPORT",
    "type": 8,
    "latitude": -124.060608111471,
    "longitude": 44.5753549929712
  },
  {
    "ident": "PDT",
    "class": "H-VORTACW",
    "name": "PENDLETON",
    "type": 8,
    "latitude": -118.938717511082,
    "longitude": 45.6984253001839
  },
  {
    "ident": "PND",
    "class": "MHW",
    "name": "BANKS",
    "type": 3,
    "latitude": -123.045829562006,
    "longitude": 45.6302726551692
  },
  {
    "ident": "CBU",
    "class": "H-TACAN",
    "name": "COLUMBIA",
    "type": 9,
    "latitude": -122.611266986064,
    "longitude": 45.5886365865746
  },
  {
    "ident": "DSD",
    "class": "H-VORTACW",
    "name": "DESCHUTES",
    "type": 8,
    "latitude": -121.303540125073,
    "longitude": 44.2527685791644
  },
  {
    "ident": "REO",
    "class": "H-VORW/DME",
    "name": "ROME",
    "type": 6,
    "latitude": -117.868165086656,
    "longitude": 42.5905529391903
  },
  {
    "ident": "RBG",
    "class": "L-VORW/DME",
    "name": "ROSEBURG",
    "type": 6,
    "latitude": -123.352251914604,
    "longitude": 43.1824269245732
  },
  {
    "ident": "LTJ",
    "class": "H-VORW/DME",
    "name": "KLICKITAT",
    "type": 6,
    "latitude": -121.100847603437,
    "longitude": 45.7135889709743
  },
  {
    "ident": "FJC",
    "class": "L-VORTACW",
    "name": "ALLENTOWN",
    "type": 8,
    "latitude": -75.4547560787133,
    "longitude": 40.7267079287759
  },
  {
    "ident": "VV",
    "class": "MHW/LOM",
    "name": "CAMOR",
    "type": 3,
    "latitude": -79.744714866164,
    "longitude": 39.882778428827
  },
  {
    "ident": "ETX",
    "class": "L-VORW/DME",
    "name": "EAST TEXAS",
    "type": 6,
    "latitude": -75.6840341971973,
    "longitude": 40.5810442808662
  },
  {
    "ident": "FKL",
    "class": "L-VOR",
    "name": "FRANKLIN",
    "type": 7,
    "latitude": -79.8567091826162,
    "longitude": 41.4385064961978
  },
  {
    "ident": "HAR",
    "class": "L-VORTACW",
    "name": "HARRISBURG",
    "type": 8,
    "latitude": -77.0695612836249,
    "longitude": 40.3022477846552
  },
  {
    "ident": "BZJ",
    "class": "MHW",
    "name": "BELLGROVE",
    "type": 3,
    "latitude": -76.5530225187624,
    "longitude": 40.4359308866771
  },
  {
    "ident": "ETG",
    "class": "H-VORTACW",
    "name": "KEATING",
    "type": 8,
    "latitude": -78.142759184693,
    "longitude": 41.2149579167439
  },
  {
    "ident": "MIP",
    "class": "L-VORTACW",
    "name": "MILTON",
    "type": 8,
    "latitude": -76.6652923156435,
    "longitude": 41.0234001618733
  },
  {
    "ident": "MXE",
    "class": "L-VORTACW",
    "name": "MODENA",
    "type": 8,
    "latitude": -75.6708113732407,
    "longitude": 39.9180638730018
  },
  {
    "ident": "UCP",
    "class": "MHW",
    "name": "CASTLE",
    "type": 3,
    "latitude": -80.4158401581135,
    "longitude": 41.0230188938958
  },
  {
    "ident": "PSB",
    "class": "H-VORTAC",
    "name": "PHILIPSBURG",
    "type": 8,
    "latitude": -77.9927196710133,
    "longitude": 40.9162670331836
  },
  {
    "ident": "AGC",
    "class": "L-VORW/DME",
    "name": "ALLEGHENY",
    "type": 6,
    "latitude": -80.0408580410662,
    "longitude": 40.2786518254238
  },
  {
    "ident": "PTW",
    "class": "L-VORTACW",
    "name": "POTTSTOWN",
    "type": 8,
    "latitude": -75.5602608022041,
    "longitude": 40.2222444931533
  },
  {
    "ident": "RAV",
    "class": "L-VORTACW",
    "name": "RAVINE",
    "type": 8,
    "latitude": -76.5993830961551,
    "longitude": 40.5534011857372
  },
  {
    "ident": "REC",
    "class": "L-VORW/DME",
    "name": "REVLOC",
    "type": 6,
    "latitude": -78.74702543682,
    "longitude": 40.5464672093519
  },
  {
    "ident": "SLT",
    "class": "H-VORTACW",
    "name": "SLATE RUN",
    "type": 8,
    "latitude": -77.9701124850832,
    "longitude": 41.5127677020701
  },
  {
    "ident": "SYS",
    "class": "MHW",
    "name": "STOYSTOWN",
    "type": 3,
    "latitude": -78.916551568063,
    "longitude": 40.0857035025638
  },
  {
    "ident": "THS",
    "class": "L-VORTACW",
    "name": "ST THOMAS",
    "type": 8,
    "latitude": -77.9509470900461,
    "longitude": 39.933236011939
  },
  {
    "ident": "SFK",
    "class": "L-VORW/DME",
    "name": "STONYFORK",
    "type": 6,
    "latitude": -77.4199070463396,
    "longitude": 41.6952616480794
  },
  {
    "ident": "LVZ",
    "class": "L-VORTACW",
    "name": "WILKES-BARRE",
    "type": 8,
    "latitude": -75.6894698002607,
    "longitude": 41.2728108033784
  },
  {
    "ident": "FQM",
    "class": "L-VORW/DME",
    "name": "WILLIAMSPORT",
    "type": 6,
    "latitude": -76.7748690391712,
    "longitude": 41.338566884736
  },
  {
    "ident": "ARD",
    "class": "L-VORW/DME",
    "name": "YARDLEY",
    "type": 6,
    "latitude": -74.9076161521029,
    "longitude": 40.2533478560178
  },
  {
    "ident": "SEY",
    "class": "L-VORW/DME",
    "name": "SANDY POINT",
    "type": 6,
    "latitude": -71.5760862476421,
    "longitude": 41.1674439828755
  },
  {
    "ident": "AIK",
    "class": "MHW",
    "name": "AIKEN",
    "type": 3,
    "latitude": -81.6769756289771,
    "longitude": 33.6518070667245
  },
  {
    "ident": "ALD",
    "class": "L-VOR",
    "name": "ALLENDALE",
    "type": 7,
    "latitude": -81.2922360406818,
    "longitude": 33.0125008266586
  },
  {
    "ident": "ELW",
    "class": "L-VORTACW",
    "name": "ELECTRIC CITY",
    "type": 8,
    "latitude": -82.784687383171,
    "longitude": 34.4191927481821
  },
  {
    "ident": "PHH",
    "class": "MHW",
    "name": "ANDREWS",
    "type": 3,
    "latitude": -79.5272416489304,
    "longitude": 33.4514648720346
  },
  {
    "ident": "NBC",
    "class": "L-TACAN",
    "name": "BEAUFORT",
    "type": 9,
    "latitude": -80.7173372356272,
    "longitude": 32.4790446149589
  },
  {
    "ident": "BES",
    "class": "MHW",
    "name": "BENNETTSVILLE",
    "type": 3,
    "latitude": -79.733203156363,
    "longitude": 34.6202195679327
  },
  {
    "ident": "CH",
    "class": "HW/LOM",
    "name": "ASHLY",
    "type": 3,
    "latitude": -80.0974579076785,
    "longitude": 32.9763305810021
  },
  {
    "ident": "CHS",
    "class": "H-VORTAC",
    "name": "CHARLESTON",
    "type": 8,
    "latitude": -80.0378170532326,
    "longitude": 32.8943255645032
  },
  {
    "ident": "DCM",
    "class": "MHW",
    "name": "CHESTER",
    "type": 3,
    "latitude": -81.2008327685615,
    "longitude": 34.7857601067694
  },
  {
    "ident": "CTF",
    "class": "L-VOR/DME",
    "name": "CHESTERFIELD",
    "type": 6,
    "latitude": -80.2749194308671,
    "longitude": 34.6505048336048
  },
  {
    "ident": "IRQ",
    "class": "H-VORTAC",
    "name": "COLLIERS",
    "type": 8,
    "latitude": -82.1620679964026,
    "longitude": 33.7073598388746
  },
  {
    "ident": "CAE",
    "class": "H-VORTAC",
    "name": "COLUMBIA",
    "type": 8,
    "latitude": -81.0539060112371,
    "longitude": 33.8572565773926
  },
  {
    "ident": "UDG",
    "class": "MHW",
    "name": "DARLINGTON",
    "type": 3,
    "latitude": -79.8873451375445,
    "longitude": 34.443245912993
  },
  {
    "ident": "DLC",
    "class": "MHW",
    "name": "DILLON",
    "type": 3,
    "latitude": -79.3688263716306,
    "longitude": 34.4501409322898
  },
  {
    "ident": "MMT",
    "class": "L-VORTACW",
    "name": "MC ENTIRE",
    "type": 8,
    "latitude": -80.8023448290292,
    "longitude": 33.9241010447502
  },
  {
    "ident": "FLO",
    "class": "H-VORTACW",
    "name": "FLORENCE",
    "type": 8,
    "latitude": -79.657163947241,
    "longitude": 34.2329747638178
  },
  {
    "ident": "GY",
    "class": "MHW/LOM",
    "name": "DYANA",
    "type": 3,
    "latitude": -82.4436459087498,
    "longitude": 34.6911580969311
  },
  {
    "ident": "HVS",
    "class": "MHW",
    "name": "HARTSVILLE",
    "type": 3,
    "latitude": -80.1197785391227,
    "longitude": 34.4065372859349
  },
  {
    "ident": "CFY",
    "class": "MHW",
    "name": "EVANS",
    "type": 3,
    "latitude": -79.7659036833438,
    "longitude": 33.8560024540356
  },
  {
    "ident": "MNI",
    "class": "MHW",
    "name": "MANNING",
    "type": 3,
    "latitude": -80.2061326905962,
    "longitude": 33.5879015468875
  },
  {
    "ident": "EOE",
    "class": "MHW",
    "name": "ENOREE",
    "type": 3,
    "latitude": -81.6363320395392,
    "longitude": 34.3110444337137
  },
  {
    "ident": "CRE",
    "class": "L-VORTACW",
    "name": "GRAND STRAND",
    "type": 8,
    "latitude": -78.7245353145897,
    "longitude": 33.8138566461517
  },
  {
    "ident": "SPA",
    "class": "H-VORTAC",
    "name": "SPARTANBURG",
    "type": 8,
    "latitude": -81.9270135531248,
    "longitude": 35.0336326331019
  },
  {
    "ident": "DYB",
    "class": "MHW",
    "name": "DORCHESTER COUNTY",
    "type": 3,
    "latitude": -80.2773085209523,
    "longitude": 33.0612842051791
  },
  {
    "ident": "SSC",
    "class": "L-TACAN",
    "name": "SHAW",
    "type": 9,
    "latitude": -80.4662419538992,
    "longitude": 33.9778482911187
  },
  {
    "ident": "SMS",
    "class": "MHW",
    "name": "SUMTER",
    "type": 3,
    "latitude": -80.3600283119536,
    "longitude": 33.9908049636077
  },
  {
    "ident": "UOT",
    "class": "MHW",
    "name": "UNION COUNTY",
    "type": 3,
    "latitude": -81.6423367829731,
    "longitude": 34.6840067358771
  },
  {
    "ident": "VAN",
    "class": "L-VORTACW",
    "name": "VANCE",
    "type": 8,
    "latitude": -80.4486458132196,
    "longitude": 33.4748365136754
  },
  {
    "ident": "ABR",
    "class": "H-VOR/DME",
    "name": "ABERDEEN",
    "type": 6,
    "latitude": -98.3687289528319,
    "longitude": 45.4173643456776
  },
  {
    "ident": "MHE",
    "class": "L-VORW/DME",
    "name": "MITCHELL",
    "type": 6,
    "latitude": -98.0375852889379,
    "longitude": 43.7770294243619
  },
  {
    "ident": "PHP",
    "class": "L-VORW/DME",
    "name": "PHILIP",
    "type": 6,
    "latitude": -101.664203213339,
    "longitude": 44.0582469655124
  },
  {
    "ident": "PIR",
    "class": "L-VORTACW",
    "name": "PIERRE",
    "type": 8,
    "latitude": -100.162880936066,
    "longitude": 44.3945160154163
  },
  {
    "ident": "RCA",
    "class": "L-TACAN",
    "name": "ELLSWORTH",
    "type": 9,
    "latitude": -103.101741362418,
    "longitude": 44.1391035288721
  },
  {
    "ident": "RAP",
    "class": "H-VORTAC",
    "name": "RAPID CITY",
    "type": 8,
    "latitude": -103.012352148299,
    "longitude": 43.9760362934968
  },
  {
    "ident": "FS",
    "class": "HW/LOM",
    "name": "ROKKY",
    "type": 3,
    "latitude": -96.8287827049103,
    "longitude": 43.4941783602735
  },
  {
    "ident": "FSD",
    "class": "H-VORTACW",
    "name": "SIOUX FALLS",
    "type": 8,
    "latitude": -96.7811335459669,
    "longitude": 43.6494978310375
  },
  {
    "ident": "BO",
    "class": "MHW/LOM",
    "name": "BOOIE",
    "type": 3,
    "latitude": -82.4962793569338,
    "longitude": 36.3986462306532
  },
  {
    "ident": "CQN",
    "class": "HW",
    "name": "DAISY",
    "type": 3,
    "latitude": -85.15737200498,
    "longitude": 35.1665486466494
  },
  {
    "ident": "CKV",
    "class": "T-VORW/DME",
    "name": "CLARKSVILLE",
    "type": 6,
    "latitude": -87.4126696902001,
    "longitude": 36.6219899550181
  },
  {
    "ident": "DTE",
    "class": "MHW",
    "name": "MARK ANTON",
    "type": 3,
    "latitude": -84.930908069513,
    "longitude": 35.4819009437922
  },
  {
    "ident": "HMV",
    "class": "L-VORTACW",
    "name": "HOLSTON MOUNTAIN",
    "type": 8,
    "latitude": -82.1296036944212,
    "longitude": 36.437062642171
  },
  {
    "ident": "MKL",
    "class": "T-VORW/DME",
    "name": "MC KELLAR",
    "type": 6,
    "latitude": -88.9104350439432,
    "longitude": 35.6035719097826
  },
  {
    "ident": "VXV",
    "class": "H-VORTACW",
    "name": "VOLUNTEER",
    "type": 8,
    "latitude": -83.8947305716293,
    "longitude": 35.9048455168143
  },
  {
    "ident": "MEM",
    "class": "H-VORTACW",
    "name": "MEMPHIS",
    "type": 8,
    "latitude": -89.9832144704241,
    "longitude": 35.0151239682657
  },
  {
    "ident": "JXT",
    "class": "MHW",
    "name": "JEFFERSON",
    "type": 3,
    "latitude": -83.475636572343,
    "longitude": 36.1105644650449
  },
  {
    "ident": "FQW",
    "class": "MHW",
    "name": "WALTER HILL",
    "type": 3,
    "latitude": -86.3709815708194,
    "longitude": 35.9612470919377
  },
  {
    "ident": "BNA",
    "class": "H-VORTACW",
    "name": "NASHVILLE",
    "type": 8,
    "latitude": -86.6847766722771,
    "longitude": 36.1369676685132
  },
  {
    "ident": "RVN",
    "class": "MHW",
    "name": "ROGERSVILLE",
    "type": 3,
    "latitude": -82.8843761413713,
    "longitude": 36.4559442817959
  },
  {
    "ident": "SYI",
    "class": "L-VORW/DME",
    "name": "SHELBYVILLE",
    "type": 6,
    "latitude": -86.439157675765,
    "longitude": 35.5619833975803
  },
  {
    "ident": "SOT",
    "class": "L-VORTAC",
    "name": "SNOWBIRD",
    "type": 8,
    "latitude": -83.0523730954635,
    "longitude": 35.7901060828363
  },
  {
    "ident": "HEM",
    "class": "MHW",
    "name": "HUCHN",
    "type": 3,
    "latitude": -85.5862860686692,
    "longitude": 35.9880168527521
  },
  {
    "ident": "ATA",
    "class": "MHW",
    "name": "ATLANTA",
    "type": 3,
    "latitude": -94.1900685390067,
    "longitude": 33.1042081328509
  },
  {
    "ident": "CWK",
    "class": "H-VORTACW",
    "name": "CENTEX",
    "type": 8,
    "latitude": -97.5298548002854,
    "longitude": 30.3785552451027
  },
  {
    "ident": "BPT",
    "class": "L-VORW/DME",
    "name": "BEAUMONT",
    "type": 6,
    "latitude": -94.0162274949766,
    "longitude": 29.946059448346
  },
  {
    "ident": "BGS",
    "class": "L-VORTACW",
    "name": "BIG SPRING",
    "type": 8,
    "latitude": -101.483691428278,
    "longitude": 32.3855937935518
  },
  {
    "ident": "BYP",
    "class": "H-VORTACW",
    "name": "BONHAM",
    "type": 8,
    "latitude": -96.2341018720904,
    "longitude": 33.5374920157316
  },
  {
    "ident": "UKW",
    "class": "H-VORTACW",
    "name": "BOWIE",
    "type": 8,
    "latitude": -97.821286440972,
    "longitude": 33.5358927766331
  },
  {
    "ident": "COT",
    "class": "L-VORTACW",
    "name": "COTULLA",
    "type": 8,
    "latitude": -99.1185528852584,
    "longitude": 28.4620225909093
  },
  {
    "ident": "DAS",
    "class": "H-VORTACW",
    "name": "DAISETTA",
    "type": 8,
    "latitude": -94.644991280224,
    "longitude": 30.1897169770278
  },
  {
    "ident": "DHT",
    "class": "L-VORTACW",
    "name": "DALHART",
    "type": 8,
    "latitude": -102.544650838659,
    "longitude": 36.0914626974343
  },
  {
    "ident": "CVE",
    "class": "H-VORW/DME",
    "name": "COWBOY",
    "type": 6,
    "latitude": -96.9039714472151,
    "longitude": 32.8903207534484
  },
  {
    "ident": "TTT",
    "class": "H-VORW/DME",
    "name": "MAVERICK",
    "type": 6,
    "latitude": -97.0405109244613,
    "longitude": 32.8691660215426
  },
  {
    "ident": "FUZ",
    "class": "H-VORTACW",
    "name": "RANGER",
    "type": 8,
    "latitude": -97.1794329057735,
    "longitude": 32.8894557413208
  },
  {
    "ident": "DLF",
    "class": "H-VORTAC",
    "name": "LAUGHLIN",
    "type": 8,
    "latitude": -100.771731932364,
    "longitude": 29.3608977115063
  },
  {
    "ident": "RYV",
    "class": "MHW",
    "name": "ROCK RIVER",
    "type": 3,
    "latitude": -88.7252867649707,
    "longitude": 43.1736791183868
  },
  {
    "ident": "BJB",
    "class": "T-VORW",
    "name": "WEST BEND",
    "type": 7,
    "latitude": -88.1251941149987,
    "longitude": 43.4219889165379
  },
  {
    "ident": "AWK",
    "class": "H-VORTACW",
    "name": "WAKE ISLAND",
    "type": 8,
    "latitude": 166.627323371337,
    "longitude": 19.2865850344492
  },
  {
    "ident": "HLG",
    "class": "L-VORW/DME",
    "name": "WHEELING",
    "type": 6,
    "latitude": -80.5686282023848,
    "longitude": 40.2599098540129
  },
  {
    "ident": "BPI",
    "class": "H-VORW/DME",
    "name": "BIG PINEY",
    "type": 6,
    "latitude": -110.109223569639,
    "longitude": 42.5794516609135
  },
  {
    "ident": "BOY",
    "class": "H-VORW/DME",
    "name": "BOYSEN RESERVOIR",
    "type": 6,
    "latitude": -108.299723589378,
    "longitude": 43.4631585764979
  },
  {
    "ident": "DDY",
    "class": "H-VORW/DME",
    "name": "MUDDY MOUNTAIN",
    "type": 6,
    "latitude": -106.277035294473,
    "longitude": 43.0908631443191
  },
  {
    "ident": "CKW",
    "class": "H-VORW/DME",
    "name": "CHEROKEE",
    "type": 6,
    "latitude": -107.581993176141,
    "longitude": 41.7557159339928
  },
  {
    "ident": "CYS",
    "class": "H-VORTACW",
    "name": "CHEYENNE",
    "type": 8,
    "latitude": -104.772925238463,
    "longitude": 41.2109735773725
  },
  {
    "ident": "COD",
    "class": "L-VORW/DME",
    "name": "CODY",
    "type": 6,
    "latitude": -108.964928928616,
    "longitude": 44.6204583693723
  },
  {
    "ident": "HCY",
    "class": "MHW",
    "name": "COWLEY",
    "type": 3,
    "latitude": -108.443195251828,
    "longitude": 44.9140120576864
  },
  {
    "ident": "CZI",
    "class": "H-VORW/DME",
    "name": "CRAZY WOMAN",
    "type": 6,
    "latitude": -106.435741584264,
    "longitude": 43.9997346280214
  },
  {
    "ident": "IIP",
    "class": "L-VORW/DME",
    "name": "HIPSHER",
    "type": 6,
    "latitude": -105.226234988569,
    "longitude": 42.6761087318596
  },
  {
    "ident": "DNW",
    "class": "H-VORW/DME",
    "name": "DUNOIR",
    "type": 6,
    "latitude": -110.335486316037,
    "longitude": 43.8282845546192
  },
  {
    "ident": "TKK",
    "class": "HW/DME",
    "name": "TRUK",
    "type": 4,
    "latitude": 151.840465179299,
    "longitude": 7.45714722413703
  },
  {
    "ident": "HHH",
    "class": "MHW",
    "name": "DEVINE",
    "type": 3,
    "latitude": -98.9392692585496,
    "longitude": 29.1383285633022
  },
  {
    "ident": "ELP",
    "class": "H-VORTACW",
    "name": "EL PASO",
    "type": 8,
    "latitude": -106.28189193097,
    "longitude": 31.8159162624067
  },
  {
    "ident": "FST",
    "class": "H-VORTACW",
    "name": "FORT STOCKTON",
    "type": 8,
    "latitude": -102.975720305519,
    "longitude": 30.9521120878001
  },
  {
    "ident": "NFW",
    "class": "L-TACAN",
    "name": "NAS JRB FORT WORTH",
    "type": 9,
    "latitude": -97.4393110190147,
    "longitude": 32.7713962638936
  },
  {
    "ident": "FZT",
    "class": "L-VORW/DME",
    "name": "FRANKSTON",
    "type": 6,
    "latitude": -95.5307977164076,
    "longitude": 32.0746098213238
  },
  {
    "ident": "MJF",
    "class": "T-TACAN",
    "name": "ARVILLA",
    "type": 9,
    "latitude": -96.0614045764356,
    "longitude": 33.0662755453015
  },
  {
    "ident": "HRL",
    "class": "L-VORW/DME",
    "name": "HARLINGEN",
    "type": 6,
    "latitude": -97.6522721696655,
    "longitude": 26.2292291181527
  },
  {
    "ident": "EFD",
    "class": "L-TACAN",
    "name": "ELLINGTON",
    "type": 9,
    "latitude": -95.1596602755905,
    "longitude": 29.6059637834564
  },
  {
    "ident": "IAH",
    "class": "H-VORTACW",
    "name": "HUMBLE",
    "type": 8,
    "latitude": -95.3457261729792,
    "longitude": 29.9569224601019
  },
  {
    "ident": "HUP",
    "class": "L-VORTACW",
    "name": "HUDSPETH",
    "type": 8,
    "latitude": -105.376328105762,
    "longitude": 31.5687068171208
  },
  {
    "ident": "UTS",
    "class": "MHW",
    "name": "HUNTSVILLE",
    "type": 3,
    "latitude": -95.5908751618707,
    "longitude": 30.7407542769385
  },
  {
    "ident": "IDU",
    "class": "L-VORTACW",
    "name": "INDUSTRY",
    "type": 8,
    "latitude": -96.5622014824327,
    "longitude": 29.9560626957473
  },
  {
    "ident": "JCT",
    "class": "H-VORTACW",
    "name": "JUNCTION",
    "type": 8,
    "latitude": -99.817489262372,
    "longitude": 30.5980263132799
  },
  {
    "ident": "CSI",
    "class": "H-VORTAC",
    "name": "CENTER POINT",
    "type": 8,
    "latitude": -99.2144938049811,
    "longitude": 29.9223595395583
  },
  {
    "ident": "NQI",
    "class": "H-TACAN",
    "name": "KINGSVILLE",
    "type": 9,
    "latitude": -97.8056119707252,
    "longitude": 27.4992446569229
  },
  {
    "ident": "LKX",
    "class": "MHW",
    "name": "LA PRYOR",
    "type": 3,
    "latitude": -99.8547880828941,
    "longitude": 28.9299754373744
  },
  {
    "ident": "AGJ",
    "class": "H-VORTACW",
    "name": "GOOCH SPRINGS",
    "type": 8,
    "latitude": -98.1418655493779,
    "longitude": 31.1855098224593
  },
  {
    "ident": "LRD",
    "class": "H-VORTACW",
    "name": "LAREDO",
    "type": 8,
    "latitude": -99.4176868099701,
    "longitude": 27.4787418295835
  },
  {
    "ident": "LOA",
    "class": "L-VORTACW",
    "name": "LEONA",
    "type": 8,
    "latitude": -95.9679633324696,
    "longitude": 31.1240229502039
  },
  {
    "ident": "LLO",
    "class": "L-VORTACW",
    "name": "LLANO",
    "type": 8,
    "latitude": -98.787396521407,
    "longitude": 30.7963472231114
  },
  {
    "ident": "GGG",
    "class": "L-VORTACW",
    "name": "GREGG COUNTY",
    "type": 8,
    "latitude": -94.7532008678387,
    "longitude": 32.4177596421308
  },
  {
    "ident": "LBB",
    "class": "L-VORTACW",
    "name": "LUBBOCK",
    "type": 8,
    "latitude": -101.914019116324,
    "longitude": 33.7049565027337
  },
  {
    "ident": "LFK",
    "class": "H-VORTACW",
    "name": "LUFKIN",
    "type": 8,
    "latitude": -94.7168394019297,
    "longitude": 31.1624474490869
  },
  {
    "ident": "MRF",
    "class": "L-VORW/DME",
    "name": "MARFA",
    "type": 6,
    "latitude": -103.95476438425,
    "longitude": 30.2983774898314
  },
  {
    "ident": "MFE",
    "class": "H-VORW/DME",
    "name": "MC ALLEN",
    "type": 6,
    "latitude": -98.2407942584337,
    "longitude": 26.1738804814098
  },
  {
    "ident": "MA",
    "class": "HW/LOM",
    "name": "FARLY",
    "type": 3,
    "latitude": -102.325160491286,
    "longitude": 31.9881014647243
  },
  {
    "ident": "MAF",
    "class": "L-VORTACW",
    "name": "MIDLAND",
    "type": 8,
    "latitude": -102.190397405025,
    "longitude": 32.0093503632906
  },
  {
    "ident": "MQP",
    "class": "H-VORTACW",
    "name": "MILLSAP",
    "type": 8,
    "latitude": -97.9974494899997,
    "longitude": 32.726186231229
  },
  {
    "ident": "OC",
    "class": "MHW/LOM",
    "name": "NADOS",
    "type": 3,
    "latitude": -94.7202013634392,
    "longitude": 31.4855611257746
  },
  {
    "ident": "EWM",
    "class": "L-VORTACW",
    "name": "NEWMAN",
    "type": 8,
    "latitude": -106.272408882189,
    "longitude": 31.951748506938
  },
  {
    "ident": "NOG",
    "class": "T-TACAN",
    "name": "ORANGE GROVE",
    "type": 9,
    "latitude": -98.0426331556232,
    "longitude": 27.8953302873228
  },
  {
    "ident": "PSX",
    "class": "H-VORTACW",
    "name": "PALACIOS",
    "type": 8,
    "latitude": -96.3061880322917,
    "longitude": 28.7644296840002
  },
  {
    "ident": "PRX",
    "class": "L-VORW/DME",
    "name": "PARIS",
    "type": 6,
    "latitude": -95.4482975043351,
    "longitude": 33.5423845516503
  },
  {
    "ident": "PEQ",
    "class": "L-VOR/DME",
    "name": "PECOS",
    "type": 6,
    "latitude": -103.574763526942,
    "longitude": 31.4693196538628
  },
  {
    "ident": "PYX",
    "class": "MHW",
    "name": "PERRYTON",
    "type": 3,
    "latitude": -100.747752935445,
    "longitude": 36.4123497941155
  },
  {
    "ident": "PVW",
    "class": "L-VORW/DME",
    "name": "PLAINVIEW",
    "type": 6,
    "latitude": -101.790195779908,
    "longitude": 34.086198518611
  },
  {
    "ident": "RSG",
    "class": "L-VORTAC",
    "name": "ROCKSPRINGS",
    "type": 8,
    "latitude": -100.299853238843,
    "longitude": 30.0146072961596
  },
  {
    "ident": "SBI",
    "class": "L-VORW/DME",
    "name": "SABINE PASS",
    "type": 6,
    "latitude": -94.037985267178,
    "longitude": 29.6867249486068
  },
  {
    "ident": "SFL",
    "class": "L-VORTACW",
    "name": "SALT FLAT",
    "type": 8,
    "latitude": -105.086819440944,
    "longitude": 31.748121025647
  },
  {
    "ident": "SJT",
    "class": "H-VORTACW",
    "name": "SAN ANGELO",
    "type": 8,
    "latitude": -100.454882513062,
    "longitude": 31.3749567109227
  },
  {
    "ident": "KSY",
    "class": "L-TACAN",
    "name": "KELLY",
    "type": 9,
    "latitude": -98.5810605708326,
    "longitude": 29.3915911251287
  },
  {
    "ident": "SAT",
    "class": "H-VORTACW",
    "name": "SAN ANTONIO",
    "type": 8,
    "latitude": -98.4613222186805,
    "longitude": 29.644036734839
  },
  {
    "ident": "SSF",
    "class": "L-VORW",
    "name": "STINSON",
    "type": 7,
    "latitude": -98.4434877531805,
    "longitude": 29.2583824924766
  },
  {
    "ident": "DNI",
    "class": "MHW",
    "name": "DENISON",
    "type": 3,
    "latitude": -96.6689006138228,
    "longitude": 33.8265051059735
  },
  {
    "ident": "MHF",
    "class": "L-VORW/DME",
    "name": "TRINITY",
    "type": 6,
    "latitude": -94.7475196119198,
    "longitude": 29.5463482298508
  },
  {
    "ident": "SDR",
    "class": "MHW",
    "name": "SNYDER",
    "type": 3,
    "latitude": -100.946136597904,
    "longitude": 32.7014083184031
  },
  {
    "ident": "SOA",
    "class": "MHW",
    "name": "SONORA",
    "type": 3,
    "latitude": -100.646941683002,
    "longitude": 30.5818110006866
  },
  {
    "ident": "PFO",
    "class": "MHW",
    "name": "SPOFFORD",
    "type": 3,
    "latitude": -100.427585173712,
    "longitude": 29.1452446259899
  },
  {
    "ident": "STV",
    "class": "H-VORTAC",
    "name": "STONEWALL",
    "type": 8,
    "latitude": -98.7057631390711,
    "longitude": 30.2067646128184
  },
  {
    "ident": "TXO",
    "class": "H-VORTACW",
    "name": "TEXICO",
    "type": 8,
    "latitude": -102.839672445893,
    "longitude": 34.4951324228664
  },
  {
    "ident": "THX",
    "class": "L-VORTAC",
    "name": "THREE RIVERS",
    "type": 8,
    "latitude": -98.150474316639,
    "longitude": 28.5050020735953
  },
  {
    "ident": "TYR",
    "class": "T-VORW/DME",
    "name": "TYLER",
    "type": 6,
    "latitude": -95.4034729764986,
    "longitude": 32.355872658382
  },
  {
    "ident": "DHK",
    "class": "L-TACAN",
    "name": "RANDOLPH",
    "type": 9,
    "latitude": -98.2678105001743,
    "longitude": 29.5369522754244
  },
  {
    "ident": "RND",
    "class": "T-VORTACW",
    "name": "RANDOLPH",
    "type": 8,
    "latitude": -98.2851799476651,
    "longitude": 29.5191744933245
  },
  {
    "ident": "VHN",
    "class": "MHW",
    "name": "VAN HORN",
    "type": 3,
    "latitude": -104.786746834353,
    "longitude": 31.0617092562966
  },
  {
    "ident": "VCT",
    "class": "L-VORW/DME",
    "name": "VICTORIA",
    "type": 6,
    "latitude": -96.9789420962309,
    "longitude": 28.9003233015071
  },
  {
    "ident": "ROB",
    "class": "MHW",
    "name": "ROBINSON",
    "type": 3,
    "latitude": -97.0695911315058,
    "longitude": 31.5038113148433
  },
  {
    "ident": "ACT",
    "class": "H-VORTACW",
    "name": "WACO",
    "type": 8,
    "latitude": -97.2690439682521,
    "longitude": 31.6623352264683
  },
  {
    "ident": "SKB",
    "class": "MHW",
    "name": "SCOTLAND",
    "type": 3,
    "latitude": -98.4881696797248,
    "longitude": 33.7822797356142
  },
  {
    "ident": "SHP",
    "class": "L-TACAN",
    "name": "SHEPPARD",
    "type": 9,
    "latitude": -98.4876802481722,
    "longitude": 33.9827197717372
  },
  {
    "ident": "SPS",
    "class": "H-VORTACW",
    "name": "WICHITA FALLS",
    "type": 8,
    "latitude": -98.593479996783,
    "longitude": 33.9872933785416
  },
  {
    "ident": "INK",
    "class": "H-VORTACW",
    "name": "WINK",
    "type": 8,
    "latitude": -103.243786252634,
    "longitude": 31.8747686272194
  },
  {
    "ident": "BVL",
    "class": "H-VORTAC",
    "name": "BONNEVILLE",
    "type": 8,
    "latitude": -113.757429323282,
    "longitude": 40.7261033862995
  },
  {
    "ident": "BCE",
    "class": "H-VORTACW",
    "name": "BRYCE CANYON",
    "type": 8,
    "latitude": -112.303908668699,
    "longitude": 37.68919287156
  },
  {
    "ident": "DTA",
    "class": "H-VORTACW",
    "name": "DELTA",
    "type": 8,
    "latitude": -112.505567504389,
    "longitude": 39.302216936477
  },
  {
    "ident": "MIJ",
    "class": "T-TACAN",
    "name": "MICHAEL",
    "type": 9,
    "latitude": -112.922359088246,
    "longitude": 40.1917920050757
  },
  {
    "ident": "HVE",
    "class": "H-VORTACW",
    "name": "HANKSVILLE",
    "type": 8,
    "latitude": -110.699743981562,
    "longitude": 38.4168208488376
  },
  {
    "ident": "LHO",
    "class": "L-VORW/DME",
    "name": "BRIGHAM CITY",
    "type": 6,
    "latitude": -112.00978940494,
    "longitude": 41.7928858627343
  },
  {
    "ident": "LCU",
    "class": "H-VORTAC",
    "name": "LUCIN",
    "type": 8,
    "latitude": -113.840631650987,
    "longitude": 41.3629576128571
  },
  {
    "ident": "MLF",
    "class": "H-VORTAC",
    "name": "MILFORD",
    "type": 8,
    "latitude": -113.01324443808,
    "longitude": 38.3603612360993
  },
  {
    "ident": "OAB",
    "class": "T-VORW/DME",
    "name": "MOAB",
    "type": 6,
    "latitude": -109.749302433686,
    "longitude": 38.7562470684791
  },
  {
    "ident": "MTU",
    "class": "H-VOR/DME",
    "name": "MYTON",
    "type": 6,
    "latitude": -110.127039347645,
    "longitude": 40.149101657392
  },
  {
    "ident": "HIF",
    "class": "L-TACAN",
    "name": "HILL",
    "type": 9,
    "latitude": -111.963692355784,
    "longitude": 41.1205088493326
  },
  {
    "ident": "OGD",
    "class": "L-VORTACW",
    "name": "OGDEN",
    "type": 8,
    "latitude": -112.098254619508,
    "longitude": 41.2241021829651
  },
  {
    "ident": "PUC",
    "class": "H-VORW/DME",
    "name": "CARBON",
    "type": 6,
    "latitude": -110.753539131839,
    "longitude": 39.6031976566032
  },
  {
    "ident": "FFU",
    "class": "H-VORTACW",
    "name": "FAIRFIELD",
    "type": 8,
    "latitude": -111.940543070172,
    "longitude": 40.2749007007574
  },
  {
    "ident": "PVU",
    "class": "T-VORW/DME",
    "name": "PROVO",
    "type": 6,
    "latitude": -111.72133107302,
    "longitude": 40.2149423776915
  },
  {
    "ident": "TCH",
    "class": "H-VORTACW",
    "name": "WASATCH",
    "type": 8,
    "latitude": -111.981924266286,
    "longitude": 40.850256318028
  },
  {
    "ident": "UTI",
    "class": "T-VORW/DME",
    "name": "ST GEORGE",
    "type": 6,
    "latitude": -113.517911612135,
    "longitude": 37.0176249316439
  },
  {
    "ident": "VEL",
    "class": "L-VORW/DME",
    "name": "VERNAL",
    "type": 6,
    "latitude": -109.493313409057,
    "longitude": 40.3790425655636
  },
  {
    "ident": "GZG",
    "class": "L-VOR/DME",
    "name": "GLADE SPRING",
    "type": 6,
    "latitude": -82.0789828702329,
    "longitude": 36.8251138348356
  },
  {
    "ident": "TEC",
    "class": "MHW",
    "name": "TECH",
    "type": 3,
    "latitude": -80.4034387801456,
    "longitude": 37.2086123128423
  },
  {
    "ident": "BKT",
    "class": "MHW",
    "name": "BLACKSTONE",
    "type": 3,
    "latitude": -78.0445458347567,
    "longitude": 37.1274357179875
  },
  {
    "ident": "BRV",
    "class": "L-VORTAC",
    "name": "BROOKE",
    "type": 8,
    "latitude": -77.3528679150962,
    "longitude": 38.3362648818327
  },
  {
    "ident": "CCV",
    "class": "L-VORTACW",
    "name": "CAPE CHARLES",
    "type": 8,
    "latitude": -75.9976546610705,
    "longitude": 37.3475463924326
  },
  {
    "ident": "CSN",
    "class": "H-VORTACW",
    "name": "CASANOVA",
    "type": 8,
    "latitude": -77.8655019803155,
    "longitude": 38.6412099244699
  },
  {
    "ident": "MSQ",
    "class": "MHW",
    "name": "NAILR",
    "type": 3,
    "latitude": -77.9052872591208,
    "longitude": 38.4543318301558
  },
  {
    "ident": "DAN",
    "class": "L-VORW",
    "name": "DANVILLE",
    "type": 7,
    "latitude": -79.3367056417003,
    "longitude": 36.5688686097168
  },
  {
    "ident": "PSK",
    "class": "H-VORTACW",
    "name": "PULASKI",
    "type": 8,
    "latitude": -80.7129038661109,
    "longitude": 37.0877122759187
  },
  {
    "ident": "LY",
    "class": "MHW/LOM",
    "name": "BOJAR",
    "type": 3,
    "latitude": -79.2431334315568,
    "longitude": 37.2624298685467
  },
  {
    "ident": "FAK",
    "class": "H-VORTACW",
    "name": "FLAT ROCK",
    "type": 8,
    "latitude": -77.8282216253301,
    "longitude": 37.5285169202884
  },
  {
    "ident": "DAA",
    "class": "HW",
    "name": "DAVEE",
    "type": 3,
    "latitude": -77.1101081363188,
    "longitude": 38.6615971789785
  },
  {
    "ident": "FKN",
    "class": "L-VORTACW",
    "name": "FRANKLIN",
    "type": 8,
    "latitude": -77.0123793842975,
    "longitude": 36.7142448347441
  },
  {
    "ident": "EZF",
    "class": "MHW",
    "name": "SHANNON",
    "type": 3,
    "latitude": -77.4505115521504,
    "longitude": 38.2663556979499
  },
  {
    "ident": "GVE",
    "class": "H-VORTAC",
    "name": "GORDONSVILLE",
    "type": 8,
    "latitude": -78.1530273087835,
    "longitude": 38.0136083970792
  },
  {
    "ident": "LFI",
    "class": "L-TACAN",
    "name": "LANGLEY",
    "type": 9,
    "latitude": -76.359404758969,
    "longitude": 37.0855629918375
  },
  {
    "ident": "HCM",
    "class": "L-VORTACW",
    "name": "HARCUM",
    "type": 8,
    "latitude": -76.7113559985428,
    "longitude": 37.4486674998023
  },
  {
    "ident": "AML",
    "class": "L-VORW/DME",
    "name": "ARMEL",
    "type": 6,
    "latitude": -77.4666977088426,
    "longitude": 38.9346041657051
  },
  {
    "ident": "HPW",
    "class": "L-VORTACW",
    "name": "HOPEWELL",
    "type": 8,
    "latitude": -77.1159458387638,
    "longitude": 37.328877460454
  },
  {
    "ident": "LVL",
    "class": "L-VORTACW",
    "name": "LAWRENCEVILLE",
    "type": 8,
    "latitude": -77.9029704970735,
    "longitude": 36.8180431582588
  },
  {
    "ident": "LDN",
    "class": "L-VORTACW",
    "name": "LINDEN",
    "type": 8,
    "latitude": -78.2055584878451,
    "longitude": 38.854399399308
  },
  {
    "ident": "LUA",
    "class": "MHW",
    "name": "CAVERNS",
    "type": 3,
    "latitude": -78.4716774492373,
    "longitude": 38.6995699129218
  },
  {
    "ident": "UV",
    "class": "MHW/LOM",
    "name": "BALES",
    "type": 3,
    "latitude": -79.9174538735973,
    "longitude": 36.5901016474783
  },
  {
    "ident": "MOL",
    "class": "L-VOR/DME",
    "name": "MONTEBELLO",
    "type": 6,
    "latitude": -79.1068920394962,
    "longitude": 37.9005322266718
  },
  {
    "ident": "NGU",
    "class": "L-TACAN",
    "name": "CHAMBERS",
    "type": 9,
    "latitude": -76.2772838918372,
    "longitude": 36.9400521298994
  },
  {
    "ident": "ORF",
    "class": "H-VORTAC",
    "name": "NORFOLK",
    "type": 8,
    "latitude": -76.2003255325175,
    "longitude": 36.8919071223218
  },
  {
    "ident": "VIT",
    "class": "MHW",
    "name": "VINTON",
    "type": 3,
    "latitude": -79.8816380659951,
    "longitude": 37.2040692761377
  },
  {
    "ident": "ODR",
    "class": "T-VORW",
    "name": "WOODRUM",
    "type": 7,
    "latitude": -79.978988935762,
    "longitude": 37.3242081860788
  },
  {
    "ident": "SBV",
    "class": "L-VORTAC",
    "name": "SOUTH BOSTON",
    "type": 8,
    "latitude": -79.0145019389716,
    "longitude": 36.6750458658658
  },
  {
    "ident": "NTU",
    "class": "H-TACAN",
    "name": "OCEANA",
    "type": 9,
    "latitude": -76.0370424235094,
    "longitude": 36.8242287804888
  },
  {
    "ident": "AKQ",
    "class": "MHW",
    "name": "WAKEFIELD",
    "type": 3,
    "latitude": -77.0009746732889,
    "longitude": 36.982826280899
  },
  {
    "ident": "MPV",
    "class": "L-VORW/DME",
    "name": "MONTPELIER",
    "type": 6,
    "latitude": -72.4493778253689,
    "longitude": 44.0854917241348
  },
  {
    "ident": "BTV",
    "class": "L-VORW/DME",
    "name": "BURLINGTON",
    "type": 6,
    "latitude": -73.182631145579,
    "longitude": 44.3971153644859
  },
  {
    "ident": "DYO",
    "class": "MHW",
    "name": "SMUTO",
    "type": 3,
    "latitude": -72.956602967377,
    "longitude": 43.7061563593494
  },
  {
    "ident": "BTG",
    "class": "H-VORTACW",
    "name": "BATTLE GROUND",
    "type": 8,
    "latitude": -122.591551183375,
    "longitude": 45.7478165977816
  },
  {
    "ident": "HUH",
    "class": "H-VORTACW",
    "name": "WHATCOM",
    "type": 8,
    "latitude": -122.579270270156,
    "longitude": 48.9452912118247
  },
  {
    "ident": "BVS",
    "class": "MHW",
    "name": "SKAGIT/BAY VIEW",
    "type": 3,
    "latitude": -122.41843150966,
    "longitude": 48.4686048179772
  },
  {
    "ident": "CVV",
    "class": "L-VORW/DME",
    "name": "PENN COVE",
    "type": 6,
    "latitude": -122.724431780059,
    "longitude": 48.2447000495365
  },
  {
    "ident": "DPY",
    "class": "MHW",
    "name": "DEER PARK",
    "type": 3,
    "latitude": -117.426350792871,
    "longitude": 47.9677583916229
  },
  {
    "ident": "EPH",
    "class": "H-VORTACW",
    "name": "EPHRATA",
    "type": 8,
    "latitude": -119.424018239859,
    "longitude": 47.3779248069145
  },
  {
    "ident": "PAE",
    "class": "L-VORW/DME",
    "name": "PAINE",
    "type": 6,
    "latitude": -122.277816071873,
    "longitude": 47.9198395279142
  },
  {
    "ident": "FHR",
    "class": "MHW",
    "name": "FRIDAY HARBOR",
    "type": 3,
    "latitude": -123.023876339492,
    "longitude": 48.5121444736891
  },
  {
    "ident": "HQM",
    "class": "H-VORTACW",
    "name": "HOQUIAM",
    "type": 8,
    "latitude": -124.149283908578,
    "longitude": 46.9470459409602
  },
  {
    "ident": "MWH",
    "class": "H-VORW/DME",
    "name": "MOSES LAKE",
    "type": 6,
    "latitude": -119.316830960643,
    "longitude": 47.210869251694
  },
  {
    "ident": "MW",
    "class": "MHW/LOM",
    "name": "PELLY",
    "type": 3,
    "latitude": -119.274523708555,
    "longitude": 47.1157170280593
  },
  {
    "ident": "TOU",
    "class": "H-VORTACW",
    "name": "TATOOSH",
    "type": 8,
    "latitude": -124.627058753014,
    "longitude": 48.2999045601967
  },
  {
    "ident": "NUW",
    "class": "H-TACAN",
    "name": "WHIDBEY ISLAND",
    "type": 9,
    "latitude": -122.661802074877,
    "longitude": 48.3549408959828
  },
  {
    "ident": "OLM",
    "class": "H-VORTACW",
    "name": "OLYMPIA",
    "type": 8,
    "latitude": -122.901848167657,
    "longitude": 46.9716444102785
  },
  {
    "ident": "PSC",
    "class": "L-VORW/DME",
    "name": "PASCO",
    "type": 6,
    "latitude": -119.115730716138,
    "longitude": 46.2629892101978
  },
  {
    "ident": "CL",
    "class": "MHW/LOM",
    "name": "ELWHA",
    "type": 3,
    "latitude": -123.670266070383,
    "longitude": 48.150204938782
  },
  {
    "ident": "SEA",
    "class": "H-VORTACW",
    "name": "SEATTLE",
    "type": 8,
    "latitude": -122.309632349265,
    "longitude": 47.4353789430252
  },
  {
    "ident": "SKA",
    "class": "L-TACAN",
    "name": "FAIRCHILD",
    "type": 9,
    "latitude": -117.662083530144,
    "longitude": 47.6101255643052
  },
  {
    "ident": "GEG",
    "class": "H-VORTACW",
    "name": "SPOKANE",
    "type": 8,
    "latitude": -117.626899902175,
    "longitude": 47.5649519539445
  },
  {
    "ident": "ALW",
    "class": "L-VORW/DME",
    "name": "WALLA WALLA",
    "type": 6,
    "latitude": -118.29254942182,
    "longitude": 46.0869820599027
  },
  {
    "ident": "EAT",
    "class": "L-VORW/DME",
    "name": "WENATCHEE",
    "type": 6,
    "latitude": -120.210876992601,
    "longitude": 47.3997022240966
  },
  {
    "ident": "YKM",
    "class": "H-VORTACW",
    "name": "YAKIMA",
    "type": 8,
    "latitude": -120.444651011618,
    "longitude": 46.5702479814459
  },
  {
    "ident": "DLL",
    "class": "H-VORTAC",
    "name": "DELLS",
    "type": 8,
    "latitude": -89.7636287789307,
    "longitude": 43.550839949314
  },
  {
    "ident": "VOK",
    "class": "L-TACAN",
    "name": "VOLK",
    "type": 9,
    "latitude": -90.2590067484071,
    "longitude": 43.9428413693549
  },
  {
    "ident": "EAU",
    "class": "L-VORTACW",
    "name": "EAU CLAIRE",
    "type": 8,
    "latitude": -91.4785422250411,
    "longitude": 44.8976783813976
  },
  {
    "ident": "SG",
    "class": "MHW/LOM",
    "name": "DEPRE",
    "type": 3,
    "latitude": -88.1328589515162,
    "longitude": 44.3985260182038
  },
  {
    "ident": "GRB",
    "class": "H-VORTACW",
    "name": "GREEN BAY",
    "type": 8,
    "latitude": -88.1948625997987,
    "longitude": 44.5551685391833
  },
  {
    "ident": "JVL",
    "class": "L-VORW/DME",
    "name": "JANESVILLE",
    "type": 6,
    "latitude": -89.1052640310984,
    "longitude": 42.5580173276989
  },
  {
    "ident": "MSN",
    "class": "L-VORTACW",
    "name": "MADISON",
    "type": 8,
    "latitude": -89.3397033302831,
    "longitude": 43.1448429658694
  },
  {
    "ident": "OSH",
    "class": "L-VORTAC",
    "name": "OSHKOSH",
    "type": 8,
    "latitude": -88.5559381958552,
    "longitude": 43.9904403714935
  },
  {
    "ident": "CMY",
    "class": "MHW",
    "name": "MCCOY",
    "type": 3,
    "latitude": -90.6418543594697,
    "longitude": 43.9378310672807
  },
  {
    "ident": "CKB",
    "class": "L-VORW/DME",
    "name": "CLARKSBURG",
    "type": 6,
    "latitude": -80.2678652599036,
    "longitude": 39.2532266173283
  },
  {
    "ident": "EKN",
    "class": "L-VORTACW",
    "name": "ELKINS",
    "type": 8,
    "latitude": -80.0992757411914,
    "longitude": 38.9144435016629
  },
  {
    "ident": "RQY",
    "class": "HW",
    "name": "RANDOLPH COUNTY",
    "type": 3,
    "latitude": -79.8594181664147,
    "longitude": 38.8939512854335
  },
  {
    "ident": "ESL",
    "class": "L-VORW/DME",
    "name": "KESSEL",
    "type": 6,
    "latitude": -78.9895029210801,
    "longitude": 39.2255005532681
  },
  {
    "ident": "LW",
    "class": "MHW/LOM",
    "name": "BUSHI",
    "type": 3,
    "latitude": -80.4684393905027,
    "longitude": 37.7821840941741
  },
  {
    "ident": "MRB",
    "class": "L-VORTACW",
    "name": "MARTINSBURG",
    "type": 8,
    "latitude": -77.8483586890524,
    "longitude": 39.385580074093
  },
  {
    "ident": "RNL",
    "class": "L-VORW",
    "name": "RAINELLE",
    "type": 7,
    "latitude": -80.8065111722446,
    "longitude": 37.9753180085173
  },
  {
    "ident": "EVW",
    "class": "T-VORW/DME",
    "name": "EVANSTON",
    "type": 6,
    "latitude": -111.046778021921,
    "longitude": 41.2724939390231
  },
  {
    "ident": "FBR",
    "class": "L-VORW/DME",
    "name": "FORT BRIDGER",
    "type": 6,
    "latitude": -110.424072628719,
    "longitude": 41.3784462223435
  },
  {
    "ident": "GC",
    "class": "MHW/LOM",
    "name": "DERYK",
    "type": 3,
    "latitude": -105.522244746569,
    "longitude": 44.2709116800074
  },
  {
    "ident": "GCC",
    "class": "H-VORW/DME",
    "name": "GILLETTE",
    "type": 6,
    "latitude": -105.543495875039,
    "longitude": 44.3477780762933
  },
  {
    "ident": "GEY",
    "class": "MHW",
    "name": "GREYBULL",
    "type": 3,
    "latitude": -108.082926768216,
    "longitude": 44.51152510066
  },
  {
    "ident": "GYZ",
    "class": "HW",
    "name": "CAMP GUERNSEY",
    "type": 3,
    "latitude": -104.714292862343,
    "longitude": 42.2399292721321
  },
  {
    "ident": "JAC",
    "class": "L-VORW/DME",
    "name": "JACKSON",
    "type": 6,
    "latitude": -110.731697200435,
    "longitude": 43.6210439424756
  },
  {
    "ident": "LAR",
    "class": "L-VORW/DME",
    "name": "LARAMIE",
    "type": 6,
    "latitude": -105.720942975294,
    "longitude": 41.3378265796177
  },
  {
    "ident": "MBW",
    "class": "L-VORW/DME",
    "name": "MEDICINE BOW",
    "type": 6,
    "latitude": -106.004294497804,
    "longitude": 41.8455288450222
  },
  {
    "ident": "ECS",
    "class": "L-VORW",
    "name": "NEWCASTLE",
    "type": 7,
    "latitude": -104.307780505739,
    "longitude": 43.8811333996902
  },
  {
    "ident": "RIW",
    "class": "L-VORW/DME",
    "name": "RIVERTON",
    "type": 6,
    "latitude": -108.455544951077,
    "longitude": 43.0657382413998
  },
  {
    "ident": "OCS",
    "class": "H-VORW/DME",
    "name": "ROCK SPRINGS",
    "type": 6,
    "latitude": -109.015339857503,
    "longitude": 41.5902174690186
  },
  {
    "ident": "SHR",
    "class": "H-VORW/DME",
    "name": "SHERIDAN",
    "type": 6,
    "latitude": -107.06111159082,
    "longitude": 44.8423068927725
  },
  {
    "ident": "TOR",
    "class": "MHW",
    "name": "TORRINGTON",
    "type": 3,
    "latitude": -104.153371872355,
    "longitude": 42.0657856811777
  },
  {
    "ident": "RLY",
    "class": "L-VORW/DME",
    "name": "WORLAND",
    "type": 6,
    "latitude": -107.950851369457,
    "longitude": 43.9641450513288
  },
  {
    "ident": "ZTC",
    "class": "VORW/DME",
    "name": "TREASURE CAY",
    "type": 6,
    "latitude": -77.3791685434592,
    "longitude": 26.7347272138678
  },
  {
    "ident": "ROR",
    "class": "HW/DME",
    "name": "KOROR",
    "type": 4,
    "latitude": 134.550300754134,
    "longitude": 7.36877597427396
  },
  {
    "ident": "ZBV",
    "class": "H-VORTAC",
    "name": "BIMINI",
    "type": 8,
    "latitude": -79.2944468592634,
    "longitude": 25.7041713546514
  },
  {
    "ident": "ZFP",
    "class": "H-VORW/DME",
    "name": "FREEPORT",
    "type": 6,
    "latitude": -78.6978494841695,
    "longitude": 26.5553521390492
  },
  {
    "ident": "NDJ",
    "class": "HW",
    "name": "BUCHOLZ",
    "type": 3,
    "latitude": 167.727744804754,
    "longitude": 8.72088188763902
  },
  {
    "ident": "YXU",
    "class": "BTVOR/DME",
    "name": "LONDON",
    "type": 6,
    "latitude": -81.1489336096987,
    "longitude": 43.0379189491956
  },
  {
    "ident": "MAJ",
    "class": "HW/DME",
    "name": "MAJURO",
    "type": 4,
    "latitude": 171.281738404687,
    "longitude": 7.06886807802528
  },
  {
    "ident": "ZQA",
    "class": "H-VORW/DME",
    "name": "NASSAU",
    "type": 6,
    "latitude": -77.446429630498,
    "longitude": 25.0255267722125
  },
  {
    "ident": "YOC",
    "class": "MHW",
    "name": "OLD CROW",
    "type": 3,
    "latitude": -139.846266996901,
    "longitude": 67.5711777318196
  },
  {
    "ident": "PNI",
    "class": "HW",
    "name": "POHNPEI",
    "type": 4,
    "latitude": 158.202061008342,
    "longitude": 6.98233691481139
  },
  {
    "ident": "ZSJ",
    "class": "MHW",
    "name": "SAN SALVADOR",
    "type": 3,
    "latitude": -74.5348120710199,
    "longitude": 24.0615654619345
  },
  {
    "ident": "YVR",
    "class": "H-VORW/DME",
    "name": "VANCOUVER",
    "type": 6,
    "latitude": -123.149102896271,
    "longitude": 49.0773319855051
  },
  {
    "ident": "YP",
    "class": "HW/DME",
    "name": "YAP",
    "type": 4,
    "latitude": 138.088465881503,
    "longitude": 9.49946511656425
  },
  {
    "ident": "NTD",
    "class": "L-TACAN",
    "name": "POINT MUGU",
    "type": 9,
    "latitude": -119.121987338588,
    "longitude": 34.1232884247816
  },
  {
    "ident": "VIO",
    "class": "H-VORW/DME",
    "name": "VICTORY",
    "type": 6,
    "latitude": -85.4970760367615,
    "longitude": 42.7867256264207
  },
  {
    "ident": "BJA",
    "class": "L-TACAN",
    "name": "BURLINGTON",
    "type": 9,
    "latitude": -73.1567653097251,
    "longitude": 44.4769423236448
  },
  {
    "ident": "LSU",
    "class": "L-VORTACW",
    "name": "FIGHTING TIGER",
    "type": 8,
    "latitude": -91.2940684662418,
    "longitude": 30.4851363206045
  },
  {
    "ident": "OTH",
    "class": "L-VORW/DME",
    "name": "NORTH BEND",
    "type": 6,
    "latitude": -124.16853568716,
    "longitude": 43.4155118610318
  },
  {
    "ident": "BC",
    "class": "HH",
    "name": "PROVIDENIYA BAY",
    "type": 3,
    "latitude": -173.241963875872,
    "longitude": 64.3769295812265
  },
  {
    "ident": "CJS",
    "class": "H",
    "name": "JUAREZ",
    "type": 6,
    "latitude": -106.426856949797,
    "longitude": 31.6361606757289
  },
  {
    "ident": "CUU",
    "class": "H",
    "name": "CHIHUAHUA",
    "type": 6,
    "latitude": -105.958742808697,
    "longitude": 28.7163879702991
  },
  {
    "ident": "DGO",
    "class": "H",
    "name": "DURANGO",
    "type": 6,
    "latitude": -104.516425687718,
    "longitude": 24.1380093895328
  },
  {
    "ident": "ENS",
    "class": "H",
    "name": "ENSENADA",
    "type": 3,
    "latitude": -116.606953412575,
    "longitude": 31.7959157862233
  },
  {
    "ident": "LA",
    "class": "HH",
    "name": "LAVRENTIYA ZALIV",
    "type": 3,
    "latitude": -171.007521395423,
    "longitude": 65.5841517835622
  },
  {
    "ident": "MK",
    "class": "HH",
    "name": "MALKA",
    "type": 3,
    "latitude": 157.536112100603,
    "longitude": 53.3258180922149
  },
  {
    "ident": "MAM",
    "class": "H",
    "name": "MATAMOROS",
    "type": 6,
    "latitude": -97.5239129626992,
    "longitude": 25.7708431920086
  },
  {
    "ident": "MTY",
    "class": "H",
    "name": "MONTERREY",
    "type": 6,
    "latitude": -100.103830252661,
    "longitude": 25.772779243941
  },
  {
    "ident": "MOV",
    "class": "H",
    "name": "MONCLOVA",
    "type": 6,
    "latitude": -101.471047283245,
    "longitude": 26.9555044474136
  },
  {
    "ident": "MXL",
    "class": "H",
    "name": "MEXICALI",
    "type": 6,
    "latitude": -115.23760322523,
    "longitude": 32.6310604075246
  },
  {
    "ident": "NK",
    "class": "HH",
    "name": "NIKOLSKOYE",
    "type": 3,
    "latitude": 166.04721805386,
    "longitude": 55.1733182163582
  },
  {
    "ident": "NLD",
    "class": "H",
    "name": "NEWLA",
    "type": 6,
    "latitude": -99.5645912851412,
    "longitude": 27.4393934855582
  },
  {
    "ident": "PNG",
    "class": "H",
    "name": "PIEDRAS",
    "type": 6,
    "latitude": -100.538394344479,
    "longitude": 28.6318492414232
  },
  {
    "ident": "PPE",
    "class": "H",
    "name": "PENASCO",
    "type": 6,
    "latitude": -113.301388894441,
    "longitude": 31.3672769913525
  },
  {
    "ident": "REX",
    "class": "H",
    "name": "REYNOSA",
    "type": 6,
    "latitude": -98.231877024503,
    "longitude": 26.0106348964041
  },
  {
    "ident": "SLW",
    "class": "H",
    "name": "SALTILLO",
    "type": 6,
    "latitude": -100.929819333418,
    "longitude": 25.5461180693279
  },
  {
    "ident": "TRC",
    "class": "H",
    "name": "TORREON",
    "type": 6,
    "latitude": -103.408417130341,
    "longitude": 25.5639680185346
  },
  {
    "ident": "TIJ",
    "class": "H",
    "name": "TIJUANA",
    "type": 6,
    "latitude": -116.952711852687,
    "longitude": 32.5404464204078
  },
  {
    "ident": "UK",
    "class": "HH",
    "name": "UST-KAMCHATSK",
    "type": 3,
    "latitude": 162.687775785434,
    "longitude": 56.2238739137979
  },
  {
    "ident": "UB",
    "class": "HH",
    "name": "UST-BOLSHERETSK",
    "type": 3,
    "latitude": 156.267501598695,
    "longitude": 52.8163741127073
  },
  {
    "ident": "UKS",
    "class": "MH",
    "name": "KOSRAE",
    "type": 4,
    "latitude": 162.956898353145,
    "longitude": 5.35307750573813
  },
  {
    "ident": "XI",
    "class": "MH",
    "name": "CHRISTMAS ISLAND",
    "type": 3,
    "latitude": -157.354737952737,
    "longitude": 1.98333762732892
  },
  {
    "ident": "IMB",
    "class": "H-VORW/DME",
    "name": "KIMBERLY",
    "type": 6,
    "latitude": -119.711645214691,
    "longitude": 44.6483973723873
  },
  {
    "ident": "SB",
    "class": "HW",
    "name": "PETIS",
    "type": 3,
    "latitude": -117.366126205508,
    "longitude": 34.0564768500236
  },
  {
    "ident": "DCA",
    "class": "MHW",
    "name": "OXONN",
    "type": 3,
    "latitude": -77.0273964509131,
    "longitude": 38.7659491481792
  },
  {
    "ident": "ALO",
    "class": "L-VORW/DME",
    "name": "WATERLOO",
    "type": 6,
    "latitude": -92.3989310878385,
    "longitude": 42.5565043493474
  },
  {
    "ident": "AVE",
    "class": "H-VORW/DME",
    "name": "AVENAL",
    "type": 6,
    "latitude": -119.978618168806,
    "longitude": 35.6469804744522
  },
  {
    "ident": "PUW",
    "class": "L-VORW/DME",
    "name": "PULLMAN",
    "type": 6,
    "latitude": -117.223517128298,
    "longitude": 46.6742461000753
  },
  {
    "ident": "MGR",
    "class": "L-DME",
    "name": "MOULTRIE",
    "type": 5,
    "latitude": -83.8042314068598,
    "longitude": 31.0822761450411
  },
  {
    "ident": "TBD",
    "class": "L-VOR/DME",
    "name": "TIBBY",
    "type": 6,
    "latitude": -90.8290988611927,
    "longitude": 29.6643275486477
  },
  {
    "ident": "SVC",
    "class": "L-VOR/DME",
    "name": "SILVER CITY",
    "type": 6,
    "latitude": -108.161077387312,
    "longitude": 32.6376904730507
  },
  {
    "ident": "GOG",
    "class": "H-DME",
    "name": "GOODSPRINGS",
    "type": 5,
    "latitude": -115.496095202952,
    "longitude": 35.8942552283867
  },
  {
    "ident": "PNN",
    "class": "L-DME",
    "name": "PRINCETON",
    "type": 5,
    "latitude": -67.7041926931353,
    "longitude": 45.3292084853234
  },
  {
    "ident": "PGS",
    "class": "H-VORW/DME",
    "name": "PEACH SPRINGS",
    "type": 6,
    "latitude": -113.544478149068,
    "longitude": 35.6247172609326
  },
  {
    "ident": "LOZ",
    "class": "H-VOR/DME",
    "name": "LONDON",
    "type": 6,
    "latitude": -84.1100790397617,
    "longitude": 37.0331574036729
  },
  {
    "ident": "OAK",
    "class": "H-VORW/DME",
    "name": "OAKLAND",
    "type": 6,
    "latitude": -122.223599013178,
    "longitude": 37.7259277324209
  },
  {
    "ident": "PYE",
    "class": "H-VORW/DME",
    "name": "POINT REYES",
    "type": 6,
    "latitude": -122.867840817564,
    "longitude": 38.0797616028287
  },
  {
    "ident": "OSI",
    "class": "L-VORW/DME",
    "name": "WOODSIDE",
    "type": 6,
    "latitude": -122.281315928913,
    "longitude": 37.3925049223719
  },
  {
    "ident": "AHN",
    "class": "L-VOR/DME",
    "name": "ATHENS",
    "type": 6,
    "latitude": -83.3247627938858,
    "longitude": 33.9476001271315
  },
  {
    "ident": "VUH",
    "class": "H-VORW/DME",
    "name": "SCHOLES",
    "type": 6,
    "latitude": -94.8677321310675,
    "longitude": 29.2693395563829
  },
  {
    "ident": "LRP",
    "class": "T-VORW/DME",
    "name": "LANCASTER",
    "type": 6,
    "latitude": -76.2912974157195,
    "longitude": 40.1199836128052
  },
  {
    "ident": "SRQ",
    "class": "H-VOR/DME",
    "name": "SARASOTA",
    "type": 6,
    "latitude": -82.5636600820344,
    "longitude": 27.407021427264
  },
  {
    "ident": "PZD",
    "class": "L-VORW/DME",
    "name": "PECAN",
    "type": 6,
    "latitude": -84.29310462859,
    "longitude": 31.6552118129424
  },
  {
    "ident": "GRI",
    "class": "L-VORW/DME",
    "name": "GRAND ISLAND",
    "type": 6,
    "latitude": -98.3147863951608,
    "longitude": 40.9840348315944
  },
  {
    "ident": "SNY",
    "class": "H-VOR/DME",
    "name": "SIDNEY",
    "type": 6,
    "latitude": -102.983009798386,
    "longitude": 41.096673414763
  },
  {
    "ident": "SAU",
    "class": "L-VORW/DME",
    "name": "SAUSALITO",
    "type": 6,
    "latitude": -122.522765461971,
    "longitude": 37.8553391102326
  },
  {
    "ident": "LMN",
    "class": "H-VOR/DME",
    "name": "LAMONI",
    "type": 6,
    "latitude": -93.9676026964294,
    "longitude": 40.5967536578635
  },
  {
    "ident": "PVD",
    "class": "H-VORW/DME",
    "name": "PROVIDENCE",
    "type": 6,
    "latitude": -71.4296392864634,
    "longitude": 41.7243527067765
  },
  {
    "ident": "ELD",
    "class": "H-VORW/DME",
    "name": "EL DORADO",
    "type": 6,
    "latitude": -92.7439542769587,
    "longitude": 33.2561598906377
  },
  {
    "ident": "FLW",
    "class": "L-VOR/DME",
    "name": "FELLOWS",
    "type": 6,
    "latitude": -119.865591154132,
    "longitude": 35.0930893143185
  },
  {
    "ident": "LIN",
    "class": "H-VORW/DME",
    "name": "LINDEN",
    "type": 6,
    "latitude": -121.003870811569,
    "longitude": 38.0745934064204
  },
  {
    "ident": "BRL",
    "class": "L-VORW/DME",
    "name": "BURLINGTON",
    "type": 6,
    "latitude": -90.925896308319,
    "longitude": 40.7234633027837
  },
  {
    "ident": "MCW",
    "class": "H-VORW/DME",
    "name": "MASON CITY",
    "type": 6,
    "latitude": -93.3298800246615,
    "longitude": 43.0947638176028
  },
  {
    "ident": "FAR",
    "class": "H-VORW/DME",
    "name": "FARGO",
    "type": 6,
    "latitude": -96.8513268098745,
    "longitude": 46.7533468611746
  },
  {
    "ident": "ELN",
    "class": "H-VORW/DME",
    "name": "ELLENSBURG",
    "type": 6,
    "latitude": -120.458428337517,
    "longitude": 47.0243805079319
  },
  {
    "ident": "TOI",
    "class": "MHW",
    "name": "BLOOD",
    "type": 3,
    "latitude": -86.1062384865181,
    "longitude": 31.8307995683681
  },
  {
    "ident": "BUA",
    "class": "T-DME",
    "name": "BUFFALO",
    "type": 5,
    "latitude": -103.456381125248,
    "longitude": 45.5522092269792
  },
  {
    "ident": "TNV",
    "class": "H-VORW/DME",
    "name": "NAVASOTA",
    "type": 6,
    "latitude": -96.0582472032639,
    "longitude": 30.2885316692752
  },
  {
    "ident": "SHB",
    "class": "L-VOR/DME",
    "name": "SHELBYVILLE",
    "type": 6,
    "latitude": -85.8243214035295,
    "longitude": 39.632550047751
  },
  {
    "ident": "CNG",
    "class": "L-VORW/DME",
    "name": "CUNNINGHAM",
    "type": 6,
    "latitude": -88.8369184557914,
    "longitude": 37.0086160749019
  },
  {
    "ident": "CON",
    "class": "L-VORW/DME",
    "name": "CONCORD",
    "type": 6,
    "latitude": -71.5754538685614,
    "longitude": 43.2197957618912
  },
  {
    "ident": "LVT",
    "class": "L-VOR/DME",
    "name": "LIVINGSTON",
    "type": 6,
    "latitude": -85.1666276528519,
    "longitude": 36.5845164346175
  },
  {
    "ident": "EHK",
    "class": "H-VORW/DME",
    "name": "ENOCH",
    "type": 6,
    "latitude": -113.06824216293,
    "longitude": 37.7873356091579
  },
  {
    "ident": "RHI",
    "class": "L-VOR/DME",
    "name": "RHINELANDER",
    "type": 6,
    "latitude": -89.457794503605,
    "longitude": 45.6337833473325
  },
  {
    "ident": "PHK",
    "class": "H-VORW/DME",
    "name": "PAHOKEE",
    "type": 6,
    "latitude": -80.6914353535551,
    "longitude": 26.7827474290369
  },
  {
    "ident": "CTB",
    "class": "L-VORW/DME",
    "name": "CUT BANK",
    "type": 6,
    "latitude": -112.343267686862,
    "longitude": 48.5649553598524
  },
  {
    "ident": "AN",
    "class": "MHW/LOM",
    "name": "BOGGA",
    "type": 3,
    "latitude": -85.9312751901316,
    "longitude": 33.5343446637729
  },
  {
    "ident": "GVR",
    "class": "H-DME",
    "name": "HANOVER",
    "type": 5,
    "latitude": -85.4706492849265,
    "longitude": 38.7583462898862
  },
  {
    "ident": "AG",
    "class": "LOMW",
    "name": "BUSHE",
    "type": 3,
    "latitude": -81.946856524351,
    "longitude": 33.2868919771987
  },
  {
    "ident": "BR",
    "class": "MHW/LOM",
    "name": "LAREW",
    "type": 3,
    "latitude": -94.0224381842137,
    "longitude": 46.4566284262618
  },
  {
    "ident": "BZ",
    "class": "MHW/LOM",
    "name": "MANNI",
    "type": 3,
    "latitude": -111.285621885649,
    "longitude": 45.8719591168155
  },
  {
    "ident": "BR",
    "class": "LOMW",
    "name": "DEPOO",
    "type": 3,
    "latitude": -97.509102682993,
    "longitude": 25.9836660145873
  },
  {
    "ident": "NHK",
    "class": "L-TACAN",
    "name": "NAS PATUXENT RIVER",
    "type": 9,
    "latitude": -76.410627063351,
    "longitude": 38.2810437938609
  },
  {
    "ident": "HYK",
    "class": "L-VOR/DME",
    "name": "LEXINGTON",
    "type": 6,
    "latitude": -84.4725214326543,
    "longitude": 37.9663561832788
  },
  {
    "ident": "HCH",
    "class": "L-VOR/DME",
    "name": "HINCH MOUNTAIN",
    "type": 6,
    "latitude": -84.9784567127008,
    "longitude": 35.7810198921077
  },
  {
    "ident": "HRK",
    "class": "T-DME",
    "name": "HORLICK",
    "type": 5,
    "latitude": -87.8147336732345,
    "longitude": 42.7621774367241
  },
  {
    "ident": "ENW",
    "class": "T-DME",
    "name": "KENOSHA",
    "type": 5,
    "latitude": -87.9317325796485,
    "longitude": 42.5990671257332
  },
  {
    "ident": "FF",
    "class": "MHW/LOM",
    "name": "HAMRE",
    "type": 3,
    "latitude": -96.0576934459974,
    "longitude": 46.2198243523614
  },
  {
    "ident": "CW",
    "class": "LOMW",
    "name": "MOSSY",
    "type": 3,
    "latitude": -93.1962034077195,
    "longitude": 30.3066420515229
  },
  {
    "ident": "CFB",
    "class": "L-VOR/DME",
    "name": "BINGHAMTON",
    "type": 6,
    "latitude": -76.1364736154323,
    "longitude": 42.1574959533885
  },
  {
    "ident": "ECK",
    "class": "H-TACAN",
    "name": "PECK",
    "type": 9,
    "latitude": -82.7179338415128,
    "longitude": 43.2558939094355
  },
  {
    "ident": "JL",
    "class": "LOMW",
    "name": "LUNNS",
    "type": 3,
    "latitude": -94.5585797602208,
    "longitude": 37.2030699891977
  },
  {
    "ident": "HUW",
    "class": "L-DME",
    "name": "HUTTON",
    "type": 5,
    "latitude": -91.8999984617456,
    "longitude": 36.8713897890615
  },
  {
    "ident": "CRL",
    "class": "H-VOR/DME",
    "name": "CARLETON",
    "type": 6,
    "latitude": -83.4575878462426,
    "longitude": 42.0480358821315
  },
  {
    "ident": "IL",
    "class": "MHW/LOM",
    "name": "AIRBO",
    "type": 3,
    "latitude": -83.7381854951589,
    "longitude": 39.4930401213964
  },
  {
    "ident": "IOW",
    "class": "H-VOR/DME",
    "name": "IOWA CITY",
    "type": 6,
    "latitude": -91.6132593621309,
    "longitude": 41.5189678407741
  },
  {
    "ident": "INL",
    "class": "L-VORW/DME",
    "name": "INTERNATIONAL FALLS",
    "type": 6,
    "latitude": -93.4056861295239,
    "longitude": 48.5658068081866
  },
  {
    "ident": "BAE",
    "class": "H-VORW/DME",
    "name": "BADGER",
    "type": 6,
    "latitude": -88.2843505164844,
    "longitude": 43.1168610801692
  },
  {
    "ident": "JPU",
    "class": "L-VORW/DME",
    "name": "PARKERSBURG",
    "type": 6,
    "latitude": -81.3747667230594,
    "longitude": 39.4411874397203
  },
  {
    "ident": "DDD",
    "class": "L-DME",
    "name": "PORT CITY",
    "type": 5,
    "latitude": -91.1492858818847,
    "longitude": 41.3663070090659
  },
  {
    "ident": "ROA",
    "class": "L-VORW/DME",
    "name": "ROANOKE",
    "type": 6,
    "latitude": -80.0704003536329,
    "longitude": 37.3434701314817
  },
  {
    "ident": "VCN",
    "class": "L-VORW/DME",
    "name": "CEDAR LAKE",
    "type": 6,
    "latitude": -74.9671455729958,
    "longitude": 39.5376791004209
  },
  {
    "ident": "SEG",
    "class": "L-VORW/DME",
    "name": "SELINSGROVE",
    "type": 6,
    "latitude": -76.8840440359982,
    "longitude": 40.7908673315912
  },
  {
    "ident": "BLF",
    "class": "L-VOR/DME",
    "name": "BLUEFIELD",
    "type": 6,
    "latitude": -81.1942729125217,
    "longitude": 37.3064475795541
  },
  {
    "ident": "HVQ",
    "class": "H-VOR/DME",
    "name": "CHARLESTON",
    "type": 6,
    "latitude": -81.7699159320501,
    "longitude": 38.3496852652552
  },
  {
    "ident": "EWC",
    "class": "H-VOR/DME",
    "name": "ELLWOOD CITY",
    "type": 6,
    "latitude": -80.2115489686198,
    "longitude": 40.8249408107216
  },
  {
    "ident": "DPR",
    "class": "H-VORW/DME",
    "name": "DUPREE",
    "type": 6,
    "latitude": -101.715081441343,
    "longitude": 45.0781826473725
  },
  {
    "ident": "DKK",
    "class": "H-DME",
    "name": "DUNKIRK",
    "type": 5,
    "latitude": -79.2740993617801,
    "longitude": 42.4905758824152
  },
  {
    "ident": "GHM",
    "class": "L-DME",
    "name": "GRAHAM",
    "type": 5,
    "latitude": -87.4517677039807,
    "longitude": 35.8339284086908
  },
  {
    "ident": "UAM",
    "class": "H-TACAN",
    "name": "ANDERSEN",
    "type": 9,
    "latitude": 144.946575733801,
    "longitude": 13.5912262902602
  },
  {
    "ident": "JST",
    "class": "L-VORW/DME",
    "name": "JOHNSTOWN",
    "type": 6,
    "latitude": -78.8341693366666,
    "longitude": 40.3167335505921
  },
  {
    "ident": "ANV",
    "class": "HW",
    "name": "ANVIK",
    "type": 3,
    "latitude": -160.185357136553,
    "longitude": 62.6414584555704
  },
  {
    "ident": "BIE",
    "class": "T-VORW",
    "name": "BEATRICE",
    "type": 7,
    "latitude": -96.754653412005,
    "longitude": 40.3014345487741
  },
  {
    "ident": "BKW",
    "class": "H-VORW/DME",
    "name": "BECKLEY",
    "type": 6,
    "latitude": -81.1234590333764,
    "longitude": 37.7803071223815
  },
  {
    "ident": "JOT",
    "class": "H-VOR/DME",
    "name": "JOLIET",
    "type": 6,
    "latitude": -88.3184164748274,
    "longitude": 41.546426369332
  },
  {
    "ident": "MZV",
    "class": "L-VORW/DME",
    "name": "MOLINE",
    "type": 6,
    "latitude": -90.6382210090396,
    "longitude": 41.3209286984812
  },
  {
    "ident": "MMJ",
    "class": "L-DME",
    "name": "MONTOUR",
    "type": 5,
    "latitude": -80.1938367147789,
    "longitude": 40.4880079697359
  },
  {
    "ident": "CZF",
    "class": "H-DME",
    "name": "CAPE ROMANZOF",
    "type": 5,
    "latitude": -166.04345940989,
    "longitude": 61.776013444606
  },
  {
    "ident": "CZF",
    "class": "HW",
    "name": "CAPE ROMANZOF",
    "type": 3,
    "latitude": -165.970082486233,
    "longitude": 61.7903773434347
  },
  {
    "ident": "LBF",
    "class": "L-VORW/DME",
    "name": "NORTH PLATTE",
    "type": 6,
    "latitude": -100.747106743408,
    "longitude": 41.0487124542617
  },
  {
    "ident": "SL",
    "class": "MHW",
    "name": "TURNO",
    "type": 3,
    "latitude": -122.951032998756,
    "longitude": 44.8474390087771
  },
  {
    "ident": "IJX",
    "class": "T-DME",
    "name": "JACKSONVILLE",
    "type": 5,
    "latitude": -90.2386115796266,
    "longitude": 39.7765284554576
  },
  {
    "ident": "HXW",
    "class": "L-TACAN",
    "name": "SCREAMING EAGLE",
    "type": 9,
    "latitude": -87.5111411098749,
    "longitude": 36.6593105128571
  },
  {
    "ident": "HVN",
    "class": "T-DME",
    "name": "NEW HAVEN",
    "type": 5,
    "latitude": -72.8851841770332,
    "longitude": 41.2623178462869
  },
  {
    "ident": "FLP",
    "class": "H-DME",
    "name": "FLIPPIN",
    "type": 5,
    "latitude": -92.4584057930443,
    "longitude": 36.2996504883417
  },
  {
    "ident": "LWV",
    "class": "T-DME",
    "name": "LAWRENCEVILLE",
    "type": 5,
    "latitude": -87.6038329624584,
    "longitude": 38.7698756327259
  },
  {
    "ident": "PSI",
    "class": "L-DME",
    "name": "PONTIAC",
    "type": 5,
    "latitude": -83.5327779295497,
    "longitude": 42.7008679373074
  },
  {
    "ident": "LJT",
    "class": "H-DME",
    "name": "TIMMERMAN",
    "type": 5,
    "latitude": -88.0372873875285,
    "longitude": 43.1097805374889
  },
  {
    "ident": "MGW",
    "class": "L-VOR/DME",
    "name": "MORGANTOWN",
    "type": 6,
    "latitude": -79.8604154339228,
    "longitude": 39.5567230826452
  },
  {
    "ident": "IWD",
    "class": "L-VORW/DME",
    "name": "IRONWOOD",
    "type": 6,
    "latitude": -90.1258573276678,
    "longitude": 46.5322648243005
  },
  {
    "ident": "RID",
    "class": "L-DME",
    "name": "RICHMOND",
    "type": 5,
    "latitude": -84.8388336220515,
    "longitude": 39.7550156745161
  },
  {
    "ident": "LYH",
    "class": "L-VORW/DME",
    "name": "LYNCHBURG",
    "type": 6,
    "latitude": -79.2363834290375,
    "longitude": 37.2545843111814
  },
  {
    "ident": "CEF",
    "class": "L-TACAN",
    "name": "WESTOVER",
    "type": 9,
    "latitude": -72.526314950248,
    "longitude": 42.1975530380675
  },
  {
    "ident": "BUU",
    "class": "T-DME",
    "name": "BURBUN",
    "type": 5,
    "latitude": -88.301785198417,
    "longitude": 42.6893318414507
  },
  {
    "ident": "RUT",
    "class": "T-DME",
    "name": "RUTLAND",
    "type": 5,
    "latitude": -72.9507229532422,
    "longitude": 43.5267779938588
  },
  {
    "ident": "GCO",
    "class": "L-DME",
    "name": "CHICAGO",
    "type": 5,
    "latitude": -87.9023336196645,
    "longitude": 41.9940967472078
  },
  {
    "ident": "VNN",
    "class": "L-DME",
    "name": "MOUNT VERNON",
    "type": 5,
    "latitude": -88.807342717908,
    "longitude": 38.3619610530096
  },
  {
    "ident": "GNP",
    "class": "T-DME",
    "name": "GLENPOOL",
    "type": 5,
    "latitude": -95.9686589164026,
    "longitude": 35.9209066324848
  },
  {
    "ident": "MTW",
    "class": "T-DME",
    "name": "MANITOWOC",
    "type": 5,
    "latitude": -87.6799240620289,
    "longitude": 44.1285068354482
  },
  {
    "ident": "SSI",
    "class": "L-VORTACW",
    "name": "BRUNSWICK",
    "type": 8,
    "latitude": -81.4459693323867,
    "longitude": 31.0505259331143
  },
  {
    "ident": "WYS",
    "class": "H-DME",
    "name": "WEST YELLOWSTONE",
    "type": 5,
    "latitude": -111.12818163066,
    "longitude": 44.675775959207
  },
  {
    "ident": "MTO",
    "class": "L-DME",
    "name": "MATTOON",
    "type": 5,
    "latitude": -88.286239329138,
    "longitude": 39.4778987840415
  },
  {
    "ident": "CSX",
    "class": "H-DME",
    "name": "CARDINAL",
    "type": 5,
    "latitude": -90.3609687452144,
    "longitude": 38.7527527116148
  },
  {
    "ident": "LSE",
    "class": "T-DME",
    "name": "LA CROSSE",
    "type": 5,
    "latitude": -91.2560003630461,
    "longitude": 43.8761318513311
  },
  {
    "ident": "MOT",
    "class": "H-VORW/DME",
    "name": "MINOT",
    "type": 6,
    "latitude": -101.287081623332,
    "longitude": 48.2603436167951
  },
  {
    "ident": "TRV",
    "class": "H-VORTACW",
    "name": "TREASURE",
    "type": 8,
    "latitude": -80.489728377273,
    "longitude": 27.6784290445368
  },
  {
    "ident": "BQM",
    "class": "T-DME",
    "name": "BOWMAN",
    "type": 5,
    "latitude": -85.6647495797115,
    "longitude": 38.2302267349952
  },
  {
    "ident": "ISQ",
    "class": "H-DME",
    "name": "SCHOOLCRAFT COUNTY",
    "type": 5,
    "latitude": -86.1734421569144,
    "longitude": 45.9763436063107
  },
  {
    "ident": "GTH",
    "class": "L-DME",
    "name": "GUTHRIE",
    "type": 5,
    "latitude": -100.336204854897,
    "longitude": 33.7782829804287
  },
  {
    "ident": "IDQ",
    "class": "H-DME",
    "name": "COTTONWOOD",
    "type": 5,
    "latitude": -116.464763524632,
    "longitude": 46.0654783530596
  },
  {
    "ident": "ASP",
    "class": "H-DME",
    "name": "AU SABLE",
    "type": 5,
    "latitude": -83.3942880605618,
    "longitude": 44.4491365764247
  },
  {
    "ident": "TPL",
    "class": "L-DME",
    "name": "TEMPLE",
    "type": 5,
    "latitude": -97.4249745380385,
    "longitude": 31.2093412439633
  },
  {
    "ident": "GRV",
    "class": "L-DME",
    "name": "GRANTSVILLE",
    "type": 5,
    "latitude": -79.0505307454941,
    "longitude": 39.6350389643438
  },
  {
    "ident": "CNT",
    "class": "H-DME",
    "name": "CURRANT",
    "type": 5,
    "latitude": -115.598901073884,
    "longitude": 38.6683388612541
  },
  {
    "ident": "LWL",
    "class": "L-VOR/DME",
    "name": "WELLS",
    "type": 6,
    "latitude": -114.977523782549,
    "longitude": 41.1448074978419
  },
  {
    "ident": "AMF",
    "class": "HW",
    "name": "AMBLER",
    "type": 3,
    "latitude": -157.860177684367,
    "longitude": 67.1052423335558
  },
  {
    "ident": "ODF",
    "class": "H-VORW/DME",
    "name": "FOOTHILLS",
    "type": 6,
    "latitude": -83.2976650484681,
    "longitude": 34.695879454899
  },
  {
    "ident": "RIC",
    "class": "H-VORTACW",
    "name": "RICHMOND",
    "type": 8,
    "latitude": -77.3202803564973,
    "longitude": 37.5023561003009
  },
  {
    "ident": "NGP",
    "class": "L-TACAN",
    "name": "TRUAX",
    "type": 9,
    "latitude": -97.2947507394001,
    "longitude": 27.6862816539274
  },
  {
    "ident": "WRB",
    "class": "T-TACAN",
    "name": "ROBINS",
    "type": 9,
    "latitude": -83.5905594721865,
    "longitude": 32.6411173332739
  },
  {
    "ident": "VLA",
    "class": "L-VORW/DME",
    "name": "VANDALIA",
    "type": 6,
    "latitude": -89.1622501027614,
    "longitude": 39.0938464469655
  },
  {
    "ident": "TDT",
    "class": "L-DME",
    "name": "TIDIOUTE",
    "type": 5,
    "latitude": -79.4172737896556,
    "longitude": 41.7130401775104
  },
  {
    "ident": "GNL",
    "class": "L-DME",
    "name": "GROESBECK",
    "type": 5,
    "latitude": -96.5490968372482,
    "longitude": 31.5814821844741
  },
  {
    "ident": "ELO",
    "class": "L-DME",
    "name": "ELY",
    "type": 5,
    "latitude": -91.8301480347126,
    "longitude": 47.8219082175192
  },
  {
    "ident": "JXN",
    "class": "H-DME",
    "name": "JACKSON",
    "type": 5,
    "latitude": -84.4585542817302,
    "longitude": 42.2592478122951
  },
  {
    "ident": "SGH",
    "class": "T-DME",
    "name": "SPRINGFIELD",
    "type": 5,
    "latitude": -83.8449599990398,
    "longitude": 39.8365485141612
  },
  {
    "ident": "HYR",
    "class": "L-DME",
    "name": "HAYWARD",
    "type": 5,
    "latitude": -91.4464032024927,
    "longitude": 46.0190152146066
  },
  {
    "ident": "CZQ",
    "class": "H-TACAN",
    "name": "CLOVIS",
    "type": 9,
    "latitude": -119.815157155102,
    "longitude": 36.8843272712777
  },
  {
    "ident": "OT",
    "class": "HW",
    "name": "EMIRE",
    "type": 3,
    "latitude": -124.310287925855,
    "longitude": 43.3944565682179
  },
  {
    "ident": "EWA",
    "class": "L-DME",
    "name": "KEWANEE",
    "type": 5,
    "latitude": -88.4571719501015,
    "longitude": 32.3676726557193
  },
  {
    "ident": "LMX",
    "class": "H-DME",
    "name": "ALAMO",
    "type": 5,
    "latitude": -115.193070295719,
    "longitude": 37.3623451369442
  },
  {
    "ident": "HAB",
    "class": "L-DME",
    "name": "HAMILTON",
    "type": 5,
    "latitude": -88.0116235929438,
    "longitude": 34.1987761096265
  },
  {
    "ident": "TDG",
    "class": "L-DME",
    "name": "TALLADEGA",
    "type": 5,
    "latitude": -86.0426902240793,
    "longitude": 33.5751582791948
  },
  {
    "ident": "CCT",
    "class": "L-DME",
    "name": "CENTRAL CITY",
    "type": 5,
    "latitude": -87.2637088688534,
    "longitude": 37.3824287205381
  },
  {
    "ident": "CGI",
    "class": "L-DME",
    "name": "CAPE GIRARDEAU",
    "type": 5,
    "latitude": -89.5724170119398,
    "longitude": 37.2275460812104
  },
  {
    "ident": "CTW",
    "class": "L-DME",
    "name": "NEWCOMERSTOWN",
    "type": 5,
    "latitude": -81.4764804235591,
    "longitude": 40.2292164750783
  },
  {
    "ident": "BML",
    "class": "H-DME",
    "name": "BERLIN",
    "type": 5,
    "latitude": -71.1861924405982,
    "longitude": 44.633542421
  },
  {
    "ident": "ELZ",
    "class": "L-DME",
    "name": "WELLSVILLE",
    "type": 5,
    "latitude": -77.9995619826629,
    "longitude": 42.0896566974136
  },
  {
    "ident": "MLC",
    "class": "L-TACAN",
    "name": "MC ALESTER",
    "type": 9,
    "latitude": -95.7823515670799,
    "longitude": 34.8494470024297
  },
  {
    "ident": "UIM",
    "class": "L-DME",
    "name": "QUITMAN",
    "type": 5,
    "latitude": -95.3668985536687,
    "longitude": 32.880487484545
  },
  {
    "ident": "RZN",
    "class": "L-DME",
    "name": "SIREN",
    "type": 5,
    "latitude": -92.3745231689193,
    "longitude": 45.8204531774542
  },
  {
    "ident": "BWG",
    "class": "H-DME",
    "name": "BOWLING GREEN",
    "type": 5,
    "latitude": -86.4434388787219,
    "longitude": 36.9287481138006
  },
  {
    "ident": "ECB",
    "class": "L-DME",
    "name": "NEWCOMBE",
    "type": 5,
    "latitude": -82.9100587608183,
    "longitude": 38.1583699006919
  },
  {
    "ident": "BFD",
    "class": "L-DME",
    "name": "BRADFORD",
    "type": 5,
    "latitude": -78.619351599475,
    "longitude": 41.786394948766
  },
  {
    "ident": "IKK",
    "class": "L-DME",
    "name": "KANKAKEE",
    "type": 5,
    "latitude": -87.850169069306,
    "longitude": 41.0743863133823
  },
  {
    "ident": "BDE",
    "class": "L-DME",
    "name": "BAUDETTE",
    "type": 5,
    "latitude": -94.6072965118857,
    "longitude": 48.7228050679921
  },
  {
    "ident": "RBA",
    "class": "L-DME",
    "name": "ROBINSON",
    "type": 5,
    "latitude": -95.4235549562976,
    "longitude": 39.8509320584121
  },
  {
    "ident": "FAH",
    "class": "L-DME",
    "name": "FALLS",
    "type": 5,
    "latitude": -87.8487746265459,
    "longitude": 43.7687945453339
  },
  {
    "ident": "UKN",
    "class": "L-DME",
    "name": "WAUKON",
    "type": 5,
    "latitude": -91.5373689828093,
    "longitude": 43.2800934072737
  },
  {
    "ident": "GCV",
    "class": "H-VORTACW",
    "name": "GREENE COUNTY",
    "type": 8,
    "latitude": -88.4861341179904,
    "longitude": 31.0979654376252
  },
  {
    "ident": "LNR",
    "class": "H-DME",
    "name": "LONE ROCK",
    "type": 5,
    "latitude": -90.1331527459773,
    "longitude": 43.2944107195447
  },
  {
    "ident": "MKG",
    "class": "L-TACAN",
    "name": "MUSKEGON",
    "type": 9,
    "latitude": -86.0393834627418,
    "longitude": 43.1692609394494
  },
  {
    "ident": "URH",
    "class": "L-DME",
    "name": "TEXOMA",
    "type": 5,
    "latitude": -96.3918441618792,
    "longitude": 33.9441901405327
  },
  {
    "ident": "PAN",
    "class": "H-DME",
    "name": "PAYSON",
    "type": 5,
    "latitude": -111.335285935016,
    "longitude": 34.2544135996243
  },
  {
    "ident": "BRG",
    "class": "H-DME",
    "name": "BELEN",
    "type": 5,
    "latitude": -106.83306558301,
    "longitude": 34.6497277912275
  },
  {
    "ident": "ITH",
    "class": "L-DME",
    "name": "ITHACA",
    "type": 5,
    "latitude": -76.4597292986947,
    "longitude": 42.4950351701452
  },
  {
    "ident": "JEN",
    "class": "L-TACAN",
    "name": "GLEN ROSE",
    "type": 9,
    "latitude": -97.8776883155366,
    "longitude": 32.1595944632256
  },
  {
    "ident": "TKO",
    "class": "L-VORTACW",
    "name": "MANKATO",
    "type": 8,
    "latitude": -98.2600451393441,
    "longitude": 39.8064154866798
  },
  {
    "ident": "TCM",
    "class": "T-TACAN",
    "name": "MCCHORD",
    "type": 9,
    "latitude": -122.475053697139,
    "longitude": 47.147675020722
  },
  {
    "ident": "PKD",
    "class": "L-DME",
    "name": "PARK RAPIDS",
    "type": 5,
    "latitude": -95.0710182763304,
    "longitude": 46.8980939621628
  },
  {
    "ident": "AZQ",
    "class": "L-DME",
    "name": "HAZARD",
    "type": 5,
    "latitude": -83.263004091601,
    "longitude": 37.3912572333452
  },
  {
    "ident": "HON",
    "class": "L-DME",
    "name": "HURON",
    "type": 5,
    "latitude": -98.3110937894298,
    "longitude": 44.4400908848066
  },
  {
    "ident": "SUX",
    "class": "L-TACAN",
    "name": "SIOUX CITY",
    "type": 9,
    "latitude": -96.3236524215407,
    "longitude": 42.3445229487163
  },
  {
    "ident": "CIP",
    "class": "L-DME",
    "name": "CLARION",
    "type": 5,
    "latitude": -79.4579770917396,
    "longitude": 41.1463014590333
  },
  {
    "ident": "ANY",
    "class": "L-TACAN",
    "name": "ANTHONY",
    "type": 9,
    "latitude": -98.1707834714382,
    "longitude": 37.1589870073358
  },
  {
    "ident": "BWS",
    "class": "L-DME",
    "name": "BOLES",
    "type": 5,
    "latitude": -106.01316249203,
    "longitude": 32.8212664372879
  },
  {
    "ident": "LWB",
    "class": "H-DME",
    "name": "GREENBRIER",
    "type": 5,
    "latitude": -80.3918207614706,
    "longitude": 37.8638721687623
  },
  {
    "ident": "BER",
    "class": "H-TACAN",
    "name": "ADAK",
    "type": 9,
    "latitude": -176.674126999563,
    "longitude": 51.8712293948779
  },
  {
    "ident": "MWA",
    "class": "L-DME",
    "name": "MARION",
    "type": 5,
    "latitude": -89.0118091166457,
    "longitude": 37.7543859296484
  },
  {
    "ident": "LWM",
    "class": "L-DME",
    "name": "LAWRENCE",
    "type": 5,
    "latitude": -71.0948509028731,
    "longitude": 42.7404270771378
  },
  {
    "ident": "LEB",
    "class": "L-DME",
    "name": "LEBANON",
    "type": 5,
    "latitude": -72.2160746647956,
    "longitude": 43.6788652695431
  },
  {
    "ident": "MSS",
    "class": "H-TACAN",
    "name": "MASSENA",
    "type": 9,
    "latitude": -74.7227200294665,
    "longitude": 44.9144306744605
  },
  {
    "ident": "SLK",
    "class": "L-DME",
    "name": "SARANAC LAKE",
    "type": 5,
    "latitude": -74.2045078721203,
    "longitude": 44.3845689346793
  },
  {
    "ident": "HNN",
    "class": "H-DME",
    "name": "HENDERSON",
    "type": 5,
    "latitude": -82.0261713153292,
    "longitude": 38.7541322778685
  },
  {
    "ident": "DCU",
    "class": "L-DME",
    "name": "DECATUR",
    "type": 5,
    "latitude": -86.9395177621524,
    "longitude": 34.6483209675885
  },
  {
    "ident": "MAP",
    "class": "L-TACAN",
    "name": "MAPLES",
    "type": 9,
    "latitude": -91.7885762662839,
    "longitude": 37.5907721487544
  },
  {
    "ident": "STS",
    "class": "H-DME",
    "name": "SANTA ROSA",
    "type": 5,
    "latitude": -122.810630583042,
    "longitude": 38.5081916410257
  },
  {
    "ident": "UCA",
    "class": "L-TACAN",
    "name": "UTICA",
    "type": 9,
    "latitude": -75.1645239193883,
    "longitude": 43.0265228194386
  },
  {
    "ident": "GBG",
    "class": "T-DME",
    "name": "GALESBURG",
    "type": 5,
    "latitude": -90.4344700792407,
    "longitude": 40.9373508673866
  },
  {
    "ident": "GDV",
    "class": "H-DME",
    "name": "GLENDIVE",
    "type": 5,
    "latitude": -104.804750080652,
    "longitude": 47.1333795663114
  },
  {
    "ident": "BRW",
    "class": "H-VORW/DME",
    "name": "BARROW",
    "type": 6,
    "latitude": -156.78815183903,
    "longitude": 71.2734260545398
  },
  {
    "ident": "VIR",
    "class": "HW",
    "name": "BROWERVILLE",
    "type": 3,
    "latitude": -156.781302410579,
    "longitude": 71.2822999440429
  },
  {
    "ident": "FNX",
    "class": "H-DME",
    "name": "FAIRMONT",
    "type": 5,
    "latitude": -94.4132051174639,
    "longitude": 43.6377632725333
  },
  {
    "ident": "MCM",
    "class": "L-DME",
    "name": "MACON",
    "type": 5,
    "latitude": -92.482143305832,
    "longitude": 39.6540544200504
  },
  {
    "ident": "RFD",
    "class": "L-DME",
    "name": "ROCKFORD",
    "type": 5,
    "latitude": -89.1992784670491,
    "longitude": 42.2255856009653
  },
  {
    "ident": "HUL",
    "class": "H-DME",
    "name": "HOULTON",
    "type": 5,
    "latitude": -67.8341397221057,
    "longitude": 46.0395033277103
  },
  {
    "ident": "EEN",
    "class": "L-DME",
    "name": "KEENE",
    "type": 5,
    "latitude": -72.2917787997353,
    "longitude": 42.794286492498
  },
  {
    "ident": "MCG",
    "class": "H-VORTACW",
    "name": "MC GRATH",
    "type": 8,
    "latitude": -155.611404135716,
    "longitude": 62.9510327913618
  },
  {
    "ident": "VTR",
    "class": "HW",
    "name": "TAKOTNA RIVER",
    "type": 3,
    "latitude": -155.557333302703,
    "longitude": 62.9468580786803
  },
  {
    "ident": "MBL",
    "class": "L-DME",
    "name": "MANISTEE",
    "type": 5,
    "latitude": -86.2540500348453,
    "longitude": 44.2706499983399
  },
  {
    "ident": "GGT",
    "class": "L-TACAN",
    "name": "GEORGETOWN",
    "type": 9,
    "latitude": -75.8267493945189,
    "longitude": 42.7889644157294
  },
  {
    "ident": "HML",
    "class": "H-TACAN",
    "name": "HUMBOLDT",
    "type": 9,
    "latitude": -97.1179117078925,
    "longitude": 48.8691934919614
  },
  {
    "ident": "PSM",
    "class": "L-DME",
    "name": "PEASE",
    "type": 5,
    "latitude": -70.8319877805459,
    "longitude": 43.0844729840181
  },
  {
    "ident": "BUF",
    "class": "H-DME",
    "name": "BUFFALO",
    "type": 5,
    "latitude": -78.6463444766228,
    "longitude": 42.9290062676502
  },
  {
    "ident": "JFN",
    "class": "L-DME",
    "name": "JEFFERSON",
    "type": 5,
    "latitude": -80.7481147639783,
    "longitude": 41.760125404371
  },
  {
    "ident": "ERI",
    "class": "L-TACAN",
    "name": "ERIE",
    "type": 9,
    "latitude": -80.292701588098,
    "longitude": 42.0174051942587
  },
  {
    "ident": "EOS",
    "class": "H-DME",
    "name": "NEOSHO",
    "type": 5,
    "latitude": -94.4357080311209,
    "longitude": 36.8424549314432
  },
  {
    "ident": "IFI",
    "class": "H-TACAN",
    "name": "KINGFISHER",
    "type": 9,
    "latitude": -98.0039233168348,
    "longitude": 35.8052723400596
  },
  {
    "ident": "BGD",
    "class": "L-TACAN",
    "name": "BORGER",
    "type": 9,
    "latitude": -101.382161370935,
    "longitude": 35.8070785488795
  },
  {
    "ident": "LBL",
    "class": "H-TACAN",
    "name": "LIBERAL",
    "type": 9,
    "latitude": -100.971213045351,
    "longitude": 37.0444015507719
  },
  {
    "ident": "MON",
    "class": "L-DME",
    "name": "MONTICELLO",
    "type": 5,
    "latitude": -91.715445408431,
    "longitude": 33.5619863835139
  },
  {
    "ident": "OSW",
    "class": "L-DME",
    "name": "OSWEGO",
    "type": 5,
    "latitude": -95.2036407599134,
    "longitude": 37.1575177247615
  },
  {
    "ident": "DYR",
    "class": "L-TACAN",
    "name": "DYERSBURG",
    "type": 9,
    "latitude": -89.3176974089891,
    "longitude": 36.0185564166604
  },
  {
    "ident": "LDK",
    "class": "H-TACAN",
    "name": "CRIMSON",
    "type": 9,
    "latitude": -87.5368939624179,
    "longitude": 33.2588673224
  },
  {
    "ident": "MCN",
    "class": "H-DME",
    "name": "MACON",
    "type": 5,
    "latitude": -83.6471872679933,
    "longitude": 32.6911912313379
  },
  {
    "ident": "MNM",
    "class": "L-DME",
    "name": "MENOMINEE",
    "type": 5,
    "latitude": -87.6471713994767,
    "longitude": 45.1801611707883
  },
  {
    "ident": "OTG",
    "class": "L-DME",
    "name": "WORTHINGTON",
    "type": 5,
    "latitude": -95.5818421083574,
    "longitude": 43.6467831932385
  },
  {
    "ident": "SAM",
    "class": "L-DME",
    "name": "SAMSVILLE",
    "type": 5,
    "latitude": -88.0858119669705,
    "longitude": 38.485195278872
  },
  {
    "ident": "UUC",
    "class": "HW/DME",
    "name": "WINNIE",
    "type": 5,
    "latitude": -117.801951761718,
    "longitude": 40.9040222425424
  },
  {
    "ident": "MAW",
    "class": "L-TACAN",
    "name": "MALDEN",
    "type": 9,
    "latitude": -89.9114278896397,
    "longitude": 36.5551209373786
  },
  {
    "ident": "MSL",
    "class": "H-DME",
    "name": "MUSCLE SHOALS",
    "type": 5,
    "latitude": -87.4915223659575,
    "longitude": 34.7068751238748
  },
  {
    "ident": "FOD",
    "class": "H-TACAN",
    "name": "FORT DODGE",
    "type": 9,
    "latitude": -94.2948238454714,
    "longitude": 42.6111325686472
  },
  {
    "ident": "DYY",
    "class": "H-DME",
    "name": "DYER",
    "type": 5,
    "latitude": -118.008181378665,
    "longitude": 37.6117716350667
  },
  {
    "ident": "ELA",
    "class": "H-DME",
    "name": "EAGLE LAKE",
    "type": 5,
    "latitude": -96.3171297401883,
    "longitude": 29.6624845890012
  },
  {
    "ident": "ATY",
    "class": "L-TACAN",
    "name": "WATERTOWN",
    "type": 9,
    "latitude": -97.1417313324167,
    "longitude": 44.9796941023941
  },
  {
    "ident": "SLR",
    "class": "L-DME",
    "name": "SULPHUR SPRINGS",
    "type": 5,
    "latitude": -95.5427850073026,
    "longitude": 33.1986169820328
  },
  {
    "ident": "PWE",
    "class": "H-DME",
    "name": "PAWNEE CITY",
    "type": 5,
    "latitude": -96.2062890895431,
    "longitude": 40.2003598449993
  },
  {
    "ident": "GSU",
    "class": "H-DME",
    "name": "ATLANTA",
    "type": 5,
    "latitude": -84.4121930927072,
    "longitude": 33.6335702977034
  },
  {
    "ident": "WVI",
    "class": "L-DME",
    "name": "WATSONVILLE",
    "type": 5,
    "latitude": -121.78545608219,
    "longitude": 36.9392076964476
  },
  {
    "ident": "AZO",
    "class": "L-DME",
    "name": "KALAMAZOO",
    "type": 5,
    "latitude": -85.553156833593,
    "longitude": 42.2369938617504
  },
  {
    "ident": "EWR",
    "class": "T-DME",
    "name": "NEWARK",
    "type": 5,
    "latitude": -74.1779681682032,
    "longitude": 40.6743526868126
  },
  {
    "ident": "OZ",
    "class": "MHW",
    "name": "BRYNT",
    "type": 3,
    "latitude": -85.8158403203648,
    "longitude": 31.2256138898224
  },
  {
    "ident": "JWJ",
    "class": "L-DME",
    "name": "ELMWOOD",
    "type": 5,
    "latitude": -92.9087534019993,
    "longitude": 42.1113006353545
  },
  {
    "ident": "BMI",
    "class": "L-DME",
    "name": "BLOOMINGTON",
    "type": 5,
    "latitude": -88.9312723828933,
    "longitude": 40.4808122615665
  },
  {
    "ident": "OKK",
    "class": "L-TACAN",
    "name": "KOKOMO",
    "type": 9,
    "latitude": -86.0580037705801,
    "longitude": 40.5277876997616
  },
  {
    "ident": "YKN",
    "class": "L-DME",
    "name": "YANKTON",
    "type": 5,
    "latitude": -97.3849858327894,
    "longitude": 42.9183821265319
  },
  {
    "ident": "AP",
    "class": "MH",
    "name": "ACTIVE PASS",
    "type": 3,
    "latitude": -123.290018144518,
    "longitude": 48.8738805711035
  },
  {
    "ident": "DA",
    "class": "H",
    "name": "DAWSON CITY",
    "type": 3,
    "latitude": -139.167691597625,
    "longitude": 64.0289032840192
  },
  {
    "ident": "F9",
    "class": "MH",
    "name": "MIRAMICHI",
    "type": 3,
    "latitude": -65.4674989540481,
    "longitude": 47.0100096660068
  },
  {
    "ident": "FC",
    "class": "H",
    "name": "FREDERICTON",
    "type": 3,
    "latitude": -66.5998742902527,
    "longitude": 45.917348340909
  },
  {
    "ident": "IXT",
    "class": "T",
    "name": "TERRACE",
    "type": 5,
    "latitude": -128.587795755514,
    "longitude": 54.460838391976
  },
  {
    "ident": "PJ",
    "class": "MH",
    "name": "ROBINSON",
    "type": 3,
    "latitude": -134.86123570093,
    "longitude": 60.4394957724318
  },
  {
    "ident": "PR",
    "class": "H",
    "name": "PRINCE RUPERT",
    "type": 3,
    "latitude": -130.423907024434,
    "longitude": 54.2633381384966
  },
  {
    "ident": "QM",
    "class": "H",
    "name": "MONCTON",
    "type": 3,
    "latitude": -64.5820486021818,
    "longitude": 46.1106539727982
  },
  {
    "ident": "QT",
    "class": "H",
    "name": "THUNDER BAY",
    "type": 3,
    "latitude": -89.4338710011495,
    "longitude": 48.3463504086841
  },
  {
    "ident": "UQQ",
    "class": "H",
    "name": "COMOX",
    "type": 9,
    "latitude": -124.894529729317,
    "longitude": 49.712366528488
  },
  {
    "ident": "VBI",
    "class": "H",
    "name": "SIOUX NARROWS",
    "type": 6,
    "latitude": -94.046744817811,
    "longitude": 49.4769307593454
  },
  {
    "ident": "VBS",
    "class": "H",
    "name": "SAGUENAY",
    "type": 6,
    "latitude": -71.2693343773065,
    "longitude": 48.0172318785878
  },
  {
    "ident": "VR",
    "class": "H",
    "name": "VANCOUVER",
    "type": 3,
    "latitude": -123.057182077279,
    "longitude": 49.1728667214244
  },
  {
    "ident": "WC",
    "class": "MH",
    "name": "WHITE ROCK",
    "type": 3,
    "latitude": -122.750293093016,
    "longitude": 49.003338968967
  },
  {
    "ident": "XT",
    "class": "MH",
    "name": "TERRACE",
    "type": 3,
    "latitude": -128.584534610208,
    "longitude": 54.374041171395
  },
  {
    "ident": "XX",
    "class": "H",
    "name": "ABBOTSFORD",
    "type": 3,
    "latitude": -122.487995833903,
    "longitude": 49.0153139995982
  },
  {
    "ident": "YAZ",
    "class": "H",
    "name": "TOFINO",
    "type": 3,
    "latitude": -125.704207443927,
    "longitude": 49.0468525184551
  },
  {
    "ident": "YBL",
    "class": "MH",
    "name": "CAMPBELL RIVER",
    "type": 3,
    "latitude": -125.357524321995,
    "longitude": 50.0064525938457
  },
  {
    "ident": "YBR",
    "class": "H",
    "name": "BRANDON",
    "type": 6,
    "latitude": -99.9456854916964,
    "longitude": 49.9098969760104
  },
  {
    "ident": "YCD",
    "class": "H",
    "name": "NANAIMO",
    "type": 3,
    "latitude": -123.871665522791,
    "longitude": 49.1279055151736
  },
  {
    "ident": "YDC",
    "class": "H",
    "name": "PRINCETON",
    "type": 6,
    "latitude": -120.373787235676,
    "longitude": 49.3815475996887
  },
  {
    "ident": "YEE",
    "class": "H",
    "name": "MIDLAND",
    "type": 5,
    "latitude": -79.793211929715,
    "longitude": 44.5818087263979
  },
  {
    "ident": "YHZ",
    "class": "H",
    "name": "HALIFAX",
    "type": 6,
    "latitude": -63.4018037051203,
    "longitude": 44.9231482379379
  },
  {
    "ident": "YJ",
    "class": "MH",
    "name": "VICTORIA",
    "type": 3,
    "latitude": -123.399498651581,
    "longitude": 48.6441722181409
  },
  {
    "ident": "YJQ",
    "class": "MH",
    "name": "BELLA BELLA",
    "type": 3,
    "latitude": -128.113628176107,
    "longitude": 52.1852828695468
  },
  {
    "ident": "YOC",
    "class": "H",
    "name": "OLD CROW",
    "type": 3,
    "latitude": -139.844886994056,
    "longitude": 67.5713946800551
  },
  {
    "ident": "YOW",
    "class": "H",
    "name": "OTTAWA",
    "type": 6,
    "latitude": -75.8968662960197,
    "longitude": 45.4417534899165
  },
  {
    "ident": "YPK",
    "class": "L",
    "name": "PITT MEADOWS BC",
    "type": 7,
    "latitude": -122.714895924079,
    "longitude": 49.2159389829092
  },
  {
    "ident": "YPW",
    "class": "MH",
    "name": "POWELL RIVER",
    "type": 3,
    "latitude": -124.501404705281,
    "longitude": 49.8366721398792
  },
  {
    "ident": "YQB",
    "class": "H",
    "name": "QUEBEC",
    "type": 8,
    "latitude": -71.6262621788963,
    "longitude": 46.7053177607846
  },
  {
    "ident": "YQH",
    "class": "H",
    "name": "WATSON LAKE",
    "type": 6,
    "latitude": -128.857601384204,
    "longitude": 60.0865300429463
  },
  {
    "ident": "YQL",
    "class": "H",
    "name": "LETHBRIDGE",
    "type": 6,
    "latitude": -112.667796903881,
    "longitude": 49.6344067987905
  },
  {
    "ident": "YQM",
    "class": "H",
    "name": "MONCTON",
    "type": 6,
    "latitude": -64.5707347118326,
    "longitude": 46.1889706565969
  },
  {
    "ident": "YQT",
    "class": "H",
    "name": "THUNDER BAY",
    "type": 6,
    "latitude": -89.4375820977516,
    "longitude": 48.2539198357317
  },
  {
    "ident": "YRI",
    "class": "H",
    "name": "RIVIERE DU LOUP",
    "type": 7,
    "latitude": -69.588686551124,
    "longitude": 47.7564874537372
  },
  {
    "ident": "YSJ",
    "class": "H",
    "name": "SAINT JOHN",
    "type": 6,
    "latitude": -65.8708323434697,
    "longitude": 45.4072315998193
  },
  {
    "ident": "YTA",
    "class": "MH",
    "name": "PEMBROKE",
    "type": 3,
    "latitude": -77.2182278753121,
    "longitude": 45.8032062730125
  },
  {
    "ident": "YUL",
    "class": "H",
    "name": "MONTREAL",
    "type": 6,
    "latitude": -73.9709295586533,
    "longitude": 45.6157508283723
  },
  {
    "ident": "YUY",
    "class": "H",
    "name": "ROUYN",
    "type": 3,
    "latitude": -78.938645361684,
    "longitude": 48.1729204600616
  },
  {
    "ident": "YVO",
    "class": "H",
    "name": "VAL D OR",
    "type": 6,
    "latitude": -77.8202810947486,
    "longitude": 48.1752788461495
  },
  {
    "ident": "YVR",
    "class": "H",
    "name": "VANCOUVER",
    "type": 6,
    "latitude": -123.149079286272,
    "longitude": 49.0773472665085
  },
  {
    "ident": "YVV",
    "class": "H",
    "name": "WIARTON",
    "type": 6,
    "latitude": -81.1049957051447,
    "longitude": 44.7448475792599
  },
  {
    "ident": "YWG",
    "class": "H",
    "name": "WINNIPEG",
    "type": 8,
    "latitude": -97.2393152919377,
    "longitude": 49.9277194372462
  },
  {
    "ident": "YXC",
    "class": "H",
    "name": "CRANBROOK",
    "type": 6,
    "latitude": -116.088317042369,
    "longitude": 49.5542814211536
  },
  {
    "ident": "YXU",
    "class": "H",
    "name": "LONDON",
    "type": 6,
    "latitude": -81.148934447699,
    "longitude": 43.0379195031957
  },
  {
    "ident": "YXY",
    "class": "H",
    "name": "WHITEHORSE",
    "type": 6,
    "latitude": -135.138910847048,
    "longitude": 60.6188929444054
  },
  {
    "ident": "YYB",
    "class": "H",
    "name": "NORTH BAY",
    "type": 6,
    "latitude": -79.4364092203172,
    "longitude": 46.3639173700482
  },
  {
    "ident": "YYG",
    "class": "H",
    "name": "CHARLOTTETOWN",
    "type": 6,
    "latitude": -63.119681432059,
    "longitude": 46.2976484853314
  },
  {
    "ident": "YYJ",
    "class": "H",
    "name": "VICTORIA",
    "type": 6,
    "latitude": -123.484504246426,
    "longitude": 48.7270555421956
  },
  {
    "ident": "YZP",
    "class": "H",
    "name": "SANDSPIT",
    "type": 6,
    "latitude": -131.80714290586,
    "longitude": 53.2521851745248
  },
  {
    "ident": "YZT",
    "class": "H",
    "name": "PORT HARDY",
    "type": 6,
    "latitude": -127.365980368813,
    "longitude": 50.6845218197943
  },
  {
    "ident": "YZX",
    "class": "H",
    "name": "GREENWOOD",
    "type": 3,
    "latitude": -65.1018626172047,
    "longitude": 44.9228676417282
  },
  {
    "ident": "ZKI",
    "class": "H",
    "name": "KITIMAT",
    "type": 3,
    "latitude": -128.670112265153,
    "longitude": 54.0542467158354
  },
  {
    "ident": "UIN",
    "class": "H-TACAN",
    "name": "QUINCY",
    "type": 9,
    "latitude": -91.2789310449053,
    "longitude": 39.8478820213745
  },
  {
    "ident": "OZR",
    "class": "L-VORW/DME",
    "name": "CAIRNS",
    "type": 6,
    "latitude": -85.7263169639508,
    "longitude": 31.268954457414
  },
  {
    "ident": "HEY",
    "class": "T-VORW",
    "name": "HANCHEY",
    "type": 7,
    "latitude": -85.6527836148532,
    "longitude": 31.3741405941931
  },
  {
    "ident": "LOR",
    "class": "MHW",
    "name": "LOWE",
    "type": 3,
    "latitude": -85.7434761400024,
    "longitude": 31.3615889223822
  },
  {
    "ident": "CSG",
    "class": "L-TACAN",
    "name": "COLUMBUS",
    "type": 9,
    "latitude": -85.017633214702,
    "longitude": 32.6152583887249
  },
  {
    "ident": "LSF",
    "class": "T-VORW/DME",
    "name": "LAWSON",
    "type": 6,
    "latitude": -84.9931209718518,
    "longitude": 32.3323005498067
  },
  {
    "ident": "IHD",
    "class": "L-TACAN",
    "name": "INDIAN HEAD",
    "type": 9,
    "latitude": -79.3583705862321,
    "longitude": 39.9742495736889
  },
  {
    "ident": "GRD",
    "class": "H-TACAN",
    "name": "GREENWOOD",
    "type": 9,
    "latitude": -82.1541524670882,
    "longitude": 34.2515727352236
  },
  {
    "ident": "GQO",
    "class": "H-DME",
    "name": "CHOO CHOO",
    "type": 5,
    "latitude": -85.1533736586372,
    "longitude": 34.9612802713315
  },
  {
    "ident": "HRS",
    "class": "L-VORTACW",
    "name": "HARRIS",
    "type": 8,
    "latitude": -83.9156777427628,
    "longitude": 34.9430044832852
  },
  {
    "ident": "OXI",
    "class": "H-DME",
    "name": "KNOX",
    "type": 5,
    "latitude": -86.6492940175596,
    "longitude": 41.322066699455
  },
  {
    "ident": "OBH",
    "class": "H-DME",
    "name": "WOLBACH",
    "type": 5,
    "latitude": -98.3536039511697,
    "longitude": 41.3757426660012
  },
  {
    "ident": "GRK",
    "class": "T-VORW/DME",
    "name": "GRAY",
    "type": 6,
    "latitude": -97.8137987928849,
    "longitude": 31.0328917508371
  }
])