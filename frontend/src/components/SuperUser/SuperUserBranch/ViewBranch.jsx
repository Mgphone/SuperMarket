import { useEffect, useState } from "react";
import firstTenDigits from "../../../utils/firstTenDigits";
import { toast } from "react-toastify";
import axiosWithHeader from "../../../utils/axiosWithHeader";
function ViewBranch({ singleBranch, token, setAllBranches }) {
  // const url = `/api/branches/getsinglebranch/${singleBranch}`;
  const [fetchSingleBranch, setFetchSingleBranch] = useState("");
  const [fetchUserData, setFetchUserData] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const axiosInstance = axiosWithHeader(token);
  const fetchData = async () => {
    try {
      const [users, branches] = await Promise.all([
        axiosInstance("/username/findalluser"),
        axiosInstance(`/branches/getsinglebranch/${singleBranch}`),
      ]);
      if (!users.data && !branches.data) {
        throw new Error("Failed to fetch data");
      }
      const usersJson = await users.data;
      const branchJson = await branches.data;
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
      try {
        const response = await axiosInstance.delete(`/users/delete/${value}`);
        if (response.status !== 200) {
          throw new Error("Failed to delete User");
        }
        const deleteJson = await response.data;
        deleteJson;
        toast(deleteJson.message);
        fetchData();
      } catch (error) {
        console.error;
        setIsError(error);
      }
    } else {
      toast("Delete Cancel");
    }
  };

  if (isLoading) {
    return <div className="loader"></div>;
  }
  if (isError) {
    return <div>{isError}</div>;
  }

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
        <h1>Date: {firstTenDigits(fetchSingleBranch.createdAt)}</h1>
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
