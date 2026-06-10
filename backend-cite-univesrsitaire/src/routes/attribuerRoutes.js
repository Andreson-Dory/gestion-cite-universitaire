import express from "express";
import attribuerController from "../controllers/AttribuerController.js";

const router = express.Router();

router.get("/attribuer/", attribuerController.getAttribuers);
router.post("/attribuer/", attribuerController.addAttribuer);
router.put("/attribuer/toggle/", attribuerController.toggleToFinishedAttribuer);
router.put("/attribuer/:idAtt", attribuerController.updateAttribuer);
router.post("/attribuer/:idAtt", attribuerController.deleteAttribuer);

export default router;
