const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      set: (value) => value.toLowerCase(),
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["super_user", "branch_manager", "branch_seller"],
      required: true,
    },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Users", UserSchema);
