import { getUsersByProvider } from "@/db/drizzle";
import { NextResponse } from "next/server";

export async function Get(req: Request) {
  const userEmail = req.headers.get("x-user-email");
  // Check if the header is present
  if (!userEmail) {
    return NextResponse.json(
      { error: "Missing user email header" },
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const dbUser = await getUsersByProvider(userEmail, "googleId");

  return NextResponse.json(
    { email: userEmail, user: dbUser },
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}
