import {
  AlertCircle,
  BanknoteArrowDown,
  Building2,
  Home,
  PlusCircle,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menu = [
    { to: "/", label: "Tableau de bord", icon: Home },
    { to: "/etudiant", label: "Étudiants", icon: Users },
    { to: "/attribuer", label: "Attribution chambre", icon: PlusCircle },
    { to: "/paiement", label: "Paiement", icon: BanknoteArrowDown },
    { to: "/batiment-chambre", label: "Bâtiments & Chambres", icon: Building2 },
    {
      to: "/reclamation-sanction",
      label: "Réclamations & Sanctions",
      icon: AlertCircle,
    },
  ];

  return (
    <aside className="flex flex-col h-screen bg-slate-900 text-white w-64 p-4">
      <div className="mb-8 flex">
        <img alt="Logo" src="/logo.png" className="w-12 h-12" />
        <div className="ml-2">
          <h1 className="text-2xl font-bold">CITE-U</h1>
          <p className="text-xs text-gray-400 ">Système de Gestion</p>
        </div>
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
    </aside>
  );
}
