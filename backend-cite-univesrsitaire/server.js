import "dotenv/config";

import app from "./src/app.js";
import "./src/config/db.js";

import eutdiantRoutes from "./src/routes/etudiantRoutes.js";
import batimentRoutes from "./src/routes/batimentRoutes.js";
import chambreRoutes from "./src/routes/chambreRoutes.js";
import paiementRoutes from "./src/routes/paiementRoutes.js";
import reclamationRoutes from "./src/routes/reclamationRoutes.js";
import sanctionRoutes from "./src/routes/sanctionRoutes.js";
import attribuerRoutes from "./src/routes/attribuerRoutes.js";
import statistiqueRoutes from "./src/routes/statistiqueRoutes.js";

const PORT = process.env.PORT || 5000;

app.use("/api/v1", eutdiantRoutes);
app.use("/api/v1", batimentRoutes);
app.use("/api/v1", chambreRoutes);
app.use("/api/v1", paiementRoutes);
app.use("/api/v1", reclamationRoutes);
app.use("/api/v1", sanctionRoutes);
app.use("/api/v1", attribuerRoutes);
app.use("/api/v1", statistiqueRoutes);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
