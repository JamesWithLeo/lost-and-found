import { getFoundItems, getMyItems } from "@/db/drizzle";
import { NextResponse } from "next/server";

import { allowedOrigins } from "@/constant/constant";

// Helper function to set CORS headers based on origin
function getCorsHeaders(origin: string | null): HeadersInit {
  const headers: HeadersInit = {
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // Allow methods
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
    status: 200,
    headers,
  });
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  if (!type) {
    return NextResponse.json(
      {},
      { status: 400, statusText: "Query params of type is missing" },
    );
  }
  if (type === "lost") {
    const selectedItems = await getMyItems(id);
    return NextResponse.json({ items: selectedItems }, { status: 200 });
  } else if (type) {
    const selectedItems = await getFoundItems(id);
    return NextResponse.json({ items: selectedItems }, { status: 200 });
  } else {
    return NextResponse.json(
      {},
      {
        status: 400,
        statusText: `invalid query params for (Type). ?type=("lost" | "found ) only`,
      },
    );
  }
}
