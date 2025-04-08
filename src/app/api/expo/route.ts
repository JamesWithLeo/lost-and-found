import { getUsersByProvider } from "@/db/drizzle";
import { NextResponse } from "next/server";

const allowedOrigins = [
  "http://localhost:8081", // Expo local dev
  "https://lost-and-found-chi.vercel.app", // Deployed frontend
];

export function getCorsHeaders(origin: string | null): HeadersInit {
  const headers: HeadersInit = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json",
  };

  if (origin && allowedOrigins.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
}

export async function GET(req: Request) {
  const userEmail = req.headers.get("x-user-email");
  const orign = req.headers.get("origin");
  const headers = getCorsHeaders(orign);
  // Check if the header is present

  if (!userEmail) {
    return NextResponse.json(
      { error: "Missing user email header" },
      {
        status: 400,
        headers,
      },
    );
  }

  const dbUser = await getUsersByProvider(userEmail, "googleId");

  return NextResponse.json(
    { email: userEmail, user: dbUser },
    {
      status: 200,
      headers,
    },
  );
}
