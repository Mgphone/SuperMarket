const Trasition = require("../models/Transition");
const Branches = require("../models/Branches");
const Rate = require("../models/Rate");
const checkSuperUser = require("../utils/checkjwtsuperuser");
const Transition = require("../models/Transition");
const getISODate = require("../utils/getISODate");
const exchange_rate_value = require("../utils/exchangerate");
const mongoose = require("mongoose");
const TransitionController = {
  createTransition: async (req, res) => {
    try {
      const token = req.headers.authorization;

      checkSuperUser(token)
        .then(async (result) => {
          if (!result.branch) {
            return res.status(403).json({
              messsage: "You have no authority to make an Exchange",
            });
          }
          const transitionBranch = result.branch;
          const transitionSellerId = result.userId;
          const transitionUsername = result.username;
          const { buyer_name, buyer_identity, currency, amount, Note } =
            req.body;
          const currentRate = await Rate.find({});
          let exchange_rate;
          const currentCurrencyRate = await Rate.find(
            {},
            { [currency]: 1, _id: 0 }
          );
          if (currentCurrencyRate.some((obj) => Object.keys(obj).length > 0)) {
            if (currency === "USD") {
              exchange_rate = currentCurrencyRate[0]?.USD?.[Note];
            } else {
              exchange_rate = currentCurrencyRate[0]?.[currency];
            }
          } else {
            return res
              .status(404)
              .json({ message: "No currency Rate found for your currency" });
          }
          if (currentRate.length == 0) {
            return res.status(404).json({
              message: "There is no rate yet please come back later",
            });
          }
          if (typeof exchange_rate === "undefined") {
            return res
              .status(401)
              .json({ message: "You need to get exchange rate" });
          }
          const totalamountbhat = amount * exchange_rate;
          const newTransition = new Transition({
            branch: transitionBranch,
            seller: transitionSellerId,
            seller_name: transitionUsername,
            buyer_name: buyer_name,
            buyer_identity: buyer_identity,
            currency: currency,
            amount: amount,
            exchange_rate: exchange_rate,
            total_amount_in_bhat: totalamountbhat,
            Note: currency === "USD" ? Note : "",
          });

          const findBranch = await Branches.findById(transitionBranch);
          if (findBranch.branch_balance - totalamountbhat < 0) {
            return res
              .status(403)
              .json({ message: "You have no money on your balance" });
          }

          try {
            const updateData = {
              $inc: {
                selling_amout_bhat: totalamountbhat,
                branch_balance: -totalamountbhat,
              },
              $push: {
                transition: newTransition._id,
              },
            };
            const session = await mongoose.startSession();
            session.startTransaction();

            try {
              await newTransition.save();
              await Branches.findByIdAndUpdate(transitionBranch, updateData);
              await session.commitTransaction();
              session.endSession();
            } catch (error) {
              res
                .status(403)
                .json({ message: "Can not process the transations" });
            }

            // const showBranch = await Branches.findById(transitionBranch);
            res.status(200).json({ message: "You have create new Transition" });
          } catch (error) {
            await session.abortTransaction();
            session.endSession();
            return res.status(500).json({
              message:
                "Error happen when creating the transition and updating to branch",
            });
          }
        })
        .catch((err) => res.status(403).json({ message: "err" }));
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error Happen when creating transation" });
    }
  },
  getTransitionBranchManager: async (req, res) => {
    try {
      const token = req.headers.authorization;
      const { date } = req.body;

      checkSuperUser(token)
        .then(async (result) => {
          if (result.role === "branch_manager") {
            try {
              const findTransition = await Transition.find({
                branch: result.branch,
                createdAt: { $gte: getISODate(date) },
              }).sort({ createdAt: 1 });
              return res.status(200).json(findTransition);
            } catch (error) {
              return res.status(403).json({
                message:
                  "Can not find your searching please choose difference Date",
              });
            }
          } else {
            return res
              .status(403)
              .json({ message: "You have to be branch manager" });
          }
        })
        .catch((error) => {
          return res.status(403).json({ message: error });
        });
    } catch (error) {
      const errorMessage =
        error || "Error happen when branch manager taking Branch Transition";
      return res.status(500).json({ message: errorMessage });
    }
  },
  getTransitionByUser: async (req, res) => {
    try {
      const token = req.headers.authorization;
      // const querylimit = 3;
      const queryLimit = parseInt(req.query.queryLimit);
      checkSuperUser(token)
        .then(async (result) => {
          const sellerObjectId = new mongoose.Types.ObjectId(result.userId); // Use Mongoose's ObjectId type
          const findTransition = await Transition.find({
            seller: sellerObjectId,
          })
            .sort({ createdAt: -1 })
            .limit(queryLimit);
          const transionCount = await Transition.find({
            seller: sellerObjectId,
          });
          const transitionLength = transionCount.length;
          return res.status(200).json({ findTransition, transitionLength });
        })
        .catch((error) => {
          return res.status(403).json({ message: error });
        });
    } catch (error) {
      console.error(error);
      return res.status(403).json({ message: error });
    }
  },
  getIndividualTransition: async (req, res) => {
    const id = req.params.id;

    try {
      const findDoc = await Transition.findById(id);
      if (findDoc) {
        return res.status(200).json(findDoc);
      } else {
        return res
          .status(404)
          .json({ message: "Can not find your transitions" });
      }
      // return res.status(200).json(findDoc);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error });
    }
  },
  getAllTransitionbyDay: async (req, res) => {
    try {
      const token = req.headers.authorization;
      const { date } = req.body;

      checkSuperUser(token)
        .then(async (result) => {
          if (result.role === "super_user") {
            const findTransition = await Transition.find({
              createdAt: { $gte: getISODate(date) },
            }).sort({
              createdAt: 1,
            });
            return res.status(200).json(findTransition);
          } else
            return res
              .status(403)
              .json({ message: "You don't have super user authority" });
        })
        .catch((error) => {
          console.error(error);
          return res.status(403).json({ message: error });
        });
    } catch (error) {
      console.error(error);
      return res.status(403).json({ message: error });
    }
  },
  getTransitionByBranch: async (req, res) => {
    try {
      const token = req.headers.authorization;
      const { branchId, date } = req.body;

      checkSuperUser(token)
        .then(async (result) => {
          if (result.role === "super_user") {
            const findTransition = await Transition.find({
              branch: branchId,
              createdAt: { $gte: getISODate(date) },
            }).sort({
              createdAt: 1,
            });
            return res.status(200).json(findTransition);
          } else
            return res
              .status(403)
              .json({ message: "You don't have super user authority" });
        })
        .catch((error) => {
          console.error(error);
          return res.status(403).json({ message: error });
        });
    } catch (error) {
      console.error(error);
      return res.status(403).json({ message: error });
    }
  },
  editTransition: async (req, res) => {
    try {
      const token = req.headers.authorization;
      const {
        transitionid,
        buyer_name,
        buyer_identity,
        currency,
        Note,
        amount,
      } = req.body;

      checkSuperUser(token)
        .then(async (result) => {
          if (result.role == "branch_manager") {
            const findBranch = await Branches.findOne({ _id: result.branch });
            const TransitionValue = findBranch.transition;

            if (!TransitionValue.includes(transitionid)) {
              return res.status(403).json({
                message: "We not refund or not change for over one day period",
              });
            }
            const findTransition = await Transition.findOne({
              _id: transitionid,
            });

            const rate = await exchange_rate_value(currency, Note);
            if (typeof rate !== "number") {
              return res
                .status(404)
                .json({ message: "Make sure to enter currency correct" });
            }
            const totalamountbhat = rate * amount;
            try {
              const oldTotalAmount = findTransition.total_amount_in_bhat;
              const newTotalAMount = totalamountbhat;

              const session = await mongoose.startSession();
              session.startTransaction();
              try {
                if (oldTotalAmount !== newTotalAMount) {
                  const increment = {
                    selling_amout_bhat: newTotalAMount - oldTotalAmount,
                    branch_balance: oldTotalAmount - newTotalAMount,
                  };
                  await Branches.findOneAndUpdate(
                    { _id: findTransition.branch },
                    { $inc: increment },
                    { new: true }
                  );
                }
                const newTransitionData = {
                  buyer_name: buyer_name,
                  buyer_identity: buyer_identity,
                  currency: currency,
                  amount: amount,
                  exchange_rate: rate,
                  total_amount_in_bhat: totalamountbhat,
                  Note: currency === "USD" ? Note : "",
                };
                await Transition.findByIdAndUpdate(
                  transitionid,
                  newTransitionData,
                  { new: true }
                );
                await session.commitTransaction();
                session.endSession;
              } catch (error) {
                await session.abortTransaction();
                session.endSession();
                return res
                  .status(403)
                  .json({ message: "Error happen when transitions" });
              }

              return res
                .status(200)
                .json({ message: "You updated the transitons" });
            } catch (error) {
              return res.status(403).json({
                message: `Error happen updating the database ${error}`,
              });
            }
          } else {
            return res
              .status(403)
              .json({ message: "Yoo have to be branch manager" });
          }
        })
        .catch((error) => {
          return res.status(500).json({ message: error });
        });
    } catch (error) {
      return res.status(403).json({ message: error });
    }
  },
  deleteTransition: async (req, res) => {
    try {
      const token = req.headers.authorization;
      const { transitionid } = req.body;

      checkSuperUser(token)
        .then(async (result) => {
          if (result.role == "branch_manager") {
            const findBranch = await Branches.findOne({ _id: result.branch });
            const TransitionValue = findBranch.transition;
            if (!TransitionValue.includes(transitionid)) {
              return res.status(403).json({
                message: "We not refund or not change for over one day period",
              });
            }
            try {
              const findTransitionPromise = Transition.findOne({
                _id: transitionid,
              });
              const [findTransition] = await Promise.all([
                findTransitionPromise,
              ]);
              const session = await mongoose.startSession();
              session.startTransaction();
              try {
                const updateData = {
                  $inc: {
                    selling_amout_bhat: -findTransition.total_amount_in_bhat,
                    branch_balance: +findTransition.total_amount_in_bhat,
                  },
                  $pull: { transition: transitionid },
                };

                await Branches.findByIdAndUpdate(
                  { _id: findTransition.branch },
                  updateData
                );
                await Transition.deleteOne({ _id: transitionid });
                await session.commitTransaction();
                session.endSession();
              } catch (error) {
                await session.abortTransaction();
                session.endSession();
                return res
                  .status(403)
                  .json({ message: "Error happen when in Transaction" });
              }

              return res
                .status(200)
                .json({ message: "Transition delete and branch updated" });
            } catch (error) {
              return res
                .status(200)
                .json({ message: "There is no either branch or transition" });
            }
          } else {
            return res
              .status(403)
              .json({ message: "Yoo have to be branch manager" });
          }
        })
        .catch((error) => {
          return res.status(500).json({ message: error });
        });
    } catch (error) {
      return res.status(403).json({ message: error });
    }
  },
};
module.exports = TransitionController;
