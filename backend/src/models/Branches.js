const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BranchesSchema = Schema({
  branches: [
    {
      branch_name: { type: String, unique: true, required: true },
      opening_amount_bhat: { type: Number, required: true },
      available_currencies: { type: [String], required: true },
      branch_manager: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
      branch_seller: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    },
  ],
  branch_balance: {
    type: Number,
    default: function () {
      return this.branches[0].opening_amount_bhat;
    },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Branches", BranchesSchema);
