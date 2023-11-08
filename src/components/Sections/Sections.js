import React from "react";
import HeroSection from "./HeroSection";
import WhyChooseUsSection from "./WhyChooseUsSection";
import Slider from "../Slider";
import AboutUsSection from "../Sections/AboutUsSection";
import GetMobileSection from "../Sections/GetMobileSection";

const Sections = () => {
  //Rendering every of the section components
  return (
    <main>
      <HeroSection />
      <Slider />
      <WhyChooseUsSection />
      <AboutUsSection />
      <GetMobileSection />
    </main>
  );
  //END
};

export default Sections;
