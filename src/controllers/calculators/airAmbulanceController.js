import AirAmbulanceCities from "../../models/airAmbulanceAirportCities.js";
import AirAmbulanceCost from "../../models/airAmbulanceCost.js";

export const airAmbulanceCalc = async (req, res, next) => {
	try {
		const {weight, sourceCity, destinationCity, isPackingRequired} = req.body;
		const airportCities = AirAmbulanceCities.find({cityName});
	} catch (error) {}
};
