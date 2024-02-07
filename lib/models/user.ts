import mongoose from "mongoose";
import { Role } from "@/types/user";
// Define user roles as an enumeration for better type safety

// Create a schema for the User model
// This schema defines the structure of the documents in the User collection
const userSchema = new mongoose.Schema({
  googleId: String, // Google ID of the user
  name: { type: String, required: true }, // Name of the user, required field
  role: {
    type: String,
    required: true,
    default: Role.USER, // Default role is 'user'
    enum: Object.values(Role), // Role must be one of the values in the Role enum
  },
  profileImage: String, // URL of the user's profile image
});

// Check if the 'User' model has already been compiled. If it has, use the existing model.
// If it hasn't, create a new model from the 'userSchema'. This model provides methods to interact with the 'User' collection in the database.
// The 'User' model is exported for use in other parts of the application.
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
