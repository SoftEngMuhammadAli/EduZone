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
      className="flex flex-col h-full bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
    >
      {/* Course Image */}
      <div className="h-48 sm:h-56 md:h-64 overflow-hidden flex items-center justify-center bg-gray-100">
        {course.image ? (
          <img
            src={`${import.meta.env.VITE_BASE_URL}/uploads/${course.image}`}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-[#2405F2] bg-[#2405F2]/10 rounded-full mb-2">
          {course.category?.name || course.category || "Uncategorized"}
        </span>

        <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-1">
          {course.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>

        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
          <span>⏱ {course.duration}</span>
          <span>🎬 {course.videos || "N/A"} Videos</span>
          <span>👨‍🎓 {course.students || 0} Students</span>
        </div>

        <button className="w-full bg-[#2405F2] hover:bg-[#1a04c4] text-white py-2 rounded-md transition">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
