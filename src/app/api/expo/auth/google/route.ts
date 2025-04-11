// import { getUserByEmail, insertUser } from "@/db/drizzle";
import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { allowedOrigins } from "@/constant/constant";
import { getUserByGivenId, insertUser } from "@/db/drizzle";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// Helper function to set CORS headers based on origin
function getCorsHeaders(origin: string | null): HeadersInit {
  const headers: HeadersInit = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Allow methods
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, x-user-email , x-provider, x-google-id, x-facebook-id", // Allow specific headers
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
  const origin = req.headers.get("origin");
  const token = req.headers.get("Authorization")?.replace("Bearer", "").trim();
  const headers = getCorsHeaders(origin);

  if (!token) {
    return new Response("Unauthorized: No token provided", { status: 401 });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: [
        process.env.GOOGLE_CLIENT_ID!,
        process.env.GOOGLE_ANDROID_CLIENT_ID!,
      ],
      // audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return new Response("Unauthorized: Invalid token", { status: 401 });
    }

    const googleId = payload.sub;
    const email = payload.email;

    const selectedUser = await getUserByGivenId(googleId, "googleId");

    if (selectedUser) {
      return NextResponse.json(
        { email, user: selectedUser },
        {
          status: 200,
          headers,
        },
      );
    } else {
      const insertedUser = await insertUser({ googleId, email });
      return NextResponse.json(
        { email, user: insertedUser },
        {
          status: 200,
          headers,
        },
      );
    }
  } catch (error) {
    console.error("Error verifying token or interacting with DB:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
