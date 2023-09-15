import express from "express";
import {addPayment, getAllPayments} from "../controllers/PaymentController.js";

const router = express.Router();

router.get("/", getAllPayments);
router.post("/", addPayment);

export default router;
//airAmbulanceAirportCitiesRoute
