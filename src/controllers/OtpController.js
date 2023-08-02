import dotenv from "dotenv";
import twilio from "twilio";

// ! DO NOT REMOVE, ENV FILE NOT READ IF THE dotenv.config() IF NOT PROVIDED
dotenv.config();

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;

const client = twilio(accountSid, authToken);

export const sendOTP = async (phone) => {
	const verification = await client.verify.v2
		.services(serviceSid)
		.verifications.create({to: phone, channel: "sms"});

	console.log(verification.status);

	return verification;
};

export const verifyOTP = async (phone, code) => {
	const verification_check = await client.verify.v2
		.services(serviceSid)
		.verificationChecks.create({to: phone, code: code});

	console.log(verification_check.status);

	return verification_check;
};
