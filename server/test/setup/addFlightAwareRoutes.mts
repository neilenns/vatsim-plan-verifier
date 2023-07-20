import FlightAwareRoute from "../../src/models/FlightAwareRoute.mjs";

const routes = [
  {
    _id: "64b7ed0192296fedc3890fd0",
    departure: "KSEA",
    arrival: "KPDX",
    aircraftTypes: ["E75L"],
    count: 217,
    filedAltitudeMax: 210,
    filedAltitudeMin: 170,
    lastDepartureTime: "2023-07-20T13:09:30Z",
    route: "SEA BUWZO KRATR2",
    routeDistance: "144 sm",
  },
  {
    $oid: "64b7ed0192296fedc3890fd1",
    departure: "KSEA",
    arrival: "KPDX",
    aircraftTypes: ["B738"],
    count: 84,
    filedAltitudeMax: 210,
    filedAltitudeMin: 150,
    lastDepartureTime: "2023-07-20T06:09:00Z",
    route: "SEA HELNS6",
    routeDistance: "131 sm",
  },
  {
    _id: "64b7ed0192296fedc3890fd2",
    departure: "KSEA",
    arrival: "KPDX",
    aircraftTypes: ["B739"],
    count: 15,
    filedAltitudeMax: 270,
    filedAltitudeMin: 190,
    lastDepartureTime: "2023-07-19T06:09:00Z",
    route: "OZWLD1 OZWLD BUWZO HELNS6",
    routeDistance: "164 sm",
  },
  {
    _id: "64b7ed0192296fedc3890fd3",
    departure: "KSEA",
    arrival: "KPDX",
    aircraftTypes: ["B738"],
    count: 5,
    filedAltitudeMax: 170,
    filedAltitudeMin: 170,
    lastDepartureTime: "2023-07-19T06:20:00Z",
    route: "OZWLD1 OZWLD BUWZO KRATR2",
    routeDistance: "177 sm",
  },
  {
    _id: "64b7ed0192296fedc3890fd5",
    departure: "KSEA",
    arrival: "KPDX",
    aircraftTypes: ["B739"],
    count: 1,
    filedAltitudeMax: 270,
    filedAltitudeMin: 270,
    lastDepartureTime: "2023-07-17T18:40:00Z",
    route: "SUMMA2 SUMMA DSD",
    routeDistance: "339 sm",
  },
  {
    _id: "64b7ed0192296fedc3890fd4",
    departure: "KSEA",
    arrival: "KPDX",
    aircraftTypes: ["B762"],
    count: 1,
    filedAltitudeMax: 170,
    filedAltitudeMin: 170,
    lastDepartureTime: "2023-07-05T15:57:00Z",
    route: "DIGGN V495 SEA HELNS6",
    routeDistance: "212 sm",
  },
];

export default async function setup() {
  routes.map(async (route) => {
    var record = new FlightAwareRoute(route);
    try {
      await record.save();
    } catch (err) {
      console.log(err);
    }
  });
}
