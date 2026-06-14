import express from "express";
import etudiantController from "../controllers/EtudiantController.js";

const router = express.Router();

router.get("/etudiant/", etudiantController.getEtudiants);
router.get(
  "/chambre/etudiant/:idCha",
  etudiantController.getEtudiantsFromChambre,
);
router.post("/etudiant/", etudiantController.addEtudiant);
router.put("/etudiant/:idEtu", etudiantController.updateEtudiant);
router.post("/etudiant/:idEtu", etudiantController.deleteEtudiant);

export default router;
