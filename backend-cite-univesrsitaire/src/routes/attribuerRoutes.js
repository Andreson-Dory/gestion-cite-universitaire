import express from "express";
import attribuerController from "../controllers/AttribuerController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/attribuer/", AuthMiddleware, attribuerController.getAttribuers);
router.post("/attribuer/", AuthMiddleware, attribuerController.addAttribuer);
router.put(
  "/attribuer/toggle/",
  AuthMiddleware,
  attribuerController.toggleToFinishedAttribuer,
);
router.put(
  "/attribuer/:idAtt",
  AuthMiddleware,
  attribuerController.updateAttribuer,
);
router.post(
  "/attribuer/:idAtt",
  AuthMiddleware,
  attribuerController.deleteAttribuer,
);

export default router;
