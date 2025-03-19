import { authOptions } from "@/authOptions";
import { getFoundItems } from "@/db/drizzle";
import FoundItemCard from "@/ui/FoundItemCard";
import { getServerSession } from "next-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";

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

      <section className="max-w-[1440px]] mt-4 flex w-full flex-col gap-2 px-48">
        <Tabs defaultValue="all" className="col-start-2">
          <div className="flex w-max justify-between gap-8">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Input placeholder="Search" />
              <button className="bg-primary rounded px-2 text-white">
                Search
              </button>
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
          </div>
          <TabsContent
            value="all"
            className="grid grid-cols-3 justify-end gap-1.5"
          >
            {items.map((i) => (
              <FoundItemCard
                key={`${i.id}`}
                href={`/found-item/${i.id}`}
                i={i}
              />
            ))}
          </TabsContent>
          <TabsContent
            value="pending"
            className="grid grid-cols-3 justify-end gap-1.5"
          >
            {items
              .filter((h) => h.itemStatus === "pending")
              .map((i) => (
                <FoundItemCard
                  key={`${i.id}`}
                  href={`/found-item/${i.id}`}
                  i={i}
                />
              ))}
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
