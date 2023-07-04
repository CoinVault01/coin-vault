import React, { useState } from 'react'
import coinVault from "./SignUp-Image/coin-bg.png";
import "../SignUp/SignUp.css"
import { Link } from 'react-router-dom';
import LegalName from './SignUP-Components/LegalName';

const SignUp = () => {
  const [inputText, setInputText] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleContinueClick = () => {
    if (inputText.trim() !== "" && isChecked) {
      setShowForm(true);
    }
  };

    const handleFormSubmit = (event) => {
      event.preventDefault();
      
    };

    const isDisabled = inputText.trim() === "" || !isChecked;
    const buttonStyle = isDisabled
      ? { cursor: "not-allowed", filter: "opacity(0.5)" }
      : {};



  return (
    <section className="bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <div className="w-[90%] max-w-[500px] mx-auto">
        <div className="pt-[50px]">
          <img src={coinVault} alt="" className="inline-block w-[150px]" />
        </div>

        <div className="ml-[20px]">
          <div>
            <p className="capitalize font-[600] pb-[10px]">
              step 1 <span className="text-[rgba(255,255,255,0.5)]">/ 4</span>
            </p>

            <div className="flex gap-[20px] h-[10px] mb-[40px]">
              <div className="w-[80px] h-[2px] bg-[rgb(160,210,254)] cursor-pointer hover:h-[3px] hover:rounded-full"></div>

              <div className="w-[80px] h-[2px] bg-[rgba(255,255,255,0.5)] cursor-pointer hover:h-[3px] hover:rounded-full"></div>

              <div className="w-[80px] h-[2px] bg-[rgba(255,255,255,0.5)] cursor-pointer hover:h-[3px] hover:rounded-full"></div>

              <div className="w-[80px] h-[2px] bg-[rgba(255,255,255,0.5)] cursor-pointer hover:h-[3px] hover:rounded-full"></div>
            </div>

            <form action="" method="post" onSubmit={handleFormSubmit}>
              {showForm ? (
                <LegalName username={inputText}/>
              ) : (
                <div>
                  <div className="mb-[30px]">
                    <h1 className="text-[30px] font-[600] font-[poppins]">
                      Hey 👋
                    </h1>
                    <p className="pb-[5px] text-[28px] font-[600] font-[poppins] capitalize smallerDevice:text-[25px]">
                      welcome to CoinVault
                    </p>
                    <p className="text-[rgb(157,166,177)] font-[600]">
                      Let’s get to know you!
                    </p>
                    <p className="text-[rgb(157,166,177)] font-[600] pr-[50px] smallerDevice:pr-[0]">
                      We’ll need you to choose a really cool name that other
                      users can find you with, choose something cool like
                      aquaman, or deadpool 😜
                    </p>
                  </div>

                  <div>
                    <div>
                      <label
                        htmlFor="username"
                        className="capitalize text-[rgb(157,166,177)] font-[600] pb-[3px] inline-block"
                      >
                        username
                      </label>

                      <div className="border-[1px] border-[rgba(255,255,255,0.2)] rounded-[5px] h-[45px] bg-[rgb(32,37,43)] flex items-center max-w-[400px]">
                        <div className="mx-[20px]">
                          <i className="fa-solid fa-user text-[rgb(157,166,177)]"></i>
                        </div>
                        <input
                          type="text"
                          className="user-input w-[100%] h-[100%] bg-[rgb(32,37,43)] pl-[20px] pb-[3px] pr-[20px] mr-[2px] font-[600]"
                          placeholder="Enter Username"
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="flex gap-[10px] ml-[15px] mt-[15px]">
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          className=""
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                        />
                        <p className="font-[600]">
                          I agree to CoinVault's{" "}
                          <span className="text-[rgb(160,210,254)]">
                            Terms & conditions
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-[40px] max-w-[400px] flex justify-center">
                    <button
                      className="form-btn block w-[100%] font-[600] py-[10px] mb-[20px] rounded-[8px]"
                      style={buttonStyle}
                      disabled={isDisabled}
                      onClick={handleContinueClick}
                    >
                      Continue
                    </button>
                  </div>

                  <div>
                    <p className="pb-[20px] text-[rgba(255,255,255,0.5)]">
                      Already have an account?{" "}
                      <Link to="/login">
                        <span className="text-[rgb(160,210,254)]">Sign In</span>
                      </Link>{" "}
                      <i class="fa-solid fa-reply-all text-[white]"></i>
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp