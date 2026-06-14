import express from "express";
import sanctionController from "../controllers/SanctionController.js";

const router = express.Router();

router.get("/sanction/", sanctionController.getSanctions);
router.get("/etudiant/sanction/:idEtu", sanctionController.getEtudiantSanction);
router.post("/sanction/", sanctionController.addSanction);
router.put("/sanction/:idSac", sanctionController.updateSanction);
router.post("/sanction/:idSac", sanctionController.deleteSanction);

export default router;
