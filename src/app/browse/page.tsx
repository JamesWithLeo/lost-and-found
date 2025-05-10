import { authOptions } from "@/authOptions";
import { getRandomItems } from "@/db/drizzle";
import MatchingCard from "@/ui/MatchingCard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    redirect("/");
  }
  const items = await getRandomItems(session.user.id, 20, true);

  return (
    <main className="flex min-h-dvh w-full flex-col items-center py-10">
      <section className="flex w-full max-w-7xl gap-8">
        {items &&
          Array.isArray(items) &&
          items.length &&
          items.map((item) => (
            <MatchingCard
              key={item.item.id}
              item={item.item}
              isCurrentUser={false}
              user={item.user}
              claimantCount={item.claimCount}
              clickLink="/found-item/"
            ></MatchingCard>
          ))}
      </section>
    </main>
  );
}
