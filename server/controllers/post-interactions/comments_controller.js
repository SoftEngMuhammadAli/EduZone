import { catchAsyncHandler } from "../../middlewares/error_middleware.js";
import Comment from "../../models/post-interactions/comments_model.js";

// Create Comment
export const createComment = catchAsyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { courseId, commentOnPost } = req.body;

  const comment = await Comment.create({
    user: userId,
    courseId,
    commentOnPost,
  });

  const populatedComment = await Comment.findById(comment._id).populate(
    "user",
    "name"
  );

  res.status(201).json({ message: "Comment added", data: populatedComment });
});

// Get All Comments
export const getAllComments = catchAsyncHandler(async (req, res) => {
  console.log("Get All Comments Query:", req.query);
  try {
    const { courseId } = req.query;
    const comments = await Comment.find({ courseId }).populate("user", "name");

    if (!comments) {
      return res.status(404).json({ message: "Unable to find!" });
    }

    return res.status(200).json({
      message: "Comments fetched",
      data: comments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch comments",
      error: error.message,
    });
  }
});

// Get Comment by ID
export const getCommentById = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Comment ID is required",
      });
    }

    const comment = await Comment.findById(id)
      .populate("user", "name email")
      .populate("courseId", "title");

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    return res.status(200).json({
      message: "Comment fetched",
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch comment",
      error: error.message,
    });
  }
});

// Update Comment
export const updateComment = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { commentOnPost } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Comment ID is required",
      });
    }

    if (!commentOnPost || !commentOnPost.trim()) {
      return res.status(400).json({
        message: "Valid commentOnPost is required",
      });
    }

    const updated = await Comment.findByIdAndUpdate(
      id,
      { commentOnPost: commentOnPost.trim() },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    return res.status(200).json({
      message: "Comment updated",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update comment",
      error: error.message,
    });
  }
});

// Delete Comment
export const deleteComment = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Comment ID is required",
      });
    }

    const deleted = await Comment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    return res.status(200).json({
      message: "Comment deleted",
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete comment",
      error: error.message,
    });
  }
});

export const getCommentsByCourse = catchAsyncHandler(async (req, res) => {
  const { courseId } = req.params;

  if (!courseId) {
    return res.status(400).json({ message: "courseId is required in params." });
  }

  const comments = await Comment.find({ courseId }).populate("user", "name");

  return res.status(200).json({
    message: "Comments fetched",
    data: comments,
  });
});
