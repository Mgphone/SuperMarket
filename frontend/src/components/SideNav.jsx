// import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
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
    <div className="sidebar">
      <ul>
        {decodedToken && decodedToken.role == "super_user" && (
          <>
            <li onClick={handleSuperAdmin}>Admin Dashboard</li>
            <li onClick={handleSuperBranch}>Manage Branch</li>
            <li onClick={handleSuperUser}>Manage User</li>
          </>
        )}
        {decodedToken && decodedToken.role == "branch_manager" && (
          <>
            <li onClick={handemanagerdash}>Manager Dashboard</li>
            <li onClick={handlemanageruser}>Manage Branch User</li>
            <li onClick={handlemanagerselling}>Selling Board</li>
          </>
        )}
        {decodedToken && decodedToken.role == "branch_seller" && (
          <>
            <li onClick={handlenormaldetail}>My details</li>
            <li onClick={handlenormalselling}>Selling Board</li>
          </>
        )}
      </ul>
    </div>
  );
}

export default SideNav;
