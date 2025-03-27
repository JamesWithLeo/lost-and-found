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
  claimantCount: integer("claimant_count").default(0),
  itemProof: text("item_proof").array().default([]),
});

export const category = pgTable("category", {
  id: integer("id").primaryKey(),
  name: varchar("256").unique().notNull(),
});

export const claims = pgTable(
  "claims",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    itemId: uuid("item_id")
      .notNull()
      .references(() => items.id, { onDelete: "cascade" }),
    claimedAt: timestamp("claimed_at"),
    createdAt: text("created_at").default(new Date().toISOString()),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.itemId] }),
    };
  },
);
