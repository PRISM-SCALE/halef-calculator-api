import Payment from "../models/Payment.js";
import PaymentId from "../models/PaymentIds.js";
import {createPaymentOTP} from "./Fast2SmsOTPController.js";

export const getAllCustomerPayments = async (req, res, next) => {
	try {
		const payments = await Payment.find({}).populate("paymentId");
		res.status(200).send(payments);
	} catch (error) {
		console.error(`Error while fetching payments. Details : ${error}`);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while fetching payments. Please try again later",
		});
	}
};

export const addCustomerPayment = async (req, res, next) => {
	try {
		const {name, email, phone, paymentId, amount, isTermsAndConditionsVerified} = req.body;

		if (isNaN(phone)) {
			res.status(400).send({error: "phone should be the type of Number"});
		}

		if (
			!Boolean(email) &&
			!Boolean(phone) &&
			!Boolean(name) &&
			!Boolean(paymentId) &&
			!Boolean(amount) &&
			!Boolean(isTermsAndConditionsVerified)
		) {
			res.status(400).send({
				error:
					"name, email, phone, paymentId, amount and isTermsAndConditionsVerified is mandatory",
			});
		}

		const checkForExistingPID = await PaymentId.findOne({pid: paymentId});

		if (checkForExistingPID?.status === "APPROVED") {
			return res.status(400).send({
				error: "This is an Existing Approved PID, Please provide an alternative PID",
				isError: true,
			});
		}

		if (checkForExistingPID?.status === "REJECTED") {
			return res.status(400).send({
				error: "This is an Existing Rejected PID, Please provide an alternative PID",
				isError: true,
			});
		}

		console.log("*******************************************");
		console.log("*******************************************");
		console.log("CUSTOMER PAYMENT", checkForExistingPID);
		console.log("*******************************************");
		console.log("*******************************************");

		if (checkForExistingPID?.pid === paymentId) {
			const newPayment = await Payment.create({
				name,
				email,
				phone,
				paymentId: checkForExistingPID?._id,
				amount,
				isTermsAndConditionsVerified,
			});

			await newPayment.save();

			// const verification = await sendOTP(phone);

			// const payment = await Payment.findOne({paymentId: newPayment?.paymentId}).populate(
			// 	"paymentId"
			// );

			// if (verification?.status === "pending") {
			// 	return res.status(200).send({
			// 		message: "Successfully created a user, verification is required",
			// 		isVerified: false,
			// 		paymentData: payment,
			// 	});
			// }

			const data = await createPaymentOTP(phone, checkForExistingPID?._id);
			const payment = await Payment.findOne({paymentId: newPayment?.paymentId}).populate(
				"paymentId"
			);
			console.log("PAYMENT CONTROLLER", data);

			if (data?.return) {
				return res.status(200).send({
					message: "Successfully created a user, verification is required",
					isVerified: false,
					paymentData: payment,
				});
			}
		} else {
			return res.status(400).send({
				error: "This Payment Id does not exist, please provide valid PID",
				isError: true,
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
