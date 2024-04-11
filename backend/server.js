require("dotenv").config();
const express = require("express");
const app = express();
const port = 5000;
const connectTODatabase = require("./src/config/database");
connectTODatabase;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("another test yes??");
});
app.use("/", require("./src/Routes/users"));
app.use("/", require("./src/Routes/branches"));
app.listen(port, () => {
  console.log("Server is listeing on port" + port);
});
