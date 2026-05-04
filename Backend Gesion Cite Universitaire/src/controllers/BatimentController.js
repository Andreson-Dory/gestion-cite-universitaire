const Batiment = require("../models/BatimentModel");

const getBatiments = async (req, res) => {
    try {
        const results = await Batiment.getAllBatiments();
        res.json(results);
    } catch (err) {
        res.status(500).json(err);
    }
};

const addBatiment = async (req, res) => {
    const batiment = req.body;
    try {
        const result = await Batiment.createBatiment(batiment);
        res.status(201).json({
            message: "Batiment créée avec succès",
            Batiment: result
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateBatiment = async (req, res) => {
    const { idBat } = req.params;
    const batiment = req.body;
    try {
        const result = await Batiment.updateBatiment(idBat, batiment);
        res.status(201).json({
            message: "Batiment mis à jour avec succès",
            Batiment: result
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteBatiment = async (req, res) => {
    const { idBat } = req.params;
    try {
        await Batiment.deleteBatiment(idBat);
        res.status(201).json({
            message: "Batiment supprimé avec succès"
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getBatiments,
    addBatiment,
    updateBatiment,
    deleteBatiment
}