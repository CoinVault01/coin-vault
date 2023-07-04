import React, { useState } from 'react'
import { Link } from "react-router-dom";
import EmailPassword from './EmailPassword';

const LegalName = ({username}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [showForm, setShowForm] = useState(false);

    const handleInputChange1 = (event) => {
      setFirstName(event.target.value);
      setShowForm(false)
    };

    const handleInputChange2 = (event) => {
      setLastName(event.target.value);
      setShowForm(false);
    };

    const isContinueDisabled = firstName === "" || lastName === "";

    const handleContinueClick = () => {
       if (!isContinueDisabled) {
         setShowForm(true);
       }
    };


  return (
    <section>
      {showForm ? (
        <EmailPassword firstName={firstName} />
      ) : (
        <div>
          <div className="mb-[30px]">
            <h1 className="text-[25px] font-[600] font-[poppins]">
              Hey {username}👋
            </h1>
            <p className="pb-[5px] text-[25px] font-[600] font-[poppins] capitalize smallerDevice:text-[25px]">
              Please give us your legal name
            </p>
          </div>

          <div>
            <div className="mb-[20px]">
              <label
                htmlFor="lastName"
                className="capitalize text-[rgb(157,166,177)] font-[600] pb-[3px] inline-block"
              >
                first name
              </label>

              <div className="border-[1px] border-[rgba(255,255,255,0.2)] rounded-[5px] h-[45px] bg-[rgb(32,37,43)] flex items-center max-w-[400px]">
                <div className="mx-[20px]">
                  <i className="fa-solid fa-user text-[rgb(157,166,177)]"></i>
                </div>
                <input
                  type="text"
                  className="user-input w-[100%] h-[100%] bg-[rgb(32,37,43)] pl-[20px] pb-[3px] pr-[20px] mr-[2px] font-[600]"
                  placeholder="e.g John"
                  onChange={handleInputChange1}
                  value={firstName}
                />
              </div>
            </div>

            <div className="">
              <label
                htmlFor="lastName"
                className="capitalize text-[rgb(157,166,177)] font-[600] pb-[3px] inline-block"
              >
                last name
              </label>

              <div className="border-[1px] border-[rgba(255,255,255,0.2)] rounded-[5px] h-[45px] bg-[rgb(32,37,43)] flex items-center max-w-[400px]">
                <div className="mx-[20px]">
                  <i className="fa-solid fa-user text-[rgb(157,166,177)]"></i>
                </div>
                <input
                  type="text"
                  className="user-input w-[100%] h-[100%] bg-[rgb(32,37,43)] pl-[20px] pb-[3px] pr-[20px] mr-[2px] font-[600]"
                  placeholder="e.g Doe"
                  onChange={handleInputChange2}
                  value={lastName}
                />
              </div>
            </div>
          </div>

          <div className="mt-[40px] max-w-[400px] flex justify-center">
            <button
              className="form-btn block w-[100%] font-[600] py-[10px] mb-[20px] rounded-[8px]"
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
              <i className="fa-solid fa-reply-all text-[white]"></i>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default LegalName