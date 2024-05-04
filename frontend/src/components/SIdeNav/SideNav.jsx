import { useAuth } from "../../contexts/AuthContext";
import "./SideNav.css";

function SideNav({
  setIsAdminDashboard,
  setIsManageBranch,
  setIsManageuser,
  setIsNormalUserDetails,
  setIsNormalUserSellingBoard,
  setIsManagerDashboard,
  setIsManageBranchUser,
  setIsSellingBoard,
  isAdminDashboard,
  isManageBranch,
  isManageUser,
  isNormalUserDetails,
  isNormalUserSellingBoard,
  isManagerDashboard,
  isManageBranchUser,
  isSellingBoard,
}) {
  const { decodedToken } = useAuth();

  const handleSuperAdmin = () => {
    setIsAdminDashboard((prevValue) => !prevValue);
    setIsManageBranch(false);
    setIsManageuser(false);
  };
  const handleSuperBranch = () => {
    setIsAdminDashboard(false);
    setIsManageBranch((prevValue) => !prevValue);
    setIsManageuser(false);
  };
  const handleSuperUser = () => {
    setIsAdminDashboard(false);
    setIsManageBranch(false);
    setIsManageuser((prevValue) => !prevValue);
  };
  const handemanagerdash = () => {
    setIsManagerDashboard((prevValue) => !prevValue);
    setIsManageBranchUser(false);
    setIsSellingBoard(false);
  };
  const handlemanageruser = () => {
    setIsManagerDashboard(false);
    setIsManageBranchUser((prevValue) => !prevValue);
    setIsSellingBoard(false);
  };
  const handlemanagerselling = () => {
    setIsManagerDashboard(false);
    setIsManageBranchUser(false);
    setIsSellingBoard((prevValue) => !prevValue);
  };
  const handlenormaldetail = () => {
    setIsNormalUserDetails((prevValue) => !prevValue);
    setIsNormalUserSellingBoard(false);
  };
  const handlenormalselling = () => {
    setIsNormalUserDetails(false);
    setIsNormalUserSellingBoard((prevValue) => !prevValue);
  };
  return (
    <div className="sidebar ">
      <ul>
        {decodedToken && decodedToken.role == "super_user" && (
          <>
            <li
              onClick={handleSuperAdmin}
              style={{
                backgroundColor: isAdminDashboard ? "lightgray" : "yellow",
              }}
            >
              Admin Dashboard
            </li>
            <li
              onClick={handleSuperBranch}
              style={{
                backgroundColor: isManageBranch ? "lightgray" : "yellow",
              }}
            >
              Manage Branch
            </li>
            <li
              onClick={handleSuperUser}
              style={{
                backgroundColor: isManageUser ? "lightgray" : "yellow",
              }}
            >
              Manage User
            </li>
          </>
        )}
        {decodedToken && decodedToken.role == "branch_manager" && (
          <>
            <li
              onClick={handemanagerdash}
              style={{
                backgroundColor: isManagerDashboard ? "lightgray" : "yellow",
              }}
            >
              Manager Dashboard
            </li>
            <li
              onClick={handlemanageruser}
              style={{
                backgroundColor: isManageBranchUser ? "lightgray" : "yellow",
              }}
            >
              Manage Branch User
            </li>
            <li
              onClick={handlemanagerselling}
              style={{
                backgroundColor: isSellingBoard ? "lightgray" : "yellow",
              }}
            >
              Selling Board
            </li>
          </>
        )}
        {decodedToken && decodedToken.role == "branch_seller" && (
          <>
            <li
              onClick={handlenormaldetail}
              style={{
                backgroundColor: isNormalUserDetails ? "lightgray" : "yellow",
              }}
            >
              My details
            </li>
            <li
              onClick={handlenormalselling}
              style={{
                backgroundColor: isNormalUserSellingBoard
                  ? "lightgray"
                  : "yellow",
              }}
            >
              Selling Board
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default SideNav;
