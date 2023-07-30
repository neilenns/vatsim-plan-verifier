use("plan-verifier");

db.aircraft.deleteMany({});

db.aircraft.insertMany([
  {
    "equipmentCode": "A500",
    "manufacturer": "ADAM AIRCRAFT (USA)",
    "name": "A-500, CarbonAero",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AMX",
    "manufacturer": "AERMACCHI SpA (Italy)",
    "name": "AMX",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "FN33",
    "manufacturer": "AERMACCHI SpA (Italy)",
    "name": "FN-333 Riviera***",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "L90",
    "manufacturer": "AERMACCHI SpA (Italy)",
    "name": "MB-290TP Redigo",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "M32",
    "manufacturer": "AERMACCHI SpA (Italy)",
    "name": "MB-326",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "M339",
    "manufacturer": "AERMACCHI SpA (Italy)",
    "name": "MB-339",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "S05F",
    "manufacturer": "AERMACCHI SpA (Italy)",
    "name": "SF-205-18F/20F",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "S05R",
    "manufacturer": "AERMACCHI SpA (Italy)",
    "name": "SF-205-18R/20R/22R",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "S208",
    "manufacturer": "AERMACCHI SpA (Italy)",
    "name": "S-208",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "S211",
    "manufacturer": "AERMACCHI SpA (Italy)",
    "name": "S-211",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "F260",
    "manufacturer": "AERMACCHI SpA (Italy)",
    "name": "SF-260 A/B/C/D/E/F/M/W, Warrior",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "F26T",
    "manufacturer": "AERMACCHI SpA (Italy)",
    "name": "SF-260TP",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "F600",
    "manufacturer": "AERMACCHI SpA (Italy)",
    "name": "SF-600A, SF-600TP Canguero",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "SGUP",
    "manufacturer": "AERO SPACELINES (USA)",
    "name": "Super Guppy, Super Turbine Guppy",
    "engineCount": "4",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AT43",
    "manufacturer": "AEROSPATIALE (France)",
    "name": "ATR-42-200/300/320",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AT44",
    "manufacturer": "AEROSPATIALE (France)",
    "name": "ATR-42-400",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AT45",
    "manufacturer": "AEROSPATIALE (France)",
    "name": "ATR-42-500",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AT72",
    "manufacturer": "AEROSPATIALE (France)",
    "name": "ATR-72",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "RALL",
    "manufacturer": "AEROSPATIALE (France)",
    "name": "Rallye, Rallye Club, Super Rallye,Rallye Commodore, Minerva (MS-880to 894) ",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "S210",
    "manufacturer": "AEROSPATIALE (France)",
    "name": "SE-210 Caravelle",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "S601",
    "manufacturer": "AEROSPATIALE (France)",
    "name": "SN-601 Corvette",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "TAMP",
    "manufacturer": "AEROSPATIALE (France)",
    "name": "Tampico TB-9",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "TBM7",
    "manufacturer": "AEROSPATIALE (France)",
    "name": "TBM TB-700",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "TOBA",
    "manufacturer": "AEROSPATIALE (France)",
    "name": "Tabago TB10C/200",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "TRIN",
    "manufacturer": "AEROSPATIALE (France)",
    "name": "Trinidad TB-20/21",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "A30B",
    "manufacturer": "AIRBUS INDUSTRIES (International)",
    "name": "A-300B2/4-1/2/100/200,A-300C4-200",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A306",
    "manufacturer": "AIRBUS INDUSTRIES (International)",
    "name": "A-300B4 - 600",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A310",
    "manufacturer": "AIRBUS INDUSTRIES (International)",
    "name": "A-310 (CC-150 Polaris) ",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A318",
    "manufacturer": "AIRBUS INDUSTRIES (International)",
    "name": "A-318",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "447",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A319",
    "manufacturer": "AIRBUS INDUSTRIES (International)",
    "name": "A-319, ACJ",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "447",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A320",
    "manufacturer": "AIRBUS INDUSTRIES (International)",
    "name": "A-320",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "447",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A321",
    "manufacturer": "AIRBUS INDUSTRIES (International)",
    "name": "A-321",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "447",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A3ST",
    "manufacturer": "AIRBUS INDUSTRIES (International)",
    "name": "A-300ST Super Transporter, Beluga",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A332",
    "manufacturer": "AIRBUS INDUSTRIES (International)",
    "name": "A-330-200",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "maxCruiseSpeed": "470",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A333",
    "manufacturer": "AIRBUS INDUSTRIES (International)",
    "name": "A-330-300",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "maxCruiseSpeed": "470",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A342",
    "manufacturer": "AIRBUS INDUSTRIES (International)",
    "name": "A-340-200",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "maxCruiseSpeed": "470",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A343",
    "manufacturer": "AIRBUS INDUSTRIES (International)",
    "name": "A-340-300",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "maxCruiseSpeed": "470",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A345",
    "manufacturer": "AIRBUS INDUSTRIES (International)",
    "name": "A-340-500",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "maxCruiseSpeed": "470",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A346",
    "manufacturer": "AIRBUS INDUSTRIES (International)",
    "name": "A-340-600",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "maxCruiseSpeed": "470",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A388",
    "manufacturer": "AIRBUS INDUSTRIES (International)",
    "name": "A-380-800",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "maxCruiseSpeed": "470",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "BU20",
    "manufacturer": "AIRCRAFT HYDRO-FORMING (USA)",
    "name": "Bushmaster 2000",
    "engineCount": "3",
    "engineType": "P",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AT3P",
    "manufacturer": "AIR TRACTOR, INC. (USA)",
    "name": "AT-300/301/401",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AT3T",
    "manufacturer": "AIR TRACTOR, INC. (USA)",
    "name": "AT-302/400/402",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AT5P",
    "manufacturer": "AIR TRACTOR, INC. (USA)",
    "name": "AT-501",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AT5T",
    "manufacturer": "AIR TRACTOR, INC. (USA)",
    "name": "AT-502/503",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AT6T",
    "manufacturer": "AIR TRACTOR, INC. (USA)",
    "name": "AT-602",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AT8T",
    "manufacturer": "AIR TRACTOR, INC. (USA)",
    "name": "AT-802",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AN2",
    "manufacturer": "ANTONOV (Russia)",
    "name": "An-2 ",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AN8",
    "manufacturer": "ANTONOV (Russia)",
    "name": "An-8",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AN12",
    "manufacturer": "ANTONOV (Russia)",
    "name": "An-12",
    "engineCount": "4",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AN70",
    "manufacturer": "ANTONOV (Russia)",
    "name": "An-70",
    "engineCount": "4",
    "engineType": "T",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AN72",
    "manufacturer": "ANTONOV (Russia)",
    "name": "An-74-100/200",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A124",
    "manufacturer": "ANTONOV (Russia)",
    "name": "An-124 Ruslan",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A140",
    "manufacturer": "ANTONOV (Russia)",
    "name": "An-140",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "ALBU",
    "manufacturer": "AVIATION DEVELOPMENT (USA)",
    "name": "Alaskan Bushmaster",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AIRD",
    "manufacturer": "BEAGLE AIRCRAFT (UK)",
    "name": "A-109 Airedale",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PUP",
    "manufacturer": "BEAGLE AIRCRAFT (UK)",
    "name": "B-121 Pup ",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BDOG",
    "manufacturer": "BEAGLE AIRCRAFT (UK)",
    "name": "B-125 Bulldog",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BASS",
    "manufacturer": "BEAGLE AIRCRAFT (UK)",
    "name": "B-206 Basset ",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "B190",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "1900 (C-12J)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "B350",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "B300 Super King Air 350 (/L)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "BE10",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "100 King Air  (U-21F Ute)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BE17",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "17 Stagger Wing (UC-43 Traveler,YC-43 Traveler)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BE18",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "Twin Beech 18/Super H18",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "B18T",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "18 (turbine)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BE19",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "19 Musketeer Sport, Sport 1",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BE20",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "200, 1300 Super King Air, Commuter",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "BE23",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "23 Musketeer, Sundowner",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BE24",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "24 Musketeer Super, Sierra",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BE30",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "300 Super King Air",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "BE33",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "33 Debonair, Bonanza (E-24)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BE35",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "35 Bonanza",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BE36",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "36 Bonanza (piston)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "B36T",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "36 Bonanza (turbine)",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I ",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BE40",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "400 Beechjet, Hawker 400 (T-1Jayhawk, T-400)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "BE50",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "50 Twin Bonanza (U-8D/E/G, RU-8Seminole)",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BE55",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "55 Baron (T-42 Chochise, C-55, E-20)",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BE56",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "56 Turbo Baron",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "BE58",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "58 Baron",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "BE60",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "60 Duke",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "BE65",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "65 Queen Air (U-8F Seminole)",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BE70",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "70 Queen Air",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BE76",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "76 Duchess ",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BE77",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "77 Skipper ",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BE80",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "80 Queen Air (Zamir)",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BE88",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "88 Queen Air",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BE95",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "95 Travel Air",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BE99",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "99 Airliner",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BE9L",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "90, A90 to E90 King Air (T-44 V-C6)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BE9T",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "F90 King Air",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "STAR",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "2000 Starship ",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PRM1",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "Premier 1, 390",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "T34P",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "T34A/B, E-17 Mentor (45)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "T34T",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "T-34C Turbo Mentor",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "TEX2",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "T-6A Texan II",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "U21",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "U-21A/G, EU-21, JU-21, RU-21, Ute(A90-1 to 4)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "U22",
    "manufacturer": "BEECH AIRCRAFT COMPANY (USA)",
    "name": "QU-22 (1074/1079)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AR11",
    "manufacturer": "BELLANCA AIRCRAFT (USA)",
    "name": "Aeronca Chief/Super Chief, Pushpak",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AR15",
    "manufacturer": "BELLANCA AIRCRAFT (USA)",
    "name": "Aeronca Sedan",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "B14A",
    "manufacturer": "BELLANCA AIRCRAFT (USA)",
    "name": "14 Junior, Cruiseair, Cruiseair Senior Cruisemaster ",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "B14C",
    "manufacturer": "BELLANCA AIRCRAFT (USA)",
    "name": "14 Bellanca 260/A/B/C",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BL17",
    "manufacturer": "BELLANCA AIRCRAFT (USA)",
    "name": "17 Viking, Super Viking,Turbo Viking",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BL19",
    "manufacturer": "BELLANCA AIRCRAFT (USA)",
    "name": "19 Skyrocket",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BL8",
    "manufacturer": "BELLANCA AIRCRAFT (USA)",
    "name": "8 Decathlon,  Scout ",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "CH40",
    "manufacturer": "BELLANCA AIRCRAFT (USA)",
    "name": "Champion Lancer 402",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "CH7A",
    "manufacturer": "BELLANCA AIRCRAFT (USA)",
    "name": "7 ACA/ECA Champ, Citabria, ",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "CH7B",
    "manufacturer": "BELLANCA AIRCRAFT (USA)",
    "name": "7 GCBC/KCAB  Citabria",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "T250",
    "manufacturer": "BELLANCA AIRCRAFT (USA)",
    "name": "T-250 Aries",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "B52",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "B-52 Stratofortress",
    "engineCount": "8",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B701 ",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "707-100 (C-137B)",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B703",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "707-300(C-18, C-137C, E-8J-Stars,EC-18, EC-137, KC-137, T-17)",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B712",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "717-200",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B720",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "720",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B721",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "727-100 (C-22)",
    "engineCount": "3",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B722",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "727-200",
    "engineCount": "3",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "R721",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "727-100RE Super 27",
    "engineCount": "3",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "R722",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "727-200RE Super 27",
    "engineCount": "3",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B72Q",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "727 Stage 3 (-100 or -200)",
    "engineCount": "3",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B731",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "737-100",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B732",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "737-200 (Surveiller, CT-43, VC-96)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B73Q",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "B737 Stage 3",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B733",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "737-300",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B734",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "737-400",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B735",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "737-500",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B736",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "737-600",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B737",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "737-700, BBJ, C-40",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B738",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "737-800, BBJ2",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B739",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "737-900",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B741",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "747-100",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B742",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "747-200 (E-4, VC-25)",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B743",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "747-300",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B74D",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "747-400 (Domestic, no winglets)",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B744",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "747-400 (International, winglets)",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B74R",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "747SR",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B74S",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "747SP",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B752",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "757-200 (C-32)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "M",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B753",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "757-300",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "M",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B762",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "767-200",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B763",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "767-300",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B764",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "767-400",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B772",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "777-200",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B773",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "777-300",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "BSCA",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "747SCA Shuttle Carrier",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "C135",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "C-135B/C/E/K Stratolifter (EC-135,NKC-135, OC-135, TC-135, WC-135)",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "C17",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "C-17 Globemaster 3",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "C97",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "C-97 Stratofreighter",
    "engineCount": "4",
    "engineType": "P",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "K35A",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "KC-135A Stratotanker (J57 engines)",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "K35E",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "KC 135D/E Stratotanker (TF33engines)",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "K35R",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "KC 135R/T, C-135FR, Stratotanker(CFM56 engines)",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "KE3",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "KE-3",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "R135",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "RC-135",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "E3TF",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "E-3A (TF33), E-B/C, JE-3, Sentry ",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "E3CF",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "E-3A (CFM56), E-3D/F, Sentry",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "E6",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "E6 Mercury",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "E767",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "E-767",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "ST75",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "75 Kaydet (PT-13, PT-17, PT-18,PT-27, N2S)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "CL30",
    "manufacturer": "BOMBARDIER (Canada)",
    "name": "BD-100 Challenger 300",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "GL5T",
    "manufacturer": "BOMBARDIER (Canada)",
    "name": "BD-700 Global 5000",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "GLEX",
    "manufacturer": "BOMBARDIER (Canada)",
    "name": "BD-700 Global Express, Sentinel",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "487",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A748",
    "manufacturer": "BRITISH AEROSPACE (BAe) (UK)",
    "name": "BAe 748 (Andover, C-91)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "ATP",
    "manufacturer": "BRITISH AEROSPACE (BAe) (UK)",
    "name": "ATP Advance Turboprop (ATP)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "BA11",
    "manufacturer": "BRITISH AEROSPACE (BAe) (UK)",
    "name": "BAC-111 One-Eleven",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "JPRO",
    "manufacturer": "BRITISH AEROSPACE (BAe) (UK)",
    "name": "BAC-167 Strikemaster",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "H25A",
    "manufacturer": "BRITISH AEROSPACE (BAe) (UK)",
    "name": "BAe HS 125 Series 1/2/3/400/600 ",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "H25B",
    "manufacturer": "BRITISH AEROSPACE (BAe) (UK)",
    "name": "BAe-125-700/800 (C-29, U-125)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "H25C",
    "manufacturer": "BRITISH AEROSPACE (BAe) (UK)",
    "name": "BAe-125-1000",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B461",
    "manufacturer": "BRITISH AEROSPACE (BAe) (UK)",
    "name": "BAe-146-100 Statesman",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "404",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B462",
    "manufacturer": "BRITISH AEROSPACE (BAe) (UK)",
    "name": "BAe-146-200 Quiet Trader, Statesman  ",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "404",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B463",
    "manufacturer": "BRITISH AEROSPACE (BAe) (UK)",
    "name": "BAe-146-300",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "404",
    "commonEquipmentSuffixes": [
      "l"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "JS31",
    "manufacturer": "BRITISH AEROSPACE (BAe) (UK)",
    "name": "BAe-3100 Jetstream 31 (T.Mk.3)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "JS32",
    "manufacturer": "BRITISH AEROSPACE (BAe) (UK)",
    "name": "BAe-3200 Jetstream Super 31",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "JS41",
    "manufacturer": "BRITISH AEROSPACE (BAe) (UK)",
    "name": "BAe-4100 Jetstream 41",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "HAR",
    "manufacturer": "BRITISH AEROSPACE (BAe) (UK)",
    "name": "Harrier, Sea Harrier",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "HAWK",
    "manufacturer": "BRITISH AEROSPACE (BAe) (UK)",
    "name": "Hawk, T-45 Goshawk, CT-155 Hawk",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "JS1",
    "manufacturer": "BRITISH AEROSPACE (BAe) (UK)",
    "name": "Jetstream 1 ",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "JS3",
    "manufacturer": "BRITISH AEROSPACE (BAe) (UK)",
    "name": "Jetstream 3 ",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "JS20",
    "manufacturer": "BRITISH AEROSPACE (BAe) (UK)",
    "name": "Jetstream 200 ",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "N1M",
    "manufacturer": "BRITISH AEROSPACE (BAe) (UK)",
    "name": "Nimrod",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "RJ70",
    "manufacturer": "BRITISH AEROSPACE (BAe) (UK)",
    "name": "RJ-70",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "RJ85",
    "manufacturer": "BRITISH AEROSPACE (BAe) (UK)",
    "name": "RJ-85",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "RJ1H",
    "manufacturer": "BRITISH AEROSPACE (BAe) (UK)",
    "name": "RJ-100",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "TOR",
    "manufacturer": "BRITISH AEROSPACE (BAe) (UK)",
    "name": "Tornado",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "BN2P",
    "manufacturer": "BRITTEN NORMAN LTD. (A subsidiary of Pilatus Aircraft LTD.) (UK)",
    "name": "BN-2, BN-2A/B Islander, Defender,Maritime Defender",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BN2T",
    "manufacturer": "BRITTEN NORMAN LTD. (A subsidiary of Pilatus Aircraft LTD.) (UK)",
    "name": "BN-2T Turbine Islander, Turbine Defender",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "TRID",
    "manufacturer": "BRITTEN NORMAN LTD. (A subsidiary of Pilatus Aircraft LTD.) (UK)",
    "name": "Trident",
    "engineCount": "3",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "TRIS",
    "manufacturer": "BRITTEN NORMAN LTD. (A subsidiary of Pilatus Aircraft LTD.) (UK)",
    "name": "BN-2A Mk3 Trislander",
    "engineCount": "3",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "VC10",
    "manufacturer": "BRITTEN NORMAN LTD. (A subsidiary of Pilatus Aircraft LTD.) (UK)",
    "name": "VC-10 ",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "VISC",
    "manufacturer": "BRITTEN NORMAN LTD. (A subsidiary of Pilatus Aircraft LTD.) (UK)",
    "name": "Viscount",
    "engineCount": "4",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "TNAV",
    "manufacturer": "CAMAIR AIRCRAFT CORP. (USA)",
    "name": "480 Twin Navion 480",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "CL41",
    "manufacturer": "CANADAIR BOMBARDIER LTD. (Canada)",
    "name": "CL-41 Tutor (CT-114)",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "CL44",
    "manufacturer": "CANADAIR BOMBARDIER LTD. (Canada)",
    "name": "CL-44 Forty Four",
    "engineCount": "4",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "CL4G",
    "manufacturer": "CANADAIR BOMBARDIER LTD. (Canada)",
    "name": "CL-44-O Guppy",
    "engineCount": "4",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "CVLT",
    "manufacturer": "CANADAIR BOMBARDIER LTD. (Canada)",
    "name": "CL-66, CV-580 (CC-109Cosmopolitan)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "CL60",
    "manufacturer": "CANADAIR BOMBARDIER LTD. (Canada)",
    "name": "CL-600/Challenger 699/601/604(CC-144, CE-144)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "CRJ1",
    "manufacturer": "CANADAIR BOMBARDIER LTD. (Canada)",
    "name": "CL-600 Regional Jet CRJ-100, RJ-100 ",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "424",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "CRJ2",
    "manufacturer": "CANADAIR BOMBARDIER LTD. (Canada)",
    "name": "CL-600, Regional Jet CRJ-200,RJ-200",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "424",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "CRJ7",
    "manufacturer": "CANADAIR BOMBARDIER LTD. (Canada)",
    "name": "CL-600 Regional Jet CRJ-700 ",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "473",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "CRJ9",
    "manufacturer": "CANADAIR BOMBARDIER LTD. (Canada)",
    "name": "CL-600 Regional Jet CRJ-900 ",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "470",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "T33",
    "manufacturer": "CANADAIR BOMBARDIER LTD. (Canada)",
    "name": "T-33, CT-133 Silver Star (CL-30) ",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A37",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "A-37 Dragonfly (318D/E), OA-37",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "C120",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "120",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C140",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "140!!! NO RNAV !!!",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C150",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "150, A150, Commuter, Aerobat",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C152",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "152, A152, Aerobat",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C170",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "170",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C172",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "172, P172, R172, Skyhawk, Hawk XP, Cutlass (T-41, Mescalero)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "maxCruiseSpeed": "122",
    "commonEquipmentSuffixes": [
      "A",
      "G"
    ],
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C72R",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "172RG, Cutlass RG",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C175",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "175, Skylark",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C177",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "177, Cardinal",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C77R",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "177, Cardinal RG",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C180",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "180, Skywagon 180 (U-17C)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C182",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "182, Skylane",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C82R",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "R182, TR182 (Turbo) Skylane RG",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C185",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "185, A185 Skywagon, Skywagon 185,AgCarryall (U-17A/B)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C188",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "188, A188, T188 AgWagon, AgPickupAgTruck, AgHusky",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C190",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "190",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C195",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "195 (LC-126)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C205",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "205",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C206",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "206 6",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C06T",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "206 (turbine)",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C207",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "207 (Turbo)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C07T",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "207 (turbine)",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C208",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "208 Grand Caravan ",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C210",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "210, T210, (Turbo) Centurion",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "P210",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "P210 Pressurized Centurion",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C10T",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "P210 (turbine)",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C303",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "T303 Crusader!!! NO RNAV !!! ",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C310",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "310, T310 (U-3, L-27)!!! NO RNAV !!! ",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C320",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "320 (Executive) Skyknight",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C335",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "335",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C336",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "336 Skymaster",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C337",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "337, M337, MC337, T337B/C/D/E/F/H(Turbo) Super Skymaster (O-2)",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "P337",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "T337G, P337 Pressurized Skymaster ",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C340",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "340",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C402",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "401, 402, Utililiner, Businessliner",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C02T",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "402 (turbine)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C404",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "404 Titan",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C04T",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "404 (turbine) ",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "F406",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "F406 Caravan 2, Vigilant",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C411",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "411",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C414",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "414, Chancellor 414",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "maxCruiseSpeed": "235",
    "commonEquipmentSuffixes": [
      "G"
    ],
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C14T",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "414 (turbine) ",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C421",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "421, Golden Eagle, ExecutiveCommuter",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C21T",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "421 (turbine)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C425",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "425, Corsair, Conquest 1",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C441",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "441 Conquest, Conquest 2",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C500",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "5000 Citation, Citation 1",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "C501",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "501 Citation 1SP",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "C525",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "525 Citationjet Citation CJ1",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "C25A",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "525A Citation CJ2",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "C25B",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "525B Citation CJ3",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "C25C",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "525C Citation CJ4 (/L)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "maxCruiseSpeed": "451",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "C526",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "526 Citationjet",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "C550",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "550, S550, 552 Citation 2/S2/Bravo(T-47, U-20)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "C551",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "551 Citation 2SP",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "C560",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "560 Citation 5/5 Ultra/5Ultra Encore(UC-35, OT-47, TR-20)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "C650",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "650 Citation 3/6/7",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "C680",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "680 Citation Sovereign",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "C750",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "750 Citation 10",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "CAW",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "AW",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "O1",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "O-1, TO-1, OE, L-19, TL-19 Bird Dog(305,321)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "T37",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "T37 (318A/B/C)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "T50",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "T-50 Bobcat (AT-8, AT-17, UC-78,Crane)",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "CDC6",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "DC-6",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "CMAS",
    "manufacturer": "CESSNA AIRCRAFT COMPANY (USA)",
    "name": "C-34/37/38/145/165, Airmaster",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "HUSK",
    "manufacturer": "CHRISTEN INDUSTRIES, INC. (USA)",
    "name": "A-1 Huskey",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "SR20",
    "manufacturer": "CIRRUS (USA)",
    "name": "SR-20, SR-20 SRV, SRV",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "SR22",
    "manufacturer": "CIRRUS (USA)",
    "name": "SR-22",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "VK3P",
    "manufacturer": "CIRRUS (USA)",
    "name": "VK-30 Cirrus",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C212",
    "manufacturer": "CONSTRUCCIONES AERONAUTICAS (CASA) (Spain)",
    "name": "C-212 Aviocar (T-12, TE-12, TR-12,D-3, Tp89)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "C46",
    "manufacturer": "CURTISS-WRIGHT CORP. (USA)",
    "name": "C-46 Commando (CW-20)",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "ATLA",
    "manufacturer": "DASSAULT-BREGUET (France)",
    "name": "1150 Atlantic, Altantique 2",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AJET",
    "manufacturer": "DASSAULT-BREGUET (France)",
    "name": "Alpha Jet",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "FA10",
    "manufacturer": "DASSAULT-BREGUET (France)",
    "name": "Falcon 10/100, Mystere 10/100",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "FA20",
    "manufacturer": "DASSAULT-BREGUET (France)",
    "name": "Falcon 20/100, Mystere 20/200,Gardian (HU-25, (T-11, TM-11)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "FA50",
    "manufacturer": "DASSAULT-BREGUET (France)",
    "name": "Falcon 50, Mystere 50 (T-16)",
    "engineCount": "3",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "F900",
    "manufacturer": "DASSAULT-BREGUET (France)",
    "name": "Falcon 900, Mystere 900 (T-18)",
    "engineCount": "3",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "F2TH",
    "manufacturer": "DASSAULT-BREGUET (France)",
    "name": "Falcon 2000",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "JAGR",
    "manufacturer": "DASSAULT-BREGUET (France)",
    "name": "Jaguar",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "MIR2",
    "manufacturer": "DASSAULT-BREGUET (France)",
    "name": "Mirage 2000, Vajara",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "MIRA",
    "manufacturer": "DASSAULT-BREGUET (France)",
    "name": "Mirage 3/5/50 (F-103)",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "MRF1",
    "manufacturer": "DASSAULT-BREGUET (France)",
    "name": "Mirage F1 (C-14, CE-14)",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "ETAR",
    "manufacturer": "DASSAULT-BREGUET (France)",
    "name": "Super Etendard",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "DHC2",
    "manufacturer": "DEHAVILLAND (Canada/UK)",
    "name": "DHC-2 Mk1 Beaver (U-6, L-20)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "DH2T",
    "manufacturer": "DEHAVILLAND (Canada/UK)",
    "name": "DHC-2 Mk3 Turbo Beaver",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "DHC3",
    "manufacturer": "DEHAVILLAND (Canada/UK)",
    "name": "DHC-3 Otter (U-1, NU-1, UC)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "DH3T",
    "manufacturer": "DEHAVILLAND (Canada/UK)",
    "name": "DHC-3 Turbo Otter",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "DHC4",
    "manufacturer": "DEHAVILLAND (Canada/UK)",
    "name": "DHC-4 Caribou (C-7, CV-2)",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "DHC5",
    "manufacturer": "DEHAVILLAND (Canada/UK)",
    "name": "DHC-5 (C-8, CV-7, CC-115, C-115)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "DHC6",
    "manufacturer": "DEHAVILLAND (Canada/UK)",
    "name": "DHC-6 Twin Otter (UV-18, CC-138)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "DHC7",
    "manufacturer": "DEHAVILLAND (Canada/UK)",
    "name": "DHC-7 Dash 7 (O-5, EO-5)",
    "engineCount": "4",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "DH8A",
    "manufacturer": "DEHAVILLAND (Canada/UK)",
    "name": "DHC8 - 100 Dash 8  (/G)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "270",
    "commonEquipmentSuffixes": [
      "G"
    ],
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "DH8B",
    "manufacturer": "DEHAVILLAND (Canada/UK)",
    "name": "DHC8 - 200 Dash 8 (/G)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "289",
    "commonEquipmentSuffixes": [
      "G"
    ],
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "DH8C",
    "manufacturer": "DEHAVILLAND (Canada/UK)",
    "name": "DHC8 - 300 Dash 8 (/G)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "287",
    "commonEquipmentSuffixes": [
      "G"
    ],
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "DH8D",
    "manufacturer": "DEHAVILLAND (Canada/UK)",
    "name": "DHC8 - 400 Dash 8 (/G)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "300",
    "commonEquipmentSuffixes": [
      "G"
    ],
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "DOVE",
    "manufacturer": "DEHAVILLAND (Canada/UK)",
    "name": "DH-104 Dove, Sea Devon",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "HERN",
    "manufacturer": "DEHAVILLAND (Canada/UK)",
    "name": "DH-114 Heron",
    "engineCount": "4",
    "engineType": "P",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "DV20",
    "manufacturer": "DIAMOND (Canada)",
    "name": "DA-20/22, DV-20 Katana, Speed Katana",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "DA42",
    "manufacturer": "DIAMOND (Canada)",
    "name": "DA-42 TwinStar",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "D228",
    "manufacturer": "DORNIER GmbH (FRG)",
    "name": "228",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "D328",
    "manufacturer": "DORNIER GmbH (FRG)",
    "name": "328",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "DO27",
    "manufacturer": "DORNIER GmbH (FRG)",
    "name": "27",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "DO28",
    "manufacturer": "DORNIER GmbH (FRG)",
    "name": "Do 28 A/B (Agur)",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "D28D",
    "manufacturer": "DORNIER GmbH (FRG)",
    "name": "Do 28D/D-1/D-2, 128-2 Skyservant",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "D28T",
    "manufacturer": "DORNIER GmbH (FRG)",
    "name": "Do-28D-6, 128-6 Turbo Skyservant",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "EA50",
    "manufacturer": "ECLIPSE AVIATION (USA)",
    "name": "Eclipse 500",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "VECT",
    "manufacturer": "EMBRAER (Brazil)",
    "name": "CBA-123 Vector",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "E110",
    "manufacturer": "EMBRAER (Brazil)",
    "name": "EMB-110/111 Bandeirante (C-95,EC-95, P-95, R-95, SC-95)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "E120",
    "manufacturer": "EMBRAER (Brazil)",
    "name": "EMB-120 Brasilia (VC-97)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "E121",
    "manufacturer": "EMBRAER (Brazil)",
    "name": "EMB-121 Xingu (VU-9, EC-9)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "E135",
    "manufacturer": "EMBRAER (Brazil)",
    "name": "EMB-135, ERJ-135/140",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "E145",
    "manufacturer": "EMBRAER (Brazil)",
    "name": "EMB-145, ERJ-145 (R-99)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "E45X",
    "manufacturer": "EMBRAER (Brazil)",
    "name": "EMB-145XR",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "E170",
    "manufacturer": "EMBRAER (Brazil)",
    "name": "EMB-170/175",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "E190",
    "manufacturer": "EMBRAER (Brazil)",
    "name": "EMB-190/195",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "E200",
    "manufacturer": "EXTRA (FRG)",
    "name": "200",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "E230",
    "manufacturer": "EXTRA (FRG)",
    "name": "230",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "E300",
    "manufacturer": "EXTRA (FRG)",
    "name": "300, 350",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "E400",
    "manufacturer": "EXTRA (FRG)",
    "name": "400",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "E500",
    "manufacturer": "EXTRA (FRG)",
    "name": "500",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "D228",
    "manufacturer": "FAIRCHILD DORNIER (USA/FRG)",
    "name": "228",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "D328",
    "manufacturer": "FAIRCHILD DORNIER (USA/FRG)",
    "name": "328",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "J328",
    "manufacturer": "FAIRCHILD DORNIER (USA/FRG)",
    "name": "328JET, Envoy 3",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III ",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "J728",
    "manufacturer": "FAIRCHILD DORNIER (USA/FRG)",
    "name": "728JET, Envoy 7",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A10",
    "manufacturer": "FAIRCHILD INDUSTRIES (USA)",
    "name": "A-10, OA-10 Thunderbolt 2",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "C119",
    "manufacturer": "FAIRCHILD INDUSTRIES (USA)",
    "name": "C-119, R4Q Flying Box Car (F-78)",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "C123",
    "manufacturer": "FAIRCHILD INDUSTRIES (USA)",
    "name": "C-123 Provider",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "F27",
    "manufacturer": "FAIRCHILD INDUSTRIES (USA)",
    "name": "F-27, FH-227",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "FA62",
    "manufacturer": "FAIRCHILD INDUSTRIES (USA)",
    "name": "M-62 (PT-19/23/26, T-19 Cornell)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PC6P",
    "manufacturer": "FAIRCHILD INDUSTRIES (USA)",
    "name": "Pilatus/Peacemaker/Porter ",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PC6T",
    "manufacturer": "FAIRCHILD INDUSTRIES (USA)",
    "name": "PC-6 Heli-Porter",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "SW2",
    "manufacturer": "FAIRCHILD INDUSTRIES (USA)",
    "name": "Merlin 2 ",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "SW3",
    "manufacturer": "FAIRCHILD INDUSTRIES (USA)",
    "name": "SA-226TB, SA-227TT Merlin 3, Fairchild 300",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "SW4",
    "manufacturer": "FAIRCHILD INDUSTRIES (USA)",
    "name": "SA-226AC, SA-227AC/AT Metro,Merlin 4, Expediter ",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "F27",
    "manufacturer": "FOKKER BV (Netherlands)",
    "name": "F-27 Friendship, Troopship, Maritime (C-31, D-2)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "F28",
    "manufacturer": "FOKKER BV (Netherlands)",
    "name": "F-28, Fellowship ",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "F50",
    "manufacturer": "FOKKER BV (Netherlands)",
    "name": "50, Maritime Enforcer",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "F60",
    "manufacturer": "FOKKER BV (Netherlands)",
    "name": "60",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "F70",
    "manufacturer": "FOKKER BV (Netherlands)",
    "name": "70",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "F100",
    "manufacturer": "FOKKER BV (Netherlands)",
    "name": "100",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "NOMA",
    "manufacturer": "GAF (Australia)",
    "name": "N2/22/24 Nomad, Floatmaster,Missionmaster, Searchmaster",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "LJ23",
    "manufacturer": "GATES LEARJET CORP. (USA)",
    "name": "23",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "LJ24",
    "manufacturer": "GATES LEARJET CORP. (USA)",
    "name": "24",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "LJ25",
    "manufacturer": "GATES LEARJET CORP. (USA)",
    "name": "25",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "LJ28",
    "manufacturer": "GATES LEARJET CORP. (USA)",
    "name": "28, 29",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "LJ31",
    "manufacturer": "GATES LEARJET CORP. (USA)",
    "name": "31",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "LJ35",
    "manufacturer": "GATES LEARJET CORP. (USA)",
    "name": "35, 36 (C-21, RC-35, RC-36, U-36)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "LJ40",
    "manufacturer": "GATES LEARJET CORP. (USA)",
    "name": "40",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "LJ45",
    "manufacturer": "GATES LEARJET CORP. (USA)",
    "name": "45",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "LJ55",
    "manufacturer": "GATES LEARJET CORP. (USA)",
    "name": "55",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "LJ60",
    "manufacturer": "GATES LEARJET CORP. (USA)",
    "name": "60",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "CAT",
    "manufacturer": "GENERAL DYNAMICS CORP. (USA)",
    "name": "Canso/Catalina***",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "CVLP",
    "manufacturer": "GENERAL DYNAMICS CORP. (USA)",
    "name": "Convair 240/340/440, Liner, HC-131",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "CVLT",
    "manufacturer": "GENERAL DYNAMICS CORP. (USA)",
    "name": "Convair 540/580/600/640",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "F111",
    "manufacturer": "GENERAL DYNAMICS CORP. (USA)",
    "name": "F-111, EF-111, (RF-111 Aardvark,Raven",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "F16",
    "manufacturer": "GENERAL DYNAMICS CORP. (USA)",
    "name": "F-16 A/B/C/D/N, NF-16, TF-16Fighting Falcon, Netz, Barak, Brakeet",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "F16X",
    "manufacturer": "GENERAL DYNAMICS CORP. (USA)",
    "name": "F-16XL Fighting Falcon",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "VALI",
    "manufacturer": "GENERAL DYNAMICS CORP. (USA)",
    "name": "Valiant ",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "G2T1",
    "manufacturer": "GREAT LAKES (USA)",
    "name": "2T-1 Sport Trainer, Sport",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "G109",
    "manufacturer": "GROB (FRG)",
    "name": "G109 Ranger (Vigilant)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "G115",
    "manufacturer": "GROB (FRG)",
    "name": "G115 A/B/C/D/E, Bavarian (Heron),Tutoa",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "G120",
    "manufacturer": "GROB (FRG)",
    "name": "G-120",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "A6",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "A-6, EA-6, KA-6 Intruder, Prowler (G-128)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "AA1",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "AA1 Trainer,Tr2, T-Cat, Lynx",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AA5",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "AA-5, Traveller, Cheetah Tiger",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "G96",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "C-1, TF Trader (G-96)",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "C2",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "C-2 Greyhound",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "E2",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "E-2, TE-2, Hawkeye, Daya",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "F3F",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "F-3F (G-11/32), Replica",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "HCAT",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "F-6F Hellcat (G-50)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "TCAT",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "F-7F Tigercat (G-51)",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "F9F",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "F-9F Panther (G-79)",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "F14",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "F-14 Tomcat",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "G164",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "G-164 Ag-Cat, Super Ag-Cat",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "G64T",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "G164 Turbo Ag-Cat",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "G21",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "G-21 A/38/39 Goose (JRF)*** ",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "G44",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "G-44 Widgeon (J4F)***",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "G73",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "G-73 Mallard***",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "G73T",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "G-73T Turbo Mallard***",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "GLF2",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "G-1159, G-1159B Gulfstream2/2B/2SP (C-20J, VC-111)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "GA7",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "GA-7 Cougar",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "U16",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "HU-16, SA-16, UF Albatross(G-64/111)***",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "V1",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "OV-1, RV-1, AO-1 Mohawk (G-134)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "S2P",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "S-2, S2F, P-16 Tracker (G-89)",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "S2T",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "S-2 Turbo Tracker",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "X29",
    "manufacturer": "GRUMMAN AEROSPACE CORP. (USA)",
    "name": "X-29 (712) ",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "AC90",
    "manufacturer": "GULFSTREAM AEROSPACE CORP. (USA)",
    "name": "690 Jetprop Commander 840/900",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AC95",
    "manufacturer": "GULFSTREAM AEROSPACE CORP. (USA)",
    "name": "695 Jetprop Commander 980/1000",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AA1",
    "manufacturer": "GULFSTREAM AEROSPACE CORP. (USA)",
    "name": "AA-1 T-Cat, Lynx",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AA5",
    "manufacturer": "GULFSTREAM AEROSPACE CORP. (USA)",
    "name": "AA-5 Traveler, Cheetah, Tiger",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "GA7",
    "manufacturer": "GULFSTREAM AEROSPACE CORP. (USA)",
    "name": "GA-7 Cougar",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "G159",
    "manufacturer": "GULFSTREAM AEROSPACE CORP. (USA)",
    "name": "GAC 159-C, Gulfstream 1 ",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "GLF2",
    "manufacturer": "GULFSTREAM AEROSPACE CORP. (USA)",
    "name": "G-1159, G-1159B/TT Gulfstream2/2B/2SP/2TT",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "GLF3",
    "manufacturer": "GULFSTREAM AEROSPACE CORP. (USA)",
    "name": "G-1159A Gulfstream 3/SRA-1,SMA-3 (C20A/B/C/D/E)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "GLF4",
    "manufacturer": "GULFSTREAM AEROSPACE CORP. (USA)",
    "name": "G-1159C Gulfstream 300/4/4SP/400/SRA-4 (C-20F/G/H, S102,Tp102, U-4)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "GLF5",
    "manufacturer": "GULFSTREAM AEROSPACE CORP. (USA)",
    "name": "G-1159D Gulfstream 5/500/550(C-37)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B18T",
    "manufacturer": "HAMILTON AVIATION (USA)",
    "name": "Westwind 2/3",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BE18",
    "manufacturer": "HAMILTON AVIATION (USA)",
    "name": "Little Liner",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "T28",
    "manufacturer": "HAMILTON AVIATION (USA)",
    "name": "T-28 Nomair",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "JS1",
    "manufacturer": "HANDLEY PAGE (UK)",
    "name": "HP-137 Jetstream 1",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "JS20",
    "manufacturer": "HANDLEY PAGE (UK)",
    "name": "HP-137 Jetstream 200 (T.Mk1/2)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "COUR",
    "manufacturer": "HELIO AIRCRAFT COMPANY (USA)",
    "name": "H-391/392/395/250/295/700/800,HT-295 Courier, Strato-Courier, Super Courier (U-10)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "STLN",
    "manufacturer": "HELIO AIRCRAFT COMPANY (USA)",
    "name": "HST-550 Stallion (AU-24)",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "TCOU",
    "manufacturer": "HELIO AIRCRAFT COMPANY (USA)",
    "name": "H-500 Twin Courier (U-5)",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "HF20",
    "manufacturer": "HFB (FRG) ",
    "name": "HFB-320 Hansa",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "L18",
    "manufacturer": "HOWARD (USA)",
    "name": "250, 350",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "DG15",
    "manufacturer": "HOWARD (USA)",
    "name": "DGA-15 (GH Nightingale, NH)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "ARVA",
    "manufacturer": "IAI (Israel)",
    "name": "101 Avara, 102, 201, 202",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "WW23",
    "manufacturer": "IAI (Israel)",
    "name": "1123 Westwind",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "WW24",
    "manufacturer": "IAI (Israel)",
    "name": "1124 Westwind",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "ASTR",
    "manufacturer": "IAI (Israel)",
    "name": "1125 Gulfstream 100, (C-38)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "GALX",
    "manufacturer": "IAI (Israel)",
    "name": "1126 Gulfstream 200",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "G150",
    "manufacturer": "IAI (Israel)",
    "name": "Gulfstream 150",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A50",
    "manufacturer": "ILYUSHIN (Russia)",
    "name": "A-50, Be-976",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "IL14",
    "manufacturer": "ILYUSHIN (Russia)",
    "name": "Il-14",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "IL18",
    "manufacturer": "ILYUSHIN (Russia)",
    "name": "Il-18/20/22/24, Bizon, Zebra",
    "engineCount": "4",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "IL28",
    "manufacturer": "ILYUSHIN (Russia)",
    "name": "Il-28",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "IL38",
    "manufacturer": "ILYUSHIN (Russia)",
    "name": "Il-38",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "IL62",
    "manufacturer": "ILYUSHIN (Russia)",
    "name": "IL-62",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "IL76",
    "manufacturer": "ILYUSHIN (Russia)",
    "name": "IL-76/78/82, Gajaraj",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "IL86",
    "manufacturer": "ILYUSHIN (Russia)",
    "name": "Il-86/87",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "IL96",
    "manufacturer": "ILYUSHIN (Russia)",
    "name": "Il-96",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "I103",
    "manufacturer": "ILYUSHIN (Russia)",
    "name": "Il-103",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "I114",
    "manufacturer": "ILYUSHIN (Russia)",
    "name": "Il-114",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "LA25",
    "manufacturer": "LAKE AIRCRAFT (USA)",
    "name": "LA-250/270 (Turbo) Renegade,Seawolf, SeaFury***",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "LA4",
    "manufacturer": "LAKE AIRCRAFT (USA)",
    "name": "LA-4/200, Buccaneer***",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "L37",
    "manufacturer": "LOCKHEED CORP. (USA)",
    "name": "B-34, PV Venture, Harpoon(L-15/137/237)",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "C5",
    "manufacturer": "LOCKHEED CORP. (USA)",
    "name": "C-5 Galaxy (L-500)",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "C130",
    "manufacturer": "LOCKHEED CORP. (USA)",
    "name": "C-130A/B/E/F/H, CC-130, DC-130,EC-130/E/G/H/Q, HC-130, JC-130,KC-130B/F/H/R/T, LC-130, MC-130,NC-130, RC-130, TC-130, VC-130,WC-130E/H, T-10, TK-10, TL-10,Tp84 Hercules, Spectre, Aya, Karnaf,Sapeer (L-100/182/282/382)",
    "engineCount": "4",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "C141",
    "manufacturer": "LOCKHEED CORP. (USA)",
    "name": "C-141 Starlifter (L-300)",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "CONI",
    "manufacturer": "LOCKHEED CORP. (USA)",
    "name": "L-049/749/1049 Constellation, Super Constellation, Starliner (C-121,RC-121, EC-121, VC-121, WV, R7V,Warning Star)",
    "engineCount": "4",
    "engineType": "P",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "F22",
    "manufacturer": "LOCKHEED CORP. (USA)",
    "name": "F-22 Raptor (L-645)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "F104",
    "manufacturer": "LOCKHEED CORP. (USA)",
    "name": "F-104, RF-104, TF-104  Starfighter(L583/683)",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "F117",
    "manufacturer": "LOCKHEED CORP. (USA)",
    "name": "F-117 Nighthawk",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "L101",
    "manufacturer": "LOCKHEED CORP. (USA)",
    "name": "L-1011 Tri-Star (all series)",
    "engineCount": "3",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "L18",
    "manufacturer": "LOCKHEED CORP. (USA)",
    "name": "L-18 Lodestar (C-56/57/59/60, R50,XR50)",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "L188",
    "manufacturer": "LOCKHEED CORP. (USA)",
    "name": "L-188 Electra",
    "engineCount": "4",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "L29A",
    "manufacturer": "LOCKHEED CORP. (USA)",
    "name": "L-1329 Jetstar 6/8",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "L29B",
    "manufacturer": "LOCKHEED CORP. (USA)",
    "name": "L-1329-5 Jetstar 2/731",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "P2",
    "manufacturer": "LOCKHEED CORP. (USA)",
    "name": "P-2D to H, SP-2, P2V Neptune(L-426/726/826)",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "P3",
    "manufacturer": "LOCKHEED CORP. (USA)",
    "name": "P-3, AP-3, EP-3, NP-3, RP-3, TP-3,UP-3, VP-3, WP-3, CP-140 Orion,Aurora, Arcturus (L-85/285/685/785)",
    "engineCount": "4",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "P38",
    "manufacturer": "LOCKHEED CORP. (USA)",
    "name": "P-38, F-5 Lightning (L-222/322/422)",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "S3",
    "manufacturer": "LOCKHEED CORP. (USA)",
    "name": "S-3, ES-3, US-3 Viking (L-394)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "SR71",
    "manufacturer": "LOCKHEED CORP. (USA)",
    "name": "SR-71 Blackbird",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "T33",
    "manufacturer": "LOCKHEED CORP. (USA)",
    "name": "T-33, AT-33, NT-33, RT-33 ShootingStar, T-Bird (L-580)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "U2",
    "manufacturer": "LOCKHEED CORP. (USA)",
    "name": "U-2, ER-2",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "M404",
    "manufacturer": "MARTIN COMPANY (USA)",
    "name": "404",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "B26M",
    "manufacturer": "MARTIN COMPANY (USA)",
    "name": "B-26 Marauder (179)",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "WB57",
    "manufacturer": "MARTIN COMPANY (USA)",
    "name": "WB-57 (272)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "M4",
    "manufacturer": "MAULE AIRCRAFT CORP. (USA)",
    "name": "M-4 Bee Dee, Jetasen, Rocket, Astro Rocket, Strata Rocket",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "M5",
    "manufacturer": "MAULE AIRCRAFT CORP. (USA)",
    "name": "M-5, Strata Rocket,  Lunar Rocket, Patroller",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "M6",
    "manufacturer": "MAULE AIRCRAFT CORP. (USA)",
    "name": "M-6 Super-Rocket",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "M7",
    "manufacturer": "MAULE AIRCRAFT CORP. (USA)",
    "name": "M-7-235/260, MT-7-235/260,MX-7-160/180/235, MXT-7-160/180Super Rocket, Star Rocket, Comet,Star Craft, Orion, Sportplane",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "M7T",
    "manufacturer": "MAULE AIRCRAFT CORP. (USA)",
    "name": "M-7-420, MT-7-240, MX-7-420,MXT-7-420 Star Craft",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "M8",
    "manufacturer": "MAULE AIRCRAFT CORP. (USA)",
    "name": "M-8",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "A3",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "Skywarrior",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A4",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "A-4, OA-4, TA-4 Skyhawk",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B26",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "Invader",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "C15",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "YC-15",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "C17",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "C-17 Globemaster 3",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "DC10",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "DC-10 (KC-10 Extender, KDC-10,MD-10)",
    "engineCount": "3",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "DC3",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "Skytrain (C-47, C-53, C-117 A/B/C,R4D 1 to 7)",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S+",
    "srsClass": "III",
    "maxCruiseSpeed": "270",
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "DC3S",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "Super DC-3 (C-117D, R4D 8)",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S+",
    "srsClass": "III",
    "maxCruiseSpeed": "270",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "DC4",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "Skymaster",
    "engineCount": "4",
    "engineType": "P",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "270",
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "DC6",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "DC-6/B Liftmaster",
    "engineCount": "4",
    "engineType": "P",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "270",
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "DC7",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "DC-7/B/C Seven Seas",
    "engineCount": "4",
    "engineType": "P",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "270",
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "DC85",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "DC-8-50, Jet Trader",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "DC86",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "DC-8-60",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "DC87",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "DC-8-70",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "DC8Q",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "DC-8 Stage 3 (US Only) ",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "DC9Q",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "DC-9 Stage 3 (US Only) ",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "DC91",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "DC-9-10",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "DC92",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "DC-9-20",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "DC93",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "DC-9-30 (C-9, VC-9, Nightingale,Skytrain 2)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "DC94",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "DC-9-40",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "DC95",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "DC-9-50",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "F15",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "F-15 Eagle, Baz, Akef, Ra'am",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "F18",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "FA-18, CF-18, CF-188, EF-18, C-15,CE-15, AF-18, ATF-18 Hornet, Super Hornet",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "F4",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "F-4, RF-4, QF-4 Phantom 2/2000,Kurnass",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "MD11",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "MD-11",
    "engineCount": "3",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "MD81",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "MD-81",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "MD82",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "MD-82",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "MD83",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "MD-83",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "MD87",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "MD-87",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "MD88",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "MD-88",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "MD90",
    "manufacturer": "MCDONNELL-DOUGLAS CORP. (USA)",
    "name": "MD-90",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "ME08",
    "manufacturer": "MESSERSCHMITT (FRG)",
    "name": "Bf-108 Taifun",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "ME09",
    "manufacturer": "MESSERSCHMITT (FRG)",
    "name": "Bf-109",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "ME62",
    "manufacturer": "MESSERSCHMITT (FRG)",
    "name": "Me-262, Replica",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "S223",
    "manufacturer": "MESSERSCHMITT-BOLKOW (FRG)",
    "name": "223 Flamingo",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "B209",
    "manufacturer": "MESSERSCHMITT-BOLKOW (FRG)",
    "name": "BO-209 Monsun",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "ZERO",
    "manufacturer": "MITSUBISHI AIRCRAFT INTERNATIONAL INC. (USA/Japan)",
    "name": "A6M Zero",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "F1",
    "manufacturer": "MITSUBISHI AIRCRAFT INTERNATIONAL INC. (USA/Japan)",
    "name": "F-1",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "F2",
    "manufacturer": "MITSUBISHI AIRCRAFT INTERNATIONAL INC. (USA/Japan)",
    "name": "F-2",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "F86",
    "manufacturer": "MITSUBISHI AIRCRAFT INTERNATIONAL INC. (USA/Japan)",
    "name": "F-86 Sabre",
    "engineCount": "I",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "MU2",
    "manufacturer": "MITSUBISHI AIRCRAFT INTERNATIONAL INC. (USA/Japan)",
    "name": "MU-2, Marquise, Solitaire (LR-1)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "MU30",
    "manufacturer": "MITSUBISHI AIRCRAFT INTERNATIONAL INC. (USA/Japan)",
    "name": "MU-300  Diamond",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "MT2",
    "manufacturer": "MITSUBISHI AIRCRAFT INTERNATIONAL INC. (USA/Japan)",
    "name": "T-2",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "ERCO",
    "manufacturer": "MOONEY AIRCRAFT CORP. (USA)",
    "name": "A-2 Aircoupe",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "M10",
    "manufacturer": "MOONEY AIRCRAFT CORP. (USA)",
    "name": "M-10 Cadet",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "MITE",
    "manufacturer": "MOONEY AIRCRAFT CORP. (USA)",
    "name": "M-18  Mite, Wee Scotsman",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "M20P",
    "manufacturer": "MOONEY AIRCRAFT CORP. (USA)",
    "name": "M-20, M-20/A/B/C/D/E/F/G/J/L/R/S, Mark 21, Allegro, Eagle, Ranger, Master, Super 21, Chaparral, Executive, Statesman, Ovation, 201,202, 205, 220, ATS, MSE, PFM (nonturbocharged engine)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "M20T",
    "manufacturer": "MOONEY AIRCRAFT CORP. (USA)",
    "name": "M-20K/M, Encore, Bravo,  231, 252,TLS, TSE (turbocharged engine)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "M22",
    "manufacturer": "MOONEY AIRCRAFT CORP. (USA)",
    "name": "M-22, Mustang",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "CP10",
    "manufacturer": "MUDRY (France)",
    "name": "CAP-10",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "CP20",
    "manufacturer": "MUDRY (France)",
    "name": "CAP-20",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "CP21",
    "manufacturer": "MUDRY (France)",
    "name": "CAP-21",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "CP23",
    "manufacturer": "MUDRY (France)",
    "name": "CAP-230/231/232",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "D140",
    "manufacturer": "MUDRY (France)",
    "name": "D-140 Mousquetaire",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "YS11",
    "manufacturer": "NAMC (Japan)",
    "name": "YS-11",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "RANG",
    "manufacturer": "NAVION (USA)",
    "name": "Rangemaster",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "NORS",
    "manufacturer": "NOORDYUN AVIATION LTD. (Canada)",
    "name": "Norseman Mk 4/5/6",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "C160",
    "manufacturer": "NORD (France)",
    "name": "Transall C-160",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "N260",
    "manufacturer": "NORD (France)",
    "name": "260 Super Broussard",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "N262",
    "manufacturer": "NORD (France)",
    "name": "262, Fr???gate, Mohawk 298",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "ME08",
    "manufacturer": "NORD (France)",
    "name": "1000, 1001, 1002 Pingouin",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "N110",
    "manufacturer": "NORD (France)",
    "name": "1101, 1102, Noralpha, Ramier",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "N120",
    "manufacturer": "NORD (France)",
    "name": "1200 to 1204 Norecrin",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "NORA",
    "manufacturer": "NORD (France)",
    "name": "2501 to 2508 Noratlas",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "N320",
    "manufacturer": "NORD (France)",
    "name": "3202",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "N340",
    "manufacturer": "NORD (France)",
    "name": "3400",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "SV4",
    "manufacturer": "NORD (France)",
    "name": "SV-4",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "B2",
    "manufacturer": "NORTHROP CORP. (USA)",
    "name": "B-2 Spirit",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "C125",
    "manufacturer": "NORTHROP CORP. (USA)",
    "name": "C-125 Raider",
    "engineCount": "3",
    "engineType": "P",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "E2",
    "manufacturer": "NORTHROP CORP. (USA)",
    "name": "E-2 Hawkeye",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "F5",
    "manufacturer": "NORTHROP CORP. (USA)",
    "name": "F-5, RF-5 Freedom Fighter,  Tiger 2,Tigereye (N-156C/F)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "P61",
    "manufacturer": "NORTHROP CORP. (USA)",
    "name": "P-61 Black Widow",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "T38",
    "manufacturer": "NORTHROP CORP. (USA)",
    "name": "T-38, AT-38 Talon (N-156T)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "P68T",
    "manufacturer": "PARTENAVIA (Italy)",
    "name": "AP-68TP-300 Spartacus",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "VTOR",
    "manufacturer": "PARTENAVIA (Italy)",
    "name": "AP-68TP-600 Viator",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "P57",
    "manufacturer": "PARTENAVIA (Italy)",
    "name": "P-57 Fachiro 2",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "OSCR",
    "manufacturer": "PARTENAVIA (Italy)",
    "name": "P-64/66 Oscar, Charlie",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "P68",
    "manufacturer": "PARTENAVIA (Italy)",
    "name": "P68,Victor, Observer",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "P136",
    "manufacturer": "PIAGGIO (Industrie Aeronautiche E Meccaniche Rinaldo Piaggio SpA) (Italy)",
    "name": "P-136***",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "P148",
    "manufacturer": "PIAGGIO (Industrie Aeronautiche E Meccaniche Rinaldo Piaggio SpA) (Italy)",
    "name": "P-148",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "P149",
    "manufacturer": "PIAGGIO (Industrie Aeronautiche E Meccaniche Rinaldo Piaggio SpA) (Italy)",
    "name": "P-149",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "P66P",
    "manufacturer": "PIAGGIO (Industrie Aeronautiche E Meccaniche Rinaldo Piaggio SpA) (Italy)",
    "name": "P-166, P-166A/B/C/DL2/M/S,Portofino, Albatross",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "P66T",
    "manufacturer": "PIAGGIO (Industrie Aeronautiche E Meccaniche Rinaldo Piaggio SpA) (Italy)",
    "name": "P-166DL3/DP1",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "P180",
    "manufacturer": "PIAGGIO (Industrie Aeronautiche E Meccaniche Rinaldo Piaggio SpA) (Italy)",
    "name": "P-180 Avanti",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "P808",
    "manufacturer": "PIAGGIO (Industrie Aeronautiche E Meccaniche Rinaldo Piaggio SpA) (Italy)",
    "name": "PD-808",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "PP2",
    "manufacturer": "PILATUS FLUGZEUGWERKE AG (Switzerland)",
    "name": "P-2",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PP3",
    "manufacturer": "PILATUS FLUGZEUGWERKE AG (Switzerland)",
    "name": "P-3",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PC6P",
    "manufacturer": "PILATUS FLUGZEUGWERKE AG (Switzerland)",
    "name": "PC-6 Porter",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PC6T",
    "manufacturer": "PILATUS FLUGZEUGWERKE AG (Switzerland)",
    "name": "PC-6A/B/C Turbo Porter (UV-20Chiricahua)",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PC7",
    "manufacturer": "PILATUS FLUGZEUGWERKE AG (Switzerland)",
    "name": "PC-7 Turbo Trainer (AT-92, Astra)",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PC9",
    "manufacturer": "PILATUS FLUGZEUGWERKE AG (Switzerland)",
    "name": "PC-9, Hudurnik",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PC12",
    "manufacturer": "PILATUS FLUGZEUGWERKE AG (Switzerland)",
    "name": "PC-12, Eagle",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "AEST",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "AP-60, Aerostar",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "J2",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "J-2 Cub",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "J3",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "J-3 Cub (L-4, NE)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "J4",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "J-4 Cub Coupe",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "J5",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "J-5 Cub Cruiser (L-14, AE)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "PA11",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-11 Cub Special (L-18B)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PA12",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-12 Super Cruiser",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PA14",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-14 Family Cruiser",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PA15",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-15 Vagabond",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PA16",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-16 Clipper",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PA17",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-17 Vagabond, Vagabond Trainer",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PA18",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-18 Super Cub (L-18C, L-21,U-7)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PA20",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-20 Pacer",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PA22",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-22 Tri-Pacer, Caribbean, Colt",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PA23",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-23-150/160 Apache",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PA24",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-24 Comanche",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PA25",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-25 Pawnee",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PA27",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-23-235/250 Aztec, Turbo Aztec(U-11, E-19, UC-26)",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "P28A",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-28-140/150/151/160/161/180/181Archer, Cadet, Cherokee, Cherokee Archer/Challenger/Chief/Cruiser/Flite Liner/Warrior",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "P28B",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-28-201T/235/236 Cherokee,Cherokee Charger/Pathfinder, Dakota,Turbo Dakota",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "P28R",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-28R-1802/3, Turbo Arrow3/200/201 Cherokee Arrow, Arrow",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "P28T",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-28RT Arrow 4, Turbo Arrow 4",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "PA30",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-30/39 Twin Comanche, TwinComanche CR, Turbo Twin Comanche",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "PA31",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-31/31P Navajo, Navajo Chieftain,Chieftain, Pressurized Navajo,Mohave, T-1020",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "PA32",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-32 Cherokee Six, Six, Saratoga,Turbo Saratoga, 6, 6XT",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "P32R",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-32R Cherokee Lance, Lance,Saratoga SP/2 HP/2TC, TurboSaratoga SP",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "P32T",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-32RT Lance 2, Turbo Lance 2",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "PA34",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-34 Seneca",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "PA36",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-36  Pawnee Brave",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "PA38",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-38 Tomahawk",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "PA44",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-44, Seminole, Turbo Seminole",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "PA46",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-46 310P/350P Malibu, MalibuMirage",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "P46T",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-46-500TP Malibu Meridian",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "PAT4",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-31T3-500 T-1040",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "PAY1",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-31T1-500 Cheyenne 1 ",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "PAY2",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-31T-620.T2-620 Cheyenne,Cheyenne 2",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "PAY3",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-42-720 Cheyenne 3",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "PAY4",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-42-1000 Cheyenne 400",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "PILL",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "PA-28R-300 Pill???n",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "S108",
    "manufacturer": "PIPER AIRCRAFT CORP. (USA)",
    "name": "108 Voyager, Station Wagon 108",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PTS1",
    "manufacturer": "PITTS AEROBATICS (Manufactured by Christen Industries, Inc.)(USA)",
    "name": "S-1 Special",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PTSS",
    "manufacturer": "PITTS AEROBATICS (Manufactured by Christen Industries, Inc.)(USA)",
    "name": "S-1-11 Super Stinker",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PTS2",
    "manufacturer": "PITTS AEROBATICS (Manufactured by Christen Industries, Inc.)(USA)",
    "name": "S-2 Special",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "PTMS",
    "manufacturer": "PITTS AEROBATICS (Manufactured by Christen Industries, Inc.)(USA)",
    "name": "S-12 Macho Stinker, Super Stinker",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "R100",
    "manufacturer": "ROBIN (France)",
    "name": "R-1180 Aiglon",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "R200",
    "manufacturer": "ROBIN (France)",
    "name": "R-2100/2112/2120/2160, Alpha, AlphaSport, Super Club",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "R300",
    "manufacturer": "ROBIN (France)",
    "name": "R-300/3000/3100/3120/3140",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "VO10",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "100 Commander 100",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AC11",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "112, 114 Commander 112/114, AlpineCommander, Gran TurismoCommander",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "M200",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "200 Commander 200",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AC50",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "500 Shrike Commander ",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AC52",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "Commander 520",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AC56",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "560 Commander 560",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AC68",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "680F, 680FP, Commander 680F/680FP",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AC6L",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "680FL, Grand Commander,Commander 685",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AC72",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "720 Alti-Cruiser",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AC80",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "680T, 680V Turbo Commander ",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AC90",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "690 Turbo Commander 690, Jetprop Commander 840",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AC95",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "695 Jetprop Commander 980/1000",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "RC70",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "700, 710 Commander 700/710",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "C130",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "AC-130 Spectre",
    "engineCount": "4",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "B1",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "B-1 Lancer",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "R2TH",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "FR-06 Fanranger, Ranger 2000",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B25",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "Mitchell",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "F86",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "Sabre ",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "JCOM",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "Jet Commander 1121 ",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "LARK",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "Lark 100 Commander ",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "NAVI",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "Navion NA 145/154 ",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "P51",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "Mustang ",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "SBR1",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "NA-265 Sabre 40/60/65",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "SBR2",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "NA-265 Sabre 75/80",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "V10",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "OV-10 Bronco",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "SS2P",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "S-2 Thrush Commander",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "SSAB",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "Super Sabre F-100 ",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "T2",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "T-2 Buckeye",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "T28",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "Trojan, Nomair, Nomad",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "T6",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "Texan, Harvard ",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "VO10",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "Darter 100 ",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "X31",
    "manufacturer": "ROCKWELL INTERNATIONAL CORP. (USA)",
    "name": "X-31",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "R90F",
    "manufacturer": "RUSCHMEYER (FRG)",
    "name": "R-90-230FG",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "R90R",
    "manufacturer": "RUSCHMEYER (FRG)",
    "name": "R-90-230RG, MF-85",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "R90T",
    "manufacturer": "RUSCHMEYER (FRG)",
    "name": "R-90-420AT",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "SB29",
    "manufacturer": "SAAB (Sweden/USA)",
    "name": "29 (J29)",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "SB32",
    "manufacturer": "SAAB (Sweden/USA)",
    "name": "32 Lansen (J32)",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "SB35",
    "manufacturer": "SAAB (Sweden/USA)",
    "name": "35 Draken (J35, Sk35, F-35, RF-35,TF-35)",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "SB37",
    "manufacturer": "SAAB (Sweden/USA)",
    "name": "37 Viggen (AJ37, AJS37, JA37, SP37,SH37, Sk37)",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "SB39",
    "manufacturer": "SAAB (Sweden/USA)",
    "name": "39 Gripen (JAS39)",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "SB91",
    "manufacturer": "SAAB (Sweden/USA)",
    "name": "91 Safir (Sk50)",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "SB05",
    "manufacturer": "SAAB (Sweden/USA)",
    "name": "105 (Sk60) ",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "SF34",
    "manufacturer": "SAAB (Sweden/USA)",
    "name": "340",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "SB20",
    "manufacturer": "SAAB (Sweden/USA)",
    "name": "2000",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "MF17",
    "manufacturer": "SAAB (Sweden/USA)",
    "name": "MFI-15/17 Safari, Supporter (T-17)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "SH33",
    "manufacturer": "SHORT BROTHERS LTD. (UK)",
    "name": "330, Sherpa (C-23), SD3-30",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "SH36",
    "manufacturer": "SHORT BROTHERS LTD. (UK)",
    "name": "360, SD3-60",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "BELF",
    "manufacturer": "SHORT BROTHERS LTD. (UK)",
    "name": "SC-5 Belfast",
    "engineCount": "4",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "SC7",
    "manufacturer": "SHORT BROTHERS LTD. (UK)",
    "name": "SC7 Skyvan, Skyliner",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "L8",
    "manufacturer": "SILVAIRE (USA)",
    "name": "8 Silvaire",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "S10",
    "manufacturer": "STINSON (USA)",
    "name": "10, 105, HW-75, HW-80, Voyager",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "S108",
    "manufacturer": "STINSON (USA)",
    "name": "108 Voyager, Station Wagon ",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "L5",
    "manufacturer": "STINSON (USA)",
    "name": "L-5, U-19, OY  Sentinel (V-76)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "RELI",
    "manufacturer": "STINSON (USA)",
    "name": "SR, V-77 Reliant (AT-19)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "TA15",
    "manufacturer": "TAYLORCRAFT AVIATION CORP. (USA)",
    "name": "15 Tourist, Foursome",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "TF19",
    "manufacturer": "TAYLORCRAFT AVIATION CORP. (USA)",
    "name": "19, F-19 Sportsman",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "TA20",
    "manufacturer": "TAYLORCRAFT AVIATION CORP. (USA)",
    "name": "20 Ranchwagon, Topper, Seabird,Zephyr 400",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "TAYA",
    "manufacturer": "TAYLORCRAFT AVIATION CORP. (USA)",
    "name": "A",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "TAYB",
    "manufacturer": "TAYLORCRAFT AVIATION CORP. (USA)",
    "name": "BC, BF, BL, Ace, Sportsman, Traveller",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "TAYD",
    "manufacturer": "TAYLORCRAFT AVIATION CORP. (USA)",
    "name": "DC, DCO, DF, DL (O-57, L-2)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "TF21",
    "manufacturer": "TAYLORCRAFT AVIATION CORP. (USA)",
    "name": "F-21",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "TF22",
    "manufacturer": "TAYLORCRAFT AVIATION CORP. (USA)",
    "name": "F-22 Classic, Tri-Classic, Ranger,Trooper, Tracker",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "AEST",
    "manufacturer": "TED SMITH AEROSTAR CORP. (USA)",
    "name": "Aero Star",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "VF14",
    "manufacturer": "VFW-FOKKER (Zentralgesellschaft VFW-Fokker mbH (FRG/Netherlands))",
    "name": "VFW 614",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A7",
    "manufacturer": "VOUGHT CORP. (USA)",
    "name": "A-7, TA-7 Corsair",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "GC1",
    "manufacturer": "VOUGHT CORP. (USA)",
    "name": "Swift",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "YK40",
    "manufacturer": "YAKOVLEV (RUSSIA)",
    "name": "Yak-40",
    "engineCount": "3",
    "engineType": "J",
    "weightClass": "S+",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "CH60",
    "manufacturer": "ZENAIR (Canada)",
    "name": "CH-600/601 Zodiac, Super Zodiac",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "CH62",
    "manufacturer": "ZENAIR (Canada)",
    "name": "CH-620 Gemini",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "CH80",
    "manufacturer": "ZENAIR (Canada)",
    "name": "CH-801 Stol",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "CH2T",
    "manufacturer": "ZENAIR (Canada)",
    "name": "CH-2000 Zenith",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "A225",
    "manufacturer": "ANTONOV (Russia)",
    "name": "An-225",
    "engineCount": "6",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "AN22",
    "manufacturer": "ANTONOV (Russia)",
    "name": "An-22 Antheus",
    "engineCount": "4",
    "engineType": "T",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "A337",
    "manufacturer": "AIRBUS INDUSTRIES (International)",
    "name": "A-330-700 Beluga XL",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "maxCruiseSpeed": "470",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A338",
    "manufacturer": "AIRBUS INDUSTRIES (International)",
    "name": "A-330-800",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "maxCruiseSpeed": "470",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A339",
    "manufacturer": "AIRBUS INDUSTRIES (International)",
    "name": "A-330-900",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "maxCruiseSpeed": "470",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A359",
    "manufacturer": "AIRBUS INDUSTRIES (International)",
    "name": "A-350-900",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "maxCruiseSpeed": "470",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A35K",
    "manufacturer": "AIRBUS INDUSTRIES (International)",
    "name": "A-350-1000",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "maxCruiseSpeed": "470",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A388",
    "manufacturer": "AIRBUS INDUSTRIES (International)",
    "name": "A-380-800",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "maxCruiseSpeed": "470",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A3ST",
    "manufacturer": "AIRBUS INDUSTRIES (International)",
    "name": "A-300ST Beluga",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A400",
    "manufacturer": "AIRBUS INDUSTRIES (International)",
    "name": "A-400M Atlas",
    "engineCount": "4",
    "engineType": "T",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "B748",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "747-8",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "BLCF",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "747-400LCF Dreamlifer",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B778",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "777-8",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B779",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "777-9",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B77L",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "777-200LR",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B77W",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "777-300LR",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B788",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "787-8 Dreamliner",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B789",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "787-9 Dreamliner",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B78X",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "787-10 Dreamliner",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "C5M",
    "manufacturer": "LOCKHEED CORP. (USA)",
    "name": "C-5M Super Galaxy",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "KC2",
    "manufacturer": "KAWASAKI",
    "name": "C-2",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "MYA4",
    "manufacturer": "MYASISHCHEV",
    "name": "M-4",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "SLCH",
    "manufacturer": "SCALED",
    "name": "351 Stratolaunch",
    "engineCount": "6",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "T144",
    "manufacturer": "TUPOLEV",
    "name": "Tu-144",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "T160",
    "manufacturer": "TUPOLEV",
    "name": "Tu-160",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "TU95",
    "manufacturer": "TUPOLEV",
    "name": "Tu-95",
    "engineCount": "4",
    "engineType": "T",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "VMT",
    "manufacturer": "MYASISHCHEV",
    "name": "VM-T Atlant",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "EC45",
    "manufacturer": "EUROCOPTER",
    "name": "EC145",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "HDJT",
    "manufacturer": "HONDA HA-420 HondaJet 2 J S 6000  6000  III",
    "name": "",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "V22",
    "manufacturer": "BELL HELICOPTER",
    "name": "V-22 OSPREY",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "I",
    "maxCruiseSpeed": "275",
    "commonEquipmentSuffixes": [
      "G"
    ],
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "E55P",
    "manufacturer": "EMBRAER",
    "name": "PHENOM 300",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "maxCruiseSpeed": "464",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "TBM9",
    "manufacturer": "AEROSPATIALE (France)",
    "name": "TBM 900 !!! NO HAWKZ7 !!!",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "maxCruiseSpeed": "250",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "E75L",
    "manufacturer": "EMBRAER (Brazil)",
    "name": "ERJ 170-200 (long wing)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "AT76",
    "manufacturer": "ATR (A\u00c3\u00a9rospatiale/Alenia)",
    "name": "ATR-72-101/102 (/G)",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "280",
    "commonEquipmentSuffixes": [
      "G"
    ],
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "G2CA",
    "manufacturer": "GUIMBAL",
    "name": "G-2 Cabri (/G)",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "maxCruiseSpeed": "90",
    "commonEquipmentSuffixes": [
      "G"
    ],
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "R22",
    "manufacturer": "ROBINSON HELICOPTER COMPANY",
    "name": "R22",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C700",
    "manufacturer": "CESSNA",
    "name": "CITATION LONGITUDE",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "maxCruiseSpeed": "483",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "SF50",
    "manufacturer": "CIRRUS",
    "name": "SF50 VISION",
    "engineCount": "1",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "maxCruiseSpeed": "305",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A20N",
    "manufacturer": "AIRBUS",
    "name": "A-320neo",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "450",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "A21N",
    "manufacturer": "AIRBUS",
    "name": "A-321neo",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "450",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "SG76",
    "manufacturer": "SIKORSKY",
    "name": "S-76",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "C56X",
    "manufacturer": "CESSNA",
    "name": "Citation Excel (/L)",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "S",
    "srsClass": "III",
    "maxCruiseSpeed": "441",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "CC19",
    "manufacturer": "CUBCRAFTERS",
    "name": "CC19 XCub",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "B407",
    "manufacturer": "BELL",
    "name": "407 Helicopter",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "B206",
    "manufacturer": "BELL",
    "name": "206 Helicopter",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "FOX",
    "manufacturer": "KITFOX",
    "name": "KITFOX",
    "engineCount": "1",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "maxCruiseSpeed": "106",
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "KODI",
    "manufacturer": "DAHER",
    "name": "Kodiak 900",
    "engineCount": "1",
    "engineType": "T",
    "weightClass": "S",
    "srsClass": "I",
    "maxCruiseSpeed": "210",
    "commonEquipmentSuffixes": [
      "G"
    ],
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "DA62",
    "manufacturer": "DIAMOND",
    "name": "DA62",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "maxCruiseSpeed": "171",
    "commonEquipmentSuffixes": [
      "G"
    ],
    "aircraftClass": "S"
  },
  {
    "equipmentCode": "B37M",
    "manufacturer": "BOEING",
    "name": "737-7 MAX",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "453",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B38M",
    "manufacturer": "BOEING",
    "name": "737-8 MAX",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "453",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "B39M",
    "manufacturer": "BOEING",
    "name": "737-9 MAX",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "L",
    "srsClass": "III",
    "maxCruiseSpeed": "453",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "H60",
    "manufacturer": "SIKORSKY",
    "name": "H-60",
    "engineCount": "2",
    "engineType": "T",
    "weightClass": "L",
    "srsClass": "I",
    "maxCruiseSpeed": "152",
    "commonEquipmentSuffixes": [
      "G"
    ],
    "aircraftClass": "L"
  },
  {
    "equipmentCode": "B77F",
    "manufacturer": "BOEING COMPANY (USA)",
    "name": "777 FREIGHTER",
    "engineCount": "2",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "maxCruiseSpeed": "482",
    "commonEquipmentSuffixes": [
      "L"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "DA40",
    "manufacturer": "DIAMOND (Canada)",
    "name": "DA-40",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "DA62",
    "manufacturer": "DIAMOND (Canada)",
    "name": "DA-62",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "II",
    "aircraftClass": "U"
  },
  {
    "equipmentCode": "CONC",
    "manufacturer": "AEROSPATIALE (France)",
    "name": "Concorde",
    "engineCount": "4",
    "engineType": "J",
    "weightClass": "H",
    "srsClass": "III",
    "maxCruiseSpeed": "1165",
    "commonEquipmentSuffixes": [
      "W"
    ],
    "aircraftClass": "J"
  },
  {
    "equipmentCode": "P06T",
    "manufacturer": "TECNAM",
    "name": "P2006T",
    "engineCount": "2",
    "engineType": "P",
    "weightClass": "S",
    "srsClass": "I",
    "maxCruiseSpeed": "155",
    "commonEquipmentSuffixes": [
      "G"
    ],
    "aircraftClass": "U"
  }
])