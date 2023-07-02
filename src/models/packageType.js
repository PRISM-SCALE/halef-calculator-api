import mongoose, { Schema } from "mongoose";
const { Schema } = mongoose;

export const PackageTypeSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const PackageType = new mongoose.model("packagetype", PackageTypeSchema);
export default PackageType;
