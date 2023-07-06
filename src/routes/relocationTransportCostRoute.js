import express from "express";
import { AddBulkRelocationTransportCost } from "../controllers/relocationTransportCostController.js";

const router = express.Router();

router.post("/", AddBulkRelocationTransportCost);

export default router;
