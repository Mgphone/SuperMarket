const Rate = require("../models/Rate");

const exchange_rate_value = async (currency, Note) => {
  if (!currency || !Note) {
    return "There is no currency and note";
  }

  try {
    const currentCurrencyRate = await Rate.find({}, { [currency]: 1, _id: 0 });

    if (currentCurrencyRate.some((obj) => Object.keys(obj).length > 0)) {
      let exchange_rate;
      if (currency === "USD") {
        exchange_rate = currentCurrencyRate[0]?.USD?.[Note];
      } else {
        exchange_rate = currentCurrencyRate[0]?.[currency];
      }

      if (exchange_rate) {
        return Number(exchange_rate); // Return the exchange rate if found
      } else {
        return "No exchange rate found for your currency and note";
      }
    } else {
      return "No currency rate found for your currency";
    }
  } catch (error) {
    console.error(error);
    return "An error occurred while fetching the rate";
  }
};

module.exports = exchange_rate_value;
