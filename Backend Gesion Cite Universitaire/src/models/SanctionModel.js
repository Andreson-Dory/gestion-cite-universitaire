const db = require("../config/db");

const getAllSanctions = async () => {
    const [rows] = await db.query("SELECT * FROM Sanction");
    return rows;
};

const createSanction = async (sanction) => {
    const query =
        `INSERT INTO Sanction (Motif, DescriptionSac, MontantAmende, StatutSac, IdEtu) VALUES (?, ?, ?, ?, ?);`;
    const values = [
        sanction.Motif,
        sanction.DescriptionSac,
        sanction.MontantAmende,
        sanction.StatutSac,
        sanction.IdEtu
    ];
    const [result] = await db.query(query, values);
    return result;
};

const updateSanction = async (idSac, sanction) => {
    const query =
        `UPDATE Sanction SET Motif= ?, DescriptionSac= ?, MontantAmende= ?, StatutSac= ? WHERE IdSac= ?;`;
    const values = [
        sanction.Motif,
        sanction.DescriptionSac,
        sanction.MontantAmende,
        sanction.StatutSac,
        idSac
    ];
    const [result] = await db.query(query, values);
    return result;
};

const deleteSanction = async (IdSac) => {
    const [result] = await db.query("DELETE FROM Sanction WHERE idSac= ?;", [IdSac]);
    return result;
};

module.exports = {
    getAllSanctions,
    createSanction,
    updateSanction,
    deleteSanction
};