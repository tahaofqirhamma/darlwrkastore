import {
  pgTable,
  foreignKey,
  date,
  text,
  boolean,
  doublePrecision,
  integer,
  timestamp,
  real,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const order = pgTable(
  "order",
  {
    id: integer().generatedAlwaysAsIdentity().primaryKey(),
    createdAt: date("created_at").defaultNow(),
    updatedAt: date("updated_at"),
    status: text().default("pending").notNull(),
    isBig: boolean("is_big").default(false).notNull(),
    quantity: doublePrecision().notNull(),
    totalCost: doublePrecision("total_cost"),
    clientId: integer("client_id").notNull(),
    deliveryId: integer("delivery_id"),
    date: date("date"),
  },
  (table) => [
    foreignKey({
      columns: [table.clientId],
      foreignColumns: [client.id],
      name: "order_client_id_fkey",
    }),
  ]
);

export const client = pgTable("client", {
  id: integer().generatedAlwaysAsIdentity().primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  name: text().notNull(),
  phoneNumber: text("phone_number").notNull(),
  address: text(),
});

// In schema.ts
export const delivery = pgTable(
  "delivery",
  {
    id: integer().generatedAlwaysAsIdentity().primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    timeSlot: text("time_slot"), // Changed from "time_slote"
    fees: real("fees").default(sql`'0'`),
    zone: text("zone"),
    date: date("date"),
    orderId: integer("order_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.orderId],
      foreignColumns: [order.id],
      name: "delivery_order_id_fkey",
    }),
  ]
);

export const ordersRelations = relations(order, ({ one }) => ({
  delivery: one(delivery),
  client: one(client, {
    fields: [order.clientId],
    references: [client.id],
  }),
}));

export const clientRelation = relations(client, ({ many }) => ({
  orders: many(order),
}));

export const deliveryRelations = relations(delivery, ({ one }) => ({
  order: one(order, {
    fields: [delivery.orderId],
    references: [order.id],
  }),
}));

export type InsertClient = typeof client.$inferInsert;
export type InsertOrder = typeof order.$inferInsert;
export type InsertDelivery = typeof delivery.$inferInsert;
export type SelectCLient = typeof client.$inferSelect;
