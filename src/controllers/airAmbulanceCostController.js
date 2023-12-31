import AirAmbulanceCost from "../models/airAmbulanceCost.js";

export const addAirAmbulanceCost = async (req, res, next) => {
	const {data} = req.body;
	//   const { cityCombinationType, minWeight, maxWeight, rate } = req.body;
	try {
		const docs = data.map((item) => {
			const {cityCombinationType, minWeight, maxWeight, rate, packingCost} = item;
			return {cityCombinationType, minWeight, maxWeight, rate, packingCost};
		});
		const airAmbulanceCost = await AirAmbulanceCost.insertMany(docs);
		res.status(200).send(airAmbulanceCost);
	} catch (error) {
		console.error(`Error while creating airAmbulanceCost. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while adding airAmbulanceCost. Please try again later",
		});
	}
};

export const getBulkAirAmbulanceCost = async (req, res, next) => {
	try {
		const airAmbulanceCost = await AirAmbulanceCost.find({});
		res.status(200).send(airAmbulanceCost);
	} catch (error) {
		console.error(`Error while Fetching AirAmbulanceCost Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Fetching AirAmbulanceCost Details. Please try again later",
		});
	}
};

export const updateAirAmbulanceCost = async (req, res, next) => {
	try {
		const {id} = req.params;
		const {cost} = req.body;
		const airAmbulanceCost = await AirAmbulanceCost.findOneAndUpdate(
			{_id: id},
			{rate: cost},
			{new: true}
		);
		res.status(200).send(airAmbulanceCost);
	} catch (error) {
		console.error(`Error while Updating AirAmbulanceCost Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Updating AirAmbulanceCost Details. Please try again later",
		});
	}
};
