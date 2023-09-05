import HouseType from "../models/houseType.js";

export const getAllHouseTypes = async (req, res, next) => {
	try {
		const houseTypes = await HouseType.find({}).populate("allowedVehicles");
		res.status(200).send(houseTypes);
	} catch (error) {
		console.error(`Error while fetching houseTypes. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while fetching houseTypes. Please try again later",
		});
	}
};

export const addHouseType = async (req, res, next) => {
	const {type, allowedVehicles} = req.body;
	try {
		const houseType = await HouseType.create({
			type,
			allowedVehicles,
		});
		res.status(200).send(houseType);
	} catch (error) {
		console.error(`Error while creating houseType. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while adding houseType. Please try again later",
		});
	}
};

export const removeHouseType = async (req, res, next) => {
	const {id} = req.params;
	try {
		const houseType = await HouseType.deleteOne({_id: id});
		res.status(200).send(houseType);
	} catch (error) {
		console.error(`Error while deleting houseType. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while deleting houseType. Please try again later",
		});
	}
};
