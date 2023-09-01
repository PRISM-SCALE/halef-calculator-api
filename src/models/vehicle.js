import mongoose, {Schema} from "mongoose";

export const VehicleSchema = new Schema(
	{
		name: {type: String, required: true, unique: true},
		length: {type: Number, required: true},
		width: {type: Number, required: true},
		height: {type: Number, required: true},
		isActive: {type: Boolean, default: false},
		imageUrl: String,
	},
	{timestamps: true}
);

const Vehicle = new mongoose.model("vehicle", VehicleSchema);
export default Vehicle;
