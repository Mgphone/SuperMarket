import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function GraphBarChart({ fetchTransitions }) {
  const sellerSellData = fetchTransitions.reduce((acc, obj) => {
    const sellerName = obj.seller_name;
    acc[sellerName] = acc[sellerName] || { sellerName, totalSales: 0 };
    acc[sellerName].totalSales += obj.total_amount_in_bhat;
    return acc;
  }, {});

  const sellerData = Object.values(sellerSellData).map((sellerData) => ({
    seller: sellerData.sellerName,
    totalSales: sellerData.totalSales,
  }));

  return (
    <div className="bar-chart">
      <h2>Sales In Bar Chart</h2>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <BarChart data={sellerData}>
          <XAxis dataKey="seller" tickFormatter={(seller) => seller} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalSales" fill="#ffd700" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraphBarChart;
