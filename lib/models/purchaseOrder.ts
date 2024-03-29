import mongoose from "mongoose";

// Define the schema for the Category model
const purchaseOrderSchema = new mongoose.Schema({
  id: { type: String, required: true },
  userID: { type: String, required: true },
  createTime: { type: String, required: true },
  payer: {
    name: {
      givenName: { type: String, required: true },
      surname: { type: String, required: true },
    },
    email: { type: String, required: true },
    address: {
      countryCode: { type: String, required: true },
    },
  },
  purchaseUnits: {
    type: [
      {
        referenceID: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    required: true,
  },
});

const purchaseOrderModel =
  mongoose.models.purchaseOrder ||
  mongoose.model("purchaseOrder", purchaseOrderSchema);

export { purchaseOrderModel };
