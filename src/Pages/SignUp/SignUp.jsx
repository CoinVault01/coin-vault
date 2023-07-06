import React, { useState } from 'react'
import "../SignUp/SignUp.css";
import coinVault from "./SignUp-Image/coin-bg.png";
import Username from './SignUP-Components/UserName';
import LegalName from './SignUP-Components/LegalName';
import EmailPassword from './SignUP-Components/EmailPassword';
import Pin from './SignUP-Components/Pin';
import VerifyEmail from './VerifyEmail';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const handleNext = (text) => {
    setUserName(text);
    setFirstName(text);
    setStep(step + 1);
  };

  const handleEmail = (value) => {
    setEmail(value);
  };


  const handlePrevious = () => {
    setStep(step - 1);
  };

    const handleFormSubmit = (event) => {
      event.preventDefault();
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

        <form action="" method="post" onSubmit={handleFormSubmit}>
          {step === 1 && <Username onNext={handleNext} />}
          {step === 2 && (
            <LegalName
              onNext={handleNext}
              onPrevious={handlePrevious}
              userName={userName}
            />
          )}
          {step === 3 && (
            <Pin
              onNext={handleNext}
              onPrevious={handlePrevious}
              userFirstName={firstName}
            />
          )}
          {step === 4 && (
            <EmailPassword
              onPrevious={handlePrevious}
              userFirstName={firstName}
            />
          )}
        </form>
      </div>
    </section>
  );
}

export default SignUp