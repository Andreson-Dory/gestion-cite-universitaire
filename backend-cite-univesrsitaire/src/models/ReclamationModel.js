import db from "../config/db.js";

const getAllReclamations = async () => {
  const query = `
    SELECT r.*, e.Nom AS Nom 
    FROM Reclamation AS r 
    JOIN Etudiant AS e ON r.IdEtu=e.IdEtu
  `;
  const [rows] = await db.query(query);
  return rows;
};

const findReclamationById = async (idRec) => {
  const query = `
    SELECT r.*, e.Nom AS Nom 
    FROM Reclamation AS r 
    JOIN Etudiant AS e ON r.IdEtu=e.IdEtu 
    WHERE r.IdRec = ?
  `;
  const [rows] = await db.query(query, [idRec]);
  return rows[0] || null;
};

const createReclamation = async (reclamation) => {
  const query = `INSERT INTO Reclamation (DateRec, Sujet, DescriptionRec, StatusRec, Priorite, IdEtu) VALUES (?, ?, ?, ?, ?, ?);`;
  const values = [
    reclamation.DateRec,
    reclamation.Sujet,
    reclamation.DescriptionRec,
    reclamation.StatusRec,
    reclamation.Priorite,
    reclamation.IdEtu,
  ];
  const [result] = await db.query(query, values);
  const insertedId = result.insertId;
  return await findReclamationById(insertedId);
};

const updateReclamation = async (idRec, reclamation) => {
  const query = `UPDATE Reclamation SET Sujet= ?, DescriptionRec= ?, StatusRec= ?, Priorite= ? WHERE IdRec= ?;`;
  const values = [
    reclamation.Sujet,
    reclamation.DescriptionRec,
    reclamation.StatusRec,
    reclamation.Priorite,
    idRec,
  ];
  await db.query(query, values);
  return await findReclamationById(idRec);
};

const deleteReclamation = async (IdRec) => {
  const [result] = await db.query("DELETE FROM Reclamation WHERE idRec= ?;", [
    IdRec,
  ]);
  return result;
};

export default {
  getAllReclamations,
  createReclamation,
  updateReclamation,
  deleteReclamation,
  findReclamationById,
};
