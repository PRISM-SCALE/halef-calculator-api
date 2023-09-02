import express from "express";
import {
	addVehicleRanges,
	getAllVehicleRanges,
	removeVehicleRange,
} from "../controllers/vehicleRangeController.js";

const router = express.Router();

router.get("/", getAllVehicleRanges);
router.post("/", addVehicleRanges);
router.delete("/:id", removeVehicleRange);

export default router;
