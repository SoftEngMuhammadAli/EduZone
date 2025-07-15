import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
    },
    commentOnPost: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentsSchema);
