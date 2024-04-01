import express from "express";
import { changeAction, getAllActionHistory, getFilterActionHistory} from "../controllers/actionHistory.js";
const router = express.Router();

router.get("/all", getAllActionHistory);
router.post("/change", changeAction);
router.get("/filter", getFilterActionHistory);

export default router;