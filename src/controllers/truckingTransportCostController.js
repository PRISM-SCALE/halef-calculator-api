import TruckingTransportCost from "../models/truckingTransportCost.js";
import Vehicle from "../models/vehicle.js";

export const AddBulkTruckingTransportCost = async (req, res, next) => {
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
		const response = await TruckingTransportCost.insertMany(objects);
		return res.status(200).send(response);
	} catch (error) {
		console.error(`Error while Adding TruckingTransportCost Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Adding TruckingTransportCost Details. Please try again later",
		});
	}
};

export const getBulkTruckingTransportCost = async (req, res, next) => {
	try {
		const truckingTransportCost = await TruckingTransportCost.find({}).populate("vehicle");
		res.status(200).send(truckingTransportCost);
	} catch (error) {
		console.error(`Error while Fetching TruckingTransportCost Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Fetching TruckingTransportCost Details. Please try again later",
		});
	}
};

export const updateTruckingTransportCost = async (req, res) => {
	try {
		const {id} = req.params;
		const {cost} = req.body;

		const result = await TruckingTransportCost.findOneAndUpdate(
			{_id: id},
			{cost},
			{new: true}
		).populate("vehicle");

		return res.status(200).send(result);
	} catch (error) {
		console.error(`Error while Updating TruckingTransportCost Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Updating TruckingTransportCost Details. Please try again later",
		});
	}
};
