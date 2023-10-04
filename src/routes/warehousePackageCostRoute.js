import express from "express";
import {
	AddBulkWarehousePackageCost,
	getBulkWarehousePackageCost,
	updateWarehousePackageCost,
} from "../controllers/warehousePackageCostController.js";

const router = express.Router();

// router.post("/", AddBulkWarehousePackageCost);
router.get("/", getBulkWarehousePackageCost);
router.patch("/:id", updateWarehousePackageCost);

export default router;
