import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import HomeComponent from "./HomeComponent";

const DashboardHome = () => {
  
  

  return (
    <section className="bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <div>
        <DashboardLayout />
        <div className="pt-[100px] largeDevice:ml-[230px]">
          <HomeComponent/>
        </div>
      </div>
    </section>
  );
};

export default DashboardHome;
