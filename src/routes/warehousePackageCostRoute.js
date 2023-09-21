import express from "express";
import {
	AddBulkWarehousePackageCost,
	getBulkWarehousePackageCost,
} from "../controllers/warehousePackageCostController.js";

const router = express.Router();

// router.post("/", AddBulkWarehousePackageCost);
router.get("/", getBulkWarehousePackageCost);

export default router;
