const express = require("express");
const router = express.Router();
const TransitionController = require("../controllers/transitionController");
const { checkingToken } = require("../middleware/checkingToken");
router.post(
  "/transition/createtransition",
  checkingToken,
  TransitionController.createTransition
);
router.post(
  "/transition/branchmanagergettransition",
  checkingToken,
  TransitionController.getTransitionBranchManager
);
router.post(
  "/transition/supertransitionfromallbranches",
  checkingToken,
  TransitionController.getAllTransitionbyDay
);
router.post(
  "/transition/supertransitionfromonebranch",
  checkingToken,
  TransitionController.getTransitionByBranch
);
router.patch(
  "/transition/edittransition",
  checkingToken,
  TransitionController.editTransition
);
router.delete(
  "/transition/deletetransition",
  checkingToken,
  TransitionController.deleteTransition
);
module.exports = router;
