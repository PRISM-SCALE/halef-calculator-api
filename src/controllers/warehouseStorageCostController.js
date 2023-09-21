import WarehouseStorageCost from "../models/warehouseStorageCost.js";

export const AddBulkWarehouseStorageCost = async (req, res, next) => {
	try {
		const {data} = req.body;
		const objects = data.map((item, index) => {
			const {cft, minDays, maxDays, cost, sqft} = item;

			if (isNaN(minDays) || isNaN(maxDays) || isNaN(cost) || isNaN(sqft) || isNaN(cft))
				return res
					.status(400)
					.send({error: `minDays, maxDays, sqft, cft and cost MUST be a number`});

			return {cft, minDays, maxDays, cost, sqft};
		});

		const response = await WarehouseStorageCost.insertMany(objects);
		res.status(200).send(response);
	} catch (error) {
		console.error(`Error while Adding WarehouseStorageCost Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Adding WarehouseStorageCost Details. Please try again later",
		});
	}
};

export const getBulkWarehouseStorageCost = async (req, res, next) => {
	try {
		const warehouseStorageCost = await WarehouseStorageCost.find({});
		res.status(200).send(warehouseStorageCost);
	} catch (error) {
		console.error(`Error while Fetching WarehouseStorageCost Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Fetching WarehouseStorageCost Details. Please try again later",
		});
	}
};
