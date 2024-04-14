const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TransitionsSchema = Schema({
  branch: { type: mongoose.Schema.Types.ObjectId, ref: "branches" },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  seller_name: { type: String, required: true },
  buyer_name: { type: String, required: true },
  buyer_identity: { type: String, required: true },
  currency: { type: String, required: true },
  amount: { type: Number, required: true },
  exchange_rate: { type: Number, required: true },
  total_amount_in_bhat: { type: Number, required: true },
  Note: { type: String, default: "" },
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Transitions", TransitionsSchema);
