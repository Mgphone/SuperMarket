import { useEffect, useState } from "react";
import firstTenDigits from "../../../utils/firstTenDigits";
import { useAuth } from "../../../contexts/AuthContext";
import ChangeRateForm from "./ChangeRateForm";
import { toast } from "react-toastify";
import axiosWithHeader from "../../../utils/axiosWithHeader";
import axiosCustom from "../../../utils/axiosWithoutToken";
function SuperUserRate() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchError, setIsFetchError] = useState(false);
  const [fetchRate, setFetchRate] = useState("");
  const [isDeletError, setIsDeleteError] = useState("");
  const [isform, setIsForm] = useState(false);
  const [isupdateForm, setIsUpdateForm] = useState(false);
  const [iscreateForm, setIsCreateForm] = useState(false);
  const { token } = useAuth();
  const axiosInstance = axiosWithHeader(token);
  const fetchGetRate = async () => {
    try {
      const response = await axiosCustom("/rate/getrate");
      if (response.status >= 200 && response.status < 300) {
        const responseJson = await response.data;
        setFetchRate(responseJson);
        setIsLoading(false);
      } else {
        setFetchRate("Can not Connect to Server to load");
      }
    } catch (error) {
      console.error(error);
      setIsFetchError(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchGetRate();
  }, []);
  if (isLoading) {
    return <div className="loader"></div>;
  }
  if (isFetchError) return <div>{isFetchError}</div>;
  const isObject = (obj) => {
    return typeof obj === "object" && obj !== null;
  };

  const handleDeleteRate = async () => {
    const confirmDelete = window.confirm("Are You Sure to Delete");

    if (confirmDelete) {
      try {
        const response = await axiosInstance.delete("/rate/deleterate");
        if (response.status < 200 || response.status >= 300) {
          throw new Error("Failed To Delete Rate");
        }
        const responseJSON = await response.data;
        toast(responseJSON.message);
        fetchGetRate();
      } catch (error) {
        console.error(error);
        setIsDeleteError(error);
      }
    } else {
      toast("Delete Cancel");
    }
  };
  const handleUpdateRate = async () => {
    setIsForm(true);
    setIsUpdateForm(true);
    setIsCreateForm(false);
  };
  const handleCreateRate = async () => {
    setIsForm(true);
    setIsCreateForm(true);
    setIsUpdateForm(false);
  };
  return (
    <>
      {fetchRate.length > 0 && (
        <div className="today-rate">
          <h1>Bhat Rate</h1>
          <h3>Date:{firstTenDigits(fetchRate[0].updatedAt)}</h3>
          {Object.entries(fetchRate[0])
            .filter(
              ([key]) =>
                key !== "_id" &&
                key !== "createdAt" &&
                key !== "createdBy" &&
                key !== "__v" &&
                key !== "updatedAt" &&
                key !== "Name"
            )
            .map(([key, value]) => (
              <div key={key} className="listrate">
                <div className="list">
                  {key}:{" "}
                  {isObject(value) ? (
                    <ul className="rate-ullist">
                      {Object.entries(value).map(([nestedKey, nestedValue]) => (
                        <li key={nestedKey}>
                          {nestedKey}: {nestedValue}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>{value}</span>
                  )}
                </div>
              </div>
            ))}
          <div className="button-group">
            <button onClick={handleUpdateRate}>Update Rate</button>
            <button onClick={handleDeleteRate} className="deleteButton">
              {isDeletError && <div>{isDeletError}</div>}
              Delete Rate
            </button>
          </div>
        </div>
      )}
      {fetchRate.length === 0 && (
        <>
          <div className="today-rate">
            <h1>You do not have Rate!!</h1>
            <div className="button-group">
              <button onClick={handleCreateRate}>Create Rate?</button>
            </div>
          </div>
        </>
      )}
      {isform && (
        <ChangeRateForm
          isupdateForm={isupdateForm}
          iscreateForm={iscreateForm}
          token={token}
          fetchGetRate={fetchGetRate}
          setFetchRate={setFetchRate}
          isFetchError={isFetchError}
          setIsFetchError={setIsFetchError}
          setIsLoading={setIsLoading}
          setIsForm={setIsForm}
        />
      )}
    </>
  );
}

export default SuperUserRate;
