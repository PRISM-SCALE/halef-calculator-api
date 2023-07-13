import mongoose, {Schema} from "mongoose";

export const CitiesSchema = new Schema(
	{
		city: {type: String, required: true},
		country: {type: String, required: true},
		iso: {type: String, required: true},
		state: {type: String},
	},
	{timestamps: true}
);

const Cities = new mongoose.model("cities", CitiesSchema);
export default Cities;
