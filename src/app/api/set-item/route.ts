import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { itemId } = await req.json();

  if (!itemId) {
    return NextResponse.json({ error: "Missing itemId" }, { status: 400 });
  }

  (await cookies()).set("targetItemId", itemId, {
    httpOnly: true, // Prevents client-side access
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/found-item",
  });

  return NextResponse.json({ message: "Item ID stored in cookie" });
}
