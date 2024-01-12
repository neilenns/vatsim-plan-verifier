import { AircraftModel } from "../../src/models/Aircraft.mjs";

const aircraft = [
  {
    _id: "5f9f7b9b9b3b3c1b3c1b3c1b",
    equipmentCode: "B737",
    manufacturer: "BOEING COMPANY (USA)",
    name: "737-700, BBJ, C-40",
    engineCount: "2",
    engineType: "J",
    weightClass: "L",
    KPDXVfrAltitude: "6000",
    KPDXIfrAltitude: "6000",
    srsClass: "III",
    airplaneDesignGroup: 3,
  },
  {
    _id: "5f9f7b9b9b3b3c1b3c1b3c1c",
    equipmentCode: "C172",
    manufacturer: "CESSNA AIRCRAFT COMPANY (USA)",
    name: "172, P172, R172, Skyhawk, Hawk XP, Cutlass (T-41, Mescalero) !!! NO RNAV !!!",
    engineCount: "1",
    engineType: "P",
    weightClass: "S",
    KPDXVfrAltitude: "3500",
    KPDXIfrAltitude: "3000",
    srsClass: "I",
    maxCruiseSpeed: "122",
    commonEquipmentSuffixes: ["A", "G"],
    airplaneDesignGroup: 1,
  },
  {
    _id: "5f9f7b9b9b3b3c1b3c1b3c1d",
    equipmentCode: "A388",
    manufacturer: "AIRBUS INDUSTRIES (International)",
    name: "A-380-800",
    engineCount: "4",
    engineType: "J",
    weightClass: "SUPER",
    KPDXVfrAltitude: "6000",
    KPDXIfrAltitude: "6000",
    srsClass: "III",
    maxCruiseSpeed: "470",
    commonEquipmentSuffixes: ["L"],
    airplaneDesignGroup: 6,
  },
  {
    _id: "5f9f7b9b9b3b3c1b3c1b3c1e",
    equipmentCode: "TBM9",
    manufacturer: "AEROSPATIALE (France)",
    name: "TBM 900 !!! NO RNAV !!! !!! NO HAWKZ7 !!!",
    engineCount: "1",
    engineType: "T",
    weightClass: "S",
    KPDXVfrAltitude: "3500",
    KPDXIfrAltitude: "3000",
    srsClass: "I",
    maxCruiseSpeed: "250",
    commonEquipmentSuffix: "L",
  },
  {
    _id: "5f9f7b9b9b3b3c1b3c1b3c1f",
    equipmentCode: "B748",
    manufacturer: "BOEING",
    name: "747-8",
    engineCount: "4",
    engineType: "J",
    weightClass: "H",
    srsClass: "III",
    aircraftClass: "J",
  },
];

export default async function setup() {
  await Promise.all(
    aircraft.map(async (aircraft) => {
      const record = new AircraftModel(aircraft);
      try {
        await record.save();
      } catch (err) {
        console.log(err);
      }
    })
  );
}
