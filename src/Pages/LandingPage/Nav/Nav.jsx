import React, { useEffect, useRef, useState } from "react";
import "../Nav/nav.css";
import coinVault from "./NavImage/coin-bg.png";
import { Link as LinkScroll } from "react-scroll";
import { Link } from "react-router-dom";

const Nav = ({ activeSection, setActiveSection }) => {
  const [closeNav, setCloseNav] = useState(false);
  const closenav2 = useRef(null);
  const [showNavbar, setShowNavbar] = useState(false);
  const [active, setActive] = useState([
    { id: 1, isOpen: true },
    { id: 2, isOpen: false },
    { id: 3, isOpen: false },
    { id: 4, isOpen: false },
  ]);

  const handleLinkClick = (id) => {
    const newShowBorder = [...active];
    const index = newShowBorder.findIndex((item) => item.id === id);
    if (index !== -1) {
      newShowBorder[index].isOpen = true;
      for (let i = 0; i < newShowBorder.length; i++) {
        if (i !== index) {
          newShowBorder[i].isOpen = false;
        }
      }
      setActive(newShowBorder);
    }
  };

  const handleClickOutside = (event) => {
    if (closenav2.current && !closenav2.current.contains(event.target)) {
      setCloseNav(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY < 200;
      if (!isScrolled) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`${
          showNavbar ? "block top-0 navAnim" : "relative"
        } bg-[rgba(3,11,21,1)] h-[90px] border-b-[1px] border-[rgba(255,255,255,0.2)] select-none sticky w-[100%] z-[999]`}
      >
        <div className="largeDevice:px-[20px] tablet:px-[10vw]">
          <div className="flex justify-between">
            <div className="mt-[-10px]">
              <img
                src={coinVault}
                alt=""
                className="w-[125px] pt-[-200px] cursor-pointer"
              />
            </div>

            <div className="generalDevice:hidden mt-[30px]">
              <ul className="flex gap-[30px] font-[600] uppercase cursor-pointer">
                <LinkScroll
                  to="SectionOne"
                  smooth={true}
                  duration={500}
                  offset={-100}
                  onClick={() => {
                    setActiveSection("SectionOne");
                    handleLinkClick(active[0].id);
                  }}
                  className={activeSection === "SectionOne" ? "active" : ""}
                >
                  <li
                    className={`${
                      activeSection === "SectionOne"
                        ? "border-b-[3px] border-[rgb(0,180,224)]"
                        : ""
                    } animated-text h-[60px]`}
                  >
                    Home
                  </li>
                </LinkScroll>

                <LinkScroll
                  to="SectionTwo"
                  smooth={true}
                  duration={500}
                  offset={-50}
                  onClick={() => {
                    setActiveSection("SectionTwo");
                    handleLinkClick(active[1].id);
                  }}
                  className={activeSection === "SectionTwo" ? "active" : ""}
                >
                  <li
                    className={`${
                      activeSection === "SectionTwo"
                        ? "border-b-[3px] border-[rgb(0,180,224)]"
                        : ""
                    } animated-text h-[60px]`}
                  >
                    About Us
                  </li>
                </LinkScroll>

                <LinkScroll
                  to="SectionThree"
                  smooth={true}
                  duration={500}
                  offset={-50}
                  onClick={() => {
                    setActiveSection("SectionThree");
                    handleLinkClick(active[2].id);
                  }}
                  className={activeSection === "SectionThree" ? "active" : ""}
                >
                  <li
                    className={`${
                      activeSection === "SectionThree"
                        ? "border-b-[3px] border-[rgb(0,180,224)]"
                        : ""
                    } animated-text h-[60px]`}
                  >
                    Why choose us
                  </li>
                </LinkScroll>

                <LinkScroll
                  to="SectionFour"
                  smooth={true}
                  duration={500}
                  offset={-50}
                  onClick={() => {
                    setActiveSection("SectionFour");
                    handleLinkClick(active[3].id);
                  }}
                  className={activeSection === "SectionFour" ? "active" : ""}
                >
                  <li
                    className={`${
                      activeSection === "SectionFour"
                        ? "border-b-[3px] border-[rgb(0,180,224)]"
                        : ""
                    } animated-text h-[60px]`}
                  >
                    Contact us
                  </li>
                </LinkScroll>
              </ul>
            </div>

            <div className="generalDevice:hidden mt-[30px]">
              <ul className="flex gap-[20px] font-[600] uppercase cursor-pointer">
                <Link to="/login">
                  <li className="h-[60px] animated-text">sign in</li>
                </Link>

                <Link to="/signup">
                  <li className="header-btn rounded-full border-[2px] border-[rgb(0,180,224)] py-[10px] px-[10px] h-[45px] mt-[-10px]">
                    Get started
                  </li>
                </Link>
              </ul>
            </div>

            <div className="mt-[30px] mr-[15px] cursor-pointer largeDevice:hidden select-none">
              <i
                className="fa-solid fa-bars-staggered text-[30px] select-none"
                onClick={() => {
                  setCloseNav(true);
                }}
              ></i>
            </div>
          </div>
        </div>

        <div
          className={`${
            closeNav ? "left-[0]" : "left-[999px]"
          } bg-[rgba(9,27,47,0.4)] h-[100vh] w-[100%] fixed top-0 largeDevice:hidden flex justify-end transition-all duration-[0.5s] ease-in-out`}
        >
          <div
            className={`bg-[rgb(11,29,51)] w-[60%] max-w-[300px] h-[100%] overflow-y-auto`}
            ref={closenav2}
          >
            <div className="flex justify-end pt-[20px] pr-[10px] select-none">
              <i
                className="fa-solid fa-xmark text-[rgb(0,180,224)] text-[25px] cursor-pointer select-none"
                onClick={() => {
                  setCloseNav(false);
                }}
              ></i>
            </div>

            <div className="mt-[-10px] ml-[25px]">
              <img
                src={coinVault}
                alt=""
                className="w-[125px] pt-[-200px] cursor-pointer"
              />
            </div>

            <div>
              <ul className="flex flex-col gap-[20px] font-[600] uppercase ">
                <LinkScroll
                  to="SectionOne"
                  smooth={true}
                  duration={500}
                  offset={-100}
                  onClick={() => {
                    setCloseNav(false);
                  }}
                >
                  <li className="pl-[40px] pt-[20px] cursor-pointer border-t-[1px] border-[rgba(255,255,255,0.2)]">
                    Home
                  </li>
                </LinkScroll>

                <LinkScroll
                  to="SectionTwo"
                  smooth={true}
                  duration={500}
                  offset={-50}
                  onClick={() => {
                    setCloseNav(false);
                  }}
                >
                  <li className="pl-[40px] pt-[20px] cursor-pointer border-t-[1px] border-[rgba(255,255,255,0.2)]">
                    About Us
                  </li>
                </LinkScroll>

                <LinkScroll
                  to="SectionThree"
                  smooth={true}
                  duration={500}
                  offset={-50}
                  onClick={() => {
                    setCloseNav(false);
                  }}
                >
                  <li className="pl-[40px] pt-[20px] cursor-pointer border-t-[1px] border-[rgba(255,255,255,0.2)]">
                    Why choose us
                  </li>
                </LinkScroll>

                <LinkScroll
                  to="SectionFour"
                  smooth={true}
                  duration={500}
                  offset={-50}
                  onClick={() => {
                    setCloseNav(false);
                  }}
                >
                  <li className="pl-[40px] pt-[20px] cursor-pointer border-t-[1px] border-[rgba(255,255,255,0.2)]">
                    Contact us
                  </li>
                </LinkScroll>

                <Link
                  to="/login"
                  smooth={true}
                  duration={500}
                  offset={-50}
                  onClick={() => {
                    setCloseNav(false);
                  }}
                >
                  <li className="pl-[40px] py-[20px] cursor-pointer border-t-[1px] border-[rgba(255,255,255,0.2)] border-b-[1px]">
                    Login
                  </li>
                </Link>
              </ul>
            </div>

            <div className="flex justify-center smallerDevice:gap-[10px] gap-[15px] my-[30px]">
              <div className="hover:bg-[rgb(0,180,224)] flex justify-center items-center py-[10px] px-[10px] border-[1px] border-[rgba(255,255,255,0.2)] text-[white] cursor-pointer transition-all duration-[1s] ease-in-out">
                <a
                  href="https://web.facebook.com/adegoke.gabriel.526"
                  target="_blank"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
              </div>

              <div className="hover:bg-[rgb(0,180,224)] flex justify-center items-center py-[10px] px-[10px] border-[1px] border-[rgba(255,255,255,0.2)] text-[white] cursor-pointer transition-all duration-[1s] ease-in-out">
                <a href="https://twitter.com/TheRealAdegoke" target="_blank">
                  <i className="fa-brands fa-twitter"></i>
                </a>
              </div>

              <div className="hover:bg-[rgb(0,180,224)] flex justify-center items-center py-[10px] px-[10px] border-[1px] border-[rgba(255,255,255,0.2)] text-[white] cursor-pointer transition-all duration-[1s] ease-in-out">
                <a
                  href="https://www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3Bn%2FzKdLZxTsKDmAOamTiU6w%3D%3D"
                  target="_blank"
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              </div>

              <div className="hover:bg-[rgb(0,180,224)] flex justify-center items-center py-[10px] px-[10px] border-[1px] border-[rgba(255,255,255,0.2)] text-[white] cursor-pointer transition-all duration-[1s] ease-in-out">
                <a href="https://github.com/TheRealAdegoke" target="_blank">
                  <i className="fa-brands fa-github"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
