import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBatiment, editBatiment, fetchBatiment, removeBatiment } from "../../redux/features/batiment/batimentThunk";
import { addChambre, editChambre, fetchChambre, removeChambre } from "../../redux/features/chambre/chambreThunk";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function BatimentPage() {
    const [activeTab, setActiveTab] = useState('batiments');
    const [isOpenModalBatiment, setIsOpenModalBatiment] = useState(false);    
    const [isOpenModalChambre, setIsOpenModalChambre] = useState(false);
    const [editingBatimentId, setEditingBatimentId] = useState(null);
    const [editingChambreId, setEditingChambreId] = useState(null);
    const [batiment, setBatiment] = useState({
      IdBat: "",
      NomBat: "",
      TypeBat: "",
      NbEtage: "0",
      Description: ""
    });
    const [chambre, setChambre] = useState({
      IdCha: "",
      NumCha: "",
      TypeCha: "",
      Capacite: 0,
      Etage: 0,
      StatutCha: "",
      IdBat: ""
    });
    const [selectedBatiment, setSelectedBatiment] = useState({});
    const dispatch = useDispatch();
    const { batiments, status : statusBatiment } = useSelector((state) => state.batiment);
    const { chambres, status: statusChambre } = useSelector((state) => state.chambre);

    useEffect(() => {
        dispatch(fetchBatiment());
        dispatch(fetchChambre());    
    }, []);

    const handleSubmitBatiment = (e) => {
      e.preventDefault();

      if(editingBatimentId) {
          dispatch(editBatiment({IdBat: editingBatimentId, data: batiment})).unwrap()
          .then(() => {
            toast.success("Batiment mis à jour avec succès !");
            setEditingBatimentId(null);
            setBatiment({
              IdBat: "",
              NomBat: "",
              TypeBat: "",
              NbEtage: 0,
              Description: ""
            });
            setIsOpenModalBatiment(false);
          })
          .catch((error) => {
            console.error(error);
            toast.error("Erreur survenue lors de la mise à jour du batiment !");
          });
      } else {
          dispatch(addBatiment(batiment)).unwrap()
          .then(() => {
            toast.success("Batiment ajouté avec succès !");
            setBatiment({
              IdBat: "",
              NomBat: "",
              TypeBat: "",
              NbEtage: 0,
              Description: ""
            });
            setIsOpenModalBatiment(false);
          })
          .catch((error) => {
            console.error(error);
            toast.error("Erreur survenue lors d'ajout du batiment !");
          })
      }
    };

    const handleSubmitChambre = (e) => {
      e.preventDefault();
      
      if(editingChambreId) {
          dispatch(editChambre({IdCha: editingChambreId, data: chambre})).unwrap()
          .then(() => {
            toast.success("Chambre mis à jour avec succès !");
            setEditingChambreId(null);
            setChambre({
              IdCha: "",
              NumCha: "",
              TypeCha: "",
              Capacite: 0,
              Etage: 0,
              StatutCha: "",
              IdBat: ""
            });
            setIsOpenModalChambre(false);
          })
          .catch((error) => {
            console.error(error);
            toast.error("Erreur survenue lors de la mise à jour du chambre !");
          });
      } else {
          dispatch(addChambre(chambre)).unwrap()
          .then(() => {
            toast.success("Chambre ajouté avec succès !");
            setChambre({
              IdCha: "",
              NumCha: "",
              TypeCha: "",
              Capacite: 0,
              Etage: 0,
              StatutCha: "",
              IdBat: ""
            });
            setIsOpenModalChambre(false);
          })
          .catch((error) => {
            console.error(error);
            toast.error("Erreur survenue lors d'ajout du chambre !");
          })
      }
    };

    const handleEditBatiment = (batiment) => {
          setBatiment(batiment);
          setEditingBatimentId(batiment.IdBat);
          setIsOpenModalBatiment(true);
    };

    const handleEditChambre = (chambre) => {
          setChambre(chambre);
          setEditingChambreId(chambre.IdCha);
          setIsOpenModalChambre(true);
    };

    const handleDeleteBatiment = (idBat) => {
      if (confirm('Êtes-vous sûr?')) {
        dispatch(removeBatiment(idBat)).unwrap()
        .then(() => {
          toast.success("Suppresion de batiment réussit !")
        })
        .catch((error) => {
          console.error(error);
          toast.error("Erreur survenue lors de la suppression du batiment !");
        })
      }
    }

    const handleDeleteChambre = (idCha) => {
      if (confirm('Êtes-vous sûr?')) {
        dispatch(removeChambre(idCha)).unwrap()
        .then(() => {
          toast.success("Suppresion de chambre réussit !")
        })
        .catch((error) => {
          console.error(error);
          toast.error("Erreur survenue lors de la suppression du chambre !");
        })
      }
    }

    const handleInputBatimentChange = (e) => {
      const { name, value } = e.target;

      setBatiment((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    };

    const handleInputChambreChange = (e) => {
      const { name, value } = e.target;

      setChambre((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
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
        <h1 className="text-3xl font-bold">Gestion des Bâtiments et Chambres</h1>
        <p className="text-gray-600 mt-2">Gérez l&apos;infrastructure de la résidence</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="batiments">Bâtiments</TabsTrigger>
          <TabsTrigger value="chambres">Chambres</TabsTrigger>
        </TabsList>

        {/* Buildings Tab */}
        <TabsContent value="batiments" className="space-y-4">
          <div className="flex justify-end">
            <Dialog 
              open={isOpenModalBatiment} 
              onOpenChange={(open) => {
                setIsOpenModalBatiment(open); 
                if(!open) {
                  setEditingBatimentId(null);
                  setBatiment({});
                }
              }}>
              <DialogTrigger asChild>
                <Button onClick={openAddBatimentDialog}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un Bâtiment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingBatimentId ? 'Modifier' : 'Ajouter'} Bâtiment</DialogTitle>
                  <DialogDescription>
                    Remplissez le formulaire pour {editingBatimentId ? 'modifier' : 'ajouter'} un bâtiment
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitBatiment} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Nom du Bâtiment</label>
                    <Input name="NomBat" required placeholder="Bâtiment A" value={batiment.NomBat} onChange={handleInputBatimentChange} />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Type</label>
                    <Select 
                      name="TypeBat" 
                      value={batiment.TypeBat} 
                      onValueChange={(value) =>
                        setBatiment((prev) => ({
                          ...prev,
                          TypeBat: value,
                        }))
                      }
                      required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le type du batiment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mixte">Mixte</SelectItem>
                        <SelectItem value="Masculin">Masculin</SelectItem>
                        <SelectItem value="Feminin">Féminin</SelectItem>
                      </SelectContent>
                    </Select>  
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Nombre d&apos;Étages</label>
                    <Input name="NbEtage" type="number" required placeholder="5" value={batiment.NbEtage} onChange={handleInputBatimentChange} />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Input name="Description" placeholder="Description du bâtiment" value={batiment.Description} onChange={handleInputBatimentChange} />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    {editingBatimentId ? 'Mettre à jour' : 'Créer'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Liste des Bâtiments</CardTitle>
              <CardDescription>Total: {batiments?.length || 0} bâtiments</CardDescription>
            </CardHeader>
            <CardContent>
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
                        <TableCell colSpan={5} className="text-center py-4">Chargement...</TableCell>
                      </TableRow>
                    ) : !batiments || batiments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">Aucun bâtiment</TableCell>
                      </TableRow>
                    ) : (
                      batiments.map((batiment) => (
                        <TableRow key={batiment.IdBat}>
                          <TableCell className="font-medium">{batiment.NomBat}</TableCell>
                          <TableCell>{batiment.TypeBat}</TableCell>
                          <TableCell>{batiment.NbEtage}</TableCell>
                          <TableCell className="text-sm text-gray-600">{batiment.Description}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEditBatiment(batiment)}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteBatiment(batiment.IdBat)}
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
                if(!open) {
                  setEditingChambreId(null);
                  setChambre({});
                }
              }}>
              <DialogTrigger asChild>
                <Button onClick={() => openAddChambreDialog('chambre')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une Chambre
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingChambreId ? 'Modifier' : 'Ajouter'} Chambre</DialogTitle>
                  <DialogDescription>
                    Remplissez le formulaire pour {editingChambreId ? 'modifier' : 'ajouter'} une chambre
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitChambre} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Numéro de Chambre</label>
                    <Input name="NumCha" required placeholder="101" value={chambre.NumCha} onChange={handleInputChambreChange} />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Type</label>
                    <Select 
                      name="TypeCha" 
                      value={chambre.TypeCha} 
                      onValueChange={(value) =>
                        {
                          setChambre((prev) => ({
                            ...prev,
                            TypeCha: value,
                          }));
                        }
                      } 
                      required>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le type du chambre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Simple">Simple</SelectItem>
                        <SelectItem value="Double">Double</SelectItem>
                        <SelectItem value="Triple">Triple</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Capacité</label>
                    <Input name="Capacite" type="number" required placeholder="1" value={chambre.Capacite} onChange={handleInputChambreChange} />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Bâtiment</label>
                    <Select 
                      name="IdBat" 
                      value={chambre.IdBat ? String(chambre.IdBat) : ""} 
                      onValueChange={(value) =>
                        {
                          setChambre((prev) => ({
                            ...prev,
                            IdBat: Number(value),
                          }));
                          setSelectedBatiment(batiments.find((b) => b.IdBat === Number(value)));
                        }
                      } 
                      required>
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
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Étage</label>
                     <Select 
                      name="Etage" 
                      value={chambre.Etage ? String(chambre.Etage) : ""} 
                      onValueChange={(value) =>
                        {
                          setChambre((prev) => ({
                            ...prev,
                            Etage: Number(value),
                          }));
                        }
                      } 
                      required>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner l'étage" />
                        </SelectTrigger>
                      <SelectContent>
                        {
                          Array.from(
                            {length: selectedBatiment?.NbEtage || 1},
                            (_, index) => (
                              <SelectItem key={index + 1} value={String(index + 1)}>
                                {index + 1}
                              </SelectItem>
                            )
                          )
                        }
                      </SelectContent>
                    </Select>
                    
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Statut</label>
                    <Select 
                      name="StatutCha" 
                      value={chambre.StatutCha} 
                      onValueChange={(value) =>
                        setChambre((prev) => ({
                          ...prev,
                          StatutCha: value,
                        }))
                      } 
                      required>
                      <SelectTrigger>
                        <SelectValue placeholder="Veuillez choisir l'état actuel du chambre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Libre">Libre</SelectItem>
                        <SelectItem value="Occupée">Occupée</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    {editingChambreId ? 'Mettre à jour' : 'Créer'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Liste des Chambres</CardTitle>
              <CardDescription>Total: {chambres?.length || 0} chambres</CardDescription>
            </CardHeader>
            <CardContent>
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
                        <TableCell colSpan={7} className="text-center py-4">Chargement...</TableCell>
                      </TableRow>
                    ) : !chambres || chambres.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">Aucune chambre</TableCell>
                      </TableRow>
                    ) : (
                      chambres.map((chambre) => (
                        <TableRow key={chambre.IdCha}>
                          <TableCell className="font-medium">{chambre.NumCha}</TableCell>
                          <TableCell>{chambre.TypeCha}</TableCell>
                          <TableCell>{chambre.Capacite}</TableCell>
                          <TableCell>{chambre.Etage}</TableCell>
                          <TableCell>{chambre.NomBat || 'N/A'}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              chambre.StatutCha === 'Libre' ? 'bg-green-100 text-green-800' :
                              chambre.StatutCha === 'Occupée' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {chambre.StatutCha}
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
                                onClick={() => handleDeleteChambre(chambre.IdCha)}
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