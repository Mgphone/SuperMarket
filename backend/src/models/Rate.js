const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RatesSchema = Schema({
  rates: {
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
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});
module.exports = mongoose.model("Rates", RatesSchema);
