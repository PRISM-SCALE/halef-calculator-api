import express from "express";
import { AddBulkWarehousePackageCost } from "../controllers/warehousePackageCostController.js";

const router = express.Router();

router.post("/", AddBulkWarehousePackageCost);

export default router;
