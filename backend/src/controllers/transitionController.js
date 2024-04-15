const Trasition = require("../models/Transition");
const Branches = require("../models/Branches");
const Rate = require("../models/Rate");
const checkSuperUser = require("../utils/checkjwtsuperuser");
const Transition = require("../models/Transition");
const TransitionController = {
  createTransition: async (req, res) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "Please check your SignIn" });
      }
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
          let exchange_rate;
          const currentRate = await Rate.find({});
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

          //selling_amout_bhat increase total_amount_inBhat,transition(rate(objectId),currency,currencyAmount),decrease amout in bhat
          //if(branch amount low can not sell)
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
              $push: { transition: { amount: amount, currency: currency } },
            };
            await Branches.findByIdAndUpdate(transitionBranch, updateData);
            const findBranch = await Branches.findById(transitionBranch);

            await newTransition.save();
            res.status(200).json({ newTransition, findBranch });
          } catch (error) {
            return res.status(500).json({
              message:
                "Error happen when creating the transition and updating to branch",
            });
          }
        })
        .catch((err) => res.status(403).json({ message: err }));
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error Happen when creating transation" });
    }
  },
};
module.exports = TransitionController;
