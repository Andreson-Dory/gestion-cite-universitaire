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

export default function PaiementPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Paiements</h1>
          <p className="text-gray-600 mt-2">
            Gérez les Paiement de location de la résidence
          </p>
        </div>
        <Button className="cursor-pointer">
          <Plus className="w-4 h-4 mr-2" />
          Effectuer un Paiement
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Paiements</CardTitle>
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
            <Skeleton className="h-8 w-1/6 bg-gray-300" />
            <Skeleton className="h-8 w-1/6 bg-gray-300" />
          </div>

          <div className="overflow-x-auto">
            <Skeleton className="min-h-96 h-137.5 w-full bg-gray-300" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
