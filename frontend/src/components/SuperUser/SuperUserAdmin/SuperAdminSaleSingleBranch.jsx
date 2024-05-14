import GraphBarChart from "../../Charts/GraphBarChart";
import GraphLineChart from "../../Charts/GraphLineChart";
import GraphPieChart from "../../Charts/GraphPieChart";

function SuperAdminSaleSingleBranch({ fetchTransitions, value }) {
  const totalValue = fetchTransitions.reduce(
    (acc, curr) => acc + curr.total_amount_in_bhat,
    0
  );
  return (
    <>
      <div className="supersales-header">
        <h1>
          Single Branches Sales for{" "}
          {value.date == 1 ? <>Today</> : <> {value.date} Days</>}
        </h1>
        <p>
          Total: <span>฿{totalValue}</span>
        </p>
      </div>
      <div className="supersalescharts">
        <GraphLineChart fetchTransitions={fetchTransitions} />
        <GraphPieChart fetchTransitions={fetchTransitions} />
        <GraphBarChart fetchTransitions={fetchTransitions} />
      </div>
    </>
  );
}

export default SuperAdminSaleSingleBranch;
