import mongoose, {Schema} from "mongoose";

export const WarehouseStorageCostSchema = new Schema(
	{
		cft: {type: Number, required: true},
		minDays: {type: Number, required: true},
		maxDays: {type: Number, required: true},
		cost: {type: Number, required: true},
	},
	{timestamps: true}
);

const WarehouseStorageCost = new mongoose.model(
	"warehouse.storagecost",
	WarehouseStorageCostSchema
);
export default WarehouseStorageCost;
