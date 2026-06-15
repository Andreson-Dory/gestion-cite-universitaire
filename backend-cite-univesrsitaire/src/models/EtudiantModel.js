import db from "../config/db.js";

const findEtudiantById = async (idEtu) => {
  const [rows] = await db.query("SELECT * FROM Etudiant WHERE IdEtu = ?", [
    idEtu,
  ]);
  return rows[0] || null;
};

const getAllEtudiants = async (page = 1) => {
  const offset = (page - 1) * 100;
  const [rows] = await db.query(
    "SELECT * FROM Etudiant ORDER BY Created_at DESC LIMIT 100 OFFSET ?",
    [offset],
  );
  const [[countResult]] = await db.query(
    `
      SELECT COUNT(*) as total
      FROM Etudiant
      `,
  );
  return { rows, countResult };
};

const findEtudiantFromChambre = async (idCha) => {
  const query = `
    SELECT DISTINCT e.*
    FROM Etudiant AS e
    JOIN Attribuer AS a ON a.IdEtu = e.IdEtu
    WHERE a.IdCha = ?
      AND a.StatutAtt = 'En cours'
  `;
  const [rows] = await db.query(query, [idCha]);
  return rows;
};

const createEtudiant = async (etudiant) => {
  const query = `INSERT INTO Etudiant (Matricule, Nom, Sexe, DateNaissance, Telephone, Email, Filiere, Niveau, Universite) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
  const values = [
    etudiant.Matricule,
    etudiant.Nom,
    etudiant.Sexe,
    etudiant.DateNaissance,
    etudiant.Telephone,
    etudiant.Email,
    etudiant.Filiere,
    etudiant.Niveau,
    etudiant.Universite,
  ];
  const [result] = await db.query(query, values);
  const insertedId = result.insertId;
  return await findEtudiantById(insertedId);
};

const updateEtudiant = async (idEtu, etudiant) => {
  const query = `UPDATE Etudiant SET Matricule= ?, Nom= ?, Sexe= ?, DateNaissance= DATE(?), Telephone= ?, Email= ?, Filiere= ?, Niveau= ?, Universite= ? WHERE IdEtu= ?;`;
  const values = [
    etudiant.Matricule,
    etudiant.Nom,
    etudiant.Sexe,
    etudiant.DateNaissance,
    etudiant.Telephone,
    etudiant.Email,
    etudiant.Filiere,
    etudiant.Niveau,
    etudiant.Universite,
    idEtu,
  ];
  await db.query(query, values);
  return await findEtudiantById(idEtu);
};

const deleteEtudiant = async (IdEtu) => {
  const [result] = await db.query("DELETE FROM Etudiant WHERE idEtu= ?;", [
    IdEtu,
  ]);
  return result;
};

export default {
  getAllEtudiants,
  createEtudiant,
  updateEtudiant,
  deleteEtudiant,
  findEtudiantById,
  findEtudiantFromChambre,
};
