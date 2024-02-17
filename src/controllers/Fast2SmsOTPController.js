import dotenv from "dotenv";
import random from "random";
import axios from "axios";

import User from "../models/User.js";
import Payment from "../models/Payment.js";

// ! DO NOT REMOVE, ENV FILE NOT READ IF THE dotenv.config() IF NOT PROVIDED
dotenv.config();

const FAST2SMS_API_KEY = process.env.FAST2SMS_API_KEY;
const SENDER_ID = process.env.FAST2SMS_SENDER_ID;
const MESSAGE_ID = process.env.FAST2SMS_MESSAGE_ID;

export const createUserOTP = async (phone) => {
	try {
		const otp = random.int(100000, 999999);

		const updateOTP = await User.findOneAndUpdate({phone}, {otpValue: otp}, {new: true});
		console.log("=============================================================");
		console.log("OTP VALUE", otp);
		console.log("UPDATED OTP", updateOTP);
		console.log("=============================================================");

		// const message = `Your Halef International Calculator OTP is: ${otp}. Do not share it with anyone.`;
		const url = "https://www.fast2sms.com/dev/bulkV2";

		const response = await axios.get(url, {
			params: {
				authorization: FAST2SMS_API_KEY,
				sender_id: SENDER_ID,
				variables_values: `${otp}|10 minutes`, //{#var#} add variable values here
				route: process.env.FAST2SMS_ROUTE,
				numbers: phone,
				message: MESSAGE_ID, //MESSAGE_ID or 164918
			},
		});

		console.log("=============================================================");
		console.log("RESPONSE DATA", response?.data);
		console.log("=============================================================");

		return response?.data;
	} catch (error) {
		console.error("Error creating OTP:", error.message);
		throw error;
	}
};

export const createPaymentOTP = async (phone) => {
	try {
		const otp = random.int(100000, 999999);

		const updateOTP = await Payment.findOneAndUpdate({phone}, {otpValue: otp}, {new: true});
		console.log("=============================================================");
		console.log("OTP VALUE", otp);
		console.log("UPDATED OTP", updateOTP);
		console.log("=============================================================");

		// const message = `Your Halef International Calculator OTP is: ${otp}. Do not share it with anyone.`;
		const url = "https://www.fast2sms.com/dev/bulkV2";

		const response = await axios.get(url, {
			params: {
				authorization: FAST2SMS_API_KEY,
				sender_id: SENDER_ID,
				variables_values: `${otp}|10 minutes`, //{#var#} add variable values here
				route: process.env.FAST2SMS_ROUTE,
				numbers: phone,
				message: MESSAGE_ID, //MESSAGE_ID or 164918
			},
		});

		console.log("=============================================================");
		console.log("RESPONSE DATA", response?.data);
		console.log("=============================================================");

		return response?.data;
	} catch (error) {
		console.error("Error creating OTP:", error.message);
		throw error;
	}
};

// Function to send & resend OTP
export const resendUserOTP = async (req, res) => {
	try {
		const {phone} = req.body;
		const response = await createUserOTP(phone);

		console.log(response);
		return res.status(200).send({message: "OTP Successfully sent", success: true});
	} catch (error) {
		console.error(error);
		res.status(500).send({
			success: false,
			error: "Internal Server Error",
			message: "Error while creating OTP. Please try again later",
		});
	}
};

// Function to send & resend OTP
export const resendPaymentOTP = async (req, res) => {
	try {
		const {phone} = req.body;
		const response = await createPaymentOTP(phone);

		console.log(response);
		return res.status(200).send({message: "OTP Successfully sent", success: true});
	} catch (error) {
		console.error(error);
		res.status(500).send({
			success: false,
			error: "Internal Server Error",
			message: "Error while creating OTP. Please try again later",
		});
	}
};

// Function to verify OTP for user token
export const verifyUserToken = async (req, res) => {
	try {
		const {phone, code} = req.body;
		const verifyOtp = await User.findOne({phone});

		console.log("========================================================");
		console.log("VERIFICATION", phone);
		console.log("VERIFICATION", code);
		console.log("VERIFICATION", verifyOtp?.otpValue);
		console.log("========================================================");

		if (verifyOtp?.otpValue === Number(code)) {
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
		console.error(error);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while verifying OTP. Please try again later",
		});
	}
};

// Function to verify OTP for payment token
export const verifyPaymentToken = async (req, res) => {
	try {
		const {phone, code, customerId} = req.body;

		const verifyOtp = await Payment.findOne({phone});

		console.log("========================================================");
		console.log("VERIFICATION", phone);
		console.log("VERIFICATION", code);
		console.log("VERIFICATION", customerId);
		console.log("VERIFICATION", verifyOtp?.otpValue);
		console.log("========================================================");

		if (verifyOtp?.otpValue === Number(code)) {
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
		console.error(error);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while verifying OTP. Please try again later",
		});
	}
};
