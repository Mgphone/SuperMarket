require("dotenv").config();
const express = require("express");
const app = express();
const port = 5000;
const { connectToDatabase } = require("./src/config/database");
connectToDatabase;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("another test yes??");
});
app.use("/", require("./src/Routes/users"));
app.use("/", require("./src/Routes/branches"));
app.use("/", require("./src/Routes/rate"));
app.use("/", require("./src/Routes/transition"));
app.use((req, res, next) => {
  console.log(`404 not found request:${req.method} respond:${req.originalUrl}`);
  res.status(404).json({ message: "Not Found" });
});
app.listen(port, () => {
  console.log("Server is listeing on port" + port);
});
