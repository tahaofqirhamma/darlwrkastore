"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
import { fetchOrders, updateOrderStatus, deleteOrder } from "@/actions/admin";
import { useStats } from "@/contexts/StatsContext";

type OrderData = {
  id: number;
  status: string;
  isBig: boolean;
  quantity: number;
  totalCost: number | null;
  createdAt: string | null;
  client: {
    id: number;
    name: string;
    phoneNumber: string;
    address: string | null;
  };
  delivery: {
    id: number;
    zone: string | null;
    fees: number | null;
    timeSlot: string | null;
    date: string | null;
  } | null;
};

const statusColors = {
  pending: "bg-muted text-muted-foreground",
  delivered: "bg-accent text-accent-foreground",
  cancelled: "bg-destructive text-destructive-foreground",
};

const statusLabels = {
  pending: "En Attente",
  delivered: "Livré",
  cancelled: "Annulé",
};

export function OrdersTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("tous");
  const [zoneFilter, setZoneFilter] = useState("toutes");
  const [ordersData, setOrdersData] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const { refreshStats } = useStats();

  // Fetch orders when page changes
  useEffect(() => {
    loadOrders(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const loadOrders = async (page: number, size: number) => {
    setLoading(true);
    const result = await fetchOrders(page, size);
    if (result.success && result.data) {
      setOrdersData(result.data);
      if (result.pagination) {
        setTotalPages(result.pagination.totalPages);
        setTotalCount(result.pagination.totalCount);
      }
    }
    setLoading(false);
  };

  const handleViewOrder = (orderId: number) => {
    const order = ordersData.find((o) => o.id === orderId);
    if (order) {
      alert(JSON.stringify(order, null, 2));
    }
  };

  const handleEditOrder = (orderId: number) => {
    alert(`Modifier la commande ${orderId}`);
  };

  const handleDeleteOrder = async (orderId: number) => {
    if (
      confirm(`Êtes-vous sûr de vouloir supprimer la commande #${orderId}?`)
    ) {
      const result = await deleteOrder(orderId);
      if (result.success) {
        // Reload current page and refresh stats
        loadOrders(currentPage, pageSize);
        refreshStats(); // Refresh stats immediately
        alert("Commande supprimée avec succès");
      } else {
        alert("Erreur lors de la suppression");
      }
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    const result = await updateOrderStatus(orderId, newStatus);
    if (result.success) {
      // Update local state
      setOrdersData((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      // Refresh stats immediately
      refreshStats();
    } else {
      alert("Erreur lors de la mise à jour du statut");
    }
  };

  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm);
    const matchesStatus =
      statusFilter === "tous" || order.status === statusFilter;
    const matchesZone =
      zoneFilter === "toutes" ||
      (order.delivery?.zone && order.delivery.zone === zoneFilter);

    return matchesSearch && matchesStatus && matchesZone;
  });

  console.log(ordersData.map((order) => order.delivery?.timeSlot));

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (newSize: string) => {
    setPageSize(Number(newSize));
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="py-8">
          <div className="text-center text-muted-foreground">
            Chargement des commandes...
          </div>
        </CardContent>
      </Card>
    );
  }
  console.log(filteredOrders.map((order) => order.delivery?.date));
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">
          Gestion des Commandes ({totalCount} total)
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
              <SelectItem value="pending">En Attente</SelectItem>
              <SelectItem value="delivered">Livré</SelectItem>
              <SelectItem value="cancelled">Annulé</SelectItem>
            </SelectContent>
          </Select>
          <Select value={zoneFilter} onValueChange={setZoneFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-input border-border">
              <SelectValue placeholder="Filtrer par zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="toutes">Toutes les Zones</SelectItem>
              <SelectItem value="rabat">Rabat</SelectItem>
              <SelectItem value="outside">Hors Rabat</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-card-foreground">ID</TableHead>
                <TableHead className="text-card-foreground">Client</TableHead>
                <TableHead className="text-card-foreground">
                  Téléphone
                </TableHead>
                <TableHead className="text-card-foreground">Adresse</TableHead>
                <TableHead className="text-card-foreground">Zone</TableHead>
                <TableHead className="text-card-foreground">Qté</TableHead>
                <TableHead className="text-card-foreground">Taille</TableHead>
                <TableHead className="text-card-foreground">Date</TableHead>
                <TableHead className="text-card-foreground">Horaire</TableHead>
                <TableHead className="text-card-foreground">Prix</TableHead>
                <TableHead className="text-card-foreground">Statut</TableHead>
                <TableHead className="text-card-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium text-card-foreground">
                    #{order.id}
                  </TableCell>
                  <TableCell className="text-card-foreground">
                    {order.client.name}
                  </TableCell>
                  <TableCell className="text-card-foreground">
                    {order.client.phoneNumber}
                  </TableCell>
                  <TableCell
                    className="text-card-foreground max-w-[200px] truncate"
                    title={order.client.address || "N/A"}
                  >
                    {order.client.address || "N/A"}
                  </TableCell>
                  <TableCell className="text-card-foreground">
                    {order.delivery?.zone ? (
                      <Badge
                        variant={
                          order.delivery.zone === "rabat"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {order.delivery.zone === "rabat"
                          ? "Rabat"
                          : "Hors Rabat"}
                      </Badge>
                    ) : (
                      <Badge variant="outline">Récupération</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-card-foreground">
                    {order.quantity} Kg
                  </TableCell>
                  <TableCell className="text-card-foreground">
                    {order.isBig ? "Grand" : "Petit"}
                  </TableCell>
                  <TableCell className="text-card-foreground text-sm">
                    {order.delivery?.date}
                  </TableCell>
                  <TableCell className="text-card-foreground text-sm">
                    {order.delivery?.timeSlot ? order.delivery.timeSlot : "N/A"}
                  </TableCell>
                  <TableCell className="text-card-foreground font-medium">
                    {order.totalCost
                      ? `${(
                          order.totalCost + (order.delivery?.fees || 0)
                        ).toFixed(2)} MAD`
                      : "N/A"}
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
                          {
                            statusLabels[
                              order.status as keyof typeof statusLabels
                            ]
                          }
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">En Attente</SelectItem>
                        <SelectItem value="delivered">Livré</SelectItem>
                        <SelectItem value="cancelled">Annulé</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {/* <Button
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
                      </Button> */}
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

        {/* Pagination Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Afficher par page:
            </span>
            <Select
              value={pageSize.toString()}
              onValueChange={handlePageSizeChange}
            >
              <SelectTrigger className="w-[100px] bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} sur {totalPages}
            </span>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
