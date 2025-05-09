# Automated testing

- [Automated testing](#automated-testing)
  - [Test data](#test-data)
  - [Aircraft](#aircraft)
  - [Airports](#airports)
  - [Extended airport information](#extended-airport-information)
  - [Magnetic declination](#magnetic-declination)
  - [METAR](#metar)
  - [Airlines](#airlines)
  - [Departures](#departures)
  - [FlightAware routes](#flightaware-routes)
  - [Pilot stats](#pilot-stats)
  - [Preferred routes](#preferred-routes)

The automated tests rely on existing data that gets pre-loaded into an in-memory MongoDB instance. To add additional data,
such as flight plans, airports, etc., modify the scripts in the `setup` folder.

If random 404 failures get returned during the tests it's because data wasn't found in the database and a call was attempted
to an external web service. This isn't allowed in the automated tests. Make sure the necessary data is loaded into the database
for all tests.

## Test data

Test data is pre-populated before tests run to make it easier to write unit tests.

Flight plans should be added as part of the set up for each specific test. This is to ensure each test is robust and won't break because someone changed a global flight plan for some reason. See
`verifiers/altitudeForDirectionOfFlight.spec.mts` for how to do this.

## Aircraft

|            ID            | Equipment code | Notes                                                    |
| :----------------------: | :------------: | -------------------------------------------------------- |
| 5f9f7b9b9b3b3c1b3c1b3c1b |      B737      | Jet aircraft with no common equipment suffix             |
| 5f9f7b9b9b3b3c1b3c1b3c1c |      C172      | Piston aircraft with two common equipment suffixes (A G) |
| 5f9f7b9b9b3b3c1b3c1b3c1d |      A388      | Super jet aircraft with a common equipment suffix (L)    |
| 5f9f7b9b9b3b3c1b3c1b3c1e |      TBM9      | Turboprop aircraft with a common equipment suffix        |
| 5f9f7b9b9b3b3c1b3c1b3c1f |      B738      | Heavy jet aircraft with no common equipment suffix       |

## Airports

|            ID            | Airport code |                   Notes                   |
| :----------------------: | :----------: | :---------------------------------------: |
| 5f9f7b3b9d3b3c1b1c9b4b4b |     KPDX     |                 Portland                  |
| 5f9f7b3b9d3b3c1b1c9b4b4c |     KSEA     |                  Seattle                  |
| 5f9f7b3b9d3b3c1b1c9b4b4d |     KSLE     |                   Salem                   |
| 5f9f7b3b9d3b3c1b1c9b4b4e |     KPDT     | Pendelton, no cached magnetic declination |

## Extended airport information

|            Id            | Airport code |
| :----------------------: | :----------: |
| 64b409858f265c50318d9056 |     KPDT     |

## Magnetic declination

|            Id            | Airport code |
| :----------------------: | :----------: |
| 5f9f7b9b9b3b3c1b3c1b3c1b |     KPDX     |
| 5f9f7b9b9b3b3c1b3c1b3c1c |     KSEA     |

## METAR

|            ID            | Airport Code | Altimeter |
| :----------------------: | :----------: | :-------: |
| 5f9f7b9b9b3b3c1b3c1b3c1b |     KSEA     |   29.95   |
| 5f9f7b9b9b3b3c1b3c1b3c1c |     KGEG     |   29.91   |
| 5f9f7b9b9b3b3c1b3c1b3c1d |     KPDX     |   28.91   |

## Airlines

|            ID            | Airline code | Telephony |
| :----------------------: | :----------: | :-------: |
| 64b409858f265c50318d9056 |     ASA      |  ALASKA   |

## Departures

|            ID            | Departure |
| :----------------------: | :-------: |
| 5f9f7b9b9b3b3c1b3c1b3c11 |   PTLD2   |
| 5f9f7b9b9b3b3c1b3c1b3c12 |  HAROB6   |
| 5f9f7b9b9b3b3c1b3c1b3c13 |   SEA9    |
| 5f9f7b9b9b3b3c1b3c1b3c14 |  EAGLE6   |

## FlightAware routes

| Departure | Arrival | Count |
| --------- | ------- | ----- |
| KSEA      | KPDX    | 6     |

## Pilot stats

|            ID            |   CID   |  Hours |
| :----------------------: | :-----: | -----: |
| 64d816a144012e5b4de814a1 | 1525628 | 135.48 |
| 64d816a144012e5b4de814a2 | 1525629 |   10.2 |
| 64d816a144012e5b4de814a3 | 1525630 |      1 |

## Preferred routes

| Departure | Arrival | Minimum altitude | Minimum speed | Suffixes | Engine Types |
| --------- | ------- | ---------------- | ------------- | -------- | ------------ |
| KPDX      | KSEA    | 120              | 270           | G, L, Z  | T, J         |
| KPDX      | KSEA    | 120              | 0             | G, L, Z  | T, P         |
| KPDX      | KSEA    | 130              | 250           | G, L, Z  | J            |
| KPDX      | KSEA    | 60               | 0             | A, G     | P            |
