import {
  CartesianGrid,
  LineChart,
  XAxis,
  Line,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  BarChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";
function SuperAdminSaleAllBranches({ fetchTransitions }) {
  const chartData = fetchTransitions.map((item) => ({
    date: new Date(item.updatedAt).toLocaleString("en-gb", { timeZone: "GB" }),
    branch: item.branch,
    totalAmount: item.total_amount_in_bhat,
    id: item._id,
    seller_name: item.seller_name,
  }));
  chartData.sort((a, b) => new Date(a.date) - new Date(b.date));
  //branchData for first line chart
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
  //this is for piechart
  // console.log(fetchTransitions);
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
  console.log(pieData);
  //this is for bar chart
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
  const colors = ["#8884d8", "#3cde", "#adcc", "#145", "#cdef"];

  return (
    <div className="supersalescharts">
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
      <div className="pie-chart">
        This will show pie chart compare currency
        <PieChart width={600} height={300}>
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
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
      <div className="bar-chart">
        This will compare who is the highest sale
        <BarChart width={800} height={300} data={sellerData}>
          <XAxis dataKey="seller" tickFormatter={(seller) => seller} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalSales" fill="#ffd700" />
        </BarChart>
      </div>
    </div>
  );
}

export default SuperAdminSaleAllBranches;
