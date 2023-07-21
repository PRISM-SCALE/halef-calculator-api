import mongoose, {Schema} from "mongoose";

export const AirAmbulanceCitiesSchema = new Schema(
	{
		cityName: {type: String, required: true},
	},
	{timestamps: true}
);

const AirAmbulanceCities = new mongoose.model("airport.cities", AirAmbulanceCitiesSchema);
export default AirAmbulanceCities;
