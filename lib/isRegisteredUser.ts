/**
 * This function checks if a user with a given Google ID is registered in the database.
 *
 * @param {string} googleId - The Google ID of the user to check.
 *
 * @returns {Promise<boolean>} - The function returns a Promise that resolves to a boolean.
 *                               It will be `true` if a user was found with the given Google ID,
 *                               and `false` otherwise.
 *
 * @throws {Error} - If an error occurs while trying to connect to the database or find the user,
 *                   the function logs the error and returns `false`.
 */

import { UserModel } from "@/lib/models/user"; // Import the User model from the models directory
import dbConnect from "./dbConnect"; // Import the dbConnect function that handles database connections

export default async function isRegisteredUser(
  googleId: string,
): Promise<boolean> {
  try {
    await dbConnect(); // Connect to the database
    const user = await UserModel.findOne({ googleId }); // Try to find a user in the database with the given Google ID

    // If a user was found, return true. If not, return false.
    return Boolean(user);
  } catch (error) {
    // If an error occurred (e.g., the database could not be reached), log the error and return false
    console.error(error);
    return false;
  }
}
