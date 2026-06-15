import Etudiant from "../models/EtudiantModel.js";

const getEtudiants = async (req, res) => {
  const page = parseInt(req.query.page) || 1;

  try {
    const { rows, countResult } = await Etudiant.getAllEtudiants(page);
    const total = countResult.total;
    const totalPages = Math.ceil(total / 100);

    res.json({
      etudiants: rows,
      pagination: {
        page,
        total,
        totalPages,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const exportAllEtudiants = async (req, res) => {
  try {
    const results = await Etudiant.exportEtudiants();

    res.json({
      etudiants: results,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getEtudiantsFromChambre = async (req, res) => {
  const { idCha } = req.params;
  try {
    const results = await Etudiant.findEtudiantFromChambre(idCha);
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
  exportAllEtudiants,
  getEtudiantsFromChambre,
  addEtudiant,
  updateEtudiant,
  deleteEtudiant,
};
