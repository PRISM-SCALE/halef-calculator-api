import express from "express";
import {getAllEstimates} from "../controllers/estimateRequestController.js";

const router = express.Router();

router.get("/", getAllEstimates);

export default router;
