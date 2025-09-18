import Image from "next/image";
import type { Translation, Language } from "@/lib/types";
import Decoration from "@/public/assets/decoration.png";
import logo from "@/public/assets/logo_light.svg";

interface HeaderProps {
  t: Translation;
  currentLanguage: Language;
}

export function Header({ t, currentLanguage }: HeaderProps) {
  return (
    <header className="relative border-b border-border h-24">
      {/* Background Image with gradient */}
      <div className="absolute inset-0">
        <Image
          src={Decoration}
          alt="Decoration"
          fill
          className="object-cover object-left opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-background/0"></div>
      </div>

      {/* Header content */}
      <div className="relative max-w-full px-4 py-4 md:max-w-md md:mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="rounded-full flex items-center justify-center">
              <Image
                src={logo}
                alt="Logo"
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <div>
              <h1
                className={`text-xl font-bold text-foreground ${
                  currentLanguage === "ar" ? "font-serif text-right" : ""
                }`}
              >
                {t.storeName}
              </h1>
              <p className="text-xs text-muted-foreground">{t.storeSubtitle}</p>
            </div>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors text-2xl">
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
