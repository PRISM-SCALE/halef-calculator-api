import mongoose, { Schema } from "mongoose";

export const RelocationTransportCostSchema = new Schema(
  {
    vehicle: { type: Schema.Types.ObjectId, required: true, ref: "vehicle" },
    minDistance: { type: Number, required: true },
    maxDistance: { type: Number, required: true },
    cost: { type: Number, required: true },
  },
  { timestamps: true }
);

const RelocationTransportCost = new mongoose.model("relocation.transportcost", RelocationTransportCostSchema);
export default RelocationTransportCost;
