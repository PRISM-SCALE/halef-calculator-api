import mongoose, { Schema } from "mongoose";

export const AirAmbulanceCostSchema = new Schema(
  {
    // isSourceAirportCity: { type: Boolean, required: true },
    // isDestinationAirportCity: { type: Boolean, required: true },
    cityCombinationType: { type: String, required: true, enum: ["port", "mixed", "non_port"] },
    minWeight: { type: Number, required: true },
    maxWeight: { type: Number, required: true },
    rate: { type: Number, required: true },
  },
  { timestamps: true }
);

const AirAmbulanceCost = new mongoose.model("airambulance.transportcost", AirAmbulanceCostSchema);
export default AirAmbulanceCost;
