import { useEffect, useState } from "react";

function ViewBranch({ singleBranch, headers, setAllBranches }) {
  const url = `/api/branches/getsinglebranch/${singleBranch}`;
  const [fetchSingleBranch, setFetchSingleBranch] = useState("");
  const [fetchUserData, setFetchUserData] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [users, branches] = await Promise.all([
        fetch("/api/username/findalluser", { headers }),
        fetch(`${url}`, { headers }),
      ]);
      if (!users.ok && !branches.ok) {
        throw new Error("Failed to fetch data");
      }
      const usersJson = await users.json();
      const branchJson = await branches.json();
      setFetchUserData(usersJson);
      setFetchSingleBranch(branchJson);
      setIsLoading(false);
      setAllBranches(false);
    } catch (error) {
      setIsError(error.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = async (value) => {
    const confirmDelete = window.confirm("Are You sure to delete");
    if (confirmDelete) {
      console.log("This is handle delete value" + value);
      try {
        const url = `api/users/delete/${value}`;
        const response = await fetch(url, { method: "DELETE", headers });
        if (!response.ok) {
          throw new Error("Failed to delete User");
        }
        const deleteJson = await response.json();
        deleteJson;
        alert(deleteJson.message);
        fetchData();
      } catch (error) {
        console.error;
        setIsError(error);
      }
    } else {
      alert("Delete Cancel");
    }
  };

  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (isError) {
    return <div>{isError}</div>;
  }
  const branchDate = (value) => {
    const date = new Date(value);
    return date.toLocaleDateString("en-Gb");
  };
  const changeUserName = (array, value) => {
    const findArray = array.find((item) => item._id == value);
    if (findArray) {
      return findArray.username;
    } else {
      return value;
    }
  };

  return (
    <div>
      <h1>This is for Single Branch</h1>
      {fetchSingleBranch ? (
        <h1>Date: {branchDate(fetchSingleBranch.createdAt)}</h1>
      ) : null}
      <h3>You have {fetchSingleBranch.transition.length} Sale/s</h3>
      <div className="singlebranchfetch">
        {fetchSingleBranch &&
          Object.entries(fetchSingleBranch)
            .filter(
              ([key]) =>
                key !== "createdAt" &&
                key !== "updatedAt" &&
                key !== "_id" &&
                key !== "__v" &&
                key !== "transition"
            )
            .map(([key, value]) => (
              <div key={key} className="singlebranch-entry">
                <p>{key}:</p>
                {Array.isArray(value) ? (
                  <ol>
                    {value.map((item, index) => (
                      <li key={index}>
                        {changeUserName(fetchUserData, item)}{" "}
                        {(key === "branch_manager" ||
                          key === "branch_seller") && (
                          <button onClick={() => handleDelete(item)}>
                            Delete
                          </button>
                        )}
                        {/* {key === "transition" && (
                          <button onClick={() => handleView(item)}>View</button>
                        )} */}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p>{value}</p>
                )}
                {(key === "branch_manager" || key === "branch_seller") &&
                  !value.length &&
                  "Please Assign"}
                {/* {key === "transition" &&
                  !value.length &&
                  "You have No sale yet"} */}
              </div>
            ))}
      </div>
    </div>
  );
}

export default ViewBranch;
