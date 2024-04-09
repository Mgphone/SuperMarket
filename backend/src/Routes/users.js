const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
router.post("/users/register", userController.createUser);
// router.get("/users/:username", userController.getUserName);
router.get("/users/login", userController.loginUser);
module.exports = router;
