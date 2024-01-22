import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";

const UpdateName = ({ updateNameModal, setUpdateNameModal, userData }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateName = async () => {
    if (!firstName || !lastName) {
      toast.error("First name and last name are required", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.put(
        `https://coinvault.onrender.com/users/name-change/${userData.userId}`, // Update this with your API endpoint
        {
          firstName: firstName,
          lastName: lastName,
        }
      );

      if (response.status === 200) {
        toast.success("Name updated successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error("Failed to update name", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Error updating name", {
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
      setIsLoading(false);
      setUpdateNameModal(false);
    }
  };

  return (
    <section
      className={`${
        updateNameModal ? "block" : "hidden"
      } fixed top-0 left-0 z-[999] w-[100%] h-[100%] bg-[rgba(0,0,0,0.8)] flex justify-center items-center`}
    >
      <ToastContainer hideProgressBar autoClose={3000} />
      <div
        className={`border-[1px] bg-[rgb(32,37,43)] border-[rgb(50,56,63)] w-[90%] max-w-[450px] mx-auto h-[350px] my-[20px] rounded-[8px] fixed top-[80px]`}
      >
        <div className="logout-bg-color w-[100%] h-[15px] rounded-t-[6px]"></div>
        <div className="bg-[rgb(28,33,39)] flex justify-between items-center py-[10px] px-[10px]">
          <h1 className="roboto text-[18px]">Change Name</h1>

          <div
            className="cursor-pointer text-[rgb(133,209,240)]"
            onClick={() => {
              setUpdateNameModal(false);
            }}
          >
            <i className="fa-solid fa-x"></i>
          </div>
        </div>
        <div className="w-[90%] mx-auto mt-[30px]">
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            className="form-btn block w-[100%] font-[600] py-[10px] mb-[20px] rounded-[8px] max-w-[400px] mt-[20px]"
            onClick={handleUpdateName}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-[30px] mx-auto">
                <ThreeCircles
                  height="25"
                  width="25"
                  color="rgb(160,210,254)"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="three-circles-rotating"
                  outerCircleColor=""
                  innerCircleColor=""
                  middleCircleColor=""
                />
              </div>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
export default UpdateName;
