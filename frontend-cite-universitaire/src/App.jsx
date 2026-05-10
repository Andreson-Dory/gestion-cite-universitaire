import './App.css';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "sonner";
import TableauBord from './views/talbkeau-bord/index.jsx';
import BatimentChambre from './views/batiment-chambre/index.jsx';
import ReclamationSanction from './views/reclamation-sanction/index.jsx';
import EtudiantPage from './views/etudiant/index.jsx';

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />

      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<TableauBord />} />
            <Route path="/batiment-chambre" element={<BatimentChambre />} />
            <Route path="/etudiant" element={<EtudiantPage />} />
            <Route path="/reclamation-sanction" element={<ReclamationSanction />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;