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
  if (!session || !session.user.id) return null;
  return await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1)
    .then((res) => res[0]);
};

export const getUserSafe = async (id: string | undefined) => {
  if (!id) return null;
  return await db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
    })
    .from(users)
    .where(eq(users.id, id))
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
  return !(!!firstName || !!lastName || !!birthDate);
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
  itemProof,
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
  itemProof: string[];
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
      itemProof,
    })
    .returning();
  console.log(result);
  return result[0];
};

export async function getItem(
  id: string,
  type: "lost" | "stolen" | "missing" | "found",
) {
  const conditions = [eq(items.id, id)];
  if (type === "found") {
    conditions.push(eq(items.type, "found"));
  } else {
    conditions.push(not(eq(items.type, "found")));
  }
  try {
    const res = await db
      .select()
      .from(items)
      .where(and(...conditions))
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

export async function findMatchingItems({
  itemName,
  category,
  location,
  color,
  id,
  timeDate,
  brandModel,
}: {
  itemName: string;
  id?: string | undefined;
  location: string | undefined;
  category: string | undefined;
  color: string | null | undefined;
  brandModel?: string | null | undefined;
  timeDate: Date | undefined;
}) {
  const conditions = [
    or(
      ...itemName.split(" ").map((term) => ilike(items.itemName, `%${term}%`)),
    ),
    eq(items.type, "found"),
    eq(items.itemStatus, "pending"),
  ];

  if (location?.trim()) {
    const terms = location.split(/[^a-zA-Z0-9]+/).map((term) => {
      return ilike(items.location, `%${term}%`);
    });
    conditions.push(or(...terms));
  }
  if (category) conditions.push(eq(items.category, category));
  if (color) conditions.push(ilike(items.color, `%${color}%`));
  if (brandModel) conditions.push(ilike(items.brandModel, `%${brandModel}%`));
  if (timeDate) conditions.push(gte(items.timeDate, timeDate));
  if (id) conditions.push(not(eq(items.id, id)));

  const matchingItems = await db
    .select({
      item: items,
      user: {
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
      },
    })
    .from(items)
    .leftJoin(users, eq(items.userId, users.id))
    .where(and(...conditions));
  return matchingItems;
}

export async function getFoundItems(
  userId: string | undefined | null,
  limit?: number,
) {
  if (!userId) {
    throw new Error("User id is required to perform this query");
  }
  if (limit)
    return await db
      .select()
      .from(items)
      .where(and(eq(items.userId, userId), eq(items.type, "found")))
      .limit(limit);
  else {
    return await db
      .select()
      .from(items)
      .where(and(eq(items.userId, userId), eq(items.type, "found")));
  }
}

export async function getMyItems(userId: string | undefined, limit?: number) {
  if (!userId) {
    throw new Error("User id is required to perform this query");
  }
  if (limit) {
    return await db
      .select()
      .from(items)
      .where(and(eq(items.userId, userId), not(eq(items.type, "found"))))
      .limit(limit);
  }
  return await db
    .select()
    .from(items)
    .where(and(eq(items.userId, userId), not(eq(items.type, "found"))));
}
export async function GetGlobalCase() {
  return await db.select().from(items);
}
