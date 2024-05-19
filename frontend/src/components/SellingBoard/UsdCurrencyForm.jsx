import { useState } from "react";

function UsdCurrencyForm({ buyingCurrency, rates }) {
  const [amount, setAmount] = useState(0);
  const [currencyNote, setCurrentNote] = useState("Big Notes");
  const { USD } = rates[0];
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleCurrencyNoteChange = (event) => {
    setCurrentNote(event.target.value);
  };
  const calculateTotal = (rates, buyingCurrency) => {
    const bigNotesValue = rates[0][buyingCurrency].bigNote;
    const smallNoteValue = rates[0][buyingCurrency].smallNote;
    return currencyNote === "Big Notes"
      ? amount * bigNotesValue
      : amount * smallNoteValue;
  };
  return (
    <div className="sellingform">
      <h3>{buyingCurrency}BUY</h3>
      <form>
        <label htmlFor="EnterAmount">Please Enter the Amount </label>
        <input
          type="number"
          name="enteramount"
          placeholder="enteramount"
          value={amount}
          onChange={handleAmountChange}
        ></input>
        <label htmlFor="currencyNote">Please Choose Big or Small Amount</label>
        <select value={currencyNote} onChange={handleCurrencyNoteChange}>
          <option name="currencyNote" value="Big Notes">
            Big Notes
          </option>
          <option name="currencyNote" value="Small Notes">
            Small Notes
          </option>
        </select>
        {rates && buyingCurrency && (
          <label>Total in Bhat: {calculateTotal(rates, buyingCurrency)}</label>
        )}
      </form>
    </div>
  );
}

export default UsdCurrencyForm;
