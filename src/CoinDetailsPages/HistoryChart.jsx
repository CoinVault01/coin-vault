import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const HistoryChart = () => {
  const { id } = useParams();
  const [selectedInterval, setSelectedInterval] = useState("1D"); // Default to 1D
  const [coinChartData, setCoinChartData] = useState([]);

  const fetchChartData = async (interval) => {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days:
            interval === "1H"
              ? 1
              : interval === "1W"
              ? 7
              : interval === "1M"
              ? 30
              : interval === "6M"
              ? 180
              : 365,
        },
      }
    );
    return response.data.prices.map((value) => ({
      x: value[0],
      y: value[1].toFixed(2),
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchChartData(selectedInterval);
      setCoinChartData(data);
    };

    fetchData();
  }, [selectedInterval]);

  const options = {
    responsive: true,
  };

  const data = {
    labels: coinChartData.map((value) => moment(value.x).format("MMM DD")),
    datasets: [
      {
        fill: true,
        label: id,
        data: coinChartData.map((value) => value.y),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const handleIntervalClick = (interval) => {
    setSelectedInterval(interval);
  };

  return (
    <section>
      <div className="cursor-pointer">
        <p onClick={() => handleIntervalClick("1H")}>1H</p>
        <p onClick={() => handleIntervalClick("1D")}>1D</p>
        <p onClick={() => handleIntervalClick("1W")}>1W</p>
        <p onClick={() => handleIntervalClick("1M")}>1M</p>
        <p onClick={() => handleIntervalClick("6M")}>6M</p>
        <p onClick={() => handleIntervalClick("1Y")}>1Y</p>
      </div>
      <Line options={options} data={data} />
    </section>
  );
};

export default HistoryChart;
