const mongoose = require("mongoose");
const connection = process.env.MONGO_URL;
console.log("This is my connection" + connection);
const databaseConnect = mongoose
  .connect(connection)
  .then(() => console.log("Database is connected"))
  .catch((errors) => console.error("Can not connect to database", errors));

module.exports = databaseConnect;
//this is another idea
// const mongoose = require("mongoose");
// const connection = process.env.MONGO_URL;
// let session;
// const connectToDatabase = mongoose
//   .connect(connection)
//   .then(async () => {
//     session = await mongoose.startSession();
//     console.log("Database is connected");
//   })
//   .catch((errors) => console.error("Can not connect to database", errors));

// const getSession = () => {
//   if (!session) {
//     throw new Error("Database session not initialised");
//   }
//   return session;
// };
// module.exports = { connectToDatabase, getSession };
// // (module.exports = connectToDatabase), getSession;
