import React from 'react'
import coinVault from "./Footer-Image/coin-bg.png";
import { Link as LinkScroll } from "react-scroll";
import { Link } from "react-router-dom";

const Footer = () => {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="" id="footer">
      <div className="flex justify-center relative border-t-[1px] border-[rgba(255,255,255,0.2)] w-[90%] mx-auto mb-[40px]">
        <div className="rounded-full border-[1px] border-[rgba(255,255,255,0.2)] inline-block px-[20px] py-[15px] hover:bg-[rgb(0,180,224)] transition-all duration-500 ease-in-out cursor-pointer absolute bottom-[-25px] bg-[rgb(3,11,21)]">
          <LinkScroll
            to="SectionOne"
            smooth={true}
            duration={500}
            offset={-100}
          >
            <i className="fa-solid fa-arrow-up text-[20px]"></i>
          </LinkScroll>
        </div>
      </div>

      <div className="mx-[20px] flex generalDevice:flex-col largeDevice:items-center largeDevice:justify-evenly">
        <div className="mb-[60px]">
          <div>
            <img src={coinVault} alt="" className="w-[200px]" />
          </div>

          <div className="mt-[-50px]">
            <p className="ml-[20px] font-[600] text-[rgba(255,255,255,0.5)]">
              The World's Biggest Crypto Simulating Platform
            </p>
          </div>

          <div className="mt-[20px] ml-[20px] flex gap-[20px]">
            <div className="rounded-full border-[2px] border-[rgb(0,180,224)] inline-block px-[12px] py-[6px] hover:bg-[rgb(0,180,224)] transition-all duration-500 ease-in-out cursor-pointer bg-[rgb(3,11,21)]">
              <a
                href="https://web.facebook.com/adegoke.gabriel.526"
                target="_blank"
              >
                <i class="fa-brands fa-facebook-f"></i>
              </a>
            </div>

            <div className="rounded-full border-[2px] border-[rgb(0,180,224)] inline-block px-[10px] py-[6px] hover:bg-[rgb(0,180,224)] transition-all duration-500 ease-in-out cursor-pointer bg-[rgb(3,11,21)]">
              <a href="https://twitter.com/TheRealAdegoke" target="_blank">
                <i class="fa-brands fa-twitter"></i>
              </a>
            </div>

            <div className="rounded-full border-[2px] border-[rgb(0,180,224)] inline-block px-[10px] py-[6px] hover:bg-[rgb(0,180,224)] transition-all duration-500 ease-in-out cursor-pointer bg-[rgb(3,11,21)]">
              <a
                href="https://www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3Bn%2FzKdLZxTsKDmAOamTiU6w%3D%3D"
                target="_blank"
              >
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
            </div>

            <div className="rounded-full border-[2px] border-[rgb(0,180,224)] inline-block px-[10px] py-[6px] hover:bg-[rgb(0,180,224)] transition-all duration-500 ease-in-out cursor-pointer bg-[rgb(3,11,21)]">
              <a href="https://github.com/TheRealAdegoke" target="_blank">
                <i class="fa-brands fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="ml-[20px] mb-[40px]">
          <h1 className="mb-[20px] font-[600] text-[23px]">USEFUL LINKS</h1>

          <div className="flex flex-col">
            <Link to="/signup">
              <p className="animated-text font-[600] cursor-pointer text-[rgba(255,255,255,0.5)] hover:text-[white] inline-block mb-[10px] transition-all duration-500 ease-in-out pb-[5px]">
                Get Started
              </p>
            </Link>

            <Link to="/termsandconditions">
              <p className="animated-text font-[600] cursor-pointer text-[rgba(255,255,255,0.5)] hover:text-[white] inline-block mb-[10px] transition-all duration-500 ease-in-out pb-[5px]">
                Terms and Conditions
              </p>
            </Link>

            <Link to="/forgotpassword">
              <p className="animated-text font-[600] cursor-pointer text-[rgba(255,255,255,0.5)] hover:text-[white] inline-block mb-[10px] transition-all duration-500 ease-in-out pb-[5px]">
                Forgot Password
              </p>
            </Link>

            <Link to="/login">
              <p className="animated-text font-[600] cursor-pointer text-[rgba(255,255,255,0.5)] hover:text-[white] inline-block mb-[10px] transition-all duration-500 ease-in-out pb-[5px]">
                Login
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t-[1px] border-[rgba(255,255,255,0.2)] w-[90%] mx-auto">
        <p className="py-[40px] text-center font-[600]">
          Copyright © {currentYear}. All Rights Reserved CoinVault
        </p>
      </div>
    </footer>
  );
}

export default Footer