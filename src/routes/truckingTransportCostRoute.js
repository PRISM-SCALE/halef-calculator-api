import express from "express";
import {AddBulkTruckingTransportCost} from "../controllers/truckingTransportCostController.js";

const router = express.Router();

router.post("/", AddBulkTruckingTransportCost);

export default router;
