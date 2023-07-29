import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const CoinDetails = () => {
  const { id } = useParams(); // Get the coin id from the URL params
  const [coinDetails, setCoinDetails] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [timeRange, setTimeRange] = useState("1d"); // Default to 1 day

  // Fetch the details of the selected coin
  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        setCoinDetails(response.data);
      } catch (error) {
        console.error("Error fetching coin details:", error);
      }
    };

    fetchCoinDetails();
  }, [id]);

  // Fetch historical price data based on the selected time range
  useEffect(() => {
    if (coinDetails && timeRange) {
      const fetchHistoricalData = async () => {
        try {
          const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
            {
              params: {
                vs_currency: "usd",
                days: timeRange,
              },
            }
          );

          // Extracting the prices from the response
          const prices = response.data.prices.map((data) => ({
            name: new Date(data[0]).toLocaleDateString(), // Date as the label
            price: data[1], // Price as the data point
          }));

          setChartData(prices);
        } catch (error) {
          console.error("Error fetching historical data:", error);
        }
      };

      fetchHistoricalData();
    }
  }, [coinDetails, id, timeRange]);

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  if (!coinDetails) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <h1>
        {coinDetails.name} ({coinDetails.symbol})
      </h1>
      <img
        src={coinDetails.image.large}
        alt={coinDetails.name}
        className="w-[50px]"
      />
      <p>{coinDetails.description.en}</p>

      <div>
        <label htmlFor="timeRange">Select Time Range:</label>
        <select
          id="timeRange"
          value={timeRange}
          onChange={handleTimeRangeChange}
        >
          <option value="1h">1 Hour</option>
          <option value="1d">1 Day</option>
          <option value="7d">1 Week</option>
          <option value="30d">1 Month</option>
          <option value="180d">6 Months</option>
          <option value="365d">1 Year</option>
        </select>
      </div>

      {chartData && (
        <LineChart width={800} height={400} data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="rgb(75, 192, 192)"
            name={`${coinDetails.name} Price`}
          />
        </LineChart>
      )}
    </section>
  );
};

export default CoinDetails;
