'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSelector } from 'react-redux';
//import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export default function TableauBord() {

  const { statistiques, status } = useSelector((state) => state.statistique);

  if (status === "error" ) return <div className="text-red-600">Erreur lors du chargement des statistiques</div>;
  if (status === "loading" ) return <div>Chargement des statistiques...</div>;

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Tableau de Bord</h1>
        <p className="text-gray-600 mt-2">Aperçu général du système de gestion</p>
      </div>

      {/* KPI Cards */}
      {/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Étudiants Inscrits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data?.totalStudents || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Chambres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data?.totalRooms || 0}</div>
            <p className="text-xs text-gray-500 mt-1">
              {data?.occupancyRate || 0}% occupées
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Réclamations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data?.totalComplaints || 0}</div>
            <p className="text-xs text-gray-500 mt-1">
              {data?.pendingComplaints || 0} en attente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Sanctions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data?.totalSanctions || 0}</div>
          </CardContent>
        </Card>
      </div>*/}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Occupancy by Building */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Occupation par Bâtiment</CardTitle>
            <CardDescription>Taux d&apos;occupation des chambres</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.occupancyByBuilding || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="NomBat" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="occupiedRooms" fill="#3b82f6" name="Occupées" />
                <Bar dataKey="totalRooms" fill="#e5e7eb" name="Total" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card> */}

        {/* Complaints by Priority */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Réclamations par Priorité</CardTitle>
            <CardDescription>Distribution des réclamations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data?.complaintsByPriority || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, count }) => `${name}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {(data?.complaintsByPriority || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card> */}
      </div>

      {/* Recent Complaints */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Réclamations Récentes</CardTitle>
          <CardDescription>Les 5 dernières réclamations du système</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(data?.recentComplaints || []).map((complaint) => (
              <div key={complaint.IdRec} className="flex items-center justify-between border-b pb-2">
                <div className="flex-1">
                  <p className="font-medium">{complaint.Sujet}</p>
                  <p className="text-sm text-gray-600">{complaint.DateRec}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                    {complaint.Priorite}
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    {complaint.StatusRec}
                  </span>
                </div>
              </div>
            ))}
            {(!data?.recentComplaints || data?.recentComplaints.length === 0) && (
              <p className="text-gray-500 text-center py-4">Aucune réclamation</p>
            )}
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
