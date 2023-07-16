import React, { useState } from "react";
import "../SignUp/SignUp.css";
import axios from "axios";
import coinVault from "./SignUp-Image/coin-bg.png";
import Username from "./SignUP-Components/UserName";
import LegalName from "./SignUP-Components/LegalName";
import EmailPassword from "./SignUP-Components/EmailPassword";
import VerifyEmail from "./VerifyEmail";
import Pin from "./SignUP-Components/Pin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1);
  const [user, setUser] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    pin: "",
    email: "",
    password: "",
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true); // Set loading state to true

      // Make the API request using supercool axios 😎
      const response = await axios.post(
        "http://localhost:8080/v1/auth/signup",
        user
      );

      // Display success message using Toastify
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      // Save email in localStorage
      localStorage.setItem("email", user.email);

      setTimeout(() => {
        navigate("/verifyemail");
      }, 3000);
    } catch (error) {
      // Display error message using Toastify
      toast.error(error.response.data.error, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
  };

  const renderComponent = () => {
    switch (step) {
      case 1:
        return (
          <Username
            handleChange={handleChange}
            handleNext={handleNext}
            user={user}
          />
        );
      case 2:
        return (
          <LegalName
            handleChange={handleChange}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            user={user}
          />
        );
      case 3:
        return (
          <Pin
            handleChange={handleChange}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            user={user}
          />
        );
      case 4:
        return (
          <EmailPassword
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handlePrevious={handlePrevious}
            isLoading={isLoading}
            user={user}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="formAnim bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <ToastContainer hideProgressBar autoClose={3000} />
      <div className="w-[90%] max-w-[500px] mx-auto">
        <div className="pt-[50px]">
          <img src={coinVault} alt="" className="inline-block w-[150px]" />
        </div>

        <div className="ml-[20px]">
          <div>
            <p className="capitalize font-[600] pb-[10px]">
              step {step}{" "}
              <span className="text-[rgba(255,255,255,0.5)]">/ 4</span>
            </p>

            <div className="flex gap-[20px] h-[10px] mb-[40px]">
              <div className="w-[80px] h-[2px] bg-[rgb(160,210,254)] cursor-pointer hover:h-[3px] hover:rounded-full"></div>

              <div
                className={`${
                  step >= 2
                    ? "bg-[rgb(160,210,254)]"
                    : "bg-[rgba(255,255,255,0.5)]"
                } w-[80px] h-[2px] cursor-pointer hover:h-[3px] hover:rounded-full`}
              ></div>

              <div
                className={`${
                  step >= 3
                    ? "bg-[rgb(160,210,254)]"
                    : "bg-[rgba(255,255,255,0.5)]"
                } w-[80px] h-[2px] cursor-pointer hover:h-[3px] hover:rounded-full`}
              ></div>

              <div
                className={`${
                  step >= 4
                    ? "bg-[rgb(160,210,254)]"
                    : "bg-[rgba(255,255,255,0.5)]"
                } w-[80px] h-[2px] cursor-pointer hover:h-[3px] hover:rounded-full`}
              ></div>
            </div>
          </div>
        </div>

        <div>{renderComponent()}</div>
      </div>
    </section>
  );
};

export default SignUp;
