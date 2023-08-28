import Enquires from "../../models/Enquires.js";
import TruckingTransportCost from "../../models/truckingTransportCost.js";

export const truckingCalc = async (req, res, next) => {
	try {
		const {distance, vehicle, userId, serviceId} = req.body;

		const createNewEnquires = await Enquires.create({
			user: userId,
			interests: [{service: serviceId}],
		});

		createNewEnquires.save();

		if (isNaN(distance)) return res.status(400).send({error: `distance MUST be a number!`});

		const transportCostMap = await TruckingTransportCost.findOne({vehicle})
			.where("minDistance")
			.lt(Number(distance))
			.where("maxDistance")
			.gt(Number(distance))
			.exec();

		console.log(vehicle, distance);
		console.log(transportCostMap?.vehicle);

		if (!Boolean(transportCostMap))
			return res.status(500).send({error: "Error calculating transport cost"});

		const transportCost = transportCostMap?.cost;

		const total = transportCost * distance;

		// return res.send({currency: "INR", transportCost, total});
		return res.send({
			image: "",
			name: "TRUCKING",
			currency: "INR",
			costData: [
				{name: "TRANSPORT COST", cost: transportCost, unit: "₹"},
				{name: "TOTAL", cost: total, unit: "₹"},
			],
		});
	} catch (error) {
		console.error(`Error while Calculating trucking price`);
		console.log(error);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Calculating trucking price. Please try again later",
		});
	}
};
