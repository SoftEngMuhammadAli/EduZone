import React from "react";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../hooks/useCustomHooks";

const CourseRecommendations = () => {
  const navigate = useNavigate();
  const { data: courses, loading, error } = useFetchData("/api/courses/");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#1C1E53] text-lg font-semibold">
        Loading courses...
      </div>
    );
  }

  if (error || !courses?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg font-semibold">
        {error || "No courses available."}
      </div>
    );
  }

  return (
    <section className="px-4 sm:px-8 md:px-16 py-10 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
          Recommended Courses For You
        </h2>

        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <select className="py-2 px-4 border border-gray-300 rounded-md bg-white text-gray-700 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-[#FCD980] transition">
            <option value="">All Categories</option>
            <option value="programming">Programming</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="business">Business</option>
            <option value="data-science">Data Science</option>
            <option value="language">Languages</option>
            <option value="photography">Photography</option>
          </select>

          <button
            onClick={() => navigate("/SeeAllCourses")}
            className="bg-[#FCD980] hover:bg-[#F4C44F] text-gray-800 font-medium py-2 px-6 rounded-md transition-colors whitespace-nowrap"
          >
            See All Courses
          </button>
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {courses.slice(0, 3).map((course) => (
          <div
            key={course._id}
            className="flex flex-col h-full min-h-[500px] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            {/* Course Image */}
            <div className="h-48 sm:h-56 md:h-64 overflow-hidden flex items-center justify-center bg-gray-100">
              {course.images?.length > 0 ? (
                <img
                  src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                    course.images[0]
                  }`}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">No Image Found</span>
              )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-[#2405F2] bg-[#2405F2]/10 rounded-full mb-2">
                {course.category?.name || "Uncategorized"}
              </span>
              <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center">⏱ {course.duration}</span>
                <span className="flex items-center">
                  🎬 {course.videos || "N/A"} Videos
                </span>
                <span className="flex items-center">
                  👨‍🎓 {course.students} Students
                </span>
              </div>

              <div className="mt-auto">
                <button className="w-full bg-[#2405F2] hover:bg-[#1a04c4] text-white py-2 rounded-md transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseRecommendations;
