import { catchAsyncHandler } from "../../middlewares/error_middleware.js";
import Like from "../../models/post-interactions/likes_model.js";
import mongoose from "mongoose";

// Create Like
export const createLike = catchAsyncHandler(async (req, res) => {
  try {
    const { user, courseId } = req.body;

    if (!user || !courseId) {
      return res.status(400).json({ message: "User and courseId required." });
    }

    const existingLike = await Like.findOne({ user, courseId });
    if (existingLike) {
      return res.status(409).json({ message: "Like already exists." });
    }

    const newLike = new Like({ user, courseId });
    await newLike.save();

    return res.status(201).json({
      message: "Like created successfully.",
      data: newLike,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while creating like",
      error: error.message,
    });
  }
});

export const getAllLikes = catchAsyncHandler(async (req, res) => {
  try {
    const { courseId } = req.query;

    const likes = await Like.find({ courseId }).populate("user", "name");

    return res.status(200).json({
      message: "Likes fetched",
      data: likes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while fetching likes",
      error: error.message,
    });
  }
});

// Get Like by ID
export const getLikeById = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const like = await Like.findById(id)
      .populate("user", "name email")
      .populate("courseId", "title");

    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    return res.status(200).json({ message: "Like fetched", data: like });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while fetching like",
      error: error.message,
    });
  }
});

// Update Like
export const updateLike = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        message: "courseId is required for updating a like.",
      });
    }

    const updated = await Like.findByIdAndUpdate(
      id,
      { courseId },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Like not found" });
    }

    return res.status(200).json({ message: "Like updated", data: updated });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while updating like",
      error: error.message,
    });
  }
});

// Delete Like
export const deleteLike = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Valid Like ID is required" });
    }

    const deleted = await Like.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Like not found" });
    }

    return res.status(200).json({ message: "Like deleted", data: deleted });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while deleting like",
      error: error.message,
    });
  }
});

// likeController.js
export const getLikesByCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const likes = await Like.find({ courseId }).populate("user", "name");

    return res.status(200).json({
      success: true,
      data: likes,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle Like
export const toggleLike = catchAsyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { courseId } = req.params;

  if (!courseId)
    return res.status(400).json({ message: "courseId is required." });

  const existing = await Like.findOne({ user: userId, courseId });

  if (existing) {
    await Like.deleteOne({ _id: existing._id });
    return res
      .status(200)
      .json({ message: "Unliked successfully", liked: false });
  }

  const newLike = new Like({ user: userId, courseId });
  await newLike.save();
  return res.status(201).json({ message: "Liked successfully", liked: true });
});
