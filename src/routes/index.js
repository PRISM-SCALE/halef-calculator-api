import express from "express";
import serviceRouter from "./serviceRoute.js";
import vehicleRouter from "./vehicleRoute.js";
import packageTypeRouter from "./packageTypeRoute.js";
import houseTypeRouter from "./houseTypeRoute.js";
import calculatorRoute from "./calculatorRoute.js";
import relocationTransportCostRouter from "./relocationTransportCostRoute.js";
import relocationPackageCostRouter from "./relocationPackageCostRoute.js";
import courierCargoCostRouter from "./courierCargoCostRoute.js";

const router = express.Router();

//routes
router.use("/services", serviceRouter);
router.use("/vehicles", vehicleRouter);
router.use("/packagetypes", packageTypeRouter);
router.use("/housetypes", houseTypeRouter);
router.use("/calculate", calculatorRoute);

//*****************DO NOT DELETE BELOW ROUTES*******************
// router.use("/reloctransportcost", relocationTransportCostRouter);
// router.use("/relocpackagecost", relocationPackageCostRouter);
// router.use("/couriercargocost", courierCargoCostRouter);

export default router;
