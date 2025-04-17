import { authOptions } from "@/authOptions";
import { findMatchingItems } from "@/db/drizzle";
import MatchingCard from "@/ui/MatchingCard";
import ResultField from "@/ui/ResultField";
import { getServerSession } from "next-auth";
import { Anonymous_Pro } from "next/font/google";
import Link from "next/link";
import { redirect } from "next/navigation";

const anony = Anonymous_Pro({ weight: ["400", "700"], subsets: ["latin"] });
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}) {
  const session = await getServerSession(authOptions);
  const { itemName, category, location, color, timeDate } = await searchParams;
  if (!itemName) {
    redirect("/");
  }
  const matchingItem = await findMatchingItems({
    category: category,
    itemName,
    color,
    timeDate: timeDate ? new Date(timeDate) : undefined,
    location,
  });
  return (
    <main className="flex min-h-dvh w-full flex-col items-center bg-slate-50 pb-10">
      <section
        className={`${anony.className} sticky top-20 w-full max-w-[1440px] border-b bg-white px-28`}
      >
        <ResultField
          category={category}
          itemName={itemName}
          location={location}
          timeDate={timeDate}
        />
      </section>
      {matchingItem.length ? (
        <section className="h-full w-full max-w-[1440px] bg-slate-50 px-24">
          <div className="grid h-full w-full grid-cols-3 gap-3 p-2">
            {matchingItem.map((i) => (
              <MatchingCard
                item={{ ...i.item }}
                user={i.user}
                key={i.item.id}
                clickLink="/found-item/"
                isCurrentUser={session?.user.id === i.user?.id}
              />
            ))}
          </div>
        </section>
      ) : (
        <section className="h-full w-full max-w-[1440px] grow px-28">
          <div className="mt-10 flex h-max w-full flex-col items-center justify-start text-gray-700">
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
            <h1 className="text-2xl font-bold">Item not found</h1>
            <h1 className="text-sm">Try changing some item details or</h1>
            <span className="flex gap-2 text-sm">
              <h1>post the item instead. </h1>
              <Link href="/" className={`rounded border px-2`}>
                Learn More
              </Link>
            </span>
          </div>
        </section>
      )}
    </main>
  );
}
