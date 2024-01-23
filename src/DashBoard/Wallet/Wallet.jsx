import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import WalletPortfolio from "./WalletPortfolio";
import axios from "axios";
import "./Wallet.css";
import { RotatingLines } from "react-loader-spinner";
import WalletCoinList from "./WalletCoinList";
import TransferCoinModal from "./TransferCoinModal";
import useUserCryptoData from "../../Data/useUserCryptoData";

const Wallet = () => {
  const {loading} = useUserCryptoData();
  const [selectedCryptoData, setSelectedCryptoData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);


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
                />
                <div className="largeDevice:flex gap-[40px] largeDevice:px-[40px]">
                  <WalletCoinList
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
