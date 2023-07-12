import express from "express";
import { AddBulkCourierCargoCost } from "../controllers/courierCargoCostController";

const router = express.Router();

router.post("/", AddBulkCourierCargoCost);

export default router;
