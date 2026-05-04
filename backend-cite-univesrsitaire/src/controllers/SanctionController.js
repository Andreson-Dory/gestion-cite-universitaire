const Sanction = require("../models/SanctionModel");

const getSanctions = async (req, res) => {
    try {
        const results = await Sanction.getAllSanctions();
        res.json(results);
    } catch (err) {
        res.status(500).json(err);
    }
};

const addSanction = async (req, res) => {
    const sanction = req.body;
    try {
        const result = await Sanction.createSanction(sanction);
        res.status(201).json({
            message: "Sanction créée avec succès",
            Sanction: result
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateSanction = async (req, res) => {
    const { idSac } = req.params;
    const sanction = req.body;
    try {
        const result = await Sanction.updateSanction(idSac, sanction);
        res.status(201).json({
            message: "Sanction mis à jour avec succès",
            Sanction: result
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteSanction = async (req, res) => {
    const { idSac } = req.params;
    try {
        await Sanction.deleteSanction(idSac);
        res.status(201).json({
            message: "Sanction supprimé avec succès"
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getSanctions,
    addSanction,
    updateSanction,
    deleteSanction
}