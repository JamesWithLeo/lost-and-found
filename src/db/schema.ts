import {
  pgEnum,
  pgTable,
  text,
  uuid,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const role = pgEnum("role", ["user", "admin"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: varchar({ length: 256 }),
  lastName: varchar({ length: 256 }),
  role: role("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow(),

  email: text().unique(),
  googleId: text("google_id").unique(),
  facebookId: text("facebook_id").unique(),
  githubId: text("github_id").unique(),
});

export const items = pgTable("items", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  location: text("location").notNull(),
  status: text("status").default("lost"), // lost, found, claimed
  foundBy: uuid("found_by").references(() => users.id), // Who found it?
  lostBy: uuid("lost_by").references(() => users.id), // Who lost it?
  createdAt: timestamp("created_at").defaultNow(),
});
