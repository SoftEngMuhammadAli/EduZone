import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  toggleLike,
  getLikesByCourse,
} from "../../features/post-interactions/likesSlice";

const LikeFeature = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { user } = useSelector((state) => state.auth);
  const { likes, status: likeStatus } = useSelector((state) => state.likes);
  const userLiked = likes?.some((l) => l.user?._id === user?._id);

  useEffect(() => {
    if (id) dispatch(getLikesByCourse(id));
  }, [id, dispatch]);

  const handleLike = async () => {
    await dispatch(toggleLike(id));
    dispatch(getLikesByCourse(id)); // Refresh after toggle
  };

  return (
    <div className="flex items-center gap-3 mb-6">
      <button
        onClick={handleLike}
        disabled={likeStatus === "loading"}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
      >
        👍 Like
      </button>
      <span className="text-gray-700 font-medium">{likes.length} Likes</span>
      {userLiked && (
        <span className="text-green-500 text-sm">You liked this</span>
      )}
    </div>
  );
};

export default LikeFeature;
