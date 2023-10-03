import express from "express";
import {
	AddBulkRelocationPackageCost,
	getBulkRelocationPackageCost,
	updateRelocationPackageCost,
} from "../controllers/relocationPackageCostController.js";

const router = express.Router();

// router.post("/", AddBulkRelocationPackageCost);
router.get("/", getBulkRelocationPackageCost);
router.patch("/:id", updateRelocationPackageCost);

export default router;
