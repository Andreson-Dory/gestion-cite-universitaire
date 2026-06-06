import { useState, useRef, useEffect } from "react";
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
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEtudiant,
  editEtudiant,
  fetchEtudiant,
  removeEtudiant,
} from "@/redux/features/Etudiant/etudiantThunk";
import { toast } from "sonner";

export default function EtudiantPage() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [etudiant, setEtudiant] = useState({
    IdEtu: "",
    Matricule: "",
    Nom: "",
    Sexe: "",
    DateNaissance: "",
    Telephone: "",
    Email: "",
    Filiere: "",
    Niveau: "",
    Universite: "",
  });
  const { etudiants, status } = useSelector((state) => state.etudiant);

  const filteredEtudiants =
    etudiants?.filter(
      (s) =>
        s.Nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.Matricule.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  useEffect(() => {
    dispatch(fetchEtudiant());
  }, []);

  const handleInputEtudiantChange = (e) => {
    const { name, value } = e.target;

    setEtudiant((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      dispatch(editEtudiant({ IdEtu: editingId, data: etudiant }))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          setEditingId(null);
          setEtudiant({
            IdEtu: "",
            Matricule: "",
            Nom: "",
            Sexe: "",
            DateNaissance: "",
            Telephone: "",
            Email: "",
            Filiere: "",
            Niveau: "",
            Universite: "",
          });
          setIsOpen(false);
        })
        .catch((error) => {
          console.error(error.error);
          toast.error(error.message);
        });
    } else {
      dispatch(addEtudiant(etudiant))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          setEtudiant({
            IdEtu: "",
            Matricule: "",
            Nom: "",
            Sexe: "",
            DateNaissance: "",
            Telephone: "",
            Email: "",
            Filiere: "",
            Niveau: "",
            Universite: "",
          });
          setIsOpen(false);
        })
        .catch((error) => {
          console.error(error.error);
          toast.error(error.message);
        });
    }
  };

  const handleDelete = async (IdEtu) => {
    if (confirm("Êtes-vous sûr?")) {
      dispatch(removeEtudiant(IdEtu))
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

  const handleEdit = (etudiant) => {
    setEditingId(etudiant.IdEtu);
    setEtudiant(etudiant);
    setEtudiant((prev) => ({
      ...prev,
      DateNaissance: prev.DateNaissance.split("T")[0],
    }));
    setIsOpen(true);
  };

  if (status === "error")
    return <div className="text-red-600">Erreur de chargement</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Étudiants</h1>
          <p className="text-gray-600 mt-2">
            Gérez les étudiants de la résidence
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingId(null)}>
              <Plus className="w-4 h-4 mr-2 cursor-pointer" />
              Ajouter un Étudiant
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Modifier" : "Ajouter"} Étudiant
              </DialogTitle>
              <DialogDescription>
                Remplissez le formulaire pour{" "}
                {editingId ? "modifier" : "ajouter"} un étudiant
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="hidden" name="id" />

                <div>
                  <label className="text-sm font-medium">Matricule</label>
                  <Input
                    name="Matricule"
                    value={etudiant.Matricule}
                    onChange={handleInputEtudiantChange}
                    required
                    placeholder="EXE001"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium ">Nom</label>
                  <Input
                    name="Nom"
                    value={etudiant.Nom}
                    onChange={handleInputEtudiantChange}
                    required
                    placeholder="Dupont Jean"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Sexe</label>
                  <Select
                    name="Sexe"
                    value={etudiant.Sexe}
                    onValueChange={(value) => {
                      setEtudiant((prev) => ({
                        ...prev,
                        Sexe: value,
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selectionner le sexe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Masculin">Masculin</SelectItem>
                      <SelectItem value="Feminin">Féminin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Date de Naissance
                  </label>
                  <Input
                    name="DateNaissance"
                    type="date"
                    value={etudiant.DateNaissance || ""}
                    onChange={handleInputEtudiantChange}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Téléphone</label>
                  <Input
                    name="Telephone"
                    value={etudiant.Telephone}
                    onChange={handleInputEtudiantChange}
                    placeholder="+261..."
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    name="Email"
                    type="email"
                    value={etudiant.Email}
                    onChange={handleInputEtudiantChange}
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Filière</label>
                  <Input
                    name="Filiere"
                    value={etudiant.Filiere}
                    onChange={handleInputEtudiantChange}
                    placeholder="Informatique"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Niveau</label>
                  <Select
                    name="Niveau"
                    value={etudiant.Niveau || ""}
                    onValueChange={(value) => {
                      setEtudiant((prev) => ({
                        ...prev,
                        Niveau: value,
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selectionner le Niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L1">Licence 1</SelectItem>
                      <SelectItem value="L2">Licence 2</SelectItem>
                      <SelectItem value="L3">Licence 3</SelectItem>
                      <SelectItem value="M1">Master 1</SelectItem>
                      <SelectItem value="M2">Master 2</SelectItem>
                      <SelectItem value="D1">Doctorant 1</SelectItem>
                      <SelectItem value="D2">Doctorant 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium">Université</label>
                  <Input
                    name="Universite"
                    value={etudiant.Universite}
                    onChange={handleInputEtudiantChange}
                    placeholder="Université XYZ"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full cursor-pointer">
                {editingId ? "Mettre à jour" : "Créer"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Étudiants</CardTitle>
          <CardDescription>
            Total: {etudiants?.length || 0} étudiants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-2">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Rechercher par nom ou matricule..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Matricule</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Date de naissance</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Filière</TableHead>
                  <TableHead>Niveau</TableHead>
                  <TableHead>Université</TableHead>
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
                ) : filteredEtudiants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      Aucun étudiant trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEtudiants.map((etudiant) => (
                    <TableRow key={etudiant.IdEtu}>
                      <TableCell className="font-medium">
                        {etudiant.Matricule}
                      </TableCell>
                      <TableCell>{etudiant.Nom}</TableCell>
                      <TableCell>
                        {etudiant.DateNaissance.split("T")[0]}
                      </TableCell>
                      <TableCell>{etudiant.Telephone}</TableCell>
                      <TableCell>{etudiant.Email}</TableCell>
                      <TableCell>{etudiant.Filiere}</TableCell>
                      <TableCell>{etudiant.Niveau}</TableCell>
                      <TableCell>{etudiant.Universite}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(etudiant)}
                            className="cursor-pointer"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(etudiant.IdEtu)}
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
