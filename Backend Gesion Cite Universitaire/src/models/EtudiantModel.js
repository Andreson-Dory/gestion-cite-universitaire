const db = require("../config/db");

const getAllEtudiants = async () => {
    const [rows] = await db.query("SELECT * FROM Etudiant");
    return rows;
};

const createEtudiant = async (etudiant) => {
    const query =
        `INSERT INTO Etudiant (Matricule, Nom, Sexe, DateNaissance, Telephone, Email, Filiere, Niveau, Universite) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    const values = [
        etudiant.Matricule,
        etudiant.Nom,
        etudiant.Sexe,
        etudiant.DateNaissance,
        etudiant.Telephone,
        etudiant.Email,
        etudiant.Fillier,
        etudiant.Niveau,
        etudiant.Universite
    ];
    const [result] = await db.query(query, values);
    return result;
};

const updateEtudiant = async (idEtu, etudiant) => {
    const query =
        `UPDATE Etudiant SET Matricule= ?, Nom= ?, Sexe= ?, DateNaissance= ?, Telephone= ?, Email= ?, Filiere= ?, Niveau= ?, Universite= ? WHERE IdEtu= ?;`;
    const values = [
        etudiant.Matricule,
        etudiant.Nom,
        etudiant.Sexe,
        etudiant.DateNaissance,
        etudiant.Telephone,
        etudiant.Email,
        etudiant.Fillier,
        etudiant.Niveau,
        etudiant.Universite,
        idEtu
    ];
    const [result] = await db.query(query, values);
    return result;
};

const deleteEtudiant = async (IdEtu) => {
    const [result] = await db.query("DELETE FROM Etudiant WHERE idEtu= ?;", [IdEtu]);
    return result;
};

module.exports = {
    getAllEtudiants,
    createEtudiant,
    updateEtudiant,
    deleteEtudiant
};