import EstimateRequest from "../../models/EstimateRequest.js";
import WarehousePackageCost from "../../models/warehousePackageCost.js";
import WarehouseStorageCost from "../../models/warehouseStorageCost.js";

export const warehouseCalc = async (req, res, next) => {
	try {
		const {cft, packageType, durationInDays, userId, serviceId} = req.body;

		// const createNewEnquires = await Enquires.create({
		// 	user: userId,
		// 	interests: [{service: serviceId}],
		// });

		// createNewEnquires.save();

		const createNewEstimateRequest = await EstimateRequest.create({
			service: serviceId,
			user: userId,
		});

		createNewEstimateRequest.save();

		if (Number(cft) > 2000) {
			return res.send({message: "Thank you we will ge back"});
		} else {
			if (isNaN(cft) || isNaN(durationInDays))
				return res.status(400).send({error: `cft & durationInDays MUST be a number!`});

			const storageCostMap = await WarehouseStorageCost.findOne({cft})
				.where("minDays")
				.lte(Number(durationInDays))
				.where("maxDays")
				.gte(Number(durationInDays))
				.exec();

			console.log("storageCostMap", storageCostMap);

			if (!Boolean(storageCostMap))
				return res.status(500).send({error: "Error calculating storage cost"});

			const storageCost = storageCostMap?.cost * cft;

			console.log("storageCost", storageCost);

			const packageCostMap = await WarehousePackageCost.findOne({packageType}).populate(
				"packageType"
			);
			if (!Boolean(packageCostMap))
				return res.status(500).send({error: "Error calculating package cost"});
			const packageCost = packageCostMap?.cost * cft;

			const total = storageCost + packageCost;

			createNewEstimateRequest.estimatedCost = total;
			createNewEstimateRequest.isEstimationSuccess = true;

			// Throws => ParallelSaveError: Can't save() the same doc multiple times in parallel?
			// createNewEstimateRequest.save();

			// return res.send({currency: "INR", storageCost, packageCost, total});

			// * TEST THIS FUNCTIONALITY
			if (packageCostMap?.packageType?.code === "NONE") {
				return res.send({
					image: "",
					name: "WAREHOUSE",
					currency: "INR",
					costData: [
						{name: "STORAGE COST", cost: storageCost, unit: "₹"},
						{name: "HANDLING COST", cost: packageCost, unit: "₹"},
						{name: "TOTAL", cost: total, unit: "₹"},
					],
				});
			} else {
				return res.send({
					image: "",
					name: "WAREHOUSE",
					currency: "INR",
					costData: [
						{name: "STORAGE COST", cost: storageCost, unit: "₹"},
						{name: "PACKAGING COST", cost: packageCost, unit: "₹"},
						{name: "TOTAL", cost: total, unit: "₹"},
					],
				});
			}
		}
	} catch (error) {
		console.error(`Error while Calculating warehouse price`);
		console.log(error);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Calculating warehouse price. Please try again later",
		});
	}
};
