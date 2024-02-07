/**
 * This function handles the connection to the MongoDB database.
 * It's designed to prevent connection overhead by reusing existing connections.
 *
 * @returns {Promise<void>|undefined} - The function returns a Promise that resolves when the connection is established.
 *                                      If a connection is already established or being established, it returns undefined.
 *
 * @throws {Error} - If an error occurs while trying to connect to the database, the function logs the error and throws it.
 */

import mongoose from "mongoose"; // Import the Mongoose library for MongoDB interactions

export default async function dbConnect() {
  try {
    // Check if we're already connected to the database
    // mongoose.connection.readyState is 0 if disconnected, 1 if connected, 2 if connecting, and 3 if disconnecting
    // So if it's 1 or 2, we're either already connected or currently connecting, so we can just return
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    // If we're not already connected or connecting, connect to the database
    // The connection string is taken from the environment variables
    return mongoose.connect(process.env.DB_CONNECTION_STRING);
  } catch (error) {
    // If an error occurred while trying to connect, log the error and throw it
    console.error(error);
    throw new Error("Error connecting to the database");
  }
}
