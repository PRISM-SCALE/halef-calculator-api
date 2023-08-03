import express from "express";
import {verifyOTP} from "../controllers/OtpController.js";

const router = express.Router();

router.post("/verify", verifyOTP);

export default router;
//airAmbulanceAirportCitiesRoute
