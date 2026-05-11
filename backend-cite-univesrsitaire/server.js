require("dotenv").config();

const app = require("./src/app");
require("./src/config/db");

const eutdiantRoutes = require("./src/routes/etudiantRoutes");
const batimentRoutes = require("./src/routes/batimentRoutes");
const chambreRoutes = require("./src/routes/chambreRoutes");
const paiementRoutes = require("./src/routes/paiementRoutes");
const reclamationRoutes = require("./src/routes/reclamationRoutes");
const sanctionRoutes = require("./src/routes/sanctionRoutes");
const attribuerRoutes = require("./src/routes/attribuerRoutes");
const statistiqueRoutes = require("./src/routes/statistiqueRoutes");

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