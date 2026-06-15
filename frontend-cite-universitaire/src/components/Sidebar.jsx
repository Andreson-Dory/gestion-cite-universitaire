import {
  AlertCircle,
  BanknoteArrowDown,
  Building2,
  Home,
  LogOut,
  PlusCircle,
  Users,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function Sidebar() {
  const navigate = useNavigate();
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

  const logout = () => {
    toast.custom(
      (t) => (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 p-6 w-100 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              Déconnexion
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Êtes vous sûr de vous déconnectez?
            </p>
          </div>
          <div className="flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => toast.dismiss(t)}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                toast.dismiss(t);
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                navigate("/login");
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Confirmer
            </Button>
          </div>
        </div>
      ),
      {
        duration: Infinity, // Keep open until action
      },
    );
  };

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
      {/* FOOTER (LOGOUT) */}
      <div className="py-4 border-t border-indigo-100">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-100 transition"
        >
          <LogOut className="w-5 h-5" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
