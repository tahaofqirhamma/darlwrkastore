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
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

export const order = pgTable(
  'order',
  {
    id: integer().primaryKey(),
    createdAt: date('created_at').defaultNow(),
    updatedAt: date('updated_at'),
    status: text().default('pending').notNull(),
    isBig: boolean('is_big').default(false).notNull(),
    quantity: doublePrecision().notNull(),
    totalCost: doublePrecision('total_cost'),
    clientId: integer('client_id').notNull(),
    deliveryId: integer('delivery_id'),
  },
  (table) => [
    foreignKey({
      columns: [table.clientId],
      foreignColumns: [client.id],
      name: 'order_client_id_fkey',
    }),
  ]
);

export const client = pgTable('client', {
  id: integer().primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  name: text().notNull(),
  phoneNumber: text('phone_number').notNull(),
  address: text().notNull(),
});

export const delivery = pgTable(
  'delivery',
  {
    id: integer().primaryKey(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    deliveryDate: date('delivery_date'),
    deliveryFees: real('delivery_fees').default(sql`'0'`),
    orderId: integer('order_id'),
  },
  (table) => [
    foreignKey({
      columns: [table.orderId],
      foreignColumns: [order.id],
      name: 'delivery_order_id_fkey',
    }),
  ]
);

const ordersRelations = relations(order, ({ one }) => ({
  delivery: one(delivery),
  client: one(client, {
    fields: [order.clientId],
    references: [client.id],
  }),
}));

const clientRelation = relations(client, ({ many }) => ({
  orders: many(order),
}));
