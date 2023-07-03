import mongoose, { Schema } from "mongoose";
const { Schema } = mongoose;

export const RelocationPackageCostSchema = new Schema(
  {
    packageType: { type: Schema.Types.ObjectId, required: true, ref: "packagetype" },
    houseType: { type: Schema.Types.ObjectId, required: true, ref: "housetype" },
    cost: { type: Number, required: true },
  },
  { timestamps: true }
);

const RelocationPackageCost = new mongoose.model("relocation.packagecost", RelocationPackageCostSchema);
export default RelocationPackageCost;
