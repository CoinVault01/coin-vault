import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import axios from "axios";
import BuyCoinList from "./BuyCoinList";
import { RotatingLines } from "react-loader-spinner";
import BuyCoinModal from "./BuyCoinModal";



const Buy = () => {
  const [userData, setUserData] = useState({});
  const [loading, setIsLoading] = useState(true);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
          {loading ? (
            <div className="w-[30px] mx-auto">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="60"
                visible={true}
              />
            </div>
          ) : (
            <div className="largeDevice:flex gap-[40px] largeDevice:px-[40px]">
              <BuyCoinList
                userData={userData}
                setSelectedCrypto={setSelectedCrypto}
                setIsModalVisible={setIsModalVisible}
              />
              {isModalVisible && (
                <BuyCoinModal
                  selectedCrypto={selectedCrypto}
                  setIsModalVisible={setIsModalVisible}
                  userData={userData}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};


export default Buy;
