const cors = require("cors");
const corsWildCard = cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
});
module.exports = corsWildCard;
