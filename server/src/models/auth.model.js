import mongoose from "mongoose";
import getRandomBio from "../utils/constants.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: false,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    refresh_token_hash: {
      type: String,
      default: null,
      select: false,
    },
    user_type: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
    profile_picture_url: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: () => getRandomBio(),
      maxlength: 1000,
    },
    registration_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
