import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

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
      <BarChart width={800} height={300} data={sellerData}>
        <XAxis dataKey="seller" tickFormatter={(seller) => seller} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="totalSales" fill="#ffd700" />
      </BarChart>
    </div>
  );
}

export default GraphBarChart;
