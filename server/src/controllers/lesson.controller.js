import mongoose from "mongoose";
import { catchAsyncHandler } from "../middlewares/error_middleware.js";
import Lesson from "../models/lesson.model.js";
import Notification from "../models/notifications.model.js";

export const createLesson = catchAsyncHandler(async (req, res) => {
  try {
    const { title, content, videoUrl, duration, isPreview, courseId } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required." });
    }

    if (!content) {
      return res.status(400).json({
        message:
          "Content is required and should be at least 10 characters long.",
      });
    }

    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Valid course ID is required." });
    }

    const lesson = new Lesson({
      title: title.trim(),
      content: content.trim(),
      videoUrl,
      duration,
      isPreview: Boolean(isPreview),
      courseId,
    });

    await lesson.save();

    await Notification.create({
      userId: req.user?._id,
      message: `New lesson "${lesson.title}" has been created.`,
      type: "lesson",
      link: `/lessons/${lesson._id}`,
    });

    return res.status(201).json({
      message: "Lesson created successfully",
      data: lesson,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

export const getAllLessons = catchAsyncHandler(async (req, res) => {
  try {
    const lessons = await Lesson.find().populate("courseId", "title");

    if (!lessons || lessons.length === 0) {
      return res.status(404).json({ message: "No lessons found", data: [] });
    }

    return res.status(200).json({
      message: "Lessons fetched successfully",
      data: lessons,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

export const getLessonById = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid lesson ID" });
    }

    const lesson = await Lesson.findById(id).populate("courseId", "title");

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found", data: null });
    }

    return res.status(200).json({ message: "Lesson fetched", data: lesson });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

export const updateLesson = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, videoUrl, duration, isPreview, courseId } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid lesson ID" });
    }

    const updateFields = {};
    if (title) updateFields.title = title.trim();
    if (content) updateFields.content = content.trim();
    if (videoUrl) updateFields.videoUrl = videoUrl;
    if (duration) updateFields.duration = duration;
    if (typeof isPreview === "boolean") updateFields.isPreview = isPreview;
    if (courseId && mongoose.Types.ObjectId.isValid(courseId))
      updateFields.courseId = courseId;

    const updated = await Lesson.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Lesson not found", data: null });
    }

    await Notification.create({
      userId: req.user?._id,
      message: `Lesson "${updated.title}" has been updated.`,
      type: "lesson",
      link: `/lessons/${updated._id}`,
    });

    return res.status(200).json({
      message: "Lesson updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

export const deleteLesson = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid lesson ID" });
    }

    const deleted = await Lesson.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Lesson not found", data: null });
    }

    await Notification.create({
      userId: req.user?._id,
      message: `Lesson "${deleted.title}" has been deleted.`,
      type: "lesson",
      link: `/lessons`,
    });

    return res.status(200).json({
      message: "Lesson deleted successfully",
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});
