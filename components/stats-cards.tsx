"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Package,
  XCircle,
  CheckCircle,
  MapPin,
  Clock,
} from "lucide-react";
import { getDashboardStats } from "@/actions/admin";
import { useStats } from "@/contexts/StatsContext";

type StatsData = {
  totalRevenue: string;
  totalOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  pendingOrders: number;
  rabatOrders: number;
  revenueChange: string;
  ordersChange: string;
};

export function StatsCards() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { statsVersion } = useStats();

  useEffect(() => {
    loadStats();
  }, [statsVersion]); // Reload when statsVersion changes

  const loadStats = async () => {
    setLoading(true);
    const result = await getDashboardStats();
    if (result.success && result.data) {
      setStats(result.data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-card border-border">
            <CardContent className="py-8">
              <div className="text-center text-muted-foreground">
                Chargement...
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const statsConfig = [
    {
      title: "Revenus Totaux",
      value: `${stats.totalRevenue} MAD`,
      change: `${stats.revenueChange}%`,
      icon: DollarSign,
      color: "text-accent",
    },
    {
      title: "Commandes Totales",
      value: stats.totalOrders.toString(),
      change: `${stats.ordersChange}%`,
      icon: Package,
      color: "text-primary",
    },
    {
      title: "Commandes Livrées",
      value: stats.deliveredOrders.toString(),
      change: "+15.3%",
      icon: CheckCircle,
      color: "text-accent",
    },
    {
      title: "Commandes Annulées",
      value: stats.cancelledOrders.toString(),
      change: "-2.1%",
      icon: XCircle,
      color: "text-destructive",
    },
    {
      title: "Commandes Rabat",
      value: stats.rabatOrders.toString(),
      change: "+5.7%",
      icon: MapPin,
      color: "text-primary",
    },
    {
      title: "Commandes en Attente",
      value: stats.pendingOrders.toString(),
      change: "+3.4%",
      icon: Clock,
      color: "text-muted-foreground",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statsConfig.map((stat) => {
        const Icon = stat.icon;
        const changeValue = parseFloat(stat.change);
        const isPositive = changeValue >= 0;

        return (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">
                {stat.value}
              </div>
              <p
                className={`text-xs ${
                  isPositive ? "text-accent" : "text-destructive"
                }`}
              >
                {isPositive ? "+" : ""}
                {stat.change} par rapport au mois dernier
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
