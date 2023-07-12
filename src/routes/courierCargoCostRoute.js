import express from "express";
import { AddBulkCourierCargoTransportCost } from "../controllers/courierCargoCostController";

const router = express.Router();

router.post("/", AddBulkCourierCargoTransportCost);

export default router;
