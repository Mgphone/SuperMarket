import { useState } from "react";
import UsdCurrencyForm from "./UsdCurrencyForm";
import OtherCurrencyForm from "./OtherCurrencyForm";

function FormSellingBoard({ rates, branch }) {
  const [buyingCurrency, setBuyingCurrency] = useState("");
  const availableCurrencies =
    branch.available_currencies && branch.available_currencies;
  const handleClick = (item) => {
    setBuyingCurrency(item);
    // setFormForBuying(true);
  };

  return (
    <div className="sellingboard">
      <h3> Please Choose Currency To Buy</h3>

      {availableCurrencies.map((item, index) => (
        <button
          className="available-currency"
          key={index}
          onClick={() => handleClick(item)}
        >
          {item}
        </button>
      ))}
      {buyingCurrency === "USD" ? (
        <UsdCurrencyForm buyingCurrency={buyingCurrency} rates={rates} />
      ) : (
        <OtherCurrencyForm buyingCurrency={buyingCurrency} rates={rates} />
      )}
    </div>
  );
}

export default FormSellingBoard;
