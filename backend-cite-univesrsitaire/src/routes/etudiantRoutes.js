const express = require("express");
const router = express.Router();
const etudiantController = require("../controllers/EtudiantController");

router.get("/etudiant/", etudiantController.getEtudiants);
router.post("/etudiant/", etudiantController.addEtudiant);
router.put("/etudiant/:idEtu", etudiantController.updateEtudiant);
router.post("/etudiant/:idEtu", etudiantController.deleteEtudiant);

module.exports = router;