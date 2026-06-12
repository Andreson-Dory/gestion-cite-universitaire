import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function ReclamationAndSanctionPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Gestion des Réclamations & Sanctions
          </h1>
          <p className="text-gray-600 mt-2">
            Gérez les plaintes et sanctions des étudiants
          </p>
        </div>
      </div>

      <Tabs value="reclamations" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reclamations" className="cursor-pointer">
            Réclamations
          </TabsTrigger>
          <TabsTrigger value="sanctions" className="cursor-pointer">
            Sanctions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reclamations" className="space-y-4">
          <div className="flex justify-end">
            <Button className="cursor-pointer">
              <Plus className="w-4 h-4 mr-2 cursor-pointer" />
              Ajouter une Réclamation
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Liste des Réclamations</CardTitle>
              <CardDescription>
                <Skeleton className="h-8 flex-1 bg-gray-300" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-2">
                <div className="relative flex-1">
                  <Skeleton className="h-8 flex-1 bg-gray-300" />
                </div>
                <Skeleton className="h-8 w-1/6 bg-gray-300" />
              </div>

              <div className="overflow-x-auto">
                <Skeleton className="min-h-96 h-115 w-full bg-gray-300" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
