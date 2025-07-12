import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      default: null,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseCategory",
      required: true,
      trim: true,
    },
    views: {
      type: Number,
      default: 0,
      trim: true,
    },
    students: {
      type: Number,
      default: 0,
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 1,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: false,
      trim: true,
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Course", CourseSchema, "courses");
