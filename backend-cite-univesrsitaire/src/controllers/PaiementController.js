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
        const createdPaiement = await Paiement.createPaiement(paiement);
        res.status(201).json({
            message: "Paiement effectué avec succès",
            Paiement: createdPaiement
        });
    } catch (err) {
        res.status(500).json({
            message: "Erreur lors du paiement",
            error : err
        });
    }
};

const deletePaiement = async (req, res) => {
    const { idPai } = req.params;
    try {
        await Paiement.deletePaiement(idPai);
        res.status(201).json({
            message: "Paiement supprimé avec succès",
            IdPai: idPai
        });
    } catch (err) {
        res.status(500).json({
            message: "Erreur lors de la suppression du paiement",
            error : err
        });
    }
};

module.exports = {
    getPaiements,
    addPaiement,
    deletePaiement
}