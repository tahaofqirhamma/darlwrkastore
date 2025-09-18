import { Store, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function StoreHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <Store className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Mon Magasin</h2>
            <p className="text-sm text-muted-foreground">Tableau de Bord</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <User className="h-4 w-4" />
          Profil
        </Button>
      </div>
    </header>
  )
}
