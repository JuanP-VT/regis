import mongoose from "mongoose";

// Define user roles as an enumeration for better type safety
enum Role {
  USER = "user",
  ADMIN = "admin",
}

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

// Create a model from the user schema
// This model provides methods to query the User collection
const User = mongoose.model("User", userSchema);

// Export the User model so it can be used in other parts of the application
export { User };
