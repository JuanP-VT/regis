import mongoose from "mongoose";

enum Role {
  USER = "user",
  ADMIN = "admin",
}
//create a schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: {
    type: String,
    required: true,
    default: Role.USER,
    enum: Object.values(Role),
  },
});
//create a model
const User = mongoose.model("User", userSchema);
export { User };
