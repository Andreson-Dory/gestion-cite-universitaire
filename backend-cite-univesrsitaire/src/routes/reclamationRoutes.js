import express from "express";
import reclamationController from "../controllers/ReclamationController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get(
  "/reclamation/",
  AuthMiddleware,
  reclamationController.getReclamations,
);
router.get(
  "/etudiant/reclamation/:idEtu",
  AuthMiddleware,
  reclamationController.getEtudiantReclamation,
);
router.post(
  "/reclamation/",
  AuthMiddleware,
  reclamationController.addReclamation,
);
router.put(
  "/reclamation/:idRec",
  AuthMiddleware,
  reclamationController.updateReclamation,
);
router.post(
  "/reclamation/:idRec",
  AuthMiddleware,
  reclamationController.deleteReclamation,
);

export default router;
