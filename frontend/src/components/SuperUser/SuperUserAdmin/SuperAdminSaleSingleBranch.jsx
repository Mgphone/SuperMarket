import GraphBarChart from "./Charts/GraphBarChart";
import GraphLineChart from "./Charts/GraphLineChart";
import GraphPieChart from "./Charts/GraphPieChart";

function SuperAdminSaleSingleBranch({ fetchTransitions, value }) {
  return (
    <>
      <h1>
        Single Branches Sales for {value.date == 1 ? <>Today</> : value.date}{" "}
        Days
      </h1>
      <div className="supersalescharts">
        <GraphLineChart fetchTransitions={fetchTransitions} />
        <GraphPieChart fetchTransitions={fetchTransitions} />
        <GraphBarChart fetchTransitions={fetchTransitions} />
      </div>
    </>
  );
}

export default SuperAdminSaleSingleBranch;
