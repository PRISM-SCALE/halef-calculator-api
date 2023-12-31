import EstimateRequest from "../../models/EstimateRequest.js";
import TruckingTransportCost from "../../models/truckingTransportCost.js";

export const truckingCalc = async (req, res, next) => {
	try {
		const {distance, vehicle, userId, serviceId, isDifferentState, estimates} = req.body;

		// const createNewEnquires = await Enquires.create({
		// 	user: userId,
		// 	interests: [{service: serviceId}],
		// });

		// createNewEnquires.save();

		const createNewEstimateRequest = await EstimateRequest.create({
			service: serviceId,
			user: userId,
			estimates,
		});

		// Throws => ParallelSaveError: Can't save() the same doc multiple times in parallel?
		// createNewEstimateRequest.save();

		if (isNaN(distance)) return res.status(400).send({error: `distance MUST be a number!`});

		console.log("vehicle", vehicle);

		const transportCostMap = await TruckingTransportCost.findOne({vehicle})
			.where("minDistance")
			.lte(Number(distance))
			.where("maxDistance")
			.gte(Number(distance))
			.exec();

		console.log("transportCostMap", transportCostMap);

		if (!Boolean(transportCostMap))
			return res.status(500).send({error: "Error calculating transport cost"});

		const transportCost = transportCostMap?.cost;

		const total = transportCost * distance;

		createNewEstimateRequest.estimatedCost = total;
		createNewEstimateRequest.isEstimationSuccess = true;

		createNewEstimateRequest.save();

		// return res.send({currency: "INR", transportCost, total});
		return res.send({
			image: "",
			name: "TRUCKING",
			currency: "INR",
			costData: [
				{name: "TRANSPORT COST/KM", cost: transportCost, unit: "₹"},
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
