const { Schema, model } = require("mongoose");

const linkSchema = new Schema(
  {
    url: { type: String, required: true },
    shortUrl: { type: String, required: true, default: "" },
    userId: { type: String, required: false, default: "" },
    title: { type: String, required: false, default: "" },
    linkTree: { type: Boolean, required: false, default: false },
    date: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Link = model("Link", linkSchema);

module.exports = Link;
