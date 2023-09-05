import mongoose, {Schema} from "mongoose";

export const VehicleSchema = new Schema(
	{
		name: {type: String, required: true, unique: true},
		length: {type: Number, required: true},
		width: {type: Number, required: true},
		height: {type: Number, required: true},
		isActive: {type: Boolean, default: true},
		isInterStateAllowed: {type: Boolean, default: true},
		sort: {type: Number, required: true, default: 0},
		imageUrl: String,
		relocationRange: [{minDistance: Number, maxDistance: Number}],
		truckingRange: [{minDistance: Number, maxDistance: Number}],
	},
	{timestamps: true}
);

const Vehicle = new mongoose.model("vehicle", VehicleSchema);
export default Vehicle;
