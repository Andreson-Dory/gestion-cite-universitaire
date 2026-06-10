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
import { Plus, Pencil, Trash2, Search, Check } from "lucide-react";
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

export default function AttribuerPage() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBatiment, setFilterBatiment] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [attribuer, setAttribuer] = useState({
    IdAtt: "",
    IdCha: "",
    IdEtu: "",
    DateAtt: "",
    DateFin: "",
    StatutAtt: "",
  });
  const { attribuers, status } = useSelector((state) => state.attribuer);
  const { etudiants } = useSelector((state) => state.etudiant);
  const { chambres } = useSelector((state) => state.chambre);
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

  useEffect(() => {
    dispatch(fetchAttribuer());
    dispatch(fetchChambre());
    dispatch(fetchEtudiant());
    dispatch(fetchBatiment());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      dispatch(editAttribuer({ IdAtt: editingId, data: attribuer }))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          setEditingId(null);
          setAttribuer({
            IdAtt: "",
            IdCha: "",
            IdEtu: "",
            DateAtt: "",
            DateFin: "",
            StatutAtt: "",
          });
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
          setAttribuer({
            IdAtt: "",
            IdCha: "",
            IdEtu: "",
            DateAtt: "",
            DateFin: "",
            StatutAtt: "",
          });
          setIsOpen(false);
        })
        .catch((error) => {
          console.error(error.error);
          toast.error(error.message);
        });
    }
  };

  const handleDelete = async (IdAtt) => {
    if (confirm("Êtes-vous sûr?")) {
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
    }
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
  };

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
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                  <Select
                    name="IdCha"
                    value={attribuer.IdCha.toString() || ""}
                    onValueChange={(value) =>
                      setAttribuer((prev) => ({
                        ...prev,
                        IdCha: Number(value),
                      }))
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un chambre" />
                    </SelectTrigger>
                    <SelectContent>
                      {chambres?.map((e) => (
                        <SelectItem key={e.IdCha} value={e.IdCha.toString()}>
                          {e.NumCha}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium">Étudiant</label>
                  <Select
                    name="IdEtu"
                    value={attribuer.IdEtu.toString() || ""}
                    onValueChange={(value) =>
                      setAttribuer((prev) => ({
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
                        <SelectItem key={e.IdEtu} value={e.IdEtu.toString()}>
                          {e.Nom} ({e.Matricule})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {!editingId && (
                  <div>
                    <label className="text-sm font-medium">Statut</label>
                    <Select
                      name="StatutAtt"
                      value={attribuer.StatutAtt || ""}
                      onValueChange={(value) =>
                        setAttribuer((prev) => ({
                          ...prev,
                          StatutAtt: value,
                        }))
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Séléctionner le statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="En cours">En cours</SelectItem>
                        <SelectItem value="Terminé">Terminé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium">Date d'écheance</label>
                  <Input
                    name="DateFin"
                    type="date"
                    value={attribuer.DateFin}
                    onChange={handleInputAttribuerChange}
                    required
                  />
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

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batiment</TableHead>
                  <TableHead>Chambre</TableHead>
                  <TableHead>Etudiant</TableHead>
                  <TableHead>Date d'attribution</TableHead>
                  <TableHead>Fin d'attribution</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
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
                      <TableCell>{attribuer.DateAtt.split("T")[0]}</TableCell>
                      <TableCell>{attribuer.DateFin.split("T")[0]}</TableCell>
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
                        <div className="flex gap-2">
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
        </CardContent>
      </Card>
    </div>
  );
}
