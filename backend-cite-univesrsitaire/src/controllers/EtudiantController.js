import Etudiant from "../models/EtudiantModel.js";

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
    const createdEtudiant = await Etudiant.createEtudiant(etudiant);
    res.status(201).json({
      message: "Etudiant créée avec succès",
      Etudiant: createdEtudiant,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de l'ajout de l'étudiant",
      error: err,
    });
  }
};

const updateEtudiant = async (req, res) => {
  const { idEtu } = req.params;
  const etudiant = req.body;
  try {
    const updatedEtudiant = await Etudiant.updateEtudiant(idEtu, etudiant);
    res.status(201).json({
      message: "Etudiant mis à jour avec succès",
      Etudiant: updatedEtudiant,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour de l'information de l'étudiant",
      error: err,
    });
  }
};

const deleteEtudiant = async (req, res) => {
  const { idEtu } = req.params;
  try {
    await Etudiant.deleteEtudiant(idEtu);
    res.status(201).json({
      message: "Etudiant supprimé avec succès",
      IdEtu: idEtu,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la suppression de l'étudiant",
      error: err,
    });
  }
};

export default {
  getEtudiants,
  addEtudiant,
  updateEtudiant,
  deleteEtudiant,
};
