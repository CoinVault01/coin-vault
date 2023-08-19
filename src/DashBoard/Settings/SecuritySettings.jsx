import axios from "axios";
import React, { useState } from "react";
import DeleteAccount from "./DeleteAccount";

const SecuritySettings = () => {
  const [deleteModal, setDeleteModal] = useState(false)
  

  const handleCloseDeleteModal = () => {
    setDeleteModal(true)
  }
  
  return (
    <section>
      <div className="w-[90%] mx-auto my-[25px]">
        <p className="font-[poppins] font-[600] text-[rgb(165,177,189)] mb-[20px]">
          Security
        </p>

        <div className="border-[1px] border-[rgb(50,56,63)] rounded-[10px] bg-[rgb(32,37,43)]">
          <div className="border-b-[1px] border-[rgb(50,56,63)] w-[90%] mx-auto my-[20px] flex justify-between items-center">
            <h1 className="font-[poppins] font-[600] text-[rgb(165,177,189)]">
              Email Verification
            </h1>

            <div className="mb-[5px]">
              <button className="bg-[rgb(23,206,55)] py-[5px] px-[10px] rounded-[5px]">
                Verified
              </button>
            </div>
          </div>

          <div className="border-b-[1px] border-[rgb(50,56,63)] w-[90%] mx-auto my-[20px] flex justify-between items-center">
            <h1 className="font-[poppins] font-[600] text-[rgb(165,177,189)]">
              Delete Account
            </h1>

            <div className="mb-[5px]">
              <button
                className="bg-[rgb(248,81,73)] py-[5px] px-[10px] rounded-[5px]"
                onClick={handleCloseDeleteModal}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <DeleteAccount
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
        />
      </div>
    </section>
  );
};

export default SecuritySettings;
