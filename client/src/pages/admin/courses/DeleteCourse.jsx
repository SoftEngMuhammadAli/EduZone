import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourse,
  fetchCourses,
} from "../../../features/admin/courseSlice";

const DeleteCoursePage = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      dispatch(deleteCourse({ id }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Delete Courses</h1>

      {loading && <p>Loading courses...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <table className="w-full bg-white shadow-md rounded text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-4 font-medium">Course Image</th>
            <th className="p-4 font-medium">Course Title</th>
            <th className="p-4 font-medium text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0
            ? courses.map((course) => (
                <tr key={course._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    {course.image ? (
                      <img
                        src={
                          course.imageUrl ||
                          `${import.meta.env.VITE_BASE_URL}/uploads/${
                            course.image
                          }`
                        }
                        alt={course.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="p-4">{course.title}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : !loading && (
                <tr>
                  <td colSpan="2" className="text-center py-6 text-gray-500">
                    No courses available.
                  </td>
                </tr>
              )}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteCoursePage;
