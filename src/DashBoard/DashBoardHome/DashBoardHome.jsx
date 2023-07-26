import React, { useState } from 'react'
import DashBoardSideNav from '../DashBoardSideNav/DashBoardSideNav'
import DashBoardTopHeader from '../DashBoardTopHeader/DashBoardTopHeader';

const DashBoardRoutes = () => {
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
      </div>
      <p className="pt-[100px]"></p>
    </section>
  );
}

export default DashBoardRoutes