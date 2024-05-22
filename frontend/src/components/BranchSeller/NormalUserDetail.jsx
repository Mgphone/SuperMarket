import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/UserDetails.css";
function NormalUserDetail() {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [fetchUserData, setFetchUserData] = useState("");
  const [IsUserDetails, setIsUserDetails] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch("/api/username/getsingleuser/", {
        headers: { Authorization: token },
      });
      // isLoading(true);
      if (!response.ok) {
        const errorMessage = "fetch is not okay need to find o ut";
        setIsError({ message: errorMessage });
      }
      const responseJson = await response.json();
      responseJson;
      setFetchUserData(responseJson);
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
  // console.log(fetchUserData.userdoc);
  if (isLoading) {
    return <div className="loader"></div>;
  }
  if (isError) {
    return <div className="error">{isError.message}</div>;
  }
  const handleUserDetails = () => {
    setIsUserDetails(true);
  };
  const handleCloseUserDetails = () => {
    setIsUserDetails(false);
  };

  function extractUserDataArray(user) {
    return {
      id: user._id,
      username: user.username,
      role: user.role,
      branchname: user.branch.branch_name,
    };
  }
  const userDetails =
    IsUserDetails && extractUserDataArray(fetchUserData.userdoc);
  // console.log(userDetails);
  const changePassword = () => {
    // console.log(item);
    setIsReset(true);
    console.log("you click reset button");
  };
  return (
    <>
      {fetchUserData && (
        <>
          <div className="superbuttongroup">
            <button onClick={handleUserDetails}> User Details</button>
            <button>Check My Sales</button>
          </div>
          {IsUserDetails && userDetails && (
            <div className="userdetails">
              <button onClick={handleCloseUserDetails} className="closebutton">
                X
              </button>
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
            </div>
          )}
        </>
      )}
    </>
  );
}

export default NormalUserDetail;
