"use client";

import type React from "react";

import { useState, useEffect } from "react";
import type { Translation, Language, Size } from "@/lib/types";

interface OrderFormProps {
  t: Translation;
  currentLanguage: Language;
}

export function OrderForm({ t, currentLanguage }: OrderFormProps) {
  const [selectedFormSize, setSelectedFormSize] = useState<Size>("big");
  const [deliveryType, setDeliveryType] = useState("pickup");
  const [deliveryZone, setDeliveryZone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showDeliveryZone, setShowDeliveryZone] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [totalCost, setTotalCost] = useState("");

  // Update cost calculation
  useEffect(() => {
    const qty = quantity || 1;
    const pricePerKg = selectedFormSize === "big" ? 30 : 35;
    const subtotal = qty * pricePerKg;

    let deliveryFee = 0;
    if (deliveryType === "delivery" && deliveryZone) {
      deliveryFee = deliveryZone === "rabat" ? 15 : 25;
    }

    const total = subtotal + deliveryFee;
    setTotalCost(`${total.toFixed(2)} ${t.currency}`);
  }, [quantity, selectedFormSize, deliveryType, deliveryZone, t.currency]);

  // Handle delivery type change
  useEffect(() => {
    if (deliveryType === "delivery") {
      setShowDeliveryZone(true);
    } else {
      setShowDeliveryZone(false);
      setShowAddress(false);
      setDeliveryZone("");
    }
  }, [deliveryType]);

  // Handle delivery zone change
  useEffect(() => {
    if (deliveryZone) {
      setShowAddress(true);
    } else {
      setShowAddress(false);
    }
  }, [deliveryZone]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t.orderSuccess);
  };

  return (
    <main id="order-form" className="py-8 bg-muted/30">
      <div className="max-w-full px-4 md:max-w-md md:mx-auto">
        <div className="text-center mb-6">
          <h3
            className={`text-2xl font-bold text-center mb-2 ${
              currentLanguage === "ar" ? "font-serif text-right" : ""
            }`}
          >
            {t.formTitle}
          </h3>
        </div>

        <div className="bg-card rounded-2xl shadow-lg border p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className={currentLanguage === "ar" ? "text-right" : ""}>
              <label
                htmlFor="name"
                className="block text-foreground font-semibold mb-2 text-sm"
              >
                {t.nameLabel} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className={`bg-input border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 w-full px-4 py-3 rounded-lg transition-all outline-none ${
                  currentLanguage === "ar" ? "text-right" : ""
                }`}
                placeholder={t.namePlaceholder}
              />
            </div>

            {/* Phone */}
            <div className={currentLanguage === "ar" ? "text-right" : ""}>
              <label
                htmlFor="phone"
                className="block text-foreground font-semibold mb-2 text-sm"
              >
                {t.phoneLabel} *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className={`bg-input border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 w-full px-4 py-3 rounded-lg transition-all outline-none ${
                  currentLanguage === "ar" ? "text-right" : ""
                }`}
                placeholder="+212 6XX XXX XXX"
              />
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-foreground font-semibold mb-2 text-sm">
                {t.sizeLabel}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all text-center ${
                    selectedFormSize === "big"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary"
                  }`}
                  onClick={() => setSelectedFormSize("big")}
                >
                  <div
                    className={`text-sm font-semibold ${
                      currentLanguage === "ar" ? "font-serif" : ""
                    }`}
                  >
                    {t.sizeBig}
                  </div>
                  <div className="text-sm font-bold text-primary mt-1">
                    {t.priceBig}
                  </div>
                </div>
                <div
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all text-center ${
                    selectedFormSize === "small"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary"
                  }`}
                  onClick={() => setSelectedFormSize("small")}
                >
                  <div
                    className={`text-sm font-semibold ${
                      currentLanguage === "ar" ? "font-serif" : ""
                    }`}
                  >
                    {t.sizeSmall}
                  </div>
                  <div className="text-sm font-bold text-primary mt-1">
                    {t.priceSmall}
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label
                htmlFor="quantity"
                className="block text-foreground font-semibold mb-2 text-sm"
              >
                {t.quantityLabel}
              </label>
              <select
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                className={`bg-input border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 w-full px-4 py-3 rounded-lg transition-all outline-none ${
                  currentLanguage === "ar" ? "text-right" : ""
                }`}
              >
                {[1, 2, 3, 5, 10].map((qty, index) => (
                  <option key={qty} value={qty}>
                    {t.quantityOptions[index]}
                  </option>
                ))}
              </select>
            </div>

            {/* Delivery Date */}
            <div>
              <label
                htmlFor="deliveryDate"
                className="block text-foreground font-semibold mb-2 text-sm"
              >
                {t.dateLabel}
              </label>
              <input
                type="date"
                id="deliveryDate"
                name="deliveryDate"
                className={`bg-input border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 w-full px-4 py-3 rounded-lg transition-all outline-none ${
                  currentLanguage === "ar" ? "text-right" : ""
                }`}
              />
            </div>

            {/* Delivery Time */}
            <div>
              <label
                htmlFor="deliveryTime"
                className="block text-foreground font-semibold mb-2 text-sm"
              >
                {t.timeLabel}
              </label>
              <input
                type="time"
                id="deliveryTime"
                name="deliveryTime"
                className={`bg-input border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 w-full px-4 py-3 rounded-lg transition-all outline-none ${
                  currentLanguage === "ar" ? "text-right" : ""
                }`}
              />
            </div>

            {/* Delivery Type */}
            <div>
              <label
                htmlFor="deliveryType"
                className="block text-foreground font-semibold mb-2 text-sm"
              >
                {t.deliveryLabel}
              </label>
              <select
                id="deliveryType"
                name="deliveryType"
                value={deliveryType}
                onChange={(e) => setDeliveryType(e.target.value)}
                className={`bg-input border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 w-full px-4 py-3 rounded-lg transition-all outline-none ${
                  currentLanguage === "ar" ? "text-right" : ""
                }`}
              >
                <option value="pickup">{t.pickupOption}</option>
                <option value="delivery">{t.deliveryOption}</option>
              </select>
            </div>

            {/* Delivery Zone */}
            {showDeliveryZone && (
              <div>
                <label
                  htmlFor="deliveryZone"
                  className="block text-foreground font-semibold mb-2 text-sm"
                >
                  {t.zoneLabel}
                </label>
                <select
                  id="deliveryZone"
                  name="deliveryZone"
                  value={deliveryZone}
                  onChange={(e) => setDeliveryZone(e.target.value)}
                  className={`bg-input border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 w-full px-4 py-3 rounded-lg transition-all outline-none ${
                    currentLanguage === "ar" ? "text-right" : ""
                  }`}
                >
                  <option value="">{t.zoneSelect}</option>
                  <option value="rabat">{t.rabatZone}</option>
                  <option value="outside">{t.outsideZone}</option>
                </select>
              </div>
            )}

            {/* Address */}
            {showAddress && (
              <div className={currentLanguage === "ar" ? "text-right" : ""}>
                <label
                  htmlFor="address"
                  className="block text-foreground font-semibold mb-2 text-sm"
                >
                  {t.addressLabel}
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  className={`bg-input border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 w-full px-4 py-3 rounded-lg resize-none transition-all outline-none ${
                    currentLanguage === "ar" ? "text-right" : ""
                  }`}
                  placeholder={t.addressPlaceholder}
                />
              </div>
            )}

            {/* Total Cost */}
            {(deliveryType === "delivery" || deliveryType === "pickup") && (
              <div>
                <label
                  htmlFor="cost"
                  className="block text-foreground font-semibold mb-2 text-sm"
                >
                  {t.totalLabel}
                </label>
                <input
                  type="text"
                  id="cost"
                  value={totalCost}
                  readOnly
                  className={`bg-primary/10 border-2 border-primary w-full px-4 py-3 rounded-lg font-bold text-primary ${
                    currentLanguage === "ar" ? "text-right" : ""
                  }`}
                />
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full py-4 rounded-xl text-lg font-semibold transition-all hover:shadow-lg"
            >
              {t.submitButton}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
