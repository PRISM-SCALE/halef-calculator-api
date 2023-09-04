import EstimateRequest from "../models/EstimateRequest.js";

export const getAllEstimates = async (req, res, next) => {
	try {
		const enquires = await EstimateRequest.find({}).populate("user").populate("service").exec();
		res.status(200).send(enquires);
	} catch (error) {
		console.error(`Error while fetching enquires. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while fetching enquires. Please try again later",
		});
	}
};

export const getOneEstimates = async (req, res, next) => {
	try {
		const id = req.params.id;

		const enquires = await EstimateRequest.find({_id: id})
			.populate("user")
			.populate("service")
			.exec();
		res.status(200).send(enquires);
	} catch (error) {
		console.error(`Error while fetching an enquiry. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while  fetching an enquiry. Please try again later",
		});
	}
};
