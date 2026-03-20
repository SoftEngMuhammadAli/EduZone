import express from "express";
import mongoose from "mongoose";
import Attendance from "../models/attendance.model.js";
import Course from "../models/course.model.js";
import User from "../models/auth.model.js";
import Notification from "../models/notifications.model.js";
import { catchAsyncHandler } from "../middlewares/error_middleware.js";

const router = express.Router();

export const markAttendance = catchAsyncHandler(async (req, res) => {
  const { studentId, courseId, status, remarks } = req.body;

  if (!studentId || !courseId || !status) {
    return res
      .status(400)
      .json({ message: "Student ID, Course ID, and Status are required." });
  }

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(400).json({ message: "Invalid Student ID." });
  }

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ message: "Invalid Course ID." });
  }

  const student = await User.findById(studentId);
  if (!student) {
    return res.status(404).json({ message: "Student not found." });
  }

  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  const attendance = new Attendance({
    student: studentId,
    course: courseId,
    status,
    remarks,
  });

  await attendance.save();

  await Notification.create({
    userId: studentId,
    message: `Your attendance for "${course.title}" has been marked as "${status}".`,
    type: "attendance",
    link: `/courses/${courseId}/attendance`,
  });

  return res.status(201).json({
    message: "Attendance marked successfully.",
    data: attendance,
  });
});

export const getAllAttendances = catchAsyncHandler(async (req, res) => {
  const attendances = await Attendance.find()
    .populate("student", "name email")
    .populate("course", "title");

  if (!attendances.length) {
    return res.status(404).json({ message: "No attendance records found." });
  }

  return res.status(200).json({
    message: "All attendance records fetched successfully.",
    data: attendances,
  });
});

export const getAttendanceById = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid attendance ID." });
  }

  const attendance = await Attendance.findById(id)
    .populate("student", "name email")
    .populate("course", "title");

  if (!attendance) {
    return res.status(404).json({ message: "Attendance not found." });
  }

  return res.status(200).json({
    message: "Attendance fetched successfully.",
    data: attendance,
  });
});

export const updateAttendance = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, remarks } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid attendance ID." });
  }

  const updated = await Attendance.findByIdAndUpdate(
    id,
    { status, remarks },
    { new: true, runValidators: true },
  ).populate("student course");

  if (!updated) {
    return res.status(404).json({ message: "Attendance not found." });
  }

  await Notification.create({
    userId: updated.student._id,
    message: `Your attendance status for "${updated.course.title}" has been updated to "${updated.status}".`,
    type: "attendance",
    link: `/courses/${updated.course._id}/attendance`,
  });

  return res.status(200).json({
    message: "Attendance updated successfully.",
    data: updated,
  });
});

export const deleteAttendance = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid attendance ID." });
  }

  const deleted =
    await Attendance.findByIdAndDelete(id).populate("student course");

  if (!deleted) {
    return res.status(404).json({ message: "Attendance not found." });
  }

  await Notification.create({
    userId: deleted.student._id,
    message: `Your attendance record for "${deleted.course.title}" has been deleted.`,
    type: "attendance",
    link: `/courses/${deleted.course._id}/attendance`,
  });

  return res.status(200).json({
    message: "Attendance deleted successfully.",
    data: deleted,
  });
});
