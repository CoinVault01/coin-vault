import React, { useEffect, useState } from "react";
import axios from "axios";
import DashBoardSideNav from "../DashBoardSideNav/DashBoardSideNav";
import DashBoardTopHeader from "../DashBoardTopHeader/DashBoardTopHeader";

const DashboardHome = () => {
  const [userData, setUserData] = useState(null);
  const [showNav, setShowNav] = useState(false);
  const [greeting, setGreeting] = useState("");
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

  useEffect(() => {
    // Get the current hour
    const currentHour = new Date().getHours();

    // Set the appropriate greeting based on the time of day
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

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

        <div className="pt-[100px] largeDevice:ml-[230px]">
          {userData && (
            <h1 className="font-[poppins] capitalize text-[20px]">
              {greeting}, {userData.firstName} {userData.lastName}!
            </h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default DashboardHome;
