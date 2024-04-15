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
router.get(
  "/transition/supertransitionfromallbranches",
  TransitionController.getAllTransitionbyDay
);
router.get(
  "/transition/supertransitionfromonebranch",
  TransitionController.getTransitionByBranch
);
module.exports = router;
