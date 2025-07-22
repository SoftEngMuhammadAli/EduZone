import React from "react";
import { useNavigate } from "react-router-dom";
import successImg from "../../../assets/images/courses/course_success_image.png";

const CourseSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#f4f6fc] px-4">
      <div className="bg-white shadow-sm rounded-2xl p-6 md:p-12  w-full flex flex-col md:flex-row items-center gap-8">
        {/* Left side: Image / Animation */}
        <div className="w-full md:w-1/2">
          <img
            src={successImg}
            alt="Success Illustration"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Right side: Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <div className="flex justify-center md:justify-start mb-4"></div>

          <h1 className="text-3xl sm:text-center md:text-left md:text-4xl font-bold text-[#2D2F6B] mb-4">
            Yayy!!! Enrollment Successful!
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            You have successfully enrolled in the course. Start learning and
            boost your skills today!
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button
              onClick={() => navigate("/courses/courses-list")}
              className="bg-[#2D2F6B] text-white px-6 py-3 rounded-md hover:bg-[#1c1d4f] transition"
            >
              Explore More
            </button>

            <button className="bg-[#2D2F6B] text-white px-6 py-3 rounded-md hover:bg-[#1c1d4f] transition">
              Learning Room
            </button>
            <button
              onClick={() => navigate("/")}
              className="border border-[#2D2F6B] text-[#2D2F6B] px-6 py-3 rounded-md hover:bg-[#2D2F6B] hover:text-white transition"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSuccess;
