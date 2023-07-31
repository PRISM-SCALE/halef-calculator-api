import express from "express";
import {sendOTP} from "../controllers/OtpController.js";

const router = express.Router();

router.post("/send", sendOTP);
router.post("/status", sendOTP);
router.post("/delivered", sendOTP);

export default router;
//airAmbulanceAirportCitiesRoute
