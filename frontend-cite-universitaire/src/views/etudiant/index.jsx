import { useState, useRef, useEffect, useMemo } from "react";
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
import z from "zod";
import EtudiantsPageSkeleton from "@/components/skeletons/EtudiantPageSkeleton";

const schema = z.object({
  Matricule: z
    .string()
    .min(1, "Le matricule est obligatoire")
    .regex(
      /^[A-Za-z0-9.-]+$/,
      `Les caractères spéciaux sont invalide à part "-"`,
    ),
  Nom: z
    .string()
    .min(3, "Le nom doit contenir au moins 3 caractères")
    .regex(
      /^[A-Za-zÀ-ÿ\s'-]+$/,
      "Le nom ne doit pas contenir des caractères autres que l'aphabetique",
    ),
  Sexe: z.string().min(1, "Le sexe est obligatoire"),
  DateNaissance: z.string().min(1, "La date de naissance est obligatoire"),
  Telephone: z
    .string()
    .regex(/^(\+261|0)(32|33|34|37|38)\d{7}$/, "Téléphone invalide")
    .optional()
    .or(z.literal("")),
  Email: z.email("Email invalide").min(1, "L'email est obligatoire"),
  Filiere: z.string().optional().or(z.literal("")),
  Niveau: z.string().min(1, "Le niveau est obligatoire"),
  Universite: z.string().optional().or(z.literal("")),
});

const DEFAULT_ETUDIANT = {
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
};

export default function EtudiantPage() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [filterFiliere, setFilterFiliere] = useState("");
  const [filterUniversity, setFilterUniversity] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [etudiant, setEtudiant] = useState(DEFAULT_ETUDIANT);
  const [errors, setErrors] = useState({});
  const { etudiants, status } = useSelector((state) => state.etudiant);

  const allFilieres = useMemo(() => {
    return [...new Set(etudiants.map((e) => e.Filiere).filter(Boolean))];
  }, [etudiants]);

  const allUniversities = useMemo(() => {
    return [...new Set(etudiants.map((e) => e.Universite).filter(Boolean))];
  }, [etudiants]);

  const filteredEtudiants =
    etudiants?.filter((s) => {
      const matchesNom = s.Nom.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMatricule = s.Matricule.toLowerCase().includes(
        searchTerm.toLowerCase(),
      );
      const matchesTelephone = s.Telephone.toLowerCase().includes(
        searchTerm.toLowerCase(),
      );
      const matchesEmail = s.Email.toLowerCase().includes(
        searchTerm.toLowerCase(),
      );
      const matchesLevel = filterLevel
        ? filterLevel === "all"
          ? true
          : s.Niveau === filterLevel
        : true;
      const matchesFiliere = filterFiliere
        ? filterFiliere === "all"
          ? true
          : s.Filiere === filterFiliere
        : true;
      const matchesUniversity = filterUniversity
        ? filterUniversity === "all"
          ? true
          : s.Universite === filterUniversity
        : true;

      return (
        (matchesNom || matchesMatricule || matchesTelephone || matchesEmail) &&
        matchesLevel &&
        matchesFiliere &&
        matchesUniversity
      );
    }) || [];

  useEffect(() => {
    if (!etudiants) dispatch(fetchEtudiant());
  }, []);

  const handleInputEtudiantChange = (e) => {
    const { name, value } = e.target;

    setEtudiant((prev) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = schema.safeParse(etudiant);

    if (!result.success) {
      const tree = z.treeifyError(result.error);
      setErrors(tree.properties);
      return;
    }

    setErrors({});
    if (editingId) {
      dispatch(editEtudiant({ IdEtu: editingId, data: etudiant }))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          setEditingId(null);
          setEtudiant(DEFAULT_ETUDIANT);
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
          setEtudiant(DEFAULT_ETUDIANT);
          setIsOpen(false);
        })
        .catch((error) => {
          console.error(error.error);
          toast.error(error.message);
        });
    }
  };

  const onDelete = async (IdEtu) => {
    dispatch(removeEtudiant(IdEtu))
      .unwrap()
      .then((response) => {
        toast.success(response.message);
      })
      .catch((error) => {
        console.error(error.error);
        toast.error(error.message);
      });
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

  const handleDelete = async (id, nom) => {
    toast.custom(
      (t) => (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 p-6 w-100 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              Supprimer l'étudiant {nom}
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
    return <EtudiantsPageSkeleton />;
  }

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
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
              setEtudiant(DEFAULT_ETUDIANT);
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
              Ajouter un Étudiant
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl w-3xl max-h-[90vh] overflow-y-auto">
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
                    placeholder="EXE001"
                  />
                  {errors.Matricule && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.Matricule.errors[0]}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium ">Nom</label>
                  <Input
                    name="Nom"
                    value={etudiant.Nom}
                    onChange={handleInputEtudiantChange}
                    placeholder="Dupont Jean"
                  />
                  {errors.Nom && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.Nom.errors[0]}
                    </p>
                  )}
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
                      if (errors.Sexe) {
                        setErrors((prev) => ({
                          ...prev,
                          Sexe: undefined,
                        }));
                      }
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
                  {errors.Sexe && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.Sexe.errors[0]}
                    </p>
                  )}
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
                  />
                  {errors.DateNaissance && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.DateNaissance.errors[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Téléphone</label>
                  <Input
                    name="Telephone"
                    value={etudiant.Telephone}
                    onChange={handleInputEtudiantChange}
                    placeholder="+261..."
                  />
                  {errors.Telephone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.Telephone.errors[0]}
                    </p>
                  )}
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
                  {errors.Email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.Email.errors[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Filière</label>
                  <Input
                    name="Filiere"
                    value={etudiant.Filiere}
                    onChange={handleInputEtudiantChange}
                    placeholder="Informatique"
                  />
                  {errors.Filiere && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.Filiere.errors[0]}
                    </p>
                  )}
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
                      if (errors.Niveau) {
                        setErrors((prev) => ({
                          ...prev,
                          Niveau: undefined,
                        }));
                      }
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
                  {errors.Niveau && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.Niveau.errors[0]}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium">Université</label>
                  <Input
                    name="Universite"
                    value={etudiant.Universite}
                    onChange={handleInputEtudiantChange}
                    placeholder="Université XYZ"
                  />
                  {errors.Universite && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.Universite.errors[0]}
                    </p>
                  )}
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
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Rechercher par nom, matricule, Téléphone ou Email "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={filterLevel}
              onValueChange={(value) => {
                setFilterLevel(value);
              }}
            >
              <SelectTrigger className="w-1/6 cursor-pointer">
                <SelectValue placeholder="Filtrer par Niveau" />
              </SelectTrigger>
              <SelectContent className="uppercase" position="popper">
                <SelectItem value="all" className="cursor-pointer">
                  TOUT
                </SelectItem>
                <SelectItem value="L1" className="cursor-pointer">
                  Licence 1
                </SelectItem>
                <SelectItem value="L2" className="cursor-pointer">
                  Licence 2
                </SelectItem>
                <SelectItem value="L3" className="cursor-pointer">
                  Licence 3
                </SelectItem>
                <SelectItem value="M1" className="cursor-pointer">
                  Master 1
                </SelectItem>
                <SelectItem value="M2" className="cursor-pointer">
                  Master 2
                </SelectItem>
                <SelectItem value="D1" className="cursor-pointer">
                  Doctorant 1
                </SelectItem>
                <SelectItem value="D2" className="cursor-pointer">
                  Doctorant 2
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filterFiliere}
              onValueChange={(value) => {
                setFilterFiliere(value);
              }}
            >
              <SelectTrigger className="w-1/6 cursor-pointer">
                <SelectValue placeholder="Filtrer par Filiere" />
              </SelectTrigger>
              <SelectContent className="uppercase" position="popper">
                <SelectItem value="all" className="cursor-pointer">
                  TOUT
                </SelectItem>
                {allFilieres.map((f, index) => {
                  return (
                    <SelectItem
                      key={index}
                      value={f}
                      className="cursor-pointer"
                    >
                      {f}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <Select
              value={filterUniversity}
              onValueChange={(value) => {
                setFilterUniversity(value);
              }}
            >
              <SelectTrigger className="w-1/6 cursor-pointer">
                <SelectValue placeholder="Filtrer par Université" />
              </SelectTrigger>
              <SelectContent className="uppercase" position="popper">
                <SelectItem value="all" className="cursor-pointer">
                  TOUT
                </SelectItem>
                {allUniversities.map((u, index) => {
                  return (
                    <SelectItem
                      key={index}
                      value={u}
                      className="cursor-pointer"
                    >
                      {u}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
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
                            onClick={() =>
                              handleDelete(etudiant.IdEtu, etudiant.Nom)
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
    </div>
  );
}
