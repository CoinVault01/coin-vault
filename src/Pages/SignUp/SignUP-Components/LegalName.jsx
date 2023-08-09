import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LegalName = ({
  handleChange,
  handleNext,
  handlePrevious,
  user,
}) => {
  const savedUserName = localStorage.getItem("userName");
  
  useEffect(() => {
    // Load saved value from local storage on component mount
    const savedfirstName = localStorage.getItem("firstName");
    const savedlastName = localStorage.getItem("lastName");

    if (savedfirstName) {
      // Set the saved value in the component state
      handleChange({
        target: { name: "firstName", value: savedfirstName, lastName: "lastName", value: savedlastName },
      });
    }
  }, []);

  // Save the first name to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("firstName", user.firstName);
    localStorage.setItem("lastName", user.lastName);
  }, [user.firstName], [user.lastName]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Only allow letters and alphabets
    const regex = /^[a-zA-Z\s]*$/;
    if (!value || regex.test(value)) {
      handleChange(event);
      localStorage.setItem(name, value); // Save the value to local storage
    }
  };

  const isFormValid = user.firstName && user.lastName;

  return (
    <section className="ml-[20px]">
      <div>
        <div className="mb-[30px]">
          <h1 className="text-[25px] font-[600] font-[poppins] capitalize">
            Hey {savedUserName}👋
          </h1>
          <p className="pb-[5px] text-[25px] font-[600] font-[poppins] capitalize smallerDevice:text-[25px]">
            Please give us your legal name
          </p>
        </div>

        <div>
          <div className="mb-[20px]">
            <label
              htmlFor="firstName"
              className="capitalize text-[rgb(157,166,177)] font-[600] pb-[3px] inline-block"
            >
              First Name
            </label>

            <div className="border-[1px] border-[rgba(255,255,255,0.2)] rounded-[5px] h-[45px] bg-[rgb(32,37,43)] flex items-center max-w-[400px]">
              <div className="mx-[20px]">
                <i className="fa-solid fa-user text-[rgb(157,166,177)]"></i>
              </div>
              <input
                className="user-input w-[100%] h-[100%] bg-[rgb(32,37,43)] pl-[20px] pb-[3px] pr-[20px] mr-[2px] font-[600]"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={user.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="">
            <label
              htmlFor="lastName"
              className="text-[rgb(157,166,177)] font-[600] pb-[3px] inline-block"
            >
              Last Name
            </label>

            <div className="border-[1px] border-[rgba(255,255,255,0.2)] rounded-[5px] h-[45px] bg-[rgb(32,37,43)] flex items-center max-w-[400px]">
              <div className="mx-[20px]">
                <i className="fa-solid fa-user text-[rgb(157,166,177)]"></i>
              </div>
              <input
                className="user-input w-[100%] h-[100%] bg-[rgb(32,37,43)] pl-[20px] pb-[3px] pr-[20px] mr-[2px] font-[600] capitalize"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={user.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-[40px] max-w-[400px] gap-[5px] flex justify-center">
          <button
            className="form-btn block w-[100%] font-[600] py-[10px] mb-[20px] rounded-[8px]"
            onClick={handlePrevious}
          >
            Previous
          </button>
          <button
            className={`form-btn block w-[100%] font-[600] py-[10px] mb-[20px] rounded-[8px] ${
              isFormValid ? "" : "cursor-not-allowed opacity-50"
            }`}
            onClick={() => handleNext(user)}
            disabled={!isFormValid}
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
    </section>
  );
};

export default LegalName;
