import { useState } from "react";
import Nav from "../components/Nav";
// import { useAuth } from "../contexts/AuthContext";
import SuperAdminDashboard from "../components/SuperAdminDashboard";
import SuperBranchManage from "../components/SuperBranchManage";
import SuperUserManage from "../components/SuperUserManage";
import SideNav from "../components/SideNav";
import AreaManagerPortal from "../components/AreaManagerPortal";
function HomeSuperUser() {
  const [isAdminDashboard, setIsAdminDashboard] = useState(false);
  const [isManageBranch, setIsManageBranch] = useState(false);
  const [isManageUser, setIsManageUser] = useState(false);
  return (
    <>
      <Nav />
      <div className="body-wrapper">
        <SideNav
          setIsAdminDashboard={setIsAdminDashboard}
          setIsManageBranch={setIsManageBranch}
          setIsManageuser={setIsManageUser}
        />
        <div className="maindisplay">
          {!isAdminDashboard && !isManageBranch && !isManageUser && (
            <AreaManagerPortal />
          )}
          {isAdminDashboard && <SuperAdminDashboard />}
          {isManageBranch && <SuperBranchManage />}
          {isManageUser && <SuperUserManage />}
        </div>
      </div>
    </>
  );
}

export default HomeSuperUser;
