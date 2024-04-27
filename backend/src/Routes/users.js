const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const { checkingToken } = require("../middleware/checkingToken");
router.post(
  "/users/superregister",

  userController.createSuperUser
);
router.post("/users/register", checkingToken, userController.createUser);
router.post("/users/login", userController.loginUser);
router.patch("/users/update", userController.updatePassword);
router.patch(
  "/users/resetpassword/:id",
  checkingToken,
  userController.resetPassword
);
router.delete("/users/delete/:id", checkingToken, userController.deleteUser);
router.get("/username/findalluser", checkingToken, userController.getUsersName);
router.get("/username/getsingleuser", checkingToken, userController.getUser);

module.exports = router;
