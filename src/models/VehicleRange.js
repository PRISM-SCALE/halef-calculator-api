import mongoose, {Schema} from "mongoose";

export const VehicleRangeSchema = new Schema(
	{
		trucking: [
			{
				vehicles: {type: Schema.Types.ObjectId, ref: "vehicle"},
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
			},
		],

		relocation: [
			{
				vehicles: {type: Schema.Types.ObjectId, ref: "vehicle"},
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
			},
		],
	},
	{timestamps: true}
);

const VehicleRange = new mongoose.model("vehiclerange", VehicleRangeSchema);

export default VehicleRange;
