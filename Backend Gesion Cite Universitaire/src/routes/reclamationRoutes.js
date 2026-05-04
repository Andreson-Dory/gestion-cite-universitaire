const express = require("express");
const router = express.Router();
const reclamationController = require("../controllers/ReclamationController");

router.get("/reclamation/", reclamationController.getReclamations);
router.post("/reclamation/", reclamationController.addReclamation);
router.put("/reclamation/:idRec", reclamationController.updateReclamation);
router.post("/reclamation/:idRec", reclamationController.deleteReclamation);

module.exports = router;