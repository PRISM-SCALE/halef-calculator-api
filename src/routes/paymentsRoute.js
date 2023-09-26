import express from "express";
import {addCustomerPayment, getAllCustomerPayments} from "../controllers/PaymentController.js";

const router = express.Router();

router.get("/", getAllCustomerPayments);
router.post("/", addCustomerPayment);

export default router;
//airAmbulanceAirportCitiesRoute
