const Chambre = require("../models/ChambreModel");

const getChambres = async (req, res) => {
    try {
        const results = await Chambre.getAllChambres();
        res.json(results);
    } catch (err) {
        res.status(500).json(err);
    }
};

const addChambre = async (req, res) => {
    const chambre = req.body;
    try {
        const result = await Chambre.createChambre(chambre);
        res.status(201).json({
            message: "Chambre créée avec succès",
            Chambre: result
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateChambre = async (req, res) => {
    const { idCha } = req.params;
    const chambre = req.body;
    try {
        const result = await Chambre.updateChambre(idCha, chambre);
        res.status(201).json({
            message: "Chambre mis à jour avec succès",
            Chambre: result
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteChambre = async (req, res) => {
    const { idCha } = req.params;
    try {
        await Chambre.deleteChambre(idCha);
        res.status(201).json({
            message: "Chambre supprimé avec succès"
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getChambres,
    addChambre,
    updateChambre,
    deleteChambre
}