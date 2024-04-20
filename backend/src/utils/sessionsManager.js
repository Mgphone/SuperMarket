const mongoose = require("mongoose");

const sessionsManager = () => {
  sessionStart: async () => {
    const session = await mongoose.startSession();
    session.startTransaction();
    return session;
  };
};
module.exports = sessionsManager;
