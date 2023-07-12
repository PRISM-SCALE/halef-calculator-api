import CourierCargoCost from "../../models/courierCargoCost";

export const courierCargoCalc = async (req, res, next) => {
	try {
	} catch (error) {
		console.error(`Error while Calculating relocation price`);
		console.log(error);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while Calculating relocation price. Please try again later",
		});
	}
};
