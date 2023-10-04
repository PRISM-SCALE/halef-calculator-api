import express from "express";
import {
	AddBulkCourierCargoTransportCost,
	getBulkCourierCargoTransportCost,
	updateCourierCargoTransportCost,
} from "../controllers/courierCargoCostController.js";

const router = express.Router();

// router.post("/", AddBulkCourierCargoTransportCost);
router.get("/", getBulkCourierCargoTransportCost);
router.patch("/:id", updateCourierCargoTransportCost);

export default router;
