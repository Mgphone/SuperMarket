import {
  CartesianGrid,
  LineChart,
  XAxis,
  Line,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
function GraphLineChart({ fetchTransitions }) {
  const chartData = fetchTransitions.map((item) => ({
    date: new Date(item.updatedAt).toLocaleString("en-gb", { timeZone: "GB" }),
    branch: item.branch,
    totalAmount: item.total_amount_in_bhat,
    id: item._id,
    // seller_name: item.seller_name,
    // currency: item.currency,
  }));
  chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

  // console.log("This is branch1Data" + JSON.stringify(branch1Data));
  //to fix code
  const sortedArray = chartData.reduce((grouped, singleObject) => {
    const findBranch = singleObject.branch;
    if (grouped[findBranch] == null) {
      grouped[findBranch] = [];
    }
    grouped[findBranch].push(singleObject);
    return grouped;
  }, {});
  // console.log(sortedArray);
  const fillMissingData = (data, maxLength) => {
    const filledData = [...data];
    while (filledData.length < maxLength) {
      filledData.push({ date: new Date().toISOString(), totalAmount: 0 });
    }
    return filledData;
  };
  //find max length

  const maxLength = Object.values(sortedArray).reduce((max, brancyArray) => {
    return Math.max(max, brancyArray.length);
  }, 0);

  const colors = ["red", "blue", "orange"];

  return (
    <div className="line-chart">
      This will show live saes comparision or one{" "}
      <LineChart width={600} height={600}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {Object.entries(sortedArray).map(([branchId, branchArray], index) => {
          const filledBranchArray = fillMissingData(branchArray, maxLength);
          return (
            <Line
              key={branchId}
              type="monotone"
              dataKey="totalAmount"
              stroke={colors[index % colors.length]}
              strokeWidth={5}
              data={filledBranchArray}
              name={branchId}
              activeDot={{ r: 8 }}
            ></Line>
          );
        })}
      </LineChart>
    </div>
  );
}

export default GraphLineChart;
