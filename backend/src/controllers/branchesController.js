const checkSuperUser = require("../utils/checkjwtsuperuser");
const Branches = require("../models/Branches");
const BranchesController = {
  createBranches: async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      res.status(400).json({ message: "You have no token" });
      return;
    }
    checkSuperUser(token)
      .then(async (result) => {
        // console.log("This is result" + JSON.stringify(result));

        if (result.role === "super_user") {
          const monitorId = result.userId;
          const { branchname, openingamount, currency } = req.body;
          // const [USD, GBP, YEN, KYAT, SINGDOLLAR] = currency;
          const myBranches = {
            branch_name: branchname,
            opening_amount_bhat: openingamount,
            available_currencies: currency,
            monitorBy: monitorId,
          };
          console.log("Before savingbranches" + JSON.stringify(myBranches));
          const newBranch = new Branches(myBranches);
          await newBranch.save();

          res
            .status(200)
            .json({ messsage: "Coming soon for branch", banch: newBranch });
        } else {
          res.status(401).json({ message: "You have no authority" });
        }
      })
      .catch((error) => {
        return res.status(401).json({ message: error });
      });
  },
  getAllBranches: async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      res.status(400).json({ message: "Check your token" });
    }
    checkSuperUser(token)
      .then(async (result) => {
        if (result.role == "super_user") {
          const branchDoc = await Branches.find({});
          return res.status(200).json({ branchDoc });
        } else {
          return res.status(401).json({ message: "You have no authority" });
        }
      })
      .catch((error) => {
        return res.status(401).json({ message: error });
      });
  },
};
module.exports = BranchesController;
