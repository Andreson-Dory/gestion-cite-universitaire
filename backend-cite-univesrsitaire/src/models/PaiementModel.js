import db from "../config/db.js";

const getAllPaiements = async (page = 1) => {
  const offset = (page - 1) * 100;
  const query = `
        SELECT p.*, e.Nom AS NomEtudiant, e.Email AS Email  
        FROM Paiement AS p 
        JOIN Etudiant AS e ON p.IdEtu=e.IdEtu
        ORDER BY DatePai DESC
        LIMIT 100 OFFSET ?
    `;
  const [rows] = await db.query(query, [offset]);
  const [[countResult]] = await db.query(
    `SELECT COUNT(*) as total FROM Paiement`,
  );
  return { rows, countResult };
};

const findPaiementById = async (idPai) => {
  const query = `
        SELECT p.*, e.Nom AS NomEtudiant, e.Email AS Email 
        FROM Paiement AS p 
        JOIN Etudiant AS e ON p.IdEtu=e.IdEtu 
        WHERE IdPai = ?
    `;
  const [rows] = await db.query(query, [idPai]);
  return rows[0] || null;
};

const findPaiementByEtudiant = async (idEtu, page = 1) => {
  const offset = (page - 1) * 3;
  const query = `
        SELECT *
        FROM Paiement 
        WHERE IdEtu = ?
        ORDER BY DatePai DESC 
        LIMIT 3 OFFSET ?
    `;
  const [rows] = await db.query(query, [idEtu, offset]);
  const [[countResult]] = await db.query(
    `
      SELECT COUNT(*) as total
      FROM Paiement WHERE IdEtu = ?
      `,
    [idEtu],
  );
  return { rows, countResult };
};

const createPaiement = async (paiement) => {
  const query = `INSERT INTO Paiement (DatePai, MontantPai, Typepai, ModePai, StatutPai, IdEtu) VALUES (?, ?, ?, ?, ?, ?);`;
  const values = [
    paiement.DatePai,
    paiement.MontantPai,
    paiement.TypePai,
    paiement.ModePai,
    paiement.StatutPai,
    paiement.IdEtu,
  ];
  const [result] = await db.query(query, values);
  const insertedId = result.insertId;
  return await findPaiementById(insertedId);
};

const deletePaiement = async (IdPai) => {
  const [result] = await db.query("DELETE FROM Paiement WHERE idPai= ?;", [
    IdPai,
  ]);
  return result;
};

export default {
  getAllPaiements,
  createPaiement,
  deletePaiement,
  findPaiementById,
  findPaiementByEtudiant,
};
