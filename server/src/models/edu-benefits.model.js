import mongoose from "mongoose";

const eduZoneBenefitsSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("EduZoneBenefit", eduZoneBenefitsSchema);
