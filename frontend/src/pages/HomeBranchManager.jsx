import { useState } from "react";
import Nav from "../components/Nav/Nav";
import SideNav from "../components/SIdeNav/SideNav";
// import { useAuth } from "../contexts/AuthContext";
import BranchManagerDashboard from "../components/BranchManager/BranchManagerDashboard";
import BranchManagerUser from "../components/BranchManager/BranchManagerUser";
import SellingBoard from "../components/SellingBoard";
import BranchManagerPortal from "../components/BranchManager/BranchManagerPortal";

function HomeBranchManager() {
  // const { decodedToken } = useAuth();
  const [isManagerDashboard, setIsManagerDashboard] = useState(false);
  const [isManageBranchUser, setIsManageBranchUser] = useState(false);
  const [isSellingBoard, setIsSellingBoard] = useState(false);
  return (
    <div>
      <Nav />
      <div className="body-wrapper">
        <SideNav
          setIsManagerDashboard={setIsManagerDashboard}
          setIsManageBranchUser={setIsManageBranchUser}
          setIsSellingBoard={setIsSellingBoard}
        />
        <div className="maindisplay">
          {!isManagerDashboard && !isManageBranchUser && !isSellingBoard && (
            <BranchManagerPortal />
          )}
          {isManagerDashboard && <BranchManagerDashboard />}
          {isManageBranchUser && <BranchManagerUser />}
          {isSellingBoard && <SellingBoard />}
        </div>
      </div>
    </div>
  );
}

export default HomeBranchManager;
