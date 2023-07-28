// DashBoardRoutes.jsx
import React, { useContext, useState } from "react";
import DashBoardSideNav from "../DashBoardSideNav/DashBoardSideNav";
import DashBoardTopHeader from "../DashBoardTopHeader/DashBoardTopHeader";

const DashBoardRoutes = () => {
  const savedfirstName = localStorage.getItem("firstName");
  const savedlastName = localStorage.getItem("lastName");
  const [showNav, setShowNav] = useState(false);

  // Function to toggle the showNav state
  const toggleNav = () => {
    setShowNav((prevShowNav) => !prevShowNav);
  };

  return (
    <section className="bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <div className="">
        <DashBoardTopHeader showNav={showNav} toggleNav={toggleNav} />
        <DashBoardSideNav showNav={showNav} />
          <p className="pt-[100px]">
            Welcome, {savedfirstName} {savedlastName}
          </p>
        </div>
    </section>
  );
};

export default DashBoardRoutes;
