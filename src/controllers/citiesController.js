import Cities from "../models/cities.js";

export const AddBulkCities = async (req, res, next) => {
	try {
		const {data} = req.body;

		const objects = data.map((item, index) => {
			const {city, iso, country, state} = item;

			// VALIDATION CODE HERE

			return {city, iso, country, state};
		});
		const response = await Cities.insertMany(objects);
		// res.status(200).send(response);
	} catch (error) {
		console.error(`Error while Adding Cities Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Adding Cities Details. Please try again later",
		});
	}
};

export const getAllCities = async (req, res, next) => {
	try {
		const cities = await Cities.find({});
		res.status(200).send(cities);
	} catch (error) {
		console.error(`Error while fetching cities. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while fetching cities. Please try again later",
		});
	}
};
