import Like from "../../models/post-interactions/likes_model.js";

export const toggleLike = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;

    const existing = await Like.findOne({ course: courseId, user: userId });

    if (existing) {
      await existing.deleteOne();
      return res.status(200).json({ message: "Like removed" });
    } else {
      const like = new Like({ course: courseId, user: userId });
      await like.save();
      return res.status(201).json({ message: "Liked successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getLikesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const likes = await Like.find({ course: courseId }).populate(
      "user",
      "name"
    );
    res.status(200).json(likes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch likes" });
  }
};
