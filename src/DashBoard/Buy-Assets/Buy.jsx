import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import BuyCoinData from "./buyCoinData";
import axios from "axios";



const Buy = () => {
  const [userData, setUserData] = useState({});
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user data here using an API endpoint
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://coinvault.onrender.com/v1/auth/user",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserData(response.data);
        setIsLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error(error);
        setIsLoading(false); // Set loading state to false even if there's an error
      }
    };

    fetchUserData();
  }, []);
  

  return (
    <section className="bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <div>
        <DashboardLayout />
        <div className="pt-[100px] generalDevice:pt-[70px] largeDevice:ml-[230px]">
          <BuyCoinData userData={userData} />
        </div>
      </div>
    </section>
  );
};


export default Buy;
