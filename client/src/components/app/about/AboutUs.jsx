import React from "react";
import aboutUsImage from "../../../assets/images/main/about-us-image.png";
import ContactUs from "../contact/ContactUs";
import { useLocation } from "react-router-dom";

const AboutUs = () => {
  const location = useLocation();

  const aboutData = {
    heading: "Why Choose EduZone",
    subheading: "Empowering Learners Across the Globe",
    description:
      "EduZone provides a platform for quality learning with industry-standard content, expert mentors, and hands-on projects. We are committed to delivering knowledge that drives success, fostering growth for students of all levels.",
  };

  return (
    <section className="relative bg-white min-h-screen">
      <div className="md:hidden absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-20"
          src={aboutUsImage}
          alt="Students learning online with EduZone"
        />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 text-center md:text-left items-center min-h-screen max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-10">
        <div className="flex flex-col gap-6 items-center md:items-start">
          <span className="text-[#232536] font-medium text-lg">
            {aboutData.heading}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
            {aboutData.subheading}
          </h1>
          <p className="text-[#282938] text-base md:text-lg leading-relaxed">
            {aboutData.description}
          </p>
          <button className="bg-[#2405F2] text-white py-3 px-6 rounded-md w-fit hover:bg-[#1a04c4] transition-colors mt-2 md:mt-4">
            Learn More
          </button>
        </div>

        <div className="hidden md:block h-full w-full">
          <img
            className="w-full h-full object-cover"
            src={aboutUsImage}
            alt="Students learning online with EduZone"
          />
        </div>
      </div>

      {location.pathname !== "/" && location.pathname !== "/home" && (
        <>
          <ContactUs />
        </>
      )}
    </section>
  );
};

export default AboutUs;
