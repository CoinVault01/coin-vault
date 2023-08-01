import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import HistoryChart from "./HistoryChart";
import DashBoardSideNav from "../DashBoard/DashBoardSideNav/DashBoardSideNav";
import DashBoardTopHeader from "../DashBoard/DashBoardTopHeader/DashBoardTopHeader";

const CoinDetails = () => {
    const [userData, setUserData] = useState(null);
    const [showNav, setShowNav] = useState(false);
    const [activeText, setActiveText] = useState("Home");

    useEffect(() => {
      // Fetch user data from the backend using the JWT token
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

      fetchUserData();
    }, []);

    // Function to toggle the showNav state
    const toggleNav = () => {
      setShowNav((prevShowNav) => !prevShowNav);
    };

    const handleNavItemClicked = (text) => {
      setActiveText(text);
    };
  
  return (
    <section className="bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
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
        <HistoryChart />
      </div>
    </section>
  );
};

export default CoinDetails;
