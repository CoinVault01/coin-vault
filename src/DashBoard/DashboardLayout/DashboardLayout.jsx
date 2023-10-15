import React, { useEffect, useState } from "react";
import axios from "axios";
import DashBoardSideNav from "../DashBoardSideNav/DashBoardSideNav";
import DashBoardTopHeader from "../DashBoardTopHeader/DashBoardTopHeader";
import { useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const [userData, setUserData] = useState(null);
  const [showNav, setShowNav] = useState(false);
  const [activeLinkText, setActiveLinkText] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          return;
        }

        // Check if userData is already in the cache
        const cachedUserData = JSON.parse(sessionStorage.getItem("userData"));

        if (cachedUserData) {
          setUserData(cachedUserData);
          return;
        }

        const response = await axios.get(
          "https://coinvault-backend.vercel.app/v1/auth/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Cache the fetched userData
        sessionStorage.setItem("userData", JSON.stringify(response.data));

        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    // Clear userData from local storage on page refresh
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("userData");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Remove the event listener when the component is unmounted
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
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
        setShowNav={setShowNav}
      />
    </section>
  );
};

export default DashboardLayout;
