import { items } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import Link from "next/link";

export default function FoundItemCard({
  i,
  href,
}: {
  i: InferSelectModel<typeof items>;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="grid w-full grid-cols-3 rounded border border-gray-200 bg-white p-2"
    >
      <div>
        <h1>{i.itemName}</h1>
        <h1 className="text-xs">{i.id}</h1>
      </div>
      <div>
        <h1 className="text-sm">{i.itemStatus}</h1>
        <h1 className="text-sm">{new Date(i.timeDate).toLocaleString()}</h1>
      </div>
    </Link>
  );
}
