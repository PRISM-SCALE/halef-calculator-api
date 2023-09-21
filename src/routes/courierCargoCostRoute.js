import express from "express";
import {
	AddBulkCourierCargoTransportCost,
	getBulkCourierCargoTransportCost,
} from "../controllers/courierCargoCostController.js";

const router = express.Router();

// router.post("/", AddBulkCourierCargoTransportCost);
router.get("/", getBulkCourierCargoTransportCost);

export default router;
