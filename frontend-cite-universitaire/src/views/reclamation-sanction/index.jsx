import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, AlertTriangle, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSanction,
  editSanction,
  fetchSanction,
  removeSanction,
} from "@/redux/features/sanction/sanctionThunk";
import {
  addReclamation,
  editReclamation,
  fetchReclamation,
  removeReclamation,
} from "@/redux/features/reclamation/reclamationThunk";
import { fetchEtudiant } from "@/redux/features/Etudiant/etudiantThunk";
import { toast } from "sonner";
import z from "zod";

const reclamationSchema = z.object({
  Sujet: z.string().min(1, "Le sujet du reclamation est obligatoire"),
  StatusRec: z.string().min(1, "Veuillez choisir le statut de la reclamation"),
  Priorite: z.string().min(1, "La priorité est obligatoire"),
  DescriptionRec: z.string().optional().or(z.literal("")),
  IdEtu: z
    .string()
    .min(1, "Veuillez choisir un étudiant")
    .regex(/^[0-9]+$/, ""),
});

const sanctionSchema = z.object({
  Motif: z.string().min(1, "Le motif du sanction est obligatoire"),
  StatusSac: z.string().min(1, "Veuillez choisir le statut du sanction"),
  DescriptionSac: z.string().optional().or(z.literal("")),
  MontantAmende: z
    .string()
    .min(1, "A mettre 0 si pas de valeur")
    .regex(/^[0-9.]+$/, "Caractères numériques seulement autorisés"),
  IdEtu: z
    .string()
    .min(1, "Veuillez choisir un étudiant")
    .regex(/^[0-9]+$/, ""),
});

const DEFAULT_RECLAMATION = {
  IdRec: "",
  DateRec: "",
  Sujet: "",
  DescriptionRec: "",
  StatusRec: "",
  Priorite: "",
  IdEtu: "",
};

const DEFAULT_SANCTION = {
  IdSac: "",
  DateSac: "",
  Motif: "",
  DescriptionSac: "",
  MontantAmende: "0",
  StatusSac: "",
  IdEtu: "",
};

export default function ReclamationSanction() {
  const [activeTab, setActiveTab] = useState("reclamations");
  const [isReclamationModalOpen, setIsReclamationModalOpen] = useState(false);
  const [isSanctionModalOpen, setIsSanctionModalOpen] = useState(false);
  const [editingReclamationId, setEditingReclamationId] = useState(null);
  const [editingSanctionId, setEditingSanctionId] = useState(null);
  const [reclamation, setReclamation] = useState(DEFAULT_RECLAMATION);
  const [sanction, setSanction] = useState(DEFAULT_SANCTION);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { reclamations, status: statusReclamation } = useSelector(
    (state) => state.reclamation,
  );
  const { sanctions, Status: statusSanction } = useSelector(
    (state) => state.sanction,
  );
  const { etudiants } = useSelector((state) => state.etudiant);

  useEffect(() => {
    dispatch(fetchSanction());
    dispatch(fetchReclamation());
    dispatch(fetchEtudiant());
  }, []);

  // Filter Reclamation
  const [searchTermReclamation, setSearchTermReclamation] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterDateRec, setFilterDateRec] = useState("");
  const [filterStatusRec, setFilterStatusRec] = useState("");

  const filteredReclamations =
    reclamations?.filter((r) => {
      const matchesSujet = r.Sujet.toLowerCase().includes(
        searchTermReclamation.toLowerCase(),
      );
      const matchesNom = r.Nom.toLowerCase().includes(
        searchTermReclamation.toLowerCase(),
      );
      const matchesPriority = filterPriority
        ? filterPriority === "all"
          ? true
          : r.Priorite === filterPriority
        : true;
      const matchesStatus = filterStatusRec
        ? filterStatusRec === "all"
          ? true
          : r.StatusRec === filterStatusRec
        : true;

      const matchesDate = filterDateRec ? r.DateRec === filterDateRec : true;
      return (
        (matchesSujet || matchesNom) &&
        matchesPriority &&
        matchesStatus &&
        matchesDate
      );
    }) || [];

  // Filter Sanction
  const [searchTermSanction, setSearchTermSanction] = useState("");
  const [filterDateSac, setFilterDateSac] = useState("");
  const [filterStatusSac, setFilterStatusSac] = useState("");

  const filteredSanctions =
    sanctions?.filter((s) => {
      const matchesMotif = s.Motif.toLowerCase().includes(
        searchTermSanction.toLowerCase(),
      );
      const matchesNom = s.Nom.toLowerCase().includes(
        searchTermSanction.toLowerCase(),
      );
      const matchesStatus = filterStatusSac
        ? filterStatusSac === "all"
          ? true
          : s.StatusSac === filterStatusSac
        : true;

      const matchesDate = filterDateSac ? s.DateSac === filterDateSac : true;
      return (matchesMotif || matchesNom) && matchesStatus && matchesDate;
    }) || [];

  const handleSubmitReclamation = (e) => {
    e.preventDefault();

    const result = reclamationSchema.safeParse(reclamation);

    if (!result.success) {
      const tree = z.treeifyError(result.error);
      setErrors(tree.properties);
      return;
    }

    if (editingReclamationId) {
      dispatch(
        editReclamation({ IdRec: editingReclamationId, data: reclamation }),
      )
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          setEditingReclamationId(null);
          setReclamation(DEFAULT_RECLAMATION);
          setIsReclamationModalOpen(false);
        })
        .catch((error) => {
          console.error(error.error);
          toast.error(error.message);
        });
    } else {
      const date = new Date().toISOString();
      const newReclamation = {
        ...reclamation,
        DateRec: date.split("T")[0],
      };
      dispatch(addReclamation(newReclamation))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          setReclamation(DEFAULT_RECLAMATION);
          setIsReclamationModalOpen(false);
        })
        .catch((error) => {
          console.error(error.error);
          toast.error(error.message);
        });
    }
  };

  const handleSubmitSanction = (e) => {
    e.preventDefault();

    const result = sanctionSchema.safeParse(sanction);

    if (!result.success) {
      const tree = z.treeifyError(result.error);
      setErrors(tree.properties);
      return;
    }

    if (editingSanctionId) {
      dispatch(editSanction({ IdSac: editingSanctionId, data: sanction }))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          setEditingSanctionId(null);
          setSanction(DEFAULT_SANCTION);
          setIsSanctionModalOpen(false);
        })
        .catch((error) => {
          console.error(error.error);
          toast.error(error.message);
        });
    } else {
      const date = new Date().toISOString();
      const newSanction = {
        ...sanction,
        DateSac: date.split("T")[0],
      };
      dispatch(addSanction(newSanction))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          setSanction(DEFAULT_SANCTION);
          setIsSanctionModalOpen(false);
        })
        .catch((error) => {
          console.error(error.error);
          toast.error(error.message);
        });
    }
  };

  const onDeleteReclamation = async (IdRec) => {
    dispatch(removeReclamation(IdRec))
      .unwrap()
      .then((response) => {
        toast.success(response.message);
      })
      .catch((error) => {
        console.error(error.error);
        toast.error(error.message);
      });
  };

  const onDeleteSanction = async (IdSac) => {
    dispatch(removeSanction(IdSac))
      .unwrap()
      .then((response) => {
        toast.success(response.message);
      })
      .catch((error) => {
        console.error(error.error);
        toast.error(error.message);
      });
  };

  const handleEditReclamation = (item) => {
    const newItem = {
      ...item,
      IdEtu: String(item.IdEtu),
      DateRec: item.DateRec.split("T")[0],
    };
    setEditingReclamationId(item.IdRec);
    setReclamation(newItem);
    setIsReclamationModalOpen(true);
  };

  const handleEditSanction = (item) => {
    const newItem = {
      ...item,
      IdEtu: String(item.IdEtu),
      DateSac: item.DateSac.split("T")[0],
    };
    setEditingSanctionId(item.IdSac);
    setSanction(newItem);
    setIsSanctionModalOpen(true);
  };

  const handleInputReclamationChange = (e) => {
    const { name, value } = e.target;
    setReclamation((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleInputSanctionChange = (e) => {
    const { name, value } = e.target;
    setSanction((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const openAddReclamationDialog = () => {
    setEditingReclamationId(null);
    setIsReclamationModalOpen(true);
  };

  const openAddSanctionDialog = () => {
    setEditingSanctionId(null);
    setIsSanctionModalOpen(true);
  };

  const handleDeleteReclamation = async (id) => {
    toast.custom(
      (t) => (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 p-6 w-100 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              Supprimer cette reclamation
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Cette action est irréversible. Toutes les données associées seront
              perdues.
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
              onClick={async () => {
                toast.dismiss(t);
                await onDeleteReclamation(id);
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Supprimer
            </Button>
          </div>
        </div>
      ),
      {
        duration: Infinity, // Keep open until action
      },
    );
  };

  const handleDeleteSanction = async (id) => {
    toast.custom(
      (t) => (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 p-6 w-100 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              Supprimer ce sanction
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Cette action est irréversible. Toutes les données associées seront
              perdues.
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
              onClick={async () => {
                toast.dismiss(t);
                await onDeleteSanction(id);
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Supprimer
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Gestion des Réclamations & Sanctions
        </h1>
        <p className="text-gray-600 mt-2">
          Gérez les plaintes et sanctions des étudiants
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reclamations" className="cursor-pointer">
            Réclamations
          </TabsTrigger>
          <TabsTrigger value="sanctions" className="cursor-pointer">
            Sanctions
          </TabsTrigger>
        </TabsList>

        {/* Reclamations Tab */}
        <TabsContent value="reclamations" className="space-y-4">
          <div className="flex justify-end gap-4">
            <Dialog
              open={isReclamationModalOpen}
              onOpenChange={(open) => {
                setIsReclamationModalOpen(open);
                if (!open) {
                  setEditingReclamationId(null);
                  setReclamation(DEFAULT_RECLAMATION);
                  setErrors({});
                }
              }}
            >
              <DialogTrigger asChild>
                <Button
                  onClick={() => openAddReclamationDialog()}
                  className="cursor-pointer"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une Réclamation
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingReclamationId ? "Modifier" : "Ajouter"} Réclamation
                  </DialogTitle>
                  <DialogDescription>
                    Remplissez le formulaire pour{" "}
                    {editingReclamationId ? "modifier" : "ajouter"} une
                    réclamation
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitReclamation} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-sm font-medium">Sujet</label>
                      <Input
                        name="Sujet"
                        value={reclamation.Sujet}
                        onChange={handleInputReclamationChange}
                        placeholder="Sujet de la réclamation"
                      />
                      {errors.Sujet && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.Sujet.errors[0]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium">Priorité</label>
                      <Select
                        name="Priorite"
                        value={reclamation.Priorite || ""}
                        onValueChange={(value) => {
                          setReclamation((prev) => ({
                            ...prev,
                            Priorite: value,
                          }));
                          if (errors.Priorite) {
                            setErrors((prev) => ({
                              ...prev,
                              Priorite: undefined,
                            }));
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le niveau de priorité" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Basse">Basse</SelectItem>
                          <SelectItem value="Normale">Normale</SelectItem>
                          <SelectItem value="Haute">Haute</SelectItem>
                          <SelectItem value="Urgente">Urgente</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.Priorite && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.Priorite.errors[0]}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <label className="text-sm font-medium">Étudiant</label>
                      <Select
                        name="IdEtu"
                        value={reclamation.IdEtu.toString() || ""}
                        onValueChange={(value) => {
                          setReclamation((prev) => ({
                            ...prev,
                            IdEtu: value,
                          }));
                          if (errors.IdEtu) {
                            setErrors((prev) => ({
                              ...prev,
                              IdEtu: undefined,
                            }));
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un étudiant" />
                        </SelectTrigger>
                        <SelectContent>
                          {etudiants?.map((e) => (
                            <SelectItem
                              key={e.IdEtu}
                              value={e.IdEtu.toString()}
                            >
                              {e.Nom} ({e.Matricule})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.IdEtu && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.IdEtu.errors[0]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium">Statut</label>
                      <Select
                        name="StatusRec"
                        value={reclamation.StatusRec || ""}
                        onValueChange={(value) => {
                          setReclamation((prev) => ({
                            ...prev,
                            StatusRec: value,
                          }));
                          if (errors.StatusRec) {
                            setErrors((prev) => ({
                              ...prev,
                              StatusRec: undefined,
                            }));
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Séléctionner le statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="En attente">En attente</SelectItem>
                          <SelectItem value="En cours">En cours</SelectItem>
                          <SelectItem value="Résolu">Résolu</SelectItem>
                          <SelectItem value="Rejeté">Rejeté</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.StatusRec && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.StatusRec.errors[0]}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <label className="text-sm font-medium">Description</label>
                      <Input
                        name="DescriptionRec"
                        value={reclamation.DescriptionRec}
                        onChange={handleInputReclamationChange}
                        placeholder="Description détaillée"
                      />
                      {errors.DescriptionRec && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.DescriptionRec.errors[0]}
                        </p>
                      )}
                    </div>

                    {editingReclamationId && (
                      <div>
                        <label className="text-sm font-medium">Date</label>
                        <Input
                          name="DateRec"
                          value={reclamation.DateRec || ""}
                          disabled
                          type="date"
                        />
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full cursor-pointer">
                    {editingReclamationId ? "Mettre à jour" : "Créer"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Liste des Réclamations</CardTitle>
              <CardDescription>
                Total: {reclamations?.length || 0} réclamations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Rechercher par sujet ou nom de l'étudiant"
                    value={searchTermReclamation}
                    onChange={(e) => setSearchTermReclamation(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={filterPriority}
                  onValueChange={(value) => {
                    setFilterPriority(value);
                  }}
                >
                  <SelectTrigger className="w-1/6 cursor-pointer">
                    <SelectValue placeholder="Filtrer par Priorité" />
                  </SelectTrigger>
                  <SelectContent className="uppercase" position="popper">
                    <SelectItem value="all" className="cursor-pointer">
                      TOUT
                    </SelectItem>
                    <SelectItem value="Basse" className="cursor-pointer">
                      Basse
                    </SelectItem>
                    <SelectItem value="Normale" className="cursor-pointer">
                      Normale
                    </SelectItem>
                    <SelectItem value="Haute" className="cursor-pointer">
                      Haute
                    </SelectItem>
                    <SelectItem value="Urgente" className="cursor-pointer">
                      Urgente
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={filterStatusRec}
                  onValueChange={(value) => {
                    setFilterStatusRec(value);
                  }}
                >
                  <SelectTrigger className="w-1/6 cursor-pointer">
                    <SelectValue placeholder="Filtrer par Statut" />
                  </SelectTrigger>
                  <SelectContent className="uppercase" position="popper">
                    <SelectItem value="all" className="cursor-pointer">
                      TOUT
                    </SelectItem>
                    <SelectItem value="En attente" className="cursor-pointer">
                      En attente
                    </SelectItem>
                    <SelectItem value="En cours" className="cursor-pointer">
                      En cours
                    </SelectItem>
                    <SelectItem value="Résolu" className="cursor-pointer">
                      Résolu
                    </SelectItem>
                    <SelectItem value="Rejeté" className="cursor-pointer">
                      Rejeté
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  className="w-1/6"
                  type="date"
                  value={filterDateRec}
                  onChange={(e) => {
                    setFilterDateRec(e.target.value);
                  }}
                  required
                />
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Sujet</TableHead>
                      <TableHead>Déscription</TableHead>
                      <TableHead>Étudiant</TableHead>
                      <TableHead>Priorité</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {statusReclamation === "loading" ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          Chargement...
                        </TableCell>
                      </TableRow>
                    ) : filteredReclamations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          Aucune réclamation
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredReclamations.map((reclamation) => (
                        <TableRow key={reclamation.IdRec}>
                          <TableCell>
                            {reclamation.DateRec.split("T")[0]}
                          </TableCell>
                          <TableCell className="font-medium">
                            {reclamation.Sujet}
                          </TableCell>
                          <TableCell className="font-medium">
                            {reclamation.DescriptionRec}
                          </TableCell>
                          <TableCell>{reclamation.Nom}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                reclamation.Priorite === "Basse"
                                  ? "bg-green-100 text-green-800"
                                  : reclamation.Priorite === "Normale"
                                    ? "bg-blue-100 text-blue-800"
                                    : reclamation.Priorite === "Haute"
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-red-100 text-red-800"
                              }`}
                            >
                              {reclamation.Priorite}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                              {reclamation.StatusRec}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  handleEditReclamation(reclamation)
                                }
                                className="cursor-pointer"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  handleDeleteReclamation(reclamation.IdRec)
                                }
                                className="cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sanctions Tab */}
        <TabsContent value="sanctions" className="space-y-4">
          <div className="flex justify-end gap-4">
            <Dialog
              open={isSanctionModalOpen}
              onOpenChange={(open) => {
                setIsSanctionModalOpen(open);
                if (!open) {
                  setEditingSanctionId(null);
                  setSanction(DEFAULT_SANCTION);
                  setErrors({});
                }
              }}
            >
              <DialogTrigger asChild>
                <Button
                  onClick={() => openAddSanctionDialog()}
                  variant="destructive"
                  className="cursor-pointer"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Ajouter une Sanction
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingSanctionId ? "Modifier" : "Ajouter"} Sanction
                  </DialogTitle>
                  <DialogDescription>
                    Remplissez le formulaire pour{" "}
                    {editingSanctionId ? "modifier" : "ajouter"} une sanction
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitSanction} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-sm font-medium">Motif</label>
                      <Input
                        name="Motif"
                        value={sanction.Motif}
                        onChange={handleInputSanctionChange}
                        placeholder="Motif de la sanction"
                      />
                      {errors.Motif && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.Motif.errors[0]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium">
                        Montant Amende (Ariary)
                      </label>
                      <Input
                        name="MontantAmende"
                        value={sanction.MontantAmende}
                        onChange={handleInputSanctionChange}
                        placeholder="0"
                      />
                      {errors.MontantAmende && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.MontantAmende.errors[0]}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <label className="text-sm font-medium">Étudiant</label>
                      <Select
                        name="IdEtu"
                        value={sanction.IdEtu.toString() || ""}
                        onValueChange={(value) => {
                          setSanction((prev) => ({
                            ...prev,
                            IdEtu: value,
                          }));
                          if (errors.IdEtu) {
                            setErrors((prev) => ({
                              ...prev,
                              IdEtu: undefined,
                            }));
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un étudiant" />
                        </SelectTrigger>
                        <SelectContent>
                          {etudiants?.map((e) => (
                            <SelectItem
                              key={e.IdEtu}
                              value={e.IdEtu.toString()}
                            >
                              {e.Nom} ({e.Matricule})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.IdEtu && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.IdEtu.errors[0]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium">Statut</label>
                      <Select
                        name="StatusSac"
                        value={sanction.StatusSac || ""}
                        onValueChange={(value) => {
                          setSanction((prev) => ({
                            ...prev,
                            StatusSac: value,
                          }));
                          if (errors.StatusSac) {
                            setErrors((prev) => ({
                              ...prev,
                              StatusSac: undefined,
                            }));
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Suspendue">Suspendue</SelectItem>
                          <SelectItem value="Levée">Levée</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.StatusSac && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.StatusSac.errors[0]}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <label className="text-sm font-medium">Description</label>
                      <Input
                        name="DescriptionSac"
                        value={sanction.DescriptionSac}
                        onChange={handleInputSanctionChange}
                        placeholder="Description de la sanction"
                      />
                      {errors.DescriptionSac && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.DescriptionSac.errors[0]}
                        </p>
                      )}
                    </div>

                    {editingSanctionId && (
                      <div>
                        <label className="text-sm font-medium">Date</label>
                        <Input
                          name="DateSac"
                          value={sanction.DateSac || ""}
                          disabled
                          type="date"
                        />
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full cursor-pointer">
                    {editingSanctionId ? "Mettre à jour" : "Créer"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Liste des Sanctions</CardTitle>
              <CardDescription>
                Total: {sanctions?.length || 0} sanctions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Rechercher par motif ou nom de l'étudiant"
                    value={searchTermSanction}
                    onChange={(e) => setSearchTermSanction(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select
                  value={filterStatusSac}
                  onValueChange={(value) => {
                    setFilterStatusSac(value);
                  }}
                >
                  <SelectTrigger className="w-1/6 cursor-pointer">
                    <SelectValue placeholder="Filtrer par Statut" />
                  </SelectTrigger>
                  <SelectContent className="uppercase" position="popper">
                    <SelectItem value="all" className="cursor-pointer">
                      TOUT
                    </SelectItem>
                    <SelectItem value="Active" className="cursor-pointer">
                      Active
                    </SelectItem>
                    <SelectItem value="Suspendue" className="cursor-pointer">
                      Suspendue
                    </SelectItem>
                    <SelectItem value="Levée" className="cursor-pointer">
                      Levée
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  className="w-1/6"
                  type="date"
                  value={filterDateSac}
                  onChange={(e) => {
                    setFilterDateSac(e.target.value);
                  }}
                  required
                />
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Motif</TableHead>
                      <TableHead>Déscription</TableHead>
                      <TableHead>Étudiant</TableHead>
                      <TableHead>Montant (Ar)</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {statusSanction === "loading" ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          Chargement...
                        </TableCell>
                      </TableRow>
                    ) : filteredSanctions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          Aucune sanction
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredSanctions.map((sanction) => (
                        <TableRow key={sanction.IdSac}>
                          <TableCell>
                            {sanction.DateSac.split("T"[0])}
                          </TableCell>
                          <TableCell className="font-medium">
                            {sanction.Motif}
                          </TableCell>
                          <TableCell className="font-medium">
                            {sanction.DescriptionSac}
                          </TableCell>
                          <TableCell>{sanction.Nom}</TableCell>
                          <TableCell className="font-medium">
                            {Number(sanction.MontantAmende).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                sanction.StatusSac === "Active"
                                  ? "bg-red-100 text-red-800"
                                  : sanction.StatusSac === "Suspendue"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              }`}
                            >
                              {sanction.StatusSac}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEditSanction(sanction)}
                                className="cursor-pointer"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  handleDeleteSanction(sanction.IdSac)
                                }
                                className="cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
