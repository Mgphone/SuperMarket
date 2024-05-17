const checkSuperUser = require("../utils/checkjwtsuperuser");
const Branches = require("../models/Branches");
const Users = require("../models/User");
const mongoose = require("mongoose");
const date = new Date();
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
            dateOfSale: date.toISOString(),
          };
          const duplicateBranch = await Branches.find({
            branch_name: branchname,
          });
          if (duplicateBranch.length > 0) {
            return res.status(400).json({
              message: `${branchname} got already on the system choose another one`,
            });
          }
          const newBranch = new Branches(myBranches);
          await newBranch.save();

          res.status(200).json({
            message: `You have created the branch name call ${branchname}`,
          });
        } else {
          res.status(401).json({ message: "You have no authority" });
        }
      })
      .catch((error) => {
        console.error(error);
        return res
          .status(500)
          .json({ message: "An Expected error happen when creating branch" });
      });
  },
  getAllBranches: async (req, res) => {
    const token = req.headers.authorization;

    checkSuperUser(token)
      .then(async (result) => {
        if (result.role == "super_user") {
          const branchDoc = await Branches.find(
            {},
            { _id: 1, branch_name: 1, dateOfSale: 1 }
          );
          return res.status(200).json(branchDoc);
        } else if (result.role == "branch_manager") {
          const branchDoc = await Branches.find(
            { branch_manager: result.userId },
            { _id: 1, branch_name: 1 }
          );
          return res.status(200).json(branchDoc);
        } else {
          return res.status(401).json({ message: "You have no authority" });
        }
      })
      .catch((error) => {
        console.error(error);
        return res
          .status(500)
          .json({ message: "An error happen when geting all branches" });
      });
  },
  getSingleBranchAll: async (req, res) => {
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
          res.status(400).json({
            message: "You have no authority and You have to be Branch Manager",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ message: "Error happen when getting single branch" });
      });
  },
  getSingleBranch: async (req, res) => {
    const token = req.headers.authorization;
    // const id = req.params.id;

    checkSuperUser(token)
      .then(async (result) => {
        // if sueper user or branch manager of this branch
        // const branchDoc = await Branches.findById(id).select({
        //   monitorBy: false,
        // });

        // if (result.role == "super_user") {
        //   res.status(200).json(branchDoc);
        // } else
        if (result.role == "branch_manager") {
          const managerBranch = await Branches.findById(result.branch).select({
            monitorBy: false,
          });
          res.status(200).json(managerBranch);
        } else if (result.role == "branch_seller") {
          const selecAll = await Branches.findById(result.branch, {
            _id: 1,
            branch_name: 1,
            dateOfSale: 1,
          });
          res.status(200).json(selecAll);
        } else {
          res.status(400).json({
            message: "You have no authority and You have to be Branch Manager",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({ message: "Error happen when getting single branch" });
      });
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
    // const date = new Date();
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
            dateOfSale: date.toISOString(),
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
