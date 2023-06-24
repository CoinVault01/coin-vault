import React, { useEffect, useRef, useState } from 'react'
import "../Nav/nav.css"
import coinVault from "./NavImage/coin-bg.png";



const Nav = () => {
  const [closeNav, setCloseNav] = useState(false)
  const closenav2 = useRef(null)

  const handleClickOutside = (event) => {
    if (closenav2.current && !closenav2.current.contains(event.target)) {
      setCloseNav(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])

  return (
    <>
      <nav className="bg-[rgba(3,11,21,1)] h-[90px] border-b-[1px] border-[rgba(255,255,255,0.2)] select-none relative">
        <div className='largeDevice:px-[20px] tablet:px-[10vw]'>
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
                  <li className='h-[60px] animated-text'>sign in</li>
                
                  <li className='header-btn rounded-full border-[2px] border-[rgb(0,180,224)] py-[10px] px-[10px] h-[45px] mt-[-10px]'>Get started</li>
              </ul>
            </div>

          <div className='mt-[30px] mr-[15px] cursor-pointer largeDevice:hidden'>
            <i className="fa-solid fa-bars-staggered text-[30px]" onClick={() => {
              setCloseNav(true)
            }}></i>
          </div>
          </div>
        </div>

        <div className={`${closeNav ? "left-[0]" : "left-[999px]"} bg-[rgba(9,27,47,0.4)] h-[100vh] w-[100%] fixed top-0 largeDevice:hidden flex justify-end transition-all duration-[0.5s] ease-in-out`}>
          <div className={`bg-[rgb(11,29,51)] w-[60%] max-w-[300px] h-[100%] overflow-y-auto`} ref={closenav2}>

            <div className='flex justify-end pt-[20px] pr-[10px]'>
              <i className="fa-solid fa-xmark text-[rgb(0,180,224)] text-[25px] cursor-pointer" onClick={() => {
                setCloseNav(false)
              }}></i>
            </div>

            <div className='mt-[-10px] ml-[25px]'> 
              <img
            src={coinVault}
            alt=""
            className="w-[125px] pt-[-200px] cursor-pointer"
          />
            </div>

            <div>
              <ul className='flex flex-col gap-[20px] font-[600] uppercase '>
                <li className='pl-[40px] pt-[20px] cursor-pointer border-t-[1px] border-[rgba(255,255,255,0.2)]'>Home</li>

                <li className='pl-[40px] pt-[20px] cursor-pointer border-t-[1px] border-[rgba(255,255,255,0.2)]'>About Us</li>

                <li className='pl-[40px] pt-[20px] cursor-pointer border-t-[1px] border-[rgba(255,255,255,0.2)]'>Why choose us</li>

                <li className='pl-[40px] py-[20px] cursor-pointer border-t-[1px] border-[rgba(255,255,255,0.2)] border-b-[1px]'>Contact us</li>
              </ul>
            </div>

            <div className='flex justify-center smallerDevice:gap-[10px] gap-[15px] my-[40px]'>
              <div className='hover:bg-[rgb(0,180,224)] flex justify-center items-center py-[10px] px-[10px] border-[1px] border-[rgba(255,255,255,0.2)] text-[white] cursor-pointer transition-all duration-[1s] ease-in-out'>
                <i className="fa-brands fa-facebook-f"></i>
              </div>

              <div className='hover:bg-[rgb(0,180,224)] flex justify-center items-center py-[10px] px-[10px] border-[1px] border-[rgba(255,255,255,0.2)] text-[white] cursor-pointer transition-all duration-[1s] ease-in-out'>
                <i className="fa-brands fa-twitter"></i>
              </div>

              <div className='hover:bg-[rgb(0,180,224)] flex justify-center items-center py-[10px] px-[10px] border-[1px] border-[rgba(255,255,255,0.2)] text-[white] cursor-pointer transition-all duration-[1s] ease-in-out'>
                <i className="fa-brands fa-linkedin-in"></i>
              </div>

              <div className='hover:bg-[rgb(0,180,224)] flex justify-center items-center py-[10px] px-[10px] border-[1px] border-[rgba(255,255,255,0.2)] text-[white] cursor-pointer transition-all duration-[1s] ease-in-out'>
                <i className="fa-brands fa-github"></i>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav