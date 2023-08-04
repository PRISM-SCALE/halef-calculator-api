import express from "express";
import {reSendOTP, verifyToken} from "../controllers/OtpController.js";

const router = express.Router();
``;

router.post("/resend", reSendOTP);
router.post("/verify", verifyToken);

export default router;
//airAmbulanceAirportCitiesRoute
