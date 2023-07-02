import mongoose, { Schema } from "mongoose";
const { Schema } = mongoose;

export const RelocationPackageCostSchema = new Schema(
  {
    packageType: { type: mongoose.ObjectId, required: true, ref: "packagetype" },
    houseType: { type: mongoose.ObjectId, required: true, ref: "housetype" },
    cost: { type: Number, required: true },
  },
  { timestamps: true }
);

const RelocationPackageCost = new mongoose.model("relocation.packagecost", RelocationPackageCostSchema);
export default RelocationPackageCost;
