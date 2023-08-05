import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout/DashboardLayout";

const Transactions = () => {
  return (
    <section className="bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <div>
        <DashboardLayout />
        <div className="pt-[100px] largeDevice:ml-[230px]">Transactions</div>
      </div>
    </section>
  );
};

export default Transactions;