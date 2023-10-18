import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: () => new Date().getTime(),
  },
});

export default mongoose.model("Category", categorySchema);
