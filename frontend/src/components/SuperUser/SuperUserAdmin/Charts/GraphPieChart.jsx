import {
  PieChart,
  Cell,
  Tooltip,
  Legend,
  Pie,
  LabelList,
  ResponsiveContainer,
} from "recharts";
function GraphPieChart({ fetchTransitions }) {
  const colors = ["#8884d8", "#3cde", "#adcc", "#145", "#cdef"];
  const checkCurrecyData = fetchTransitions.reduce((acc, obj) => {
    const pieCurrency = obj.currency;
    acc[pieCurrency] = acc[pieCurrency] || { pieCurrency, total: 0 };
    acc[pieCurrency].total += obj.total_amount_in_bhat;
    return acc;
  }, {});
  const pieData = Object.values(checkCurrecyData).map((currency) => ({
    currency: currency.pieCurrency,
    total: currency.total,
  }));

  return (
    <div className="pie-chart">
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="total"
            nameKey="currency"
            cx="50%"
            cy="50%"
            outerRadius={100}
            // fill="#8884d8"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
            <LabelList dataKey="currency" position="total" />
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraphPieChart;
