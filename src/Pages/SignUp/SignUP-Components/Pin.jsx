import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import PinInput from "react-pin-input";

const Pin = ({ handleChange, handleNext, handlePrevious, user }) => {
  const savedfirstName = sessionStorage.getItem("firstName");
  const [pinValue, setPinValue] = useState("");
  const [confirmPinValue, setConfirmPinValue] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (pinValue === "" && confirmPinValue === "") {
      setButtonDisabled(true);
    } else if (pinValue !== confirmPinValue) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [pinValue, confirmPinValue]);
  

  return (
    <section className="ml-[20px]">
      <div>
        <div className="mb-[30px]">
          <h1 className="text-[25px] font-[600] font-[poppins] capitalize">
            Thank you {savedfirstName} 🚀
          </h1>
          <p className="pb-[5px] text-[25px] font-[600] font-[poppins] capitalize smallerDevice:text-[25px]">
            Create your transaction pin
          </p>
          <p className="text-[rgb(157,166,177)] font-[600] pr-[50px] smallerDevice:pr-[0]">
            Your pin would be used to authenticate your request for transactions
            and authentications.
          </p>
        </div>

        <div>
          <div className="mb-[20px]">
            <label
              htmlFor="password"
              className="capitalize text-[rgb(157,166,177)] font-[600] pb-[10px] pl-[15px] inline-block"
            >
              Create Pin
            </label>

            <PinInput
              length={4}
              initialValue={user.pin}
              secret
              secretDelay={100}
              onChange={(value) => {
                handleChange({ target: { name: "pin", value } });
                setPinValue(value);
                if (value === confirmPinValue) {
                  setButtonDisabled(false);
                } else {
                  setButtonDisabled(true);
                }
              }}
              inputMode="number"
              style={{ padding: "10px" }}
              inputStyle={{
                borderColor: "rgba(255,255,255,0.5)",
                borderTopRightRadius: "5px",
                borderTopLeftRadius: "5px",
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius: "5px",
                background: "transparent",
                marginRight: "10px",
              }}
              inputFocusStyle={{ borderColor: "rgba(255,255,255,0.5)" }}
              autoSelect={true}
              regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
            />
          </div>

          <div className="mb-[20px]">
            <label
              htmlFor="password"
              className="capitalize text-[rgb(157,166,177)] font-[600] pb-[10px] pl-[15px] inline-block"
            >
              Confirm Pin
            </label>

            <PinInput
              length={4}
              initialValue=""
              secret
              secretDelay={100}
              onChange={(value) => {
                setConfirmPinValue(value);
                if (value === pinValue) {
                  setButtonDisabled(false);
                } else {
                  setButtonDisabled(true);
                }
              }}
              inputMode="number"
              style={{ padding: "10px" }}
              inputStyle={{
                borderColor: "rgba(255,255,255,0.5)",
                borderTopRightRadius: "5px",
                borderTopLeftRadius: "5px",
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius: "5px",
                background: "transparent",
                marginRight: "10px",
              }}
              inputFocusStyle={{ borderColor: "rgba(255,255,255,0.5)" }}
              autoSelect={true}
              regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
            />
          </div>
        </div>

        <div className="mt-[40px] max-w-[400px] gap-[5px] flex justify-center">
          <button
            className="form-btn block w-[100%] font-[600] py-[10px] mb-[20px] rounded-[8px]"
            onClick={() => {
              handlePrevious();
            }}
          >
            Previous
          </button>

          <button
            className="form-btn block w-[100%] font-[600] py-[10px] mb-[20px] rounded-[8px]"
            disabled={isButtonDisabled}
            style={{ opacity: isButtonDisabled ? 0.5 : 1, cursor: isButtonDisabled ? "not-allowed" : "pointer" }}
            onClick={() => {
              handleNext();
            }}
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

export default Pin
