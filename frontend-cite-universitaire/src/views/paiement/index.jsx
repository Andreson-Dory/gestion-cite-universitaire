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
import { Plus, Trash2, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  addPaiement,
  fetchPaiement,
  removePaiement,
} from "@/redux/features/paiement/paiementThunk";
import { fetchEtudiant } from "@/redux/features/Etudiant/etudiantThunk";

export default function PaiementPage() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTypePai, setFilterTypePai] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatusPai, setFilterStatusPai] = useState("");
  const [paiement, setPaiement] = useState({
    IdPai: "",
    DatePai: "",
    MontantPai: "",
    TypePai: "",
    ModePai: "",
    StatutPai: "",
    IdEtu: "",
  });
  const { paiements, status } = useSelector((state) => state.paiement);
  const { etudiants } = useSelector((state) => state.etudiant);

  const filteredPaiements =
    paiements?.filter((s) => {
      const matchesNomEtudiant = s.NomEtudiant.toLowerCase().includes(
        searchTerm.toLowerCase(),
      );
      const matchesMontantPai = s.MontantPai.toLowerCase().includes(
        searchTerm.toLowerCase(),
      );
      const matchesTypePai = filterTypePai
        ? filterTypePai === "all"
          ? true
          : s.TypePai === filterTypePai
        : true;
      const matchesStatus = filterStatusPai
        ? filterStatusPai === "all"
          ? true
          : s.StatutPai === filterStatusPai
        : true;

      const matchesDate = filterDate ? s.DatePai === filterDate : true;

      return (
        (matchesNomEtudiant || matchesMontantPai) &&
        matchesStatus &&
        matchesTypePai &&
        matchesDate
      );
    }) || [];

  useEffect(() => {
    dispatch(fetchPaiement());
    dispatch(fetchEtudiant());
  }, []);

  const handleInputPaiementChange = (e) => {
    const { name, value } = e.target;

    setPaiement((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date().toLocaleDateString("en-CA");
    const newPaiement = {
      ...paiement,
      DatePai: date.split("T")[0],
    };
    dispatch(addPaiement(newPaiement))
      .unwrap()
      .then((response) => {
        toast.success(response.message);
        setPaiement({
          IdPai: "",
          DatePai: "",
          MontantPai: "",
          TypePai: "",
          ModePai: "",
          StatutPai: "",
          IdEtu: "",
        });
        setIsOpen(false);
      })
      .catch((error) => {
        console.error(error.error);
        toast.error(error.message);
      });
  };

  const handleDelete = async (IdEtu) => {
    if (confirm("Êtes-vous sûr?")) {
      dispatch(removePaiement(IdEtu))
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

  if (status === "error")
    return <div className="text-red-600">Erreur de chargement</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Paiements</h1>
          <p className="text-gray-600 mt-2">
            Gérez les Paiement de location de la résidence
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">
              <Plus className="w-4 h-4 mr-2" />
              Effectuer un Paiement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Effectuer un Paiement</DialogTitle>
              <DialogDescription>
                Remplissez le formulaire pour effectuer un paiement
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="hidden" name="id" />

                <div>
                  <label className="text-sm font-medium">Montant</label>
                  <Input
                    type="text"
                    name="MontantPai"
                    value={paiement.MontantPai}
                    pattern="[0-9]+"
                    title="Veuillez entrer uniquement des chiffres"
                    onChange={handleInputPaiementChange}
                    required
                    placeholder="60000"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Type de paiement
                  </label>
                  <Select
                    name="TypePai"
                    value={paiement.TypePai}
                    onValueChange={(value) => {
                      setPaiement((prev) => ({
                        ...prev,
                        TypePai: value,
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selectionner le sexe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Loyer">Loyer</SelectItem>
                      <SelectItem value="Sanction">Sanction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Mode de paiement
                  </label>
                  <Select
                    name="ModePai"
                    value={paiement.ModePai}
                    onValueChange={(value) => {
                      setPaiement((prev) => ({
                        ...prev,
                        ModePai: value,
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selectionner le sexe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                      <SelectItem value="Virement">Virement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Statut du paiement
                  </label>
                  <Select
                    name="StatutPai"
                    value={paiement.StatutPai}
                    onValueChange={(value) => {
                      setPaiement((prev) => ({
                        ...prev,
                        StatutPai: value,
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selectionner le sexe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Payé">Payé</SelectItem>
                      <SelectItem value="Partiel">Partiel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium">Étudiant</label>
                  <Select
                    name="IdEtu"
                    value={paiement.IdEtu.toString() || ""}
                    onValueChange={(value) =>
                      setPaiement((prev) => ({
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
              </div>

              <Button type="submit" className="w-full cursor-pointer">
                Confirmer
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Paiements</CardTitle>
          <CardDescription>
            Total: {paiements?.length || 0} Paiements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-2">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Rechercher par nom de l'étudiant ou montant du paiement"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={filterTypePai}
              onValueChange={(value) => {
                setFilterTypePai(value);
              }}
            >
              <SelectTrigger className="w-1/6 cursor-pointer">
                <SelectValue placeholder="Filtrer par Type" />
              </SelectTrigger>
              <SelectContent className="uppercase" position="popper">
                <SelectItem value="all" className="cursor-pointer">
                  TOUT
                </SelectItem>
                <SelectItem value="Loyer" className="cursor-pointer">
                  Loyer
                </SelectItem>
                <SelectItem value="Sanction" className="cursor-pointer">
                  Sanction
                </SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filterStatusPai}
              onValueChange={(value) => {
                setFilterStatusPai(value);
              }}
            >
              <SelectTrigger className="w-1/6 cursor-pointer">
                <SelectValue placeholder="Filtrer par Statut" />
              </SelectTrigger>
              <SelectContent className="uppercase" position="popper">
                <SelectItem value="all" className="cursor-pointer">
                  TOUT
                </SelectItem>
                <SelectItem value="Payé" className="cursor-pointer">
                  Payé
                </SelectItem>
                <SelectItem value="Partiel" className="cursor-pointer">
                  Partiel
                </SelectItem>
              </SelectContent>
            </Select>
            <Input
              className="w-1/6"
              type="date"
              value={filterDate}
              onChange={(e) => {
                setFilterDate(e.target.value);
              }}
              required
            />
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date du Paiement</TableHead>
                  <TableHead>Montant (Ar)</TableHead>
                  <TableHead>Type de Paiement</TableHead>
                  <TableHead>Mode de Paiement</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Etudiant</TableHead>
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
                ) : paiements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      Aucun paiement trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPaiements.map((paiement) => (
                    <TableRow key={paiement.IdPai}>
                      <TableCell className="font-medium">
                        {paiement.DatePai?.split("T")[0]}
                      </TableCell>
                      <TableCell>{paiement.MontantPai}</TableCell>
                      <TableCell>{paiement.TypePai}</TableCell>
                      <TableCell>{paiement.ModePai}</TableCell>
                      <TableCell>{paiement.StatutPai}</TableCell>
                      <TableCell>{paiement.NomEtudiant}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(paiement.IdPai)}
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
