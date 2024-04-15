const express = require("express");
const router = express.Router();
const TransitionController = require("../controllers/transitionController");
router.post(
  "/transition/createtransition",
  TransitionController.createTransition
);
router.get(
  "/transition/branchmanagergettransition",
  TransitionController.getTransitionBranchManager
);
module.exports = router;
