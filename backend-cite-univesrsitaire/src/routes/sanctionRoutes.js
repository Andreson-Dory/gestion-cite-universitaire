const express = require("express");
const router = express.Router();
const sanctionController = require("../controllers/SanctionController");

router.get("/sanction/", sanctionController.getSanctions);
router.post("/sanction/", sanctionController.addSanction);
router.put("/sanction/:idSac", sanctionController.updateSanction);
router.post("/sanction/:idSac", sanctionController.deleteSanction);

module.exports = router;