import { useEffect, useState } from "react";
import "./checkallbranchsuper.css";
function CheckAllBranchSuper({ headers }) {
  const [allbranches, setAllBranches] = useState("");
  const [singleBranch, setSingleBranch] = useState("");
  const [userData, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // const headersWithContent = {
  //   ...headers,
  //   "Content-Type": "application/json",
  // };

  const fetchData = async () => {
    try {
      const [users, branches] = await Promise.all([
        fetch("/api/username/findalluser", { headers }),
        fetch("/api/branches/getallbranch", { headers }),
      ]);
      if (!users.ok && !branches.ok) {
        throw new Error("Failed to fetch data");
      }
      const usersJson = await users.json();
      const branchJson = await branches.json();
      setAllBranches(branchJson);
      setUserData(usersJson);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = async (value) => {
    const confirmDelete = window.confirm("Are you sure to Delete?");
    if (confirmDelete) {
      // console.log(`Delete ${value}`);
      // branches/deletebranch/661eeb4e6220644c0a778acc
      try {
        const url = `/api/branches/deletebranch/${value}`;
        const response = await fetch(url, { method: "DELETE", headers });
        if (!response.ok) {
          throw new Error("Failed to delete the branch");
        }
        const deleteJson = await response.json();
        deleteJson;
        alert(deleteJson.message);
        fetchData();
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    } else {
      alert("Delete Cancel");
    }
  };
  const handleViewBranch = async (value) => {
    console.log(`View ${value}`);
    setAllBranches(false);
    setSingleBranch(value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error:{error}</div>;
  }
  return (
    <div className="checkallbranchsuper">
      {allbranches && (
        <>
          <table>
            <tr>
              <th>Number</th>
              <th>Branch Name</th>
              <th>View Branch</th>
              <th>Delete Branch</th>
            </tr>
            {allbranches.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.branch_name}</td>
                <td>
                  <button onClick={() => handleViewBranch(item._id)}>
                    View Branch
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </table>
        </>
      )}
      {singleBranch && <div>Single Branch of {singleBranch}</div>}
    </div>
  );
}

export default CheckAllBranchSuper;
