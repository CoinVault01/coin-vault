import React from 'react'
import coinVault from "../../assets/LandingPage-Pictures/CoinVault.png";

const Nav = () => {
  return (
    <>
      <nav className="w-[100%] bg-[rgb(3,11,21)]">
        <div>
          <img
            src={coinVault}
            alt=""
            className="w-[100%] max-w-[150px] block"
          />
        </div>
      </nav>
    </>
  );
}

export default Nav