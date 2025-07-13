import mongoose from "mongoose";
import Course from "../../models/course/course_model.js";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";
import Notification from "../../models/notifications/notification_model.js";

export const getAllCourses = catchAsyncHandler(async (req, res) => {
  try {
    const courses = await Course.find({})
      .populate("user", "name email")
      .populate("category", "name");

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No courses found." });
    }
    console.error(`Getting All Courses: ${courses}`);

    return res.status(200).json({
      message: "Courses fetched successfully!",
      data: courses,
    });
  } catch (error) {
    console.error(`Server Error: ${error.message}`);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

export const getCourseById = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Course ID" });
    }

    const course = await Course.findById(id)
      .populate("user", "name email")
      .populate("category", "name");

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    return res.status(200).json({ message: "Course found", data: course });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

export const createCourse = catchAsyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      duration,
      level,
      views,
      students,
      rating,
    } = req.body;

    const user = req.user?.userId;
    const imageFiles = req.files?.map((file) => file.filename) || [];

    if (!title || !description || !duration) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    if (!level || !["Beginner", "Intermediate", "Advanced"].includes(level)) {
      return res.status(400).json({
        message: "Level must be Beginner, Intermediate, or Advanced.",
      });
    }

    const newCourse = new Course({
      title: title.trim(),
      description: description.trim(),
      category,
      views,
      students,
      rating,
      duration,
      level,
      user,
      images: imageFiles,
    });

    await newCourse.save();

    await Notification.create({
      userId: user,
      message: `New course "${newCourse.title}" has been published.`,
      type: "course",
      link: `/courses/${newCourse._id}`,
    });

    return res.status(201).json({
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

export const updateCourseById = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user?.userId;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Course ID" });
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    // ✅ Create notification BEFORE sending response
    await Notification.create({
      userId: user,
      message: `Course "${updatedCourse.title}" has been updated.`,
      type: "course",
      link: `/courses/${updatedCourse._id}`,
    });

    return res.status(200).json({
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

export const deleteCourseById = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Course ID" });
    }

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    await Notification.create({
      userId: req.user?.userId,
      message: `Course "${deletedCourse.title}" has been deleted.`,
      type: "course",
      link: `/courses/${deletedCourse._id}`,
    });

    return res.status(200).json({
      message: "Course deleted successfully",
      data: deletedCourse,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});
