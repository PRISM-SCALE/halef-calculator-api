import express from "express";
import {
	addVehicle,
	getAllVehicles,
	getOneVehicle,
	removeVehicle,
	updateVehicle,
} from "../controllers/vehicleController.js";

const router = express.Router();

router.get("/", getAllVehicles);
router.get("/:id", getOneVehicle);
router.post("/", addVehicle);
router.put("/:id", updateVehicle);
router.delete("/:id", removeVehicle);

export default router;
