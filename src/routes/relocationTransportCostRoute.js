import express from "express";
import {
	AddBulkRelocationTransportCost,
	getRelocationTransportCost,
} from "../controllers/relocationTransportCostController.js";

const router = express.Router();

// router.post("/", AddBulkRelocationTransportCost);
router.get("/", getRelocationTransportCost);

export default router;
