import { useEffect, useState } from "react";
import "./checkallbranchsuper.css";
import ViewBranch from "./ViewBranch";
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
  // i add extra fetech for users but still not using yet
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
    // setAllBranches(false);
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
      {allbranches && !singleBranch && (
        <>
          <table>
            <thead>
              <tr>
                <th>Number</th>
                <th>Branch Name</th>
                <th>View Branch</th>
                <th>Delete Branch</th>
              </tr>
            </thead>
            <tbody>
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
                    <button onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {singleBranch && (
        <ViewBranch
          singleBranch={singleBranch}
          headers={headers}
          setAllBranches={setAllBranches}
        />
      )}
    </div>
  );
}

export default CheckAllBranchSuper;
