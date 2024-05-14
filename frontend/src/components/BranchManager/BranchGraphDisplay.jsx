import GraphLineChart from "../Charts/GraphLineChart";
import GraphPieChart from "../Charts/GraphPieChart";
import GraphBarChart from "../Charts/GraphBarChart";
import GraphHoriziontalBarChart from "../Charts/GraphHoriziontalBarChart";
function BranchGraphDisplay({ fetchTransitions, datevalues }) {
  const totalValue =
    fetchTransitions &&
    fetchTransitions.reduce((acc, curr) => acc + curr.total_amount_in_bhat, 0);
  return (
    <div className="managersalescharts">
      <div className="managersales-header">
        <h1>
          Your Branch Sales for{" "}
          {datevalues && datevalues == 1 ? <> Today</> : <>{datevalues} Days</>}
        </h1>
        <p>
          Total: <span>฿{totalValue}</span>
        </p>
      </div>
      <GraphLineChart fetchTransitions={fetchTransitions} />
      <GraphPieChart fetchTransitions={fetchTransitions} />
      <GraphBarChart fetchTransitions={fetchTransitions} />
      <GraphHoriziontalBarChart fetchTransitions={fetchTransitions} />
    </div>
  );
}

export default BranchGraphDisplay;
