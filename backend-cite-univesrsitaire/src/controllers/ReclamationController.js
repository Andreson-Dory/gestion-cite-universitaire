const Reclamation = require("../models/ReclamationModel");

const getReclamations = async (req, res) => {
    try {
        const results = await Reclamation.getAllReclamations();
        res.json(results);
    } catch (err) {
        res.status(500).json(err);
    }
};

const addReclamation = async (req, res) => {
    const reclamation = req.body;
    try {
        const createdReclamation = await Reclamation.createReclamation(reclamation);
        res.status(201).json({
            message: "Reclamation créée avec succès",
            Reclamation: createdReclamation
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateReclamation = async (req, res) => {
    const { idRec } = req.params;
    const reclamation = req.body;
    try {
        const updatedReclamation = await Reclamation.updateReclamation(idRec, reclamation);
        res.status(201).json({
            message: "Reclamation mis à jour avec succès",
            Reclamation: updatedReclamation
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteReclamation = async (req, res) => {
    const { idRec } = req.params;
    try {
        await Reclamation.deleteReclamation(idRec);
        res.status(201).json({
            message: "Reclamation supprimé avec succès",
            IdRec: idRec
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getReclamations,
    addReclamation,
    updateReclamation,
    deleteReclamation
}