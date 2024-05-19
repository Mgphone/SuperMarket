import { useEffect, useState } from "react";
import "../../styles/SellingBoard.css";
import { useAuth } from "../../contexts/AuthContext";
import firstTenDigits from "../../utils/firstTenDigits";
import FormSellingBoard from "./FormSellingBoard";
import SellingRate from "./SellingRate";
function SellingBoard() {
  const [fetchRate, setFetchRate] = useState("");
  const [fetchBranch, setFetchBranch] = useState("");
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [checkExchangeRate, setcheckExchangeRate] = useState(false);
  const { token } = useAuth();
  const getRate = async () => {
    try {
      setIsLoading(true);
      const [rate, branch] = await Promise.all([
        fetch("/api/rate/getrate"),
        fetch("/api/branches/getsinglebranch", {
          headers: { Authorization: token, "Content-Type": "application/json" },
        }),
      ]);
      if (!rate.ok && branch.ok) {
        throw new Error("Failed to fetch rate and Branch");
      }

      const rateJson = await rate.json();
      const branchJson = await branch.json();
      setFetchRate(rateJson);
      setFetchBranch(branchJson);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsError(error);
    }
  };
  // checking to get new Date or not

  const askBranchManager = () => {
    //later i need to delete this line for saleDate
    const serverDay = new Date(fetchBranch.dateOfSale).getDate();
    const presentDay = new Date().getDate();
    // console.log("This is serverday" + serverDay);
    // console.log("this is presenetDay" + presentDay);

    return serverDay >= presentDay;
  };
  useEffect(() => {
    getRate();
  }, []);

  if (isLoading) {
    return <div className="loader"></div>;
  }
  if (isError) {
    return <div>{isError.message}</div>;
  }
  if (fetchRate.length === 0) {
    return (
      <div className="selling-no-found">
        Please Contant Your Area Manager To Get Rate!!
      </div>
    );
  }
  if (!askBranchManager()) {
    return (
      <div className="selling-no-found">
        Please Contact Your Branch Manager To Update Sales
      </div>
    );
  }
  const handleExchange = () => {
    setcheckExchangeRate((prev) => !prev);
  };
  return (
    <div className="sellingboard-container">
      <h1>SellingBoard for {firstTenDigits(fetchBranch.dateOfSale)}</h1>
      <button
        onClick={handleExchange}
        className={checkExchangeRate ? "on" : "off"}
      >
        Check Exchange Rate {checkExchangeRate ? "ON" : "OFF"}
      </button>
      {checkExchangeRate && <SellingRate rates={fetchRate} />}

      <FormSellingBoard rates={fetchRate} branch={fetchBranch} />
    </div>
  );
}

export default SellingBoard;
