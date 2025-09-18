import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Package, XCircle, CheckCircle, MapPin, Clock } from "lucide-react"

const stats = [
  {
    title: "Revenus Totaux",
    value: "12,450 MAD",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-accent",
  },
  {
    title: "Commandes Totales",
    value: "1,234",
    change: "+8.2%",
    icon: Package,
    color: "text-primary",
  },
  {
    title: "Commandes Livrées",
    value: "1,089",
    change: "+15.3%",
    icon: CheckCircle,
    color: "text-accent",
  },
  {
    title: "Commandes Annulées",
    value: "45",
    change: "-2.1%",
    icon: XCircle,
    color: "text-destructive",
  },
  {
    title: "Commandes Rabat",
    value: "856",
    change: "+5.7%",
    icon: MapPin,
    color: "text-primary",
  },
  {
    title: "Commandes en Attente",
    value: "100",
    change: "+3.4%",
    icon: Clock,
    color: "text-muted-foreground",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <p className={`text-xs ${stat.change.startsWith("+") ? "text-accent" : "text-destructive"}`}>
                {stat.change} par rapport au mois dernier
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
