import mongoose from "mongoose";

const termsAndConditionsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("TermsConditions", termsAndConditionsSchema);
