import express from "express";
import chambreController from "../controllers/ChambreController.js";

const router = express.Router();

router.get("/chambre/", chambreController.getChambres);
router.get("/etudiant/chambre/:idEtu", chambreController.getChambreByEtudiant);
router.post("/chambre/", chambreController.addChambre);
router.put("/chambre/:idCha", chambreController.updateChambre);
router.post("/chambre/:idCha", chambreController.deleteChambre);

export default router;
