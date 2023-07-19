# Automated testing

The automated tests rely on existing data that gets pre-loaded into an in-memory MongoDB instance. To add additional data,
such as flight plans, airports, etc., modify the scripts in the `setup` folder.

If random 404 failures get returned during the tests it's because data wasn't found in the database and a call was attempted
to an external web service. This isn't allowed in the automated tests. Make sure the necessary data is loaded into the database
for all tests.

## Available aircraft

|        ID         | Equipment code |                       Notes                        |
|:-----------------:|:--------------:|-------------------------------------------------|
| 5f9f7b9b9b3b3c1b3c1b3c1d |      A388      | Heavy jet aircraft with a common equipment suffix (L)  |
| 5f9f7b9b9b3b3c1b3c1b3c1c |      C172      | Piston aircraft with two common equipment suffixes (A G) |
| 5f9f7b9b9b3b3c1b3c1b3c1a |      B737      |      Jet aircraft with no common equipment suffix      |
| 5f9f7b9b9b3b3c1b3c1b3c1e |      TBM9      |      Turboprop aircraft with a common equipment suffix      |

## Available airports

|        ID         | Airport code |                       Notes                        |
|:-----------------:|:--------------:|:-------------------------------------------------:|
| 5f9f7b3b9d3b3c1b1c9b4b4b |      KPDX      | Portland   |
| 5f9f7b3b9d3b3c1b1c9b4b4c |      KSEA      | Seattle |

## Available airlines

|        ID         | Airline code |                       Telephony                        |
|:-----------------:|:--------------:|:-------------------------------------------------:|
| 64b409858f265c50318d9056 |      ASA      | ALASKA   |

## Available flight plans

Flight plans should be added as part of the set up for each specific test. This is to ensure each test
is robust and won't break because someone changed a global flight plan for some reason. See
`verifiers/altitudeForDirectionOfFlight.spec.mts` for how to do this.
