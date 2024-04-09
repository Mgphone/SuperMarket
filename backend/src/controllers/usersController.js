const User = require("../models/User");
const userController = {
  createUser: async (req, res) => {
    try {
      const { username, password, role, branch } = req.body;
      // console.log("This is testing reqbody" + JSON.stringify(req.body));
      const newUser = new User({ username, password, role, branch });
      await newUser.save();
      res
        .status(201)
        .json({ message: "User created successful", user: newUser });
    } catch (error) {
      console.error("Error creating user:", error);
      const errorMessage =
        error.message || "An error occurred while creating the user";
      res.status(400).json({ error: errorMessage });
    }
  },
  getUserName: async (req, res) => {
    try {
      const username = req.params.username;
      // res.send(`Hello ${username} welcome from route`);
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.message || "Error occur while finding username";
      res.status(500).json({ error });
    }
  },
};
module.exports = userController;
