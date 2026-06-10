import db from "../config/db.js";

const getAllBatiments = async () => {
  const [rows] = await db.query("SELECT * FROM Batiment");
  return rows;
};

const findBatimentById = async (idBat) => {
  const [rows] = await db.query("SELECT * FROM Batiment WHERE IdBat = ?", [
    idBat,
  ]);
  return rows[0] || null;
};

const createBatiment = async (batiment) => {
  const query = `INSERT INTO Batiment (NomBat, TypeBat, NbEtage, Description) VALUES (?, ?, ?, ?);`;
  const values = [
    batiment.NomBat,
    batiment.TypeBat,
    batiment.NbEtage,
    batiment.Description,
  ];
  const [result] = await db.query(query, values);
  const insertedId = result.insertId;
  return await findBatimentById(insertedId);
};

const updateBatiment = async (idBat, batiment) => {
  const query = `UPDATE Batiment SET NomBat= ?, TypeBat= ?, NbEtage= ?, Description= ? WHERE IdBat= ?;`;
  const values = [
    batiment.NomBat,
    batiment.TypeBat,
    batiment.NbEtage,
    batiment.Description,
    idBat,
  ];
  await db.query(query, values);
  return await findBatimentById(idBat);
};

const deleteBatiment = async (IdBat) => {
  const [result] = await db.query("DELETE FROM Batiment WHERE idBat= ?;", [
    IdBat,
  ]);
  return result;
};

export default {
  getAllBatiments,
  createBatiment,
  updateBatiment,
  deleteBatiment,
  findBatimentById,
};
