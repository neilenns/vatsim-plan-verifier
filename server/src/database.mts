import mongoose from "mongoose";

export async function connectToDatabase() {
  const url = process.env.MONGO_DB_CONNECTION_STRING;

  if (!url) {
    console.log(
      `No database connection string provided for MONGO_DB_CONNECTION_STRING`
    );
    return;
  }

  console.log(`Connecting to database at ${url}...`);
  const connect = mongoose.connect(url, {
    dbName: process.env.MONGO_DB_NAME,
  });

  await connect
    .then((db) => {
      console.log("Connected to database");
    })
    .catch((err) => {
      // Auto-reconnect logic from:
      // https://team.goodeggs.com/reconnecting-to-mongodb-when-mongoose-connect-fails-at-startup-83ca8496ca02
      console.log(
        `Failed to connect to mongo on startup - retrying in 5 secconds:\n${err}`
      );
      setTimeout(connectToDatabase, 5000);
    });
}

export async function disconnectFromDatabase() {
  console.log("Disconnecting from the database...");
  await mongoose.disconnect();
}
