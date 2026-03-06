# VATSIM Plan Verifier

VATSIM Plan Verifier is a web application that verifies flight plans for VATSIM controllers. It consists of a React/TypeScript client with Material-UI and a Node.js/TypeScript Express server with MongoDB database.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap, Build, and Test
- Install Node.js 20.x if not available: `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs`
- Start MongoDB (required): `docker run --name mongo-dev -d -p 27017:27017 mongo:7.0`
- Client setup:
  - `cd client`
  - `npm ci` -- takes ~30 seconds
  - `npm run build` -- takes ~20 seconds, NEVER CANCEL. Set timeout to 10+ minutes.
  - `npm run lint` -- takes ~10 seconds
- Server setup:
  - `cd server`
  - `npm ci` -- takes ~30 seconds
  - `npm run build` -- takes ~10 seconds, NEVER CANCEL. Set timeout to 10+ minutes.
  - `npm run lint` -- takes ~15 seconds
- Server tests: `npm run test` -- FAILS in network-restricted environments due to MongoDB Memory Server download. Set timeout to 30+ minutes if attempting. Tests work in environments with external network access.

### Environment Setup (CRITICAL)
**Server environment** (`server/.env` - copy from `server/.env.example`):
```
MONGO_DB_CONNECTION_STRING=mongodb://localhost:27017/
MONGO_DB_NAME=plan-verifier
FLIGHTAWARE_API_KEY=dummy-key-for-development
GEOMAG_API_KEY=dummy-key-for-development
WHITELISTED_DOMAINS=http://localhost:4000
AUTH0_AUDIENCE=dev-audience
AUTH0_CLIENT_ID=dev-client-id
AUTH0_DOMAIN=dev.auth0.com
AUTH0_CLIENT_SECRET=dev-client-secret
AUTH0_ISSUER_BASE_URL=https://dev.auth0.com
JWT_SECRET=development-secret-not-for-production
REFRESH_TOKEN_SECRET=development-refresh-secret
COOKIE_SECRET=development-cookie-secret
SESSION_EXPIRY=900
REFRESH_TOKEN_EXPIRY=2592000
API_RATE_LIMIT_MAX=100
API_RATE_LIMIT_MINUTE_WINDOW=5
DEBUG=plan-verifier:*
```

**Client environment** (`client/.env`):
```
VITE_SERVER_URL=http://localhost:4001/
VITE_API_KEY=development-api-key
VITE_SNACKBAR_AUTOHIDE_DURATION=6000
VITE_AUTH0_AUDIENCE=dev-audience
VITE_AUTH0_CLIENT_ID=dev-client-id
VITE_AUTH0_DOMAIN=dev.auth0.com
```

### Run the Application
**ALWAYS create environment files and start MongoDB first.**
- Start MongoDB: `docker run --name mongo-dev -d -p 27017:27017 mongo:7.0`
- Start server (terminal 1): `cd server && npm run start:dev` (runs on port 4001)
- Start client (terminal 2): `cd client && npm run dev` (runs on port 4000)
- Access application: `http://localhost:4000`

## Validation
- **ALWAYS manually validate the application** by starting both client and server and verifying the welcome page loads at `http://localhost:4000`
- **ALWAYS test server API** with `curl http://localhost:4001/` which should return `{"status":"success"}`
- Run `npm run lint` in both client and server directories before committing changes
- Tests may fail in network-restricted environments - this is expected and not your responsibility to fix

## Common Issues and Solutions
- **Client environment parsing error**: If you see ZodError about VITE_SNACKBAR_AUTOHIDE_DURATION, ensure `client/src/env.mts` uses `z.coerce.number()` instead of `z.number()` for this field
- **Server won't start**: Verify MongoDB is running and environment file exists
- **Network timeouts**: Server attempts to fetch VATSIM data on startup - failures are expected in restricted environments
- **Build timeouts**: NEVER CANCEL builds. They may take 10-20 minutes in some environments.

## Repository Structure
```
├── client/                 # React/TypeScript client (port 4000)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page-level components
│   │   ├── services/      # API service layer
│   │   ├── interfaces/    # TypeScript interfaces
│   │   └── env.mts        # Client environment validation (Zod)
│   ├── package.json
│   ├── vite.config.ts
│   └── .env               # Vite environment variables
├── server/                 # Node.js/TypeScript server (port 4001)
│   ├── src/
│   │   ├── controllers/   # Business logic and verifiers
│   │   │   └── verifiers/ # Individual flight plan verifier functions
│   │   ├── middleware/    # Express middleware (auth, rate limit, etc.)
│   │   ├── models/        # Typegoose/Mongoose data models
│   │   ├── routes/        # Express route definitions
│   │   ├── services/      # External service integrations
│   │   ├── types/         # TypeScript type definitions
│   │   ├── jobs/          # Scheduled background jobs (Bree)
│   │   └── env.mts        # Server environment validation (Zod)
│   ├── test/
│   │   ├── verifiers/     # Verifier unit tests
│   │   ├── setup/         # Test data setup scripts
│   │   └── TESTS.md       # Test data reference
│   ├── package.json
│   ├── DEVELOPMENT.md     # Developer notes
│   ├── CACHING.md         # Cache documentation
│   └── .env               # Server environment variables
└── .github/workflows/     # CI/CD (builds both client and server)
```

## Timing Expectations
- Client npm ci: 30 seconds
- Client build: 20 seconds, NEVER CANCEL, set 10+ minute timeout
- Client lint: 10 seconds
- Server npm ci: 30 seconds
- Server build: 10 seconds, NEVER CANCEL, set 10+ minute timeout  
- Server lint: 15 seconds
- Server tests: 30+ minutes (may fail in restricted environments), NEVER CANCEL

## Important Files
- `client/src/env.mts` - Client environment validation
- `server/src/env.mts` - Server environment validation
- `server/src/main.mts` - Server entry point
- `server/src/controllers/verifiers/allVerifiers.mts` - Registry of all active verifiers
- `server/src/types/result.mts` - Generic `Result<T, E>` discriminated union type
- `server/src/models/VerifierResult.mts` - Verifier result statuses and flight plan parts
- `server/DEVELOPMENT.md` - How to add new verifiers
- `server/CACHING.md` - Caching architecture documentation
- `.github/workflows/pr.yaml` - CI pipeline that must pass

## Technology Stack

### Server
- **Runtime**: Node.js 20.x with TypeScript (ESM modules, `.mts` file extension)
- **Framework**: Express 4
- **Database**: MongoDB via Mongoose + Typegoose (decorator-based model definitions)
- **Caching**: SpeedGoose (`.cacheQuery()` on Mongoose queries)
- **Authentication**: Auth0 with `express-oauth2-jwt-bearer`
- **Logging**: Winston with child loggers per service, optional Logtail transport
- **Scheduled jobs**: Bree
- **Real-time**: Socket.io
- **Validation**: Zod (environment variables)
- **Testing**: Mocha + Chai with MongoDB Memory Server

### Client
- **Framework**: React 18 with TypeScript (`.tsx`/`.ts` files, Vite bundler)
- **UI library**: Material UI (MUI) v5
- **State management**: Recoil
- **Routing**: React Router v6
- **Real-time**: socket.io-client
- **HTTP client**: Axios
- **Validation**: Zod (environment variables)

## Code Conventions

### TypeScript / Module System
- All server source files use the `.mts` extension (TypeScript ES modules).
- All server imports must use the compiled `.mjs` extension (not `.mts`), e.g.:
  ```ts
  import { VerifierResultModel } from "../../models/VerifierResult.mjs";
  ```
- Environment variables are validated with Zod schemas in `src/env.mts` on both client and server. Use `z.coerce.number()` for numeric env vars.

### Logging
- Use `mainLogger.child({ service: "serviceName" })` to create a named child logger in each module:
  ```ts
  import mainLogger from "../../logger.mjs";
  const logger = mainLogger.child({ service: "myVerifier" });
  logger.error(`Error: ${error.message}`, error);
  ```

### Result Type
All controller and verifier functions return `Result<T, E>` — a discriminated union defined in `server/src/types/result.mts`:
```ts
// Success
{ success: true; data: T }
// Failure
{ success: false; errorType: E; error: string }
```
Always check `.success` before accessing `.data`. Cast to `SuccessResult<T>` when needed.

## Adding a New Verifier

See `server/DEVELOPMENT.md` for the full guide. Quick reference:

1. **Create the verifier** in `server/src/controllers/verifiers/<name>.mts`. It must implement `VerifierFunction`:
   ```ts
   import mainLogger from "../../logger.mjs";
   import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
   import { type VerifierFunction } from "../../types/verifier.mjs";

   const verifierName = "myVerifier";
   const logger = mainLogger.child({ service: verifierName });

   const myVerifier: VerifierFunction = async function ({ _id, /* other FlightPlan fields */ }, saveResult = true) {
     const result = new VerifierResultModel({
       flightPlanId: _id,
       verifier: verifierName,
       flightPlanPart: "route",  // see VerifierResultFlightPlanPart enum
       priority: 5,
     });

     try {
       if (/* issue detected */) {
         result.status = VerifierResultStatus.WARNING;
         result.message = "Human-readable message for the controller.";
         result.messageId = "uniqueCamelCaseMessageId";
         result.priority = 3;
       } else {
         result.status = VerifierResultStatus.INFORMATION;
         result.message = "All clear.";
         result.messageId = "allClear";
       }

       if (saveResult) await result.save();
       return { success: true, data: result };
     } catch (err) {
       const error = err as Error;
       logger.error(`Error running ${verifierName}: ${error.message}`, error);
       return { success: false, errorType: "UnknownError", error: `Error running ${verifierName}: ${error.message}` };
     }
   };

   export default myVerifier;
   ```

2. **Register the verifier** in `server/src/controllers/verifiers/allVerifiers.mts`:
   ```ts
   import myVerifier from "./myVerifier.mjs";
   export const verifiers: Verifier[] = [
     // ... existing verifiers ...
     { name: "myVerifier", handler: myVerifier },
   ];
   ```
   Adding to this array automatically creates a route and includes it in the `/verify/all` run.

### Verifier Result Statuses (`VerifierResultStatus`)
| Status          | Meaning                                             |
| --------------- | --------------------------------------------------- |
| `OK`            | No issues found                                     |
| `INFORMATION`   | Informational only — no action required             |
| `WARNING`       | Potential issue the controller should review        |
| `ERROR`         | Definite issue that must be corrected               |
| `CUSTOMMESSAGE` | Custom message from airport/departure configuration |

### Verifier Result Flight Plan Parts (`VerifierResultFlightPlanPart`)
Valid values for `flightPlanPart`: `callsign`, `rawAircraftType`, `equipmentCode`, `departure`, `arrival`, `squawk`, `cruiseAltitude`, `route`.

### Verifier Priority
Priority `1` is highest (shown first); `5` is lowest. Use `1` for errors, `3` for warnings, `5` for informational results.

## Key Data Models

### FlightPlan (`server/src/models/FlightPlan.mts`)
The central model. Key fields: `callsign`, `departure`, `arrival`, `cruiseAltitude`, `route`, `equipmentCode`, `equipmentSuffix`, `SID`, `directionOfFlight`.

Important virtual (computed) properties:
- `isHeavy`, `isSuper` — aircraft weight class
- `isRNAVCapable`, `isGNSSCapable`, `isRVSMCapable` — capability flags derived from equipment suffix
- `cleanedRoute` — route with step climbs and VRC prefixes stripped
- `routeParts` — route split into an array of strings
- `vatsimComs` — communication method from remarks (`Voice`, `TextOnly`, `ReceiveOnly`, `Unknown`)
- `initialAltitudeInfo` — computed initial altitude based on SID and airport configuration

Auto-populated references: `equipmentInfo` (Aircraft), `departureAirportInfo` / `arrivalAirportInfo` (AirportInfo), `pilotStats` (PilotStats), `SIDInformation` (Departure), `telephony` (Airline).

### VerifierResult (`server/src/models/VerifierResult.mts`)
Stores results for each verifier run. Key fields: `flightPlanId`, `verifier`, `status`, `message`, `messageId`, `extendedMessage`, `flightPlanPart`, `priority`. Results expire after 1 week.

## Testing

Tests use **Mocha + Chai** with a **MongoDB Memory Server** spun up during the test run.

### Test Structure Pattern (verifiers)
```ts
import { expect } from "chai";
import { describe, it } from "mocha";
import { Types } from "mongoose";
import { getFlightPlan } from "../../src/controllers/flightPlans.mjs";
import myVerifier from "../../src/controllers/verifiers/myVerifier.mjs";
import { VerifierResultDocument, VerifierResultStatus } from "../../src/models/VerifierResult.mjs";
import { SuccessResult } from "../../src/types/result.mjs";
import { addFlightPlans, removeFlightPlans } from "../setup/manageFlightPlans.mjs";

const testData = [
  {
    _id: new Types.ObjectId("5f9f7b3b9d3b3c1b1c9b4b5a"),  // unique hex ID
    callsign: "ASA42",
    departure: "KSEA",
    arrival: "KPDX",
    cruiseAltitude: 200,
    rawAircraftType: "B738/L",
    route: "SEA1 SEA BUWZO KRATR2",
    squawk: "1234",
  },
];

describe("verifier: myVerifier tests", function () {
  before("Add flight plans for tests", async function () {
    await addFlightPlans(testData);
  });
  after("Remove flight plans for tests", async function () {
    await removeFlightPlans();
  });

  it("should return WARNING when ...", async function () {
    const flightPlan = await getFlightPlan("5f9f7b3b9d3b3c1b1c9b4b5a");
    expect(flightPlan.success).to.equal(true);

    const result = await myVerifier((flightPlan as SuccessResult<FlightPlanDocument>).data);
    expect(result.success).to.equal(true);

    const data = (result as SuccessResult<VerifierResultDocument>).data;
    expect(data.status).to.equal(VerifierResultStatus.WARNING);
    expect(data.messageId).to.equal("expectedMessageId");
  });
});
```

- Each test file manages its own flight plans with `before`/`after` hooks.
- **Never** share or rely on flight plans defined in other test files.
- Pre-loaded reference data (airports, aircraft, METARs, etc.) is documented in `server/test/TESTS.md`.

## Caching

The server caches data from several external services using **SpeedGoose**. Use `.cacheQuery()` on any Mongoose query to enable caching:
```ts
const result = await MyModel.findOne({ field: value }).cacheQuery({ ttl: 60 * 60 }); // 1 hour TTL
```

Key cached data and refresh strategies are documented in `server/CACHING.md`. Some caches refresh on a schedule (airport info every 24 hours, VATSIM data every 15 seconds); others refresh on expiry when next requested.