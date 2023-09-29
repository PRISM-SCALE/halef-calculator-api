import PaymentId from "../models/PaymentIds.js";

export const getAllPaymentIds = async (req, res, next) => {
	try {
		const paymentIdData = await PaymentId.find({});
		return res.status(200).send(paymentIdData);
	} catch (error) {
		console.error(`Error while fetching payment ids. Details : ${error}`);
		return res.status(500).send({
			error: "Internal Server Error",
			message: "Error while fetching payment ids. Please try again later",
		});
	}
};

export const getPaymentId = async (req, res, next) => {
	try {
		const {id} = req.params;
		const paymentIdData = await PaymentId.findOne({_id: id});
		return res.status(200).send(paymentIdData);
	} catch (error) {
		console.error(`Error while fetching payment id. Details : ${error}`);
		return res.status(500).send({
			error: "Internal Server Error",
			message: "Error while fetching payment id. Please try again later",
		});
	}
};

export const addPaymentIds = async (req, res, next) => {
	try {
		const data = req.body;

		const paymentIdData = await PaymentId.create({...data});
		return res.status(200).send(paymentIdData);
	} catch (error) {
		console.error(`Error while creating payment ids. Details : ${error}`);
		return res.status(500).send({
			error: "Internal Server Error",
			message: "Error while creating payment ids. Please try again later",
		});
	}
};

export const editPaymentId = async (req, res, next) => {
	try {
		const {id} = req.params;
		const updatedValues = req.body;

		const isPIDAvailable = await PaymentId.findOne({pid: updatedValues?.pid});

		if (isPIDAvailable?.pid !== updatedValues?.pid) {
			const paymentIdData = await PaymentId.findOneAndUpdate(
				{_id: id},
				{...updatedValues},
				{new: true}
			);
			return res.status(200).send(paymentIdData);
		} else {
			return res.status(400).send({
				isDuplicate: true,
				error: "The provided Payment ID already exist!",
			});
		}
	} catch (error) {
		console.error(`Error while updating payment ids. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while updating payment ids. Please try again later",
		});
	}
};

export const editPaymentIdStatus = async (req, res, next) => {
	try {
		const {id} = req.params;
		const {status} = req.body;

		const paymentIdData = await PaymentId.findOneAndUpdate(
			{_id: id},
			{status: status},
			{new: true}
		);
		return res.status(200).send(paymentIdData);
	} catch (error) {
		console.error(`Error while updating payment ids. Details : ${error}`);
		return res.status(500).send({
			error: "Internal Server Error",
			message: "Error while updating payment ids. Please try again later",
		});
	}
};

export const removePaymentId = async (req, res, next) => {
	try {
		const {id} = req.params;
		const paymentIdData = await PaymentId.deleteOne({_id: id});
		return res.status(200).send(paymentIdData);
	} catch (error) {
		console.error(`Error while deleting payment ids. Details : ${error}`);
		return res.status(500).send({
			error: "Internal Server Error",
			message: "Error while deleting payment ids. Please try again later",
		});
	}
};
