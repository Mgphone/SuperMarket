const express = require("express");
const app = express();
const port = 5000;
const connectTODatabase = require("./src/config/database");
connectTODatabase;

app.get("/", (req, res) => {
  res.send("another test yes??");
});

app.listen(port, () => {
  console.log("Server is listeing on port" + port);
});
