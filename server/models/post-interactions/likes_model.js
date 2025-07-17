import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

LikeSchema.index({ course: 1, user: 1 }, { unique: true });

export default mongoose.model("Like", LikeSchema);
