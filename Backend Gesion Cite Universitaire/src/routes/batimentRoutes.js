const express = require("express");
const router = express.Router();
const batimentController = require("../controllers/BatimentController");

router.get("/batiment/", batimentController.getBatiments);
router.post("/batiment/", batimentController.addBatiment);
router.put("/batiment/:idBat", batimentController.updateBatiment);
router.post("/batiment/:idBat", batimentController.deleteBatiment);

module.exports = router;