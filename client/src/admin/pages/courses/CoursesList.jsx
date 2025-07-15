import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourses,
  deleteCourse,
} from "../../../features/admin/courseSlice";
import { useNavigate } from "react-router-dom";

const CoursesListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">All Courses</h1>

      {loading && <p>Loading courses...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && courses?.length === 0 && (
        <p className="text-gray-500">No courses found.</p>
      )}

      {!loading && courses?.length > 0 && (
        <table className="min-w-full bg-white shadow rounded overflow-hidden text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Level</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Created By</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id} className="border-t">
                <td className="p-3">
                  {course.images?.[0] ? (
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                        course.image[0]
                      }`}
                      alt={course.title}
                      className="w-10 h-10 rounded object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </td>
                <td className="p-3">{course.title}</td>
                <td className="p-3">
                  {course.category?.name || "Uncategorized"}
                </td>
                <td className="p-3">{course.level}</td>
                <td className="p-3">{course.duration}</td>
                <td className="p-3 text-sm text-gray-700">
                  {course.courseCreatedBy?.name || "Unknown"}
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() =>
                      navigate(
                        `/admin/courses-management/update-course/${course._id}`
                      )
                    }
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CoursesListPage;
