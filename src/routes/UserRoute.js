import express from "express";
import {createUser, deleteUser, getUsers, updateUser} from "../controllers/UserController.js";

const router = express.Router();

router.post("/create", createUser);

//
router.get("/get", getUsers);
router.put("/edit", updateUser);
router.delete("/delete", deleteUser);

export default router;
