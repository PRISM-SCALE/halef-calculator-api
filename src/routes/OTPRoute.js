import express from "express";
import {reSendOTP, verifyUserToken, verifyPaymentToken} from "../controllers/OtpController.js";

const router = express.Router();

router.post("/resend", reSendOTP);
router.post("/verify_user", verifyUserToken);
router.post("/verify_payment", verifyPaymentToken);

export default router;
//airAmbulanceAirportCitiesRoute
