import GraphLineChart from "./Charts/GraphLineChart";
import GraphPieChart from "./Charts/GraphPieChart";
import GraphBarChart from "./Charts/GraphBarChart";
function SuperAdminSaleAllBranches({ fetchTransitions }) {
  //this is for bar chart

  return (
    <div className="supersalescharts">
      <GraphLineChart fetchTransitions={fetchTransitions} />;
      <GraphPieChart fetchTransitions={fetchTransitions} />
      <GraphBarChart fetchTransitions={fetchTransitions} />
    </div>
  );
}

export default SuperAdminSaleAllBranches;
