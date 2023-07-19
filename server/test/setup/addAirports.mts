import FlightAwareAirport from "../../src/models/FlightAwareAirport.mjs";

const airports = [
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b4c",
    airport_code: "KSEA",
    name: "Seattle-Tacoma Intl",
    location: "Seattle, WA",
    latitude: 47.4498889,
    longitude: -122.3117778,
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
    magneticDeclination: -15.23,
  },
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b4b",
    airport_code: "KPDX",
    name: "Portland Intl",
    location: "Portland, OR",
    latitude: 45.5887089,
    longitude: -122.5968694,
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
    magneticDeclination: -14.85242,
  },
];

export default async function setup() {
  airports.map(async (airport) => {
    var record = new FlightAwareAirport(airport);
    try {
      await record.save();
    } catch (err) {
      console.log(err);
    }
  });
}
