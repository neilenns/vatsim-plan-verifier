export interface IVatsimGeneralInfo {
  version: number;
  reload: number;
  update: string;
  update_timestamp: string;
  connected_clients: number;
  unique_users: number;
}

export interface IVatsimFlightPlan {
  flight_rules: string;
  name: string;
  aircraft: string;
  aircraft_faa: string;
  aircraft_short: string;
  departure: string;
  arrival: string;
  alternate: string;
  cruise_tas: string; // Comes in as a string, but is a number
  altitude: string;
  deptime: string;
  enroute_time: string;
  fuel_time: string;
  remarks: string;
  route: string;
  revision_id: number;
  assigned_transponder: string;
}

export interface IVatsimPilot {
  cid: number;
  name: string;
  callsign: string;
  server: string;
  pilot_rating: number;
  military_rating: number;
  latitude: number;
  longitude: number;
  altitude: number;
  groundspeed: number;
  depTime: string;
  transponder: string;
  heading: number;
  qnh_i_hg: number;
  qnh_mb: number;
  flight_plan?: IVatsimFlightPlan;
  logon_time: string;
  last_updated: string;
  isPrefile: boolean;
}

export interface IVatsimController {
  cid: number;
  name: string;
  callsign: string;
  frequency: string;
  facility: number;
  rating: number;
  server: string;
  visual_range: number;
  text_atis: string | string[] | null;
  last_updated: string;
  logon_time: string;
}

export interface IVatsimATIS {
  cid: number;
  name: string;
  callsign: string;
  frequency: string;
  facility: number;
  rating: number;
  server: string;
  visual_range: number;
  atis_code: string;
  text_atis: string[];
  last_updated: string;
  logon_time: string;
}

export interface IVatsimServer {
  ident: string;
  hostname_or_ip: string;
  location: string;
  name: string;
  clients_connection_allowed: number;
  client_connections_allowed: boolean;
  is_sweatbox: boolean;
}

export interface IVatsimPrefile {
  cid: number;
  name: string;
  callsign: string;
  flight_plan: IVatsimFlightPlan;
  last_updated: string;
}

export interface IVatsimFacility {
  id: number;
  short: string;
  long: string;
}

export interface IVatsimRating {
  id: number;
  short: string;
  long: string;
}

export interface IVatsimPilotRating {
  id: number;
  short_name: string;
  long_name: string;
}

export interface IVatsimMilitaryRating {
  id: number;
  short_name: string;
  long_name: string;
}

export interface IVatsimData {
  general: IVatsimGeneralInfo;
  pilots: IVatsimPilot[];
  controllers: IVatsimController[];
  atis: IVatsimATIS[];
  servers: IVatsimServer[];
  // This is intentially using IVatsimPilot instead of IVatsimPrefile. The two interfaces
  // overlap in all the parts that matter for this app, and it makes managing the updates
  // of all the data much easier to have them the same type.
  prefiles: IVatsimPilot[];
  facilities: IVatsimFacility[];
  ratings: IVatsimRating[];
  pilot_ratings: IVatsimPilotRating[];
  military_ratings: IVatsimMilitaryRating[];
}
