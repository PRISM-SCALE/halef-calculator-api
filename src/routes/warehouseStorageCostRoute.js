import express from "express";
import {
	AddBulkWarehouseStorageCost,
	getBulkWarehouseStorageCost,
} from "../controllers/warehouseStorageCostController.js";

const router = express.Router();

// router.post("/", AddBulkWarehouseStorageCost);
router.get("/", getBulkWarehouseStorageCost);

export default router;
