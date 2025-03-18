import { authOptions } from "@/authOptions";
import { getFoundItems } from "@/db/drizzle";
import FoundItemCard from "@/ui/FoundItemCard";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const items = await getFoundItems(session?.user.id);
  return (
    <main className="flex min-h-dvh w-full flex-col items-center bg-slate-50 py-10">
      <section className="flex w-full flex-col items-center border-b border-gray-200 py-4">
        <div className="w-full max-w-[1440px] px-48">
          <h1 className="text-3xl">Found items </h1>
          <h1 className="text-sm">Helping People Reclaim What&apos; Theirs!</h1>
        </div>
      </section>
      <section className="mt-4 flex w-full max-w-[1440px] flex-col gap-2 px-48">
        <section className="flex justify-end gap-1.5">
          <input
            placeholder="Search"
            className="w-60 rounded border border-gray-200 bg-white px-2"
          />
          <button className="rounded border border-gray-200 bg-white px-4">
            Sort
          </button>
          <button className="rounded border border-gray-200 bg-white px-4">
            Filter
          </button>
        </section>
        <div className="flex flex-col gap-2">
          {items.map((i) => (
            <FoundItemCard key={`${i.id}`} href={`/found-item/${i.id}`} i={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
