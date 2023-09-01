import EstimateRequest from "../../models/EstimateRequest.js";
import CourierCargoCost from "../../models/courierCargoCost.js";

export const courierCargoCalc = async (req, res, next) => {
	try {
		const {
			weight,
			length,
			width,
			height,
			carrierCode,
			// region,
			// originPincode,
			// destinationPincode,
			docType,
			userId,
			serviceId,
		} = req.body;

		// const createNewEnquires = await Enquires.create({
		// 	user: userId,
		// 	interests: [{service: serviceId}],
		// });

		// createNewEnquires.save();

		console.log(req.body);

		const createNewEstimateRequest = await EstimateRequest.create({
			service: serviceId,
			user: userId,
		});

		createNewEstimateRequest.save();

		console.log("CARRIER CODE", carrierCode);

		if (isNaN(weight) && weight) return res.status(400).send({error: `weight MUST be a number!`});
		if (isNaN(length)) return res.status(400).send({error: `length MUST be a number!`});
		if (isNaN(width)) return res.status(400).send({error: `width MUST be a number!`});
		if (isNaN(height)) return res.status(400).send({error: `height MUST be a number!`});

		const transportCostMap = await CourierCargoCost.findOne({carrierCode, docType})
			.where("minWeight")
			.lt(Number(weight))
			.where("maxWeight")
			.gt(Number(weight))
			.exec();

		if (!Boolean(transportCostMap))
			return res.status(500).send({error: "Error calculating transport cost"});

		const transportCost = transportCostMap?.cost;

		let volumetricWeight;

		if (carrierCode === "ground_express") {
			volumetricWeight = (Number(length) * Number(width) * Number(height)) / 4500;
		} else {
			volumetricWeight = (Number(length) * Number(width) * Number(height)) / 4750;
		}

		const total = transportCost * weight;

		if (Boolean(total)) {
			await EstimateRequest.findOneAndUpdate(
				{service: serviceId, userId: userId},
				{estimatedCost: total, isEstimationSuccess: true},
				{new: true}
			);
		}

		// RESPONSE DATA
		// return res.send({ currency: "INR", transportCost, total, volumetricWeight, carrierCode });
		const carrierCodeUppercase = carrierCode?.toUpperCase();

		console.log("carrierCodeUppercase", carrierCodeUppercase);

		const carrierCodeCost = carrierCodeUppercase.replace(/_/g, " ");

		console.log("carrierCodeCost", carrierCodeCost);

		return res.send({
			image: "",
			name: "COURIER & CARGO",
			currency: "INR",
			costData: [
				{name: "TRANSPORT COST/KG", cost: transportCost, unit: "₹"},
				{name: "WEIGHT", cost: weight, unit: "kg"},
				{name: "CARRIER CODE", cost: carrierCodeCost, unit: ""},
				{name: "VOLUMETRIC WEIGHT", cost: Math.round(volumetricWeight), unit: "kg"},
				{name: "TOTAL", cost: total, unit: "₹"},
			],
		});
	} catch (error) {
		console.error(`Error while Calculating courier % cargo price`);
		console.log(error.message);
		res.status(500).send({
			error: error.message,
			message: "Error while Calculating courier % cargo price. Please try again later",
		});
	}
};
