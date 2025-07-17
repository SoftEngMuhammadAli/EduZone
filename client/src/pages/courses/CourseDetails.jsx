import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";

import {
  enrollInCourse,
  clearEnrollmentStatus,
} from "../../features/course/enrollSlice";

import {
  toggleLike,
  getLikesByCourse,
} from "../../features/post-interactions/likesSlice";

import {
  createComment,
  getComments,
} from "../../features/post-interactions/commentSlice";

import { AppFooter } from "../../components/footer/Footer";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { status, error, data } = useSelector((state) => state.enroll);
  const { likes, status: likeStatus } = useSelector((state) => state.likes);
  const { comments } = useSelector((state) => state.comment);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  const alreadyEnrolledError = error
    ?.toLowerCase()
    .includes("already enrolled");
  const userLiked = likes?.some((l) => l.user?._id === user?._id);

  useEffect(() => {
    if (!courseId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Get course data
        const { data } = await axiosInstance.get(`/api/courses/${courseId}`);
        setCourse(data?.data);

        // 2. Parallel load likes and comments
        await Promise.all([
          dispatch(getLikesByCourse(courseId)).unwrap(),
          dispatch(getComments(courseId)).unwrap(),
        ]);
      } catch (err) {
        console.error("Error fetching course or interactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, dispatch]);

  const handleEnroll = () => {
    dispatch(enrollInCourse({ userId: user._id, courseId }));
  };

  const handleLike = async () => {
    await dispatch(toggleLike(courseId));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    await dispatch(createComment({ courseId, text: commentText.trim() }));
    dispatch(getComments(courseId));
    setCommentText("");
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

            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={handleLike}
                disabled={likeStatus === "loading"}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
              >
                👍 Like
              </button>
              <span className="text-gray-700 font-medium">
                {likes.length} Likes
              </span>
              {userLiked && (
                <span className="text-green-500 text-sm">You liked this</span>
              )}
            </div>

            <form onSubmit={handleCommentSubmit} className="mb-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment..."
                className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
                rows={3}
              ></textarea>

              <button
                type="submit"
                className="mt-2 px-6 py-2 bg-[#1C1E53] text-white rounded-md hover:bg-[#FCD980] hover:text-[#1C1E53] transition"
              >
                Post Comment
              </button>
            </form>

            {Array.isArray(comments) && comments.length > 0 && (
              <div className="mt-4 space-y-3">
                <h3 className="font-medium text-gray-800 text-lg">Comments</h3>
                {comments.map((c) => (
                  <div
                    key={c._id}
                    className="bg-gray-100 p-3 rounded-md text-sm text-gray-700"
                  >
                    <div className="font-semibold">
                      {c.user?.name || "Anonymous"}
                    </div>
                    <div>{c.text}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(c.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <AppFooter />
    </>
  );
};

export default CourseDetail;
