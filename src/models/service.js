import mongoose, {Schema} from "mongoose";

export const ServiceSchema = new Schema(
	{
		name: {type: String, required: true, unique: true},
		description: {type: String, required: true},
		code: {type: String, required: true, unique: true},
		icon: {type: String, required: true},
	},
	{timestamps: true}
);

const Service = new mongoose.model("service", ServiceSchema);
export default Service;
