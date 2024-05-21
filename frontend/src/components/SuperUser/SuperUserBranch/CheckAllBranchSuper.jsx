import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import ViewBranch from "./ViewBranch";
function CheckAllBranchSuper({ headers }) {
  const [allbranches, setAllBranches] = useState("");
  const [singleBranch, setSingleBranch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const [branches] = await Promise.all([
        fetch("/api/branches/getallbranch", { headers }),
      ]);
      if (!branches.ok) {
        throw new Error("Failed to fetch data");
      }
      const branchJson = await branches.json();
      setAllBranches(branchJson);
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
        toast(deleteJson.message);
        fetchData();
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    } else {
      toast("Delete Cancel");
    }
  };
  const handleViewBranch = async (value) => {
    setSingleBranch(value);
  };

  if (isLoading) {
    return <div className="loader"></div>;
  }
  if (error) {
    return <div>Error:{error}</div>;
  }
  return (
    <div className="checkallbranchsuper">
      <ToastContainer
        autoClose={5000}
        closeOnClick={true}
        hideProgressBar={false}
      />
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
