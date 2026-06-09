import express from "express";
import paiementController from "../controllers/PaiementController.js";

const router = express.Router();

router.get("/paiement/", paiementController.getPaiements);
router.post("/paiement/", paiementController.addPaiement);
router.post("/paiement/:idPai", paiementController.deletePaiement);

export default router;
