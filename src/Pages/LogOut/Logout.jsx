import React, { useState } from 'react'
import warning from "../LogOut/LogoutImage/warning.svg"
import "./Logout.css"
import { useNavigate } from 'react-router-dom';

const Logout = ({ closeLogout, handleLogout }) => {
  const navigate = useNavigate()

  const handleUserLogout = () => {
    // Clear the token from local storage (replace 'yourTokenKey' with the actual key used to store the token)
    localStorage.removeItem("token");
    localStorage.removeItem("userCryptoData")
    localStorage.removeItem("userData");

    // Navigate the user to the login page
    navigate("/login"); // Replace '/login' with the actual login page route
  };



  return (
    <section
      className={`${
        closeLogout ? "block" : "hidden"
      } fixed top-0 z-[999] w-[100%] h-[100%] bg-[rgba(0,0,0,0.8)] flex justify-center items-center`}
    >
      <div className={`w-[75%] h-[450px] max-w-[400px] bg-[rgb(36,39,58)]`}>
        <div className="logout-bg-color w-[100%] h-[10px]"></div>
        <img src={warning} alt="" className="block w-[40%] mx-auto" />
        <div className="w-[80%] mx-auto my-[20px]">
          <p className="font-[600] text-[20px] text-center mb-[10px]">
            Logout of your account?
          </p>
          <p className="font-[700] text-[13px] text-center text-[rgb(146,147,157)] mb-[20px]">
            Are you sure you want to log out? You will need to sign in again to
            access your account.
          </p>
        </div>

        <div className="w-[90%] mx-auto">
          <button
            className="logout-bg-color block rounded-[10px] w-[100%] py-[10px] mb-[20px] font-[600]"
            onClick={() => {
              handleUserLogout()
            }}
          >
            Yes, Logout
          </button>

          <button
            className="block rounded-[10px] border-[1px] border-[rgb(146,147,157)] bg-transparent w-[100%] py-[10px] font-[600]"
            onClick={() => {
              handleLogout();
            }}
          >
            No, Cancel
          </button>
        </div>
      </div>
    </section>
  );
};

export default Logout