import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CoinDetails = () => {
  const { id } = useParams();
  const [coinDetails, setCoinDetails] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [timeRange, setTimeRange] = useState("1d");
  const chartRef = useRef(null);

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

          const prices = response.data.prices.map((data) => ({
            name: new Date(data[0]).toISOString(),
            price: data[1].toFixed(2),
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

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update(); // Update the chart when the data changes
    }
  }, [chartData]);

  if (!coinDetails) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <div className="w-[80%]">
        <h1>
          {coinDetails.name} ({coinDetails.symbol})
        </h1>
        <img
          src={coinDetails.image.large}
          alt={coinDetails.name}
          className="w-[50px]"
        />
        <p className="max-w-[400px]">{coinDetails.description.en}</p>
      </div>

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
        <div>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fill: "white" }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  const monthNames = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ];
                  return `${monthNames[date.getMonth()]} ${date.getDate()}`;
                }}
              />
              <YAxis tick={{ fill: "white" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#333",
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                }}
                labelStyle={{ color: "white" }}
                formatter={(value) => `$${value}`}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ color: "white" }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
};

export default CoinDetails;
