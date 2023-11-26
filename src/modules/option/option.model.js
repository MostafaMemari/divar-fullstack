const { Schema, Types, model } = require("mongoose");

const OptionSchema = new Schema(
  {
    title: { type: String, required: true },
    key: { type: String, required: true },
    type: { type: String, enum: ["nmuber", "string", "array", "boolean"] },
    enum: { type: Array, default: [] },
    guid: { type: String, required: false },
    category: { type: Types.ObjectId, ref: "Category", required: true },
  },
  { versionKey: false }
);

const OptionModel = model("Option", OptionSchema);
module.exports = { OptionModel };
