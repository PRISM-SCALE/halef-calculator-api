import express from "express";
import { addService, getAllServices, removeService } from "../controllers/serviceController.js";

const router = express.Router();

router.get("/", getAllServices);
router.post("/", addService);
router.delete("/:id", removeService);

export default router;
