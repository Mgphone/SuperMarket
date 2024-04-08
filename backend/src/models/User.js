const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["super_user", "branch_manager", "branch_seller"],
    require: true,
  },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
});
module.exports = mongoose.model("Users", UserSchema);
