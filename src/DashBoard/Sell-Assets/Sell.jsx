import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import SellCoinList from "./SellCoinList";
import SellCoinModal from "./SellCoinModal";


const Sell = () => {
  const [userData, setUserData] = useState({});
  const [loading, setIsLoading] = useState(true);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if userData is already in the cache
        const cachedUserData = JSON.parse(localStorage.getItem("userData"));

        if (cachedUserData) {
          setUserData(cachedUserData);
          setIsLoading(false);
          return;
        }

        const response = await axios.get(
          "https://coinvault.onrender.com/v1/auth/user",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setUserData(response.data);

        // Cache the fetched userData
        localStorage.setItem("userData", JSON.stringify(response.data));

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
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
              <SellCoinList
                userData={userData}
                setSelectedCrypto={setSelectedCrypto}
                setIsModalVisible={setIsModalVisible}
              />
              {isModalVisible && (
                <SellCoinModal
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

export default Sell;
