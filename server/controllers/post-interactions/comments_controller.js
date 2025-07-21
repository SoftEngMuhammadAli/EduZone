import Comment from "../../models/post-interactions/comments_model.js";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";

export const createComment = catchAsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;
    const { text } = req.body;

    const comment = new Comment({ course: courseId, user: userId, text });
    if (!comment) {
      return res.status(400).json({ error: "Invalid comment data" });
    }

    await comment.save();

    return res
      .status(201)
      .json({ message: "Comment created successfully", comment });
  } catch (err) {
    console.error("Error creating comment:", err);
    return res.status(500).json({ error: "Failed to create comment" });
  }
});

export const getCommentsByCourse = catchAsyncHandler(async (req, res) => {
  try {
    const { courseId } = req.params;
    const comments = await Comment.find({ course: courseId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    if (!comments) {
      return res
        .status(404)
        .json({ error: "No comments found for this course" });
    }
    return res
      .status(200)
      .json({ message: "Comments fetched successfully", comments });
  } catch (err) {
    console.error("Error creating comment:", err);
    return res.status(500).json({ error: "Failed to fetch comments" });
  }
});
