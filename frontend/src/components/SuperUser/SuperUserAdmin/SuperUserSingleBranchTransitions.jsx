import { useFormik } from "formik";
function SuperUserSingleBranchTransitions({
  handleSubmit,

  branchName,
  isFetchError,
  isFetchLoading,
  fetchTransitions,
  isFetchSubmit,
}) {
  const formik = useFormik({
    initialValues: {
      date: "",
      branchId: "",
    },
    onSubmit: handleSubmit,
    validate: (values) => {
      const errors = {};
      if (!values.date) {
        errors.date = "Date Required";
      } else if (!values.branchId) {
        errors.branchId = "Need to choose Branch";
      }
      return errors;
    },
  });
  const transitionsExist =
    fetchTransitions && Object.keys(fetchTransitions).length > 0;
  return (
    <div className="branchtransition">
      <h1>For Individual Branch How Many Day of Sales you want to see?</h1>
      <form onSubmit={formik.handleSubmit}>
        <select
          name="branchId"
          value={formik.values.branchId}
          onChange={formik.handleChange}
        >
          <option value="">Please choose the option</option>
          {branchName.map((item) => (
            <option value={item._id} key={item._id}>
              {item.branch_name}
            </option>
          ))}
        </select>
        {formik.touched.branchId && formik.errors.branchId ? (
          <div className="error">{formik.errors.branchId}</div>
        ) : null}

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
      {isFetchError && <div>{isFetchError}</div>}
      {isFetchLoading && <div>Loading....</div>}
      {isFetchSubmit ? (
        transitionsExist ? (
          <div>{Object.keys(fetchTransitions).length}This big</div>
        ) : (
          <div>You have no Transition yet Please change the date</div>
        )
      ) : (
        ""
      )}
    </div>
  );
}

export default SuperUserSingleBranchTransitions;
