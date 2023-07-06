import express from "express";
import { relocationCalc } from "../controllers/calculators/relocationController.js";

const router = express.Router();

router.post("/relocation", relocationCalc);
// router.post("/carriercargo", addHouseType);
// router.delete("/:id", removeHouseType);

export default router;
