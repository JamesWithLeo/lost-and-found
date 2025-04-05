import { authOptions } from "@/authOptions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { getMyItems } from "@/db/drizzle";
import FoundItemCard from "@/ui/FoundItemCard";
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

      <section className="max-w-[1440px]] mt-4 flex w-full flex-col gap-2 px-[1.5rem] sm:px-8 md:px-48">
        <Tabs defaultValue="all" className="col-start-2">
          <div className="flex w-max justify-between gap-8">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
            <Toggle
              aria-label="Toggle italic"
              className="bg-slate-100 text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M120,56v48a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40h48A16,16,0,0,1,120,56Zm80-16H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm-96,96H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm96,0H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Z"></path>
              </svg>
            </Toggle>
          </div>
          <TabsContent
            value="all"
            className="grid grid-cols-2 justify-end gap-1.5 sm:grid-cols-3"
          >
            {items.map((i) => (
              <FoundItemCard
                view="grid"
                key={`${i.id}`}
                href={`/my-item/${i.id}`}
                i={i}
              />
            ))}
          </TabsContent>
          <TabsContent
            value="pending"
            className="SM:grid-cols-3 grid grid-cols-2 justify-end gap-1.5"
          >
            {items
              .filter((h) => h.itemStatus === "pending")
              .map((i) => (
                <FoundItemCard
                  view="grid"
                  key={`${i.id}`}
                  href={`/my-item/${i.id}`}
                  i={i}
                />
              ))}
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
