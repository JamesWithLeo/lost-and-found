import { getFoundItems, getMyItems } from "@/db/drizzle";
import { NextResponse } from "next/server";

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
