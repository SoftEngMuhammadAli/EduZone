import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createComment,
  getComments,
} from "../../features/post-interactions/commentSlice";

const CommentFeature = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [commentText, setCommentText] = useState("");

  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    if (id) dispatch(getComments(id));
  }, [id, dispatch]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    await dispatch(createComment({ id, text: commentText.trim() }));
    setCommentText("");
    dispatch(getComments(id)); // Refresh after posting
  };

  return (
    <>
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
              <div className="font-semibold">{c.user?.name || "Anonymous"}</div>
              <div>{c.text}</div>
              <div className="text-xs text-gray-500">
                {new Date(c.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CommentFeature;
