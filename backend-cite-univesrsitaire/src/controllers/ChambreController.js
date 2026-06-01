const Chambre = require("../models/ChambreModel");
const Attribuer = require("../models/AttribuerModel");

const getChambres = async (req, res) => {
  try {
    const results = await Chambre.getAllChambres();

    const chambres = await Promise.all(
      results.map(async (r) => {
        const attributionInfo = await Attribuer.findIsChambreAttribuer(r.IdCha);
        return { ...r, Occupation: Number(attributionInfo.attributionCount) };
      }),
    );
    res.json(chambres);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addChambre = async (req, res) => {
  const chambre = req.body;
  try {
    const createdChambre = await Chambre.createChambre(chambre);
    res.status(201).json({
      message: "Chambre créée avec succès",
      Chambre: createdChambre,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la création du chambre",
      error: err,
    });
  }
};

const updateChambre = async (req, res) => {
  const { idCha } = req.params;
  const chambre = req.body;
  try {
    const updatedChambre = await Chambre.updateChambre(idCha, chambre);
    res.status(201).json({
      message: "Chambre mis à jour avec succès",
      Chambre: updatedChambre,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du chambre",
      error: err,
    });
  }
};

const deleteChambre = async (req, res) => {
  const { idCha } = req.params;
  try {
    await Chambre.deleteChambre(idCha);
    res.status(201).json({
      message: "Chambre supprimé avec succès",
      IdCha: idCha,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la suppression du chambre",
      error: err,
    });
  }
};

module.exports = {
  getChambres,
  addChambre,
  updateChambre,
  deleteChambre,
};
