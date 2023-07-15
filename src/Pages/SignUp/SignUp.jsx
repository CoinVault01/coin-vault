import React, { useState } from "react";
import "../SignUp/SignUp.css";
import axios from "axios";
import coinVault from "./SignUp-Image/coin-bg.png";
import Username from "./SignUP-Components/UserName";
import LegalName from "./SignUP-Components/LegalName";
import EmailPassword from "./SignUP-Components/EmailPassword";
import Pin from "./SignUP-Components/Pin";


const SignUp = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/v1/auth/signup", user)
      .then((response) => {
        // Handle successful response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Server responded with an error:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received from the server:", error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("Error during request setup:", error.message);
        }
      });
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
            user={user}
          />
        );
      default:
        return null;
    }
  };

  

  return (
    <section className="formAnim bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
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
