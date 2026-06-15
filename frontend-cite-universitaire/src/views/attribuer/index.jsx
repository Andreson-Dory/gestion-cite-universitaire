import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAttribuer,
  editAttribuer,
  fetchAttribuer,
  removeAttribuer,
  toggleAttribuer,
} from "@/redux/features/attribuer/attibuerThunk";
import { toast } from "sonner";
import { fetchChambre } from "@/redux/features/chambre/chambreThunk";
import { fetchEtudiant } from "@/redux/features/Etudiant/etudiantThunk";
import { fetchBatiment } from "@/redux/features/batiment/batimentThunk";
import z from "zod";
import AttribuerPageSkeleton from "@/components/skeletons/AttribuerPageSkeleton";
import { getFreeChambres } from "@/services/chambreService";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

const schema = z.object({
  IdCha: z
    .string()
    .min(1, "Veuillez choisir un chambre")
    .regex(/^[0-9]+$/, ""),
  IdEtu: z
    .string()
    .min(1, "Veuillez l'identifiant de l'étudiant")
    .regex(/^[0-9]+$/, "Caractères numériques seulement autorisés"),
  DateFin: z.string().min(1, "Date d'écheance obligatoire"),
  StatutAtt: z.string().min(1, "Veuillez indiquer le statut de l'attribution"),
});

const DEFAULT_ATTRIBUER = {
  IdAtt: "",
  IdCha: "",
  IdEtu: "",
  DateAtt: "",
  DateFin: "",
  StatutAtt: "",
};

export default function AttribuerPage() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBatiment, setFilterBatiment] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [attribuer, setAttribuer] = useState(DEFAULT_ATTRIBUER);
  const [errors, setErrors] = useState({});
  const {
    attribuers,
    pagination: attribuerPagination = {},
    status,
  } = useSelector((state) => state.attribuer);
  const [chambres, setChambres] = useState([]);
  const { batiments } = useSelector((state) => state.batiment);

  const filteredAttribuers =
    attribuers?.filter((a) => {
      const matchesNom = a.Nom.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesNumCha = a.NumCha.toLowerCase().includes(
        searchTerm.toLowerCase(),
      );
      const matchesBatiment = filterBatiment
        ? filterBatiment === "all"
          ? true
          : filterBatiment === a.NomBat
        : true;
      const matchesStatus = filterStatus
        ? filterStatus === "all"
          ? true
          : filterStatus === a.StatutAtt
        : true;

      return (matchesNom || matchesNumCha) && matchesBatiment && matchesStatus;
    }) || [];

  const [page, setPage] = useState(attribuerPagination.page || 1);

  const getChambres = async () => {
    await getFreeChambres()
      .then((res) => setChambres(res))
      .catch(() => {
        //nothing
      });
  };

  useEffect(() => {
    dispatch(fetchAttribuer(page));
    getChambres();
    dispatch(fetchBatiment());
  }, [page]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = schema.safeParse(attribuer);

    if (!result.success) {
      const tree = z.treeifyError(result.error);
      setErrors(tree.properties);
      return;
    }

    if (editingId) {
      dispatch(editAttribuer({ IdAtt: editingId, data: attribuer }))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          setEditingId(null);
          setAttribuer(DEFAULT_ATTRIBUER);
          setIsOpen(false);
        })
        .catch((error) => {
          console.error(error.error);
          toast.error(error.message);
        });
    } else {
      const date = new Date().toISOString();
      const newAttribuer = {
        ...attribuer,
        DateAtt: date.split("T")[0],
      };
      dispatch(addAttribuer(newAttribuer))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          setAttribuer(DEFAULT_ATTRIBUER);
          setIsOpen(false);
        })
        .catch((error) => {
          console.error(error.error);
          toast.error(error.message);
        });
    }
  };

  const onDelete = async (IdAtt) => {
    dispatch(removeAttribuer(IdAtt))
      .unwrap()
      .then((response) => {
        toast.success(response.message);
      })
      .catch((error) => {
        toast.error(
          "Erreur survenue lors de la suppression de l'occupation du chambre !",
        );
        console.error(error);
      });
  };

  const handleToggleAttribuer = async (IdAtt, IdCha) => {
    if (confirm("Êtes-vous sûr?")) {
      dispatch(toggleAttribuer({ idAtt: IdAtt, idCha: IdCha }))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
        })
        .catch((error) => {
          toast.error(error.message);
          console.error(error.error);
        });
    }
  };

  const handleEdit = (attribuer) => {
    setEditingId(attribuer.IdAtt);
    setAttribuer(attribuer);
    setAttribuer((prev) => ({
      ...prev,
      DateAtt: prev.DateAtt.split("T")[0],
      DateFin: prev.DateFin.split("T")[0],
    }));
    setIsOpen(true);
  };

  const handleInputAttribuerChange = (e) => {
    const { name, value } = e.target;

    setAttribuer((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleDelete = async (id) => {
    toast.custom(
      (t) => (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 p-6 w-100 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              Supprimer cet attribution de chambre
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
                await onDelete(id);
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

  if (status === "loading") {
    return <AttribuerPageSkeleton />;
  }

  if (status === "error")
    return <div className="text-red-600">Erreur de chargement</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Gestion des occcupations du chambre
          </h1>
          <p className="text-gray-600 mt-2">
            Gérez les attributions du chambre de la résidence
          </p>
        </div>
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
              setAttribuer(DEFAULT_ATTRIBUER);
              setErrors({});
            }
          }}
        >
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditingId(null)}
              className="cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Attribuer un chambre
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId
                  ? `Modifier l'attribution du chambre`
                  : "Attribuer un chambre"}{" "}
              </DialogTitle>
              <DialogDescription>
                Remplissez le formulaire pour{" "}
                {editingId
                  ? `modifier l'attribution du chambre`
                  : "attribuer un chambre"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="hidden" name="id" />

                <div className="col-span-2">
                  <label className="text-sm font-medium">Chambre</label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                      >
                        {attribuer.IdCha
                          ? chambres.find(
                              (c) =>
                                c.IdCha.toString() ===
                                attribuer.IdCha.toString(),
                            )?.NumCha +
                            "-" +
                            chambres.find(
                              (c) =>
                                c.IdCha.toString() ===
                                attribuer.IdCha.toString(),
                            )?.NomBat
                          : "Sélectionner une chambre"}

                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Rechercher une chambre..." />

                        <CommandEmpty>Aucune chambre trouvée.</CommandEmpty>

                        <CommandGroup>
                          {chambres?.map((c) => (
                            <CommandItem
                              key={c.IdCha}
                              value={`${c.NumCha} ${c.NomBat}`}
                              onSelect={() => {
                                setAttribuer((prev) => ({
                                  ...prev,
                                  IdCha: c.IdCha.toString(),
                                }));

                                if (errors.IdCha) {
                                  setErrors((prev) => ({
                                    ...prev,
                                    IdCha: undefined,
                                  }));
                                }

                                setOpen(false);
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  attribuer.IdCha.toString() ===
                                  c.IdCha.toString()
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                              {c.NumCha} - {c.NomBat}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  {errors.IdCha && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.IdCha.errors[0]}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium">Étudiant</label>
                  <Input
                    name="IdEtu"
                    value={attribuer.IdEtu}
                    onChange={handleInputAttribuerChange}
                    placeholder="1"
                  />
                  {errors.IdEtu && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.IdEtu.errors[0]}
                    </p>
                  )}
                </div>

                {!editingId && (
                  <div>
                    <label className="text-sm font-medium">Statut</label>
                    <Select
                      name="StatutAtt"
                      value={attribuer.StatutAtt || ""}
                      onValueChange={(value) => {
                        setAttribuer((prev) => ({
                          ...prev,
                          StatutAtt: value,
                        }));
                        if (errors.StatutAtt) {
                          setErrors((prev) => ({
                            ...prev,
                            StatutAtt: undefined,
                          }));
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Séléctionner le statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="En cours">En cours</SelectItem>
                        <SelectItem value="Terminé">Terminé</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.StatutAtt && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.StatutAtt.errors[0]}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium">Date d'écheance</label>
                  <Input
                    name="DateFin"
                    type="date"
                    value={attribuer.DateFin}
                    onChange={handleInputAttribuerChange}
                  />
                  {errors.DateFin && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.DateFin.errors[0]}
                    </p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full cursor-pointer">
                {editingId ? "Mettre à jour" : "Attribuer"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste d'occupation des chambres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-2">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Rechercher par nom de l'étudiant ou numéro de chambre"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={filterBatiment}
              onValueChange={(value) => {
                setFilterBatiment(value);
              }}
            >
              <SelectTrigger className="w-1/6 cursor-pointer">
                <SelectValue placeholder="Filtrer par Batiment" />
              </SelectTrigger>
              <SelectContent className="uppercase" position="popper">
                <SelectItem value="all" className="cursor-pointer">
                  TOUT
                </SelectItem>
                {batiments.map((b, index) => {
                  return (
                    <SelectItem
                      key={index}
                      value={b.NomBat}
                      className="cursor-pointer"
                    >
                      {b.NomBat}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <Select
              value={filterStatus}
              onValueChange={(value) => {
                setFilterStatus(value);
              }}
            >
              <SelectTrigger className="w-1/6 cursor-pointer">
                <SelectValue placeholder="Filtrer par Statut" />
              </SelectTrigger>
              <SelectContent className="uppercase" position="popper">
                <SelectItem value="all" className="cursor-pointer">
                  TOUT
                </SelectItem>
                <SelectItem value="En cours" className="cursor-pointer">
                  En cours
                </SelectItem>
                <SelectItem value="Terminé" className="cursor-pointer">
                  Terminé
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto overflow-y-auto max-h-137.5! h-137.5">
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead>Batiment</TableHead>
                  <TableHead>Chambre</TableHead>
                  <TableHead>Etudiant</TableHead>
                  <TableHead>Date d'attribution</TableHead>
                  <TableHead>Fin d'attribution</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {status === "loading" ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      Chargement...
                    </TableCell>
                  </TableRow>
                ) : filteredAttribuers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      Aucun attribution trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAttribuers.map((attribuer) => (
                    <TableRow key={attribuer.IdAtt}>
                      <TableCell className="font-medium">
                        {attribuer.NomBat}
                      </TableCell>
                      <TableCell className="font-medium">
                        {attribuer.NumCha}
                      </TableCell>
                      <TableCell>{attribuer.Nom}</TableCell>
                      <TableCell>{attribuer.DateAtt}</TableCell>
                      <TableCell>{attribuer.DateFin}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            attribuer.StatutAtt === "En cours"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {attribuer.StatutAtt}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center items-center gap-2">
                          <Button
                            className="btn bg-blue-600 text-white hover:bg-blue-600/95 hover:text-white hover:shadow-2xs animate-accordion-up cursor-pointer"
                            variant="ghost"
                            disabled={attribuer.StatutAtt === "Terminé"}
                            onClick={() =>
                              handleToggleAttribuer(
                                attribuer.IdAtt,
                                attribuer.IdCha,
                              )
                            }
                          >
                            <Check className="w-4 h-4" />
                            Terminer
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            disabled={attribuer.StatutAtt === "Terminé"}
                            onClick={() => handleEdit(attribuer)}
                            className="cursor-pointer"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(attribuer.IdAtt)}
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

          <div className="flex justify-between gap-2 mt-4">
            <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              Précedent
            </Button>

            <span>
              Page {attribuerPagination?.page || page} /{" "}
              {attribuerPagination?.totalPages || 1}
            </span>

            <Button
              disabled={
                attribuerPagination?.totalPages
                  ? page === attribuerPagination.totalPages
                  : true
              }
              onClick={() => setPage((p) => p + 1)}
            >
              Suivant
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
