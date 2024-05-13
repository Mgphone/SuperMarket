import { useFormik } from "formik";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import BranchGraphDisplay from "./BranchGraphDisplay";

function BranchManagerDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [fetchTransitions, setFetchTransitions] = useState("");
  const [isFetchSubmit, setIsFetchSubmit] = useState(false);
  const { token } = useAuth();

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setIsFetchSubmit(true);

    try {
      const url = "/api/transition/branchmanagergettransition";
      const response = await fetch(url, {
        method: "POST",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch");
      } else {
        const responsejson = await response.json();
        setIsLoading(false);
        setFetchTransitions(responsejson);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      date: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validate: (values) => {
      const errors = {};
      if (!values.date) {
        errors.date = "Date Required";
      }
      // setIsLoading(false);
      return errors;
    },
  });
  const transitionsExist =
    fetchTransitions && Object.keys(fetchTransitions).length > 0;

  return (
    <div className="branchtransition">
      <h1>How Many Day of Sales you want to see?</h1>
      <form onSubmit={formik.handleSubmit}>
        <select
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
        >
          <option value="">How many days</option>
          <option value="1">Today</option>
          <option value="2">Yesterday</option>
          <option value="3">Last Three Days</option>
          <option value="7">Last Seven Days</option>
          <option value="14">Last FortNight </option>
          <option value="30">Last Month</option>
          <option value="180">Last 6 Months</option>
          <option value="360">Last Year</option>
        </select>
        {formik.touched.date && formik.errors.date ? (
          <div className="error">{formik.errors.date}</div>
        ) : null}
        <button type="submit">Submit</button>
      </form>
      {isError && <div className="superadminsales">{isError}</div>}
      {isLoading && <div className="loader"></div>}

      {isFetchSubmit ? (
        transitionsExist ? (
          <BranchGraphDisplay
            fetchTransitions={fetchTransitions}
            datevalues={formik.values.date}
          />
        ) : (
          <div className="superadminsales">
            <h1>
              You have no Transitions yet for
              {formik.values.date == 1 ? <> Today</> : formik.values.date} days
              Please change the date
            </h1>
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
}

export default BranchManagerDashboard;
