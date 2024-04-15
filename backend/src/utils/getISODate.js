const getISODate = (date) => {
  const currentDate = new Date();
  if (date === 1) {
    //check today start with zero
    const startOfToday = new Date(currentDate);
    startOfToday.setUTCHours(0, 0, 0, 0);
    return startOfToday.toISOString();
  } else if (date < 0) {
    throw new Error("Invalid date Input");
  } else {
    //check last 7 days start with 0
    const startOfLastSevenDays = new Date(currentDate);
    startOfLastSevenDays.setUTCDate(
      startOfLastSevenDays.getUTCDate() - (date - 1)
    );
    startOfLastSevenDays.setUTCHours(0, 0, 0, 0);
    return startOfLastSevenDays.toISOString();
  }
};
module.exports = getISODate;
