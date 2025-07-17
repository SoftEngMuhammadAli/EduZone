import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  enrollInCourse,
  clearEnrollmentStatus,
} from "../../features/course/enrollSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { AppFooter } from "../../components/footer/Footer";
import {
  createComment,
  getComments,
} from "../../features/post-interactions/commentSlice";
import {
  toggleLike,
  getLikesByCourse,
} from "../../features/post-interactions/likesSlice";

const CourseDetail = () => {
  const { state: course } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { status, error, data } = useSelector((state) => state.enroll);
  const { list: commentList, loading: commentLoading } = useSelector(
    (state) => state.comment
  );
  const { list: likeList, loading: likeLoading } = useSelector(
    (state) => state.likes
  );

  const [comment, setComment] = useState("");

  const alreadyEnrolledError = error
    ?.toLowerCase()
    .includes("already enrolled");

  const handleEnroll = () => {
    dispatch(enrollInCourse({ userId: user._id, courseId: course._id }));
  };

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      await dispatch(
        createComment({
          user: user._id,
          commentOnPost: comment.trim(),
          courseId: course._id,
        })
      );
      dispatch(getComments(course._id));
      setComment("");
    }
  };

  const handleLike = async () => {
    if (!user?._id || !course?._id) return;

    const alreadyLiked = likeList.some((l) => l.user._id === user._id);

    await dispatch(toggleLike(course._id));
    dispatch(getLikesByCourse(course._id));
  };

  useEffect(() => {
    dispatch(getComments(course._id));
    dispatch(getLikesByCourse(course._id));
  }, [dispatch, course._id]);

  useEffect(() => {
    if (
      status === "succeeded" &&
      user?.user_type === "student" &&
      !alreadyEnrolledError
    ) {
      navigate("/coursesuccess");
      dispatch(clearEnrollmentStatus());
    }
  }, [status, user, alreadyEnrolledError, dispatch, navigate]);

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
                disabled={likeLoading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
              >
                👍 Like
              </button>
              <span className="text-gray-700 font-medium">
                {likeList.length} Likes
              </span>
              {likeList.some((l) => l.user._id === user._id) && (
                <span className="text-green-500 text-sm">You liked this</span>
              )}
            </div>

            <div className="mb-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment..."
                className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
                rows={3}
              ></textarea>

              <button
                onClick={handleCommentSubmit}
                className="mt-2 px-6 py-2 bg-[#1C1E53] text-white rounded-md hover:bg-[#FCD980] hover:text-[#1C1E53] transition"
              >
                Post Comment
              </button>
            </div>

            {commentList.length > 0 && (
              <div className="mt-4 space-y-3">
                <h3 className="font-medium text-gray-800 text-lg">Comments</h3>
                {commentList.map((c) => (
                  <div
                    key={c._id}
                    className="bg-gray-100 p-3 rounded-md text-sm text-gray-700"
                  >
                    <div className="font-semibold">
                      {c.user?.name || "Anonymous"}
                    </div>
                    <div>{c.commentOnPost}</div>
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
