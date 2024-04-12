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

          res.status(200).json({ branch: newBranch });
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
  getSingleBranch: async (req, res) => {
    const token = req.headers.authorization;
    const id = req.params.id;
    if (!token) {
      res.status(400).json({ message: "Check Your token" });
    }
    checkSuperUser(token)
      .then(async (result) => {
        // if sueper user or branch manager of this branch
        const branchDoc = await Branches.findById(id).select({
          monitorBy: false,
        });

        if (result.role == "super_user") {
          res.status(200).json(branchDoc);
        } else if (result.role == "branch_manager" && result.branch == id) {
          res.status(200).json(branchDoc);
        } else {
          res.status(400).json({ message: "You have no authority" });
        }
      })
      .catch((error) => res.status(400).json(error));
  },
};
module.exports = BranchesController;
