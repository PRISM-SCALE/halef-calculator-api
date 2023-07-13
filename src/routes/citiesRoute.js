import express from "express";
import {AddBulkCities, getAllCities} from "../controllers/citiesController.js";

const router = express.Router();

router.post("/", AddBulkCities);
router.get("/", getAllCities);

export default router;
