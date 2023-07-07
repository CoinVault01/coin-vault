import React from 'react'
import { Link } from "react-router-dom";
import lost from "./PageNotFound-Image/lost.webp"

const PageNotFound = () => {
  return (
    <section className="formAnim bg-[rgb(28,33,39)] text-[white] min-h-[100vh]">
      <h1 className="text-center pt-[150px] smallerDevice:pt-[100px] text-[60px] font-[600]">
        404
      </h1>

      <div className='flex items-center justify-center'>
        <p className="text-center text-[20px] smallerDevice:text-[15px] font-[600] pb-[20px] pt-[20px]">
          <span className='text-[30px]'>O</span>ooops...I think you're lost{" "}
        </p>
        <img src={lost} alt="" className='w-[100%] max-w-[100px] smallerDevice:max-w-[60px]'/>
      </div>

      <Link to="/" className='block text-center capitalize hover:underline w-[150px] mx-auto text-[skyblue]'>Back to home</Link>
    </section>
  );
}

export default PageNotFound