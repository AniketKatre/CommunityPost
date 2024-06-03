const mongoose = require("mongoose");

//schema
const planSchema = new mongoose.Schema(
  {
    planName: { type: String, required: true },
    features: [String],
    limitations: [String],
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

//models
const planModel = mongoose.model("Plan", planSchema);

module.exports = planModel;
