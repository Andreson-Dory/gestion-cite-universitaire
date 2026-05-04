const db = require("../config/db");

const getAllReclamations = async () => {
    const [rows] = await db.query("SELECT * FROM Reclamation");
    return rows;
};

const createReclamation = async (reclamation) => {
    const query =
        `INSERT INTO Reclamation (Sujet, DescriptionRec, StatutRec, Priorite, IdEtu) VALUES (?, ?, ?, ?, ?);`;
    const values = [
        reclamation.Sujet,
        reclamation.DecriptionRec,
        reclamation.StatutRec,
        reclamation.Priorite,
        reclamation.IdEtu
    ];
    const [result] = await db.query(query, values);
    return result;
};

const updateReclamation = async (idRec, reclamation) => {
    const query =
        `UPDATE Reclamation SET Sujet= ?, DescriptionRec= ?, StatutRec= ?, Priorite= ? WHERE IdRec= ?;`;
    const values = [
        reclamation.Sujet,
        reclamation.DecriptionRec,
        reclamation.StatutRec,
        reclamation.Priorite,
        idRec
    ];
    const [result] = await db.query(query, values);
    return result;
};

const deleteReclamation = async (IdRec) => {
    const [result] = await db.query("DELETE FROM Reclamation WHERE idRec= ?;", [IdRec]);
    return result;
};

module.exports = {
    getAllReclamations,
    createReclamation,
    updateReclamation,
    deleteReclamation
};