import { useFormik } from "formik";
import SuperAdminSales from "./SuperAdminSales";
import SuperAdminSaleAllBranches from "./SuperAdminSaleAllBranches";

function SuperUserAllBranchesTransitions({
  handleSubmit,
  isFetchError,
  isFetchLoading,
  fetchTransitions,
  isFetchSubmit,
  setIsFetchLoading,
  setIsfetchSubmit,
}) {
  const transitionsExist =
    fetchTransitions && Object.keys(fetchTransitions).length > 0;
  const formik = useFormik({
    initialValues: {
      date: "",
    },
    // onSubmit: handleSubmit,
    onSubmit: (values) => {
      setIsFetchLoading(true);
      setIsfetchSubmit(false);
      handleSubmit(values);
    },
    validate: (values) => {
      const errors = {};
      if (!values.date) {
        errors.date = "Date Required";
      }
      return errors;
    },
  });
  return (
    <div className="branchtransition">
      <h1>For All Branches How Many Day of Sales you want to see?</h1>
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
      {isFetchError && <div className="superadminsales">{isFetchError}</div>}
      {isFetchLoading && <div className="superadminsales">Loading....</div>}

      {isFetchSubmit ? (
        transitionsExist ? (
          <SuperAdminSaleAllBranches fetchTransitions={fetchTransitions} />
        ) : (
          <div className="superadminsales">
            <h1>
              You have no Transitions yet for {formik.values.date} day/s Please
              change the date
            </h1>
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
}

export default SuperUserAllBranchesTransitions;
