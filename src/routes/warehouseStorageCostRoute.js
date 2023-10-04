import express from "express";
import {
	AddBulkWarehouseStorageCost,
	getBulkWarehouseStorageCost,
	updateWarehouseStorageCost,
} from "../controllers/warehouseStorageCostController.js";

const router = express.Router();

// router.post("/", AddBulkWarehouseStorageCost);
router.get("/", getBulkWarehouseStorageCost);
router.patch("/:id", updateWarehouseStorageCost);

export default router;
