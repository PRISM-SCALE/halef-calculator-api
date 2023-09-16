import express from "express";
import {updateOneEstimate, getAllEstimates} from "../controllers/estimateRequestController.js";

const router = express.Router();

router.get("/", getAllEstimates);
router.put("/:id", updateOneEstimate);

export default router;
