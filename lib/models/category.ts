import mongoose from "mongoose";

// Define the schema for the Category model
const categorySchema = new mongoose.Schema({
  // The name of the category, which is required and must be unique
  name: { type: String, required: true, unique: true },
  // The description of the category, which is also required
  description: { type: String, required: true },
});

// Create the Category model if it does not already exist, otherwise retrieve it
const categoryModel =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

// Export the Category model for use in other files
export { categoryModel };
