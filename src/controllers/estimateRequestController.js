import EstimateRequest from "../models/EstimateRequest.js";
import HouseType from "../models/houseType.js";
import PackageType from "../models/packageType.js";

export const getAllEstimates = async (req, res, next) => {
	try {
		const estimates = await EstimateRequest.find({}).populate("user").populate("service").exec();

		res.status(200).send(estimates);
	} catch (error) {
		console.error(`Error while fetching estimates. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while fetching estimates. Please try again later",
		});
	}
};

export const getOneEstimates = async (req, res, next) => {
	try {
		const id = req.params.id;

		const estimates = await EstimateRequest.findOne({_id: id})
			.populate("user")
			.populate("service")
			.exec();
		res.status(200).send(estimates);
	} catch (error) {
		console.error(`Error while fetching an estimate. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while  fetching an estimate. Please try again later",
		});
	}
};

export const updateOneEstimate = async (req, res, next) => {
	try {
		const id = req.params.id;
		const {isAttended, isAttendedBy} = req.body;

		const estimates = await EstimateRequest.findOneAndUpdate(
			{_id: id},
			{isAttended, isAttendedBy},
			{new: true}
		)
			.populate("user")
			.populate("service")
			.exec();
		res.status(200).send(estimates);
	} catch (error) {
		console.error(`Error while fetching an estimate. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while  fetching an estimate. Please try again later",
		});
	}
};
