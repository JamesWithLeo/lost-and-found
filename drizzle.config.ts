import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config({ path: ".env" });
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migration",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
