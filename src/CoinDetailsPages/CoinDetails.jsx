import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import HistoryChart from "./HistoryChart";
import DashBoardSideNav from "../DashBoard/DashBoardSideNav/DashBoardSideNav";
import DashBoardTopHeader from "../DashBoard/DashBoardTopHeader/DashBoardTopHeader";

const CoinDetails = () => {
     const { id } = useParams();
     const [coinData, setCoinData] = useState(null);
     const [userData, setUserData] = useState(null);
     const [showNav, setShowNav] = useState(false);
     const [activeText, setActiveText] = useState("Home");

     useEffect(() => {
       const fetchCoinData = async () => {
         try {
           const response = await axios.get(
             `https://api.coingecko.com/api/v3/coins/${id}`
           );
           setCoinData(response.data);
         } catch (error) {
           console.error("Error fetching coin data:", error);
         }
       };

       const fetchUserData = async () => {
         try {
           const token = localStorage.getItem("token");
           if (!token) {
             // Redirect to login if token not found
             return;
           }

           // Make the API request to fetch user data
           const response = await axios.get(
             "https://coinvault.onrender.com/v1/auth/user",
             {
               headers: {
                 Authorization: `Bearer ${token}`,
               },
             }
           );

           setUserData(response.data);
         } catch (error) {
           console.error("Error fetching user data:", error);
         }
       };

       fetchCoinData();
       fetchUserData(); // Move this here, inside the fetchCoinData useEffect
     }, [id]);

    // Function to toggle the showNav state
    const toggleNav = () => {
      setShowNav((prevShowNav) => !prevShowNav);
    };

    const handleNavItemClicked = (text) => {
      setActiveText(text);
    };

    const formattedPrice =
      coinData?.market_data?.current_price?.usd?.toLocaleString();


  
  return (
    <section className="bg-[rgb(28,33,39)] text-[white] min-h-[100vh] pb-[40px]">
      <div className="">
        <DashBoardTopHeader
          showNav={showNav}
          toggleNav={toggleNav}
          userData={userData}
          activeText={activeText}
        />
        <DashBoardSideNav
          showNav={showNav}
          userData={userData}
          onNavItemClicked={handleNavItemClicked}
        />
      </div>
      <div className="pt-[100px] largeDevice:ml-[230px]">
        {coinData ? (
          <div className="flex items-center gap-[30px] w-[90%] mx-auto max-w-[700px] mb-[20px]">
            <div className="flex items-center gap-[10px] smallerDevice:gap-[5px] border-[rgb(42,48,55)] border-[1px] py-[10px] px-[20px]  rounded-[8px] bg-[rgb(32,37,43)]">
              <img
                src={coinData.image.large}
                alt={coinData.name}
                className="w-[30px] smallerDevice:w-[20px] block"
              />
              <h2 className="text-[20px] smallerDevice:text-[10px] font-[600]">
                {coinData.name}
              </h2>
              <h2 className="text-[20px] smallerDevice:text-[10px] text-[rgba(255,255,255,0.5)] font-[600] uppercase">
                {coinData.symbol}
              </h2>
            </div>
            <p className="text-[25px] smallerDevice:text-[20px] font-[600]">
              ${formattedPrice}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <HistoryChart />
        {coinData ? (
          <>
            <div className="w-[90%] mx-auto max-w-[700px] border-[rgb(42,48,55)] border-[1px] py-[20px] px-[10px] rounded-[8px] bg-[rgb(32,37,43)]">
              <h1 className="text-[25px] font-[600] mb-[30px]">About Coin</h1>
              <p
                className="text-[rgba(255,255,255,0.7)]"
                dangerouslySetInnerHTML={{ __html: coinData.description?.en }}
              />
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
};

export default CoinDetails;
