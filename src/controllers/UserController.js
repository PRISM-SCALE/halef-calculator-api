import User from "../models/User.js";
import Service from "../models/service.js";
import {sendOTP} from "./OtpController.js";

let COUNT = 0;

export const createUser = async (req, res) => {
	try {
		const {name, email, phone, service} = req.body;

		if (isNaN(phone)) {
			res.status(400).send({error: "phone should be the type of Number"});
		}

		if (!Boolean(email) && !Boolean(phone) && !Boolean(name)) {
			res.status(400).send({error: "name, email & phone is mandatory"});
		}

		const checkUser = await User.findOne({phone});
		// const serviceObj = await Service.findOne({_id: service});

		if (!Boolean(checkUser)) {
			const createNewUser = await User.create({
				name,
				email,
				phone,
				interests: [{service: service, count: COUNT + 1}],
			});
			// .populate("name")
			// .populate("description")
			// .exec();

			await createNewUser.save();

			const verification = await sendOTP(phone);

			if (verification?.status === "pending") {
				return res.status(200).send({
					message: "Successfully created a user, verification is required",
					isVerified: false,
					user: createNewUser,
				});
			}
		}

		if (Boolean(checkUser)) {
			const pushInterests = await User.findOne({interests: [{service: service, count: COUNT++}]});
		}

		// USER NOT VERIFIED SEND OTP
		if (!checkUser?.isPhoneVerified) {
			const verification = await sendOTP(phone);

			if (verification.status === "pending") {
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
