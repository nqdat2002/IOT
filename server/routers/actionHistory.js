import express from "express";
import { changeAction } from "../controllers/actionHistory.js";
const router = express.Router();

router.post("/change", changeAction);

export default router;