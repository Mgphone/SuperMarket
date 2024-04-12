const User = require("../models/User");
const Branches = require("../models/Branches");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const checkSuperUser = require("../utils/checkjwtsuperuser");
const userController = {
  createSuperUser: async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, salt);
    if (typeof role === "undefined") {
      return res
        .status(400)
        .json({ message: "Make sure add your super user role" });
    }
    if (role === "super_user") {
      superUser = new User({ username, password: hashedPassword, role });
      await superUser.save();
      return res
        .status(400)
        .json({ message: `Super User ${username} has created` });
    }
  },
  createUser: async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Please Sign in as branch manager or super manager" });
    }
    try {
      const { username, password, role, branch } = req.body;

      if (typeof role === "undefined") {
        return res.status(400).json({ message: "Choose role type" });
      }
      const hashedPassword = bcrypt.hashSync(password, salt);
      checkSuperUser(token)
        .then(async (result) => {
          if (result.role == "super_user") {
            if (role === "branch_manager" || role === "branch_seller") {
              if (!branch) {
                return res.status(400).json({ message: "Branch is required" });
              }

              const user = new User({
                username,
                password: hashedPassword,
                role,
                branch,
              });
              await user.save();

              const branchDoc = await Branches.findById(branch);
              if (!branchDoc) {
                throw new Error("Branch not found");
              }

              if (role === "branch_manager") {
                branchDoc.branch_manager.push(user._id);
              } else if (role === "branch_seller") {
                branchDoc.branch_seller.push(user._id);
              } else {
                throw new Error(
                  "We accept Only branch_manager or branch_seller"
                );
              }
              await branchDoc.save();
              return res
                .status(201)
                .json({ message: `${role} created successfully` });
            } else {
              return res.status(400).json({ message: "Check your usertype" });
            }
          } else if (result.role === "branch_manager") {
            // return res.status(400).json({ message: "making branch manager" });
            if (role == "branch_seller") {
              const branchDoc = await Branches.findById(branch);
              if (!branchDoc) {
                throw new Error("Branch not found");
              }

              const branchseller = new User({
                username,
                password: hashedPassword,
                role,
                branch,
              });
              await branchseller.save();
              branchDoc.branch_seller.push(branchseller._id);
              await branchDoc.save();

              // console.log(
              //   "this is branchseller" + JSON.stringify(branchseller)
              // );
              return res
                .status(201)
                .json({ message: `${role} created successfully` });
            } else {
              return res.status(400).json({
                message:
                  "You have no authroize to create another level just your branch seller",
              });
            }
          }
        })
        .catch((error) => {
          res.status(400).json({ message: error });
        });
    } catch (error) {
      console.error("Error creating user:", error);
      const errorMessage =
        error.message || "An error occurred while creating the user";
      return res.status(400).json({ message: errorMessage });
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
            ...(userDoc.branch && { branch: userDoc.branch }),
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
  getUsersName: async (req, res) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "Login to get Token" });
      }
      const user = await User.find({}).select({ password: false });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      checkSuperUser(token)
        .then((result) => {
          if (result.role == "super_user") {
            res.status(200).json({ user });
          } else {
            res.status(401).json({ message: "You are no authorized" });
          }
        })
        .catch((error) => res.status(500).json({ message: error }));
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
        return;
      }
      if (!passOk) {
        return res.status(400).json({ message: "Old Password is Not correct" });
      }
      checkSuperUser(token)
        .then(async (result) => {
          const hashpassword = bcrypt.hashSync(newpassword, salt);
          await User.findOneAndUpdate({ username }, { password: hashpassword });
          return res
            .status(200)
            .json({ message: "Password updated Successful" });
        })
        .catch((error) => {
          res.status(400).json({ message: error });
        });
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.message || "Error Occur while updating password";
      res.status(500).json({ message: errorMessage });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;
      const token = req.headers.authorization;

      if (!token) {
        return res.status(400).json({ message: "You have No token" });
      }
      const userDoc = await User.findOne({ _id: id });
      if (!userDoc) {
        return res.status(400).json({ message: "There is No User" });
      }
      if (userDoc.role == "super_user") {
        checkSuperUser(token)
          .then(async (result) => {
            if (result.role == "super_user") {
              await User.deleteOne({ _id: id });
              return res.status(200).json({ message: "Super User Deleted" });
            } else {
              return res.status(401).json({
                message: "You don't have authorize to delete super user",
              });
            }
          })
          .catch((error) => {
            return res.status(500).json({ message: error });
          });
      } else {
        checkSuperUser(token)
          .then(async (result) => {
            // console.log("This is result" + JSON.stringify(result));
            const branchDoc = await Branches.findById({
              _id: userDoc.branch,
            }).select("branch_seller");

            const checkingCurrent =
              (result.role == "branch_manager" &&
                result.branch == userDoc.branch &&
                branchDoc.branch_seller.includes(id)) ||
              result.role == "super_user";
            //  console.log("this is checkingCurrent" + checkingCurrent);
            // console.log(result.role == "branch_manager");
            // console.log(result.branch == userDoc.branch);
            // console.log(branchDoc);
            // console.log("checkingcurrent" + checkingCurrent);
            if (checkingCurrent) {
              await User.deleteOne({ _id: id });
              await Branches.findByIdAndUpdate(
                { _id: userDoc.branch },
                { $pull: { branch_seller: id } }
              );

              return res.status(200).json({ message: "User has been deleted" });
            } else {
              throw new Error("You are not authorized to delete");
            }
          })
          .catch((error) => {
            return res.status(500).json({ message: error });
          });
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.message || "Error when deleteing ";
      res.status(500).json({ message: errorMessage });
    }
  },
  getUser: async (req, res) => {
    try {
      const id = req.params.id;
      const token = req.headers.authorization;
      if (!token) {
        res.status(400).json({ message: "You don't have token" });
      }
      checkSuperUser(token)
        .then(async (result) => {
          if (result.role == "super_user") {
            const userdoc = await User.findById(id)
              .select({ password: false })
              .populate({
                path: "branch",
                select:
                  "_id branch_name opening_amount_bhat available_currencies",
              })
              .exec();

            res.status(200).json({ userdoc });
          } else {
            res.status(400).json({ message: "You not authorize" });
          }
        })
        .catch((error) => res.status(500).json({ message: error }));
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.message || "Error when get single user details";
      res.status(500).json({ message: errorMessage });
    }
  },
};
module.exports = userController;
