import db from "../config/db.js";
import Attribuer from "../models/AttribuerModel.js";

const getAllChambres = async () => {
  const query = `
    SELECT c.*, b.NomBat AS NomBat
    FROM Chambre AS c
    JOIN Batiment AS b ON b.IdBat=c.IdBat 
  `;
  const [rows] = await db.query(query);
  return rows;
};

const findChambreById = async (idCha) => {
  const query = `
    SELECT c.*, b.NomBat AS NomBat 
    FROM Chambre AS c 
    JOIN Batiment AS b ON b.IdBat=c.IdBat
    WHERE IdCha = ?
  `;
  const [rows] = await db.query(query, [idCha]);
  return rows[0] || null;
};

const createChambre = async (chambre) => {
  const query = `INSERT INTO Chambre (NumCha, TypeCha, Capacite, Etage, StatutCha, IdBat) VALUES (?, ?, ?, ?, ?, ?);`;
  const values = [
    chambre.NumCha,
    chambre.TypeCha,
    chambre.Capacite,
    chambre.Etage,
    chambre.StatutCha,
    chambre.IdBat,
  ];
  const [result] = await db.query(query, values);
  const insertedId = result.insertId;
  const insertedChambre = await findChambreById(insertedId);
  const attributionInfo = await Attribuer.findIsChambreAttribuer(insertedId);
  const attributionCount = Number(attributionInfo.attributionCount);
  return { ...insertedChambre, Occupation: attributionCount };
};

const updateChambre = async (idCha, chambre) => {
  const query = `UPDATE Chambre SET NumCha= ?, TypeCha= ?, Capacite= ?, Etage= ?, StatutCha= ?, IdBat= ? WHERE IdCha= ?;`;
  const values = [
    chambre.NumCha,
    chambre.TypeCha,
    chambre.Capacite,
    chambre.Etage,
    chambre.StatutCha,
    chambre.IdBat,
    idCha,
  ];
  await db.query(query, values);
  const attributionInfo = await Attribuer.findIsChambreAttribuer(idCha);
  const attributionCount = Number(attributionInfo.attributionCount);
  return { ...insertedChambre, Occupation: attributionCount };
};

const updateToOccupedChambreStatus = async (idCha) => {
  const query = `UPDATE Chambre SET StatutCha="Occupée" WHERE IdCha= ?;`;
  const values = [idCha];
  await db.query(query, values);
  return await findChambreById(idCha);
};

const updateToFreeChambreStatus = async (idCha) => {
  const query = `UPDATE Chambre SET StatutCha="Libre" WHERE IdCha= ?;`;
  const values = [idCha];
  await db.query(query, values);
  return await findChambreById(idCha);
};

const deleteChambre = async (IdCha) => {
  const [result] = await db.query("DELETE FROM Chambre WHERE idCha= ?;", [
    IdCha,
  ]);
  return result;
};

export default {
  getAllChambres,
  createChambre,
  updateChambre,
  updateToOccupedChambreStatus,
  updateToFreeChambreStatus,
  deleteChambre,
  findChambreById,
};
