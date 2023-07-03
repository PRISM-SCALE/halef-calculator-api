import express from "express";
import { addPackageType, getAllPackageTypes, removePackageType } from "../controllers/packageTypeController.js";

const router = express.Router();

router.get("/", getAllPackageTypes);
router.post("/", addPackageType);
router.delete("/:id", removePackageType);

export default router;
