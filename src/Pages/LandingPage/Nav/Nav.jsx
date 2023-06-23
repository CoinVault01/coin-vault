import React from 'react'
import coinVault from "../../../assets/LandingPage-Pictures/Coin-bg.png";

const Nav = () => {
  return (
    <>
      <nav className="bg-[rgba(3,11,21,1)] h-[90px] border-b-[1px] border-[rgba(255,255,255,0.2)]">
        <div className='largeDevice:px-[20px]'>
          <div className='flex justify-between'>
            <div className='mt-[-10px]'> 
              <img
            src={coinVault}
            alt=""
            className="w-[125px] pt-[-200px] cursor-pointer"
          />
            </div>

            <div className='smallDevice:hidden mt-[30px]'>
              <ul className='flex gap-[30px] font-[600] uppercase cursor-pointer'>
                <li className='h-[60px] animated-text'>Home</li>

                <li className='h-[60px] animated-text'>About Us</li>

                <li className='h-[60px] animated-text'>Why choose us</li>

                <li className='h-[60px] animated-text'>Contact us</li>
              </ul>
            </div>

            <div className='smallDevice:hidden mt-[30px]'>
              <ul className='flex gap-[20px] font-[600] uppercase cursor-pointer'>
                <li>sign in</li>
                <li>Get started</li>
              </ul>
            </div>

          <div className='mt-[30px] mr-[15px] cursor-pointer largeDevice:hidden'>
            <i className="fa-solid fa-bars-staggered text-[30px]"></i>
          </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav