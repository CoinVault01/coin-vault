import React from "react";

const WalletCoinList = ({ userCryptoData }) => {

  return (
    <section className="border-[1px] border-[rgb(46,52,59)] largeDevice:w-[50%] w-[90%] generalDevice:mx-auto rounded-[10px] bg-[rgb(32,37,43)]">
      <div className="flex justify-between items-center px-[18px] py-[30px]">
        <div>
          <p className="font-[600] text-[20px]">Your Assets</p>
        </div>

        <div className="flex items-center gap-[5px]">
          <p className="font-[600]">Sort by:</p>

          <div className="flex items-center gap-[15px] bg-[rgb(28,33,39)] border-[1px] border-[rgb(38,41,50)] rounded-[8px] p-[8px] cursor-pointer font-[600]">
            <p>Alphabet</p>
            <i className="fa-solid fa-chevron-down"></i>
          </div>
        </div>
      </div>

      <div className="">
        <ul className="flex items-center justify-between border-b-[1px] border-[rgb(46,52,59)] px-[18px] pb-[10px]">
          <li className="w-[37%] text-[rgb(165,177,189)] font-[600]">Name</li>
          <li className="w-[21%] text-[rgb(165,177,189)] font-[600]">
            Balance
          </li>
          <li className="w-[21%] text-[rgb(165,177,189)] font-[600]">
            Fiat Value
          </li>
          <li className="mobileDeviceOnly:hidden w-[21%] text-[rgb(165,177,189)] font-[600]">
            24h Change
          </li>
        </ul>

        <ul className="sell-coin-data h-[500px] overflow-y-auto">
          {userCryptoData.map((crypto, index) => (
            <li
              key={index}
              className="flex items-center justify-between cursor-pointer w-full px-[18px] border-b-[1px] border-[rgb(46,52,59)]"
            >
              <span className="flex items-center gap-[5px] py-[15px] w-[40%]">
                <img
                  src={crypto.image}
                  alt=""
                  className="w-[35px] select-none"
                />
                <span className="font-[600]">{crypto.name}</span>
              </span>

              <span className="block w-[20%]">{crypto.amount.toFixed(2)}</span>

              <span className="block w-[20%]">
                ${crypto.fiatValue.toFixed(2)}
              </span>
              <span
                className="block w-[20%] mobileDeviceOnly:hidden"
                style={{
                  color:
                    crypto.price_change_percentage_24h < 0
                      ? "red"
                      : "rgb(14, 203, 129)",
                }}
              >
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WalletCoinList;
