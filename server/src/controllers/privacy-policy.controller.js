import mongoose from "mongoose";
import { catchAsyncHandler } from "../middlewares/error_middleware.js";
import PrivacyPolicy from "../models/privacy-policy.model.js";

export const getPrivacyPolicy = catchAsyncHandler(async (req, res) => {
  try {
    const policies = await PrivacyPolicy.find({});
    if (!policies || policies.length === 0) {
      return res.status(404).json({ message: "No privacy policies found." });
    }
    return res.status(200).json({
      message: "Privacy policies fetched successfully.",
      data: policies,
    });
  } catch (err) {
    console.error("Get policy error:", err);
    return res.status(500).json({ error: "Failed to fetch privacy policy." });
  }
});

export const createPrivacyPolicy = catchAsyncHandler(async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Both title and content are required." });
    }

    const duplicate = await PrivacyPolicy.findOne({ title: trimmedTitle });
    if (duplicate) {
      return res
        .status(409)
        .json({ message: "A policy with this title already exists." });
    }

    const policy = new PrivacyPolicy({
      title: trimmedTitle,
      content: trimmedContent,
    });

    if (!policy) {
      return res.status(400).json({
        message: "Failed to create privacy policy. Please try again.",
      });
    }

    await policy.save();

    return res
      .status(201)
      .json({ message: "Policy created successfully.", data: policy });
  } catch (err) {
    console.error("Create policy error:", err);
    return res.status(500).json({ error: "Failed to create privacy policy." });
  }
});

export const updatePrivacyPolicy = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid policy ID." });
    }

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Both title and content are required." });
    }

    const updatedPolicy = await PrivacyPolicy.findByIdAndUpdate(
      id,
      { title: trimmedTitle, content: trimmedContent, updatedAt: new Date() },
      { new: true, runValidators: true },
    );

    if (!updatedPolicy) {
      return res
        .status(404)
        .json({ message: "Privacy policy not found for update." });
    }

    return res
      .status(200)
      .json({ message: "Policy updated successfully.", data: updatedPolicy });
  } catch (err) {
    console.error("Update policy error:", err);
    return res.status(500).json({ error: "Failed to update privacy policy." });
  }
});

export const deletePrivacyPolicy = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid policy ID." });
    }

    const deleted = await PrivacyPolicy.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Privacy policy not found for deletion." });
    }

    return res
      .status(200)
      .json({ message: "Policy deleted successfully.", data: deleted });
  } catch (err) {
    console.error("Delete policy error:", err);
    return res.status(500).json({ error: "Failed to delete privacy policy." });
  }
});
