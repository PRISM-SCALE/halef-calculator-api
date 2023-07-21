import express from "express";
import {addAirAmbulanceAirportCities} from "../controllers/airAmbulanceAirportCitiesController.js";

const router = express.Router();

router.post("/", addAirAmbulanceAirportCities);

export default router;
//airAmbulanceAirportCitiesRoute
