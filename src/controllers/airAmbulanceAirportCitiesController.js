import AirAmbulanceAirportCities from "../models/airAmbulanceAirportCities.js";

export const addAirAmbulanceAirportCities = async (req, res, next) => {
	const {data} = req.body;
	//   const { cityCombinationType, minWeight, maxWeight, rate } = req.body;
	try {
		const docs = data.map((item) => {
			const {cityName} = item;
			return {cityName};
		});
		const airAmbulanceAirportCities = await AirAmbulanceAirportCities.insertMany(docs);
		res.status(200).send(airAmbulanceAirportCities);
	} catch (error) {
		console.error(`Error while creating AirAmbulanceAirportCities. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while adding AirAmbulanceAirportCities. Please try again later",
		});
	}
};
