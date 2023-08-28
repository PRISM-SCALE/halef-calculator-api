import HouseType from "../models/houseType.js";
import PackageType from "../models/packageType.js";
import RelocationPackageCost from "../models/relocationPackageCost.js";

export const AddBulkRelocationPackageCost = async (req, res, next) => {
	try {
		const {data} = req.body;

		const houseTypes = await HouseType.find({});
		const packageTypes = await PackageType.find({});

		const objects = data.map((item, index) => {
			const {houseType, packageType, cost} = item;
			const htObj = houseTypes.find((ht) => ht.type === houseType);

			if (!Boolean(htObj))
				res
					.status(400)
					.send({error: `'${houseType}' - INVALID House type or House Type NOT FOUND`});
			const ptObj = packageTypes.find((pt) => pt.code === packageType);
			if (!Boolean(ptObj))
				res
					.status(400)
					.send({error: `'${packageType}' - INVALID Package type or Package Type NOT FOUND`});
			if (isNaN(cost)) return res.status(400).send({error: `cost MUST be a number`});
			return {packageType: ptObj._id, houseType: htObj._id, cost};
		});
		// console.log(objects);
		const response = await RelocationPackageCost.insertMany(objects);
		res.status(200).send(response);
	} catch (error) {
		console.error(`Error while Adding RelocationPackageCost Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Adding RelocationPackageCost Details. Please try again later",
		});
	}
};

export const getBulkRelocationPackageCost = async (req, res) => {
	try {
		const result = await RelocationPackageCost.find()
			.populate("packageType")
			.populate("houseType")
			.exec();

		return res.status(200).send(result);
	} catch (error) {
		console.error(`Error while Fetching RelocationPackageCost Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Fetching RelocationPackageCost Details. Please try again later",
		});
	}
};
