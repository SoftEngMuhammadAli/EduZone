import Like from "./likes.model.js";
import { catchAsyncHandler } from "../../shared/middlewares/error_middleware.js";

export const toggleLike = catchAsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;

    const existing = await Like.findOne({ course: courseId, user: userId });

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
      "name",
    );

    return res
      .status(200)
      .json({ message: "Likes fetched successfully", likes });
  } catch (err) {
    console.error("Error fetching likes:", err);
    return res.status(500).json({ error: "Failed to fetch likes" });
  }
});
