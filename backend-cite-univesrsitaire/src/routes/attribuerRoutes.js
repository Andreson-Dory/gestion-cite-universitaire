const express = require("express");
const router = express.Router();
const attribuerController = require("../controllers/AttribuerController");

router.get("/attribuer/", attribuerController.getAttribuers);
router.post("/attribuer/", attribuerController.addAttribuer);
router.put("/attribuer/:idAtt", attribuerController.updateAttribuer);
router.post("/attribuer/:idAtt", attribuerController.deleteAttribuer);
router.put("/attribuer/toggle/:idAtt", attribuerController.toggleToFinishedAttribuer);

module.exports = router;