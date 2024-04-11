const jwt = require("jsonwebtoken");
const checkSuperUser = async (token) => {
  if (!token) {
    return;
  }
  return new Promise((resolve, reject) => {
    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject("Invalid Token");
      } else {
        resolve(decoded);
      }
    });
  });
};
module.exports = checkSuperUser;
