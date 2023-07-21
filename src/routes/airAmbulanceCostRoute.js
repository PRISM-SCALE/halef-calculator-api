import express from "express";
import { addAirAmbulanceCost } from "../controllers/airAmbulanceCostController.js";

const router = express.Router();

router.post("/", addAirAmbulanceCost);

export default router;
//airAmbulanceAirportCitiesRoute