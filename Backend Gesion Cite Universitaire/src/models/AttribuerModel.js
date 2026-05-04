const db = require("../config/db");


const getAllAttribuers = async () => {
    const [rows] = await db.query("SELECT * FROM Attribuer");
    return rows;
};

const createAttribuer = async (attribuer) => {
    const query =
        `INSERT INTO Attribuer (IdCha, IdBat, IdEtu, DateFin, StatutAtt) VALUES (?, ?, ?, ?, ?);`;
    const values = [
        attribuer.IdCha,
        attribuer.IdBat,
        attribuer.IdEtu,
        attribuer.DateFin,
        attribuer.StatutAtt
    ];
    const [result] = await db.query(query, values);
    return result;
};

const updateAttribuer = async (idAtt, attribuer) => {
    const query =
        `UPDATE Attribuer SET IdBat= ?, IdEtu= ?, IdCha= ?, DateFin= ?, StatutAtt= ? WHERE IdAtt= ?;`;
    const values = [
        attribuer.IdBat,
        attribuer.IdEtu,
        attribuer.IdCha,
        attribuer.DateFin,
        attribuer.StatutAtt,
        idAtt
    ];
    const [result] = await db.query(query, values);
    return result;
};

const deleteAttribuer = async (IdAtt) => {
    const [result] = await db.query("DELETE FROM Attribuer WHERE idAtt= ?;", [IdAtt]);
    return result;
};

module.exports = {
    getAllAttribuers,
    createAttribuer,
    updateAttribuer,
    deleteAttribuer
};