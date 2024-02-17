import User from "../models/User.js";
import {createUserOTP} from "./Fast2SmsOTPController.js";

export const createUser = async (req, res) => {
	try {
		const {name, email, phone} = req.body;

		if (isNaN(phone)) {
			res.status(400).send({error: "phone should be the type of Number"});
		}

		if (!Boolean(email) && !Boolean(phone) && !Boolean(name)) {
			res.status(400).send({error: "name, email & phone is mandatory"});
		}

		// interests: [{service}]
		const checkUser = await User.findOne({phone});

		if (!Boolean(checkUser)) {
			const createNewUser = await User.create({
				name,
				email,
				phone,
			});

			await createNewUser.save();

			// const verification = await createOTP(phone);

			// if (verification?.status === "pending") {
			// 	return res.status(200).send({
			// 		message: "Successfully created a user, verification is required",
			// 		isVerified: false,
			// 		user: createNewUser,
			// 	});
			// }

			const data = await createUserOTP(phone);
			console.log("USER CONTROLLER", data);

			if (data?.return) {
				return res.status(200).send({
					message: "Successfully created a user, verification is required",
					isVerified: false,
					user: createNewUser,
				});
			}
		}

		// USER NOT VERIFIED SEND OTP
		if (!checkUser?.isPhoneVerified) {
			// 	const verification = await sendOTP(phone);

			// 	if (verification.status === "pending") {
			// 		return res.status(200).send({
			// 			message: "User Exists, verification is required",
			// 			isVerified: false,
			// 			user: checkUser,
			// 		});
			// 	}
			// } else {
			// 	return res.status(200).send({
			// 		message: "Successfully Verified",
			// 		isVerified: true,
			// 		user: checkUser,
			// 	});
			// }

			const data = await createUserOTP(phone);

			if (data?.return) {
				return res.status(200).send({
					message: "User Exists, verification is required",
					isVerified: false,
					user: checkUser,
				});
			}
		} else {
			return res.status(200).send({
				message: "Successfully Verified",
				isVerified: true,
				user: checkUser,
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
