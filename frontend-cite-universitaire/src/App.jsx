import "./App.css";
import Sidebar from "./components/Sidebar";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import TableauBord from "./views/tableau-bord/index.jsx";
import BatimentChambre from "./views/batiment-chambre/index.jsx";
import ReclamationSanction from "./views/reclamation-sanction/index.jsx";
import EtudiantPage from "./views/etudiant/index.jsx";
import AttribuerPage from "./views/attribuer/index.jsx";
import PaiementPage from "./views/paiement";
import ProtectedRoute from "./components/route/protectedRoutes";
import LoginPage from "./views/login/login";

function App() {
  const location = useLocation();
  const hideSidebar = ["/login"].includes(location.pathname);

  return (
    <>
      <Toaster position="top-center" richColors />

      <div className="flex h-screen bg-gray-100">
        {!hideSidebar && <Sidebar />}
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <TableauBord />
                </ProtectedRoute>
              }
            />
            <Route
              path="/etudiant"
              element={
                <ProtectedRoute>
                  <EtudiantPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/attribuer"
              element={
                <ProtectedRoute>
                  <AttribuerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/paiement"
              element={
                <ProtectedRoute>
                  <PaiementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/batiment-chambre"
              element={
                <ProtectedRoute>
                  <BatimentChambre />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reclamation-sanction"
              element={
                <ProtectedRoute>
                  <ReclamationSanction />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
