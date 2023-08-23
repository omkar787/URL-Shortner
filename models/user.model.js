import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  created_at: {
    type: Date,
    default: () => new Date().getTime(),
  },
});

export default mongoose.model("User", userSchema);
