import { useState } from "react";
import Nav from "../components/Nav/Nav";
import SideNav from "../components/SIdeNav/SideNav";
import BranchManagerDashboard from "../components/BranchManager/BranchManagerDashboard/BranchManagerDashboard";
import BranchManagerUser from "../components/BranchManager/BranchManagerUser";
import SellingBoard from "../components/SellingBoard/SellingBoard";
import BranchManagerPortal from "../components/BranchManager/BranchManagerPortal";
import DailyUpdateBranch from "../components/BranchManager/DailyUpdateBranch";
import UserDetail from "../components/UserMyDetails/UserDetail";
import "../styles/HomeManager.css";
function HomeBranchManager() {
  const [isManagerDashboard, setIsManagerDashboard] = useState(false);
  const [isManageBranchUser, setIsManageBranchUser] = useState(false);
  const [isSellingBoard, setIsSellingBoard] = useState(false);
  const [isDailyUpdateBranch, setIsDailyUpdateBranch] = useState(false);
  const [isBranchManagerDetails, setIsBranchManagerDetails] = useState(false);
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
          isBranchManagerDetails={isBranchManagerDetails}
          setIsBranchManagerDetails={setIsBranchManagerDetails}
        />
        <div className="maindisplay">
          {!isManagerDashboard &&
            !isManageBranchUser &&
            !isSellingBoard &&
            !isDailyUpdateBranch &&
            !isBranchManagerDetails && <BranchManagerPortal />}
          {isManagerDashboard && <BranchManagerDashboard />}
          {isManageBranchUser && <BranchManagerUser />}
          {isSellingBoard && <SellingBoard />}
          {isDailyUpdateBranch && (
            <DailyUpdateBranch
              setIsManagerDashboard={setIsManagerDashboard}
              setIsDailyUpdateBranch={setIsDailyUpdateBranch}
            />
          )}
          {isBranchManagerDetails && <UserDetail />}
        </div>
      </div>
    </div>
  );
}

export default HomeBranchManager;
