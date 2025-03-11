import { neonConfig, neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import ws from "ws";
import { users } from "./schema";
import { eq } from "drizzle-orm";
neonConfig.webSocketConstructor = ws;

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

export const getUsers = async (
  id: string,
  provider: "googleId" | "facebookId",
) => {
  return await db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
    })
    .from(users)
    .where(eq(users[provider], id))
    .limit(1)
    .then((res) => res[0]);
};

export const hasNullOrUndefinedData = ({
  firstName,
  lastName,
}: {
  firstName?: string | null;
  lastName?: string | null;
}) => {
  return !!firstName && !!lastName;
};
