import WarehousePackageCost from "../../models/warehousePackageCost.js";
import WarehouseStorageCost from "../../models/warehouseStorageCost.js";

export const warehouseCalc = async (req, res, next) => {
	try {
		const {cft, packageType, durationInDays} = req.body;

		if (Number(cft) > 2000) {
			return res.send({message: "Thank you we will ge back"});
		} else {
			if (isNaN(cft) || isNaN(durationInDays))
				return res.status(400).send({error: `cft & durationInDays MUST be a number!`});

			const storageCostMap = await WarehouseStorageCost.findOne({cft})
				.where("minDays")
				.lt(Number(durationInDays))
				.where("maxDays")
				.gt(Number(durationInDays))
				.exec();

			if (!Boolean(storageCostMap))
				return res.status(500).send({error: "Error calculating transport cost"});
			const storageCost = storageCostMap?.cost * cft;

			const packageCostMap = await WarehousePackageCost.findOne({packageType});
			if (!Boolean(packageCostMap))
				return res.status(500).send({error: "Error calculating package cost"});
			const packageCost = packageCostMap?.cost * cft;

			const total = storageCost + packageCost;

			return res.send({currency: "INR", storageCost, packageCost, total});
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
