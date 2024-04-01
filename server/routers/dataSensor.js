import express from "express";
import { getAllDataSensor, getFilterDataSensor} from "../controllers/dataSensor.js";
const router = express.Router();

router.get("/all", getAllDataSensor);
router.get("/filter", getFilterDataSensor);

export default router;