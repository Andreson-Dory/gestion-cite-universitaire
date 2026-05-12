const express = require("express");
const router = express.Router();
const statistiqueController = require("../controllers/StatistiqueController");

router.get("/statistique/", statistiqueController.getStatistique);

module.exports = router;