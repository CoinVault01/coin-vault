import React from 'react'
import DashBoardSideNav from '../DashBoardSideNav/DashBoardSideNav'
import DashBoardTopHeader from '../DashBoardTopHeader/DashBoardTopHeader';

const DashBoardRoutes = () => {
  return (
    <section className="bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <div className=''>
        <DashBoardTopHeader />
        <DashBoardSideNav />
      </div>
      <p className='pt-[100px]'></p>
    </section>
  );
}

export default DashBoardRoutes