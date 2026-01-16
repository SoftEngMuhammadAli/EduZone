import mongoose from "mongoose";
import { catchAsyncHandler } from "../../shared/middlewares/error_middleware.js";
import TermsConditions from "./terms-conditions.model.js";

export const getTermsAndConditions = catchAsyncHandler(async (req, res) => {
  try {
    const terms = await TermsConditions.find().sort({ createdAt: -1 });

    if (!terms.length) {
      return res
        .status(404)
        .json({ message: "Terms and conditions not found." });
    }

    return res.status(200).json({
      message: "Terms and conditions fetched successfully.",
      data: terms,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
});

export const createTermsAndConditions = catchAsyncHandler(async (req, res) => {
  try {
    const { title, content } = req.body || {};

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Both title and content are required." });
    }

    const newTerms = await TermsConditions.create({
      title: title.trim(),
      content: content.trim(),
    });

    if (!newTerms) {
      return res
        .status(400)
        .json({ message: "Failed to create terms and conditions." });
    }

    return res.status(201).json({
      message: "Terms and conditions created successfully.",
      data: newTerms,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
});

export const updateTermsAndConditions = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body || {};

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid terms ID." });
    }

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Both title and content are required." });
    }

    const updatedTerms = await TermsConditions.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        content: content.trim(),
      },
      { new: true, runValidators: true },
    );

    if (!updatedTerms) {
      return res
        .status(404)
        .json({ message: "Terms and conditions not found for update." });
    }

    return res.status(200).json({
      message: "Terms and conditions updated successfully.",
      data: updatedTerms,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
});

export const deleteTermsAndConditions = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid terms ID." });
    }

    const deleted = await TermsConditions.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Terms and conditions not found for deletion." });
    }

    return res.status(200).json({
      message: "Terms and conditions deleted successfully.",
      data: deleted,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
});
