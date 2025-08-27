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
│   ├── package.json
│   ├── vite.config.ts
│   └── .env               # Vite environment variables
├── server/                 # Node.js/TypeScript server (port 4001)
│   ├── src/
│   ├── test/
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
- `server/DEVELOPMENT.md` - How to add new verifiers
- `.github/workflows/pr.yaml` - CI pipeline that must pass