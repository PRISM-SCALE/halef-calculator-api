import express from "express";
import { addHouseType, getAllHouseTypes, removeHouseType } from "../controllers/houseTypeController.js";

const router = express.Router();

router.get("/", getAllHouseTypes);
router.post("/", addHouseType);
router.delete("/:id", removeHouseType);

export default router;
