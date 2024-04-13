const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RatesSchema = Schema(
  {
    Name: { type: String, unique: true },
    USD: {
      smallNote: { type: Number, required: true },
      bigNote: { type: Number, required: true },
    },
    GBP: {
      type: Number,
      required: true,
    },
    YEN: {
      type: Number,
      required: true,
    },
    KYAT: {
      type: Number,
      required: true,
    },
    SINDOLLAR: {
      type: Number,
      required: true,
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Rates", RatesSchema);
