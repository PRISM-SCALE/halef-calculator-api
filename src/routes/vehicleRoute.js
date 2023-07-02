import express from "express";
import { addVehicle, getAllVehicles, removeVehicle } from "../controllers/vehicleController.js";

const router = express.Router();

router.get("/", getAllVehicles);
router.post("/", addVehicle);
router.delete("/:id", removeVehicle);

export default router;
