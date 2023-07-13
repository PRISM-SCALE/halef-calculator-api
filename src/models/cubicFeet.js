import mongoose, {Schema} from "mongoose";

export const CubicFeetSchema = new Schema(
	{
		cft: {type: Number, required: true},
		sqft: {type: Number, required: true},
	},
	{timestamps: true}
);

const CubicFeet = new mongoose.model("cubicfeet", CubicFeetSchema);
export default CubicFeet;
