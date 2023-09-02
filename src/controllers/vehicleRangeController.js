import VehicleRange from "../models/VehicleRange.js";

export const getAllVehicleRanges = async (req, res, next) => {
	try {
		const vehicleRange = await VehicleRange.find({}).populate("allowedVehicles");
		res.status(200).send(vehicleRange);
	} catch (error) {
		console.error(`Error while fetching vehicle ranges. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while fetching vehicles. Please try again later",
		});
	}
};

export const addVehicleRanges = async (req, res, next) => {
	const {minDistance, maxDistance, allowedVehicles} = req.body;
	try {
		const vehicleRange = await VehicleRange.create({minDistance, maxDistance, allowedVehicles});
		res.status(200).send(vehicleRange);
	} catch (error) {
		console.error(`Error while creating vehicle range. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while adding vehicle range. Please try again later",
		});
	}
};

export const removeVehicleRange = async (req, res, next) => {
	const {id} = req.params;
	try {
		const vehicleRange = await VehicleRange.deleteOne({_id: id});
		res.status(200).send(vehicleRange);
	} catch (error) {
		console.error(`Error while deleting vehicleRange. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while deleting vehicleRange. Please try again later",
		});
	}
};
