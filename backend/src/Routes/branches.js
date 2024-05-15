const express = require("express");
const router = express.Router();
const BranchesController = require("../controllers/branchesController");
const { checkingToken } = require("../middleware/checkingToken");
router.post(
  "/branches/createbranch",
  checkingToken,
  BranchesController.createBranches
);
router.get(
  "/branches/getallbranch",
  checkingToken,
  BranchesController.getAllBranches
);
router.get(
  "/branches/getsinglebranch",
  checkingToken,
  BranchesController.getSingleBranch
);
router.get(
  "/branches/getsinglebranch/:id",
  checkingToken,
  BranchesController.getSingleBranchAll
);
router.delete(
  "/branches/deletebranch/:id",
  checkingToken,
  BranchesController.deleteBranch
);
router.patch(
  "/branches/updatebranch",
  checkingToken,
  BranchesController.editBranch
);
module.exports = router;
