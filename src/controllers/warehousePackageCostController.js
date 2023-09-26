import PackageType from "../models/packageType.js";
import WarehousePackageCost from "../models/warehousePackageCost.js";

export const AddBulkWarehousePackageCost = async (req, res, next) => {
	try {
		const {data} = req.body;

		const packageTypes = await PackageType.find({});

		const objects = data.map((item, index) => {
			const {cft, packageType, cost} = item;

			const ptObj = packageTypes.find((pt) => pt.code === packageType);
			if (!Boolean(ptObj))
				return res
					.status(400)
					.send({error: `'${packageType}' - INVALID Package type or Package Type NOT FOUND`});

			if (isNaN(cost)) return res.status(400).send({error: `cost MUST be a number`});
			if (isNaN(cft)) return res.status(400).send({error: `cft MUST be a number`});

			return {packageType: ptObj._id, cft, cost};
		});
		const response = await WarehousePackageCost.insertMany(objects);
		res.status(200).send(response);
	} catch (error) {
		console.error(`Error while Adding WarehousePackageCost Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Adding WarehousePackageCost Details. Please try again later",
		});
	}
};

export const getBulkWarehousePackageCost = async (req, res, next) => {
	try {
		const warehousePackageCost = await WarehousePackageCost.find({}).populate("packageType");
		res.status(200).send(warehousePackageCost);
	} catch (error) {
		console.error(`Error while Fetching WarehousePackageCost Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Fetching WarehousePackageCost Details. Please try again later",
		});
	}
};
