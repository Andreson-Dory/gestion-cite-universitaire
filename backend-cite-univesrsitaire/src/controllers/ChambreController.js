import Chambre from "../models/ChambreModel.js";
import Attribuer from "../models/AttribuerModel.js";

const getChambres = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  try {
    const { rows, countResult } = await Chambre.getAllChambres(page);

    const chambres = await Promise.all(
      rows.map(async (r) => {
        const attributionInfo = await Attribuer.findIsChambreAttribuer(r.IdCha);
        return { ...r, Occupation: Number(attributionInfo.attributionCount) };
      }),
    );

    const total = countResult.total;
    const totalPages = Math.ceil(total / 100);

    res.json({ chambres, pagination: { page, total, totalPages } });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getFreeChambres = async (req, res) => {
  try {
    const results = await Chambre.getAllFreeChambres();

    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getChambreByEtudiant = async (req, res) => {
  const { idEtu } = req.params;
  try {
    const result = await Chambre.findChambreByEtudiant(idEtu);
    res.json(result);
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

export default {
  getChambres,
  getFreeChambres,
  getChambreByEtudiant,
  addChambre,
  updateChambre,
  deleteChambre,
};
