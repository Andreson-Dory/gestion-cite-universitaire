import express from "express";
import batimentController from "../controllers/BatimentController.js";

const router = express.Router();

router.get("/batiment/", batimentController.getBatiments);
router.post("/batiment/", batimentController.addBatiment);
router.put("/batiment/:idBat", batimentController.updateBatiment);
router.post("/batiment/:idBat", batimentController.deleteBatiment);

export default router;
