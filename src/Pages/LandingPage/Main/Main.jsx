import React from 'react'
import Nav from '../Nav/Nav'
import SectionOne from '../SectionOne/SectionOne';
import SectionTwo from '../SectionTwo/SectionTwo';

const Main = () => {
  return (
    <section className="bg-[rgb(3,11,21)] text-[white] h-[100%]">
      <Nav />
      <SectionOne />
      <SectionTwo/>
    </section>
  );
}

export default Main