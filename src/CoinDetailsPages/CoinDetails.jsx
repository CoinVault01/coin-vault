import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import HistoryChart from "./HistoryChart";

const CoinDetails = () => {
  
  return (
    <section className="bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      Coin-Fucking-Gecko-API
      <HistoryChart/>
    </section>
  );
};

export default CoinDetails;
