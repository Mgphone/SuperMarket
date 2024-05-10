import GraphLineChart from "./Charts/GraphLineChart";
import GraphPieChart from "./Charts/GraphPieChart";
import GraphBarChart from "./Charts/GraphBarChart";
function SuperAdminSaleAllBranches({ fetchTransitions, value }) {
  return (
    <>
      <h1>
        All Branches Sales for{" "}
        {value && value.date == 1 ? <> Today</> : value.date} Days
      </h1>
      <div className="supersalescharts">
        <GraphLineChart fetchTransitions={fetchTransitions} />
        <GraphPieChart fetchTransitions={fetchTransitions} />
        <GraphBarChart fetchTransitions={fetchTransitions} />
      </div>
    </>
  );
}

export default SuperAdminSaleAllBranches;
