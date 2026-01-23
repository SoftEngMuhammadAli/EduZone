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
    category: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    views: {
      type: Number,
      default: 0,
    },
    students: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 1,
    },
    courseCreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Course", CourseSchema);
