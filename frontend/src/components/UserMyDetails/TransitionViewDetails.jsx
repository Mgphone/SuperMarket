import { useEffect, useState } from "react";
import "../../styles/TransitionViewDetails.css";
import changeTimeToLocalTime from "../../utils/changeTimeToLocalTime";
function TransitionViewDetails({ viewDetailId, setIsViewDetails }) {
  const [fetchDetail, setFetchDetail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const handleClose = () => {
    setIsViewDetails(false);
  };

  const fetchingBack = async () => {
    try {
      const url = `/api/transition/getindividual/${viewDetailId}`;
      const response = await fetch(url);
      if (!response.ok) {
        setIsError({ message: "API error" });
        // throw new Error();
      }
      const responseJson = await response.json();
      setFetchDetail(responseJson);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      // setIsError({ message: error });
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchingBack();
  }, []);
  console.log(JSON.stringify(fetchDetail));
  if (isLoading) {
    return <div className="loader"></div>;
  }
  if (isError) {
    return <div className="error">{isError.message}</div>;
  }
  return (
    <div className="full_view_Details">
      <button onClick={handleClose}>X</button>
      <h1>TransitionViewDetails</h1>
      {Object.entries(fetchDetail)
        .filter(
          ([key]) =>
            key !== "_id" &&
            key !== "branch" &&
            key !== "seller" &&
            key !== "__v"
        )
        .map(([key, value]) => (
          <div key={key}>
            <p>
              <span className="detail_key">{key}</span>
              {"  "}
              {key === "createdAt" || key === "updatedAt" ? (
                <span className="detail_key">
                  {changeTimeToLocalTime(value)}
                </span>
              ) : (
                <span className="detail_key">{value}</span>
              )}
            </p>
          </div>
        ))}
      <div></div>
    </div>
  );
}

export default TransitionViewDetails;
