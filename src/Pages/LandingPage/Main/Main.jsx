import React from 'react'
import Nav from '../Nav/Nav'
import SectionOne from '../SectionOne/SectionOne';
import SectionTwo from '../SectionTwo/SectionTwo';
import SectionThree from '../SectionThree/SectionThree';

const Main = () => {
  return (
    <section className="bg-[rgb(3,11,21)] text-[white] h-[100%]">
      <Nav />
      <SectionOne />
      <SectionTwo/>
      <SectionThree/>
    </section>
  );
}

export default Main