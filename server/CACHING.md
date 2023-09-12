# How caching works in the server

The server component of this project pulls data from several different web services. All
of the service data is cached. Some of it is refreshed automatically if it has expired
when it is requested. Other data is refreshed automatically on a set schedule. This document
outlines all the cached data and when it is refreshed.

Refresh triggers can be:

* **On set schedule**: These cached items are automatically fetched and refreshed on the specified schedule, typically every 24 hours.
* **On expiry**: These cached items are refreshed if they are requested after the cache has expired.

| Data                         | DB collection        | Default expiry | Refresh trigger | Environment variable        |
| ---------------------------- | -------------------- | -------------- | --------------- | --------------------------- |
| AvioWiki airport information | airportinfo          | every 24 hours | On set schedule | AIRPORT_REFRESH_INTERVAL    |
| Flight aware routes          | flightawareroutes    | 30 days        | On expiry       | n/a                         |
| Magnetic decliation          | magneticdeclinations | 30 days        | On expiry       | n/a                         |
| METAR                        | metars               | 15 minutes     | On expiry       | n/a                         |
| VATSIM flight plans          | vatsimflightplans    | 15 seconds     | On set schedule | VATSIM_AUTO_UPDATE_INTERVAL |
| VATSIM pilot stats           | pilotstats           | 1 day          | On expiry       | n/a                         |  |
| VATSIM tuned transceivers    | tunedtransceivers    | 15 seconds     | On expiry       | n/a                         |
