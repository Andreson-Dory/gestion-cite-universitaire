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

export default function BatimentAndChambrePageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Gestion des Bâtiments et Chambres
          </h1>
          <p className="text-gray-600 mt-2">
            Gérez l&apos;infrastructure de la résidence
          </p>
        </div>
      </div>

      <Tabs value="batiments" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="batiments" className="cursor-pointer">
            Bâtiments
          </TabsTrigger>
          <TabsTrigger value="chambres" className="cursor-pointer">
            Chambres
          </TabsTrigger>
        </TabsList>

        <TabsContent value="batiments" className="space-y-4">
          <div className="flex justify-end">
            <Button className="cursor-pointer">
              <Plus className="w-4 h-4 mr-2 cursor-pointer" />
              Ajouter un Bâtiment
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Liste des Bâtiments</CardTitle>
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
