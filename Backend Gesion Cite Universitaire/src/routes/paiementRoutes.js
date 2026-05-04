const express = require("express");
const router = express.Router();
const paiementController = require("../controllers/PaiementController");

router.get("/paiement/", paiementController.getPaiements);
router.post("/paiement/", paiementController.addPaiement);
router.post("/paiement/:idPai", paiementController.deletePaiement);

module.exports = router;