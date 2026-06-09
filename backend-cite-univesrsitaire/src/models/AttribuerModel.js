import db from "../config/db.js";

const getAllAttribuers = async () => {
  const query = `SELECT a.*, c.NumCha AS NumCha, e.Nom AS Nom, b.NomBat AS NomBat 
                    FROM Attribuer AS a 
                    JOIN Etudiant AS e ON a.IdEtu=e.IdEtu
                    JOIN Chambre AS c ON a.IdCha=c.IdCha
                    JOIN Batiment AS b on c.IdBat=b.IdBat
                    ORDER BY a.DateAtt DESC;`;
  const [rows] = await db.query(query);
  return rows;
};

const findAttribuerById = async (idAtt) => {
  const [rows] = await db.query(
    `SELECT a.*, c.NumCha AS NumCha, e.Nom AS Nom, b.NomBat AS NomBat 
                    FROM Attribuer AS a 
                    JOIN Etudiant AS e ON a.IdEtu=e.IdEtu
                    JOIN Chambre AS c ON a.IdCha=c.IdCha
                    JOIN Batiment AS b on c.IdBat=b.IdBat 
                    WHERE a.IdAtt = ?`,
    [idAtt],
  );
  return rows[0] || null;
};

const findIsChambreAttribuer = async (idCha) => {
  const [rows] = await db.query(
    `SELECT COUNT(a.IdAtt) AS attributionCount, c.Capacite AS capacity 
                    FROM Chambre AS c 
                    LEFT JOIN Attribuer a 
                    ON a.IdCha=c.IdCha AND a.StatutAtt='En cours' 
                    WHERE c.IdCha = ?
                    GROUP BY c.Capacite`,
    [idCha],
  );
  return rows[0] || null;
};

const createAttribuer = async (attribuer) => {
  const query = `INSERT INTO Attribuer (IdCha, IdEtu, DateAtt, DateFin, StatutAtt) VALUES (?, ?, ?, ?, ?);`;
  const values = [
    attribuer.IdCha,
    attribuer.IdEtu,
    attribuer.DateAtt,
    attribuer.DateFin,
    attribuer.StatutAtt,
  ];
  const [result] = await db.query(query, values);
  const insertedId = result.insertId;
  return await findAttribuerById(insertedId);
};

const updateAttribuer = async (IdAtt, attribuer) => {
  const query = `UPDATE Attribuer SET IdEtu= ?, IdCha= ?, DateFin= ?, StatutAtt= ? WHERE IdAtt= ?;`;
  const values = [
    attribuer.IdEtu,
    attribuer.IdCha,
    attribuer.DateFin,
    attribuer.StatutAtt,
    IdAtt,
  ];
  await db.query(query, values);
  return await findAttribuerById(IdAtt);
};

const toggleToFinishedAttribuer = async (IdAtt) => {
  await db.query(
    "UPDATE Attribuer SET StatutAtt='Terminé' WHERE IdAtt= ?;",
    IdAtt,
  );
  return await findAttribuerById(IdAtt);
};

const deleteAttribuer = async (IdAtt) => {
  const [result] = await db.query("DELETE FROM Attribuer WHERE idAtt= ?;", [
    IdAtt,
  ]);
  return result;
};

export default {
  getAllAttribuers,
  createAttribuer,
  updateAttribuer,
  deleteAttribuer,
  findAttribuerById,
  findIsChambreAttribuer,
  toggleToFinishedAttribuer,
};
