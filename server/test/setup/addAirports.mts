import AirportInfoModel from "../../src/models/AirportInfo.mjs";

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
    delay_index_url: "https://flightaware.com/commercial/flightxml/data/airportdelays",
    weather_url: "https://flightaware.com/commercial/flightxml/data/weather",
    satellite: true,
    site: "SEA",
    iata: "SEA",
    icao: "KSEA",
    faa: "SEA",
    type: "large_airport",
    wikipedia: "http://en.wikipedia.org/wiki/Seattle-Tacoma_International_Airport",
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
    delay_index_url: "https://flightaware.com/commercial/flightxml/data/airportdelays",
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
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b4d",
    airportCode: "KSLE",
    alternateIdent: "SLE",
    icaoCode: "KSLE",
    iataCode: null,
    lidCode: "SLE",
    name: "Mcnary Fld",
    type: "Airport",
    elevation: 213,
    city: "Salem",
    state: "OR",
    longitude: -123.0025,
    latitude: 44.9095278,
    timezone: "America/Los_Angeles",
    countryCode: "US",
    wikiUrl: "http://en.wikipedia.org/wiki/McNary_Field",
    airportFlightsUrl: "/airports/KSLE/flights",
    alternatives: [],
    magneticDeclination: -14.76194,
    __v: 0,
  },
  {
    _id: "5f9f7b3b9d3b3c1b1c9b4b4e",
    airportCode: "KPDT",
    alternateIdent: "PDT",
    icaoCode: "KPDT",
    iataCode: "PDT",
    lidCode: "PDT",
    name: "Eastern Oregon Rgnl",
    type: "Airport",
    elevation: 1494,
    city: "Pendleton",
    state: "OR",
    longitude: -118.8433686,
    latitude: 45.6950953,
    timezone: "America/Los_Angeles",
    countryCode: "US",
    wikiUrl: "http://en.wikipedia.org/wiki/Eastern_Oregon_Regional_Airport",
    airportFlightsUrl: "/airports/KPDT/flights",
    alternatives: [],
    magneticDeclination: -14.07176,
    __v: 0,
  },
];

export default async function setup() {
  await Promise.all(
    airports.map(async (airport) => {
      const record = new AirportInfoModel(airport);
      try {
        await record.save();
      } catch (err) {
        console.log(err);
      }
    })
  );
}
