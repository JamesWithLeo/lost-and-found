import { getUserByEmail } from "@/db/drizzle";
import { NextResponse } from "next/server";

const allowedOrigins = [
  "http://localhost:8081", // Expo local dev
  "https://lost-and-found-chi.vercel.app", // Deployed frontend
];

// Helper function to set CORS headers based on origin
function getCorsHeaders(origin: string | null): HeadersInit {
  const headers: HeadersInit = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Allow methods
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, x-user-email , x-provider", // Allow specific headers
    "Content-Type": "application/json", // Content-Type header
  };

  // If the origin is in the allowed list, allow it in the response
  if (origin && allowedOrigins.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  const headers = getCorsHeaders(origin);

  return new NextResponse(null, {
    status: 200, // Success for OPTIONS request
    headers,
  });
}

export async function GET(req: Request) {
  const userEmail = req.headers.get("x-user-email");
  const provider = req.headers.get("x-provider");
  const origin = req.headers.get("origin");
  const headers = getCorsHeaders(origin);
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
  let dbUser;
  switch (provider) {
    case "google":
      dbUser = await getUserByEmail(userEmail);
      break;
    case "facebook":
      // todo add facebook
      dbUser = null;
      break;

    default:
      dbUser = null;
      break;
  }

  return NextResponse.json(
    { email: userEmail, user: dbUser },
    {
      status: 200,
      headers,
    },
  );
}
