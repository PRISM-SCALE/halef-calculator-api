import express from "express";
import {relocationCalc} from "../controllers/calculators/relocationController.js";
import {courierCargoCalc} from "../controllers/calculators/courierCargoController.js";
import {truckingCalc} from "../controllers/calculators/truckingController.js";
import {warehouseCalc} from "../controllers/calculators/warehouseController.js";
import { airAmbulanceCalc } from "../controllers/calculators/airAmbulanceController.js";

const router = express.Router();

router.post("/relocation", relocationCalc);
router.post("/couriercargo", courierCargoCalc);
router.post("/trucking", truckingCalc);
router.post("/warehouse", warehouseCalc);
router.post("/airambulance", airAmbulanceCalc);
// router.post("/carriercargo", addHouseType);
// router.delete("/:id", removeHouseType);

export default router;
