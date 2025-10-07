"use server";

import { db } from "@/db";
import { client, delivery, order, SelectCLient } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PlaceOrderDTO, placeOrderSchema } from "@/lib/actions/utils";

// --------------------
const PRICE_PER_KG_BIG = 30.0;
const PRICE_PER_KG_SMALL = 35.0;
const DELIVERY_FEE_RABAT = 20.0;
const DELIVERY_FEE_OUTSIDE = 25.0;

// --------------------

// --------------------
// Server Action
// --------------------
export const placeOrder = async (data: PlaceOrderDTO) => {
  // Validate DTO
  const validatedData = placeOrderSchema.parse(data);

  // Find or create client
  const clientInDB = await db.query.client.findFirst({
    where: eq(client.phoneNumber, validatedData.phoneNumber),
  });

  const cl: SelectCLient =
    clientInDB ??
    (
      await db
        .insert(client)
        .values({
          name: validatedData.name,
          address: validatedData.address || null,
          phoneNumber: validatedData.phoneNumber,
        })
        .returning()
    )[0];

  // Create order

  const pricePerKg = validatedData.isBig
    ? PRICE_PER_KG_BIG
    : PRICE_PER_KG_SMALL;
  const subtotal = validatedData.quantity * pricePerKg;

  let deliveryFees = 0;
  if (validatedData.isDelivery && validatedData.zone) {
    deliveryFees =
      validatedData.zone === "rabat"
        ? DELIVERY_FEE_RABAT
        : DELIVERY_FEE_OUTSIDE;
  }
  console.log(subtotal);

  const [newOrder] = await db
    .insert(order)
    .values({
      clientId: cl.id,
      quantity: validatedData.quantity,
      isBig: validatedData.isBig,
      status: "pending",
      totalCost: subtotal,
    })
    .returning();
  if (validatedData.isDelivery && validatedData.zone) {
    // For delivery orders
    await db.insert(delivery).values({
      zone: validatedData.zone,
      orderId: newOrder.id,
      fees: deliveryFees,
      timeSlot: validatedData.timeSlot,
    });
  } else {
    // For pickup orders
    await db.insert(delivery).values({
      orderId: newOrder.id,
      fees: 0,
      timeSlot: validatedData.timeSlot,
    });
  }

  const clientMessage = `

═══════════════════════════════════════════════════════
                 MERCI POUR VOTRE COMMANDE !
═══════════════════════════════════════════════════════

📋 RÉCAPITULATIF DE VOTRE COMMANDE
═══════════════════════════════════════════════════════

👤 Nom                 : ${validatedData.name}
📞 Téléphone           : ${validatedData.phoneNumber}
🏠 Adresse             : ${validatedData.address ?? "N/A"}
📦 Quantité            : ${validatedData.quantity} Kg
📏 Taille              : ${validatedData.isBig ? "Grande" : "Petite"}
🚚 Livraison           : ${validatedData.isDelivery ? "Oui" : "Non"}
📍 Zone                : ${validatedData.zone ?? "N/A"}
📅 Date estimée        : ${validatedData.timeSlot}

═══════════════════════════════════════════════════════
💰 Montant des articles : ${subtotal.toFixed(2)} MAD
🚚 Frais de livraison   : ${
    validatedData.isDelivery ? validatedData.fees.toFixed(2) : "0.00"
  } MAD

═══════════════════════════════════════════════════════
💵 TOTAL : ${(
    Number(validatedData.totalCost) +
    (validatedData.isDelivery ? Number(validatedData.fees) : 0)
  ).toFixed(2)} MAD
═══════════════════════════════════════════════════════

✨ Merci de votre confiance !
⚡ Votre commande sera traitée dans les plus brefs délais.

═══════════════════════════════════════════════════════
                 Équipe Dar Lwrka
═══════════════════════════════════════════════════════

`;

  await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_key: process.env.WEB3FORM_API_KEY,
      from_name: "Dar Lwrka",
      subject: "Dar Lwrka - Nouvelle commande",
      message: clientMessage,
      format: "text",
    }),
  });

  console.log(validatedData.fees);
  console.log(validatedData.totalCost);

  return { msg: "Order created successfully", type: "success" };
};
