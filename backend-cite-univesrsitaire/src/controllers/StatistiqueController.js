const Statistique = require("../models/StatistiqueModel");

const getStatistique = async (req, res) => {
    try {
        const results = await Statistique.getStatistique();
        res.json(results);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    getStatistique
}