const whiteList = require("./whiteList");
console.log("this is whiteList" + whiteList);
const corsOptions = {
  origin: (origin, callback) => {
    console.log("Received origin", origin);
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

module.exports = corsOptions;
