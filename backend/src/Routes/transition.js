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
router.patch("/transition/edittransition", TransitionController.editTransition);
router.delete(
  "/transition/deletetransition",
  TransitionController.deleteTransition
);
module.exports = router;
