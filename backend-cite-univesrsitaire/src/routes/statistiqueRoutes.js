import express from "express";
import statistiqueController from "../controllers/StatistiqueController.js";

const router = express.Router();

router.get("/statistique/", statistiqueController.getStatistique);

export default router;
