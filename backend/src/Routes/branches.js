const express = require("express");
const router = express.Router();
const BranchesController = require("../controllers/branchesController");
router.post("/branches/createbranch", BranchesController.createBranches);
router.get("/branches/getallbranch", BranchesController.getAllBranches);
router.get("/branches/getsinglebranch/:id", BranchesController.getSingleBranch);
router.delete("/branches/deletebranch/:id", BranchesController.deleteBranch);
module.exports = router;
