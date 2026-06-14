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
import { useEffect, useState } from "react";
import { getPaiementByEtudiant } from "@/services/paiementService";
import { getReclamationByEtudiant } from "@/services/reclamationService";
import { getSanctionByEtudiant } from "@/services/sanctionService";
import { Button } from "../ui/button";

export default function EtudiantView({
  isOpen,
  setIsOpen,
  etudiant,
  attribution,
}) {
  const [reclamations, setReclamations] = useState([]);
  const [sanctions, setSanctions] = useState([]);
  const [paiements, setPaiements] = useState([]);
  const [pagePaiement, setPagePaiement] = useState(1);
  const [pageReclamation, setPageReclamation] = useState(1);
  const [pageSanction, setPageSanction] = useState(1);

  useEffect(() => {
    const fetchPaiement = async () => {
      await getPaiementByEtudiant(etudiant.IdEtu, pagePaiement)
        .then((response) => setPaiements(response))
        .catch((err) => {
          //nothing
        });
    };

    fetchPaiement();
  }, [pagePaiement, etudiant.IdEtu]);

  useEffect(() => {
    const fetchReclamation = async () => {
      await getReclamationByEtudiant(etudiant.IdEtu, pageReclamation)
        .then((response) => setReclamations(response))
        .catch(() => {
          //nothing
        });
    };

    fetchReclamation();
  }, [pageReclamation, etudiant.IdEtu]);

  useEffect(() => {
    const fetchSanction = async () => {
      await getSanctionByEtudiant(etudiant.IdEtu, pageSanction)
        .then((response) => setSanctions(response))
        .catch((err) => {
          //nothing
        });
    };

    fetchSanction();
  }, [pageSanction, etudiant.IdEtu]);

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
          <section className="flex flex-col mt-4 rounded-xl border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                Paiement{paiements?.paiements?.length > 1 ? "s" : ""} récent
                {paiements?.paiements?.length > 1 ? "s" : ""}
              </h3>

              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                {paiements?.pagination?.total || 0}
              </span>
            </div>

            <div className="max-h-80 overflow-y-auto divide-y">
              {(paiements?.paiements || []).map((paiement) => (
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

              {!paiements?.paiements?.length && (
                <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                  Aucun paiement récent
                </div>
              )}
            </div>

            <div className="flex mt-auto justify-between gap-2 mb-2 mx-4">
              <Button
                disabled={pagePaiement === 1}
                onClick={() => setPagePaiement((p) => p - 1)}
              >
                Précedent
              </Button>

              <span>
                Page {paiements?.pagination?.page} /{" "}
                {paiements?.pagination?.totalPages}
              </span>

              <Button
                disabled={
                  paiements?.pagination?.totalPages
                    ? pagePaiement === paiements.pagination.totalPages
                    : true
                }
                onClick={() => setPagePaiement((p) => p + 1)}
              >
                Suivant
              </Button>
            </div>
          </section>

          {/* Recent Complaints */}
          <section className="flex flex-col mt-4 rounded-xl border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                Réclamation{reclamations?.reclamations?.length > 1 ? "s" : ""}{" "}
                récente
                {reclamations?.reclamations?.length > 1 ? "s" : ""}
              </h3>

              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                {reclamations?.pagination?.total || 0}
              </span>
            </div>

            <div className="max-h-80 overflow-y-auto divide-y">
              {(reclamations?.reclamations || []).map((reclamation) => (
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

              {!reclamations?.reclamations?.length && (
                <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                  Aucune réclamation
                </div>
              )}
            </div>
            <div className="flex mt-auto justify-between gap-2 mb-2 mx-4">
              <Button
                disabled={pageReclamation === 1}
                onClick={() => setPageReclamation((p) => p - 1)}
              >
                Précedent
              </Button>

              <span>
                Page {reclamations?.pagination?.page} /{" "}
                {reclamations?.pagination?.totalPages}
              </span>

              <Button
                disabled={
                  reclamations?.pagination?.totalPages
                    ? pageReclamation === reclamations.pagination.totalPages
                    : true
                }
                onClick={() => setPageReclamation((p) => p + 1)}
              >
                Suivant
              </Button>
            </div>
          </section>

          {/* Recent Penalities */}
          <section className="flex flex-col mt-4 rounded-xl border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                Sanction{sanctions?.sanctions?.length > 1 ? "s" : ""} récente
                {sanctions?.sanctions?.length > 1 ? "s" : ""}
              </h3>

              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                {sanctions?.pagination?.total || 0}
              </span>
            </div>

            <div className="max-h-80 overflow-y-auto divide-y">
              {(sanctions?.sanctions || []).map((sanction) => (
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

              {!sanctions?.sanctions?.length && (
                <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                  Aucun sanction
                </div>
              )}
            </div>
            <div className="flex mt-auto justify-between gap-2 mb-2 mx-4">
              <Button
                disabled={pageSanction === 1}
                onClick={() => setPageSanction((p) => p - 1)}
              >
                Précedent
              </Button>

              <span>
                Page {sanctions?.pagination?.page} /{" "}
                {sanctions?.pagination?.totalPages}
              </span>

              <Button
                disabled={
                  sanctions?.pagination?.totalPages
                    ? pageSanction === sanctions.pagination.totalPages
                    : true
                }
                onClick={() => setPageSanction((p) => p + 1)}
              >
                Suivant
              </Button>
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
