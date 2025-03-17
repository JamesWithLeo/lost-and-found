import { neonConfig, neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import ws from "ws";
import { items, users } from "./schema";
import { eq, ilike, and, or, not, gte } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";
neonConfig.webSocketConstructor = ws;

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

export const getUsersByProvider = async (
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

export const getUser = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) return null;
  return await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)
    .then((res) => res[0]);
};

export const hasNullOrUndefinedData = ({
  firstName,
  lastName,
  birthDate,
}: {
  firstName?: string | null;
  lastName?: string | null;
  birthDate?: string | null;
}) => {
  return !!firstName && !!lastName && !!birthDate;
};

export const insertItem = async ({
  userId,
  itemName,
  color,
  brandModel,
  location,
  timeDate,
  category,
  caption,
  desc,
  type,
}: {
  userId: string;
  itemName: string;
  color?: string | null;
  brandModel?: string | null;
  location: string;
  timeDate: Date;
  category: string;
  caption: string;
  desc?: string | null;
  type: "lost" | "stolen" | "missing" | "found";
}) => {
  const result = await db
    .insert(items)
    .values({
      userId,
      itemName,
      color,
      brandModel,
      location,
      timeDate,
      caption,
      category,
      desc,
      type,
    })
    .returning();
  console.log(result);
  return result[0];
};

export async function getItem(id: string) {
  try {
    const res = await db
      .select()
      .from(items)
      .where(and(eq(items.id, id), not(eq(items.type, "found"))))
      .limit(1)
      .then((res) => res[0]);

    return { data: res, withError: false, errorMessage: null };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error";

    console.error("Database error:", errorMessage);
    return { data: null, withError: true, errorMessage };
  }
}

export async function getFoundItem(id: string) {
  try {
    const res = await db
      .select()
      .from(items)
      .where(and(eq(items.id, id), eq(items.type, "found")))
      .limit(1)
      .then((res) => res[0]);

    return { data: res, withError: false, errorMessage: null };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected error";

    console.error("Database error:", errorMessage);
    return { data: null, withError: true, errorMessage };
  }
}

export async function findMatchingItems(lostItem: {
  id: string;
  itemName: string;
  location: string;
  category: string;
  color?: string | null;
  brandModel?: string | null;
  timeDate: Date;
}) {
  const matchingItems = await db
    .select()
    .from(items)
    .where(
      and(
        or(
          ...lostItem.itemName
            .split(" ")
            .map((term) => ilike(items.itemName, `%${term}%`)),
        ),
        ilike(items.location, `%${lostItem.location}%`),
        eq(items.type, "found"),
        not(eq(items.id, lostItem.id)),
        eq(items.category, lostItem.category),
        lostItem.color ? ilike(items.color, `%${lostItem.color}%`) : undefined,
        lostItem.brandModel
          ? ilike(items.brandModel, `%${lostItem.brandModel}%`)
          : undefined,
        eq(items.itemStatus, "pending"),
        gte(items.timeDate, lostItem.timeDate),
      ),
    );

  return matchingItems;
}

export async function getFoundItems(userId: string | undefined | null) {
  if (!userId) {
    throw new Error("User id is required to perform this query");
  }
  return await db
    .select()
    .from(items)
    .where(and(eq(items.userId, userId), eq(items.type, "found")));
}

export async function getMyItems(userId: string | undefined) {
  if (!userId) {
    throw new Error("User id is required to perform this query");
  }
  return await db
    .select()
    .from(items)
    .where(and(eq(items.userId, userId), not(eq(items.type, "found"))));
}
