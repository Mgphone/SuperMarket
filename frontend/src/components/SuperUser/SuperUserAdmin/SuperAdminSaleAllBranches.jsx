import GraphLineChart from "../../Charts/GraphLineChart";
import GraphPieChart from "../../Charts/GraphPieChart";
import GraphBarChart from "../../Charts/GraphBarChart";

function SuperAdminSaleAllBranches({ fetchTransitions, value }) {
  const totalValue = fetchTransitions.reduce(
    (acc, cur) => acc + cur.total_amount_in_bhat,
    0
  );
  return (
    <>
      <div className="supersales-header">
        <h1>
          All Branches Sales for{" "}
          {value && value.date == 1 ? <> Today</> : <>{value.date} Days</>}
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

export default SuperAdminSaleAllBranches;
