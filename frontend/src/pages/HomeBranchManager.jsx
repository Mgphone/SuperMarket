import { useState } from "react";
import Nav from "../components/Nav/Nav";
import SideNav from "../components/SIdeNav/SideNav";
import BranchManagerDashboard from "../components/BranchManager/BranchManagerDashboard/BranchManagerDashboard";
import BranchManagerUser from "../components/BranchManager/BranchManagerUser";
import SellingBoard from "../components/SellingBoard/SellingBoard";
import BranchManagerPortal from "../components/BranchManager/BranchManagerPortal";
import DailyUpdateBranch from "../components/BranchManager/DailyUpdateBranch";
import "../styles/HomeManager.css";
function HomeBranchManager() {
  const [isManagerDashboard, setIsManagerDashboard] = useState(false);
  const [isManageBranchUser, setIsManageBranchUser] = useState(false);
  const [isSellingBoard, setIsSellingBoard] = useState(false);
  const [isDailyUpdateBranch, setIsDailyUpdateBranch] = useState(false);
  return (
    <div>
      <Nav />
      <div className="body-wrapper">
        <SideNav
          setIsManagerDashboard={setIsManagerDashboard}
          setIsManageBranchUser={setIsManageBranchUser}
          setIsSellingBoard={setIsSellingBoard}
          isManagerDashboard={isManagerDashboard}
          isManageBranchUser={isManageBranchUser}
          isSellingBoard={isSellingBoard}
          isDailyUpdateBranch={isDailyUpdateBranch}
          setIsDailyUpdateBranch={setIsDailyUpdateBranch}
        />
        <div className="maindisplay">
          {!isManagerDashboard &&
            !isManageBranchUser &&
            !isSellingBoard &&
            !isDailyUpdateBranch && <BranchManagerPortal />}
          {isManagerDashboard && <BranchManagerDashboard />}
          {isManageBranchUser && <BranchManagerUser />}
          {isSellingBoard && <SellingBoard />}
          {isDailyUpdateBranch && (
            <DailyUpdateBranch
              setIsManagerDashboard={setIsManagerDashboard}
              setIsDailyUpdateBranch={setIsDailyUpdateBranch}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeBranchManager;
