import { neonConfig, neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import ws from "ws";
import { claims, items, users } from "./schema";
import * as schema from "./schema.ts";
import {
  eq,
  ilike,
  and,
  // gt,
  // lte,
  // lt,
  or,
  not,
  gte,
  count,
  desc,
  // asc,
  sql as sqlDrizzle,
} from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";

neonConfig.webSocketConstructor = ws;

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql, schema: schema });

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

export const getUserByEmail = async (email: string) => {
  return await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
    .then((res) => res[0]);
};
export const getUserByGivenId = async (
  id: string,
  provider: "googleId" | "facebookId",
) => {
  return await db
    .select()
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
export const insertUser = async ({
  googleId,
  email,
  facebookId,
}: {
  email?: string | null;
  googleId?: string | null;
  facebookId?: string | null;
}) => {
  const result = await db
    .insert(users)
    .values({
      googleId,
      email,
      facebookId,
      role: "user",
    })
    .returning();
  return result[0];
};

export const setupUser = async ({
  id,
  firstName,
  lastName,
  gender,
  birthDate,
}: {
  id: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  birthDate: string;
}) => {
  const result = await db
    .update(users)
    .set({ firstName, lastName, gender, birthDate })
    .where(eq(users.id, id))
    .returning();
  return result[0];
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
    const terms = location
      .split(/[^a-zA-Z0-9]+/)
      .map((term) => ilike(items.location, `%${term}%`));
    conditions.push(or(...terms));
  }

  if (category) conditions.push(eq(items.category, category));
  if (color) conditions.push(ilike(items.color, `%${color}%`));
  if (brandModel) conditions.push(ilike(items.brandModel, `%${brandModel}%`));
  if (timeDate) conditions.push(gte(items.timeDate, timeDate));
  if (id) conditions.push(not(eq(items.id, id)));

  const matchingItems = await db
    .select({
      item: {
        ...items,
      },
      user: {
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
      },
      claimCount: count(claims.itemId).as("claimCount"),
    })
    .from(items)
    .leftJoin(users, eq(items.userId, users.id))
    .leftJoin(claims, eq(claims.itemId, items.id))
    .where(and(...conditions))
    .groupBy(items.id, users.id);

  return matchingItems;
}

export async function getFoundItems(
  userId: string | undefined | null,
  limit?: number,
  random?: boolean,
) {
  if (!userId) {
    throw new Error("User id is required to perform this query");
  }

  const condition = and(eq(items.userId, userId), not(eq(items.type, "lost")));

  const query = db
    .select({
      id: items.id,
      itemName: items.itemName,
      desc: items.desc,
      createdAt: items.createdAt,
      color: items.color,
      brandModel: items.brandModel,
      category: items.category,
      itemProof: items.itemProof,
      userId: items.userId,
      itemStatus: items.itemStatus,
      location: items.location,
      timeDate: items.timeDate,
      caption: items.caption,
      type: items.type,
      claimantCount: count(claims),
    })
    .from(items)
    .leftJoin(claims, eq(claims.itemId, items.id))
    .where(condition)
    .groupBy(items.id);

  if (limit) {
    query.limit(limit);
  }
  if (random) {
    query.orderBy(sqlDrizzle`random()`);
  }

  return query;
}

export async function getMyItems(userId: string | undefined, limit?: number) {
  if (!userId) {
    throw new Error("User id is required to perform this query");
  }

  const condition = and(eq(items.userId, userId), not(eq(items.type, "found")));

  const query = db
    .select({
      id: items.id,
      itemName: items.itemName,
      desc: items.desc,
      createdAt: items.createdAt,
      color: items.color,
      brandModel: items.brandModel,
      category: items.category,
      itemProof: items.itemProof,
      userId: items.userId,
      itemStatus: items.itemStatus,
      location: items.location,
      timeDate: items.timeDate,
      caption: items.caption,
      type: items.type,
      claimantCount: count(claims),
    })
    .from(items)
    .leftJoin(claims, eq(claims.itemId, items.id))
    .where(condition)
    .groupBy(items.id);

  if (limit) {
    query.limit(limit);
  }

  return query;
}

export async function GetGlobalCase() {
  return await db.select().from(items);
}

export async function insertClaims(newClaim: {
  caption: string;
  desc: string;
  userId: string;
  itemProof: string[] | null;
  distinctFeature: string;
  itemId: string;
}) {
  const result = await db
    .insert(claims)
    .values({
      userId: newClaim.userId,
      itemId: newClaim.itemId,
      caption: newClaim.caption,
      desc: newClaim.desc,
      distinctFeature: newClaim.distinctFeature,
      proof: newClaim.itemProof ?? [],
    })
    .onConflictDoUpdate({
      target: [claims.itemId, claims.userId],
      set: {
        caption: newClaim.caption,
      },
    })
    .returning();

  return result[0];
}

export async function getClaims(itemId: string) {
  const result = await db
    .select({
      userId: claims.userId,
      createdAt: claims.createdAt,
      itemId: claims.itemId,
      caption: claims.caption,
      firstName: users.firstName,
      lastName: users.lastName,
    })
    .from(claims)
    .innerJoin(users, eq(claims.userId, users.id))
    .where(eq(claims.itemId, itemId));

  return result;
}

export async function getClaim(itemId: string, userId: string) {
  return await db
    .select({
      claims,
      claimant: {
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
      },
    })
    .from(claims)
    .innerJoin(users, eq(claims.userId, users.id))
    .where(and(eq(claims.itemId, itemId), eq(claims.userId, userId)))
    .limit(1)
    .then((res) => res[0]);
}

export async function getRandomItems({
  userId,
  limit,
  random,
  byDate,
  byBounty,
  byPopularity,
  offset,
}: {
  userId: string | undefined | null;
  limit?: number;
  byDate?: boolean;
  byBounty?: boolean;
  random?: boolean;
  byPopularity?: boolean;
  offset?: number;
}) {
  if (!userId) throw new Error("User id is required to perform this query");
  const conditions = [not(eq(items.userId, userId)), eq(items.type, "found")];

  if (byPopularity) {
  }
  if (byBounty) {
  }
  const LIMIT = 10;

  const query = db
    .select({
      item: items,
      claimCount: count(claims.itemId).as("claimCount"),
      user: {
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
      },
    })
    .from(items)
    .leftJoin(users, eq(items.userId, users.id))
    .leftJoin(claims, eq(claims.itemId, items.id))
    .where(and(...conditions))
    .limit(limit ?? LIMIT)
    .offset(offset)
    .orderBy(desc(items.createdAt))
    .groupBy(items.id, users.id);

  if (random && !byDate) {
    query.orderBy(sqlDrizzle`random()`);
  }

  return query;
}
