import mongoose, {Schema} from "mongoose";

export const VehicleRangeSchema = new Schema(
	{
		minDistance: {
			type: Number,
			required: true,
			default: 0,
		},
		maxDistance: {
			type: Number,
			required: true,
			default: 0,
		},
		allowedVehicles: [{type: Schema.Types.ObjectId, ref: "vehicle"}],
	},
	{timestamps: true}
);

const VehicleRange = new mongoose.model("vehiclerange", VehicleRangeSchema);

export default VehicleRange;
