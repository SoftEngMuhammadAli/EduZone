import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";

import { enrollInCourse } from "../../features/course/enrollSlice";

import { AppFooter } from "../../components/footer/Footer";
import LikeFeature from "../../components/post-interactions/LikeFeature";
import CommentFeature from "../../components/post-interactions/CommentFeature";

const CourseDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { status, error, data } = useSelector((state) => state.enroll);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const alreadyEnrolledError = error
    ?.toLowerCase()
    .includes("already enrolled");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(`/api/courses/${id}`);
        setCourse(data?.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleEnroll = () => {
    if (user && id) {
      dispatch(enrollInCourse({ userId: user._id, id }));
    }
  };

  if (loading)
    return (
      <div className="py-20 text-center">
        <div className="animate-pulse text-gray-400">
          Loading course details...
        </div>
      </div>
    );

  if (!course)
    return (
      <div className="text-center text-red-600 py-20">Course not found.</div>
    );

  return (
    <>
      <div className="bg-gray-50 min-h-screen px-4 sm:px-8 md:px-16 py-10">
        <div className="w-full max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6 sm:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1C1E53]">
            {course.title}
          </h1>

          <div className="h-56 sm:h-72 bg-gray-100 mt-6 overflow-hidden rounded-lg">
            {course.image ? (
              <img
                src={`${import.meta.env.VITE_BASE_URL}/uploads/${course.image}`}
                alt={course.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <p className="text-gray-400 text-center py-20">No Image</p>
            )}
          </div>

          <p className="mt-6 text-gray-700 leading-relaxed text-base sm:text-lg">
            {course.description}
          </p>

          <div className="mt-10 text-center">
            <button
              onClick={handleEnroll}
              disabled={status === "loading" || alreadyEnrolledError}
              className={`px-8 py-3 rounded-md transition font-medium text-base sm:text-lg ${
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

            {error && !alreadyEnrolledError && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
            {data?.message && (
              <p className="text-green-600 text-sm mt-2">{data.message}</p>
            )}
          </div>

          {/* Like & Comment Section */}
          <div className="mt-12 border-t pt-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1C1E53] mb-4">
              Share Your Feedback
            </h2>

            <LikeFeature />
            <CommentFeature />
          </div>
        </div>
      </div>
      <AppFooter />
    </>
  );
};

export default CourseDetail;
