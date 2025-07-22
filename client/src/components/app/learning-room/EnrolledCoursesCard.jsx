import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnrolledCourses } from "../../../features/course/enrollSlice";
import { useNavigate } from "react-router-dom";

const EnrolledCoursesCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { status, courses = [], error } = useSelector((state) => state.enroll);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchEnrolledCourses(user._id));
    }
  }, [dispatch, user]);
  return (
    <>
      {/* Enrolled Courses */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Your Enrolled Courses
        </h2>

        {status === "loading" && (
          <p className="text-gray-500 text-center">
            Loading enrolled courses...
          </p>
        )}
        {status === "failed" && (
          <p className="text-red-500 text-center">{error}</p>
        )}
        {status === "succeeded" && courses.length === 0 && (
          <p className="text-gray-500 text-center">
            You haven’t enrolled in any courses yet.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((enroll) => {
            const course = enroll.courseId;
            return (
              <div
                key={enroll._id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
              >
                {/* Course Image */}
                <div className="h-40 bg-gray-100">
                  {course?.images?.[0] ? (
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                        course.images[0]
                      }`}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Course Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#1C1E53]">
                    {course?.title || "Untitled Course"}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {course?.description || "No description provided."}
                  </p>
                  {/* Meta Info */}
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {course?.level && (
                      <span className="px-2 py-1 text-xs bg-gray-200 rounded-full">
                        {course.level}
                      </span>
                    )}
                    {course?.duration && (
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                        {course.duration}
                      </span>
                    )}
                  </div>
                  {/* Progress */}
                  <div className="mt-4">
                    <div className="text-sm text-gray-600 mb-1">
                      Progress: {enroll.progress}%
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${enroll.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  {/* Actions */}
                  {/* onClick=
                  {() =>
                    navigate(`/learning/course/${enroll.courseId?._id}`, {
                      state: { course: enroll.courseId },
                    })
                  } */}
                  <button
                    onClick={() =>
                      navigate("/user/continue-learning", {
                        state: { course: enroll.courseId },
                      })
                    }
                    className="mt-3 px-4 py-2 bg-[#1C1E53] text-white rounded hover:bg-[#FCD980] hover:text-[#1C1E53]"
                  >
                    Continue Learning
                  </button>

                  {/* Enrolled Info */}
                  <p className="text-xs text-gray-400 text-right mt-2">
                    Enrolled on:{" "}
                    {new Date(enroll.enrollmentDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default EnrolledCoursesCard;
