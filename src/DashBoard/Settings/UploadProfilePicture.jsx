import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import DefaultImage from "../Settings/SettingsImage/default.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeCircles } from "react-loader-spinner";

const UploadProfilePicture = ({ userId, imageModal, setImageModal }) => {
  const [userData, setUserData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
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
        console.log("Response data:", response.data);
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image", {
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

    const formData = new FormData();
    formData.append("profileImage", selectedFile);
    formData.append("userId", userId);

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://coinvault.onrender.com/upload-profile-image",
        formData
      );
      setUserData((prevUserData) => ({
        ...prevUserData,
        profileImage: response.data.profileImage,
      }));
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
      
      // Delay the reload after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
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
      setIsLoading(false);
    }
  };

  const handleDeleteProfileImage = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `https://coinvault.onrender.com/delete-profile-image/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update the user data and selectedFile state after successful deletion
      setUserData((prevUserData) => ({
        ...prevUserData,
        profileImage: null,
      }));
      setSelectedFile(null);

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

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete profile image", {
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
    }
  };


  const openFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <section
      className={`${
        imageModal ? "block" : "hidden"
      } border-[1px] bg-[rgb(32,37,43)] border-[rgb(50,56,63)] w-[90%] max-w-[500px] mx-auto h-[350px] my-[20px] rounded-[8px] fixed top-[80px]`}
    >
      <ToastContainer hideProgressBar autoClose={3000} />
      <div className="flex justify-end m-[10px]">
        <div
          className="cursor-pointer max-w-[25px]"
          onClick={() => {
            setImageModal(false);
          }}
        >
          <i className="fa-solid fa-xmark text-[25px]"></i>
        </div>
      </div>

      <div className="pt-[20px] pb-[20px]">
        <div className="flex items-center justify-center rounded-full bg-[#ffffffe5] max-w-[130px] mx-auto relative cursor-pointer">
          <div className="w-[100%]">
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt=""
                className="profile-image block w-[100%] h-[130px] rounded-full object-cover"
              />
            ) : (
              <img
                src={userData.profileImage || DefaultImage}
                alt=""
                className="profile-image block w-[100%] h-[130px] rounded-full object-cover"
              />
            )}
          </div>

          <div
            className="absolute top-[85px] right-[0] rounded-full bg-[rgb(38,57,81)] px-[9px] py-[5px] select-none"
            onClick={handleDeleteProfileImage}
          >
            <i className="fa-solid fa-trash text-[red] select-none"></i>
          </div>
        </div>
      </div>

      <div className="w-[90%] mx-auto text-center bg-[rgb(38,57,81)] text-[rgb(45,136,255)] rounded-[8px] py-[5px] mb-[20px]">
        <label
          htmlFor="fileInput"
          className="flex items-center justify-center gap-[10px] cursor-pointer w-[100%]"
          onClick={openFileInput}
        >
          <i className="fa-solid fa-plus"></i>
          <p>Upload Photo</p>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
      </div>

      <div className="w-[90%] mx-auto text-center bg-[rgb(38,57,81)] text-[rgb(45,136,255)] rounded-[8px] py-[5px] mb-[10px] cursor-pointer">
        <button
          onClick={handleUpload}
          className="block w-[100%]"
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
            "Save"
          )}
        </button>
      </div>
    </section>
  );
};

export default UploadProfilePicture;
