import express from "express";
import {
	AddBulkTruckingTransportCost,
	getBulkTruckingTransportCost,
	updateTruckingTransportCost,
} from "../controllers/truckingTransportCostController.js";

const router = express.Router();

// router.post("/", AddBulkTruckingTransportCost);
router.get("/", getBulkTruckingTransportCost);
router.patch("/:id", updateTruckingTransportCost);

export default router;
