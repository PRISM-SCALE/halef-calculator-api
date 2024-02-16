import express from "express";
// import {reSendOTP, verifyUserToken, verifyPaymentToken} from "../controllers/OtpController.js";
import {
	resendPaymentOTP,
	resendUserOTP,
	verifyPaymentToken,
	verifyUserToken,
} from "../controllers/Fast2SmsOTPController.js";

const router = express.Router();

router.post("/user/resend", resendUserOTP);
router.post("/payment/resend", resendPaymentOTP);
router.post("/verify_user", verifyUserToken);
router.post("/verify_payment", verifyPaymentToken);

export default router;
//airAmbulanceAirportCitiesRoute
