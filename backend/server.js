require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
//cors usage
const corsOptions = require("./src/config/corOptions");
const corsWhiteList = cors(corsOptions);
//ports
const port = 5000;
//database connection
const { connectToDatabase } = require("./src/config/database");
connectToDatabase;
//usage of json
app.use(express.json());
//route
app.get("/", corsWhiteList, (req, res) => {
  res.send("another test yes??");
});
app.use("/", corsWhiteList, require("./src/Routes/users"));
app.use("/", corsWhiteList, require("./src/Routes/branches"));
app.use("/", corsWhiteList, require("./src/Routes/rate"));
app.use("/", corsWhiteList, require("./src/Routes/transition"));
app.use((req, res, next) => {
  console.log(`404 not found request:${req.method} respond:${req.originalUrl}`);
  res.status(404).json({ message: "Your End Point Not Found" });
});
app.listen(port, () => {
  console.log("Server is listeing on port" + port);
});
