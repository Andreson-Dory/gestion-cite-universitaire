import express from "express";
import sanctionController from "../controllers/SanctionController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/sanction/", AuthMiddleware, sanctionController.getSanctions);
router.get(
  "/etudiant/sanction/:idEtu",
  AuthMiddleware,
  sanctionController.getEtudiantSanction,
);
router.post("/sanction/", AuthMiddleware, sanctionController.addSanction);
router.put(
  "/sanction/:idSac",
  AuthMiddleware,
  sanctionController.updateSanction,
);
router.post(
  "/sanction/:idSac",
  AuthMiddleware,
  sanctionController.deleteSanction,
);

export default router;
