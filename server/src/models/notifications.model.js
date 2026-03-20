import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: [
        "course",
        "enrollment",
        "assignment",
        "blog",
        "lesson",
        "info",
        "user",
        "custom",
      ],
      default: "custom",
    },
    link: { type: String },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Notification", notificationSchema);
