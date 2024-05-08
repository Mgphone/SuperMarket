import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import SuperUserAllBranchesTransitions from "./SuperUserAllBranchesTransitions";
import SuperUserSingleBranchTransitions from "./SuperUserSingleBranchTransitions";
function SuperAdminDashboard() {
  const { token } = useAuth();
  const [branchName, setBranchName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAllBranchesButton, setIsAllBranchesButton] = useState(false);
  const [isSingleBranchButton, setIsSingleBranchButton] = useState(false);
  const [isError, setIserror] = useState(false);
  const [formData, setFormData] = useState({});
  const [fetchTransitions, setFetchTransitions] = useState("");
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [isFetchError, setIsFetchError] = useState("");
  const handleAllBranchesButton = () => {
    setIsAllBranchesButton(true);
    setIsSingleBranchButton(false);
    setFormData({});
    setFetchTransitions("");
  };
  const handleSingleBranchButton = () => {
    setIsAllBranchesButton(false);
    setIsSingleBranchButton(true);
    setFormData({});
    setFetchTransitions("");
  };
  const fetchBranchName = async () => {
    try {
      const url = "/api/branches/getallbranch";
      const response = await fetch(url, { headers: { Authorization: token } });
      if (!response.ok) {
        throw new Error("Failed to fetch Username");
      }
      const branchJson = await response.json();
      setBranchName(branchJson);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIserror(error);
    }
  };
  useEffect(() => {
    fetchBranchName();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    handleSubmit();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let url;
    const checkingUrl = Object.keys(formData).length;
    if (checkingUrl === 1) {
      url = "/api/transition/supertransitionfromallbranches ";
    }
    if (checkingUrl === 2) {
      url = "/api/transition/supertransitionfromonebranch";
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setIsFetchLoading(true);
      setIsFetchError("");
      if (!response.ok) {
        throw new Error("Failed to fetch transition data");
      }
      const responseJSON = await response.json();
      setFetchTransitions(responseJSON);
      setIsFetchLoading(false);
    } catch (error) {
      console.error(error);
      setIsFetchError(error);
    }
  };
  useEffect(() => {
    console.log(
      "This is fetching fetchTransitions" + JSON.stringify(fetchTransitions)
    );
  }, [fetchTransitions]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{isError}</div>;
  }

  return (
    <div>
      <div className="superbuttongroup">
        <button onClick={handleAllBranchesButton}>
          Check Sales for All Branches
        </button>
        <button onClick={handleSingleBranchButton}>
          Check Sales for Single Branche
        </button>
      </div>
      {isAllBranchesButton && (
        <>
          <SuperUserAllBranchesTransitions
            handleSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
            isFetchError={isFetchError}
            isFetchLoading={isFetchLoading}
            fetchTransitions={fetchTransitions}
          />
        </>
      )}
      {isSingleBranchButton && branchName && (
        <>
          <SuperUserSingleBranchTransitions
            handleSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
            branchName={branchName}
            isFetchError={isFetchError}
            isFetchLoading={isFetchLoading}
            fetchTransitions={fetchTransitions}
          />
        </>
      )}
    </div>
  );
}

export default SuperAdminDashboard;
