import { useState } from "react";
import Nav from "../components/Nav/Nav";
import SuperAdminDashboard from "../components/SuperUser/SuperAdminDashboard";
import SuperBranchManage from "../components/SuperUser/SuperBranchManage";
import SuperUserManage from "../components/SuperUser/SuperUserManage";
import SideNav from "../components/SIdeNav/SideNav";
import AreaManagerPortal from "../components/SuperUser/AreaManagerPortal";
import SuperUserRate from "../components/SuperUser/SuperUserRate";
import "../styles/HomeSuperUser.css";
function HomeSuperUser() {
  const [isAdminDashboard, setIsAdminDashboard] = useState(false);
  const [isManageBranch, setIsManageBranch] = useState(false);
  const [isManageUser, setIsManageUser] = useState(false);
  const [isManageRate, setIsManageRate] = useState(false);
  return (
    <>
      <Nav />
      <div className="body-wrapper">
        <SideNav
          setIsAdminDashboard={setIsAdminDashboard}
          setIsManageBranch={setIsManageBranch}
          setIsManageuser={setIsManageUser}
          setIsManageRate={setIsManageRate}
          // this is for css reponseive
          isAdminDashboard={isAdminDashboard}
          isManageBranch={isManageBranch}
          isManageUser={isManageUser}
          isManageRate={isManageRate}
        />
        <div className="maindisplay">
          {!isAdminDashboard &&
            !isManageBranch &&
            !isManageUser &&
            !isManageRate && <AreaManagerPortal />}
          {isAdminDashboard && <SuperAdminDashboard />}
          {isManageBranch && <SuperBranchManage />}
          {isManageUser && <SuperUserManage />}
          {isManageRate && <SuperUserRate />}
        </div>
      </div>
    </>
  );
}

export default HomeSuperUser;
