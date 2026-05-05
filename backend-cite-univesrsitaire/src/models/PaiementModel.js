const db = require("../config/db");

const getAllPaiements = async () => {
    const [rows] = await db.query("SELECT * FROM Paiement");
    return rows;
};

const findPaiementById = async (idPai) => {
    const [rows] = await db.query("SELECT * FROM Paiement WHERE IdPai = ?", [idPai]);
    return rows[0] || null;
};

const createPaiement = async (paiement) => {
    const query =
        `INSERT INTO Paiement (MontantPai, Typepai, ModePai, StatutPai, IdEtu) VALUES (?, ?, ?, ?, ?);`;
    const values = [
        paiement.MontantPai,
        paiement.TypePai,
        paiement.ModePai,
        paiement.StatutPai,
        paiement.IdEtu
    ];
    const [result] = await db.query(query, values);
    const insertedId = result.insertId;
    return await findPaiementById(insertedId);
};

const deletePaiement = async (IdPai) => {
    const [result] = await db.query("DELETE FROM Paiement WHERE idPai= ?;", [IdPai]);
    return result;
};

module.exports = {
    getAllPaiements,
    createPaiement,
    deletePaiement,
    findPaiementById
};