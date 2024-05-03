import { useEffect, useState } from "react";

function ViewBranch({ singleBranch, headers, setAllBranches }) {
  // api/branches/getsinglebranch/66312626a2ffa4ff09d8b2b4
  const url = `/api/branches/getsinglebranch/${singleBranch}`;
  const [fetchSingleBranch, setFetchSingleBranch] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fetchBranch = async () => {
    try {
      const response = await fetch(url, {
        headers,
      });
      if (!response.ok) {
        setIsLoading(false);
        const responseJson = await response.json();
        setIsError(responseJson);
      }
      if (response.ok) {
        setIsLoading(false);
        const responseJson = await response.json();
        // console.log(response);
        setFetchSingleBranch(responseJson);
        console.log(JSON.stringify(responseJson));
        setAllBranches(false);
      }
    } catch (error) {
      console.error;
      setIsError(error);
      isLoading(false);
    }
  };

  useEffect(() => {
    fetchBranch();
  }, []);
  const handleDelete = (value) => {
    console.log("This is handle delete value" + value);
  };
  const handleView = (value) => {
    console.log("This is for view" + value);
  };
  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (isError) {
    return <div>{isError}</div>;
  }
  return (
    <div>
      <h1>This is for Single Branch</h1>

      <div className="singlebranchfetch">
        {fetchSingleBranch &&
          Object.entries(fetchSingleBranch)
            .filter(
              ([key]) =>
                key !== "createdAt" &&
                key !== "updatedAt" &&
                key !== "_id" &&
                key !== "__v"
            )
            .map(([key, value]) => (
              <div key={key} className="singlebranch-entry">
                <p>{key}:</p>
                {Array.isArray(value) ? (
                  <ol>
                    {value.map((item, index) => (
                      <li key={index}>
                        {item}{" "}
                        {(key === "branch_manager" ||
                          key === "branch_seller") && (
                          <button onClick={() => handleDelete(item)}>
                            Delete
                          </button>
                        )}
                        {key === "transition" && (
                          <button onClick={() => handleView(item)}>View</button>
                        )}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p>{value}</p>
                )}
              </div>
            ))}
      </div>
    </div>
  );
}

export default ViewBranch;
