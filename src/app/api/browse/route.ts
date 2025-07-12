import { getServerSession } from "next-auth";
import { getRandomItems } from "@/db/drizzle";
import { authOptions } from "@/authOptions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const session = await getServerSession(authOptions);

  const byDate = searchParams.get("byDate") == "true";
  const byPopularity = searchParams.get("byPopularity");
  const byBounty = searchParams.get("byBounty");
  const random = searchParams.get("random");
  const offset = searchParams.get("offset");

  const result = await getRandomItems({
    userId: session?.user.id,
    byDate: byDate,
    byPopularity: byPopularity,
    byBounty: byBounty,
    random: random,
    offset: offset,
  });

  const remaining = result.length;

  return NextResponse.json({ items: result, remaining: remaining });
}
