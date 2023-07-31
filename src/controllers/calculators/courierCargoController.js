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
		} = req.body;

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

		// RESPONSE DATA
		// return res.send({ currency: "INR", transportCost, total, volumetricWeight, carrierCode });
		return res.send({
			image: "",
			name: "COURIER & CARGO",
			currency: "INR",
			costData: [
				{name: "TRANSPORT COST", cost: transportCost, unit: "₹"},
				{name: "CARRIER CODE", cost: carrierCode, unit: ""},
				{name: "VOLUMETRIC WEIGHT", cost: volumetricWeight, unit: "kg"},
				{name: "TOTAL", cost: total, unit: "₹"},
			],
		});
	} catch (error) {
		console.error(`Error while Calculating courier % cargo price`);
		console.log(error);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Calculating courier % cargo price. Please try again later",
		});
	}
};
