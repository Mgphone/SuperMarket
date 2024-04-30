import { useState } from "react";
import Nav from "../components/Nav/Nav";
import SideNav from "../components/SIdeNav/SideNav";
// import { useAuth } from "../contexts/AuthContext";
import SellingBoard from "../components/SellingBoard";
import NormalUserDetail from "../components/BranchSeller/NormalUserDetail";
import NormalUserPortal from "../components/BranchSeller/NormalUserPortal";

function HomeNormalUser() {
  // const { decodedToken } = useAuth();
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
        />
        <div className="maindisplay">
          {!isNormalUserDetails && !isNormalUserSellingBoard && (
            <NormalUserPortal />
          )}
          {/* Home {decodedToken && decodedToken.role} */}
          {isNormalUserDetails && <NormalUserDetail />}
          {isNormalUserSellingBoard && <SellingBoard />}
        </div>
      </div>
    </div>
  );
}

export default HomeNormalUser;
