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
        const createdAttribuer = await Attribuer.createAttribuer(attribuer);
        res.status(201).json({
            message: "Attribuer créé avec succès",
            Attribuer: createdAttribuer
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateAttribuer = async (req, res) => {
    const { idAtt } = req.params;
    const attribuer = req.body;
    try {
        const updatedAttribuer = await Attribuer.updateAttribuer(idAtt, attribuer);
        res.status(201).json({
            message: "Attribuer mis à jour avec succès",
            Attribuer: updatedAttribuer
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
            message: "Attribuer supprimé avec succès",
            IdAtt: idAtt
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