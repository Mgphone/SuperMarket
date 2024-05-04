import { useState } from "react";

function OpenNewBranchSuper({ handleclose, headers }) {
  const [openBranchError, setOpenBranchErrror] = useState(false);
  const searchbranch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const branchname = formData.get("branchname");
    const openingamount = formData.get("openingamount");
    const currency = formData.getAll("currency");
    let myData = {
      branchname: branchname,
      openingamount: openingamount,
      currency: currency,
    };

    const headersWithContent = {
      ...headers,
      "Content-Type": "application/json",
    };
    try {
      const url = "/api/branches/createbranch";
      const response = await fetch(url, {
        method: "POST",
        headers: headersWithContent,
        body: JSON.stringify(myData),
      });

      if (!response.ok) {
        throw new Error("Failed to create new Branch");
      }
      const createBranchJSON = await response.json();
      createBranchJSON;
      alert(createBranchJSON.message);
      handleclose();
    } catch (error) {
      console.error;
      setOpenBranchErrror(error);
    }
  };

  return (
    <div className="creatnewbranch">
      <button onClick={handleclose}>X</button>
      <h1>Create New Branch</h1>
      {openBranchError && (
        <>
          <h3 className="error">Error Happen When creating your Branch</h3>
        </>
      )}

      <form onSubmit={searchbranch}>
        <label htmlFor="BranchName">
          Branch Name
          <input type="text" id="branchname" name="branchname" />
        </label>
        <label htmlFor="OpeningAmount">
          Opening Amount
          <input type="number" id="OpeningAmount" name="openingamount" />
        </label>

        <fieldset>
          <legend>Select Currencies:</legend>

          <input type="checkbox" id="USD" name="currency" value="USD" />
          <label htmlFor="USD">USD</label>

          <input type="checkbox" id="GBP" name="currency" value="GBP" />
          <label htmlFor="GBP">GBP</label>

          <input type="checkbox" id="YEN" name="currency" value="YEN" />
          <label htmlFor="YEN">YEN</label>

          <input type="checkbox" id="KYAT" name="currency" value="KYAT" />
          <label htmlFor="KYAT">KYAT</label>

          <input
            type="checkbox"
            id="SINGDOLLAR"
            name="currency"
            value="SINGDOLLAR"
          />
          <label htmlFor="SINGDOLLAR">SINGDOLLAR</label>
        </fieldset>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default OpenNewBranchSuper;
