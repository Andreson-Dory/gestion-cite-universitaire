import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBatiment,
  editBatiment,
  fetchBatiment,
  removeBatiment,
} from "../../redux/features/batiment/batimentThunk";
import {
  addChambre,
  editChambre,
  fetchChambre,
  removeChambre,
} from "../../redux/features/chambre/chambreThunk";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import z from "zod";

const batimentSchema = z.object({
  NomBat: z.string().min(1, "Le nom du batiment est obligatoire"),
  TypeBat: z.string().min(1, "Veuillez choisir le type du batiment"),
  NbEtage: z
    .string()
    .min(1, "Le nombre d'étage est obligatoire")
    .regex(/^[0-9]+$/, "Caractères numériques seulement autorisés"),
  Description: z.string().optional().or(z.literal("")),
});

const chambreSchema = z.object({
  NumCha: z
    .string()
    .min(0, "Le numero du chambre est obligatoire")
    .regex(
      /^[A-Za-z0-9]+$/,
      "Veuillez entrer seulement des caractères alphanumérique",
    ),
  TypeCha: z.string().min(1, "Veuillez choisir le type du chambre"),
  IdBat: z
    .string()
    .min(1, "Veuillez choisir un batiment")
    .regex(/^[0-9]+$/, ""),
  Capacite: z
    .string()
    .min(1, "La capacité du chambre est obligatoire")
    .regex(/^[0-9]+$/, "Caractères numériques seulement autorisés"),
  Etage: z
    .string()
    .min(1, "Veuillez choisir l'étage du chambre")
    .regex(/^[0-9]+$/, ""),
  StatutCha: z.string().min(1, "Veuillez choisir le statut du chambre"),
});

const DEFAULT_BATIMENT = {
  IdBat: "",
  NomBat: "",
  TypeBat: "",
  NbEtage: "",
  Description: "",
};

const DEFAULT_CHAMBRE = {
  IdCha: "",
  NumCha: "",
  TypeCha: "",
  Capacite: "",
  Etage: "",
  StatutCha: "",
  IdBat: "",
};

export default function BatimentPage() {
  const [activeTab, setActiveTab] = useState("batiments");
  const [isOpenModalBatiment, setIsOpenModalBatiment] = useState(false);
  const [isOpenModalChambre, setIsOpenModalChambre] = useState(false);
  const [editingBatimentId, setEditingBatimentId] = useState(null);
  const [editingChambreId, setEditingChambreId] = useState(null);
  const [batiment, setBatiment] = useState(DEFAULT_BATIMENT);
  const [chambre, setChambre] = useState(DEFAULT_CHAMBRE);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { batiments, status: statusBatiment } = useSelector(
    (state) => state.batiment,
  );
  const { chambres, status: statusChambre } = useSelector(
    (state) => state.chambre,
  );

  // Filter Batiment
  const [searchTermBatiment, setSearchTermBatiment] = useState("");
  const [filterTypeBatiment, setFilterTypeBatiment] = useState("");

  const filteredBatiment =
    batiments?.filter((b) => {
      const matchesNom = b.NomBat.toLowerCase().includes(
        searchTermBatiment.toLowerCase(),
      );
      const matchesEtage = searchTermBatiment
        ? b.NbEtage === Number(searchTermBatiment)
        : true;
      const matchesTypeBatiment = filterTypeBatiment
        ? filterTypeBatiment === "all"
          ? true
          : b.TypeBat === filterTypeBatiment
        : true;

      return (matchesNom || matchesEtage) && matchesTypeBatiment;
    }) || [];

  // Filter Chambre
  const [searchTermChambre, setSearchTermChambre] = useState("");
  const [filterBatiment, setFilterBatiment] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredChambre =
    chambres?.filter((c) => {
      const matchesNumCha = c.NumCha.includes(searchTermChambre);
      const matchesBatiment = filterBatiment
        ? filterBatiment === "all"
          ? true
          : c.NomBat === filterBatiment
        : true;
      const matchesStatus = filterStatus
        ? filterStatus === "all"
          ? true
          : c.StatutCha === filterStatus
        : true;

      return matchesNumCha && matchesBatiment && matchesStatus;
    }) || [];

  useEffect(() => {
    dispatch(fetchBatiment());
    dispatch(fetchChambre());
  }, []);

  const handleSubmitBatiment = (e) => {
    e.preventDefault();

    const result = batimentSchema.safeParse(batiment);

    if (!result.success) {
      const tree = z.treeifyError(result.error);
      setErrors(tree.properties);
      return;
    }

    if (editingBatimentId) {
      dispatch(editBatiment({ IdBat: editingBatimentId, data: batiment }))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          setEditingBatimentId(null);
          setBatiment(DEFAULT_BATIMENT);
          setIsOpenModalBatiment(false);
        })
        .catch((error) => {
          console.error(error.error);
          toast.error(error.message);
        });
    } else {
      dispatch(addBatiment(batiment))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          setBatiment(DEFAULT_BATIMENT);
          setIsOpenModalBatiment(false);
        })
        .catch((error) => {
          console.error(error.error);
          toast.error(error.message);
        });
    }
  };

  const handleSubmitChambre = (e) => {
    e.preventDefault();

    const result = chambreSchema.safeParse(chambre);

    if (!result.success) {
      const tree = z.treeifyError(result.error);
      setErrors(tree.properties);
      return;
    }
    if (editingChambreId) {
      dispatch(editChambre({ IdCha: editingChambreId, data: chambre }))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          setEditingChambreId(null);
          setChambre(DEFAULT_CHAMBRE);
          setIsOpenModalChambre(false);
        })
        .catch((error) => {
          console.error(error.error);
          toast.error(error.message);
        });
    } else {
      dispatch(addChambre(chambre))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          setChambre(DEFAULT_CHAMBRE);
          setIsOpenModalChambre(false);
        })
        .catch((error) => {
          console.error(error.error);
          toast.error(error.message);
        });
    }
  };

  const handleEditBatiment = (batiment) => {
    const newBatiment = { ...batiment, NbEtage: String(batiment.NbEtage) };
    setBatiment(newBatiment);
    setEditingBatimentId(batiment.IdBat);
    setIsOpenModalBatiment(true);
  };

  const handleEditChambre = (chambre) => {
    const newChambre = {
      ...chambre,
      Capacite: String(chambre.Capacite),
      IdBat: String(chambre.IdBat),
      Etage: String(chambre.Etage),
    };
    setChambre(newChambre);
    setEditingChambreId(chambre.IdCha);
    setIsOpenModalChambre(true);
  };

  const handleDeleteBatiment = (idBat) => {
    if (confirm("Êtes-vous sûr?")) {
      dispatch(removeBatiment(idBat))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
        })
        .catch((error) => {
          console.error(error.error);
          toast.error(error.message);
        });
    }
  };

  const handleDeleteChambre = (idCha) => {
    if (confirm("Êtes-vous sûr?")) {
      dispatch(removeChambre(idCha))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
        })
        .catch((error) => {
          console.error(error.error);
          toast.error(error.message);
        });
    }
  };

  const handleInputBatimentChange = (e) => {
    const { name, value } = e.target;

    setBatiment((prev) => {
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

  const handleInputChambreChange = (e) => {
    const { name, value } = e.target;

    setChambre((prev) => {
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

  const openAddBatimentDialog = () => {
    setEditingBatimentId(null);
    setIsOpenModalBatiment(true);
  };

  const openAddChambreDialog = () => {
    setEditingChambreId(null);
    setIsOpenModalChambre(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Gestion des Bâtiments et Chambres
        </h1>
        <p className="text-gray-600 mt-2">
          Gérez l&apos;infrastructure de la résidence
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="batiments" className="cursor-pointer">
            Bâtiments
          </TabsTrigger>
          <TabsTrigger value="chambres" className="cursor-pointer">
            Chambres
          </TabsTrigger>
        </TabsList>

        {/* Buildings Tab */}
        <TabsContent value="batiments" className="space-y-4">
          <div className="flex justify-end">
            <Dialog
              open={isOpenModalBatiment}
              onOpenChange={(open) => {
                setIsOpenModalBatiment(open);
                if (!open) {
                  setEditingBatimentId(null);
                  setBatiment(DEFAULT_BATIMENT);
                  setErrors({});
                }
              }}
            >
              <DialogTrigger asChild>
                <Button
                  onClick={openAddBatimentDialog}
                  className="cursor-pointer"
                >
                  <Plus className="w-4 h-4 mr-2 cursor-pointer" />
                  Ajouter un Bâtiment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingBatimentId ? "Modifier" : "Ajouter"} Bâtiment
                  </DialogTitle>
                  <DialogDescription>
                    Remplissez le formulaire pour{" "}
                    {editingBatimentId ? "modifier" : "ajouter"} un bâtiment
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitBatiment} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">
                      Nom du Bâtiment
                    </label>
                    <Input
                      name="NomBat"
                      placeholder="Bâtiment A"
                      value={batiment.NomBat}
                      onChange={handleInputBatimentChange}
                    />
                    {errors.NomBat && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.NomBat.errors[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium">Type</label>
                    <Select
                      name="TypeBat"
                      value={batiment.TypeBat}
                      onValueChange={(value) => {
                        setBatiment((prev) => ({
                          ...prev,
                          TypeBat: value,
                        }));
                        if (errors.TypeBat) {
                          setErrors((prev) => ({
                            ...prev,
                            TypeBat: undefined,
                          }));
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le type du batiment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mixte">Mixte</SelectItem>
                        <SelectItem value="Masculin">Masculin</SelectItem>
                        <SelectItem value="Feminin">Féminin</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.TypeBat && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.TypeBat.errors[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Nombre d&apos;Étages
                    </label>
                    <Input
                      name="NbEtage"
                      placeholder="5"
                      value={batiment.NbEtage}
                      onChange={handleInputBatimentChange}
                    />
                    {errors.NbEtage && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.NbEtage.errors[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Input
                      name="Description"
                      placeholder="Description du bâtiment"
                      value={batiment.Description}
                      onChange={handleInputBatimentChange}
                    />
                    {errors.Description && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.Description.errors[0]}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full cursor-pointer">
                    {editingBatimentId ? "Mettre à jour" : "Créer"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Liste des Bâtiments</CardTitle>
              <CardDescription>
                Total: {batiments?.length || 0} bâtiments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Rechercher par nom du batiment ou nombre d'étage "
                    value={searchTermBatiment}
                    onChange={(e) => setSearchTermBatiment(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={filterTypeBatiment}
                  onValueChange={(value) => {
                    setFilterTypeBatiment(value);
                  }}
                >
                  <SelectTrigger className="w-1/6 cursor-pointer">
                    <SelectValue placeholder="Filtrer par Type" />
                  </SelectTrigger>
                  <SelectContent className="uppercase" position="popper">
                    <SelectItem value="all" className="cursor-pointer">
                      TOUT
                    </SelectItem>
                    <SelectItem value="Mixte" className="cursor-pointer">
                      Mixte
                    </SelectItem>
                    <SelectItem value="Masculin" className="cursor-pointer">
                      Masculin
                    </SelectItem>
                    <SelectItem value="Feminin" className="cursor-pointer">
                      Féminin
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Étages</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {statusBatiment === "loading" ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          Chargement...
                        </TableCell>
                      </TableRow>
                    ) : !batiments || batiments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          Aucun bâtiment
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredBatiment.map((batiment) => (
                        <TableRow key={batiment.IdBat}>
                          <TableCell className="font-medium">
                            {batiment.NomBat}
                          </TableCell>
                          <TableCell>{batiment.TypeBat}</TableCell>
                          <TableCell>{batiment.NbEtage}</TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {batiment.Description}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEditBatiment(batiment)}
                                className="cursor-pointer"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  handleDeleteBatiment(batiment.IdBat)
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

        {/* Rooms Tab */}
        <TabsContent value="chambres" className="space-y-4">
          <div className="flex justify-end">
            <Dialog
              open={isOpenModalChambre}
              onOpenChange={(open) => {
                setIsOpenModalChambre(open);
                if (!open) {
                  setEditingChambreId(null);
                  setChambre(DEFAULT_CHAMBRE);
                  setErrors({});
                }
              }}
            >
              <DialogTrigger asChild>
                <Button
                  onClick={() => openAddChambreDialog("chambre")}
                  className="cursor-pointer"
                >
                  <Plus className="w-4 h-4 mr-2 cursor-pointer" />
                  Ajouter une Chambre
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingChambreId ? "Modifier" : "Ajouter"} Chambre
                  </DialogTitle>
                  <DialogDescription>
                    Remplissez le formulaire pour{" "}
                    {editingChambreId ? "modifier" : "ajouter"} une chambre
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitChambre} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">
                      Numéro de Chambre
                    </label>
                    <Input
                      name="NumCha"
                      placeholder="101"
                      value={chambre.NumCha}
                      onChange={handleInputChambreChange}
                    />
                    {errors.NumCha && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.NumCha.errors[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium">Type</label>
                    <Select
                      name="TypeCha"
                      value={chambre.TypeCha}
                      onValueChange={(value) => {
                        setChambre((prev) => ({
                          ...prev,
                          TypeCha: value,
                        }));
                        if (errors.TypeCha) {
                          setErrors((prev) => ({
                            ...prev,
                            TypeCha: undefined,
                          }));
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le type du chambre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Simple">Simple</SelectItem>
                        <SelectItem value="Double">Double</SelectItem>
                        <SelectItem value="Triple">Triple</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.TypeCha && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.TypeCha.errors[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium">Capacité</label>
                    <Input
                      name="Capacite"
                      placeholder="1"
                      value={chambre.Capacite}
                      onChange={handleInputChambreChange}
                    />
                    {errors.Capacite && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.Capacite.errors[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium">Bâtiment</label>
                    <Select
                      name="IdBat"
                      value={chambre.IdBat}
                      onValueChange={(value) => {
                        setChambre((prev) => ({
                          ...prev,
                          IdBat: value,
                        }));
                        if (errors.IdBat) {
                          setErrors((prev) => ({
                            ...prev,
                            IdBat: undefined,
                          }));
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un bâtiment" />
                      </SelectTrigger>
                      <SelectContent>
                        {batiments?.map((b) => (
                          <SelectItem key={b.IdBat} value={String(b.IdBat)}>
                            {b.NomBat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.IdBat && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.IdBat.errors[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium">Étage</label>
                    <Select
                      name="Etage"
                      value={chambre.Etage}
                      onValueChange={(value) => {
                        setChambre((prev) => ({
                          ...prev,
                          Etage: value,
                        }));
                        if (errors.Etage) {
                          setErrors((prev) => ({
                            ...prev,
                            Etage: undefined,
                          }));
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner l'étage" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(
                          {
                            length:
                              batiments.find(
                                (b) => b.IdBat === Number(chambre.IdBat),
                              )?.NbEtage || 1,
                          },
                          (_, index) => (
                            <SelectItem
                              key={index + 1}
                              value={String(index + 1)}
                            >
                              {index + 1}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                    {errors.Etage && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.Etage.errors[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium">Statut</label>
                    <Select
                      name="StatutCha"
                      value={chambre.StatutCha}
                      onValueChange={(value) => {
                        setChambre((prev) => ({
                          ...prev,
                          StatutCha: value,
                        }));
                        if (errors.StatutCha) {
                          setErrors((prev) => ({
                            ...prev,
                            StatutCha: undefined,
                          }));
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Veuillez choisir l'état actuel du chambre" />
                      </SelectTrigger>
                      {!editingChambreId && (
                        <SelectContent>
                          <SelectItem value="Libre">Libre</SelectItem>
                          <SelectItem value="Occupée">Occupée</SelectItem>
                          <SelectItem value="Maintenance">
                            Maintenance
                          </SelectItem>
                        </SelectContent>
                      )}
                      {editingChambreId && (
                        <SelectContent>
                          {chambre.StatutCha === "Maintenance" && (
                            <SelectItem value="Libre">Libre</SelectItem>
                          )}
                          {chambre.StatutCha === "Maintenance" && (
                            <SelectItem value="Occupée">Occupée</SelectItem>
                          )}
                          <SelectItem value="Maintenance">
                            Maintenance
                          </SelectItem>
                        </SelectContent>
                      )}
                    </Select>
                    {errors.StatutCha && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.StatutCha.errors[0]}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full cursor-pointer">
                    {editingChambreId ? "Mettre à jour" : "Créer"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Liste des Chambres</CardTitle>
              <CardDescription>
                Total: {chambres?.length || 0} chambres
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Rechercher par numero du chambre "
                    value={searchTermChambre}
                    onChange={(e) => setSearchTermChambre(e.target.value)}
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
                    <SelectItem value="Libre" className="cursor-pointer">
                      Libre
                    </SelectItem>
                    <SelectItem value="Occupée" className="cursor-pointer">
                      Occupée
                    </SelectItem>
                    <SelectItem value="Maintenance" className="cursor-pointer">
                      Maintenance
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Numéro</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Capacité</TableHead>
                      <TableHead>Étage</TableHead>
                      <TableHead>Bâtiment</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {statusChambre === "loading" ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          Chargement...
                        </TableCell>
                      </TableRow>
                    ) : !chambres || chambres.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          Aucune chambre
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredChambre.map((chambre) => (
                        <TableRow key={chambre.IdCha}>
                          <TableCell className="font-medium">
                            {chambre.NumCha}
                          </TableCell>
                          <TableCell>{chambre.TypeCha}</TableCell>
                          <TableCell>{chambre.Capacite}</TableCell>
                          <TableCell>{chambre.Etage}</TableCell>
                          <TableCell>{chambre.NomBat || "N/A"}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                chambre.StatutCha === "Libre"
                                  ? "bg-green-100 text-green-800"
                                  : chambre.StatutCha === "Occupée"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {chambre.StatutCha}
                            </span>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                chambre.StatutCha === "Libre"
                                  ? "bg-green-100 text-green-800"
                                  : chambre.StatutCha === "Occupée"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {chambre.Occupation}/{chambre.Capacite}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEditChambre(chambre)}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  handleDeleteChambre(chambre.IdCha)
                                }
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
