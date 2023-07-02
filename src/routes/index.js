import express from "express";
import serviceRouter from "./serviceRoute.js";
import vehicleRouter from "./vehicleRoute.js";

const router = express.Router();

//routes
router.use("/services", serviceRouter);
router.use("/vehicles", vehicleRouter);

export default router;
