const Attribuer = require("../models/AttribuerModel");
const Chambre = require("../models/ChambreModel");

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
    const attributionInfo = await Attribuer.findIsChambreAttribuer(
      attribuer.IdCha,
    );

    const attributionCount = Number(attributionInfo.attributionCount);
    const capacity = Number(attributionInfo.capacity);

    if (attributionCount >= capacity) {
      return res.status(400).json({
        message: "Cette chambre a atteint la limite maximale des locataires",
      });
    }

    const createdAttribuer = await Attribuer.createAttribuer(attribuer);
    if (attributionCount == capacity - 1) {
      await Chambre.updateToOccupedChambreStatus(attribuer.IdCha);
    }
    res.status(201).json({
      message: "Chambre attribuée avec succès",
      Attribuer: createdAttribuer,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de l'attribution du chambre",
      error: err,
    });
  }
};

const updateAttribuer = async (req, res) => {
  const { idAtt } = req.params;
  const attribuer = req.body;

  try {
    const updatedAttribuer = await Attribuer.updateAttribuer(idAtt, attribuer);
    res.status(201).json({
      message: "Attribution du chambre mis à jour avec succès",
      Attribuer: updatedAttribuer,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du chambre",
      error: err,
    });
  }
};

const toggleToFinishedAttribuer = async (req, res) => {
  const { idAtt, idCha } = req.body;

  try {
    const updatedAttribuer = await Attribuer.toggleToFinishedAttribuer(idAtt);
    await Chambre.updateToFreeChambreStatus(idCha);
    res.status(201).json({
      message: "Attribution marqué comme terminé",
      Attribuer: updatedAttribuer,
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Erreur lors du marquage comme terminé de l'attribution du chambre",
      error: err,
    });
  }
};

const deleteAttribuer = async (req, res) => {
  const { idAtt } = req.params;
  try {
    await Attribuer.deleteAttribuer(idAtt);
    res.status(201).json({
      message: "Suppression d'attribution du chambre réussit",
      IdAtt: idAtt,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la suppression de l'attribution du chambre",
      error: err,
    });
  }
};

module.exports = {
  getAttribuers,
  addAttribuer,
  updateAttribuer,
  deleteAttribuer,
  toggleToFinishedAttribuer,
};
