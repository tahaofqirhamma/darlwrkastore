import { login, signup } from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Logo from "@/public/assets/logo_light.svg";
import Image from "next/image";
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-border shadow-lg">
        <CardHeader className=" flex flex-col items-center justify-center space-y-2 text-center">
          <Image src={Logo} alt="logo" width={100} height={100} />
          <CardTitle className="text-2xl font-bold text-foreground">
            Binevenu
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Connectez-vous pour accéder à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                placeholder="abc@gmail.com"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Mot de passe
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                placeholder="password123"
              />
            </div>

            <div className="space-y-3 pt-4">
              <Button
                formAction={login}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-lg transition-colors shadow-sm"
              >
                Se connecter
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
