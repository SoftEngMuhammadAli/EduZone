import React from "react";
import bannerImage from "/src/assets/images/main/home-banner-frame.png";
import { useNavigate } from "react-router-dom";

const HomeBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-[#1C1E53] text-white px-6 md:px-16 py-10">
      {/* Mobile */}
      <div className="flex flex-col items-center justify-center gap-10 text-center md:hidden min-h-[calc(100vh-80px)]">
        <h1 className="text-3xl font-bold leading-tight">
          Build and Achieve Your Dreams <br />
          with <span className="text-yellow-400">EDU-ZONE</span>
        </h1>

        <p className="text-base text-gray-200 max-w-xl mx-auto">
          EDU-ZONE is a free online learning and training platform that helps
          you achieve your goals in the tech field.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/courses/courses-list")}
            className="bg-[#FCD980] text-[#000000] font-medium py-2 px-6 rounded hover:bg-yellow-300 transition"
          >
            View Courses
          </button>

          <button
            onClick={() => navigate("/user/learning-room")}
            className="text-[#FCD980] hover:underline font-medium flex items-center gap-2 justify-center"
          >
            View Learning Path →
          </button>
        </div>
      </div>

      {/* DESKTOP / MD AND UP */}
      <div className="hidden md:flex flex-row items-center justify-between gap-10 min-h-[calc(100vh-80px)]">
        {/* Left Content */}
        <div className="w-1/2 space-y-6 text-left">
          <h1 className="text-5xl font-bold leading-tight">
            Build and Achieve Your Dreams <br />
            with <span className="text-yellow-400">EDU-ZONE</span>
          </h1>

          <p className="text-lg text-gray-200 max-w-xl">
            EDU-ZONE is a free online learning and training platform that helps
            you achieve your goals in the tech field.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/courses/courses-list")}
              className="bg-[#FCD980] text-[#000000] font-medium py-2 px-6 rounded hover:bg-yellow-300 transition"
            >
              View Courses
            </button>

            <button
              onClick={() => navigate("/user/learning-room")}
              className="text-[#FCD980] hover:underline font-medium flex items-center gap-2"
            >
              View Learning Path →
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-1/2 flex justify-center">
          <img
            src={bannerImage}
            alt="EDU-ZONE Banner"
            className="w-full max-w-lg h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
