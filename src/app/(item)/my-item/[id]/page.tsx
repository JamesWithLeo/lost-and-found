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
          {matchingItems &&
            matchingItems.length > 0 &&
            matchingItems.map((match) => (
              <MatchingCard
                {...match}
                key={`${match.item.id}-matching-item`}
                isCurrentUser={session?.user.id === match.user?.id}
              />
            ))}
        </div>
        {!matchingItems ||
          (!matchingItems.length && (
            <div className="flex h-max w-full flex-col items-center justify-start text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="96"
                height="96"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-leaf"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
              <h1>No matching items found!</h1>
            </div>
          ))}
      </div>
    </main>
  );
}
