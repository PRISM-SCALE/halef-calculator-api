import CourierCargoCost from "../models/courierCargoCost.js";

export const AddBulkCourierCargoCost = async (req, res, next) => {
	try {
    const { data } = req.body;
    
    

	} catch (error) {
		console.error(`Error while Adding RelocationTransportCost Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Adding RelocationTransportCost Details. Please try again later",
		});
	}
};
