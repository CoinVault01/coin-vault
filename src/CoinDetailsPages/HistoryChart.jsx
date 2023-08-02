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
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  const data = {
    labels: coinChartData.map((value) => moment(value.x).format("MMM DD")),
    datasets: [
      {
        fill: true,
        label: id,
        data: coinChartData.map((value) => value.y),
        lineTension: 0.1,
        backgroundColor: "rgb(38,52,51)",
        borderColor: "#3DAA1D",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#3DAA1D",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#3DAA1D",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        showLine: true,
      },
    ],
  };

  const handleIntervalClick = (interval) => {
    setSelectedInterval(interval);
  };

  return (
    <section className="">
      <div className="w-[90%] mx-auto max-w-[700px] border-[rgb(42,48,55)] border-[1px] py-[20px] px-[10px] rounded-[8px] bg-[rgb(32,37,43)] mb-[50px]">
        <div className="cursor-pointer flex gap-[10px] mb-[10px] smallerDevice:gap-[5px] select-none">
          <p
            className="bg-[rgb(22,26,31)] text-[rgb(25,83,179)] px-[10px] py-[5px] rounded-[5px] text-center font-[600]"
            onClick={() => handleIntervalClick("1H")}
          >
            1H
          </p>
          <p
            className="bg-[rgb(22,26,31)] text-[rgb(25,83,179)] px-[10px] py-[5px] rounded-[5px] text-center font-[600]"
            onClick={() => handleIntervalClick("1D")}
          >
            1D
          </p>
          <p
            className="bg-[rgb(22,26,31)] text-[rgb(25,83,179)] px-[10px] py-[5px] rounded-[5px] text-center font-[600]"
            onClick={() => handleIntervalClick("1W")}
          >
            1W
          </p>
          <p
            className="bg-[rgb(22,26,31)] text-[rgb(25,83,179)] px-[10px] py-[5px] rounded-[5px] text-center font-[600]"
            onClick={() => handleIntervalClick("1M")}
          >
            1M
          </p>
          <p
            className="bg-[rgb(22,26,31)] text-[rgb(25,83,179)] px-[10px] py-[5px] rounded-[5px] text-center font-[600]"
            onClick={() => handleIntervalClick("6M")}
          >
            6M
          </p>
          <p
            className="bg-[rgb(22,26,31)] text-[rgb(25,83,179)] px-[10px] py-[5px] rounded-[5px] text-center font-[600]"
            onClick={() => handleIntervalClick("1Y")}
          >
            1Y
          </p>
        </div>
        <Line options={options} data={data} />
      </div>
    </section>
  );
};

export default HistoryChart;
