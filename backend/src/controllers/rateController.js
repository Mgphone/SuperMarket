const Rate = require("../models/Rate");
const checkSuperUser = require("../utils/checkjwtsuperuser");
const RateController = {
  createRate: async (req, res) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res
          .status(400)
          .json({ message: "Please sign in for super user" });
      }
      checkSuperUser(token)
        .then(async (result) => {
          // console.long(JSON.stringify(result));
          // res.status(200).json({ result });
          if (result.role == "super_user") {
            const { USDSMALL, USDBIG, GBP, YEN, KYAT, SINDOLLAR } = req.body;
            const currentRate = {
              Name: "Exchange Rate",
              USD: { smallNote: USDSMALL, bigNote: USDBIG },
              GBP: GBP,
              YEN: YEN,
              KYAT: KYAT,
              SINDOLLAR: SINDOLLAR,
              createdBy: result.userId,
            };
            // res.status(200).json(currentRate);
            const new_CurrentRate = new Rate(currentRate);
            await new_CurrentRate.save();
            // res.status(200).json(new_CurrentRate);
            res.status(200).json(new_CurrentRate);
          } else {
            return res
              .status(403)
              .json({ message: "You are unauthorised zone" });
          }
        })
        .catch((error) => res.status(400).json(error));
    } catch (error) {
      return res.status(401).json({ message: "Error while creating the rate" });
    }
    // res.status(200).json({ message: "Welcome from create Rate" });
  },
  getlatestRate: async (req, res) => {
    try {
      const rate = await Rate.find({});
      if (!rate) {
        throw new Error("There is no rate");
      }
      res.status(200).json(rate);
    } catch (error) {
      return res.status(401).json({ message: "Error when fetching the rate" });
    }
  },
};
module.exports = RateController;
