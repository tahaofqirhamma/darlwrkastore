import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { placeOrder } from "@/actions";
import { Language, Translation } from "@/lib/types";
import { PlaceOrderDTO } from "@/lib/actions/utils";

interface OrderFormProps {
  t: Translation;
  currentLanguage: Language;
}

export function OrderForm({ t, currentLanguage }: OrderFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PlaceOrderDTO>({
    defaultValues: {
      name: "",
      phoneNumber: "",
      address: "",
      isBig: true,
      quantity: 1,
      isDelivery: false,
      zone: "",
      totalCost: 0.0,
      fees: 0.0,
      timeSlot: "",
      date: new Date(),
    },
  });

  const [totalCostDisplay, setTotalCostDisplay] = useState("");

  // watch form values
  const isBig = watch("isBig");
  const quantity = watch("quantity");
  const isDelivery = watch("isDelivery");
  const zone = watch("zone");

  // Calculate total cost dynamically
  useEffect(() => {
    const pricePerKg = isBig ? 30 : 35;
    const subtotal = quantity * pricePerKg;

    let deliveryFee = 0;
    if (isDelivery && zone) {
      deliveryFee = zone === "rabat" ? 20 : 25;
    }

    const total = subtotal + deliveryFee;

    // Update form values
    setValue("fees", deliveryFee);
    setValue("totalCost", total);
    // Update display
    setTotalCostDisplay(`${total.toFixed(2)} ${t.currency}`);
  }, [isBig, quantity, isDelivery, zone, t.currency, setValue]);

  // onSubmit handler
  const onSubmit = async (data: PlaceOrderDTO) => {
    try {
      const response = await placeOrder(data);
      alert(response.msg);
      reset();
    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    }
  };

  return (
    <main id="order-form" className="py-8 bg-muted/30">
      <div className="max-w-full px-4 md:max-w-md md:mx-auto">
        <div className="text-center mb-6">
          <h3
            className={`text-2xl font-bold text-center mb-2 ${
              currentLanguage === "ar" ? "font-serif text-center" : ""
            }`}
          >
            {t.formTitle}
          </h3>
        </div>

        <div className="bg-card rounded-2xl shadow-lg border p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className={currentLanguage === "ar" ? "text-right" : ""}>
              <label className="block text-foreground font-semibold mb-2 text-sm">
                {t.nameLabel} *
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className={`bg-input border-2 border-border w-full px-4 py-3 rounded-lg ${
                  currentLanguage === "ar" ? "text-right" : ""
                }`}
                placeholder={t.namePlaceholder}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{t.requiredField}</span>
              )}
            </div>

            {/* Phone */}
            <div className={currentLanguage === "ar" ? "text-right" : ""}>
              <label className="block text-foreground font-semibold mb-2 text-sm">
                {t.phoneLabel} *
              </label>
              <input
                type="tel"
                {...register("phoneNumber", { required: true })}
                className={`bg-input border-2 border-border w-full px-4 py-3 rounded-lg ${
                  currentLanguage === "ar" ? "text-right" : ""
                }`}
                placeholder="+212 6XX XXX XXX"
              />
              {errors.phoneNumber && (
                <span className="text-red-500 text-sm">{t.requiredField}</span>
              )}
            </div>

            {/* Size */}
            <div>
              <label className="block text-foreground font-semibold mb-2 text-sm">
                {t.sizeLabel}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className={`border-2 rounded-xl p-4 cursor-pointer text-center ${
                    isBig ? "border-primary bg-primary/10" : "border-border"
                  }`}
                  onClick={() => setValue("isBig", true)}
                >
                  <div className="text-sm font-semibold">{t.sizeBig}</div>
                  <div className="text-sm font-bold text-primary mt-1">
                    {t.priceBig}
                  </div>
                </div>
                <div
                  className={`border-2 rounded-xl p-4 cursor-pointer text-center ${
                    !isBig ? "border-primary bg-primary/10" : "border-border"
                  }`}
                  onClick={() => setValue("isBig", false)}
                >
                  <div className="text-sm font-semibold">{t.sizeSmall}</div>
                  <div className="text-sm font-bold text-primary mt-1">
                    {t.priceSmall}
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-foreground font-semibold mb-2 text-sm">
                {t.quantityLabel}
              </label>
              <select
                {...register("quantity", { valueAsNumber: true })}
                className="bg-input border-2 border-border w-full px-4 py-3 rounded-lg"
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
              <label className="block text-foreground font-semibold mb-2 text-sm">
                {t.dateLabel}
              </label>
              <input
                type="date"
                {...register("date", {
                  required: "Delivery date is required",
                  valueAsDate: true,
                })}
                className="bg-input border-2 border-border w-full px-4 py-3 rounded-lg"
              />
              {errors.date && (
                <span className="text-red-500 text-sm">
                  {errors.date.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-foreground font-semibold mb-2 text-sm">
                {t.dateLabel}
              </label>
              <select
                {...register("timeSlot", { required: true })}
                className="bg-input border-2 border-border w-full px-4 py-3 rounded-lg"
              >
                <option value={t.timeSlotMorning}>{t.timeSlotMorning}</option>
                <option value={t.timeSlotAfternoon}>
                  {t.timeSlotAfternoon}
                </option>
                <option value={t.timeSlotEvening}>{t.timeSlotEvening}</option>
              </select>
            </div>

            {/* Delivery Type */}
            <div>
              <label className="block text-foreground font-semibold mb-2 text-sm">
                {t.deliveryLabel}
              </label>
              <select
                {...register("isDelivery")}
                onChange={(e) =>
                  setValue("isDelivery", e.target.value === "true")
                }
                className="bg-input border-2 border-border w-full px-4 py-3 rounded-lg"
              >
                <option value="false">{t.pickupOption}</option>
                <option value="true">{t.deliveryOption}</option>
              </select>
            </div>

            {/* Delivery Zone */}
            {isDelivery && (
              <div>
                <label className="block text-foreground font-semibold mb-2 text-sm">
                  {t.zoneLabel}
                </label>
                <select
                  {...register("zone")}
                  className="bg-input border-2 border-border w-full px-4 py-3 rounded-lg"
                >
                  <option value="">{t.zoneSelect}</option>
                  <option value="rabat">{t.rabatZone}</option>
                  <option value="outside">{t.outsideZone}</option>
                </select>
              </div>
            )}

            {/* Address */}
            {isDelivery && zone && (
              <div>
                <label className="block text-foreground font-semibold mb-2 text-sm">
                  {t.addressLabel}
                </label>
                <textarea
                  {...register("address")}
                  rows={3}
                  className="bg-input border-2 border-border w-full px-4 py-3 rounded-lg resize-none"
                  placeholder={t.addressPlaceholder}
                />
              </div>
            )}

            {/* Total Cost */}
            <div>
              <label className="block text-foreground font-semibold mb-2 text-sm">
                {t.totalLabel}
              </label>
              <input
                type="text"
                value={totalCostDisplay}
                readOnly
                className="bg-primary/10 border-2 border-primary w-full px-4 py-3 rounded-lg font-bold text-primary"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full py-4 rounded-xl text-lg font-semibold"
            >
              {t.submitButton}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
