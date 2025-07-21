import Like from "../../models/post-interactions/likes_model.js";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";

export const toggleLike = catchAsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;

    const existing = await Like.findOne({ course: courseId, user: userId });

    if (!existing) {
      return res.status(404).json({ error: "Like not found" });
    }

    if (existing) {
      await existing.deleteOne();
      return res.status(200).json({ message: "Like removed" });
    } else {
      const like = new Like({ course: courseId, user: userId });
      const saved = await like.save();
      await saved.populate("user", "name");
      return res.status(201).json({ message: "Like added", like: saved });
    }
  } catch (err) {
    console.error("Error toggling like:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

export const getLikesByCourse = catchAsyncHandler(async (req, res) => {
  try {
    const { courseId } = req.params;
    const likes = await Like.find({ course: courseId }).populate(
      "user",
      "name"
    );
    if (!likes || likes.length === 0) {
      return res.status(404).json({ error: "No likes found for this course" });
    }

    return res
      .status(200)
      .json({ message: "Likes fetched successfully", likes });
  } catch (err) {
    console.error("Error fetching likes:", err);
    return res.status(500).json({ error: "Failed to fetch likes" });
  }
});
