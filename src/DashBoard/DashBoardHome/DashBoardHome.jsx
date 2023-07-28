import React, { useEffect, useState } from "react";
import axios from "axios";
import DashBoardSideNav from "../DashBoardSideNav/DashBoardSideNav";
import DashBoardTopHeader from "../DashBoardTopHeader/DashBoardTopHeader";

const DashboardHome = () => {
  const [userData, setUserData] = useState(null);
  const [showNav, setShowNav] = useState(false);

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

  return (
    <section className="bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <div className="">
        <DashBoardTopHeader showNav={showNav} toggleNav={toggleNav} />
        <DashBoardSideNav showNav={showNav} />
        <div className="pt-[100px]">
          {userData && (
            <h1>
              Welcome, {userData.firstName} {userData.lastName}!
            </h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default DashboardHome;


{/* <div>
  {userData ? (
    <div>
      <h1>
        Welcome, {userData.firstName} {userData.lastName}!
      </h1>
      Render other dashboard components
    </div>
  ) : (
    <h1>Loading...</h1>
  )}
</div>; */}