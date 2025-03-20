import { authOptions } from "@/authOptions";
import { findMatchingItems, getItem } from "@/db/drizzle";
import MatchingCard from "@/ui/client/MatchingCard";
import ToggleSidebarButton from "@/ui/ToggleSidebarButton";
import { getServerSession } from "next-auth";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const session = await getServerSession(authOptions);
  const { data: item, withError } = await getItem(id, "lost");

  if (!item || withError) {
    return <h1>Item not found.</h1>;
  }
  const matchingItems = await findMatchingItems({
    id: item.id,
    userId: session?.user.id,
    itemName: item.itemName,
    location: item.location,
    category: item.category,
    timeDate: item.timeDate,
    color: item.color,
  });

  return (
    <main className="flex w-full flex-col items-center p-4">
      <div className="sticky top-24 flex w-full">
        <ToggleSidebarButton />
      </div>
      <div className="grid h-full min-h-dvh w-full">
        <div className="grid w-full grid-cols-2 border-r border-gray-200 p-2">
          <ul>
            {matchingItems && matchingItems.length > 0 ? (
              matchingItems.map((match) => (
                <MatchingCard {...match} key={`${match.id}-matching-item`} />
              ))
            ) : (
              <p>No matching items found.</p>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}
