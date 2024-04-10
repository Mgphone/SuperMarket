const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
router.post("/users/register", userController.createUser);
router.get("/username/:username", userController.getUserName);
router.post("/users/login", userController.loginUser);
module.exports = router;
