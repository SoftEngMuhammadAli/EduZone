import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourses,
  deleteCourse,
} from "../../../features/admin/courseSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/common/Loader";
import ErrorBox from "../../../components/common/ErrorBox";

const CoursesListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courses, loading, error } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      dispatch(deleteCourse({ id }));
    }
  };

  /** helpers */
  const isCreatorObject = (creator) => typeof creator === "object";

  const getCreatorName = (creator) =>
    isCreatorObject(creator) ? creator?.name || "Unknown" : "Unknown";

  const getCreatorType = (creator) =>
    isCreatorObject(creator)
      ? creator?.user_type?.toUpperCase() || "UNKNOWN"
      : "UNKNOWN";

  const getImageUrl = (course) =>
    course.imageUrl ||
    `${import.meta.env.VITE_BASE_URL}/uploads/${course.image}`;

  /** filter only current user's courses */
  const myCourses = courses?.filter((course) =>
    isCreatorObject(course.courseCreatedBy)
      ? course.courseCreatedBy?._id === user?._id
      : course.courseCreatedBy === user?._id,
  );

  if (loading) return <Loader title="Loading courses..." />;
  if (error) return <ErrorBox message={error} />;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">My Uploaded Courses</h1>

      {myCourses?.length === 0 && (
        <p className="text-gray-500">No courses found.</p>
      )}

      {/* ================= MOBILE CARDS ================= */}
      <div className="grid gap-4 md:hidden">
        {myCourses?.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-lg shadow p-4 space-y-3"
          >
            <div className="flex items-center gap-3">
              {course.image ? (
                <img
                  src={getImageUrl(course)}
                  alt={course.title}
                  className="w-14 h-14 rounded object-cover"
                />
              ) : (
                <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
                  No Image
                </div>
              )}

              <div>
                <h2 className="font-semibold">{course.title}</h2>
                <p className="text-sm text-gray-500">
                  {course.category || "Uncategorized"}
                </p>
              </div>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Level:</strong> {course.level}
              </p>
              <p>
                <strong>Duration:</strong> {course.duration}
              </p>
              <p>
                <strong>Created By:</strong>{" "}
                {getCreatorName(course.courseCreatedBy)}
              </p>
              <p>
                <strong>Role:</strong> {getCreatorType(course.courseCreatedBy)}
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() =>
                  navigate(
                    `/admin/courses-management/update-course/${course._id}`,
                  )
                }
                className="flex-1 bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(course._id)}
                className="flex-1 bg-red-600 text-white py-1.5 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block">
        <table className="min-w-full bg-white shadow rounded overflow-hidden text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Level</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Created By</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {myCourses?.map((course) => (
              <tr key={course._id} className="border-t">
                <td className="p-3">
                  {course.image ? (
                    <img
                      src={getImageUrl(course)}
                      alt={course.title}
                      className="w-10 h-10 rounded object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </td>

                <td className="p-3">{course.title}</td>
                <td className="p-3">{course.category || "Uncategorized"}</td>
                <td className="p-3">{course.level}</td>
                <td className="p-3">{course.duration}</td>
                <td className="p-3">
                  {getCreatorName(course.courseCreatedBy)}
                </td>
                <td className="p-3 font-semibold">
                  {getCreatorType(course.courseCreatedBy)}
                </td>

                <td className="p-3 space-x-2">
                  <button
                    onClick={() =>
                      navigate(
                        `/admin/courses-management/update-course/${course._id}`,
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
      </div>
    </div>
  );
};

export default CoursesListPage;
