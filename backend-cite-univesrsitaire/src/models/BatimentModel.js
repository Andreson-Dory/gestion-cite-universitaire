const db = require("../config/db");

const getAllBatiments = async () => {
    const [rows] = await db.query("SELECT * FROM Batiment");
    return rows;
};

const createBatiment = async (batiment) => {
    const query =
        `INSERT INTO Batiment (NomBat, TypeBat, NbEtage, Description) VALUES (?, ?, ?, ?);`;
    const values = [
        batiment.NomBat,
        batiment.TypeBat,
        batiment.NbEtage,
        batiment.Description
    ];
    const [result] = await db.query(query, values);
    return result;
};

const updateBatiment = async (idBat, batiment) => {
    const query =
        `UPDATE Batiment SET NomBat= ?, TypeBat= ?, NbEtage= ?, Description= ? WHERE IdBat= ?;`;
    const values = [
        batiment.NomBat,
        batiment.TypeBat,
        batiment.NbEtage,
        batiment.Description,
        idBat
    ];
    const [result] = await db.query(query, values);
    return result;
};

const deleteBatiment = async (IdBat) => {
    const [result] = await db.query("DELETE FROM Batiment WHERE idBat= ?;", [IdBat]);
    return result;
};

module.exports = {
    getAllBatiments,
    createBatiment,
    updateBatiment,
    deleteBatiment
};