import { useState } from "react";
import Nav from "../components/Nav/Nav";
import SuperAdminDashboard from "../components/SuperUser/SuperAdminDashboard";
import SuperBranchManage from "../components/SuperUser/SuperBranchManage";
import SuperUserManage from "../components/SuperUser/SuperUserManage";
import SideNav from "../components/SIdeNav/SideNav";
import AreaManagerPortal from "../components/SuperUser/AreaManagerPortal";
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
          isAdminDashboard={isAdminDashboard}
          isManageBranch={isManageBranch}
          isManageUser={isManageUser}
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
