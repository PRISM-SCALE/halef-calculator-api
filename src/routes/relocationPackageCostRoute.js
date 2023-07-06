import express from "express";
import { AddBulkRelocationPackageCost } from "../controllers/relocationPackageCostController.js";

const router = express.Router();

router.post("/", AddBulkRelocationPackageCost);

export default router;
