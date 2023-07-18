import FlightAwareAirport from "../../src/models/FlightAwareAirport.mjs";

const airports = [
  {
    airport_code: "KSEA",
    name: "Seattle-Tacoma Intl",
    location: "Seattle, WA",
    latitude: 47.449001,
    longitude: -122.308998,
    timezone: "America/Los_Angeles",
    timezone_offset_sec: -25200,
    elevation_ft: 433,
    classification: 1,
    active: true,
    delay_index_url:
      "https://flightaware.com/commercial/flightxml/data/airportdelays",
    weather_url: "https://flightaware.com/commercial/flightxml/data/weather",
    satellite: true,
    site: "SEA",
    iata: "SEA",
    icao: "KSEA",
    faa: "SEA",
    type: "large_airport",
    wikipedia:
      "http://en.wikipedia.org/wiki/Seattle-Tacoma_International_Airport",
    keywords: "SEA, KSEA, Seattle-Tacoma Intl, Boeing Field, King County Intl",
    magneticDeclination: 15.23,
  },
  {
    airport_code: "KPDX",
    name: "Portland Intl",
    location: "Portland, OR",
    latitude: 45.58869934,
    longitude: -122.5979996,
    timezone: "America/Los_Angeles",
    timezone_offset_sec: -25200,
    elevation_ft: 31,
    classification: 1,
    active: true,
    delay_index_url:
      "https://flightaware.com/commercial/flightxml/data/airportdelays",
    weather_url: "https://flightaware.com/commercial/flightxml/data/weather",
    satellite: false,
    site: "PDX",
    iata: "PDX",
    icao: "KPDX",
    faa: "PDX",
    type: "large_airport",
    wikipedia: "http://en.wikipedia.org/wiki/Portland_International_Airport",
    keywords: "PDX, KPDX, Portland Intl",
    magneticDeclination: 14.85,
  },
];

export default async function setup() {
  airports.map(async (airport) => {
    var record = new FlightAwareAirport(airport);
    await record.save();
  });
}
