import CourierCargoCost from "../../models/courierCargoCost";

export const courierCargoCalc = async (req, res, next) => {
	try {
		const {
			weight,
			length,
			width,
			height,
			shipment,
			region,
			originPincode,
			destinationPincode,
			docType,
		} = res.body;

		if (isNaN(weight)) return res.status(400).send({error: `weight MUST be a number!`});
		if (isNaN(length)) return res.status(400).send({error: `length MUST be a number!`});
		if (isNaN(width)) return res.status(400).send({error: `width MUST be a number!`});
		if (isNaN(height)) return res.status(400).send({error: `height MUST be a number!`});

		const transportCostMap = await CourierCargoCost.findOne({carrierCode: shipment, docType})
			.where("minWeight")
			.lt(Number(weight))
			.where("maxWeight")
			.gt(Number(weight))
			.exec();

		if (!Boolean(transportCostMap))
			return res.status(500).send({error: "Error calculating transport cost"});

		const transportCost = transportCostMap?.cost;

		let volumetricWeight;

		if (shipment === "ground_express") {
			volumetricWeight = (length * width * height) / 4500;
		} else {
			volumetricWeight = (length * width * height) / 4750;
		}

		const total = transportCost;

		return res.send({currency: "INR", transportCost, total, volumetricWeight});
	} catch (error) {
		console.error(`Error while Calculating courier % cargo price`);
		console.log(error);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Calculating courier % cargo price. Please try again later",
		});
	}
};
