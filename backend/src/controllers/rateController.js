const Rate = require("../models/Rate");
const checkSuperUser = require("../utils/checkjwtsuperuser");
const RateController = {
  createRate: async (req, res) => {
    try {
      const token = req.headers.authorization;

      checkSuperUser(token)
        .then(async (result) => {
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
            const new_CurrentRate = new Rate(currentRate);
            await new_CurrentRate.save();
            return res
              .status(200)
              .json({ message: "You have created new rate" });
          } else {
            return res
              .status(403)
              .json({ message: "You are unauthorised zone" });
          }
        })
        .catch((error) => res.status(400).json({ message: error }));
    } catch (error) {
      return res.status(401).json({ message: "Error while creating the rate" });
    }
  },
  getlatestRate: async (req, res) => {
    try {
      const rate = await Rate.find({});
      if (!rate) {
        throw new Error("There is no rate");
      }
      return res.status(200).json(rate);
    } catch (error) {
      return res.status(401).json({ message: "Error when fetching the rate" });
    }
  },
  updateRate: async (req, res) => {
    try {
      const { USDSMALL, USDBIG, GBP, YEN, KYAT, SINDOLLAR } = req.body;
      const token = req.headers.authorization;

      try {
        checkSuperUser(token)
          .then(async (result) => {
            if (result.role !== "super_user") {
              res.status(400).json({ message: "User have no autority" });
            }
            const createdBy = result.userId;
            const rate = await Rate.findOne();
            if (!rate) {
              return res
                .status(404)
                .json({ message: "Not found the rate directory" });
            }
            const updatedRate = await Rate.findOneAndUpdate(
              {},
              {
                USD: { smallNote: USDSMALL, bigNote: USDBIG },
                GBP: GBP,
                YEN: YEN,
                KYAT: KYAT,
                SINDOLLAR: SINDOLLAR,
                createdBy: createdBy,
              },
              { new: true }
            );
            if (!updatedRate) {
              return res
                .status(404)
                .json({ message: "Message directory not found" });
            }
            res.status(200).json({ message: "You update the Rate" });
          })
          .catch((error) => {
            return res.status(401).json({ message: error });
          });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Error happen while checking the superuser" });
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.message || "Error Happen when updating the rate";
      return res.status(500).json({ message: errorMessage });
    }
  },
  deleteRate: async (req, res) => {
    try {
      const token = req.headers.authorization;
      const id = req.params.id;

      try {
        checkSuperUser(token)
          .then(async (result) => {
            if (result.role !== "super_user") {
              res.status(400).json({ message: "User have no autority" });
            }

            try {
              const rateDelete = await Rate.deleteOne({});
              if (rateDelete === 0) {
                return res
                  .status(404)
                  .json({ message: "Rate collection not found" });
              }
              return res
                .status(200)
                .json({ message: "You delete the rate collection" });
            } catch (error) {
              return res
                .status(500)
                .json({ message: "Error happen when deleting the rate" });
            }
          })
          .catch((error) => res.status(401).json({ message: error }));
      } catch (error) {
        res.status(500).json({ message: "Error while checking super user" });
      }
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Error when deleting the rate collections" });
    }
  },
};
module.exports = RateController;
