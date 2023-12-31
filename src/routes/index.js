import express from "express";
import serviceRouter from "./serviceRoute.js";
import vehicleRouter from "./vehicleRoute.js";
import packageTypeRouter from "./packageTypeRoute.js";
import houseTypeRouter from "./houseTypeRoute.js";
import vehicleRangeRouter from "./vehicleRangeRoute.js";
import calculatorRoute from "./calculatorRoute.js";
import relocationTransportCostRouter from "./relocationTransportCostRoute.js";
import relocationPackageCostRouter from "./relocationPackageCostRoute.js";
import courierCargoCostRouter from "./courierCargoCostRoute.js";
import truckingTransportCostRouter from "./truckingTransportCostRoute.js";
import warehousePackageCostRouter from "./warehousePackageCostRoute.js";
import warehouseStorageCostRouter from "./warehouseStorageCostRoute.js";
import airAmbulanceCostRouter from "./airAmbulanceCostRoute.js";
import airAmbulanceAirportCitiesRouter from "./airAmbulanceAirportCitiesRoute.js";
import OTPRouter from "./OTPRoute.js";
import UserRouter from "./UserRoute.js";
import EnquiresRouter from "./enquiresRoute.js";
import EstimatedRequestsRouter from "./estimatedRequestRoute.js";
import PaymentsRouter from "./paymentsRoute.js";
import PaymentIdsRouter from "./paymentIdsRoute.js";

const router = express.Router();


// router.use("/cities", citiesRouter);

//routes
router.use("/services", serviceRouter);
router.use("/vehicles", vehicleRouter);
router.use("/packagetypes", packageTypeRouter);
router.use("/housetypes", houseTypeRouter);
router.use("/vehiclerange", vehicleRangeRouter);
router.use("/calculate", calculatorRoute);
router.use("/otp", OTPRouter);
router.use("/user", UserRouter);
router.use("/enquires", EnquiresRouter);
router.use("/estimatedrequests", EstimatedRequestsRouter);
router.use("/customer_payments", PaymentsRouter);
router.use("/payment_ids", PaymentIdsRouter);

//*****************DO NOT DELETE BELOW ROUTES*******************
router.use("/reloctransportcost", relocationTransportCostRouter);
router.use("/relocpackagecost", relocationPackageCostRouter);
router.use("/couriercargocost", courierCargoCostRouter);
router.use("/truckingcost", truckingTransportCostRouter);
router.use("/warehousepackagecost", warehousePackageCostRouter);
router.use("/warehousestoragecost", warehouseStorageCostRouter);
router.use("/airambulancecost", airAmbulanceCostRouter);
// router.use("/airambulanceairportcities", airAmbulanceAirportCitiesRouter);

export default router;
