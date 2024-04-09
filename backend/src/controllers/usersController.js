const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = {
  createUser: async (req, res) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const { username, password, role, branch } = req.body;
      // console.log("This is testing reqbody" + JSON.stringify(req.body));
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
  // getUserName: async (req, res) => {
  //   try {
  //     const username = req.params.username;
  //     // res.send(`Hello ${username} welcome from route`);
  //     const user = await User.findOne({ username });
  //     if (!user) {
  //       return res.status(404).json({ message: "User not found" });
  //     }
  //     res.status(200).json({ user });
  //   } catch (error) {
  //     console.error(error);
  //     const errorMessage =
  //       error.message || "Error occur while finding username";
  //     res.status(500).json({ message: errorMessage });
  //   }
  // },
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log("This is username" + username);
      const userDoc = await User.findOne({ username });
      if (userDoc === null) {
        res.status(400).json({ message: "Wrong Credential" });
      } else {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
          // const token = res.status(200).json({ userDoc });
          const userPayload = {
            userId: userDoc._id,
            username: userDoc.username,
            role: userDoc.role,
          };
          const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          res.status(200).json({ token });
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
};
module.exports = userController;
