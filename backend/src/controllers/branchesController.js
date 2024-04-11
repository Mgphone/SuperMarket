const checkSuperUser = require("../utils/checkjwtsuperuser");
// const Branches = require("../models/Branches");
const BranchesController = {
  createBranches: async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      res.status(400).json({ message: "You have no token" });
      return;
    }

    checkSuperUser(token)
      .then((result) => {
        if (result.role === "super_user") {
          res.status(200).json({ messsage: "Coming soon for branch" });
        } else {
          res.status(401).json({ message: "You have no authority" });
        }
      })
      .catch((error) => {
        return res.status(401).json({ message: error });
      });
  },
};
module.exports = BranchesController;
