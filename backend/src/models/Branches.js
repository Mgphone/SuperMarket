const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BranchesSchema = new Schema(
  {
    branch_name: { type: String, unique: true, required: true },
    opening_amount_bhat: { type: Number, required: true },
    selling_amout_bhat: { type: Number, default: 0 },
    available_currencies: { type: [String], required: true },
    branch_balance: {
      type: Number,
      default: function () {
        return this.opening_amount_bhat;
      },
      required: true,
    },
    branch_manager: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    branch_seller: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    monitorBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    transition: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transitions" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Branches", BranchesSchema);
