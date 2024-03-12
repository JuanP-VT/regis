import mongoose from "mongoose";

// Define the schema for the Category model
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  subCategories: { type: [String], required: true },
});

// Create the Category model if it does not already exist, otherwise retrieve it
const categoryModel =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export { categoryModel };
