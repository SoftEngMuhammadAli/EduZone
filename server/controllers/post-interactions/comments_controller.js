import Comment from "../../models/post-interactions/comments_model.js";

export const createComment = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;
    const { text } = req.body;

    const comment = new Comment({ course: courseId, user: userId, text });
    await comment.save();

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: "Failed to create comment" });
  }
};

export const getCommentsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const comments = await Comment.find({ course: courseId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};
