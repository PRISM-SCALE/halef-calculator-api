import User from "../models/User.js";
import {sendOTP, verifyToken} from "./OtpController.js";

export const createUser = async (req, res) => {
	try {
		const {name, email, phone} = req.body;

		if (isNaN(phone)) {
			res.status(400).send({error: "phone should be the type of Number"});
		}

		if (!Boolean(email) && !Boolean(phone) && !Boolean(name)) {
			res.status(400).send({error: "name, email & phone is mandatory"});
		}

		const checkUser = await User.findOne({email, phone});

		let otpVerification;

		if (!Boolean(checkUser?.email) && !Boolean(checkUser?.phone)) {
			const createNewUser = await User.create({
				name,
				email,
				phone,
			});

			await createNewUser.save();

			const verification = await sendOTP(phone);
			otpVerification = verification;

			console.log(verification);

			if (verification?.status === "pending") {
				return res.status(200).send({
					message: "Successfully created a user, verification is required",
					isVerified: false,
				});
			}
		}

		if (otpVerification?.status === "pending") {
			return res.status(200).send({
				message: "Successfully created a user, verification is required",
				isVerified: false,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({
			error: "Internal Server Error",
			message: "Error while creating user. Please try again later",
		});
	}
};

export const getUsers = async () => {};
export const updateUser = async () => {};
export const deleteUser = async () => {};
