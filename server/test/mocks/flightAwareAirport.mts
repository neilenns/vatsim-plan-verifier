import MockAdapter from "axios-mock-adapter";

export default function setup(mock: MockAdapter) {
  mock.onGet(/\/aeroapi\/airports\/.*/).reply(function (config) {
    console.log(config.url);

    return [
      200,
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
        weather_url:
          "https://flightaware.com/commercial/flightxml/data/weather",
        satellite: true,
        site: "SEA",
        iata: "SEA",
        icao: "KSEA",
        faa: "SEA",
        type: "large_airport",
        wikipedia:
          "http://en.wikipedia.org/wiki/Seattle-Tacoma_International_Airport",
        keywords:
          "SEA, KSEA, Seattle-Tacoma Intl, Boeing Field, King County Intl",
      },
    ];
  });
}
