import mongoose from "mongoose";

const storeItemSchema = new mongoose.Schema({
  fileName: { type: String, required: true, unique: true },
  storeItemName: { type: String, required: true },
  details: { type: String, required: true }, // Detailed description as html of the product
  mainImageIndex: { type: Number, required: true }, // Index of the main image of the product
  imageNamesList: { type: [String], required: true }, // Array of image files for the product
  imageUrlList: { type: [String], required: true }, // Array of image URLs for the product
  price: { type: Number, required: true, min: 0 }, // Base price of the product, before any discounts are applied
  discountPercentage: { type: Number, default: 0, min: 0, max: 100 }, // Discount applicable to the product, represented as a percentage
});

const StoreItemModel =
  mongoose.models.StoreItem || mongoose.model("StoreItem", storeItemSchema);
export { StoreItemModel };
