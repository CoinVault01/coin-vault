import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import TransactionModal from "./TransactionModal";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

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
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
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
            {loading ? (
              <div className="pt-[100px] h-[100vh] flex justify-center mx-auto">
                <div className="w-[30px]">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="60"
                    visible={true}
                  />
                </div>
              </div>
            ) : (
              <div className="w-[100%]">
                <TransactionModal userData={userData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transactions;
