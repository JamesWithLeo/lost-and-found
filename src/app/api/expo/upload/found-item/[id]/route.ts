import { insertItem } from "@/db/drizzle";
import { postItemSchema } from "@/lib/ItemActionSchema";
import { NextResponse } from "next/server";

const allowedOrigins = [
  "http://localhost:8081", // Expo local dev
  "https://lost-and-found-chi.vercel.app", // Deployed frontend
];

// Helper function to set CORS headers based on origin
function getCorsHeaders(origin: string | null): HeadersInit {
  const headers: HeadersInit = {
    "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow methods
    "Access-Control-Allow-Headers": "Content-Type, Authorization, ", // Allow specific headers
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

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const body = await req.json();
  const { id } = await params;
  const validatedFields = postItemSchema.safeParse(body);
  if (!validatedFields.success) {
    return NextResponse.json({ Item: null }, { status: 400 });
  }
  const {
    desc,
    itemName,
    caption,
    category,
    brandModel,
    color,
    location,
    timeDate,
    itemProof,
  } = validatedFields.data;

  const insertedItem = await insertItem({
    userId: id,
    itemName,
    caption,
    category,
    brandModel,
    color,
    location,
    desc,
    timeDate,
    type: "found",
    itemProof,
  });

  return NextResponse.json({ Item: insertedItem }, { status: 200 });
}
