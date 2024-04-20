const express = require("express");
const router = express.Router();
const { checkingToken } = require("../middleware/checkingToken");
const RateController = require("../controllers/rateController");
router.post("/rate/createrate", checkingToken, RateController.createRate);
router.get("/rate/getrate", RateController.getlatestRate);
router.patch("/rate/updaterate", checkingToken, RateController.updateRate);
router.delete("/rate/deleterate", checkingToken, RateController.deleteRate);

module.exports = router;
