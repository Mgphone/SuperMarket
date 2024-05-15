import { useAuth } from "../../contexts/AuthContext";
import "../../styles/SideNav.css";

function SideNav({
  setIsAdminDashboard,
  setIsManageBranch,
  setIsManageuser,
  setIsNormalUserDetails,
  setIsNormalUserSellingBoard,
  setIsManagerDashboard,
  setIsManageBranchUser,
  setIsSellingBoard,
  setIsManageRate,
  setIsDailyUpdateBranch,
  //this is for responsive css
  isAdminDashboard,
  isManageBranch,
  isManageUser,
  isNormalUserDetails,
  isNormalUserSellingBoard,
  isManagerDashboard,
  isManageBranchUser,
  isSellingBoard,
  isManageRate,
  isDailyUpdateBranch,
}) {
  const { decodedToken } = useAuth();

  const handleSuperAdmin = () => {
    setIsAdminDashboard((prevValue) => !prevValue);
    setIsManageBranch(false);
    setIsManageuser(false);
    setIsManageRate(false);
  };
  const handleSuperBranch = () => {
    setIsAdminDashboard(false);
    setIsManageBranch((prevValue) => !prevValue);
    setIsManageuser(false);
    setIsManageRate(false);
  };
  const handleSuperUser = () => {
    setIsAdminDashboard(false);
    setIsManageBranch(false);
    setIsManageuser((prevValue) => !prevValue);
    setIsManageRate(false);
  };
  const handleSuperRate = () => {
    setIsAdminDashboard(false);
    setIsManageBranch(false);
    setIsManageuser(false);
    setIsManageRate((prevValue) => !prevValue);
  };
  const handemanagerdash = () => {
    setIsManagerDashboard((prevValue) => !prevValue);
    setIsManageBranchUser(false);
    setIsDailyUpdateBranch(false);
    setIsSellingBoard(false);
  };
  const handlemanageruser = () => {
    setIsManagerDashboard(false);
    setIsManageBranchUser((prevValue) => !prevValue);
    setIsDailyUpdateBranch(false);
    setIsSellingBoard(false);
  };
  const handlemanagerdailybranch = () => {
    setIsManagerDashboard(false);
    setIsManageBranchUser(false);
    setIsDailyUpdateBranch((prev) => !prev);
    setIsSellingBoard(false);
  };
  const handlemanagerselling = () => {
    setIsManagerDashboard(false);
    setIsManageBranchUser(false);
    setIsDailyUpdateBranch(false);
    setIsSellingBoard((prevValue) => !prevValue);
  };
  const handlenormaldetail = () => {
    setIsNormalUserDetails((prevValue) => !prevValue);
    setIsNormalUserSellingBoard(false);
    setIsDailyUpdateBranch(false);
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
            <li
              onClick={handleSuperRate}
              style={{ backgroundColor: isManageRate ? "lightgray" : "yellow" }}
            >
              Manage Rate
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
              onClick={handlemanagerdailybranch}
              style={{
                backgroundColor: isDailyUpdateBranch ? "lightgray" : "yellow",
              }}
            >
              Daily Update branch
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
