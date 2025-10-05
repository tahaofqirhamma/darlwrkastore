import { z } from "zod";

export const placeOrderSchema = z.object({
  name: z.string().min(2),
  phoneNumber: z.string().min(5),
  address: z.string().optional(),
  isBig: z.boolean(),
  quantity: z.number().int().positive(),
  timeSlot: z.string(),
  isDelivery: z.coerce.boolean(),
  zone: z.string().optional(),
  totalCost: z.number(),
  fees: z.number(),
});

export type PlaceOrderDTO = z.infer<typeof placeOrderSchema>;
