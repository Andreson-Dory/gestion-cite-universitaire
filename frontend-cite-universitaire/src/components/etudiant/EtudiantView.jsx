import {
  Building,
  Calendar,
  Calendar1,
  Contact,
  Glasses,
  GraduationCap,
  Hash,
  LucideMapPinXInside,
  Mail,
  Phone,
  UniversityIcon,
  VenusAndMars,
} from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";
import InfoItem from "../utils/InfoItem";

export default function EtudiantView({
  isOpen,
  setIsOpen,
  etudiant,
  attribution,
  reclamations,
  sanctions,
  paiements,
}) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        className="w-[calc(100%-16rem)]! max-w-[calc(100%-16rem)]! overflow-y-auto p-6"
      >
        <SheetTitle className="text-center text-2xl font-bold mb-8">
          Informations de l'étudiant
        </SheetTitle>

        {/* Personnal Informations */}
        <section className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase">
            Informations personnelles
          </h3>

          <div className="grid gap-4 md:grid-cols-6 xl:grid-cols-6">
            <InfoItem
              icon={<Hash className="h-4 w-4" />}
              label="Matricule"
              value={etudiant.Matricule}
            />

            <InfoItem
              icon={<Contact className="h-4 w-4" />}
              label="Nom"
              value={etudiant.Nom}
            />

            <InfoItem
              icon={<VenusAndMars className="h-4 w-4" />}
              label="Sexe"
              value={etudiant.Sexe}
            />

            <InfoItem
              icon={<Calendar className="h-4 w-4" />}
              label="Date de naissance"
              value={etudiant.DateNaissance}
            />

            <InfoItem
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              value={etudiant.Email}
            />

            <InfoItem
              icon={<Phone className="h-4 w-4" />}
              label="Téléphone"
              value={etudiant.Telephone}
            />
          </div>
        </section>

        {/* Academic Informations */}
        <section className="space-y-2 mt-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase">
            Informations académiques
          </h3>

          <div className="grid gap-4 md:grid-cols-6 xl:grid-cols-6">
            <InfoItem
              icon={<UniversityIcon className="h-4 w-4" />}
              label="Université"
              value={etudiant.Universite}
            />

            <InfoItem
              icon={<Glasses className="h-4 w-4" />}
              label="Filière"
              value={etudiant.Filiere}
            />

            <InfoItem
              icon={<GraduationCap className="h-4 w-4" />}
              label="Niveau"
              value={etudiant.Niveau}
            />
          </div>
        </section>

        {/* Attribution */}
        <section className="mt-4 space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase">
            Attribution
            {attribution?.length > 1 ? "s " : " "}
            de chambre
          </h3>

          {attribution?.length ? (
            <div className="grid gap-3 md:grid-cols-4">
              {attribution.map((a, index) => (
                <div
                  key={index}
                  className="rounded-lg border p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <LucideMapPinXInside className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Chambre</p>
                      <p className="font-medium">{a.NumCha}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Bâtiment</p>
                      <p className="font-medium">{a.NomBat}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
              Aucune chambre attribuée.
            </div>
          )}
        </section>

        <div className="grid grid-cols-3 gap-6">
          {/* Recent Payments */}
          <section className="mt-10 rounded-xl border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                Paiement{paiements?.length > 1 ? "s" : ""} récent
                {paiements?.length > 1 ? "s" : ""}
              </h3>

              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                {paiements?.length || 0}
              </span>
            </div>

            <div className="max-h-80 overflow-y-auto divide-y">
              {(paiements || []).map((paiement) => (
                <div
                  key={paiement.IdPai}
                  className="flex items-start justify-between gap-4 p-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">
                      {Number(paiement.MontantPai).toLocaleString()} Ar
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {paiement.DatePai}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                      {paiement.ModePai}
                    </span>

                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        paiement.StatutPai === "Payé"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {paiement.StatutPai}
                    </span>
                  </div>
                </div>
              ))}

              {!paiements?.length && (
                <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                  Aucun paiement récent
                </div>
              )}
            </div>
          </section>

          {/* Recent Complaints */}
          <section className="mt-10 rounded-xl border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                Réclamation{reclamations?.length > 1 ? "s" : ""} récente
                {reclamations?.length > 1 ? "s" : ""}
              </h3>

              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                {reclamations?.length || 0}
              </span>
            </div>

            <div className="max-h-80 overflow-y-auto divide-y">
              {(reclamations || []).map((reclamation) => (
                <div
                  key={reclamation.IdRec}
                  className="flex items-start justify-between gap-4 p-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{reclamation.Sujet}</p>
                    <p className="text-sm text-muted-foreground">
                      {reclamation.DateRec}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                      {reclamation.Priorite}
                    </span>

                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                      {reclamation.StatusRec}
                    </span>
                  </div>
                </div>
              ))}

              {!reclamations?.length && (
                <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                  Aucune réclamation
                </div>
              )}
            </div>
          </section>

          {/* Recent Penalities */}
          <section className="mt-10 rounded-xl border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                Sanction{sanctions?.length > 1 ? "s" : ""} récente
                {sanctions?.length > 1 ? "s" : ""}
              </h3>

              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                {sanctions?.length || 0}
              </span>
            </div>

            <div className="max-h-80 overflow-y-auto divide-y">
              {(sanctions || []).map((sanction) => (
                <div
                  key={sanction.IdSac}
                  className="flex items-start justify-between gap-4 p-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{sanction.Motif}</p>
                    <p className="text-sm text-muted-foreground">
                      {sanction.DateSac}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-700">
                      {Number(sanction.MontantAmende).toLocaleString()} Ar
                    </span>

                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                      {sanction.StatusSac}
                    </span>
                  </div>
                </div>
              ))}

              {!sanctions?.length && (
                <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                  Aucun sanction
                </div>
              )}
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
