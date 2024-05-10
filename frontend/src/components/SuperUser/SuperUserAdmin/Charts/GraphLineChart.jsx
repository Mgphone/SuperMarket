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
    seller_name: item.seller_name,
    currency: item.currency,
  }));
  chartData.sort((a, b) => new Date(a.date) - new Date(b.date));
  const branch1Data = chartData.filter(
    (item) => item.branch === "66312626a2ffa4ff09d8b2b4"
  );
  const branch2Data = chartData.filter(
    (item) => item.branch === "66323860a2ffa4ff09d8b3eb"
  );

  const fillMissingData = (data, maxLength) => {
    const filledData = [...data];
    while (filledData.length < maxLength) {
      filledData.push({ date: new Date().toISOString(), totalAmount: 0 });
    }
    return filledData;
  };
  const maxLength = Math.max(branch1Data.length, branch2Data.length);
  const filledBranch1Data = fillMissingData(branch1Data, maxLength);
  const filledBranch2Data = fillMissingData(branch2Data, maxLength);
  return (
    <div className="line-chart">
      This will show live saes comparision or one{" "}
      <LineChart width={600} height={600}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="totalAmount"
          stroke="#8884d8"
          strokeWidth={5}
          data={filledBranch1Data}
          name="branch1"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="totalAmount"
          stroke="red"
          strokeWidth={5}
          data={filledBranch2Data}
          name="branch2"
        />
      </LineChart>
    </div>
  );
}

export default GraphLineChart;
