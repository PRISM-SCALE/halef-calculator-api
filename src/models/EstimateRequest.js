import mongoose, {Schema} from "mongoose";

export const EstimateRequestSchema = new Schema(
	{
		service: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "service",
		},
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "user",
		},
		estimatedCost: {
			type: Number,
			default: 0,
		},
		isEstimationSuccess: {
			type: Boolean,
			default: false,
		},
		error: {
			type: String,
		},
	},
	{timestamps: true}
);

const EstimateRequest = new mongoose.model("estimaterequest", EstimateRequestSchema);

export default EstimateRequest;
