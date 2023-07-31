import HouseType from "../../models/houseType.js";
import Vehicle from "../../models/vehicle.js";
import RelocationPackageCost from "../../models/relocationPackageCost.js";
import RelocationTransportCost from "../../models/relocationTransportCost.js";

export const relocationCalc = async (req, res, next) => {
	try {
		const {distance, vehicle, packageType, houseType, requireInsurance, goodsValue} = req.body;

		if (isNaN(distance)) return res.status(400).send({error: `distance MUST be a number!`});

		const houseTypeObj = await HouseType.findOne({_id: houseType}).populate("allowedVehicles");
		if (!Boolean(houseTypeObj)) return res.status(400).send({error: `INVALID house type`});

		const isVehicleAllowed = houseTypeObj.allowedVehicles.some((v) => v.id === vehicle);

		if (!Boolean(isVehicleAllowed))
			return res
				.status(400)
				.send({error: `the requested vehicle is NOT allowed for the selected HOUSE TYPE`});

		// to get the vehicle image
		const vehicleTypeObj = await Vehicle.findOne({_id: vehicle});
		const vehicleImage = vehicleTypeObj.imageUrl;
		const vehicleName = vehicleTypeObj.name;

		let insurance = 0;
		if (Boolean(requireInsurance)) {
			if (!Boolean(goodsValue) || isNaN(goodsValue))
				return res.status(400).send({error: `goods value must be a number and is required`});
			insurance = 0.02 * Number(goodsValue);
		}

		const transportCostMap = await RelocationTransportCost.findOne({vehicle})
			.where("minDistance")
			.lt(Number(distance))
			.where("maxDistance")
			.gt(Number(distance))
			.exec();

		if (!Boolean(transportCostMap))
			return res.status(500).send({error: "Error calculating transport cost"});
		const transportCost = transportCostMap?.cost;

		const packageCostMap = await RelocationPackageCost.findOne({packageType, houseType});
		if (!Boolean(packageCostMap))
			return res.status(500).send({error: "Error calculating package cost"});
		const packageCost = packageCostMap?.cost;

		const total = insurance + transportCost + packageCost;

		return res.send({
			image: vehicleImage,
			name: vehicleName,
			currency: "INR",
			costData: [
				{name: "TRANSPORT COST", cost: transportCost, unit: "₹"},
				{name: "PACKAGE COST", cost: packageCost, unit: "₹"},
				{name: "INSURANCE", cost: insurance, unit: "₹"},
				{name: "TOTAL", cost: total, unit: "₹"},
			],
		});
	} catch (error) {
		console.error(`Error while Calculating relocation price`);
		console.log(error);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Calculating relocation price. Please try again later",
		});
	}
};
