import Aircraft from "../../src/models/Aircraft.mjs";

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
  },
  {
    _id: "5f9f7b9b9b3b3c1b3c1b3c1d",
    equipmentCode: "A388",
    manufacturer: "AIRBUS INDUSTRIES (International)",
    name: "A-380-800",
    engineCount: "4",
    engineType: "J",
    weightClass: "H",
    KPDXVfrAltitude: "6000",
    KPDXIfrAltitude: "6000",
    srsClass: "III",
    maxCruiseSpeed: "470",
    commonEquipmentSuffixes: ["L"],
  },
];

export default async function setup() {
  aircraft.map(async (aircraft) => {
    var record = new Aircraft(aircraft);
    try {
      await record.save();
    } catch (err) {
      console.log(err);
    }
  });
}
