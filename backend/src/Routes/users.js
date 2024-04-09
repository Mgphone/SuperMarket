const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
router.post("/users", userController.createUser);
router.get("/users/:username", userController.getUserName);
module.exports = router;
