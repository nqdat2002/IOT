import express from "express";
import { getAllDataSensor} from "../controllers/dataSensor.js";
const router = express.Router();

router.get("/alldatasensor", getAllDataSensor);

export default router;