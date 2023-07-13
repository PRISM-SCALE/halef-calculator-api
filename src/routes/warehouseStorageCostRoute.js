import express from "express";
import {AddBulkWarehouseStorageCost} from "../controllers/warehouseStorageCostController.js";

const router = express.Router();

router.post("/", AddBulkWarehouseStorageCost);

export default router;
