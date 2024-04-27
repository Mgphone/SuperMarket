const checkSuperUser = require("../utils/checkjwtsuperuser");
const Branches = require("../models/Branches");
const Users = require("../models/User");
const mongoose = require("mongoose");
const BranchesController = {
  createBranches: async (req, res) => {
    const token = req.headers.authorization;

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

    checkSuperUser(token)
      .then(async (result) => {
        if (result.role == "super_user") {
          const branchDoc = await Branches.find({});
          return res.status(200).json(branchDoc);
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
            const session = await mongoose.startSession();
            session.startTransaction();
            try {
              for (let i = 0; i < merge.length; i++) {
                Users.findByIdAndDelete(merge[i])
                  .then((result) => console.log("Deletedone" + result))
                  .catch((error) => console.error(error));
              }
              await Branches.deleteOne({ _id: id });
              await session.commitTransaction();
              session.endSession();
            } catch (error) {
              await session.abortTransaction();
              session.endSession;
              res
                .status(403)
                .json({ message: "Error Happen in the transition" });
            }

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

  editBranch: async (req, res) => {
    const token = req.headers.authorization;

    checkSuperUser(token)
      .then(async (result) => {
        if (result.role == "branch_manager") {
          const { openingamount, currency } = req.body;
          const updateBranch = {
            opening_amount_bhat: openingamount,
            available_currencies: currency,
            selling_amout_bhat: 0,
            transition: [],
            branch_balance: openingamount,
          };

          await Branches.findByIdAndUpdate(
            { _id: result.branch },
            updateBranch
          );

          const findBranch = await Branches.findOne({ _id: result.branch });
          return res.status(200).json(findBranch);
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
