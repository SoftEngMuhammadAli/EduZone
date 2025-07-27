import mongoose from "mongoose";
import EnrollmentCourse from "../../models/course/enrollment_model.js";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";
import Notification from "../../models/notifications/notification_model.js";

export const enrollInCourse = catchAsyncHandler(async (req, res) => {
  try {
    console.log("Incoming payload:", req.body);
    const { userId, courseId } = req.body;

    console.log("Result After Enrolling in Course", req.body);

    if (!userId || !courseId) {
      return res
        .status(400)
        .json({ error: "User ID and Course ID are required" });
    }

    const existing = await EnrollmentCourse.findOne({ userId, courseId });

    if (existing) {
      return res
        .status(409)
        .json({ error: "User already enrolled in this course" });
    }

    const enrollment = new EnrollmentCourse({ userId, courseId });

    console.log(`Enrollment Process: ${enrollment}`);

    await enrollment.save();

    console.log(`Enrollment Process Success: ${enrollment}`);

    const populatedEnrollment = await EnrollmentCourse.findById(enrollment._id)
      .populate("courseId", "title description")
      .populate("userId", "name email");

    if (!populatedEnrollment.courseId) {
      console.error("❌ Course not found for enrollment:", enrollment.courseId);
      return res.status(500).json({
        error: "Enrollment saved, but course data not found during population",
      });
    }

    await Notification.create({
      userId,
      message: `You have enrolled in "${populatedEnrollment.courseId.title}".`,
      type: "enrollment",
      link: `/courses/${courseId}`,
    });

    return res.status(201).json({
      message: `Enrollment successful in course: ${populatedEnrollment.courseId.title}`,
      data: populatedEnrollment,
    });
  } catch (error) {
    console.error("Error enrolling in course:", error);
    return res
      .status(500)
      .json({ error: "Server error", message: error.message });
  }
});

export const getEnrolledCoursesByUserId = catchAsyncHandler(
  async (req, res) => {
    try {
      const { userId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const enrollments = await EnrollmentCourse.find({ userId })
        .populate("courseId", "title description")
        .populate("userId", "name email");

      if (!enrollments.length) {
        return res.status(404).json({ error: "No enrollments found" });
      }

      return res.status(200).json({
        message: "User's enrolled courses fetched successfully",
        data: enrollments,
      });
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ error: "Server error", message: error.message });
    }
  }
);

export const getEnrolledCoursesByStudentName = catchAsyncHandler(
  async (req, res) => {
    try {
      const { name } = req.params;

      const enrollments = await EnrollmentCourse.find()
        .populate({
          path: "userId",
          match: { name: { $regex: name, $options: "i" } },
          select: "name email",
        })
        .populate("courseId", "title description");

      const filtered = enrollments.filter((e) => e.userId !== null);

      if (!filtered.length) {
        return res
          .status(404)
          .json({ error: "No students found with that name" });
      }

      return res.status(200).json({
        message: `Enrollments for student(s) with name: ${name}`,
        data: filtered,
      });
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ error: "Server error", message: error.message });
    }
  }
);

export const getAllEnrolledStudents = catchAsyncHandler(async (req, res) => {
  try {
    const enrollments = await EnrollmentCourse.find()
      .populate("userId", "name email")
      .populate("courseId", "title description");

    if (!enrollments.length) {
      return res.status(404).json({ error: "No enrollments found" });
    }

    return res.status(200).json({
      message: "All enrolled students fetched successfully",
      data: enrollments,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ error: "Server error", message: error.message });
  }
});

export const updateCourseEnrollment = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { progress, completed } = req.body;

    const enrollment = await EnrollmentCourse.findByIdAndUpdate(
      id,
      { progress, completed },
      { new: true }
    )
      .populate("courseId", "title")
      .populate("userId", "_id");

    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    // Notify student of progress update
    await Notification.create({
      userId: enrollment.userId._id,
      message: `Your progress for "${enrollment.courseId.title}" has been updated.`,
      type: "enrollment",
      link: `/courses/${enrollment.courseId._id}`,
    });

    return res.status(200).json({
      message: "Enrollment updated successfully",
      data: enrollment,
    });
  } catch (error) {
    console.error("Error updating enrollment:", error);
    return res
      .status(500)
      .json({ error: "Server error", message: error.message });
  }
});

export const unEnrollFromCourse = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const enrollment = await EnrollmentCourse.findByIdAndDelete(id)
      .populate("courseId", "title")
      .populate("userId", "_id");

    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    await Notification.create({
      userId: enrollment.userId._id,
      message: `You have unenrolled from "${enrollment.courseId.title}".`,
      type: "enrollment",
      link: `/courses/${enrollment.courseId._id}`,
    });

    return res.status(200).json({ message: "Unenrollment successful" });
  } catch (error) {
    console.error("Error during unenrollment:", error);
    return res
      .status(500)
      .json({ error: "Server error", message: error.message });
  }
});
