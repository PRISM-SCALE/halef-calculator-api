import express from "express";
import {
	addAirAmbulanceCost,
	getBulkAirAmbulanceCost,
	updateAirAmbulanceCost,
} from "../controllers/airAmbulanceCostController.js";

const router = express.Router();

router.post("/", addAirAmbulanceCost);
router.get("/", getBulkAirAmbulanceCost);
router.patch("/:id", updateAirAmbulanceCost);

export default router;
//airAmbulanceAirportCitiesRoute
