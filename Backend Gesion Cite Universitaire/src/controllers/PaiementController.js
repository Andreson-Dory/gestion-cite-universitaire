const Paiement = require("../models/PaiementModel");

const getPaiements = async (req, res) => {
    try {
        const results = await Paiement.getAllPaiements();
        res.json(results);
    } catch (err) {
        res.status(500).json(err);
    }
};

const addPaiement = async (req, res) => {
    const paiement = req.body;
    try {
        const result = await Paiement.createPaiement(paiement);
        res.status(201).json({
            message: "Paiement créée avec succès",
            Paiement: result
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const deletePaiement = async (req, res) => {
    const { idPai } = req.params;
    try {
        await Paiement.deletePaiement(idPai);
        res.status(201).json({
            message: "Paiement supprimé avec succès"
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getPaiements,
    addPaiement,
    deletePaiement
}