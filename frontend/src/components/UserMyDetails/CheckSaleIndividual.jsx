import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/CheckSaleIndividual.css";
import changeTimeToLocalTime from "../../utils/changeTimeToLocalTime";
import TransitionViewDetails from "./TransitionViewDetails";
function CheckSaleIndividual() {
  const [fetchTransitions, setFetchTransitions] = useState([]);
  const [fetchTransionCount, setFetchTransitionCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingError, setIsFetchingError] = useState(false);
  const [queryLimit, setQueryLimit] = useState(5);
  const { token } = useAuth();
  const [isViewDetails, setIsViewDetails] = useState(false);
  const [viewDetailId, setViewDetailId] = useState("");
  const fetchBack = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/transition/getindividual?queryLimit=${queryLimit}`,
        {
          headers: { Authorization: token },
        }
      );
      if (!response.ok) {
        setIsFetchingError({ message: "API fetching error" });
      }
      const responseJson = await response.json();
      setFetchTransitions(responseJson.findTransition);
      setFetchTransitionCount(responseJson.transitionLength);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsFetchingError({ message: error });
    }
  };
  useEffect(() => {
    fetchBack();
  }, [queryLimit]);
  const handleviewDetails = (id) => {
    setIsViewDetails(true);
    setViewDetailId(id);
    // console.log(id);
  };
  const handleloadmore = () => {
    setQueryLimit(queryLimit + 5);
  };

  if (isLoading) {
    return <div className="loader"></div>;
  }
  if (isFetchingError) {
    return <div className="error">{isFetchingError.message}</div>;
  }
  return (
    <div className="checksaleindividual">
      <h1>CheckSaleIndividual</h1>
      {fetchTransitions.map((item) => (
        <div key={item._id} className="individual">
          {/* <hr /> */}
          <p>
            <span className="individual_key">Seller:</span> {item.seller_name}
          </p>
          <p>
            <span className="individual_key">Buyer Name:</span>{" "}
            {item.buyer_name}
          </p>
          <p>
            <span className="individual_key">Buyer Identity: </span>
            {item.buyer_identity}
          </p>
          <p>
            <span className="individual_key">Currency:</span> {item.currency}
          </p>
          <p>
            <span className="individual_key">Amount:</span> {item.amount}
          </p>
          <p>
            <span className="individual_key">Exchange Rate: </span>
            {item.exchange_rate}
          </p>
          <p>
            <span className="individual_key">Total Amount in Bhat:</span>{" "}
            {item.total_amount_in_bhat}
          </p>
          <p>
            <span className="individual_key">CreatedAt:</span>
            {changeTimeToLocalTime(item.createdAt)}
          </p>
          <button onClick={() => handleviewDetails(item._id)}>
            View Details
          </button>
        </div>
      ))}
      {queryLimit && fetchTransionCount && queryLimit < fetchTransionCount && (
        <button onClick={handleloadmore}>Load More..</button>
      )}
      {isViewDetails && (
        <TransitionViewDetails
          viewDetailId={viewDetailId}
          setIsViewDetails={setIsViewDetails}
        />
      )}
    </div>
  );
}

export default CheckSaleIndividual;
