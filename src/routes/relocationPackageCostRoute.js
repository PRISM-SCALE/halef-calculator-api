import express from "express";
import {
	AddBulkRelocationPackageCost,
	getBulkRelocationPackageCost,
} from "../controllers/relocationPackageCostController.js";

const router = express.Router();

// router.post("/", AddBulkRelocationPackageCost);
router.get("/", getBulkRelocationPackageCost);

export default router;
