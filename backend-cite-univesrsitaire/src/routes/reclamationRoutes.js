import express from "express";
import reclamationController from "../controllers/ReclamationController.js";

const router = express.Router();

router.get("/reclamation/", reclamationController.getReclamations);
router.post("/reclamation/", reclamationController.addReclamation);
router.put("/reclamation/:idRec", reclamationController.updateReclamation);
router.post("/reclamation/:idRec", reclamationController.deleteReclamation);

export default router;
