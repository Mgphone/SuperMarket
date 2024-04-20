const express = require("express");
const router = express.Router();
const TransitionController = require("../controllers/transitionController");
const { checkingToken } = require("../middleware/checkingToken");
router.post(
  "/transition/createtransition",
  checkingToken,
  TransitionController.createTransition
);
router.get(
  "/transition/branchmanagergettransition",
  checkingToken,
  TransitionController.getTransitionBranchManager
);
router.get(
  "/transition/supertransitionfromallbranches",
  checkingToken,
  TransitionController.getAllTransitionbyDay
);
router.get(
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
