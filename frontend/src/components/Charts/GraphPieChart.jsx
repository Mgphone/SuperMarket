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
  const totalSale = fetchTransitions.reduce((acc, curr) => {
    return (acc += curr.total_amount_in_bhat);
  }, 0);
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
      <h2>Sales In PieChart</h2>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="total"
            nameKey="currency"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              value,
              index,
            }) => {
              const RADIAN = Math.PI / 180;
              const radius = 25 + innerRadius + (outerRadius - innerRadius);
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  // fill="#8884d8"
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                >
                  {pieData[index].currency} ({value})
                </text>
              );
            }}
          >
            {pieData.map((_, index) => (
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

      <h5>
        Total Sale:<span style={{ backgroundColor: "red" }}> Bhat </span>
        {totalSale}
      </h5>
    </div>
  );
}

export default GraphPieChart;
