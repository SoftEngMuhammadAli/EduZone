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
    <section className="mt-10 px-4 md:px-8 lg:px-12">
      <h2 className="text-3xl font-bold text-[#1C1E53] mb-6 text-center md:text-left">
        Your Enrolled Courses
      </h2>

      {status === "loading" && (
        <p className="text-gray-500 text-center">Loading enrolled courses...</p>
      )}
      {status === "failed" && (
        <p className="text-red-500 text-center">
          Unable to find enrolled courses, maybe you haven't enrolled in any
          courses yet. || Status Failed!
        </p>
      )}
      {status === "succeeded" && courses.length === 0 && (
        <p className="text-gray-500 text-center">
          You haven’t enrolled in any courses yet.
        </p>
      )}

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((enroll) => {
          const course = enroll.courseId;
          return (
            <div
              key={enroll._id}
              className="flex flex-col bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-200"
            >
              {/* Course Image */}
              <div className="h-44 bg-gray-100">
                {course?.images?.[0] ? (
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                      course.images[0]
                    }`}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                    No Image Available
                  </div>
                )}
              </div>

              {/* Course Info */}
              <div className="flex flex-col justify-between flex-1 p-5">
                <div>
                  <h3 className="text-lg font-semibold text-[#1C1E53]">
                    {course?.title || "Untitled Course"}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {course?.description || "No description available."}
                  </p>

                  <div className="flex gap-2 mt-3 flex-wrap text-xs">
                    {course?.level && (
                      <span className="px-2 py-1 bg-gray-200 rounded-full">
                        {course.level}
                      </span>
                    )}
                    {course?.duration && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
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
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${enroll.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6">
                  <button
                    onClick={() =>
                      navigate("/user/continue-learning", {
                        state: { course: course },
                      })
                    }
                    className="w-full px-4 py-2 text-sm font-medium bg-[#1C1E53] text-white rounded hover:bg-[#FCD980] hover:text-[#1C1E53] transition"
                  >
                    Continue Learning
                  </button>
                  <p className="text-xs text-gray-400 text-right mt-2">
                    Enrolled on:{" "}
                    {new Date(enroll.enrollmentDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EnrolledCoursesCard;
