import process from "node:process";
import { fetchAirportsFromAvioWiki } from "../controllers/airportInfo.mjs";
import { connectToDatabase, disconnectFromDatabase } from "../database.mjs";
import { flush } from "../logger.mjs";
import postMessage from "../utils/postMessage.mjs";

// Mongoose has to be set up explicitly here since this is running in an entirely
// different process from the main app.
await connectToDatabase();
await fetchAirportsFromAvioWiki();
await disconnectFromDatabase();

postMessage("Done importing from AvioWiki");

await flush();
process.exit(0);
