import { useEffect, useState } from "react";
import "../../styles/SellingBoard.css";
import { useAuth } from "../../contexts/AuthContext";
function SellingBoard() {
  // {"buyer_name":"hellobuyer","buyer_identity":"link for cloudinary",
  // "currency":"GBP","Note":"","amount":"10"}
  // /rate/getrate
  // branches/getsinglebranch
  const [fetchRate, setFetchRate] = useState("");
  const [fetchTime, setFetchTime] = useState("");
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const getRate = async () => {
    try {
      setIsLoading(true);
      const [rate, branch] = await Promise.all([
        fetch("/api/rate/getrate"),
        fetch("/api/branches/getsinglebranch", {
          // headers: { Authroization: token },
          headers: { Authorization: token, "Content-Type": "application/json" },
        }),
      ]);
      if (!rate.ok && branch.ok) {
        throw new Error("Failed to fetch rate and Branch");
      }
      // const response = await fetch("/api/rate/getrate");
      // if (!response.ok) {
      //   throw new Error("Can not get the rate");
      // }
      const rateJson = await rate.json();
      const branchJson = await branch.json();
      setFetchRate(rateJson);
      setFetchTime(branchJson.dateOfSale);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsError(error);
    }
  };
  // checking to get new Date or not
  const askBranchManager = () => {
    //later i need to delete this line for saleDate

    const serverDay = new Date(fetchTime).getDate();
    const presentDay = new Date().getDate();
    // console.log("serverDay" + serverDay);
    // console.log("presentDay" + presentDay);
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

  return (
    <div>
      SellingBoard
      <p>This is for selling Branch both Manager and Sales </p>
    </div>
  );
}

export default SellingBoard;
