const User = require("../models/User");
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const userController = {
  createUser: async (req, res) => {
    try {
      const { username, password, role, branch } = req.body;
      const newUser = new User({
        username,
        password: bcrypt.hashSync(password, salt),
        role,
        branch,
      });
      await newUser.save();

      res
        .status(201)
        .json({ message: "User created successful", user: newUser });
    } catch (error) {
      console.error("Error creating user:", error);
      const errorMessage =
        error.message || "An error occurred while creating the user";
      res.status(400).json({ message: errorMessage });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const userDoc = await User.findOne({ username });
      if (userDoc === null) {
        res.status(400).json({ message: "Wrong Credential" });
      } else {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
          const userPayload = {
            userId: userDoc._id,
            username: userDoc.username,
            role: userDoc.role,
          };
          const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          res.setHeader("Authorization", `Bearer ${token}`);
          res.status(200).json({ message: "Login Successful" });
        } else {
          res.status(400).json({ message: "Password not Correct" });
        }
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.message || "Error occur while login";
      res.status(500).json({ message: errorMessage });
    }
  },
  getUserName: async (req, res) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "Login to get Token" });
      }
      const username = req.params.username;
      const user = await User.findOne({ username }).select({
        password: false,
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      jwt.verify(
        token.split(" ")[1],
        process.env.JWT_SECRET,
        (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: "Invalid Token" });
          }

          if (decoded.role == "super_user" || decoded.username == username) {
            res.status(200).json({ user });
          } else {
            res.status(401).json({ message: "You are no authorized" });
          }
        }
      );
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.message || "Error occur while finding username";
      res.status(500).json({ message: errorMessage });
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { newpassword, oldpassword, username } = req.body;
      const token = req.headers.authorization;

      const userDoc = await User.findOne({ username });
      const passOk = bcrypt.compareSync(oldpassword, userDoc.password);
      if (userDoc === null) {
        res.status(400).json({ message: "Wrong Credential" });
      }
      if (!passOk) {
        res.status(400).json({ message: "Old Password is Not correct" });
      }

      jwt.verify(
        token.split(" ")[1],
        process.env.JWT_SECRET,
        (err, decoded) => {
          if (err) {
            res.json(401).json({ message: "Invalid token" });
          }
        }
      );
      const hashpassword = bcrypt.hashSync(newpassword, salt);
      userDoc.password = hashpassword;
      await userDoc.save();
      res.status(200).json({ message: "Password update successful" });
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.message || "Error Occur while updating password";
      res.status(500).json({ message: errorMessage });
    }
  },
};
module.exports = userController;
