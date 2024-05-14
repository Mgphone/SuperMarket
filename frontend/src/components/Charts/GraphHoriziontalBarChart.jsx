import {
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  CartesianGrid,
} from "recharts";

function GraphHoriziontalBarChart({ fetchTransitions }) {
  const totalSale = fetchTransitions.reduce((acc, curr) => {
    return (acc += curr.total_amount_in_bhat);
  }, 0);
  const checkCurrecyData = fetchTransitions.reduce((acc, obj) => {
    const pieCurrency = obj.currency;
    acc[pieCurrency] = acc[pieCurrency] || { pieCurrency, total: 0 };
    acc[pieCurrency].total += obj.total_amount_in_bhat;
    return acc;
  }, {});
  const dataWithPercentage = Object.values(checkCurrecyData)
    .map((currency) => ({
      currency: currency.pieCurrency,
      total: ((currency.total / totalSale) * 100).toFixed(2),
    }))
    .sort((a, b) => b.total - a.total);

  return (
    <div className="horizontal-bar-chart">
      <h2>GraphHoriziontalBarChart</h2>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <BarChart data={dataWithPercentage} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, 100]} />
          <YAxis dataKey="currency" type="category" tick={{ fontSize: 10 }} />
          <Tooltip />
          <Bar dataKey="total" fill="#ffd700" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraphHoriziontalBarChart;
