import { authOptions } from "@/authOptions";
import { getMyItems } from "@/db/drizzle";
import ItemViewGrid from "@/ui/ItemViewGrid";
import { getServerSession } from "next-auth";

export default async function PostSearchPage() {
  const session = await getServerSession(authOptions);
  const items = await getMyItems(session?.user.id);
  return (
    <main className="flex min-h-dvh w-full flex-col items-center bg-slate-50 py-10">
      <section className="flex w-full flex-col items-center border-b border-gray-200 py-4">
        <div className="w-full max-w-[1440px] px-[1.5rem] sm:px-8 md:px-48">
          <h1 className="text-xl font-semibold sm:text-3xl">My items </h1>
          <h1 className="text-nowrap text-sm">
            Reuniting Lost items with Owners, Including Yours!
          </h1>
        </div>
      </section>

      <ItemViewGrid items={items} type="lost" />
    </main>
  );
}
