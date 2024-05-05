import { useEffect, useState } from "react";
import firstTenDigits from "../../utils/firstTenDigits";
function SuperUserRate() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchError, setIsFetchError] = useState(false);
  const [fetchRate, setFetchRate] = useState("");

  const fetchGetRate = async () => {
    try {
      const response = await fetch("/api/rate/getrate");
      if (response.ok) {
        const responseJson = await response.json();
        setFetchRate(responseJson);
        setIsLoading(false);
      } else {
        setFetchRate("Can not Connect to Server to load");
      }
    } catch (error) {
      console.error(error);
      setIsFetchError(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchGetRate();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isFetchError) return <div>{isFetchError}</div>;
  const isObject = (obj) => {
    return typeof obj === "object" && obj !== null;
  };

  return (
    <>
      {fetchRate.length > 0 && (
        <div className="today-rate">
          <h1>Bhat Rate</h1>
          <h3>Date:{firstTenDigits(fetchRate[0].updatedAt)}</h3>
          {Object.entries(fetchRate[0])
            .filter(
              ([key]) =>
                key !== "_id" &&
                key !== "createdAt" &&
                key !== "createdBy" &&
                key !== "__v" &&
                key !== "updatedAt" &&
                key !== "Name"
            )
            .map(([key, value]) => (
              <p key={key}>
                <p>
                  {key}:{" "}
                  {isObject(value) ? (
                    <ul className="rate-ullist">
                      {Object.entries(value).map(([nestedKey, nestedValue]) => (
                        <li key={nestedKey}>
                          {nestedKey}: {nestedValue}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>{value}</span>
                  )}
                </p>
              </p>
            ))}
        </div>
      )}
      {fetchRate.length === 0 && <div>You don't have Rate</div>}
    </>
  );
}

export default SuperUserRate;
