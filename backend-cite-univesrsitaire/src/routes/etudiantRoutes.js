import express from "express";
import etudiantController from "../controllers/EtudiantController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/etudiant", AuthMiddleware, etudiantController.getEtudiants);
router.get(
  "/chambre/etudiant/:idCha",
  AuthMiddleware,
  etudiantController.getEtudiantsFromChambre,
);
router.post("/etudiant/", AuthMiddleware, etudiantController.addEtudiant);
router.put(
  "/etudiant/:idEtu",
  AuthMiddleware,
  etudiantController.updateEtudiant,
);
router.post(
  "/etudiant/:idEtu",
  AuthMiddleware,
  etudiantController.deleteEtudiant,
);

export default router;
