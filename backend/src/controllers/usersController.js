const mongoose = require("mongoose");
const User = require("../models/User");
const Branches = require("../models/Branches");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
const checkSuperUser = require("../utils/checkjwtsuperuser");
const userController = {
  checkingmiddleware: async (req, res) => {
    const token = req.headers.authorization;
    return res.status(400).json({ token });
  },
  createSuperUser: async (req, res) => {
    try {
      const { username, password, role, secret } = req.body;
      const hashedPassword = bcrypt.hashSync(password, salt);
      if (typeof role === "undefined") {
        return res
          .status(400)
          .json({ message: "Make sure add your super user role" });
      }
      if (role === "super_user" && secret === process.env.SUPER_SECRET) {
        superUser = new User({ username, password: hashedPassword, role });
        await superUser.save();
        return res.status(400).json({
          message: `Super User ${username.toLowerCase()} has created`,
        });
      } else {
        return res
          .status(400)
          .json({ message: "You have no authority to get superuser" });
      }
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },
  createUser: async (req, res) => {
    const token = req.headers.authorization;

    try {
      const { username, password, role, branch } = req.body;

      if (typeof role === "undefined") {
        return res.status(400).json({ message: "Choose role type" });
      }
      const hashedPassword = bcrypt.hashSync(password, salt);
      const findBranch = await Branches.findById(branch);
      if (!findBranch) {
        return res
          .status(403)
          .json({ message: "There is no branch change the branchId detail" });
      }
      checkSuperUser(token)
        .then(async (result) => {
          if (result.role === "super_user") {
            if (role === "branch_manager" || role === "branch_seller") {
              if (!branch) {
                return res.status(400).json({ message: "Branch is required" });
              }
              // Start a transaction
              const session = await mongoose.startSession();
              session.startTransaction();
              // sessionsManager.sessionStart;
              try {
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

                // Commit the transaction
                await session.commitTransaction();
                // End the session
                session.endSession();
                return res.status(201).json({
                  message: `${role} and ${username.toLowerCase()} created successfully`,
                });
              } catch (error) {
                // Abort the transaction if an error occurs
                await session.abortTransaction();
                // End the session
                session.endSession();
                const errormessage =
                  "There is something wrong with transitions";
                return res.status(500).json({ errormessage });
              }
            }
          } else if (result.role === "branch_manager") {
            // Handle branch manager logic
          } else {
            return res.status(400).json({ message: "Check your usertype" });
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
            expiresIn: "2h",
          });
          res.setHeader("Authorization", `Bearer ${token}`);
          res.status(200).json({ message: "Login Successful" });
        } else {
          res.status(400).json({ message: "Password not Correct" });
        }
      }
    } catch (error) {
      const errorMessage = error.message || "Error occur while login";
      res.status(500).json({ message: errorMessage });
    }
  },
  getUsersName: async (req, res) => {
    try {
      const token = req.headers.authorization;

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

      const userDoc = await User.findOne({ username });
      const passOk = bcrypt.compareSync(oldpassword, userDoc.password);
      if (userDoc === null) {
        res.status(400).json({ message: "Wrong Credential" });
        return;
      }
      if (!passOk) {
        return res.status(400).json({ message: "Old Password is Not correct" });
      }
      const hashpassword = bcrypt.hashSync(newpassword, salt);
      await User.findOneAndUpdate({ username }, { password: hashpassword });
      return res.status(200).json({
        message: `Password updated Successful for ${username.toLowerCase()}`,
      });
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.message || "Error Occur while updating password";
      res.status(500).json({ message: errorMessage });
    }
  },
  resetPassword: async (req, res) => {
    const token = req.headers.authorization;
    const { newpassword, username, secret } = req.body;
    const userDoc = await User.findOne({ username });
    if (!newpassword || !username) {
      return res
        .status(404)
        .json({ message: "Plese enter username and new password" });
    }
    if (!userDoc) {
      return res.status(404).json({ message: "No username " });
    }
    const hashedPassword = bcrypt.hashSync(newpassword, salt);
    checkSuperUser(token)
      .then(async (result) => {
        if (
          result.role == "super_user" ||
          (result.role == "branch_manager" &&
            String(result.branch) == userDoc.branch)
          // &&
          // secret == process.env.SUPER_SECRET)
        ) {
          await User.findOneAndUpdate(
            { username },
            { password: hashedPassword }
          );
          return res.status(200).json({
            message: `Password updated Successful for ${username.toLowerCase()}`,
          });
        } else {
          return res.status(403).json({
            message: "You have no authority to change user password",
          });
        }
      })
      .catch((error) => {
        return res.status(403).json(error);
      });
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;
      const token = req.headers.authorization;

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
            const branchDoc = await Branches.findById({
              _id: userDoc.branch,
            }).select("branch_seller");

            const checkingCurrent =
              (result.role == "branch_manager" &&
                result.branch == userDoc.branch &&
                branchDoc.branch_seller.includes(id)) ||
              result.role == "super_user";

            if (checkingCurrent) {
              const session = await mongoose.startSession();
              session.startTransaction();
              try {
                await User.deleteOne({ _id: id });
                await Branches.findByIdAndUpdate(
                  { _id: userDoc.branch },
                  { $pull: { branch_seller: id, branch_manager: id } }
                );
                await session.commitTransaction();
                session.endSession();
              } catch (error) {
                await session.abortTransaction();
                session.endSession();
                return res
                  .status(403)
                  .json({ message: "Can not process the transations" });
              }

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

      checkSuperUser(token)
        .then(async (result) => {
          const userdoc = await User.findById(result.userId)
            .select({ password: false })
            .populate({
              path: "branch",
              select:
                "_id branch_name opening_amount_bhat available_currencies",
            })
            .exec();

          res.status(200).json({ userdoc });
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
