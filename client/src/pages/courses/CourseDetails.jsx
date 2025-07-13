import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  enrollInCourse,
  clearEnrollmentStatus,
} from "../../features/course/enrollSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { AppFooter } from "../../components/footer/Footer";

const CourseDetail = () => {
  const { state: course } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { status, error, data } = useSelector((state) => state.enroll);
  const userId = user._id;

  const handleEnroll = () => {
    dispatch(enrollInCourse({ userId, courseId: course._id }));
  };

  useEffect(() => {
    if (status === "succeeded" && user?.user_type === "student") {
      navigate("/coursesuccess");
      dispatch(clearEnrollmentStatus());
    }
  }, [status, user, dispatch, navigate]);

  const alreadyEnrolledError = error?.includes("already enrolled");

  return (
    <>
      <div className="bg-gray-50 min-h-screen px-4 sm:px-8 md:px-16 py-10">
        <div className="w-full max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6 sm:p-10">
          <h1 className="text-2xl font-bold">{course.title}</h1>

          <div className="h-56 bg-gray-100 mt-4 overflow-hidden">
            {course.images?.[0] ? (
              <img
                src={`${import.meta.env.VITE_BASE_URL}/uploads/${
                  course.images[0]
                }`}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-gray-400 text-center py-20">No Image</p>
            )}
          </div>

          <p className="mt-6 text-gray-700">{course.description}</p>

          <div className="mt-10 text-center">
            <button
              onClick={handleEnroll}
              disabled={status === "loading" || alreadyEnrolledError}
              className={`px-8 py-3 rounded-md transition ${
                alreadyEnrolledError
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#1C1E53] text-white hover:bg-[#FCD980] hover:text-[#1C1E53]"
              }`}
            >
              {alreadyEnrolledError
                ? "Already Enrolled"
                : status === "loading"
                ? "Enrolling..."
                : "Join Course"}
            </button>

            {/* Error/Success Messages */}
            {error && !alreadyEnrolledError && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
            {data?.message && (
              <p className="text-green-600 text-sm mt-2">{data.message}</p>
            )}
          </div>
        </div>
      </div>

      <AppFooter />
    </>
  );
};

export default CourseDetail;
