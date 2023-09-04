import HouseType from "../../models/houseType.js";
import Vehicle from "../../models/vehicle.js";
import RelocationPackageCost from "../../models/relocationPackageCost.js";
import RelocationTransportCost from "../../models/relocationTransportCost.js";
import EstimateRequest from "../../models/EstimateRequest.js";

export const relocationCalc = async (req, res, next) => {
	try {
		const {
			distance,
			vehicle,
			packageType,
			houseType,
			requireInsurance,
			goodsValue,
			userId,
			serviceId,
			estimates,
		} = req.body;

		// const createNewEnquires = await Enquires.create({
		// 	user: userId,
		// 	interests: {service: serviceId},
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

		if (transportCost !== 0) {
			const packageCostMap = await RelocationPackageCost.findOne({packageType, houseType}).populate(
				"packageType"
			);

			if (!Boolean(packageCostMap))
				return res.status(500).send({error: "Error calculating package cost"});
			const packageCost = packageCostMap?.cost;

			const total = insurance + transportCost + packageCost;

			createNewEstimateRequest.estimatedCost = total;
			createNewEstimateRequest.isEstimationSuccess = true;

			createNewEstimateRequest.save();

			if (packageCostMap?.packageType?.code === "NONE") {
				return res.send({
					image: vehicleImage,
					name: vehicleName,
					currency: "INR",
					costData: [
						{name: "TRANSPORT COST", cost: transportCost, unit: "₹"},
						{name: "HANDLING COST", cost: packageCost, unit: "₹"},
						{name: "INSURANCE", cost: insurance, unit: "₹"},
						{name: "TOTAL", cost: total, unit: "₹"},
					],
				});
			} else {
				return res.send({
					image: vehicleImage,
					name: vehicleName,
					currency: "INR",
					costData: [
						{name: "TRANSPORT COST", cost: transportCost, unit: "₹"},
						{name: "PACKAGING COST", cost: packageCost, unit: "₹"},
						{name: "INSURANCE", cost: insurance, unit: "₹"},
						{name: "TOTAL", cost: total, unit: "₹"},
					],
				});
			}
		} else {
			return res.send({
				image: vehicleImage,
				name: vehicleName,
				isError: true,
				message: `The Vehicle ${vehicleName} is not allowed, please try other vehicle options`,
			});
		}
	} catch (error) {
		console.error(`Error while Calculating relocation price`);
		console.log(error);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Calculating relocation price. Please try again later",
		});
	}
};
