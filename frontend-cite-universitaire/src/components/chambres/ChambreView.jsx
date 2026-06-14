import { Bed, Building, Hash, Layers, Users, User } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";
import InfoItem from "../utils/InfoItem";

export default function ChambreView({ isOpen, setIsOpen, chambre, etudiants }) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        className="w-[calc(100%-16rem)]! max-w-[calc(100%-16rem)]! overflow-y-auto p-6"
      >
        <SheetTitle className="text-center text-2xl font-bold mb-8">
          Informations de la chambre
        </SheetTitle>

        {/* Chambre informations */}
        <section className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase">
            Informations générales
          </h3>

          <div className="grid gap-4 md:grid-cols-6">
            <InfoItem
              icon={<Hash className="h-4 w-4" />}
              label="Numéro"
              value={chambre.NumCha}
            />

            <InfoItem
              icon={<Bed className="h-4 w-4" />}
              label="Type"
              value={chambre.TypeCha}
            />

            <InfoItem
              icon={<Users className="h-4 w-4" />}
              label="Capacité"
              value={`${chambre.Occupation}/${chambre.Capacite}`}
            />

            <InfoItem
              icon={<Layers className="h-4 w-4" />}
              label="Étage"
              value={chambre.Etage}
            />

            <InfoItem
              icon={<Building className="h-4 w-4" />}
              label="Bâtiment"
              value={chambre.NomBat}
            />

            <InfoItem
              icon={<Bed className="h-4 w-4" />}
              label="Statut"
              value={chambre.StatutCha}
            />
          </div>
        </section>

        {/* Occupants */}
        <section className="mt-4 rounded-xl border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase">
              Occupant{etudiants?.length > 1 ? "s" : ""}
            </h3>

            <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
              {etudiants?.length || 0}
            </span>
          </div>

          <div className="max-h-135.7 overflow-y-auto divide-y">
            {(etudiants || []).map((etudiant) => (
              <div key={etudiant.IdEtu} className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <p className="font-semibold">{etudiant.Nom}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Matricule</p>
                    <p>{etudiant.Matricule}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Téléphone</p>
                    <p>{etudiant.Telephone || "-"}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="truncate">{etudiant.Email || "-"}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Sexe</p>
                    <p>{etudiant.Sexe}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Filière</p>
                    <p>{etudiant.Filiere || "-"}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Niveau</p>
                    <p>{etudiant.Niveau || "-"}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Université</p>
                    <p>{etudiant.Universite || "-"}</p>
                  </div>
                </div>
              </div>
            ))}

            {!etudiants?.length && (
              <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
                Aucun étudiant n'occupe cette chambre
              </div>
            )}
          </div>
        </section>
      </SheetContent>
    </Sheet>
  );
}
