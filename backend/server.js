const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const connection = process.env.MONGO_URL;
if (!connection) {
  console.log("no connection");
}
mongoose.connect(connection).then(() => console.log("Database is connected"));
app.get("/", (req, res) => {
  res.send("another test please will you??" + connection);
});

app.listen(port, () => {
  console.log("Server is listeing on port" + port);
});
