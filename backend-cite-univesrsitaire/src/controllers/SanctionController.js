import Sanction from "../models/SanctionModel.js";

const getSanctions = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  try {
    const { rows, countResult } = await Sanction.getAllSanctions(page);
    const total = countResult.total;
    const totalPages = Math.ceil(total / 100);
    res.json({ sanctions: rows, pagination: { page, total, totalPages } });
  } catch (err) {
    res.status(500).json(err);
  }
};
const getEtudiantSanction = async (req, res) => {
  const { idEtu } = req.params;
  const page = parseInt(req.query.page) || 1;

  try {
    const { rows, countResult } = await Sanction.findSanctionByEtudiant(
      idEtu,
      page,
    );
    const total = countResult.total;
    const totalPages = Math.ceil(total / 3);

    res.json({
      sanctions: rows,
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

const addSanction = async (req, res) => {
  const sanction = req.body;
  try {
    const createdSanction = await Sanction.createSanction(sanction);
    res.status(201).json({
      message: "Sanction ajouté avec succès",
      Sanction: createdSanction,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de l'ajout du sanction",
      error: err,
    });
  }
};

const updateSanction = async (req, res) => {
  const { idSac } = req.params;
  const sanction = req.body;
  try {
    const updatedSanction = await Sanction.updateSanction(idSac, sanction);
    res.status(201).json({
      message: "Sanction mis à jour avec succès",
      Sanction: updatedSanction,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du sanction",
      error: err,
    });
  }
};

const deleteSanction = async (req, res) => {
  const { idSac } = req.params;
  try {
    await Sanction.deleteSanction(idSac);
    res.status(201).json({
      message: "Sanction supprimé avec succès",
      IdSac: idSac,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la suppression du sanction",
      error: err,
    });
  }
};

export default {
  getSanctions,
  getEtudiantSanction,
  addSanction,
  updateSanction,
  deleteSanction,
};
