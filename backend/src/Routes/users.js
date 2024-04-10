const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
router.post("/users/register", userController.createUser);
router.post("/users/login", userController.loginUser);
router.patch("/users/update", userController.updatePassword);
router.delete("/users/delete/:id", userController.deleteUser);
router.get("/username/findalluser", userController.getUserName);
module.exports = router;
