import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import WalletPortfolio from "./WalletPortfolio";
import axios from "axios";
import "./Wallet.css"

const Wallet = () => {
  const [userData, setUserData] = useState({});

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
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);
  
  return (
    <section className="bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <div>
        <DashboardLayout />
        <div className="pt-[100px] largeDevice:ml-[230px]">
          <WalletPortfolio userData={userData} setUserData={setUserData} />
        </div>
      </div>
    </section>
  );
};

export default Wallet;
