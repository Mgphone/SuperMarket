import { useState } from "react";

import Nav from "../components/Nav/Nav";
import SuperAdminDashboard from "../components/SuperUser/SuperUserAdmin/SuperAdminDashboard";
import SuperBranchManage from "../components/SuperUser/SuperUserBranch/SuperBranchManage";
import SuperUserManage from "../components/SuperUser/SuperUserManage";
import SideNav from "../components/SIdeNav/SideNav";
import AreaManagerPortal from "../components/SuperUser/AreaManagerPortal";
import SuperUserRate from "../components/SuperUser/SuperUserRate/SuperUserRate";
import UserDetail from "../components/UserMyDetails/UserDetail";
import "../styles/HomeSuperUser.css";
function HomeSuperUser() {
  const [isAdminDashboard, setIsAdminDashboard] = useState(false);
  const [isManageBranch, setIsManageBranch] = useState(false);
  const [isManageUser, setIsManageUser] = useState(false);
  const [isManageRate, setIsManageRate] = useState(false);
  const [isSuperDetails, setIsSuperDetails] = useState(false);
  return (
    <>
      <Nav />
      <div className="body-wrapper">
        <SideNav
          setIsAdminDashboard={setIsAdminDashboard}
          setIsManageBranch={setIsManageBranch}
          setIsManageuser={setIsManageUser}
          setIsManageRate={setIsManageRate}
          setIsSuperDetails={setIsSuperDetails}
          // this is for css reponseive
          isAdminDashboard={isAdminDashboard}
          isManageBranch={isManageBranch}
          isManageUser={isManageUser}
          isManageRate={isManageRate}
          isSuperDetails={isSuperDetails}
        />
        <div className="maindisplay">
          {!isAdminDashboard &&
            !isManageBranch &&
            !isManageUser &&
            !isManageRate &&
            !isSuperDetails && <AreaManagerPortal />}
          {isAdminDashboard && <SuperAdminDashboard />}
          {isManageBranch && <SuperBranchManage />}
          {isManageUser && <SuperUserManage />}
          {isManageRate && <SuperUserRate />}
          {isSuperDetails && <UserDetail />}
        </div>
      </div>
    </>
  );
}

export default HomeSuperUser;
