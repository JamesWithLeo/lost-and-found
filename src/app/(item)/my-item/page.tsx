import { authOptions } from "@/authOptions";
import { getMyItems } from "@/db/drizzle";
import FoundItemCard from "@/ui/FoundItemCard";
import { getServerSession } from "next-auth";

export default async function PostSearchPage() {
  const session = await getServerSession(authOptions);
  const items = await getMyItems(session?.user.id);
  return (
    <main className="flex min-h-dvh w-full flex-col items-center bg-slate-50 py-10">
      <section className="flex w-full flex-col items-center border-b border-gray-200 py-4">
        <div className="w-full max-w-[1440px] px-48">
          <h1 className="text-3xl">My items </h1>
          <h1 className="text-sm">
            Reuniting Lost items with Owners, Including Yours!
          </h1>
        </div>
      </section>

      <section className="mt-4 flex w-full max-w-[1440px] flex-col gap-2 px-48">
        <section className="flex justify-end gap-1.5">
          {items.map((i) => (
            <FoundItemCard key={`${i.id}`} href={`/my-item/ps/${i.id}`} i={i} />
          ))}
        </section>
      </section>
    </main>
  );
}
