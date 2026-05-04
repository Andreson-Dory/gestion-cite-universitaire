const Attribuer = require("../models/AttribuerModel");

const getAttribuers = async (req, res) => {
    try {
        const results = await Attribuer.getAllAttribuers();
        res.json(results);
    } catch (err) {
        res.status(500).json(err);
    }
};

const addAttribuer = async (req, res) => {
    const attribuer = req.body;
    try {
        const result = await Attribuer.createAttribuer(attribuer);
        res.status(201).json({
            message: "Attribuer créé avec succès",
            Attribuer: result
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateAttribuer = async (req, res) => {
    const { idAtt } = req.params;
    const attribuer = req.body;
    try {
        const result = await Attribuer.updateAttribuer(idAtt, attribuer);
        res.status(201).json({
            message: "Attribuer mis à jour avec succès",
            Attribuer: result
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteAttribuer = async (req, res) => {
    const { idAtt } = req.params;
    try {
        await Attribuer.deleteAttribuer(idAtt);
        res.status(201).json({
            message: "Attribuer supprimé avec succès"
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getAttribuers,
    addAttribuer,
    updateAttribuer,
    deleteAttribuer
}