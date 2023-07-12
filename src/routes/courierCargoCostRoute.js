import express from "express";
import { AddBulkCourierCargoTransportCost } from "../controllers/courierCargoCostController.js";

const router = express.Router();

router.post("/", AddBulkCourierCargoTransportCost);

export default router;
