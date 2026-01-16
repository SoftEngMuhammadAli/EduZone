import { catchAsyncHandler } from "../../shared/middlewares/error_middleware.js";
import Assignment from "./assignment.model.js";
import Notification from "../notifications/notifications.model.js";

export const createAssignment = catchAsyncHandler(async (req, res) => {
  try {
    const { title, description, dueDate, courseId, lessonId } = req.body || {};

    if (!req.body) {
      return res.status(400).json({
        message: "Request body is missing or empty.",
        data: null,
      });
    }

    console.log("Creating assignment:", {
      title,
      description,
      dueDate,
      courseId,
      lessonId,
    });

    if (!title) {
      return res.status(400).json({
        message: "Title is required and must be at least 3 characters.",
        data: null,
      });
    }

    if (!description) {
      return res.status(400).json({
        message: "Description is required and must be at least 10 characters.",
        data: null,
      });
    }

    if (!dueDate) {
      return res.status(400).json({
        message: "A valid due date is required.",
        data: null,
      });
    }

    if (!courseId) {
      return res.status(400).json({
        message: "Valid courseId is required.",
        data: null,
      });
    }

    if (!lessonId) {
      return res.status(400).json({
        message: "Valid lessonId is required.",
        data: null,
      });
    }

    const assignment = new Assignment({
      title: title.trim(),
      description: description.trim(),
      dueDate: new Date(dueDate),
      courseId,
      lessonId,
    });

    await assignment.save();

    await Notification.create({
      userId: req.user?.userId,
      message: `New assignment "${assignment.title}" has been created.`,
      type: "assignment",
      link: `/assignments/${assignment._id}`,
    });

    return res.status(201).json({
      message: "Assignment created successfully",
      data: assignment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create assignment",
      error: error.message || error,
    });
  }
});

export const getAllAssignments = catchAsyncHandler(async (req, res) => {
  try {
    const assignments = await Assignment.find({})
      .populate("courseId", "title")
      .populate("lessonId", "title");

    if (!assignments || assignments.length === 0) {
      return res
        .status(404)
        .json({ message: "No assignments found", data: [] });
    }

    return res
      .status(200)
      .json({ message: "Assignments fetched", data: assignments });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch assignments", error });
  }
});

export const getAssignmentById = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Assignment ID is required" });
    }

    const assignment = await Assignment.findById(id)
      .populate("courseId", "title")
      .populate("lessonId", "title");

    if (!assignment) {
      return res
        .status(404)
        .json({ message: "Assignment not found", data: null });
    }

    return res
      .status(200)
      .json({ message: "Assignment fetched", data: assignment });
  } catch (error) {
    return res.status(400).json({ message: "Invalid assignment ID", error });
  }
});

export const updateAssignment = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Assignment ID is required" });
    }

    const updated = await Assignment.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Assignment not found", data: null });
    }

    await Notification.create({
      userId: req.user?.userId,
      message: `Assignment "${updated.title}" has been updated.`,
      type: "assignment",
      link: `/assignments/${updated._id}`,
    });

    return res
      .status(200)
      .json({ message: "Assignment updated", data: updated });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to update assignment", error });
  }
});

export const deleteAssignment = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Assignment ID is required" });
    }

    const deleted = await Assignment.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Assignment not found", data: null });
    }

    await Notification.create({
      userId: req.user?.userId,
      message: `Assignment "${deleted.title}" has been deleted.`,
      type: "assignment",
      link: `/assignments`,
    });

    return res
      .status(200)
      .json({ message: "Assignment deleted", data: deleted });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to delete assignment", error });
  }
});
