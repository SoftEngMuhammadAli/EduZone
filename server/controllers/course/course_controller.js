import mongoose from "mongoose";
import Course from "../../models/course/course_model.js";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";
import Notification from "../../models/notifications/notification_model.js";

// 1. GET ALL COURSES
export const getAllCourses = catchAsyncHandler(async (req, res) => {
  const courses = await Course.find({}).populate(
    "courseCreatedBy",
    "name email user_type"
  );

  if (!courses || courses.length === 0) {
    return res.status(404).json({ message: "No courses found." });
  }

  return res.status(200).json({
    message: "Courses fetched successfully!",
    data: courses,
  });
});

// 2. GET COURSE BY ID
export const getCourseById = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Course ID" });
  }

  const course = await Course.findById(id).populate(
    "courseCreatedBy",
    "name email user_type"
  );

  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  const courseData = {
    ...course.toObject(),
    imageUrl: course.image
      ? `${process.env.BASE_URL}/uploads/${course.image}`
      : null,
  };

  return res.status(200).json({
    message: "Course found",
    data: courseData,
  });
});

// 3. CREATE COURSE
export const createCourse = catchAsyncHandler(async (req, res) => {
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

  const courseCreatedBy = req.user?._id;

  if (!courseCreatedBy) {
    return res.status(401).json({ message: "Unauthorized: Missing user ID" });
  }

  if (!title || !description || !duration) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  if (!level || !["Beginner", "Intermediate", "Advanced"].includes(level)) {
    return res.status(400).json({
      message: "Level must be Beginner, Intermediate, or Advanced.",
    });
  }

  const imageFile = req.file?.filename || null;

  const newCourse = new Course({
    title: title.trim(),
    description: description.trim(),
    category,
    views,
    students,
    rating,
    duration,
    level,
    courseCreatedBy,
    image: imageFile,
  });

  await newCourse.save();
  await newCourse.populate("courseCreatedBy", "name email");

  await Notification.create({
    userId: courseCreatedBy,
    message: `New course "${newCourse.title}" has been published.`,
    type: "course",
    link: `/courses/${newCourse._id}`,
  });

  return res.status(201).json({
    message: "Course created successfully",
    data: {
      ...newCourse.toObject(),
      imageUrl: newCourse.image
        ? `${process.env.BASE_URL}/uploads/${newCourse.image}`
        : null,
    },
  });
});

// 4. UPDATE COURSE
export const updateCourseById = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user?._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Course ID" });
  }

  const updateData = { ...req.body };
  if (req.file?.filename) {
    updateData.image = req.file.filename;
  }

  const updatedCourse = await Course.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedCourse) {
    return res.status(404).json({ error: "Course not found" });
  }

  await Notification.create({
    userId: user,
    message: `Course "${updatedCourse.title}" has been updated.`,
    type: "course",
    link: `/courses/${updatedCourse._id}`,
  });

  return res.status(200).json({
    message: "Course updated successfully",
    data: {
      ...updatedCourse.toObject(),
      imageUrl: updatedCourse.image
        ? `${process.env.BASE_URL}/uploads/${updatedCourse.image}`
        : null,
    },
  });
});

// 5. DELETE COURSE
export const deleteCourseById = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Course ID" });
  }

  const deletedCourse = await Course.findByIdAndDelete(id);

  if (!deletedCourse) {
    return res.status(404).json({ error: "Course not found" });
  }

  await Notification.create({
    userId: req.user?._id,
    message: `Course "${deletedCourse.title}" has been deleted.`,
    type: "course",
    link: `/courses/${deletedCourse._id}`,
  });

  return res.status(200).json({
    message: "Course deleted successfully",
    data: deletedCourse,
  });
});
