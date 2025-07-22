import React from "react";

const CoursesFeedBack = () => {
  return (
    <section className="bg-[#EEF4FA] py-12 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            What They Say About
          </h2>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            EDUZONE Courses
          </h3>
          <p className="text-sm text-gray-500">
            EDUZONE has been trusted by more than 10,000 students
          </p>
        </div>

        {/* Right Section */}
        <div className="relative">
          <p className="text-lg text-gray-800 font-medium leading-relaxed mb-6">
            "The material presented is easy to understand, the quality of the
            instructor is very good and the response is fast. So, I highly
            recommend this course!!"
          </p>

          {/* User Info */}
          <div className="flex items-center gap-3">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Jenny Wilson"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h4 className="text-sm font-semibold text-gray-800">
                Jenny Wilson
              </h4>
              <p className="text-xs text-gray-500">Vice President</p>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex gap-2 mt-6 absolute bottom-0 right-0 md:static">
            <span className="w-2 h-2 rounded-full bg-purple-300"></span>
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span className="w-2 h-2 rounded-full bg-purple-600"></span>
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            <span className="w-2 h-2 rounded-full bg-purple-300"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesFeedBack;
