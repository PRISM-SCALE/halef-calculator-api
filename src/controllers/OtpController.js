import dotenv from "dotenv";
import twilio from "twilio";

import User from "../models/User.js";
import Payment from "../models/Payment.js";

// ! DO NOT REMOVE, ENV FILE NOT READ IF THE dotenv.config() IF NOT PROVIDED
dotenv.config();

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;

const client = twilio(accountSid, authToken);

// FETCHING THE TWILIO BALANCE
// client.balance.fetch().then((data) => {
// 	const balance = Math.round(data.balance * 100) / 100;
// 	const currency = data.currency;
// 	console.log(`Your account balance is ${balance} ${currency}.`);
// });

export const createOTP = async (phone) => {
	const verification = await client.verify.v2
		.services(serviceSid)
		.verifications.create({to: `+91${phone}`, channel: "sms"});

	return verification;
};

export const sendOTP = async (phone) => {
	return await createOTP(phone);
};

export const reSendOTP = async (req, res) => {
	try {
		const {phone} = req.body;
		const data = await createOTP(phone);

		return res.status(200).send({message: "OTP Successfully sent"});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while creating user. Please try again later",
		});
	}
};

export const verifyPaymentToken = async (req, res) => {
	try {
		const {phone, code, customerId} = req.body;
		console.log("PID CUSTOMER", customerId);
		const verification_check = await client.verify.v2
			.services(serviceSid)
			.verificationChecks.create({to: `+91${phone}`, code: code});

		console.log("DATA", phone, code);

		console.log(verification_check?.status);

		if (verification_check?.status === "approved") {
			const paymentData = await Payment.findOneAndUpdate(
				{_id: customerId},
				{isPhoneVerified: true},
				{new: true}
			);

			if (!paymentData) {
				return res.status(500).send({
					error: "payment data not found",
				});
			}

			return res.status(200).send({
				message: "You have been successfully verified",
				paymentData,
			});
		}

		return res.status(400).send({
			error: "Please try again, your OTP was unable to be Verified",
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while creating Payment. Please try again later",
		});
	}
};

export const verifyUserToken = async (req, res) => {
	try {
		const {phone, code} = req.body;
		const verification_check = await client.verify.v2
			.services(serviceSid)
			.verificationChecks.create({to: `+91${phone}`, code: code});

		console.log("DATA", phone, code);

		console.log(verification_check?.status);

		if (verification_check?.status === "approved") {
			const user = await User.findOneAndUpdate({phone}, {isPhoneVerified: true}, {new: true});

			if (!user) {
				return res.status(500).send({
					error: "User not found",
				});
			}

			return res.status(200).send({
				message: "You have been successfully verified",
				user,
			});
		}

		return res.status(400).send({
			error: "Please try again, your OTP was unable to be Verified",
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while creating user. Please try again later",
		});
	}
};
