import WarehousePackageCost from "../../models/warehousePackageCost.js";
import WarehouseStorageCost from "../../models/warehouseStorageCost.js";

export const warehouseCalc = async (req, res, next) => {
	try {
		const {} = req.body;

		// return res.send({currency: "INR", transportCost, packageCost, insurance, total});
	} catch (error) {
		console.error(`Error while Calculating relocation price`);
		console.log(error);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Calculating relocation price. Please try again later",
		});
	}
};
