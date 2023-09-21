import express from "express";
import {
	addAirAmbulanceCost,
	getBulkAirAmbulanceCost,
} from "../controllers/airAmbulanceCostController.js";

const router = express.Router();

router.post("/", addAirAmbulanceCost);
router.get("/", getBulkAirAmbulanceCost);

export default router;
//airAmbulanceAirportCitiesRoute
