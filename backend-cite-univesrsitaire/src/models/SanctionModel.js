import db from "../config/db.js";

const getAllSanctions = async (page = 1) => {
  const offset = (page - 1) * 100;
  const query = `
    SELECT s.*, e.Nom AS Nom 
    FROM Sanction AS s 
    JOIN Etudiant AS e ON s.IdEtu=e.IdEtu
    ORDER BY DateSac DESC
    LIMIT 100 OFFSET ?
  `;
  const [rows] = await db.query(query, [offset]);
  const [[countResult]] = await db.query(
    `SELECT COUNT(*) as total FROM Sanction`,
  );
  return { rows, countResult };
};

const findSanctionById = async (idSac) => {
  const query = `
    SELECT s.*, e.Nom AS Nom 
    FROM Sanction AS s 
    JOIN Etudiant AS e ON s.IdEtu=e.IdEtu
    WHERE IdSac = ?
  `;
  const [rows] = await db.query(query, [idSac]);
  return rows[0] || null;
};

const findSanctionByEtudiant = async (idEtu, page = 1) => {
  const offset = (page - 1) * 3;
  const query = `
    SELECT *
    FROM Sanction
    WHERE IdEtu = ?
    ORDER BY DateSac DESC 
    LIMIT 3 OFFSET ?
  `;
  const [rows] = await db.query(query, [idEtu, offset]);
  const [[countResult]] = await db.query(
    `
      SELECT COUNT(*) as total
      FROM Sanction WHERE IdEtu = ?
      `,
    [idEtu],
  );
  return { rows, countResult };
};

const createSanction = async (sanction) => {
  const query = `INSERT INTO Sanction (DateSac, Motif, DescriptionSac, MontantAmende, StatusSac, IdEtu) VALUES (?, ?, ?, ?, ?, ?);`;
  const values = [
    sanction.DateSac,
    sanction.Motif,
    sanction.DescriptionSac,
    sanction.MontantAmende,
    sanction.StatusSac,
    sanction.IdEtu,
  ];
  const [result] = await db.query(query, values);
  const insertedId = result.insertId;
  return await findSanctionById(insertedId);
};

const updateSanction = async (idSac, sanction) => {
  const query = `UPDATE Sanction SET Motif= ?, DescriptionSac= ?, MontantAmende= ?, StatusSac= ? WHERE IdSac= ?;`;
  const values = [
    sanction.Motif,
    sanction.DescriptionSac,
    sanction.MontantAmende,
    sanction.StatusSac,
    idSac,
  ];
  await db.query(query, values);
  return await findSanctionById(idSac);
};

const deleteSanction = async (IdSac) => {
  const [result] = await db.query("DELETE FROM Sanction WHERE idSac= ?;", [
    IdSac,
  ]);
  return result;
};

export default {
  getAllSanctions,
  createSanction,
  updateSanction,
  deleteSanction,
  findSanctionById,
  findSanctionByEtudiant,
};
