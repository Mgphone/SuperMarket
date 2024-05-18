function FormSellingBoard({ rates, branch }) {
  // console.log(JSON.stringify(rate));
  const availableCurrencies =
    branch.available_currencies && branch.available_currencies;

  return (
    <div className="sellingboard">
      <h3> Please Choose Currency To Buy</h3>
      <>
        {availableCurrencies.map((item, index) => (
          <button className="available-currency" key={index}>
            {item}
          </button>
        ))}
      </>
    </div>
  );
}

export default FormSellingBoard;
