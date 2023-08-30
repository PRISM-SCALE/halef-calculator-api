import express from "express";
import {getAllEnquires} from "../controllers/enquiresController.js";

const router = express.Router();

router.get("/", getAllEnquires);

export default router;
