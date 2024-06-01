import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import SuperUserAllBranchesTransitions from "./SuperUserAllBranchesTransitions";
import SuperUserSingleBranchTransitions from "./SuperUserSingleBranchTransitions";
import axiosWithHeader from "../../../utils/axiosWithHeader";
function SuperAdminDashboard() {
  const { token } = useAuth();
  const [branchName, setBranchName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAllBranchesButton, setIsAllBranchesButton] = useState(false);
  const [isSingleBranchButton, setIsSingleBranchButton] = useState(false);
  const [isError, setIserror] = useState(false);
  const [fetchTransitions, setFetchTransitions] = useState("");
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [isFetchError, setIsFetchError] = useState("");
  const [isFetchSubmit, setIsfetchSubmit] = useState(false);
  const handleAllBranchesButton = () => {
    setIsAllBranchesButton(true);
    setIsSingleBranchButton(false);
    setFetchTransitions("");
    setIsfetchSubmit(false);
  };
  const handleSingleBranchButton = () => {
    setIsAllBranchesButton(false);
    setIsSingleBranchButton(true);
    setFetchTransitions("");
    setIsfetchSubmit(false);
  };
  const axiosInstance = axiosWithHeader(token);
  const fetchBranchName = async () => {
    try {
      // const url = "/api/branches/getallbranch";
      // const response = await fetch(url, { headers: { Authorization: token } });
      const response = await axiosInstance("/branches/getallbranch");
      if (response.statusText !== "OK") {
        throw new Error("Failed to fetch Username");
      }
      const branchJson = await response.data;
      setBranchName(branchJson);
      setIsLoading(false);
      setIsfetchSubmit(true);
    } catch (error) {
      console.error(error);
      setIserror(error);
    }
  };
  useEffect(() => {
    fetchBranchName();
  }, []);

  const handleSubmit = async (values) => {
    let url;
    const checkingUrl = Object.keys(values).length;
    if (checkingUrl === 1) {
      url = "/transition/supertransitionfromallbranches";
    } else if (checkingUrl === 2) {
      url = "/transition/supertransitionfromonebranch";
    } else {
      setIserror("Something Wrong ");
    }

    try {
      const response = await axiosInstance.post(url, values);
      setIsFetchLoading(true);
      setIsFetchError("");
      if (response.status !== 200) {
        throw new Error("Failed to fetch transition data");
      }
      const responseJSON = await response.data;
      setFetchTransitions(responseJSON);
      setIsFetchLoading(false);
      setIsfetchSubmit(true);
    } catch (error) {
      console.error(error);
      setIsFetchError(error);
    }
  };

  if (isLoading) {
    return <div className="loader"></div>;
  }
  if (isError) {
    return <div>{isError}</div>;
  }

  return (
    <div>
      <div className="superbuttongroup">
        <button
          onClick={handleAllBranchesButton}
          style={{
            backgroundColor: isAllBranchesButton ? "#555" : "",
          }}
        >
          Check Sales for All Branches
        </button>
        <button
          onClick={handleSingleBranchButton}
          style={{
            backgroundColor: isSingleBranchButton ? "#555" : "",
          }}
        >
          Check Sales for Individual Branche
        </button>
      </div>
      {isAllBranchesButton && (
        <>
          <SuperUserAllBranchesTransitions
            handleSubmit={handleSubmit}
            isFetchError={isFetchError}
            isFetchLoading={isFetchLoading}
            fetchTransitions={fetchTransitions}
            isFetchSubmit={isFetchSubmit}
            setIsfetchSubmit={setIsfetchSubmit}
            setIsFetchLoading={setIsFetchLoading}
          />
        </>
      )}
      {isSingleBranchButton && branchName && (
        <>
          <SuperUserSingleBranchTransitions
            handleSubmit={handleSubmit}
            branchName={branchName}
            isFetchError={isFetchError}
            isFetchLoading={isFetchLoading}
            fetchTransitions={fetchTransitions}
            isFetchSubmit={isFetchSubmit}
            setIsfetchSubmit={setIsfetchSubmit}
            setIsFetchLoading={setIsFetchLoading}
          />
        </>
      )}
    </div>
  );
}

export default SuperAdminDashboard;
