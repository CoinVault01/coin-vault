import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import CardDesign from "./CardDesign";
import axios from "axios";

const Cards = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if userData is already in the cache
        const cachedUserData = JSON.parse(sessionStorage.getItem("userData"));

        if (cachedUserData) {
          setUserData(cachedUserData);
          return;
        }

        const response = await axios.get(
          "https://coinvault.onrender.com/v1/auth/user",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        setUserData(response.data);

        // Cache the fetched userData
        sessionStorage.setItem("userData", JSON.stringify(response.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <section className="bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <div>
        <DashboardLayout />
        <div className="pt-[100px] largeDevice:ml-[230px]">
          <CardDesign userData={userData} />
        </div>
      </div>
    </section>
  );
};

export default Cards;
