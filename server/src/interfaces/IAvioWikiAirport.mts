interface Country {
  iso2: string;
  iso3: string;
  isoNumeric: number;
  name: string;
  officialName: string;
  localIdentifierName: string | null;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface ServedCityGoverningDistrict {
  code: string;
  name: string;
  administrativeType: string;
}

export interface IAvioWikiAirport {
  name: string;
  country: Country;
  timeZone: string;
  coordinates: Coordinates;
  aid: string;
  icao: string;
  iata: string;
  localIdentifier: string;
  servedCityGoverningDistrict: ServedCityGoverningDistrict;
  servedCity: string;
  archived: boolean;
}
