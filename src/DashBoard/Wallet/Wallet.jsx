import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import WalletPortfolio from "./WalletPortfolio";
import axios from "axios";
import "./Wallet.css"
import { RotatingLines } from "react-loader-spinner";
import WalletCoinList from "./WalletCoinList";
import TransferCoinModal from "./TransferCoinModal";

const Wallet = () => {
  const [userData, setUserData] = useState({});
  const [userCryptoData, setUserCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCryptoData, setSelectedCryptoData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserCryptoData = async () => {
      try {
        const response = await axios.get(
          `https://coinvault.onrender.com/v1/auth/user-crypto-holdings/${userData.userId}`
        );
        setUserCryptoData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user crypto holdings:", error.message);
        setLoading(false);
      }
    };

    fetchUserCryptoData();
  }, [userData]);

  
  
  return (
    <section className="bg-[rgb(28,33,39)] text-[white] pb-[20px]">
      <div>
        <DashboardLayout />
        <div>
          {loading ? (
            <div className="pt-[100px] largeDevice:ml-[230px] h-[100vh] mx-auto">
              <div className="w-[30px] mx-auto">
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
            <div className="pt-[100px] largeDevice:ml-[230px]">
              <div>
                <WalletPortfolio
                  userData={userData}
                  setUserData={setUserData}
                />
                <div className="largeDevice:flex gap-[40px] largeDevice:px-[40px]">
                  <WalletCoinList
                    userCryptoData={userCryptoData}
                    setSelectedCryptoData={setSelectedCryptoData}
                    setIsModalVisible={setIsModalVisible}
                  />
                  {isModalVisible && (
                    <TransferCoinModal
                      selectedCryptoData={selectedCryptoData}
                      setIsModalVisible={setIsModalVisible}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Wallet;
