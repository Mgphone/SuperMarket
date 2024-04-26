import { useState } from "react";
import Nav from "../components/Nav";
import SideNav from "../components/SideNav";
// import { useAuth } from "../contexts/AuthContext";
import BranchManagerDashboard from "../components/BranchManagerDashboard";
import BranchManagerUser from "../components/BranchManagerUser";
import SellingBoard from "../components/SellingBoard";

function HomeBranchManager() {
  // const { decodedToken } = useAuth();
  const [isManagerDashboard, setIsManagerDashboard] = useState(false);
  const [isManageBranchUser, setIsManageBranchUser] = useState(false);
  const [isSellingBoard, setIsSellingBoard] = useState(false);
  return (
    <div>
      <Nav />
      <SideNav
        setIsManagerDashboard={setIsManagerDashboard}
        setIsManageBranchUser={setIsManageBranchUser}
        setIsSellingBoard={setIsSellingBoard}
      />
      <div className="maindisplay">
        {" "}
        {/* Home {decodedToken && decodedToken.role} */}
        {isManagerDashboard && <BranchManagerDashboard />}
        {isManageBranchUser && <BranchManagerUser />}
        {isSellingBoard && <SellingBoard />}
      </div>
    </div>
  );
}

export default HomeBranchManager;
