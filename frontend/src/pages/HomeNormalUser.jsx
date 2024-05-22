import { useState } from "react";
import Nav from "../components/Nav/Nav";
import SideNav from "../components/SIdeNav/SideNav";
import SellingBoard from "../components/SellingBoard/SellingBoard";
// import NormalUserDetail from "../components/BranchSeller/NormalUserDetail";
import UserDetail from "../components/UserMyDetails/UserDetail";
import NormalUserPortal from "../components/BranchSeller/NormalUserPortal";

function HomeNormalUser() {
  const [isNormalUserDetails, setIsNormalUserDetails] = useState(false);
  const [isNormalUserSellingBoard, setIsNormalUserSellingBoard] =
    useState(false);
  return (
    <div>
      <Nav />
      <div className="body-wrapper">
        <SideNav
          setIsNormalUserDetails={setIsNormalUserDetails}
          setIsNormalUserSellingBoard={setIsNormalUserSellingBoard}
          isNormalUserDetails={isNormalUserDetails}
          isNormalUserSellingBoard={isNormalUserSellingBoard}
        />
        <div className="maindisplay">
          {!isNormalUserDetails && !isNormalUserSellingBoard && (
            <NormalUserPortal />
          )}
          {isNormalUserDetails && <UserDetail />}
          {isNormalUserSellingBoard && <SellingBoard />}
        </div>
      </div>
    </div>
  );
}

export default HomeNormalUser;
