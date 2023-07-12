import express from "express";
import { relocationCalc } from "../controllers/calculators/relocationController.js";
import { courierCargoCalc } from "../controllers/calculators/courierCargoController.js";

const router = express.Router();

router.post("/relocation", relocationCalc);
router.post("/couriercargo", courierCargoCalc);
// router.post("/carriercargo", addHouseType);
// router.delete("/:id", removeHouseType);

export default router;
