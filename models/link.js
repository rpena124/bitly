const { Schema, model } = require("mongoose");

const linkSchema = new Schema(
  {
    url: { type: String, required: true },
    shortUrl: { type: String, required: true, default: "" },
    userId: { type: String, required: false, default: "" },
    title: { type: String, required: false, default: "" },
    date: {
      type: String,
      default: new Date().toLocaleDateString("en-us", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    },
  },
  {
    timestamps: true,
  }
);

const Link = model("Link", linkSchema);

module.exports = Link;
