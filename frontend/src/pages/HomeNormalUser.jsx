import { useState } from "react";
import Nav from "../components/Nav";
import SideNav from "../components/SideNav";
// import { useAuth } from "../contexts/AuthContext";
import SellingBoard from "../components/SellingBoard";
import NormalUserDetail from "../components/NormalUserDetail";

function HomeNormalUser() {
  // const { decodedToken } = useAuth();
  const [isNormalUserDetails, setIsNormalUserDetails] = useState(false);
  const [isNormalUserSellingBoard, setIsNormalUserSellingBoard] =
    useState(false);
  return (
    <div>
      <Nav />
      <SideNav
        setIsNormalUserDetails={setIsNormalUserDetails}
        setIsNormalUserSellingBoard={setIsNormalUserSellingBoard}
      />
      <div className="maindisplay">
        {" "}
        {/* Home {decodedToken && decodedToken.role} */}
        {isNormalUserDetails && <NormalUserDetail />}
        {isNormalUserSellingBoard && <SellingBoard />}
      </div>
    </div>
  );
}

export default HomeNormalUser;
