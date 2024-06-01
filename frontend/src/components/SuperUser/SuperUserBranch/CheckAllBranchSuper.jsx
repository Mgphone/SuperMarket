import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewBranch from "./ViewBranch";
import axiosWithHeader from "../../../utils/axiosWithHeader";
function CheckAllBranchSuper({ token }) {
  const [allbranches, setAllBranches] = useState("");
  const [singleBranch, setSingleBranch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosInstance = axiosWithHeader(token);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance("/branches/getallbranch");
      if (response.status !== 200) {
        throw new Error("Failed to fetch branch");
      }
      const branchJson = await response.data;
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
        const response = await axiosInstance.delete(
          `/branches/deletebranch/${value}`
        );
        if (response.status !== 200) {
          throw new Error("Failed to delete the branch");
        }
        const deleteJson = await response.data;
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
          token={token}
          setAllBranches={setAllBranches}
        />
      )}
    </div>
  );
}

export default CheckAllBranchSuper;
