import express from "express";
import chambreController from "../controllers/ChambreController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/chambre/", AuthMiddleware, chambreController.getChambres);
router.get("/chambre/free/", AuthMiddleware, chambreController.getFreeChambres);
router.get(
  "/etudiant/chambre/:idEtu",
  AuthMiddleware,
  chambreController.getChambreByEtudiant,
);
router.post("/chambre/", AuthMiddleware, chambreController.addChambre);
router.put("/chambre/:idCha", AuthMiddleware, chambreController.updateChambre);
router.post("/chambre/:idCha", AuthMiddleware, chambreController.deleteChambre);

export default router;
