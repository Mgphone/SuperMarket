import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
function SuperAdminSales({ fetchTransitions }) {
  console.log(fetchTransitions);
  const colors = ["#8884d8", "#3cde", "#adcc", "#145"]; // Add more colors as needed

  const chartData = fetchTransitions.map((item) => ({
    date: new Date(item.createdAt).toLocaleString("en-gb", { timeZone: "GB" }),
    amount: item.total_amount_in_bhat,
    currency: item.currency,
    exchangeRate: item.exchange_rate,
    sellername: item.seller_name,
    branch: item.branch,
  }));
  // const sellerSalesData = fetchTransitions.reduce((acc, transaction) => {
  //   const sellerName = transaction.seller_name;
  //   acc[sellerName] = acc[sellerName] || { sellerName, totalSales: 0 };
  //   acc[sellerName].totalSales += transaction.total_amount_in_bhat;
  //   return acc;
  // }, {});

  // const chartData = Object.values(sellerSalesData).map((sellerData) => ({
  //   seller: sellerData.sellerName,
  //   totalSales: sellerData.totalSales,
  //   // Include additional data if needed (e.g., average exchange rate)
  // }));

  return (
    <div className="superadminsales">
      <div>{Object.keys(fetchTransitions).length}This big</div>
      <LineChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey="amount" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#totalSales"
          strokeWidth={5}
        />
        <Line type="monotone" dataKey="currency" stroke="#3cde" />
        <Line type="monotone" dataKey="exchangeRate" stroke="#adcc" />
        <Line type="monotone" dataKey="sellername" stroke="blue" />
        <Line type="monotone" dataKey="branch" stroke="#cde" />
      </LineChart>

      <PieChart width={600} height={300}>
        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="currency"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <BarChart width={600} height={600} data={chartData}>
        {" "}
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey="amount" />
        <Tooltip />
        <Legend />
        {chartData.map((entry, index) => (
          <Bar
            key={`bar-${index}`}
            dataKey="sellername"
            fill={colors[index % colors.length]}
            // fill="red"
          />
        ))}
      </BarChart>
      {/* <BarChart width={800} height={300} data={chartData}>
        <XAxis dataKey="seller" tickFormatter={(seller) => seller} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="totalSales" fill="#ffd700" />
      </BarChart> */}
    </div>
  );
}

export default SuperAdminSales;
