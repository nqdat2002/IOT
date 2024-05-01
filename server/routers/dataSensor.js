import express from "express";
import { getAllDataSensor, getFilterDataSensor, getLastestItems} from "../controllers/dataSensor.js";
const router = express.Router();

router.get("/all", getAllDataSensor);
router.get("/lastest", getLastestItems);
router.get("/filter", getFilterDataSensor);

export default router;