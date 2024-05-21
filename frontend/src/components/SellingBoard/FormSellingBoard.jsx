import { useState } from "react";
import UsdCurrencyForm from "./UsdCurrencyForm";
import OtherCurrencyForm from "./OtherCurrencyForm";

function FormSellingBoard({ rates, branch }) {
  const [openform, setOpenForm] = useState(false);
  const [buyingCurrency, setBuyingCurrency] = useState("");
  const availableCurrencies =
    branch.available_currencies && branch.available_currencies;
  const handleClick = (item) => {
    setBuyingCurrency(item);
    // setFormForBuying(true);
    // setOpenForm((prev) => !prev);
    setOpenForm(true);
  };
  return (
    <div className="sellingboard">
      <h3> Please Choose Currency To Buy</h3>

      {availableCurrencies.map((item, index) => (
        <button
          // className="available-currency"
          // className={`buyingCurrency ? ${buyingCurrency}:""`}
          className={`available-currency ${
            buyingCurrency === item ? "active-currency" : ""
          }`}
          key={index}
          onClick={() => handleClick(item)}
        >
          {item}
        </button>
      ))}
      {/* {openform?({buyingCurrency==="USD"}?(<UsdCurrencyForm buyingCurrency={buyingCurrency} rates={rates} />):( <OtherCurrencyForm buyingCurrency={buyingCurrency} rates={rates} />)):null} */}
      {openform ? (
        buyingCurrency === "USD" ? (
          <UsdCurrencyForm buyingCurrency={buyingCurrency} rates={rates} />
        ) : (
          <OtherCurrencyForm buyingCurrency={buyingCurrency} rates={rates} />
        )
      ) : null}
    </div>
  );
}

export default FormSellingBoard;

// {buyingCurrency === "USD" ? (
//   <UsdCurrencyForm buyingCurrency={buyingCurrency} rates={rates} />
// ) : (
//   <OtherCurrencyForm buyingCurrency={buyingCurrency} rates={rates} />
// )}
