import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ProfileSettings = () => {
    const [userData, setUserData] = useState(null);


    useEffect(() => {
      // Fetch user data from the backend using the JWT token
      const fetchUserData = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            // Redirect to login if token not found
            return;
          }
          // Make the API request to fetch user data
          const response = await axios.get(
            "https://coinvault.onrender.com/v1/auth/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("API Response:", response.data); // Add this line
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }, []);


  return (
    <section>
      <div className="w-[90%] mx-auto my-[25px]">
        <p className="font-[poppins] font-[600] text-[rgb(165,177,189)] mb-[20px]">
          My Profile
        </p>

        <div className="border-[1px] border-[rgb(50,56,63)] rounded-[10px] bg-[rgb(32,37,43)]">
          <div className="border-b-[1px] border-[rgb(50,56,63)] w-[90%] mx-auto my-[20px]">
            <h1 className="font-[poppins] font-[600] text-[rgb(165,177,189)] mb-[5px]">
              Full Name
            </h1>

            <p className="font-[poppins] font-[500] text-[rgb(165,177,189)] mb-[5px]">
              {userData && userData.firstName} {userData && userData.lastName}
            </p>
          </div>

          <div className="border-b-[1px] border-[rgb(50,56,63)] w-[90%] mx-auto my-[20px]">
            <h1 className="font-[poppins] font-[600] text-[rgb(165,177,189)] mb-[5px]">
              Email Address
            </h1>

            <p className="font-[poppins] font-[500] text-[rgb(165,177,189)] mb-[5px]">
              {userData && userData.email}
            </p>
          </div>

          <div className="border-b-[1px] border-[rgb(50,56,63)] w-[90%] mx-auto my-[20px]">
            <h1 className="font-[poppins] font-[600] text-[rgb(165,177,189)] mb-[5px]">
              Username
            </h1>

            <p className="font-[poppins] font-[500] text-[rgb(165,177,189)] mb-[5px]">
              {userData && userData.userName}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileSettings