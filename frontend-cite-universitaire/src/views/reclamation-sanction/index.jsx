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
import { Plus, Pencil, Trash2, AlertTriangle } from "lucide-react";
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

export default function ReclamationSanction() {
  const [activeTab, setActiveTab] = useState("reclamations");
  const [isReclamationModalOpen, setIsReclamationModalOpen] = useState(false);
  const [isSanctionModalOpen, setIsSanctionModalOpen] = useState(false);
  const [editingReclamationId, setEditingReclamationId] = useState(null);
  const [editingSanctionId, setEditingSanctionId] = useState(null);
  const [reclamation, setReclamation] = useState({
    IdRec: "",
    DateRec: "",
    Sujet: "",
    DescriptionRec: "",
    StatusRec: "",
    Priorite: "",
    IdEtu: "",
  });
  const [sanction, setSanction] = useState({
    IdSac: "",
    DateSac: "",
    Motif: "",
    DescriptionSac: "",
    MontantAmende: "",
    StatusSac: "",
    IdEtu: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredReclamations =
    reclamations?.filter(
      (c) =>
        c.Sujet.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.Nom.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  const filteredSanctions =
    sanctions?.filter(
      (s) =>
        s.Motif.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.Nom.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  const handleSubmitReclamation = (e) => {
    e.preventDefault();

    if (editingReclamationId) {
      dispatch(
        editReclamation({ IdRec: editingReclamationId, data: reclamation }),
      )
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          setEditingReclamationId(null);
          setReclamation({
            IdRec: "",
            DateRec: "",
            Sujet: "",
            DescriptionRec: "",
            StatusRec: "",
            Priorite: "",
            IdEtu: "",
          });
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
          setReclamation({
            IdRec: "",
            DateRec: "",
            Sujet: "",
            DescriptionRec: "",
            StatusRec: "",
            Priorite: "",
            IdEtu: "",
          });
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

    if (editingSanctionId) {
      dispatch(editSanction({ IdSac: editingSanctionId, data: sanction }))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          setEditingSanctionId(null);
          setSanction({
            IdSac: "",
            DateSac: "",
            Motif: "",
            DescriptionSac: "",
            MontantAmende: "",
            StatusSac: "",
            IdEtu: "",
          });
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
          setSanction({
            IdSac: "",
            DateSac: "",
            Motif: "",
            DescriptionSac: "",
            MontantAmende: "",
            StatusSac: "",
            IdEtu: "",
          });
          setIsSanctionModalOpen(false);
        })
        .catch((error) => {
          console.error(error.error);
          toast.error(error.message);
        });
    }
  };

  const handleDeleteReclamation = (IdRec) => {
    if (confirm("Êtes-vous sûr?")) {
      dispatch(removeReclamation(IdRec))
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

  const handleDeleteSanction = (IdSac) => {
    if (confirm("Êtes-vous sûr?")) {
      dispatch(removeSanction(IdSac))
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

  const handleEditReclamation = (item) => {
    setEditingReclamationId(item.IdRec);
    setReclamation(item);
    setReclamation((prev) => ({
      ...prev,
      DateRec: prev.DateRec.split("T")[0],
    }));
    setIsReclamationModalOpen(true);
  };

  const handleEditSanction = (item) => {
    setEditingSanctionId(item.IdSac);
    setSanction(item);
    setSanction((prev) => ({
      ...prev,
      DateSac: prev.DateSac.split("T")[0],
    }));
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
  };

  const handleInputSanctionChange = (e) => {
    const { name, value } = e.target;
    setSanction((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const openAddReclamationDialog = () => {
    setEditingReclamationId(null);
    setIsReclamationModalOpen(true);
  };

  const openAddSanctionDialog = () => {
    setEditingSanctionId(null);
    setIsSanctionModalOpen(true);
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
          <div className="flex justify-between items-center gap-4">
            <Input
              placeholder="Rechercher par sujet ou nom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
            <Dialog
              open={isReclamationModalOpen}
              onOpenChange={setIsReclamationModalOpen}
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
                    {editingReclamationId && (
                      <div>
                        <label className="text-sm font-medium">Date</label>
                        <Input
                          name="DateRec"
                          value={reclamation.DateRec || ""}
                          disable
                          type="date"
                        />
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium">Priorité</label>
                      <Select
                        name="Priorite"
                        value={reclamation.Priorite || ""}
                        onValueChange={(value) =>
                          setReclamation((prev) => ({
                            ...prev,
                            Priorite: value,
                          }))
                        }
                        required
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
                    </div>

                    <div className="col-span-2">
                      <label className="text-sm font-medium">Étudiant</label>
                      <Select
                        name="IdEtu"
                        value={reclamation.IdEtu.toString() || ""}
                        onValueChange={(value) =>
                          setReclamation((prev) => ({
                            ...prev,
                            IdEtu: Number(value),
                          }))
                        }
                        required
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
                    </div>

                    <div>
                      <label className="text-sm font-medium">Statut</label>
                      <Select
                        name="StatusRec"
                        value={reclamation.StatusRec || ""}
                        onValueChange={(value) =>
                          setReclamation((prev) => ({
                            ...prev,
                            StatusRec: value,
                          }))
                        }
                        required
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
                    </div>

                    <div className="col-span-2">
                      <label className="text-sm font-medium">Sujet</label>
                      <Input
                        name="Sujet"
                        value={reclamation.Sujet}
                        onChange={handleInputReclamationChange}
                        required
                        placeholder="Sujet de la réclamation"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="text-sm font-medium">Description</label>
                      <Input
                        name="DescriptionRec"
                        value={reclamation.DescriptionRec}
                        onChange={handleInputReclamationChange}
                        placeholder="Description détaillée"
                      />
                    </div>
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
                          <TableCell>{reclamation.IdEtu}</TableCell>
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
          <div className="flex justify-between items-center gap-4">
            <Input
              placeholder="Rechercher par motif ou nom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
            <Dialog
              open={isSanctionModalOpen}
              onOpenChange={setIsSanctionModalOpen}
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
                    {editingSanctionId && (
                      <div>
                        <label className="text-sm font-medium">Date</label>
                        <Input
                          name="DateSac"
                          value={sanction.DateSac || ""}
                          disable
                          type="date"
                        />
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium">
                        Montant Amende (XAF)
                      </label>
                      <Input
                        name="MontantAmende"
                        type="number"
                        value={sanction.MontantAmende}
                        onChange={handleInputSanctionChange}
                        placeholder="0"
                        step="100"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="text-sm font-medium">Étudiant</label>
                      <Select
                        name="IdEtu"
                        value={sanction.IdEtu.toString() || ""}
                        onValueChange={(value) =>
                          setSanction((prev) => ({
                            ...prev,
                            IdEtu: Number(value),
                          }))
                        }
                        required
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
                    </div>

                    <div className="col-span-2">
                      <label className="text-sm font-medium">Motif</label>
                      <Input
                        name="Motif"
                        value={sanction.Motif}
                        onChange={handleInputSanctionChange}
                        required
                        placeholder="Motif de la sanction"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Statut</label>
                      <Select
                        name="StatusSac"
                        value={sanction.StatusSac || ""}
                        onValueChange={(value) =>
                          setSanction((prev) => ({
                            ...prev,
                            StatusSac: value,
                          }))
                        }
                        required
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
                    </div>

                    <div className="col-span-2">
                      <label className="text-sm font-medium">Description</label>
                      <Input
                        name="DescriptionSac"
                        value={sanction.DescriptionSac}
                        onChange={handleInputSanctionChange}
                        placeholder="Description de la sanction"
                      />
                    </div>
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
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Motif</TableHead>
                      <TableHead>Déscription</TableHead>
                      <TableHead>Étudiant</TableHead>
                      <TableHead>Montant</TableHead>
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
                          <TableCell>{sanction.IdEtu}</TableCell>
                          <TableCell className="font-medium">
                            {Number(sanction.MontantAmende).toFixed(2)} Ar
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
