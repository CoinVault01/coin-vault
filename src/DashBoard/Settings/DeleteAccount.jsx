import React, { useEffect, useState } from "react";
import warning from "../Settings/SettingsImage/warning.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeCircles } from "react-loader-spinner";

const DeleteAccount = ({deleteModal, setDeleteModal}) => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [isValidInput, setIsValidInput] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Fetch user data here using an API endpoint
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://coinvault.onrender.com/v1/auth/user",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData.userName) {
      setIsValidInput(inputValue.trim() === userData.userName);
    }
  }, [inputValue, userData.userName]);

  const handleDeleteAccount = async () => {
    if (isValidInput) {
      try {
        setIsDeleting(true);

        const response = await axios.delete(
          `http://localhost:8080/delete-account/${userData.userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Display success message or perform any necessary actions
        console.log(response.data.message);

        setIsDeleting(false);
        setDeleteModal(false);

        navigate("/")
      } catch (error) {
        console.error(error.response.data);
        toast.error("Failed to delete account", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setIsDeleting(false);
        // Handle error message here
      }
    }
  };

  return (
    <section
      className={`${
        deleteModal ? "block" : "hidden"
      } fixed top-0 left-0 z-[999] w-[100%] h-[100%] bg-[rgba(0,0,0,0.8)] flex justify-center items-center`}
    >
      <ToastContainer hideProgressBar autoClose={3000} />
      <div
        className={`w-[95%] h-[550px] smallerDevice:h-[460px] max-w-[500px] bg-[rgb(22,27,34)] rounded-[15px]`}
      >
        <div className="rounded-t-[15px] w-[100%] h-[10px] flex justify-between items-center p-[20px] border-b-[1px]">
          <p className="font-[600]">Delete account</p>

          <div
            className="cursor-pointer"
            onClick={() => {
              setDeleteModal(false);
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <img
          src={warning}
          alt=""
          className="block w-[30%] mx-auto smallerDevice:w-[20%]"
        />
        <div className="w-[80%] mx-auto my-[20px]">
          <p className="font-[600] text-[20px] text-center mb-[10px] smallerDevice:text-[15px]">
            Delete account?
          </p>
          <p className="font-[700] text-[13px] text-left text-[rgb(146,147,157)] mb-[20px] smallerDevice:text-[11px]">
            Deleting your account will result in the permanent loss of all data
            associated with your account, including your profile information,
            settings, and transaction history. This action cannot be undone, and
            we will not be able to recover any of your data once the account
            deletion is confirmed.
          </p>
        </div>

        <div className="w-[90%] mx-auto">
          {userData.userName && (
            <>
              <p className="mb-[5px] font-[600] select-none smallerDevice:text-[11px]">
                To confirm, type <span>"</span>
                <span>{userData.userName}</span>
                <span>"</span> in the box below{" "}
              </p>
              <div className="rounded-[10px] border-[1px] border-[rgb(248,81,73)] h-[45px]">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-[100%] rounded-[10px] h-[100%] outline-none bg-transparent pl-[20px] text-[18px]"
                  maxLength={userData.userName.length}
                />
              </div>
            </>
          )}

          <button
            className={`block rounded-[10px] border-[1px] ${
              isValidInput
                ? "border-[rgb(248,81,73)] text-[rgb(248,81,73)] bg-[rgb(33,38,45)]"
                : "cursor-not-allowed border-[rgb(248,81,73)] text-[rgb(248,81,73)] bg-[rgb(33,38,45)] opacity-[50%]"
            } w-[100%] py-[10px] mt-[20px] font-[600]`}
            disabled={!isValidInput || isDeleting}
            onClick={handleDeleteAccount}
          >
            {isDeleting ? (
              <div className="w-[30px] mx-auto">
                <ThreeCircles
                  height="25"
                  width="25"
                  color="rgb(248,81,73)"
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
              "Delete Account"
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteAccount;
