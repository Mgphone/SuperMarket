const express = require("express");
const router = express.Router();
const BranchesController = require("../controllers/branchesController");
router.post("/branches/createbranch", BranchesController.createBranches);
router.get("/branches/getallbranch", BranchesController.getAllBranches);
module.exports = router;
