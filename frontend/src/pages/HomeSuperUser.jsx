import { useState } from "react";
import Nav from "../components/Nav";
// import { useAuth } from "../contexts/AuthContext";
import SuperAdminDashboard from "../components/SuperAdminDashboard";
import SuperBranchManage from "../components/SuperBranchManage";
import SuperUserManage from "../components/SuperUserManage";
import SideNav from "../components/SideNav";
// const SideNav = lazy(() => import("../components/SideNav"));
function HomeSuperUser() {
  // const { decodedToken } = useAuth();
  const [isAdminDashboard, setIsAdminDashboard] = useState(false);
  const [isManageBranch, setIsManageBranch] = useState(false);
  const [isManageUser, setIsManageUser] = useState(false);
  return (
    <>
      <Nav />
      <div className="maindisplay">
        {" "}
        {/* Home {decodedToken && decodedToken.role} */}
        {isAdminDashboard && <SuperAdminDashboard />}
        {isManageBranch && <SuperBranchManage />}
        {isManageUser && <SuperUserManage />}
      </div>
      <SideNav
        setIsAdminDashboard={setIsAdminDashboard}
        setIsManageBranch={setIsManageBranch}
        setIsManageuser={setIsManageUser}
      />
    </>
  );
}

export default HomeSuperUser;
