import User from "../models/User.js";
import {sendOTP} from "./OtpController.js";

export const createUser = async (req, res) => {
	try {
		const {name, email, phone} = req.body;

		if (Boolean(email) && Boolean(phone)) {
			res.status(400).send({error: "email & phone is mandatory"});
		}

		const checkUser = await User.findOne({email, phone});

		if (!checkUser) {
			const createNewUser = await User.create({
				name,
				email,
				phone,
				isPhoneVerified: false,
				isEmailVerified: false,
			});
			await createNewUser.save();

			sendOTP(phone);

			return res.status(200).send({message: "Successfully created a user"});
		}

		return res.status(200).send({});
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
