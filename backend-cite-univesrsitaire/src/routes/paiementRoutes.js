import express from "express";
import paiementController from "../controllers/PaiementController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/paiement/", AuthMiddleware, paiementController.getPaiements);
router.get(
  "/paiement/export",
  AuthMiddleware,
  paiementController.exportAllPaiements,
);
router.get(
  "/etudiant/paiement/:idEtu",
  AuthMiddleware,
  paiementController.getEtudiantPaiement,
);
router.post("/paiement/", AuthMiddleware, paiementController.addPaiement);
router.post(
  "/paiement/:idPai",
  AuthMiddleware,
  paiementController.deletePaiement,
);

export default router;
