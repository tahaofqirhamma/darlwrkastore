"use client";

import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { OrderForm } from "@/components/orderForm";
import { translations } from "@/lib/translations";
import type { Language, Size } from "@/lib/types";
import { ClientLogos } from "@/components/client-logos";

import img1 from "@/public/assets/img1.png";
import img2 from "@/public/assets/img2.png";
import img3 from "@/public/assets/img3.png";

export default function LandingPage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("ar");
  const [selectedSize, setSelectedSize] = useState<Size>("big");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const t = translations[currentLanguage];
  const images: StaticImageData[] = [img1, img2, img3];

  // Image carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const switchLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header t={t} currentLanguage={currentLanguage} />

      {/* Language Toggle */}
      <div className="fixed top-20 right-4 z-40 bg-card rounded-full shadow-lg overflow-hidden border">
        <button
          className={`px-3 py-2 text-xs font-semibold transition-all ${
            currentLanguage === "ar"
              ? "bg-primary text-primary-foreground"
              : "bg-transparent text-foreground"
          }`}
          onClick={() => switchLanguage("ar")}
        >
          عربي
        </button>
        <button
          className={`px-3 py-2 text-xs font-semibold transition-all ${
            currentLanguage === "fr"
              ? "bg-primary text-primary-foreground"
              : "bg-transparent text-foreground"
          }`}
          onClick={() => switchLanguage("fr")}
        >
          FR
        </button>
      </div>

      {/* Hero Section */}
      <section className="py-8 bg-gradient-to-br from-secondary to-white relative">
        <div className="max-w-full px-4 md:max-w-md md:mx-auto">
          {/* Product Image Carousel */}
          <div className="relative mb-6">
            <div className="relative h-64 rounded-2xl overflow-hidden">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    currentImageIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Bastilla sheets ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
              {t.newBadge}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 mb-6">
            <div className="text-center">
              <h2
                className={`text-3xl font-bold text-center mb-4 ${
                  currentLanguage === "ar" ? "font-serif text-center" : ""
                }`}
              >
                {t.productTitle}
              </h2>

              {/* Size Options */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all text-center ${
                    selectedSize === "big"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary"
                  }`}
                  onClick={() => setSelectedSize("big")}
                >
                  <div
                    className={`text-lg font-semibold ${
                      currentLanguage === "ar" ? "font-serif" : ""
                    }`}
                  >
                    {t.sizeBig}
                  </div>
                  <div className="text-xl font-bold text-primary mt-1">
                    {t.priceBig}
                  </div>
                </div>
                <div
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all text-center ${
                    selectedSize === "small"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary"
                  }`}
                  onClick={() => setSelectedSize("small")}
                >
                  <div
                    className={`text-lg font-semibold ${
                      currentLanguage === "ar" ? "font-serif" : ""
                    }`}
                  >
                    {t.sizeSmall}
                  </div>
                  <div className="text-xl font-bold text-primary mt-1">
                    {t.priceSmall}
                  </div>
                </div>
              </div>
            </div>

            <p
              className={`text-muted-foreground text-center text-sm leading-relaxed ${
                currentLanguage === "ar" ? "text-center" : ""
              }`}
            >
              {t.description}
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary text-lg">🥗</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t.features.premium}
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary text-lg">🚚</span>
              </div>
              <p className="text-xs text-muted-foreground">{t.features.fast}</p>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href="#order-form"
            className="bg-primary hover:bg-primary/90 text-primary-foreground w-full py-4 rounded-xl text-lg font-semibold text-center block transition-all hover:shadow-lg"
          >
            {t.orderNow}
          </a>
        </div>
      </section>
      <ClientLogos t={t} currentLanguage={currentLanguage} />

      <OrderForm t={t} currentLanguage={currentLanguage} />
      <Footer t={t} currentLanguage={currentLanguage} />
    </div>
  );
}
