import mongoose, { Schema } from "mongoose";
import { VehicleSchema } from "./vehicle.js";

export const HouseTypeSchema = new Schema(
  {
    type: { type: String, required: true, enum: ["1RK", "1BHK", "2BHK", "3BHK", "4BHK", "5BHK"] },
    allowedVehicles: [{ type: Schema.Types.ObjectId, ref: "vehicle" }],
  },
  { timestamps: true }
);

const HouseType = new mongoose.model("housetype", HouseTypeSchema);
export default HouseType;
