import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { RotatingLines } from "react-loader-spinner";
import SwapCoinList from "./SwapCoinList";
import SwapCoinModal from "./SwapCoinModal";
import useUserCryptoData from "../../Data/useUserCryptoData";

const SwapCoin = () => {
const { loading } = useUserCryptoData();
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
              <SwapCoinList
                setSelectedCrypto={setSelectedCrypto}
                setIsModalVisible={setIsModalVisible}
              />
              {isModalVisible && (
                <SwapCoinModal
                  selectedCrypto={selectedCrypto}
                  setIsModalVisible={setIsModalVisible}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SwapCoin;
