import {
  CartesianGrid,
  LineChart,
  XAxis,
  Line,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../../../../contexts/AuthContext";
import { useEffect, useState } from "react";
function GraphLineChart({ fetchTransitions }) {
  const [fetchData, setFetchData] = useState([]);
  const { token } = useAuth();
  const apiCall = async () => {
    try {
      const url = "/api/branches/getallbranch";
      const response = await fetch(url, { headers: { Authorization: token } });
      if (!response.ok) {
        throw new Error();
      }
      const responseJson = await response.json();
      setFetchData(responseJson);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    apiCall();
  }, []);
  const getBranchName = (value) => {
    if (fetchData.length > 0) {
      const foundBranch = fetchData.find((branch) => branch._id == value);
      return foundBranch.branch_name;
    } else return value;
  };

  const chartData = fetchTransitions.map((item) => ({
    date: new Date(item.updatedAt).toLocaleString("en-gb", { timeZone: "GB" }),
    branch: item.branch,
    totalAmount: item.total_amount_in_bhat,
    id: item._id,
    // seller_name: item.seller_name,
    // currency: item.currency,
  }));
  chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

  //to fix code
  const sortedArray = chartData.reduce((grouped, singleObject) => {
    const findBranch = singleObject.branch;
    if (grouped[findBranch] == null) {
      grouped[findBranch] = [];
    }
    grouped[findBranch].push(singleObject);
    return grouped;
  }, {});
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

  const colors = ["red", "blue", "orange", "pink", "yellow"];

  return (
    <div className="line-chart">
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <LineChart>
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
                name={getBranchName(branchId)}
                activeDot={{ r: 8 }}
              ></Line>
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraphLineChart;
