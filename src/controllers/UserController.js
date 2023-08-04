import User from "../models/User.js";
import {sendOTP} from "./OtpController.js";

export const createUser = async (req, res) => {
	console.log(req.body);
	const {name, email, phone} = req.body;
	try {
		if (!isNaN(phone)) {
			res.status(400).send({error: "phone should be the type of Number"});
		}

		if (Boolean(email) && Boolean(phone)) {
			res.status(400).send({error: "email & phone is mandatory"});
		}

		const checkUser = await User.findOne({email, phone});

		console.log(checkUser);

		if (!Boolean(checkUser)) {
			const createNewUser = await User.create({
				name,
				email,
				phone,
			});
			await createNewUser.save();

			const verification = sendOTP(phone);

			if (verification.status === "verified") {
				return res.status(200).send({message: "Successfully created a user", isVerified: true});
			} else
				return res.status(200).send({
					message: "Successfully created a user, Verification is Required",
					isVerified: false,
				});
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
