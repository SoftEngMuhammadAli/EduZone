import React from "react";

const AdminCoursesGrid = ({ courses = [] }) => {
  return (
    <>
      <div className="flex flex-row justify-between items-center mt-8 mb-4">
        <h2 className="text-xl font-semibold">Courses Overview</h2>
        <p
          className="text-blue-600 hover:text-blue-800 cursor-pointer"
          onClick={() => {
            alert("See all courses coming soon!");
          }}
        >
          See All
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} className="bg-white p-4 rounded-xl shadow-md">
              <div className="w-full h-40 bg-gray-200 rounded mb-3 overflow-hidden flex items-center justify-center">
                {course.image ? (
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                      course.image
                    }`}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-500">No Image</span>
                )}
              </div>
              <h3 className="text-base font-semibold truncate mb-1">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {course.description}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No courses available.
          </p>
        )}
      </div>
    </>
  );
};

export default AdminCoursesGrid;
