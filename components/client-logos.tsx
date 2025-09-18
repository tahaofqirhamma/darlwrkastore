"use client";

import Image from "next/image";
import type { Language } from "@/lib/types";
import clt1 from "@/public/assets/artgastron_logo.jpg";
import clt2 from "@/public/assets/azreg_logo.jpg";
import clt3 from "@/public/assets/le-reivage_logo.jpg";
import clt4 from "@/public/assets/pats-souissi_logo.jpg";

interface ClientLogosProps {
  t: any;
  currentLanguage: Language;
}

export function ClientLogos({ t, currentLanguage }: ClientLogosProps) {
  const clientLogos = [
    { name: "Restaurant Al Fassia", logo: clt1 },
    { name: "Café Maure", logo: clt2 },
    { name: "Hotel La Mamounia", logo: clt3 },
    { name: "Riad Yasmine", logo: clt4 },
  ];

  return (
    <section className="py-10 bg-background border-t border-b">
      <div className="max-w-full px-4 md:max-w-2xl md:mx-auto">
        <h3
          className={`text-xl font-semibold text-center mb-8 text-muted-foreground ${
            currentLanguage === "ar" ? "font-serif text-center" : ""
          }`}
        >
          {t.trustedBy}
        </h3>

        {/* Infinite scroll container */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set */}
            {clientLogos.map((client, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-32 h-32 mx-6 flex items-center justify-center"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={128}
                  height={128}
                  className="object-contain  border rounded-full opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {clientLogos.map((client, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-32 h-32 mx-6 flex items-center border rounded-lg justify-center"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={128}
                  height={128}
                  className="object-contain opacity-70 border rounded-full hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 60s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
