import RelocationTransportCost from "../models/relocationTransportCost.js";
import Vehicle from "../models/vehicle.js";

export const AddBulkRelocationTransportCost = async (req, res, next) => {
	try {
		const {data} = req.body;
		const vehicles = await Vehicle.find({});
		const objects = data.map((item, index) => {
			const {vehicle, minDistance, maxDistance, cost} = item;
			const vehicleObj = vehicles.find((vItem) => vItem.name === vehicle);
			if (!Boolean(vehicleObj))
				return res.status(400).send({error: `'${vehicle}' - INVALID VEHICLE or VEHICLE NOT FOUND`});
			if (isNaN(minDistance) || isNaN(maxDistance) || isNaN(cost))
				return res.status(400).send({error: `Distances and cost MUST be a number`});
			return {vehicle: vehicleObj._id, minDistance, maxDistance, cost};
		});
		// console.log(objects);
		const response = await RelocationTransportCost.insertMany(objects);
		res.status(200).send(response);
	} catch (error) {
		console.error(`Error while Adding RelocationTransportCost Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Adding RelocationTransportCost Details. Please try again later",
		});
	}
};

export const getRelocationTransportCost = async (req, res) => {
	try {
		const result = await RelocationTransportCost.find().populate("vehicle");

		return res.status(200).send(result);
	} catch (error) {
		console.error(`Error while Fetching RelocationTransportCost Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Fetching RelocationTransportCost Details. Please try again later",
		});
	}
};
