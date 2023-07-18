import Service from "../models/service.js";

export const getAllServices = async (req, res, next) => {
	try {
		const services = await Service.find({});
		res.status(200).send(services);
	} catch (error) {
		console.error(`Error while fetching services. Details : ${error}`);
		res
			.status(500)
			.send({
				error: "Internal Server Error",
				message: "Error while fetching services. Please try again later",
			});
	}
};

export const addService = async (req, res, next) => {
	const {name, description, code, icon} = req.body;
	try {
		const service = await Service.create({name, description, code, icon});
		res.status(200).send(service);
	} catch (error) {
		console.error(`Error while creating service. Details : ${error}`);
		res
			.status(500)
			.send({
				error: "Internal Server Error",
				message: "Error while adding service. Please try again later",
			});
	}
};

export const removeService = async (req, res, next) => {
	const {id} = req.params;
	try {
		const service = await Service.deleteOne({_id: id});
		res.status(200).send(service);
	} catch (error) {
		console.error(`Error while deleting service. Details : ${error}`);
		res
			.status(500)
			.send({
				error: "Internal Server Error",
				message: "Error while deleting service. Please try again later",
			});
	}
};
