import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import TransactionModal from "./TransactionModal";
import axios from "axios";

const Transactions = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

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
        <div className="pt-[100px] pb-[50px] largeDevice:ml-[230px]">
          <div className="largeDevice:flex gap-[40px] largeDevice:px-[40px]">
            <TransactionModal userData={userData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transactions;
