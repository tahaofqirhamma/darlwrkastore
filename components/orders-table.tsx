"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Edit, Trash2 } from "lucide-react";
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

const orders = [
  {
    id: "CMD-001",
    clientName: "Ahmed Benali",
    phone: "+212 6 12 34 56 78",
    address: "123 Rue Mohammed V, Rabat",
    zone: "Rabat",
    quantity: 2,
    size: "petit",
    deliveryDate: "2024-01-15",
    deliveryTime: "14:00",
    price: 450,
    status: "livré",
  },
  {
    id: "CMD-002",
    clientName: "Fatima Zahra",
    phone: "+212 6 87 65 43 21",
    address: "456 Avenue Hassan II, Casablanca",
    zone: "Hors Rabat",
    quantity: 1,
    size: "grand",
    deliveryDate: "2024-01-16",
    deliveryTime: "10:30",
    price: 320,
    status: "en attente",
  },
  {
    id: "CMD-003",
    clientName: "Omar Alami",
    phone: "+212 6 55 44 33 22",
    address: "789 Boulevard Zerktouni, Rabat",
    zone: "Rabat",
    quantity: 3,
    size: "petit",
    deliveryDate: "2024-01-14",
    deliveryTime: "16:45",
    price: 680,
    status: "annulé",
  },
  {
    id: "CMD-004",
    clientName: "Aicha Mansouri",
    phone: "+212 6 99 88 77 66",
    address: "321 Rue Allal Ben Abdellah, Salé",
    zone: "Hors Rabat",
    quantity: 1,
    size: "grand",
    deliveryDate: "2024-01-17",
    deliveryTime: "11:15",
    price: 380,
    status: "en attente",
  },
  {
    id: "CMD-005",
    clientName: "Youssef Idrissi",
    phone: "+212 6 11 22 33 44",
    address: "654 Avenue Moulay Youssef, Rabat",
    zone: "Rabat",
    quantity: 2,
    size: "petit",
    deliveryDate: "2024-01-13",
    deliveryTime: "13:20",
    price: 520,
    status: "livré",
  },
];

const statusColors = {
  livré: "bg-accent text-accent-foreground",
  "en attente": "bg-muted text-muted-foreground",
  annulé: "bg-destructive text-destructive-foreground",
};

export function OrdersTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("tous");
  const [zoneFilter, setZoneFilter] = useState("toutes");
  const [ordersData, setOrdersData] = useState(orders);

  const handleViewOrder = (orderId: string) => {
    console.log("[v0] Viewing order:", orderId);
    // Here you would typically open a modal or navigate to order details
    alert(`Voir la commande ${orderId}`);
  };

  const handleEditOrder = (orderId: string) => {
    console.log("[v0] Editing order:", orderId);
    // Here you would typically open an edit modal
    alert(`Modifier la commande ${orderId}`);
  };

  const handleDeleteOrder = (orderId: string) => {
    console.log("[v0] Deleting order:", orderId);
    if (confirm(`Êtes-vous sûr de vouloir supprimer la commande ${orderId}?`)) {
      setOrdersData((prev) => prev.filter((order) => order.id !== orderId));
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    console.log("[v0] Changing status for order:", orderId, "to:", newStatus);
    setOrdersData((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "tous" || order.status === statusFilter;
    const matchesZone = zoneFilter === "toutes" || order.zone === zoneFilter;

    return matchesSearch && matchesStatus && matchesZone;
  });

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">
          Gestion des Commandes
        </CardTitle>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher commandes ou noms clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-input border-border text-foreground"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-input border-border">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tous">Tous les Statuts</SelectItem>
              <SelectItem value="en attente">En Attente</SelectItem>
              <SelectItem value="livré">Livré</SelectItem>
              <SelectItem value="annulé">Annulé</SelectItem>
            </SelectContent>
          </Select>
          <Select value={zoneFilter} onValueChange={setZoneFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-input border-border">
              <SelectValue placeholder="Filtrer par zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="toutes">Toutes les Zones</SelectItem>
              <SelectItem value="Rabat">Rabat</SelectItem>
              <SelectItem value="Hors Rabat">Hors Rabat</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-card-foreground">
                  ID Commande
                </TableHead>
                <TableHead className="text-card-foreground">Client</TableHead>
                <TableHead className="text-card-foreground">
                  Téléphone
                </TableHead>
                <TableHead className="text-card-foreground">Adresse</TableHead>
                <TableHead className="text-card-foreground">Zone</TableHead>
                <TableHead className="text-card-foreground">Qté</TableHead>
                <TableHead className="text-card-foreground">Taille</TableHead>
                <TableHead className="text-card-foreground">
                  Livraison
                </TableHead>
                <TableHead className="text-card-foreground">Prix</TableHead>
                <TableHead className="text-card-foreground">Statut</TableHead>
                <TableHead className="text-card-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium text-card-foreground">
                    {order.id}
                  </TableCell>
                  <TableCell className="text-card-foreground">
                    {order.clientName}
                  </TableCell>
                  <TableCell className="text-card-foreground">
                    {order.phone}
                  </TableCell>
                  <TableCell
                    className="text-card-foreground max-w-[200px] truncate"
                    title={order.address}
                  >
                    {order.address}
                  </TableCell>
                  <TableCell className="text-card-foreground">
                    <Badge
                      variant={order.zone === "Rabat" ? "default" : "secondary"}
                    >
                      {order.zone}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-card-foreground">
                    {order.quantity}
                  </TableCell>
                  <TableCell className="text-card-foreground">
                    {order.size}
                  </TableCell>
                  <TableCell className="text-card-foreground">
                    <div className="text-sm">
                      <div>{order.deliveryDate}</div>
                      <div className="text-muted-foreground">
                        {order.deliveryTime}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-card-foreground font-medium">
                    {order.price} MAD
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(newStatus) =>
                        handleStatusChange(order.id, newStatus)
                      }
                    >
                      <SelectTrigger className="w-auto h-auto p-0 border-none bg-transparent">
                        <Badge
                          className={
                            statusColors[
                              order.status as keyof typeof statusColors
                            ]
                          }
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en attente">En Attente</SelectItem>
                        <SelectItem value="livré">Livré</SelectItem>
                        <SelectItem value="annulé">Annulé</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleViewOrder(order.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleEditOrder(order.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {filteredOrders.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Aucune commande trouvée correspondant à vos critères.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
