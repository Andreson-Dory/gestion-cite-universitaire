import { Folder, Home, Settings, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menu = [
    { to: "/", label: "Tableau de bord", icon: Home },
    { to: "/batiment-chambre", label: "Bâtiments & Chambres", icon: Folder },
    { to: "/etudiant", label: "Étudiants", icon: Users },
    { to: "/reclamation-sanction", label: "Réclamations & Sanctions", icon: Settings },
  ];

  return (
    <aside className="flex flex-col h-screen bg-slate-900 text-white w-64 p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Cité Universitaire</h1>
        <p className="text-xs text-gray-400">Système de Gestion</p>
      </div>
      <nav className="flex-1 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-slate-700 text-white"
                    : "text-gray-400 hover:bg-slate-800 hover:text-white"
                }`
              }
              end={item.to === "/"}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
      <div className="p-4 border-t text-xs text-gray-400">v0.1 prototype</div>
    </aside>
  );
}