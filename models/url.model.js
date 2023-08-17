import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  og_url: {
    type: String,
    required: true,
    validator: (url) => {
      const pattern =
        /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/g;
      return pattern.test(url);
    },
  },
  short_url_code: {
    type: String,
    required: true,
    minLength: 6,
  },
  //   created_by: {
  //     type: mongoose.SchemaTypes.ObjectId,
  //     required: true,
  //     ref: "Url",
  //   },
  created_at: {
    type: Date,
    required: true,
    default: () => new Date().getTime(),
  },
  updated_at: {
    type: Date,
    required: true,
    default: () => new Date().getTime(),
  },
  disabled: {
    type: Boolean,
    required: true,
    default: false,
  },

  // Analytics Portion starts here
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.model("Url", urlSchema);
