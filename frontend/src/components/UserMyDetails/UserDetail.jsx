import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/UserDetails.css";
import UpdatePassword from "./UpdatePassword";
import CheckSaleIndividual from "./CheckSaleIndividual";
import axiosWithHeader from "../../utils/axiosWithHeader";
function UserDetail() {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [fetchUserData, setFetchUserData] = useState("");
  const [isReset, setIsReset] = useState(false);
  const [isCheckSale, setIsCheckSale] = useState(false);

  // const fetchUserDetails = async () => {
  //   try {
  //     const response = await fetch("/api/username/getsingleuser/", {
  //       headers: { Authorization: token },
  //     });
  //     if (!response.ok) {
  //       const errorMessage = "fetch is not okay need to find out";
  //       setIsError({ message: errorMessage });
  //     }
  //     const responseJson = await response.json();
  //     responseJson;
  //     setFetchUserData(responseJson);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //     setIsLoading(false);
  //     setIsError({ message: error });
  //   }
  // };
  const axiosInstance = axiosWithHeader(token);
  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get("/username/getsingleuser");
      if (response.status !== 200) {
        const errorMessage = "fetch is not okay need to find out";
        setIsError({ message: errorMessage });
      }
      setFetchUserData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError({ message: error });
    }
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);
  if (isLoading) {
    return <div className="loader"></div>;
  }
  if (isError) {
    return <div className="error">{isError.message}</div>;
  }

  function extractUserDataArray(user) {
    return {
      id: user._id,
      username: user.username,
      role: user.role,
      // branchname: user.branch.branch_name,
      branchname:
        user.role === "super_user"
          ? "Aera Manager"
          : user.branch?.branch_name || "Default Branch",
    };
  }
  const userDetails = extractUserDataArray(fetchUserData.userdoc);
  const changePassword = () => {
    setIsReset(true);
  };
  const handlechecksale = () => {
    setIsCheckSale(true);
  };
  return (
    <>
      {fetchUserData && (
        <>
          {userDetails && (
            <div className="userdetails">
              {Object.entries(userDetails)
                .filter(([key]) => key !== "id")
                .map(([key, value]) => (
                  <div key={key}>
                    <p>
                      <span className="error">{key}</span>:{value}
                    </p>
                  </div>
                ))}
              <button onClick={changePassword}>Change Password</button>
              {userDetails.role !== "super_user" && (
                <button onClick={handlechecksale}>Check Sale</button>
              )}
            </div>
          )}
        </>
      )}
      {isReset && (
        <UpdatePassword userDetails={userDetails} setIsReset={setIsReset} />
      )}
      {isCheckSale && <CheckSaleIndividual />}
    </>
  );
}

export default UserDetail;
