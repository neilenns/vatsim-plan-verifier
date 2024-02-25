import { NavaidModel } from "../../src/models/Navaid.mjs";

const navaids = [
  {
    _id: "65db9d4d40a3e3f3b35a59a1",
    ident: "CARRO",
    class: "REP-PT",
    name: "CARRO,WA,US",
    type: 6,
    latitude: 47.293897,
    longitude: -122.857739,
  },
  {
    _id: "65dba546e54d20d41f89e66b",
    ident: "NORMY",
    class: "REP-PT",
    name: "NORMY,WA,US",
    type: 6,
    latitude: 47.431167,
    longitude: -121.721167,
  },
  {
    _id: "65dba55be54d20d41f89e66c",
    ident: "ZADON",
    class: "REP-PT",
    name: "ZADON,WA,US",
    type: 6,
    latitude: 47.5622,
    longitude: -121.7386,
  },
  {
    _id: "65dba55be54d20d41f89e66d",
    ident: "BKE",
    class: "H-VORW/DME",
    name: "BAKER CITY",
    type: 6,
    latitude: 44.8406059045052,
    longitude: -117.807884362355,
  },
  {
    _id: "65dba55be54d20d41f89e66e",
    ident: "ALPSE",
    class: "REP-PT",
    name: "ALPSE,WA,US",
    type: 6,
    latitude: 48.1667,
    longitude: -122.0833,
  },
  {
    _id: "65dba55be54d20d41f89e66f",
    ident: "CVO",
    class: "H-VORW/DME",
    name: "CORVALLIS",
    type: 6,
    latitude: 44.4995747870976,
    longitude: -123.29368353859,
  },
  {
    _id: "65dba55be54d20d41f89e670",
    ident: "YKM",
    class: "H-VORTACW",
    name: "YAKIMA",
    type: 8,
    latitude: 46.5702479814459,
    longitude: -120.444651011618,
  },
  {
    _id: "65dba55be54d20d41f89e671",
    ident: "BUWZO",
    class: "REP-PT",
    name: "BUWZO,WA,US",
    type: 6,
    latitude: 46.9523,
    longitude: -122.3096,
  },
  {
    _id: "65dba55be54d20d41f89e672",
    ident: "HUH",
    class: "H-VORTACW",
    name: "WHATCOM",
    type: 8,
    latitude: 48.9452912118247,
    longitude: -122.579270270156,
  },
  {
    _id: "65dba55be54d20d41f89e673",
    ident: "ALDER",
    class: "REP-PT",
    name: "ALDER,WA,US",
    type: 6,
    latitude: 46.8216,
    longitude: -122.4142,
  },
  {
    _id: "65dba55be54d20d41f89e674",
    ident: "NEZUG",
    class: "REP-PT",
    name: "NEZUG,WA,US",
    type: 6,
    latitude: 47.5687,
    longitude: -122.3097,
  },
];

export default async function setup() {
  const models = navaids.map((aircraft) => new NavaidModel(aircraft));

  try {
    await NavaidModel.bulkSave(models);
  } catch (err) {
    console.log(err);
  }
}
