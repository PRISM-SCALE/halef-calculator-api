import express from "express";
import {
	AddBulkRelocationTransportCost,
	getRelocationTransportCost,
	updateRelocationTransportCost,
} from "../controllers/relocationTransportCostController.js";

const router = express.Router();

// router.post("/", AddBulkRelocationTransportCost);
router.get("/", getRelocationTransportCost);
router.patch("/:id", updateRelocationTransportCost);

export default router;
