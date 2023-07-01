import React from "react";
import "../SectionOne/SectionOne.css"
import BackGround from "./SectionOne-Image/Background.jpg";
import Ellipse from "./SectionOne-Image/elipse.png";
import fire from "./SectionOne-Image/fire.png";

const SectionOne = () => {
  return (
    <section
      className="h-[680px] smallerDevice:h-[500px] select-none"
      style={{
        backgroundImage: `url(${BackGround})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "opacity(0.9)",
      }}
    >
      <div className="relative transition-all duration-[1s] ease-in-out select-none">
        <img
          src={fire}
          alt=""
          className="w-[50px] block absolute top-[150px] right-[50%]"
        />
        <img
          src={Ellipse}
          alt=""
          className="ellipse smallDevice:w-[100px] smallerDevice:w-[100px] block absolute largeDevice:top-[150px] smallDevice:top-[30px]"
        />
        <img
          src={Ellipse}
          alt=""
          className="w-[60px] absolute top-[180px] right-[20vw] smallDevice:right-[10vw] block"
        />
        <img
          src={Ellipse}
          alt=""
          className="ellipse2 smallDevice:w-[100px] smallerDevice:w-[100px] block absolute smallerDevice:top-[350px] top-[400px] right-[50px]"
        />
      </div>

      <div className="relative top-[35%] smallerDevice:top-[20%] smallDevice:top-[35%]  max-w-[900px] smallDevice:max-w-[650px] mx-auto smallerDevice:px-[5px]">
        <h1 className="sectionOne-Header capitalize text-center text-[35px] largeDevice:text-[45px] smallDevice:text-[2rem]  smallerDevice:text-[30px]">
          Simulate Virtually everything you can do with a genuine{" "}
          <span className="text-[rgb(0,196,244)] font-[poppins]">
            cryptocurreny
          </span>{" "}
          wallet 🔥
        </h1>
      </div>

      <div className="relative  mt-[20px] top-[40%] smallerDevice:top-[20%] smallDevice:top-[40%] flex justify-center">
        <div className="relative w-[80%] max-w-[300px]">
          <button className="hero-btn rounded-full border-[2px] border-[rgb(0,180,224)] py-[5px] px-[20px]  w-[100%] text-[30px] capitalize">
            Get started
          </button>
        </div>
      </div>
    </section>
  );
};

export default SectionOne;
