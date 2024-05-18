const SellingRate = ({ rates }) => {
  // console.log(rates);
  return (
    <div>
      {rates.map((rate) => (
        <ExchangeRateItem key={rate._id} rate={rate} />
      ))}
    </div>
  );
};

const ExchangeRateItem = ({ rate }) => {
  const { Name, updatedAt, USD, GBP, YEN, KYAT, SINDOLLAR } = rate;

  return (
    <div key={rate._id}>
      <h2>{Name}</h2>
      <p>Date: {updatedAt}</p>
      <div>GBP: {GBP}</div>
      <div>YEN: {YEN}</div>
      <div>KYAT: {KYAT}</div>
      <div>SINDOLLAR: {SINDOLLAR}</div>
      <div>USD Rates:</div>
      <div>Small Note: {USD.smallNote}</div>
      <div>Big Note: {USD.bigNote}</div>
    </div>
  );
};

export default SellingRate;
