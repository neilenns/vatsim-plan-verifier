import { parentPort } from "node:worker_threads";
import process from "node:process";
import { fetchAirportsFromAvioWiki } from "../controllers/airportInfo.mjs";
import { connectToDatabase, disconnectFromDatabase } from "../database.mjs";

// Mongoose has to be set up explicitly here since this is running in an entirely
// different process from the main app.
await connectToDatabase();
await fetchAirportsFromAvioWiki();
await disconnectFromDatabase();

if (parentPort) parentPort.postMessage("Done importing from AvioWiki");
// Signal the job is complete
// eslint-disable-next-line unicorn/no-process-exit
process.exit(0);
