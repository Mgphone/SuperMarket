function OtherCurrencyForm({ buyingCurrency, rates }) {
  const { GBP, YEN, KYAT, SINDOLLAR } = rates[0];

  return (
    <div>
      <h3>{buyingCurrency}BUY</h3>
      {rates[0][buyingCurrency]}
    </div>
  );
}

export default OtherCurrencyForm;
