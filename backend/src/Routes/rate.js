const express = require("express");
const router = express.Router();
// const Route = express.Router();
const RateController = require("../controllers/rateController");
router.post("/rate/createrate", RateController.createRate);
router.get("/rate/getrate", RateController.getlatestRate);
router.delete("/rate/deleterate/:id", RateController.deleteRate);
module.exports = router;
