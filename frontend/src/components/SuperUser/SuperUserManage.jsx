import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import UserResetPassword from "../UserAuthenticationFront/UserResetPassword";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function SuperUserManage() {
  const { token, decodedToken } = useAuth();
  const [dataUser, setUserData] = useState();
  const [branchData, setBranchData] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetValue, setResetValue] = useState("");
  const headers = { Authorization: token };
  const navigate = useNavigate();
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
      setUserData(usersJson);
      setBranchData(branchJson);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const findBranchName = (branchArray, branchId) => {
    const foundBranch = branchArray.find((branch) => branch._id === branchId);
    return foundBranch ? foundBranch.branch_name : branchId;
  };

  const handleEdit = (value) => {
    setIsResetPassword(true);
    setResetValue(value);
  };

  const handleDelete = async (value) => {
    const confirmDelete = window.confirm("Are you ready to delete?");
    if (confirmDelete) {
      try {
        const response = await fetch(`/api/users/delete/${value}`, {
          method: "DELETE",
          headers,
        });
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        const deleteJson = await response.json();
        deleteJson;
        toast(deleteJson.message);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
      setIsLoading(true);
      fetchData();
    } else {
      toast("Delete Cancel");
    }
  };
  if (isLoading) {
    return <div className="loader"></div>;
  }
  if (error) {
    return <div>Error:{error}</div>;
  }
  const handleCreateNewUser = () => {
    navigate("/register");
  };
  const handleCreateNewAreaManager = () => {
    navigate("/registersuper");
  };
  return (
    <>
      {branchData && dataUser && (
        <div className="superusermanage">
          <div className="superbuttongroup">
            <button onClick={handleCreateNewUser}>Create New User</button>
            <button onClick={handleCreateNewAreaManager}>
              Create Area Manager
            </button>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Number</th>
                  <th>UserName</th>
                  <th>Role</th>
                  <th>Branch</th>
                  <th>Reset Password</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {dataUser.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.role}</td>
                    <td>
                      {item.branch
                        ? findBranchName(branchData, item.branch) ||
                          "Branch Not Found"
                        : "Area Manager"}
                    </td>
                    <td>
                      {item._id !== decodedToken.userId && (
                        <button onClick={() => handleEdit(item._id)}>
                          Reset
                        </button>
                      )}
                    </td>
                    <td>
                      {item._id !== decodedToken.userId && (
                        <button onClick={() => handleDelete(item._id)}>
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isResetPassword && (
            <UserResetPassword
              setIsResetPassword={setIsResetPassword}
              resetValue={resetValue}
              headers={headers}
              setError={setError}
            />
          )}
        </div>
      )}
    </>
  );
}

export default SuperUserManage;
