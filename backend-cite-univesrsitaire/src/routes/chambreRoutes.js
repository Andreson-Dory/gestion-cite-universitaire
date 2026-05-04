const express = require("express");
const router = express.Router();
const chambreController = require("../controllers/ChambreController");

router.get("/chambre/", chambreController.getChambres);
router.post("/chambre/", chambreController.addChambre);
router.put("/chambre/:idCha", chambreController.updateChambre);
router.post("/chambre/:idCha", chambreController.deleteChambre);

module.exports = router;