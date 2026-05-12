const db = require("../config/db");

const getAllSanctions = async () => {
    const [rows] = await db.query("SELECT * FROM Sanction");
    return rows;
};

const findSanctionById = async (idSac) => {
    const [rows] = await db.query("SELECT * FROM Sanction WHERE IdSac = ?", [idSac]);
    return rows[0] || null;
};

const createSanction = async (sanction) => {
    const query =
        `INSERT INTO Sanction (DateSac, Motif, DescriptionSac, MontantAmende, StatusSac, IdEtu) VALUES (?, ?, ?, ?, ?, ?);`;
    const values = [
        sanction.DateSac,
        sanction.Motif,
        sanction.DescriptionSac,
        sanction.MontantAmende,
        sanction.StatusSac,
        sanction.IdEtu
    ];
    const [result] = await db.query(query, values);
    const insertedId = result.insertId;
    return await findSanctionById(insertedId);
};

const updateSanction = async (idSac, sanction) => {
    const query =
        `UPDATE Sanction SET Motif= ?, DescriptionSac= ?, MontantAmende= ?, StatusSac= ? WHERE IdSac= ?;`;
    const values = [
        sanction.Motif,
        sanction.DescriptionSac,
        sanction.MontantAmende,
        sanction.StatusSac,
        idSac
    ];
    await db.query(query, values);
    return await findSanctionById(idSac);
};

const deleteSanction = async (IdSac) => {
    const [result] = await db.query("DELETE FROM Sanction WHERE idSac= ?;", [IdSac]);
    return result;
};

module.exports = {
    getAllSanctions,
    createSanction,
    updateSanction,
    deleteSanction,
    findSanctionById
};