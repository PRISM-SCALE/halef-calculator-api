import Payment from "../models/Payment.js";
import {sendOTP} from "./OtpController.js";

export const getAllPayments = async (req, res, next) => {
	try {
		const payments = await Payment.find({});
		res.status(200).send(payments);
	} catch (error) {
		console.error(`Error while fetching payments. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while fetching payments. Please try again later",
		});
	}
};

export const addPayment = async (req, res, next) => {
	try {
		const {name, email, phone, shipmentId, amount, isTermsAndConditionsVerified} = req.body;

		if (isNaN(phone)) {
			res.status(400).send({error: "phone should be the type of Number"});
		}

		if (
			!Boolean(email) &&
			!Boolean(phone) &&
			!Boolean(name) &&
			!Boolean(shipmentId) &&
			!Boolean(amount) &&
			!Boolean(isTermsAndConditionsVerified)
		) {
			res.status(400).send({
				error:
					"name, email, phone, shipmentId, amount and isTermsAndConditionsVerified is mandatory",
			});
		}

		const newPayment = await Payment.create({
			name,
			email,
			phone,
			shipmentId,
			amount,
			isTermsAndConditionsVerified,
		});

		await newPayment.save();

		const verification = await sendOTP(phone);

		if (verification?.status === "pending") {
			return res.status(200).send({
				message: "Successfully created a user, verification is required",
				isVerified: false,
				paymentData: newPayment,
			});
		}

		// const checkPaymentData = Payment.find({phone});

		// if (!checkPaymentData?.isPhoneVerified) {
		// 	const verification = await sendOTP(phone);

		// 	if (verification.status === "pending") {
		// 		return res.status(200).send({
		// 			message: "User Exists, verification is required",
		// 			isVerified: false,
		// 			user: checkPaymentData,
		// 		});
		// 	}
		// } else {
		// 	return res.status(200).send({
		// 		message: "Successfully Verified",
		// 		isVerified: true,
		// 		user: checkPaymentData,
		// 	});
		// }

		// res.status(200).send(payment);
	} catch (error) {
		console.error(`Error while creating payment. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while adding payment. Please try again later",
		});
	}
};
