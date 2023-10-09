import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import SectionOne from "../SectionOne/SectionOne";
import SectionTwo from "../SectionTwo/SectionTwo";
import SectionThree from "../SectionThree/SectionThree";
import SectionFour from "../SectionFour/SectionFour";
import Footer from "../Footer/Footer";

const Main = () => {
  const [activeSection, setActiveSection] = useState("SectionOne");

  const handleScroll = () => {
    const sectionTwo = document.getElementById("SectionTwo");
    const sectionThree = document.getElementById("SectionThree");
    const sectionFour = document.getElementById("SectionFour");

    const scrollY = window.scrollY;

    if (scrollY < sectionTwo.offsetTop - 50) {
      setActiveSection("SectionOne");
    } else if (scrollY < sectionThree.offsetTop - 50) {
      setActiveSection("SectionTwo");
    } else if (scrollY < sectionFour.offsetTop - 50) {
      setActiveSection("SectionThree");
    } else {
      setActiveSection("SectionFour");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <section className="bg-[rgb(3,11,21)] text-[white] h-[100%]">
      <Nav activeSection={activeSection} setActiveSection={setActiveSection} />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <Footer />
    </section>
  );
};

export default Main;
