import mongoose, {Schema} from "mongoose";

export const TruckingTransportCostSchema = new Schema(
	{
		vehicle: {type: Schema.Types.ObjectId, required: true, ref: "vehicle"},
		minDistance: {type: Number, required: true},
		maxDistance: {type: Number, required: true},
		cost: {type: Number, required: true},
	},
	{timestamps: true}
);

const TruckingTransportCost = new mongoose.model(
	"trucking.transportcost",
	TruckingTransportCostSchema
);
export default TruckingTransportCost;
