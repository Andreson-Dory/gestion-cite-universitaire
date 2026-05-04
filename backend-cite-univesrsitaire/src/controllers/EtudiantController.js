const Etudiant = require("../models/EtudiantModel");

const getEtudiants = async (req, res) => {
    try {
        const results = await Etudiant.getAllEtudiants();
        res.json(results);
    } catch (err) {
        res.status(500).json(err);
    }
};

const addEtudiant = async (req, res) => {
    const etudiant = req.body;
    try {
        const result = await Etudiant.createEtudiant(etudiant);
        res.status(201).json({
            message: "Etudiant créée avec succès",
            Etudiant: result
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateEtudiant = async (req, res) => {
    const { idEtu } = req.params;
    const etudiant = req.body;
    try {
        const result = await Etudiant.updateEtudiant(idEtu, etudiant);
        res.status(201).json({
            message: "Etudiant mis à jour avec succès",
            Etudiant: result
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteEtudiant = async (req, res) => {
    const { idEtu } = req.params;
    try {
        await Etudiant.deleteEtudiant(idEtu);
        res.status(201).json({
            message: "Etudiant supprimé avec succès"
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getEtudiants,
    addEtudiant,
    updateEtudiant,
    deleteEtudiant
}