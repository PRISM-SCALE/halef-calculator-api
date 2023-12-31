import Vehicle from "../models/vehicle.js";

export const getAllVehicles = async (req, res, next) => {
	try {
		const vehicles = await Vehicle.find({});
		res.status(200).send(vehicles);
	} catch (error) {
		console.error(`Error while fetching vehicles. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while fetching vehicles. Please try again later",
		});
	}
};

export const getOneVehicle = async (req, res, next) => {
	try {
		const {id} = req.params;
		const vehicle = await Vehicle.findOne({_id: id});
		res.status(200).send(vehicle);
	} catch (error) {
		console.error(`Error while fetching vehicle. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while fetching vehicle. Please try again later",
		});
	}
};

export const updateVehicle = async (req, res, next) => {
	try {
		const id = req.params.id;
		const updatedValues = req.body;
		const vehicle = await Vehicle.findOneAndUpdate({_id: id}, {...updatedValues}, {new: true});
		res.status(200).send(vehicle);
	} catch (error) {
		console.error(`Error while fetching vehicle. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while fetching vehicle. Please try again later",
		});
	}
};

export const addVehicle = async (req, res, next) => {
	const {
		name,
		length,
		width,
		height,
		imageUrl,
		isInterStateAllowed,
		relocationRange,
		truckingRange,
		sort
	} = req.body;
	try {
		const vehicle = await Vehicle.create({
			name,
			length,
			width,
			height,
			imageUrl,
			isInterStateAllowed,
			relocationRange,
			truckingRange,
			sort
		});
		res.status(200).send(vehicle);
	} catch (error) {
		console.error(`Error while creating vehicle. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while adding vehicle. Please try again later",
		});
	}
};

export const removeVehicle = async (req, res, next) => {
	const {id} = req.params;
	try {
		const vehicle = await Vehicle.findOneAndUpdate({_id: id}, {isActive: false}, {new: true});
		res.status(200).send(vehicle);
	} catch (error) {
		console.error(`Error while deleting vehicle. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while deleting vehicle. Please try again later",
		});
	}
};
