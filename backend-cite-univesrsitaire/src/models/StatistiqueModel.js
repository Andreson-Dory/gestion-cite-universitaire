const db = require("../config/db");

const getStatistique = async () => {
    const [StudentCount] = await db.query("SELECT COUNT(*) as count FROM Etudiant;");
    const [BuildingCount] = await db.query("SELECT COUNT(*) as count FROM Batiment;")
    const [RoomCount] = await db.query("SELECT COUNT(*) as count FROM Chambre;");
    const [OccupedRooms] = await db.query("SELECT COUNT(*) as count FROM Chambre WHERE StatutCha='Occupée'");
    const [ReclamationCount] = await db.query("SELECT COUNT(*) as count FROM Reclamation;");
    const [PendingReclamationCount] = await db.query("SELECT COUNT(*) as count FROM Reclamation WHERE StatusRec='En attente';");
    const [SanctionCount] = await db.query("SELECT COUNT(*) as count FROM Sanction");

    const occupancyRate = RoomCount.count > 0 
      ? Math.round((OccupedRooms.count /RoomCount.count) * 100) 
      : 0;
    
    const [recentComplaints] = await db.query(`
      SELECT *
      FROM Reclamation 
      ORDER BY DateRec DESC 
      LIMIT 5;
    `);
    
    const [complaintsByPriority] = await db.query(`
      SELECT Priorite, COUNT(*) as count 
      FROM Reclamation 
      GROUP BY Priorite;
    `);
    
    const [occupancyByBuilding] = await db.query(`
      SELECT b.NomBat, COUNT(c.IdCha) as totalRooms, 
        SUM(CASE WHEN c.StatutCha = 'Occupée' THEN 1 ELSE 0 END) as occupiedRooms
      FROM Batiment b
      LEFT JOIN Chambre c ON b.IdBat = c.IdBat
      GROUP BY b.IdBat, b.NomBat;
    `);

    return ({
      totalEtudiant: StudentCount[0].count,
      totalBatiment: BuildingCount[0].count,
      totalChambre: RoomCount[0].count,
      chambreOccupee: OccupedRooms[0].count,
      tauxOccupation: occupancyRate,
      totalReclamation: ReclamationCount[0].count,
      reclamationEnAttente: PendingReclamationCount[0].count,
      totalSanctions: SanctionCount[0].count,
      reclamationsRecentes: recentComplaints,
      reclamationsParPriorite: complaintsByPriority,
      occupationBatiment: occupancyByBuilding
    });
};

module.exports = {
    getStatistique
}