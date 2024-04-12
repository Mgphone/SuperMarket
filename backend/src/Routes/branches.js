const express = require("express");
const router = express.Router();
const BranchesController = require("../controllers/branchesController");
router.post("/branches/createbranch", BranchesController.createBranches);
router.get("/branches/getallbranch", BranchesController.getAllBranches);
router.get("/branches/getsinglebranch/:id", BranchesController.getSingleBranch);
module.exports = router;
