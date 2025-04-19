import { authOptions } from "@/authOptions";
import { getFoundItems } from "@/db/drizzle";
import ItemViewGrid from "@/ui/ItemViewGrid";
import { getServerSession } from "next-auth";
export default async function Page() {
  const session = await getServerSession(authOptions);
  const items = await getFoundItems(session?.user.id);
  return (
    <main className="flex min-h-dvh w-full flex-col items-center bg-slate-50 py-10">
      <section className="flex w-full flex-col items-center border-b border-gray-200 py-4">
        <div className="w-full max-w-[1440px] px-[1.5rem] sm:px-8 md:px-48">
          <h1 className="text-xl font-bold sm:text-3xl">Found items </h1>
          <h1 className="text-sm">Helping People Reclaim What&apos; Theirs!</h1>
        </div>
      </section>
      <ItemViewGrid items={items} type="found" />
    </main>
  );
}
