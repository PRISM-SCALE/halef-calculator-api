import mongoose, {Schema} from "mongoose";

export const CourierCargoCostSchema = new Schema(
	{
		carrierCode: {
			type: String,
			required: true,
			enum: ["ground_express", "air_cargo", "priority_express"],
		},
		minWeight: {type: Number, required: true},
		maxWeight: {type: Number, required: true},
		cost: {type: Number, required: true},
		docType: {type: String, required: true, enum: ["document", "non-document"]},
	},
	{timestamps: true}
);

const CourierCargoCost = new mongoose.model("couriercargo.transportcost", CourierCargoCostSchema);
export default CourierCargoCost;
