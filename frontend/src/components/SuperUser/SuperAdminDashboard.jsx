import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

function SuperAdminDashboard() {
  const { token } = useAuth();
  const [branchName, setBranchName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAllBranchesButton, setIsAllBranchesButton] = useState(false);
  const [isSingleBranchButton, setIsSingleBranchButton] = useState(false);
  const [isError, setIserror] = useState(false);
  const [formData, setFormData] = useState({});
  const [fetchTransitions, setFetchTransitions] = useState("");
  const handleAllBranchesButton = () => {
    setIsAllBranchesButton(true);
    setIsSingleBranchButton(false);
    setFormData({});
  };
  const handleSingleBranchButton = () => {
    setIsAllBranchesButton(false);
    setIsSingleBranchButton(true);
    setFormData({});
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
      if (!response.ok) {
        throw new Error("Failed to fetch transition data");
      }
      const responseJSON = await response.json();
      setFetchTransitions(responseJSON);
    } catch (error) {
      console.error(error);
    }
  };

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
        <div>
          <h1>For ALl Branches How Many Day of sales you want to see?</h1>
          <form onSubmit={handleSubmit}>
            <select
              name="date"
              value={formData.date || ""}
              onChange={handleChange}
            >
              <option>How many days</option>
              <option value="1">Today</option>
              <option value="2">Yesterday</option>
              <option value="3">Last Three Days</option>
              <option value="7">Last Seven Days</option>
              <option value="14">Last FortNight </option>
              <option value="30">Last Month</option>
              <option value="180">Last 6 Months</option>
              <option value="360">Last Year</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {isSingleBranchButton && branchName && (
        <div>
          <h1>For single Branch How Many Day of sales you want to see?</h1>
          <form onSubmit={handleSubmit}>
            <select
              name="branchId"
              value={formData.branchId || ""}
              onChange={handleChange}
            >
              <option>Please choose the option</option>
              {branchName.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.branch_name}
                </option>
              ))}
            </select>

            <select
              name="date"
              value={formData.date || ""}
              onChange={handleChange}
            >
              <option>How many days</option>
              <option value="1">Today</option>
              <option value="2">Yesterday</option>
              <option value="3">Last Three Days</option>
              <option value="7">Last Seven Days</option>
              <option value="14">Last FortNight </option>
              <option value="30">Last Month</option>
              <option value="180">Last 6 Months</option>
              <option value="360">Last Year</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SuperAdminDashboard;
