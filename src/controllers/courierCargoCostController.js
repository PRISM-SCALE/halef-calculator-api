import CourierCargoCost from "../models/courierCargoCost.js";

export const AddBulkCourierCargoTransportCost = async (req, res, next) => {
	try {
		const {data} = req.body;

		const objects = data.map((item, index) => {
			const {carrierCode, minWeight, maxWeight, cost, docType} = item;
			if (isNaN(minWeight) || isNaN(maxWeight) || isNaN(cost))
				return res.status(400).send({error: `Weight and cost MUST be a number`});

			return {carrierCode, minWeight, maxWeight, cost, docType};
		});

		const response = await CourierCargoCost.insertMany(objects);
		res.status(200).send(response);
	} catch (error) {
		console.error(`Error while Adding CourierCargoCost Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Adding CourierCargoCost Details. Please try again later",
		});
	}
};

export const getBulkCourierCargoTransportCost = async (req, res, next) => {
	try {
		const courierCargoTransportCost = await CourierCargoCost.find({});
		res.status(200).send(courierCargoTransportCost);
	} catch (error) {
		console.error(`Error while Fetching CourierCargoCost Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Fetching CourierCargoCost Details. Please try again later",
		});
	}
};
