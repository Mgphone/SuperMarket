function SuperUserAllBranchesTransitions({
  handleSubmit,
  formData,
  handleChange,
  isFetchError,
  isFetchLoading,
  fetchTransitions,
}) {
  const transitionsExist =
    fetchTransitions && Object.keys(fetchTransitions).length > 0;

  return (
    <div>
      <h1>For ALl Branches How Many Day of sales you want to see?</h1>
      <form onSubmit={handleSubmit}>
        <select name="date" value={formData.date || ""} onChange={handleChange}>
          <option>How many days</option>
          <option value="1">Today</option>
          <option value="2">Yesterday</option>
          <option value="3">Last Three Days</option>
          <option value="7">Last Seven Days</option>
          <option value="14">Last FortNight </option>
          <option value="30">Last Month</option>
          <option value="180">Last 6 Months</option>
          <option value="360">Last Year</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      {isFetchError && <div>{isFetchError}</div>}
      {isFetchLoading && <div>Loading....</div>}
      {/* {fetchTransitions && Object.keys(fetchTransitions).length > 0 && (
        <div>{Object.keys(fetchTransitions).length} this big</div>
      )} */}
      {transitionsExist ? (
        <div>{Object.keys(fetchTransitions).length}This big</div>
      ) : (
        <div>You have no Transition yet Please change the date</div>
      )}
    </div>
  );
}

export default SuperUserAllBranchesTransitions;
