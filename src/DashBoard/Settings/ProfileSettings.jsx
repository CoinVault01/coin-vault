import axios from "axios";
import React, { useEffect, useState } from "react";
import { LongCard } from "../../Skeleton/Skeleton";
import UpdateName from "./UpdateName";
import useUserCryptoData from "../../Data/useUserCryptoData";

const ProfileSettings = () => {
  const {userData, loading} = useUserCryptoData();
  const [updateNameModal, setUpdateNameModal] = useState(false);

  const handleUpdateNameModal = () => {
    setUpdateNameModal(true);
  };

  return (
    <section>
      {loading ? (
        <div className="w-[90%] mx-auto my-[25px]">
          <LongCard />
        </div>
      ) : (
        <div className="w-[90%] mx-auto my-[25px]">
          <p className="font-[poppins] font-[600] text-[rgb(165,177,189)] mb-[20px]">
            My Profile
          </p>

          <div className="border-[1px] border-[rgb(50,56,63)] rounded-[10px] bg-[rgb(32,37,43)]">
            <div className="border-b-[1px] border-[rgb(50,56,63)] w-[90%] mx-auto my-[20px] flex justify-between items-center">
              <div>
                <h1 className="font-[poppins] font-[600] text-[rgb(165,177,189)] mb-[5px]">
                  Full Name
                </h1>

                <p className="font-[poppins] font-[500] text-[rgb(165,177,189)] mb-[5px]">
                  {userData && userData.firstName}{" "}
                  {userData && userData.lastName}
                </p>
              </div>

              <div
                className="text-[rgb(23,206,55)] cursor-pointer"
                onClick={handleUpdateNameModal}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </div>
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
      )}

      <div>
        <UpdateName
          updateNameModal={updateNameModal}
          setUpdateNameModal={setUpdateNameModal}
        />
      </div>
    </section>
  );
};

export default ProfileSettings;
