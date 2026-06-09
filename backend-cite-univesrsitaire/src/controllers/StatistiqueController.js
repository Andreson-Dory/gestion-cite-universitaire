import Statistique from "../models/StatistiqueModel.js";

const getStatistique = async (req, res) => {
  try {
    const results = await Statistique.getStatistique();
    res.json(results);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default {
  getStatistique,
};
