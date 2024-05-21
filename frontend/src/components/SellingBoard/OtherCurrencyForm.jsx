import { useState } from "react";

function OtherCurrencyForm({ buyingCurrency, rates }) {
  const [amount, setAmount] = useState(0);
  const { GBP, YEN, KYAT, SINDOLLAR } = rates[0];
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const calculateTotal = (rates, buyingCurrency) => {
    return amount * rates[0][buyingCurrency];
  };
  return (
    <div className="sellingform">
      <h3>{buyingCurrency} BUY</h3>
      {/* {rates[0][buyingCurrency]} */}
      <form>
        <label htmlFor="EnterAmount">Please Enter the Amount </label>
        <input
          type="number"
          name="enteramount"
          placeholder="enteramount"
          value={amount}
          onChange={handleAmountChange}
        ></input>

        {rates && buyingCurrency && (
          <label>Total in Bhat: {calculateTotal(rates, buyingCurrency)}</label>
        )}
      </form>
    </div>
  );
}

export default OtherCurrencyForm;
