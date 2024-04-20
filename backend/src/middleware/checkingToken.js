const checkingToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Login to get Token" });
  }
  next();
};
module.exports = { checkingToken };
