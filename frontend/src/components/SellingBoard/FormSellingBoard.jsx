import { useState } from "react";

function FormSellingBoard({ rates, branch }) {
  // console.log(JSON.stringify(rate));
  // const [formForBuying, setFormForBuying] = useState(false);
  const [buyingCurrency, setBuyingCurrency] = useState("");
  const availableCurrencies =
    branch.available_currencies && branch.available_currencies;
  const handleClick = (item) => {
    setBuyingCurrency(item);
    // setFormForBuying(true);
  };

  const { USD, GBP, YEN, KYAT, SINDOLLAR } = rates[0];
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
        <div>
          <p>Only USD smallNotes: {rates[0][buyingCurrency].smallNote}</p>
          <p>bigNotes: {rates[0][buyingCurrency].bigNote}</p>
        </div>
      ) : (
        <div> {rates[0][buyingCurrency]}</div>
      )}
    </div>
  );
}

export default FormSellingBoard;
