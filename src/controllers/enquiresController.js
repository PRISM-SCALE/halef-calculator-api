import Enquires from "../models/Enquires.js";

export const getAllEnquires = async (req, res, next) => {
	try {
		const enquires = await Enquires.find({}).populate("user").populate("services").exec();
		res.status(200).send(enquires);
	} catch (error) {
		console.error(`Error while fetching enquires. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while fetching enquires. Please try again later",
		});
	}
};
