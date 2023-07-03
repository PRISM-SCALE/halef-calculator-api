import express from "express";
import serviceRouter from "./serviceRoute.js";
import vehicleRouter from "./vehicleRoute.js";
import packageTypeRouter from "./packageTypeRoute.js";
import houseTypeRouter from "./houseTypeRoute.js";

const router = express.Router();

//routes
router.use("/services", serviceRouter);
router.use("/vehicles", vehicleRouter);
router.use("/packagetypes", packageTypeRouter);
router.use("/housetypes", houseTypeRouter);

export default router;
