"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchStatistique } from "@/redux/features/statistique/statistiqueThunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function TableauBord() {
  const dispatch = useDispatch();
  const { statistiques, status } = useSelector((state) => state.statistique);

  useEffect(() => {
    dispatch(fetchStatistique());
  }, []);

  if (status === "error")
    return (
      <div className="text-red-600">
        Erreur lors du chargement des statistiques
      </div>
    );
  if (status === "loading") return <div>Chargement des statistiques...</div>;

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Tableau de Bord</h1>
        <p className="text-gray-600 mt-2">
          Aperçu général du système de gestion
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Étudiants Inscrits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {statistiques?.totalEtudiant || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Chambres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {statistiques?.totalChambre || 0}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {statistiques?.tauxOccupation || 0}% occupées
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Réclamations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {statistiques?.totalReclamation || 0}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {statistiques?.reclamationEnAttente || 0} en attente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Sanctions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {statistiques?.totalSanctions || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div>
        {/* Occupancy by Building */}
        <Card>
          <CardHeader>
            <CardTitle>Occupation par Bâtiment</CardTitle>
            <CardDescription>
              Taux d&apos;occupation des chambres
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statistiques?.occupationBatiment || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="NomBat" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="occupiedRooms" fill="#3b82f6" name="Occupées" />
                <Bar dataKey="totalRooms" fill="#6a7282" name="Total" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Complaints */}
      <Card>
        <CardHeader>
          <CardTitle>Réclamations Récentes</CardTitle>
          <CardDescription>
            Les 5 dernières réclamations du système
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(statistiques?.reclamationsRecentes || []).map((reclamation) => (
              <div
                key={reclamation.IdRec}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex-1">
                  <p className="font-medium">{reclamation.Sujet}</p>
                  <p className="text-sm text-gray-600">{reclamation.DateRec}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                    {reclamation.Priorite}
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    {reclamation.StatusRec}
                  </span>
                </div>
              </div>
            ))}
            {(!statistiques?.reclamationsRecentes ||
              statistiques?.reclamationsRecentes.length === 0) && (
              <p className="text-gray-500 text-center py-4">
                Aucune réclamation
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
