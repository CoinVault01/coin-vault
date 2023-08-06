import React, { useEffect, useState } from "react";
import axios from "axios";
import DashBoardSideNav from "../DashBoardSideNav/DashBoardSideNav";
import DashBoardTopHeader from "../DashBoardTopHeader/DashBoardTopHeader";
import { useLocation } from "react-router-dom"; // Import useLocation hook

const DashboardLayout = () => {
  const [userData, setUserData] = useState(null);
  const [showNav, setShowNav] = useState(false);
  const [activeLinkText, setActiveLinkText] = useState(""); // Initialize with the default value
  const location = useLocation(); // Get the current location using useLocation

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
  // Use useEffect to update the activeLinkText whenever the location changes
  useEffect(() => {
    const path = location.pathname; // Get the current path
    // Update the activeLinkText based on the path
    switch (path) {
      case "/wallet-home":
        setActiveLinkText("Home");
        break;
      case "/wallet-buy":
        setActiveLinkText("Buy Assets");
        break;
      case "/wallet-sell":
        setActiveLinkText("Sell Assets");
        break;
      case "/wallet-swapcoin":
        setActiveLinkText("Swap Coin");
        break;
      case "/wallet-cards":
        setActiveLinkText("Cards");
        break;
      case "/wallet-wallet":
        setActiveLinkText("Wallet");
        break;
      case "/wallet-transactions":
        setActiveLinkText("Transactions");
        break;
      case "/wallet-settings":
        setActiveLinkText("Settings");
        break;
      // Add other cases for other routes as needed
      default:
        setActiveLinkText("");
    }
  }, [location.pathname]); // Run the effect whenever the location.pathname changes

  return (
    <section className="">
      <DashBoardTopHeader
        showNav={showNav}
        toggleNav={toggleNav}
        userData={userData}
        activeLinkText={activeLinkText}
        setActiveLinkText={setActiveLinkText}
      />
      <DashBoardSideNav
        showNav={showNav}
        setActiveLinkText={setActiveLinkText}
      />
    </section>
  );
};

export default DashboardLayout;
