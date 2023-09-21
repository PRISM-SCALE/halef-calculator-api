import express from "express";
import {
	AddBulkTruckingTransportCost,
	getBulkTruckingTransportCost,
} from "../controllers/truckingTransportCostController.js";

const router = express.Router();

// router.post("/", AddBulkTruckingTransportCost);
router.get("/", getBulkTruckingTransportCost);

export default router;
