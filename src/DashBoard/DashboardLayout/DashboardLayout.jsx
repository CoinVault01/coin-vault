import React, { useEffect, useState } from "react";
import axios from "axios";
import DashBoardSideNav from "../DashBoardSideNav/DashBoardSideNav";
import DashBoardTopHeader from "../DashBoardTopHeader/DashBoardTopHeader";
import { useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const [showNav, setShowNav] = useState(false);
  const [activeLinkText, setActiveLinkText] = useState("");
  const location = useLocation();

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
