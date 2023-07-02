import mongoose, { Schema } from "mongoose";
const { Schema } = mongoose;

export const RelocationTransportCostSchema = new Schema(
  {
    vehicle: { type: mongoose.ObjectId, required: true, ref: "vehicle" },
    minDistance: { type: Number, required: true, unique: true },
    maxDistance: { type: Number, required: true, unique: true },
    cost: { type: Number, required: true },
  },
  { timestamps: true }
);

const RelocationTransportCost = new mongoose.model("relocation.transportcost", RelocationTransportCostSchema);
export default RelocationTransportCost;
