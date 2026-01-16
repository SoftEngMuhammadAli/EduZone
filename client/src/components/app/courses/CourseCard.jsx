import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course, buttonText = "See More Details" }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (!course?._id) return console.error("Course ID is missing");
    navigate(`/courses/course-details/course/${course._id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="group flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100"
    >
      {/* Course Image */}
      <div className="h-52 overflow-hidden relative bg-gray-50">
        {course.image ? (
          <img
            src={`${import.meta.env.VITE_BASE_URL}/uploads/${course.image}`}
            alt={course.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <span className="text-sm font-medium">No Image Available</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="inline-block px-3 py-1 text-[10px] font-bold text-[#1C1E53] bg-white/90 backdrop-blur-sm rounded-full shadow-sm tracking-wider uppercase">
            {course.category?.name || course.category || "Uncategorized"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-[#1C1E53] transition-colors">
            {course.title}
          </h3>

          <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">
            {course.description}
          </p>

          <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <span>⏱</span>
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🎬</span>
              <span>{course.videos || "N/A"} Videos</span>
            </div>
            <div className="flex items-center gap-1">
              <span>👨‍🎓</span>
              <span>{course.students || 0} Students</span>
            </div>
          </div>
        </div>

        {/* Button */}
        <div>
          <button className="w-full bg-gray-50 hover:bg-[#1C1E53] text-[#1C1E53] hover:text-white font-semibold py-2.5 rounded-lg transition-all duration-300 text-sm border border-gray-200 hover:border-[#1C1E53]">
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
