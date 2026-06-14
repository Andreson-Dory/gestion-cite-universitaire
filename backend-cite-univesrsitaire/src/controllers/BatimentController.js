import Batiment from "../models/BatimentModel.js";

const getBatiments = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  try {
    const { rows, countResult } = await Batiment.getAllBatiments(page);
    const total = countResult.total;
    const totalPages = Math.ceil(total / 100);

    res.json({
      batiments: rows,
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

const addBatiment = async (req, res) => {
  const batiment = req.body;
  try {
    const createdBatiment = await Batiment.createBatiment(batiment);
    res.status(201).json({
      message: "Batiment créée avec succès",
      Batiment: createdBatiment,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la création du batiment",
      error: err,
    });
  }
};

const updateBatiment = async (req, res) => {
  const { idBat } = req.params;
  const batiment = req.body;
  try {
    const updatedBatiment = await Batiment.updateBatiment(idBat, batiment);
    res.status(201).json({
      message: "Batiment mis à jour avec succès",
      Batiment: updatedBatiment,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du batiment",
      error: err,
    });
  }
};

const deleteBatiment = async (req, res) => {
  const { idBat } = req.params;
  try {
    await Batiment.deleteBatiment(idBat);
    res.status(201).json({
      message: "Batiment supprimé avec succès",
      IdBat: idBat,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la suppression du batiment",
      error: err,
    });
  }
};

export default {
  getBatiments,
  addBatiment,
  updateBatiment,
  deleteBatiment,
};
