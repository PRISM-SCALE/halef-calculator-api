import express from "express";
import {
	addPaymentIds,
	editPaymentId,
	getAllPaymentIds,
	getPaymentId,
	removePaymentId,
} from "../controllers/paymentIdController.js";

const router = express.Router();

router.get("/", getAllPaymentIds);
router.get("/:id", getPaymentId);
router.post("/", addPaymentIds);
router.put("/:id", editPaymentId);
router.delete("/:id", removePaymentId);

export default router;
//airAmbulanceAirportCitiesRoute
