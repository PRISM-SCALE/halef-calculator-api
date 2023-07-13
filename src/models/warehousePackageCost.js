import mongoose, {Schema} from "mongoose";

export const WarehousePackageCostSchema = new Schema(
	{
		packageType: {type: Schema.Types.ObjectId, required: true, ref: "packagetype"},
		cft: {type: Number, required: true},
		cost: {type: Number, required: true},
	},
	{timestamps: true}
);

const WarehousePackageCost = new mongoose.model(
	"warehouse.packagecost",
	WarehousePackageCostSchema
);
export default WarehousePackageCost;
