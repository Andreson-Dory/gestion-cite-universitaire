const db = require("../config/db");

const getAllChambres = async () => {
    const [rows] = await db.query("SELECT * FROM Chambre");
    return rows;
};

const createChambre = async (chambre) => {
    const query =
        `INSERT INTO Chambre (NumCha, TypeCha, Capacite, Etage, StatutCha, IdBat) VALUES (?, ?, ?, ?, ?, ?);`;
    const values = [
        chambre.NumCha,
        chambre.TypeCha,
        chambre.Capacite,
        chambre.Etage,
        chambre.StatutCha,
        chambre.IdBat
    ];
    const [result] = await db.query(query, values);
    return result;
};

const updateChambre = async (idCha, chambre) => {
    const query =
        `UPDATE Chambre SET NumCha= ?, TypeCha= ?, Capacite= ?, Etage= ?, StatutCha= ?, IdBat= ? WHERE IdCha= ?;`;
    const values = [
        chambre.NumCha,
        chambre.TypeCha,
        chambre.Capacite,
        chambre.Etage,
        chambre.StatutCha,
        chambre.IdBat,
        idCha
    ];
    const [result] = await db.query(query, values);
    return result;
};

const deleteChambre = async (IdCha) => {
    const [result] = await db.query("DELETE FROM Chambre WHERE idCha= ?;", [IdCha]);
    return result;
};

module.exports = {
    getAllChambres,
    createChambre,
    updateChambre,
    deleteChambre
};