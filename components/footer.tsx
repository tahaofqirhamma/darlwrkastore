import type { Translation, Language } from "@/lib/types";

interface FooterProps {
  t: Translation;
  currentLanguage: Language;
}

export function Footer({ t, currentLanguage }: FooterProps) {
  return (
    <footer className="bg-foreground text-background py-8">
      <div className="max-w-full px-4 md:max-w-md md:mx-auto">
        {/* Brand */}
        <div className="text-center mb-6">
          <h4
            className={`text-2xl font-bold mb-2 ${
              currentLanguage === "ar" ? "font-serif" : ""
            }`}
          >
            {t.storeName}
          </h4>
          <p className="text-background/70 text-sm mb-4">{t.storeSubtitle}</p>
          <p
            className={`text-background/70 text-center text-xs leading-relaxed ${
              currentLanguage === "ar" ? "text-center" : ""
            }`}
          >
            {t.footerDescription}
          </p>
        </div>

        {/* Contact */}
        <div className="text-center mb-6">
          <h5
            className={`font-semibold text-lg text-center mb-3 ${
              currentLanguage === "ar" ? "font-serif " : ""
            }`}
          >
            {t.contactTitle}
          </h5>
          <div className="space-y-2 text-sm text-background/70">
            <p>📍 {t.location}</p>
            <p>📞 {t.phone}</p>
            <p>✉️ {t.email}</p>
            <p>🕒 {t.hours}</p>
          </div>
        </div>

        {/* Social */}
        <div className="flex justify-center space-x-4 mb-6">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">f</span>
          </div>
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">i</span>
          </div>
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">@</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-background/20 pt-4 text-center">
          <p className="text-xs text-background/70">
            © 2025 {t.storeName} – {t.copyright}
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <a
              href="#"
              className="text-xs text-background/70 hover:text-primary transition-colors"
            >
              {t.terms}
            </a>
            <a
              href="#"
              className="text-xs text-background/70 hover:text-primary transition-colors"
            >
              {t.privacy}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
