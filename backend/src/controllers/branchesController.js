const checkSuperUser = require("../utils/checkjwtsuperuser");
const Branches = require("../models/Branches");
const Users = require("../models/User");
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
        } else if (result.role == "branch_manager") {
          const managerBranch = await Branches.findById(result.branch).select({
            monitorBy: false,
          });
          res.status(200).json(managerBranch);
        } else {
          res.status(400).json({ message: "You have no authority" });
        }
      })
      .catch((error) => res.status(400).json({ message: error }));
  },
  deleteBranch: async (req, res) => {
    const token = req.headers.authorization;
    const id = req.params.id;
    if (!token) {
      res.status(400).json({ message: "Check your token" });
    }
    try {
      checkSuperUser(token)
        .then(async (result) => {
          if (result.role == "super_user") {
            // const branchmanager = id;
            const branchmanager = await Branches.findById(id).select(
              "branch_manager branch_seller"
            );
            const merge = branchmanager.branch_manager.concat(
              branchmanager.branch_seller
            );

            for (let i = 0; i < merge.length; i++) {
              Users.findByIdAndDelete(merge[i])
                .then((result) => console.log("Deletedone" + result))
                .catch((error) => console.error(error));
            }
            await Branches.deleteOne({ _id: id });
            res.status(200).json({ message: "You have deleted branch" });
          } else {
            return res.status(403).json({ message: "You have no authority" });
          }
        })
        .catch((error) => res.status(400).json({ message: error }));
    } catch (error) {
      console.error("Error deleteing branch", error);
      return res.status(500).json({ message: "Internal error" });
    }
  },
  // this is for editbranch
  // "opening_amount_bhat": 1000000,
  // "selling_amout_bhat": 640,
  // "available_currencies": [
  //     "USD",
  //     "GBP",
  //     "YEN",
  //     "KYAT",
  //     "SINGDOLLAR"
  // ],
  // "branch_manager": [
  //     "661f152081a46e5ef18aa953"
  // ],
  // "branch_seller": [],
  // "monitorBy": [
  //     "661ecb3602fa3a5f6c6db379"
  // ],
  // "transition": [
  //     "661f154881a46e5ef18aa95a",
  //     "661f154c81a46e5ef18aa961",
  //     "661f154f81a46e5ef18aa968",
  //     "661f155281a46e5ef18aa96f",
  //     "661f155581a46e5ef18aa976"
  // ],
  // "branch_balance": 999360,

  // opening_amount_bhat,available_currencies(array),
  // // save another database
  // selling_amout_bhat(number),transition(array),date?

  editBranch: async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(400)
        .json({ message: "You have to check your sign in" });
    }
    const {
      opening_amount_bhat,
      available_currencies,
      selling_amout_bhat,
      transition,
    } = req.body;
    checkSuperUser(token)
      .then(async (result) => {
        if (result.role == "branch_manager") {
          const findBranch = await Branches.find({ _id: result.branch });
          const updateBranch = {
            opening_amount_bhat: opening_amount_bhat,
            available_currencies: available_currencies,
            selling_amout_bhat: selling_amout_bhat,
            transition: [],
          };
          await Branches.findByIdAndUpdate(
            { _id: result.branch },
            updateBranch
          );
          return res.status(200).json({ findBranch });
        } else {
          return res
            .status(403)
            .json({ message: "You have to be branch Manager" });
        }
      })
      .catch((error) => res.status(400).json({ message: error }));
  },
};
module.exports = BranchesController;
