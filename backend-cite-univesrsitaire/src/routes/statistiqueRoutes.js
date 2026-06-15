import express from "express";
import statistiqueController from "../controllers/StatistiqueController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get(
  "/statistique/",
  AuthMiddleware,
  statistiqueController.getStatistique,
);

export default router;
