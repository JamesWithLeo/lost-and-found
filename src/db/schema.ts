import {
  pgEnum,
  pgTable,
  text,
  uuid,
  timestamp,
  varchar,
  date,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const role = pgEnum("role", ["user", "admin"]);
export const gender = pgEnum("gender", ["male", "female"]);
export const itemStatusEnum = pgEnum("status", [
  "pending",
  "expired",
  "returned",
]);
export const itemTypeEnum = pgEnum("type", [
  "lost",
  "stolen",
  "missing",
  "found",
]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: varchar({ length: 256 }),
  lastName: varchar({ length: 256 }),
  role: role("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  birthDate: date("birth_date"),
  gender: gender(),

  email: text().unique(),
  googleId: text("google_id").unique(),
  facebookId: text("facebook_id").unique(),
  githubId: text("github_id").unique(),
});

export const items = pgTable("items", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  itemName: text("item_name").notNull(),
  itemStatus: itemStatusEnum("item_status").notNull().default("pending"),
  color: text("color"),
  brandModel: text("brand_model"),
  location: text("location").notNull(),
  timeDate: timestamp("time_date", { mode: "date" }).notNull(),
  category: text("category").notNull(),
  caption: text("caption").notNull(),
  desc: text("desc"),
  createdAt: text("created_at").default(new Date().toISOString()),
  type: itemTypeEnum().notNull().default("lost"),
  itemProof: text("item_proof").array().default([]),
});

export const category = pgTable("category", {
  id: integer("id").primaryKey(),
  name: varchar("256").unique().notNull(),
});

export const ApprovalStatus = pgEnum("approvalStatus", [
  "approved",
  "pending",
  "decline",
]);

export const claims = pgTable(
  "claims",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    itemId: uuid("item_id")
      .notNull()
      .references(() => items.id, { onDelete: "cascade" }),
    approvedAt: timestamp("approved_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    declineAt: timestamp("decline_at", { withTimezone: true }),
    caption: varchar({ length: 255 }),
    distinctFeature: text(),
    proof: text("proof").array().default([]),
    desc: text("desc"),
    approvalStatus: ApprovalStatus().default("pending"),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.itemId] }),
    };
  },
);

export const userRelations = relations(users, ({ many }) => ({
  items: many(items),
}));

export const itemsRelations = relations(items, ({ one, many }) => ({
  users: one(users, {
    fields: [items.userId],
    references: [users.id],
  }),
  claims: many(claims),
}));

export const claimsRelations = relations(claims, ({ one }) => ({
  items: one(items),
}));
