import express from "express";
import batimentController from "../controllers/BatimentController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/batiment/", AuthMiddleware, batimentController.getBatiments);
router.post("/batiment/", AuthMiddleware, batimentController.addBatiment);
router.put(
  "/batiment/:idBat",
  AuthMiddleware,
  batimentController.updateBatiment,
);
router.post(
  "/batiment/:idBat",
  AuthMiddleware,
  batimentController.deleteBatiment,
);

export default router;
